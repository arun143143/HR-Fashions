-- Helper functions. Both live in the private schema, out of reach of the Data API.

-- Admin check. Reports only on the calling user (auth.uid()), never on anyone else.
-- EXECUTE stays granted to anon and authenticated on purpose: the policies call it.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1 from public.profiles
        where id = (select auth.uid()) and role = 'admin'
    );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

-- New sign-up gets a profile, always as a customer. Called only by the trigger in 60_triggers.sql.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email)
    on conflict (id) do nothing;
    return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated, service_role;
