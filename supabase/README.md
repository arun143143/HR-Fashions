# Supabase: database, security rules and photo storage

The HR Fashions Supabase project is `pxfylpvxhszpoyqqoaab` (owned by the owner's account; Claude Code reaches it through `.mcp.json`). The four migrations below and `seed.sql` were applied on 2026-11-12. Apply any further change only with the owner's go-ahead.

## Code first: the schema files are the source of truth

`schemas/` describes the database as it should be. `migrations/` holds the steps that got the live project there. `tests/schema-drift.mjs` builds one database from each and fails if they differ, so the two can never drift apart unnoticed.

There is no Docker on the development machine, so the Supabase CLI cannot write migrations for us (`supabase db schema declarative sync` needs a local database). Until Docker is available, a change goes like this:

1. Edit the right file in `schemas/`.
2. Create the migration file with `cd Frontend && npm run db:new -- <short_name>` (the CLI is installed in `Frontend/`), and write the SQL that takes the live database from today's state to the new one.
3. `cd supabase/tests && npm test`: all permission checks pass and the drift check reports no drift.
4. Apply the migration to the live project with the Supabase MCP `apply_migration` tool, named after the file without its timestamp.
5. Run the advisors (MCP `get_advisors`, security and performance) and fix every warning the same way.
6. Regenerate the frontend types: `cd Frontend && npm run db:types` (see `Frontend/src/types/`).

With Docker installed, step 2 becomes `npx supabase db schema declarative sync -f <short_name> --no-apply`, which writes the migration from the schema files for you. Keep running step 3.

Data never goes in `schemas/` (the schema diff refuses `insert`, `update` and `delete`): content goes in `seed.sql`, and one-off data such as the storage bucket row goes in a migration.

## What is in this folder

| Path | What it does |
| --- | --- |
| `schemas/00_schemas.sql` | The private schema for helper functions |
| `schemas/10_tables.sql` | Tables: profiles, services, service_prices, designs, banners, faqs, reviews, bookings, settings |
| `schemas/20_functions.sql` | `private.is_admin()` and the sign-up function |
| `schemas/30_grants.sql` | Which operations each role may attempt |
| `schemas/40_policies.sql` | Row-level security on every table, one read policy each plus admin write policies |
| `schemas/50_storage_policies.sql` | Only admins upload, replace, delete or list photos in `site-images` |
| `schemas/60_triggers.sql` | New Auth user gets a customer profile |
| `schemas/_custom/` | SQL the schema diff does not model (a revoke on Supabase's own `rls_auto_enable()`) |
| `migrations/20261111120000_schema.sql` | Tables |
| `migrations/20261111120100_security.sql` | `is_admin()`, the sign-up trigger, grants and row-level security |
| `migrations/20261111120200_storage.sql` | Public `site-images` bucket and its policies |
| `migrations/20261112120000_advisor_fixes.sql` | Fixes from the first advisor run: `rls_auto_enable()` no longer callable through the API; admin policies split so each table has one read policy |
| `config.toml` | Supabase CLI settings (made by `supabase init`; pg-delta is the diff engine) |
| `seed.sql` | Starting content, generated from `Frontend/src/data`. All placeholder until the owner confirms it |
| `scripts/build-seed.mjs` | Regenerates `seed.sql`: `node supabase/scripts/build-seed.mjs` |
| `tests/rls-test.mjs` | 47 checks of who can do what, on an in-memory Postgres |
| `tests/schema-drift.mjs` | Compares the database built from `schemas/` with the one built from `migrations/` |

Run both tests with `cd supabase/tests && npm install && npm test`.

## Who can do what

| Table | Visitor (publishable key) | Logged-in customer | Admin |
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

## Applying to a new project

With the Supabase CLI v3 (`npx supabase` from `Frontend/`, add `--workdir ..`):

```bash
npx supabase link <project-ref>
npx supabase db push --remote
```

Then load the starting content once, in the dashboard's SQL editor, by pasting `seed.sql`. Run it again only to reset content: it empties the content tables but never touches bookings or profiles.

Without the CLI: paste the migration files into the SQL editor in date order, then `seed.sql`.

After applying, run the security and performance advisors (Dashboard, Advisors) and fix any warning. The four "unused index" notes in the performance advisor are expected until the site has traffic.

## Making the first admin

1. Log in on the site once with the admin's email, so the profile row exists.
2. In the dashboard's SQL editor, run:

```sql
update public.profiles set role = 'admin' where email = 'owner@example.com';
```

Remove admin the same way, with `role = 'customer'`.

## What the tests do not cover

The tests imitate Supabase's `auth.uid()`, roles and storage tables. They cannot test real logins, the REST API or the storage service itself. Repeat the key checks on the real project after applying: as a visitor, list bookings (must fail); as a customer, list bookings (must show only theirs).
