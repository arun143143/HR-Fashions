-- Not modelled by the schema diff: a permission change on a function Supabase itself creates
-- (it backs the "auto-enable RLS on new tables" setting and is run by the ensure_rls event trigger).
-- It sits in public, so without this the Data API exposes it at /rest/v1/rpc/rls_auto_enable.
-- Shipped by migrations/20261112120000_advisor_fixes.sql. Guarded because the function exists only
-- on the hosted project.
do $$
begin
    if to_regprocedure('public.rls_auto_enable()') is not null then
        revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
    end if;
end;
$$;
