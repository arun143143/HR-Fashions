-- Grants: which operations each role may attempt at all. Row-level security (40_policies.sql) then
-- decides which rows. Supabase grants everything in public to anon and authenticated by default,
-- so start from nothing and give each role only what it needs.
revoke all on table
    public.profiles, public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.bookings, public.settings
from anon, authenticated;

-- Site content: everyone may read; logged-in users may write, and the policies limit that to admins.
grant select on table
    public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.settings
to anon, authenticated;

grant insert, update, delete on table
    public.services, public.service_prices, public.designs, public.banners,
    public.faqs, public.reviews, public.settings
to authenticated;

-- Bookings: anyone may add one (named columns only, so nobody sets a status). Only admins read them
-- or change their status.
grant insert (user_id, name, phone, area, garment, preferred_date, notes) on table public.bookings to anon, authenticated;
grant select on table public.bookings to authenticated;
grant update (status) on table public.bookings to authenticated;
grant delete on table public.bookings to authenticated;

-- Profiles: read your own (admins read all); change only your name and phone. Never role, never email.
grant select on table public.profiles to authenticated;
grant update (name, phone) on table public.profiles to authenticated;
