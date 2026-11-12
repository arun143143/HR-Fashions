# HR Fashions: build prompts (updated 2026-11-11)

These replace the ten prompts in the "HR Fashion: Claude Code build prompts" doc.
They match the repo as it is today. Paste one at a time, in order.

## What changed from the old prompts

| Old prompt | Status now | What changed |
| --- | --- | --- |
| 0. CLAUDE.md | Done | `CLAUDE.md` exists at the repo root. |
| 1. Clean up the repo | Done but not committed | The cleanup is staged on `chore/single-frontend-folder`. Step 1 below commits it. |
| 2 to 6 | Not started | Paths were wrong: the app is `Frontend/`, not `Frontend/frontend`. Content is in `src/data/services.js` and `src/data/site.js`, not typed into `ServicePage.jsx`. Styles are in `src/styles/index.css`. |
| 7. Design polish | Moved earlier | It needs no database, so it can start now (steps 2 and 3). |
| 8 and 9 | Not started | Same content, new numbers. |

## Rules for every step

- Work from `Frontend/`. Read `CLAUDE.md` first and follow it.
- One branch per step, cut from `dev`. Open a pull request into `dev`. Never commit to `main` or `dev`.
- Show a short plan and wait for my OK before big changes.
- Before saying a step is done: `npm run lint` and `npm run build` must pass, and the pages must be checked in the browser at phone width (375px) and desktop width.
- Never print or commit a secret. Only `VITE_` values go in the front end.
- Phone, address, prices, "35 years", "free alterations" and Unsplash photos are placeholders. Do not present them as final; ask me for the real values.
- If something is unclear, ask me before guessing.

## Step 1: commit the cleanup (old prompts 0 and 1)

```text
On branch chore/single-frontend-folder the cleanup is staged but not committed. Check that no node_modules, dist or .env file is in the staged set (except .env.example). Run npm run lint and npm run build in Frontend/. Commit, push the branch and open a pull request into dev. Do not open or print Backend/.env. Remind me which keys I must rotate, because Backend/.env is still in the git history on GitHub (commit 7ec6687).
```

## Step 2: design direction and home page

```text
New branch feat/design-home from dev. Load the frontend-design skill and follow it. Keep the black and antique gold theme, Playfair Display and Lato; tokens stay only in tailwind.config.js and src/styles/index.css.
1. First show me a short design direction: layout of the home page section by section, type scale, spacing, the three brand motifs (thin gold zari border, faint kolam dot texture, stitched dashed line) and how motion is used. Wait for my OK.
2. Then rebuild Home, Header, Footer and Hero to that direction. Black about 80%, white text 15%, gold 5%. Gold buttons use black text. Replace grey #3D3D3D bands with charcoal #141414.
3. Home sections in order: hero, services tiles, how it works, why HR Fashions, FAQ, booking call to action, footer with map link and hours. Leave out reviews until I give real ones.
4. Motion with framer-motion: slow hero fade, scroll reveal on sections, all switched off under prefers-reduced-motion.
5. Every image goes through OptimizedImage. Only the hero sets priority. No layout shift.
Content still comes from src/data/services.js and src/data/site.js; keep those object shapes unchanged. Show screenshots at 375px and desktop width.
```

## Step 3: service pages, gallery and floating WhatsApp button

```text
New branch feat/design-pages from dev. Use the frontend-design skill and the design direction from step 2.
1. Restyle ServicesIndex, ServicePage, HowItWorks, BookAppointment (layout only) and NotFound to match Home.
2. Add src/data/designs.js (title, category, image, sortOrder, active) and a /gallery page with category filters (Blouse, Lehenga, Anarkali, Kids, Kurti and so on) and a keyboard-friendly lightbox. Add the lazy route in App.jsx and call useDocumentMeta.
3. Add a floating WhatsApp button on every page that opens wa.me with the number from site.js. WhatsApp green #1F7A4D, used only on that button.
4. Check contrast (4.5:1 for body text), focus rings, alt text and keyboard use on every page.
Show screenshots at 375px and desktop width.
```

## Step 4: Supabase tables, security rules and storage (old prompt 2)

```text
New branch feat/supabase-schema from dev. The HR Fashions Supabase project URL and anon key are in Frontend/.env.local (never print them). Create SQL migrations in supabase/migrations for:
Tables: profiles (id = auth user id, email, name, phone, role 'customer' or 'admin', default 'customer'); services (slug, title, description, hero_image, features, types, tips, sort_order, active); service_prices (service_id, label, price_text); designs (title, category, image_path, sort_order, active); banners (kind 'hero' or 'marquee', text, image_path, sort_order, active); faqs (service_id nullable, question, answer, sort_order); reviews (name, text, approved, created_at); bookings (user_id nullable, name, phone, area, garment, preferred_date, notes, status 'new','contacted','stitching','ready','delivered', created_at); settings (key, value).
Storage: a public bucket 'site-images', writable only by admins.
Security: row-level security on every table. Public reads only active or approved content and settings. Public can insert a booking but never select bookings. A customer reads and updates only their own profile and reads only their own bookings. Admins do everything, through an is_admin() helper. A trigger creates the profiles row on sign-up, always as 'customer'. Add length limits on booking text fields.
Seed services, prices and FAQs from src/data/services.js and settings from src/data/site.js, with placeholder values clearly marked.
Show me the SQL and wait for my OK before applying it. After applying, run the Supabase security and performance advisors and fix every warning. Finish with a table of who can read and write what, and a test showing the anon key cannot read bookings.
```

## Step 5: data layer and build snapshot (old prompt 3)

```text
New branch feat/data-layer from dev.
1. Create src/lib/content.js with functions that return services, prices, designs, banners, faqs, approved reviews and settings in the same object shapes that src/data/services.js, designs.js and site.js have today.
2. Add scripts/snapshot.mjs, run as prebuild, that fetches the content once and writes src/data/snapshot.json. Pages read the snapshot, so visitors never wait on Supabase. If Supabase is unreachable or the env values are missing, reuse the last committed snapshot and warn; the build must not fail.
3. Point the pages at the snapshot. Layout and theme must not change.
4. Add the Supabase Storage host to RESIZABLE_HOSTS in src/lib/images.js so OptimizedImage builds a srcset for it.
Show a before and after of Home and one service page; they should look the same.
```

## Step 6: email-code login and roles (old prompt 4)

```text
New branch feat/auth from dev. Supabase Auth with 6-digit email codes, no passwords. Use Supabase's default sender for now; Postmark comes later when I own a domain. Guard every use of supabase, because it is null when env values are missing.
1. Login button at the right end of the header (desktop and mobile menu). Modal: enter email, send code, enter code. Clear errors, a resend timer, and never reveal whether an email exists.
2. After login: admin goes to /admin, everyone else to /account. Header shows the name or email with Log out.
3. AuthProvider with useAuth (user, profile, isAdmin, loading) and ProtectedRoute. /admin/* needs admin; /account needs any login. Both are lazy routes.
4. /account: my own bookings with status; edit my name and phone.
5. Nobody becomes admin from the browser. Document in docs/ how I set the first admin in the Supabase dashboard.
Verify: a customer cannot open /admin and cannot read other people's bookings by calling the API directly.
```

## Step 7: admin panel (old prompt 5)

```text
New branch feat/admin from dev. Use the frontend-design skill. Build /admin as a dark and gold dashboard with a sidebar, protected by the admin role, lazy-loaded so it adds nothing to the public bundle. Sections:
1. Gallery: upload several photos by drag and drop to 'site-images', resize to max 1600px and convert to WebP in the browser first, set title and category, reorder, hide, replace, delete with a confirm.
2. Banners: hero image and text, and marquee messages.
3. Services and prices. 4. FAQs. 5. Reviews: approve or hide.
6. Bookings: table with search and status filter, detail view, change status, a button that opens WhatsApp to that customer with a pre-filled message, CSV export.
7. Settings: WhatsApp number, shop hours, address, announcement bar.
8. Publish button: a Supabase Edge Function, callable only by admins, that calls a Vercel deploy hook stored as a function secret.
Every form validates input, shows loading and error states, and works on a phone.
```

## Step 8: booking form and WhatsApp (old prompt 6)

```text
New branch feat/booking from dev. Replace src/pages/BookAppointment.jsx with a three-step form: (1) choose the garment from photo tiles built from the services data, (2) preferred date and notes, (3) name, WhatsApp number (validate Indian numbers) and area.
On submit: insert one row into bookings (attach user_id if logged in), then open wa.me with the shop number from settings and a pre-filled summary. If supabase is null or the insert fails, still open WhatsApp and tell the customer.
Add a hidden honeypot field and a limit of one submission per minute per browser. Show a thank-you screen with what happens next. Labels, focus states and keyboard use throughout.
```

## Step 9: SEO and performance (rest of old prompt 7)

```text
New branch feat/seo-perf from dev.
1. Titles and descriptions on every page through useDocumentMeta, Open Graph tags, sitemap.xml, and LocalBusiness structured data from the settings data.
2. Pre-render the public routes so search engines see the content.
3. Lighthouse mobile score of 90 or more on Home and one service page; largest content in under 2.5 s; each photo about 150 KB or less. Report the numbers.
```

## Step 10: deploy, keep-alive and backup (old prompt 8)

```text
New branch chore/deploy from dev.
1. Confirm npm ci and npm run build work on Linux with Frontend as the Vercel root directory.
2. Write docs/DEPLOY.md: connect the repo to Vercel, set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY and VITE_SITE_URL for Production and Preview, and create the deploy hook for Publish.
3. .github/workflows/keepalive.yml: one small read from Supabase every day, using GitHub Actions secrets.
4. A weekly workflow that exports bookings to a CSV artifact, using a read-only secret.
5. Document adding a custom domain later (Vercel, VITE_SITE_URL, Supabase Auth URLs, Postmark, Search Console).
6. Check Vercel's current free-plan terms on commercial use and give me the link.
```

## Step 11: final review before launch (old prompt 9)

```text
Review the whole project as a demanding senior engineer, without changing code. Report in a table (issue, severity, file, fix):
1. Security: try every table with the anon key and with a customer login; confirm /admin and Publish reject non-admins; search the files and git history for leaked keys.
2. Content: any placeholder or invented reviews, claims, phone numbers, prices or Unsplash photos still on the site.
3. Accessibility, mobile layout, broken links, missing alt text, console errors.
4. Performance and SEO results.
5. Failure cases: Supabase paused, offline, slow network, email limit reached, double-submitted booking.
Then propose fixes in priority order and wait for my approval.
```
