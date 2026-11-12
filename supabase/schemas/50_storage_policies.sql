-- Photo storage rules for the public 'site-images' bucket.
-- The bucket row itself is data, not schema, so it lives in migrations/20261111120200_storage.sql.
-- Anyone can view a photo by its URL; only admins can upload, replace, delete or list.

create policy "Admins upload site images"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'site-images' and (select private.is_admin()));

create policy "Admins update site images"
    on storage.objects for update to authenticated
    using (bucket_id = 'site-images' and (select private.is_admin()))
    with check (bucket_id = 'site-images' and (select private.is_admin()));

create policy "Admins delete site images"
    on storage.objects for delete to authenticated
    using (bucket_id = 'site-images' and (select private.is_admin()));

create policy "Admins list site images"
    on storage.objects for select to authenticated
    using (bucket_id = 'site-images' and (select private.is_admin()));
