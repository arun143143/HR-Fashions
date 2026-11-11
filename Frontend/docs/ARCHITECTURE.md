# Architecture

## Now
Static React site. All content is in `src/data`. No server, no database calls.

## Planned (in order)
1. Supabase tables and security rules; content moves from `src/data` to the database.
2. A build step saves the content into `src/data/snapshot.json`, so visitors never wait on the database.
3. Email-code login, My account, and the /admin panel (roles checked in the database).
4. Booking form saves a row, then opens WhatsApp with the details filled in.
5. Vercel deploy, daily keep-alive for the free Supabase project, weekly backup.

## Why it is fast
- Pages other than Home load only when visited.
- React and GSAP are separate cached files.
- Images are sized for the screen (`srcset`), lazy-loaded, and have reserved space.
- The hero image is preloaded and fetched at high priority.
- Fonts connect early and use `display=swap`.

## How to grow
- Add a service: one entry in `src/data/services.js` (later a row in Supabase). Home, footer, index and page update by themselves.
- Move a setting to the environment: add it to `src/config.js` and `.env.example`.
- Change the theme: edit `tailwind.config.js` only.
