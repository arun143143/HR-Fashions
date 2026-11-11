# Supabase: database, security rules and photo storage

Nothing here has been applied to a live project yet. Create the HR Fashions Supabase project first (so the owner owns it), then apply these files.

## What is in this folder

| Path | What it does |
| --- | --- |
| `migrations/20261111120000_schema.sql` | Tables: profiles, services, service_prices, designs, banners, faqs, reviews, bookings, settings |
| `migrations/20261111120100_security.sql` | `is_admin()`, the sign-up trigger, grants and row-level security on every table |
| `migrations/20261111120200_storage.sql` | Public `site-images` bucket; only admins upload, replace, delete or list |
| `seed.sql` | Starting content, generated from `Frontend/src/data`. All placeholder until the owner confirms it |
| `scripts/build-seed.mjs` | Regenerates `seed.sql`: `node supabase/scripts/build-seed.mjs` |
| `tests/rls-test.mjs` | 44 checks of who can do what, on an in-memory Postgres: `cd supabase/tests && npm install && npm test` |

## Who can do what

| Table | Visitor (anon key) | Logged-in customer | Admin |
| --- | --- | --- | --- |
| services, service_prices, designs, banners | Read active ones | Read active ones | Read and change all |
| faqs | Read general ones and those of active services | Same | Read and change all |
| reviews | Read approved ones | Read approved ones | Read, add, approve, delete |
| settings | Read public keys | Read public keys | Read and change all |
| bookings | Add one (status is always `new`, no account attached) | Add one in their own name; read only their own | Read all; change status; delete |
| profiles | Nothing | Read their own; change only name and phone | Read all; change none through the API |
| storage `site-images` | View photos by URL | View photos by URL | Upload, replace, delete, list |

Two locks apply everywhere: grants decide which operations a role may try at all (column by column for bookings and profiles), and row-level security decides which rows.

- Nobody can become admin from the browser. `profiles.role` cannot be updated through the API, by customers or by admins.
- Admins cannot rewrite a customer's booking details, only the status.
- The public can add a booking but never read one back. In the site, insert without asking for the row back (no `.select()` after `.insert()`), or the request fails.

## Applying it to the project

With the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started):

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Then load the starting content once, in the dashboard's SQL editor, by pasting `seed.sql`. Run it again only to reset content: it empties the content tables but never touches bookings or profiles.

Without the CLI: paste the three migration files into the SQL editor in date order, then `seed.sql`.

After applying, run the security and performance advisors (Dashboard, Advisors) and fix any warning.

## Making the first admin

1. Log in on the site once with the admin's email, so the profile row exists.
2. In the dashboard's SQL editor, run:

```sql
update public.profiles set role = 'admin' where email = 'owner@example.com';
```

Remove admin the same way, with `role = 'customer'`.

## What the tests do not cover

The test imitates Supabase's `auth.uid()`, roles and storage tables. It cannot test real logins, the REST API or the storage service itself. Repeat the key checks on the real project after applying: as a visitor, list bookings (must fail); as a customer, list bookings (must show only theirs).
