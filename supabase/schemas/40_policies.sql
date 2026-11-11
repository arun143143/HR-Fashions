-- Row-level security. Every table in public has it on.
-- One SELECT policy per table (its "or private.is_admin()" covers admins), plus separate admin
-- insert, update and delete policies, so Postgres never runs two read policies on one query.
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
create policy "Admins add services"
    on public.services for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change services"
    on public.services for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete services"
    on public.services for delete to authenticated
    using ((select private.is_admin()));

-- Prices: public sees prices of active services.
create policy "Prices of active services are public"
    on public.service_prices for select to anon, authenticated
    using (
        exists (select 1 from public.services s where s.id = service_id and s.active)
        or (select private.is_admin())
    );
create policy "Admins add prices"
    on public.service_prices for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change prices"
    on public.service_prices for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete prices"
    on public.service_prices for delete to authenticated
    using ((select private.is_admin()));

-- Gallery
create policy "Active designs are public"
    on public.designs for select to anon, authenticated
    using (active or (select private.is_admin()));
create policy "Admins add designs"
    on public.designs for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change designs"
    on public.designs for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete designs"
    on public.designs for delete to authenticated
    using ((select private.is_admin()));

-- Banners
create policy "Active banners are public"
    on public.banners for select to anon, authenticated
    using (active or (select private.is_admin()));
create policy "Admins add banners"
    on public.banners for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change banners"
    on public.banners for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete banners"
    on public.banners for delete to authenticated
    using ((select private.is_admin()));

-- FAQs (general, and those of active services)
create policy "FAQs are public"
    on public.faqs for select to anon, authenticated
    using (
        service_id is null
        or exists (select 1 from public.services s where s.id = service_id and s.active)
        or (select private.is_admin())
    );
create policy "Admins add FAQs"
    on public.faqs for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change FAQs"
    on public.faqs for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete FAQs"
    on public.faqs for delete to authenticated
    using ((select private.is_admin()));

-- Reviews
create policy "Approved reviews are public"
    on public.reviews for select to anon, authenticated
    using (approved or (select private.is_admin()));
create policy "Admins add reviews"
    on public.reviews for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change reviews"
    on public.reviews for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete reviews"
    on public.reviews for delete to authenticated
    using ((select private.is_admin()));

-- Settings: public sees public keys only.
create policy "Public settings are public"
    on public.settings for select to anon, authenticated
    using (is_public or (select private.is_admin()));
create policy "Admins add settings"
    on public.settings for insert to authenticated
    with check ((select private.is_admin()));
create policy "Admins change settings"
    on public.settings for update to authenticated
    using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete settings"
    on public.settings for delete to authenticated
    using ((select private.is_admin()));

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
