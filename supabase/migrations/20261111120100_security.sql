-- HR Fashions: who can read and write what.
--
-- Two locks on every table:
--   1. Grants say which operations a role may attempt at all (least privilege, column-level where it matters).
--   2. Row-level security policies say which rows. The anon key in the browser can do nothing else.
--
-- Roles: anon = visitor, authenticated = logged-in customer or admin. Admin is decided by profiles.role,
-- checked in the database by is_admin(). Nobody can make themselves admin: role cannot be updated
-- through the API by anyone; it is changed only in the Supabase dashboard (SQL editor).

-- ---------------------------------------------------------------------------
-- Private schema for helper functions
-- ---------------------------------------------------------------------------
-- Not exposed through the Data API, so these functions cannot be called from the browser.
-- Visitors and logged-in users get USAGE only so the row-level security policies below can call is_admin().
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Admin check
-- ---------------------------------------------------------------------------
-- Reports only on the calling user (auth.uid()), never on anyone else.
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

-- ---------------------------------------------------------------------------
-- New sign-up gets a profile, always as a customer
-- ---------------------------------------------------------------------------
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

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function private.handle_new_user();

-- ---------------------------------------------------------------------------
-- Grants: start from nothing, then give each role only what it needs
-- ---------------------------------------------------------------------------
revoke all on table
    public.profiles, public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.bookings, public.settings
from anon, authenticated;

-- Site content: everyone may read; logged-in users may write, and the policies below limit that to admins.
grant select on table
    public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.settings
to anon, authenticated;

grant insert, update, delete on table
    public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.settings
to authenticated;

-- Bookings: anyone may add one. Only admins read them or change their status.
grant insert (user_id, name, phone, area, garment, preferred_date, notes) on table public.bookings to anon, authenticated;
grant select on table public.bookings to authenticated;
grant update (status) on table public.bookings to authenticated;
grant delete on table public.bookings to authenticated;

-- Profiles: read your own (admins read all); change only your name and phone. Never role, never email.
grant select on table public.profiles to authenticated;
grant update (name, phone) on table public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.profiles       enable row level security;
alter table public.services       enable row level security;
alter table public.service_prices enable row level security;
alter table public.designs        enable row level security;
alter table public.banners        enable row level security;
alter table public.faqs           enable row level security;
alter table public.reviews        enable row level security;
alter table public.bookings       enable row level security;
alter table public.settings       enable row level security;

-- Profiles
create policy "Own profile or admin can read"
    on public.profiles for select to authenticated
    using (id = (select auth.uid()) or (select private.is_admin()));

create policy "Own profile can be updated"
    on public.profiles for update to authenticated
    using (id = (select auth.uid()))
    with check (id = (select auth.uid()));

-- Services: public sees active ones; admins see and manage all.
create policy "Active services are public"
    on public.services for select to anon, authenticated
    using (active or (select private.is_admin()));
create policy "Admins manage services"
    on public.services for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Prices: public sees prices of active services.
create policy "Prices of active services are public"
    on public.service_prices for select to anon, authenticated
    using (
        exists (select 1 from public.services s where s.id = service_id and s.active)
        or (select private.is_admin())
    );
create policy "Admins manage prices"
    on public.service_prices for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Gallery
create policy "Active designs are public"
    on public.designs for select to anon, authenticated
    using (active or (select private.is_admin()));
create policy "Admins manage designs"
    on public.designs for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Banners
create policy "Active banners are public"
    on public.banners for select to anon, authenticated
    using (active or (select private.is_admin()));
create policy "Admins manage banners"
    on public.banners for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- FAQs (general, and those of active services)
create policy "FAQs are public"
    on public.faqs for select to anon, authenticated
    using (
        service_id is null
        or exists (select 1 from public.services s where s.id = service_id and s.active)
        or (select private.is_admin())
    );
create policy "Admins manage FAQs"
    on public.faqs for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Reviews
create policy "Approved reviews are public"
    on public.reviews for select to anon, authenticated
    using (approved or (select private.is_admin()));
create policy "Admins manage reviews"
    on public.reviews for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Settings: public sees public keys only.
create policy "Public settings are public"
    on public.settings for select to anon, authenticated
    using (is_public or (select private.is_admin()));
create policy "Admins manage settings"
    on public.settings for all to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

-- Bookings
-- A visitor books without an account (user_id empty). A logged-in customer may attach only their own id.
create policy "Anyone can send a booking request"
    on public.bookings for insert to anon, authenticated
    with check (
        status = 'new'
        and (user_id is null or user_id = (select auth.uid()))
    );

create policy "Customers read their own bookings, admins read all"
    on public.bookings for select to authenticated
    using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy "Admins change booking status"
    on public.bookings for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));

create policy "Admins delete bookings"
    on public.bookings for delete to authenticated
    using ((select private.is_admin()));
