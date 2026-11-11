-- HR Fashions: fixes for the Supabase advisor findings after the first deploy.

-- ---------------------------------------------------------------------------
-- Security 0028 / 0029: public.rls_auto_enable() callable by anon and authenticated
-- ---------------------------------------------------------------------------
-- Supabase creates this SECURITY DEFINER function for the "auto-enable RLS on new tables"
-- project setting; the ensure_rls event trigger runs it. Because it sits in public, the Data API
-- exposed it at /rest/v1/rpc/rls_auto_enable. Event triggers do not check EXECUTE when they fire,
-- so taking EXECUTE away from the API roles closes the endpoint and keeps the trigger working.
-- Guarded because the function exists only on the hosted project, not in the local test database.
do $$
begin
    if to_regprocedure('public.rls_auto_enable()') is not null then
        revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
    end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Performance 0006: multiple permissive SELECT policies for authenticated
-- ---------------------------------------------------------------------------
-- Each "Admins manage ..." policy was FOR ALL, so it added a second SELECT policy next to the
-- public read policy, and Postgres ran both on every read. The public read policies already
-- include "or private.is_admin()", so admins only need write policies. Same access, one SELECT
-- policy per table.
do $$
declare
    t record;
begin
    for t in
        select * from (values
            ('services',       'Admins manage services', 'services'),
            ('service_prices', 'Admins manage prices',   'prices'),
            ('designs',        'Admins manage designs',  'designs'),
            ('banners',        'Admins manage banners',  'banners'),
            ('faqs',           'Admins manage FAQs',     'FAQs'),
            ('reviews',        'Admins manage reviews',  'reviews'),
            ('settings',       'Admins manage settings', 'settings')
        ) as v (tbl, old_policy, noun)
    loop
        execute format('drop policy %I on public.%I', t.old_policy, t.tbl);

        execute format(
            'create policy %I on public.%I for insert to authenticated with check ((select private.is_admin()))',
            'Admins add ' || t.noun, t.tbl);
        execute format(
            'create policy %I on public.%I for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))',
            'Admins change ' || t.noun, t.tbl);
        execute format(
            'create policy %I on public.%I for delete to authenticated using ((select private.is_admin()))',
            'Admins delete ' || t.noun, t.tbl);
    end loop;
end;
$$;

-- Performance 0005 (unused index) is left as is on purpose: the four indexes cover the foreign keys
-- service_prices.service_id, faqs.service_id and bookings.user_id, and the newest-first booking
-- list. They are "unused" only because the project has had no traffic yet.
