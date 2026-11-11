# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing and booking site for HR Fashions, a tailoring business. The only app is `Frontend/`: Vite 5, React 18, React Router 6, Tailwind 3 and framer-motion, deployed to Vercel as a static SPA (`vercel.json` rewrites every path to `index.html`). Supabase is the planned back end. There is no server code: the old `Backend/` folder is being removed.

## Commands

Run these from `Frontend/` (Node >= 18):

```bash
npm install
cp .env.example .env.local   # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SITE_URL
npm run dev                  # http://localhost:5173
npm run build                # output goes to dist/
npm run preview              # serve the built dist/
npm run lint                 # ESLint, --max-warnings 0, so any warning fails
```

There is no test framework yet. `npm run lint` and `npm run build` are the only checks.

## Architecture

- **Routing:** `src/app/App.jsx` holds every route. `Home` is imported eagerly. Every other page uses `React.lazy`, and `Layout.jsx` wraps `<Outlet />` in `ErrorBoundary` and `Suspense`. A new page needs a file in `src/pages/`, a lazy route in `App.jsx`, and a call to `useDocumentMeta(title, description)`.
- **Content is data-driven:**
  - `src/data/site.js` holds the business details: phone, WhatsApp number, address and hero photo.
  - `src/data/services.js` holds the service content, keyed by slug: `heroImg`, `features`, `types`, `tips`, `faqs` and `pricing`. It feeds the Home tiles, the footer links, `ServicesIndex` and `ServicePage` (`/services/:slug`).
  - To add a service, add one entry there. These files are planned to move to Supabase, so keep the object shape stable to keep that swap small.
- **Environment:** `src/config.js` is the only file that reads `import.meta.env`. To add a setting, put it there and in `.env.example`. Only `VITE_` variables reach the browser, so never put a Supabase service key or any other secret in this app.
- **Supabase:** `src/lib/supabase.js` exports `null` when the env values are missing, so the site must still render without a database. Guard every use.
- **Images:** every `<img>` goes through `components/ui/OptimizedImage`. `lib/images.js` builds a `srcset` only for hosts in `RESIZABLE_HOSTS` (Unsplash for now). Only the first-screen image sets `priority`.
- **Theme:** colours and fonts live only in `tailwind.config.js` (black and antique gold, e.g. `black-950` and `gold-500`) and in `src/styles/index.css` (Tailwind layers and button classes).
- **Bundle:** `vite.config.js` splits out `react` (react, react-dom, react-router-dom) and `icons` (lucide-react) as manual chunks, so these vendor files stay cached between releases.

## Planned work

Order from `docs/ARCHITECTURE.md`:

1. Supabase tables and RLS.
2. A build step that snapshots the content into `src/data/snapshot.json`.
3. Email-code login, My account, and `/admin` with roles checked in the database.
4. The booking form saves a row, then opens WhatsApp with the details filled in.
5. Vercel deploy, a daily keep-alive for the free Supabase project, and a weekly backup.

## Conventions

- `.editorconfig`: 4-space indent (2 for JSON and YAML), LF line endings, UTF-8.
- ESLint turns off `react/prop-types` and `react/no-unescaped-entities`.
- Prices, claims ("35 Years of Experience", "free alterations"), contact details and Unsplash photos are placeholders until the owner confirms them. Do not present them as final.

## Git

- `node_modules/` and `dist/` are ignored; never commit them.
- `.gitattributes` forces LF line endings to match `.editorconfig`.
- Work happens on a branch with a PR. Do not commit to `main` or `dev` directly.
