// The parts of Supabase the HR Fashions SQL relies on, recreated on an in-memory Postgres (PGlite):
// auth.users, auth.uid(), the anon/authenticated/service_role roles, the storage tables, and
// Supabase's default grants on the public schema.
import { PGlite } from '@electric-sql/pglite';

export async function supabaseLikeDb() {
    const db = new PGlite();
    await db.exec(`
        create role anon nologin;
        create role authenticated nologin;
        create role service_role nologin bypassrls;
        create schema auth;
        create table auth.users (id uuid primary key default gen_random_uuid(), email text);
        create function auth.uid() returns uuid language sql stable as
            $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
        grant usage on schema auth to anon, authenticated;
        grant execute on function auth.uid() to anon, authenticated;

        create schema storage;
        create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
        create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id), name text);
        alter table storage.objects enable row level security;
        grant usage on schema storage to anon, authenticated;
        grant all on storage.objects to anon, authenticated;
        grant select on storage.buckets to anon, authenticated;

        -- Supabase grants everything in public to these roles by default; the SQL must take it back.
        grant usage on schema public to anon, authenticated;
        alter default privileges in schema public grant all on tables to anon, authenticated;
        alter default privileges in schema public grant all on functions to anon, authenticated;
    `);
    return db;
}
