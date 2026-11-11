// Checks that the declarative schema (supabase/schemas) and the migrations (supabase/migrations)
// describe the same database. Builds one in-memory Postgres from each, then compares tables,
// columns, constraints, indexes, row-level security, policies, grants, functions and triggers.
// Any difference means a schema file was changed without a matching migration, or the other way round.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseLikeDb } from './supabase-stub.mjs';

const repo = process.argv[2] ?? fileURLToPath(new URL('../..', import.meta.url));

// Every .sql file under a folder, sorted by path, with _custom/ last (it holds statements the
// schema diff does not model, applied after everything else).
function sqlFiles(dir) {
    const out = [];
    const walk = (d) => {
        for (const name of readdirSync(d).sort()) {
            const p = join(d, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (name.endsWith('.sql')) out.push(p);
        }
    };
    walk(dir);
    return out.sort((a, b) => Number(a.includes('_custom')) - Number(b.includes('_custom')) || a.localeCompare(b));
}

async function build(files) {
    const db = await supabaseLikeDb();
    for (const f of files) {
        try { await db.exec(readFileSync(f, 'utf8')); }
        catch (e) { throw new Error(`${f}: ${e.message}`); }
    }
    return db;
}

// Our objects only: public and private, plus our policies on storage.objects.
const SNAPSHOT = {
    columns: `
        select table_schema, table_name, column_name, ordinal_position, data_type, udt_name,
               is_nullable, column_default, is_identity, identity_generation
        from information_schema.columns
        where table_schema in ('public', 'private')
        order by 1, 2, 4`,
    constraints: `
        select n.nspname, c.conrelid::regclass::text tbl, c.conname, c.contype, pg_get_constraintdef(c.oid) def
        from pg_constraint c join pg_namespace n on n.oid = c.connamespace
        where n.nspname in ('public', 'private')
        order by 1, 2, 3`,
    indexes: `
        select schemaname, tablename, indexname, indexdef
        from pg_indexes where schemaname in ('public', 'private')
        order by 1, 2, 3`,
    rls: `
        select n.nspname, c.relname, c.relrowsecurity, c.relforcerowsecurity
        from pg_class c join pg_namespace n on n.oid = c.relnamespace
        where n.nspname in ('public', 'private') and c.relkind = 'r'
        order by 1, 2`,
    policies: `
        select schemaname, tablename, policyname, permissive, roles::text, cmd, qual, with_check
        from pg_policies
        where schemaname in ('public', 'private') or (schemaname = 'storage' and tablename = 'objects')
        order by 1, 2, 3`,
    tableGrants: `
        select n.nspname, c.relname, coalesce(r.rolname, 'PUBLIC') grantee, a.privilege_type
        from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
        cross join lateral aclexplode(c.relacl) a
        left join pg_roles r on r.oid = a.grantee
        where n.nspname in ('public', 'private') and c.relkind in ('r', 'v', 'm', 'S')
        order by 1, 2, 3, 4`,
    columnGrants: `
        select n.nspname, c.relname, att.attname, coalesce(r.rolname, 'PUBLIC') grantee, a.privilege_type
        from pg_attribute att
        join pg_class c on c.oid = att.attrelid
        join pg_namespace n on n.oid = c.relnamespace
        cross join lateral aclexplode(att.attacl) a
        left join pg_roles r on r.oid = a.grantee
        where n.nspname in ('public', 'private') and att.attacl is not null
        order by 1, 2, 3, 4, 5`,
    schemaGrants: `
        select n.nspname, coalesce(r.rolname, 'PUBLIC') grantee, a.privilege_type
        from pg_namespace n
        cross join lateral aclexplode(n.nspacl) a
        left join pg_roles r on r.oid = a.grantee
        where n.nspname in ('public', 'private')
        order by 1, 2, 3`,
    functions: `
        select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) args, pg_get_functiondef(p.oid) def
        from pg_proc p join pg_namespace n on n.oid = p.pronamespace
        where n.nspname in ('public', 'private')
        order by 1, 2, 3`,
    functionGrants: `
        select n.nspname, p.proname, coalesce(r.rolname, 'PUBLIC') grantee, a.privilege_type
        from pg_proc p
        join pg_namespace n on n.oid = p.pronamespace
        cross join lateral aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
        left join pg_roles r on r.oid = a.grantee
        where n.nspname in ('public', 'private')
        order by 1, 2, 3, 4`,
    triggers: `
        select t.tgrelid::regclass::text tbl, t.tgname, pg_get_triggerdef(t.oid) def
        from pg_trigger t
        where not t.tgisinternal
        order by 1, 2`,
};

const key = (row) => JSON.stringify(row);

let fromMigrations;
let fromSchemas;
try {
    fromMigrations = await build(sqlFiles(join(repo, 'supabase', 'migrations')));
    fromSchemas = await build(sqlFiles(join(repo, 'supabase', 'schemas')));
} catch (e) {
    console.log(`FAIL  schema drift: could not build a database -> ${e.message}`);
    process.exit(1);
}

let differences = 0;
for (const [name, sql] of Object.entries(SNAPSHOT)) {
    const a = (await fromMigrations.query(sql)).rows.map(key);
    const b = (await fromSchemas.query(sql)).rows.map(key);
    const onlyMigrations = a.filter((x) => !b.includes(x));
    const onlySchemas = b.filter((x) => !a.includes(x));
    if (onlyMigrations.length || onlySchemas.length) {
        differences += onlyMigrations.length + onlySchemas.length;
        console.log(`FAIL  ${name} differ`);
        for (const x of onlyMigrations) console.log(`        only in migrations: ${x}`);
        for (const x of onlySchemas) console.log(`        only in schemas:    ${x}`);
    } else {
        console.log(`PASS  ${name} match (${a.length})`);
    }
}

console.log(differences
    ? `\nSchema drift: ${differences} difference(s) between supabase/schemas and supabase/migrations.`
    : '\nNo schema drift: supabase/schemas and supabase/migrations describe the same database.');
process.exit(differences ? 1 : 0);
