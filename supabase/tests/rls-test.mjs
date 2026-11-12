// Applies the HR Fashions migrations and seed to an in-memory Postgres (PGlite) that imitates
// the parts of Supabase they rely on (auth.users, auth.uid(), anon/authenticated roles, storage tables),
// then checks every permission as a visitor, two customers and an admin.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseLikeDb } from './supabase-stub.mjs';

// Repo root: two folders up from this file, unless a path is passed.
const repo = process.argv[2] ?? fileURLToPath(new URL('../..', import.meta.url));
const db = await supabaseLikeDb();

const results = [];
const check = (name, ok, detail = '') => results.push({ ok, name, detail });

// ---- Migrations and seed ---------------------------------------------------------------
const migDir = join(repo, 'supabase', 'migrations');
for (const f of readdirSync(migDir).sort()) {
    try { await db.exec(readFileSync(join(migDir, f), 'utf8')); check(`migration ${f} applies`, true); }
    catch (e) { check(`migration ${f} applies`, false, e.message); }
}
const seed = readFileSync(join(repo, 'supabase', 'seed.sql'), 'utf8');
try { await db.exec(seed); check('seed applies', true); } catch (e) { check('seed applies', false, e.message); }
try { await db.exec(seed); check('seed can run twice', true); } catch (e) { check('seed can run twice', false, e.message); }

// ---- People ---------------------------------------------------------------------------
const ADMIN = '00000000-0000-0000-0000-00000000000a';
const C1 = '00000000-0000-0000-0000-0000000000c1';
const C2 = '00000000-0000-0000-0000-0000000000c2';
await db.exec(`insert into auth.users (id, email) values ('${ADMIN}', 'admin@example.test'), ('${C1}', 'c1@example.test'), ('${C2}', 'c2@example.test');`);
const roles = (await db.query(`select role, count(*)::int n from public.profiles group by role`)).rows;
check('sign-up trigger makes every new profile a customer', roles.length === 1 && roles[0].role === 'customer' && roles[0].n === 3, JSON.stringify(roles));
await db.exec(`update public.profiles set role = 'admin' where id = '${ADMIN}';`); // as the owner would in the dashboard

// ---- Helpers -------------------------------------------------------------------------
async function as(role, uid, sql) {
    await db.exec(`reset role; select set_config('request.jwt.claim.sub', '${uid ?? ''}', false); set role ${role};`);
    try { const r = await db.query(sql); return { rows: r.rows, affected: r.affectedRows ?? 0 }; }
    catch (e) { return { error: e.message }; }
    finally { await db.exec('reset role;'); }
}
const denied = (r) => Boolean(r.error);
const booking = (extra = '') =>
    `insert into public.bookings (name, phone, garment${extra ? ', ' + extra.split('=')[0] : ''}) values ('Test', '+91 98765 43210', 'Blouse'${extra ? ', ' + extra.split('=')[1] : ''})`;

// ---- Visitor (anon key, not logged in) ----------------------------------------------
let r;
r = await as('anon', null, 'select count(*)::int n from public.services'); check('visitor reads services', r.rows?.[0].n === 6, JSON.stringify(r));
r = await as('anon', null, 'select count(*)::int n from public.service_prices'); check('visitor reads prices', r.rows?.[0].n === 24, JSON.stringify(r));
r = await as('anon', null, 'select count(*)::int n from public.settings'); check('visitor reads settings', r.rows?.[0].n === 9, JSON.stringify(r));
r = await as('anon', null, 'select count(*) filter (where service_id is null)::int g, count(*) filter (where service_id is not null)::int s from public.faqs'); check('visitor reads general and service FAQs', r.rows?.[0].g === 6 && r.rows?.[0].s === 20, JSON.stringify(r));
r = await as('anon', null, booking()); check('visitor can send a booking', !denied(r), r.error);
r = await as('anon', null, 'select * from public.bookings'); check('visitor cannot read bookings', denied(r), JSON.stringify(r).slice(0, 120));
r = await as('anon', null, booking(`user_id='${C1}'`)); check('visitor cannot book in a customer\'s name', denied(r), r.error);
r = await as('anon', null, booking(`status='ready'`)); check('visitor cannot set a booking status', denied(r), r.error);
r = await as('anon', null, 'select * from public.profiles'); check('visitor cannot read profiles', denied(r), r.error);
r = await as('anon', null, `insert into public.designs (title, category, image_path) values ('x','y','z')`); check('visitor cannot add gallery photos', denied(r), r.error);
r = await as('anon', null, `update public.services set name = 'hacked'`); check('visitor cannot change services', denied(r) || r.affected === 0, JSON.stringify(r));
r = await as('anon', null, `insert into storage.objects (bucket_id, name) values ('site-images', 'x.webp')`); check('visitor cannot upload photos', denied(r), r.error);
r = await as('anon', null, `insert into public.bookings (name, phone, garment) values ('Test', 'call me', 'Blouse')`); check('bad phone number is rejected', denied(r), r.error);
r = await as('anon', null, `insert into public.bookings (name, phone, garment, notes) values ('Test', '9876543210', 'Blouse', repeat('x', 1001))`); check('over-long notes are rejected', denied(r), r.error);

// ---- Customer 1 -------------------------------------------------------------------------
r = await as('authenticated', C1, booking(`user_id='${C1}'`)); check('customer books in their own name', !denied(r), r.error);
r = await as('authenticated', C1, booking(`user_id='${C2}'`)); check('customer cannot book in someone else\'s name', denied(r), r.error);
r = await as('authenticated', C1, 'select user_id from public.bookings'); check('customer sees only their own bookings', !denied(r) && r.rows.length === 1 && r.rows[0].user_id === C1, JSON.stringify(r));
r = await as('authenticated', C1, `update public.bookings set status = 'delivered'`); check('customer cannot change booking status', denied(r) || r.affected === 0, JSON.stringify(r));
r = await as('authenticated', C1, 'select id from public.profiles'); check('customer sees only their own profile', r.rows?.length === 1 && r.rows[0].id === C1, JSON.stringify(r));
r = await as('authenticated', C1, `update public.profiles set name = 'Priya', phone = '9876543210' where id = '${C1}'`); check('customer updates their own name and phone', !denied(r) && r.affected === 1, JSON.stringify(r));
r = await as('authenticated', C1, `update public.profiles set role = 'admin' where id = '${C1}'`); check('customer cannot make themselves admin', denied(r), r.error);
r = await as('authenticated', C1, `update public.profiles set name = 'x' where id = '${C2}'`); check('customer cannot edit another profile', denied(r) || r.affected === 0, JSON.stringify(r));
r = await as('authenticated', C1, 'select private.is_admin() a'); check('is_admin() is false for a customer', r.rows?.[0].a === false, JSON.stringify(r));
r = await as('authenticated', C1, `insert into public.designs (title, category, image_path) values ('x','y','z')`); check('customer cannot add gallery photos', denied(r), r.error);
r = await as('authenticated', C1, `insert into storage.objects (bucket_id, name) values ('site-images', 'x.webp')`); check('customer cannot upload photos', denied(r), r.error);
r = await as('authenticated', C2, 'select count(*)::int n from public.bookings'); check('other customer sees none of customer 1\'s bookings', r.rows?.[0].n === 0, JSON.stringify(r));

// ---- Admin --------------------------------------------------------------------------------
r = await as('authenticated', ADMIN, 'select private.is_admin() a'); check('is_admin() is true for the admin', r.rows?.[0].a === true, JSON.stringify(r));
r = await as('authenticated', ADMIN, 'select count(*)::int n from public.bookings'); check('admin reads all bookings', r.rows?.[0].n === 2, JSON.stringify(r));
r = await as('authenticated', ADMIN, `update public.bookings set status = 'contacted'`); check('admin changes booking status', !denied(r) && r.affected === 2, JSON.stringify(r));
r = await as('authenticated', ADMIN, `update public.bookings set phone = '0000000000'`); check('admin cannot rewrite a customer\'s phone', denied(r), r.error);
r = await as('authenticated', ADMIN, 'select count(*)::int n from public.profiles'); check('admin reads all profiles', r.rows?.[0].n === 3, JSON.stringify(r));
r = await as('authenticated', ADMIN, `update public.profiles set role = 'admin' where id = '${C2}'`); check('admin cannot promote others through the API', denied(r), r.error);
r = await as('authenticated', ADMIN, `insert into public.designs (title, category, image_path) values ('New', 'Blouse', 'x.webp')`); check('admin adds a gallery photo', !denied(r), r.error);
r = await as('authenticated', ADMIN, `update public.services set active = false where slug = 'kurti'`); check('admin hides a service', !denied(r) && r.affected === 1, JSON.stringify(r));
r = await as('authenticated', ADMIN, `insert into storage.objects (bucket_id, name) values ('site-images', 'x.webp')`); check('admin uploads a photo', !denied(r), r.error);
r = await as('authenticated', ADMIN, `insert into public.reviews (name, text) values ('Asha', 'Lovely fit')`); check('admin adds a review', !denied(r), r.error);

// ---- Hidden content stays hidden --------------------------------------------------------
r = await as('anon', null, 'select count(*)::int n from public.services'); check('hidden service disappears for visitors', r.rows?.[0].n === 5, JSON.stringify(r));
r = await as('anon', null, `select count(*)::int n from public.service_prices p join public.services s on s.id = p.service_id where s.slug = 'kurti'`); check('hidden service\'s prices disappear too', r.rows?.[0].n === 0, JSON.stringify(r));
r = await as('anon', null, `select count(*)::int n from public.faqs f join public.services s on s.id = f.service_id where s.slug = 'kurti'`); check('hidden service\'s questions disappear too', r.rows?.[0].n === 0, JSON.stringify(r));
r = await as('anon', null, 'select count(*)::int n from public.reviews'); check('unapproved review is not public', r.rows?.[0].n === 0, JSON.stringify(r));

// ---- Report -------------------------------------------------------------------------------
const failed = results.filter((x) => !x.ok);
for (const x of results) console.log(`${x.ok ? 'PASS' : 'FAIL'}  ${x.name}${x.ok ? '' : '  -> ' + x.detail}`);
console.log(`\n${results.length - failed.length} of ${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
