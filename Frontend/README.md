# HR Fashions: front end

Vite + React 18 + Tailwind 3. Black and antique gold theme. Deployed on Vercel as a static site; Supabase is the only back end (added step by step, see docs/ARCHITECTURE.md).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in values; never commit .env.local
npm run dev                  # http://localhost:5173
npm run build                # production build into dist/
npm run lint
```

## Folder map

```text
src/
  app/            App.jsx: the router and the list of pages
  components/
    layout/       Layout, Header, Footer, ScrollToTop
    ui/           Hero, SectionTitle, OptimizedImage, ErrorBoundary
  pages/          one file per page (all but Home load on demand)
  data/           site.js (business details), services.js (service content)
  hooks/          useDocumentMeta (page title and description)
  lib/            images.js (image sizing), supabase.js (database client)
  config.js       the only file that reads environment variables
  styles/         index.css (Tailwind layers and button styles)
public/           favicon.svg, robots.txt
```

## Rules

- Colours and fonts live only in `tailwind.config.js` and `src/styles/index.css`.
- Business details (phone, address, email, hero photo) live only in `src/data/site.js`.
- Service text and prices live only in `src/data/services.js` (moves to Supabase later).
- Every `<img>` uses `OptimizedImage`. Only the first-screen image sets `priority`.
- New pages: add a file in `src/pages`, add a lazy route in `src/app/App.jsx`, call `useDocumentMeta`.
- Only `VITE_` variables reach the browser. Never put a service key or password in this folder.

## Content to confirm before launch

- Phone, email, address and delivery note in `src/data/site.js`.
- Prices, "35 Years of Experience", "free alterations" and similar claims in `src/data/services.js` and `src/pages/Home.jsx`.
- Wording that may be copied from other sites: rewrite it in your own words.
- Photos are temporary Unsplash links; replace them with your own work.
