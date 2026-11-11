-- HR Fashions: photo storage.
-- One public bucket. Anyone can view a photo by its URL; only admins can upload, replace or delete.
-- Photos are resized to WebP in the admin panel before upload, so 5 MB is a generous ceiling.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png', 'image/avif'])
on conflict (id) do nothing;

create policy "Admins upload site images"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'site-images' and (select public.is_admin()));

create policy "Admins update site images"
    on storage.objects for update to authenticated
    using (bucket_id = 'site-images' and (select public.is_admin()))
    with check (bucket_id = 'site-images' and (select public.is_admin()));

create policy "Admins delete site images"
    on storage.objects for delete to authenticated
    using (bucket_id = 'site-images' and (select public.is_admin()));

-- Admins can list the bucket (the gallery manager needs it). The public views photos by URL only.
create policy "Admins list site images"
    on storage.objects for select to authenticated
    using (bucket_id = 'site-images' and (select public.is_admin()));
