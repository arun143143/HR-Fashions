-- Tables. Column shapes follow Frontend/src/data so the site maps rows to its content with small changes.

-- People who log in. One row per Supabase Auth user, created by a trigger on sign-up.
create table public.profiles (
    id          uuid primary key references auth.users (id) on delete cascade,
    email       text,
    name        text check (char_length(name) <= 80),
    phone       text check (char_length(phone) <= 20),
    role        text not null default 'customer' check (role in ('customer', 'admin')),
    created_at  timestamptz not null default now()
);

-- Garments the shop stitches.
create table public.services (
    id          bigint generated always as identity primary key,
    slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    name        text not null check (char_length(name) <= 60),
    title       text not null check (char_length(title) <= 120),
    description text not null default '',
    hero_image  text,
    features    text[] not null default '{}',
    types       jsonb  not null default '[]'::jsonb,  -- [{ "name": "", "desc": "" }]
    tips        jsonb  not null default '[]'::jsonb,  -- [{ "title": "", "desc": "" }]
    sort_order  integer not null default 0,
    active      boolean not null default true,
    created_at  timestamptz not null default now()
);

-- Starting prices per service.
create table public.service_prices (
    id          bigint generated always as identity primary key,
    service_id  bigint not null references public.services (id) on delete cascade,
    label       text not null check (char_length(label) <= 80),
    price_text  text not null check (char_length(price_text) <= 30),
    sort_order  integer not null default 0
);
create index service_prices_service_id_idx on public.service_prices (service_id);

-- Gallery photos.
create table public.designs (
    id          bigint generated always as identity primary key,
    title       text not null check (char_length(title) <= 120),
    category    text not null check (char_length(category) <= 40),
    image_path  text not null,
    sort_order  integer not null default 0,
    active      boolean not null default true,
    created_at  timestamptz not null default now()
);

-- Hero image and text, and the scrolling strip messages.
create table public.banners (
    id          bigint generated always as identity primary key,
    kind        text not null check (kind in ('hero', 'marquee')),
    text        text not null check (char_length(text) <= 200),
    image_path  text,
    sort_order  integer not null default 0,
    active      boolean not null default true
);

-- Questions and answers. service_id null = a general question; otherwise one of that service's questions.
create table public.faqs (
    id          bigint generated always as identity primary key,
    service_id  bigint references public.services (id) on delete cascade,
    question    text not null check (char_length(question) <= 200),
    answer      text not null check (char_length(answer) <= 2000),
    sort_order  integer not null default 0
);
create index faqs_service_id_idx on public.faqs (service_id);

-- Customer reviews. Shown on the site only after an admin approves them.
create table public.reviews (
    id          bigint generated always as identity primary key,
    name        text not null check (char_length(name) <= 80),
    text        text not null check (char_length(text) <= 1000),
    approved    boolean not null default false,
    created_at  timestamptz not null default now()
);

-- Booking requests from the site. The public can add one but never read any.
create table public.bookings (
    id              bigint generated always as identity primary key,
    user_id         uuid references auth.users (id) on delete set null,
    name            text not null check (char_length(btrim(name)) between 1 and 80),
    phone           text not null check (phone ~ '^\+?[0-9][0-9 -]{7,18}$'),
    area            text check (char_length(area) <= 80),
    garment         text not null check (char_length(garment) between 1 and 80),
    preferred_date  date,
    notes           text check (char_length(notes) <= 1000),
    status          text not null default 'new'
                    check (status in ('new', 'contacted', 'stitching', 'ready', 'delivered')),
    created_at      timestamptz not null default now()
);
create index bookings_user_id_idx on public.bookings (user_id);
create index bookings_created_at_idx on public.bookings (created_at desc);

-- Shop settings as key and value: whatsapp_number, shop_hours, address, announcement.
create table public.settings (
    key         text primary key check (key ~ '^[a-z_]+$'),
    value       text not null default '' check (char_length(value) <= 500),
    is_public   boolean not null default true
);
