-- HR Fashions: declarative schema. These files describe the database as it should be.
-- Migrations in ../migrations are the steps that got it there; tests/schema-drift.mjs checks both agree.
-- Files are numbered so plain SQL tools can apply them in dependency order.

-- Private schema for helper functions. Not exposed through the Data API, so nothing in it can be
-- called from the browser. Visitors and logged-in users get USAGE only so the row-level security
-- policies can call private.is_admin().
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
