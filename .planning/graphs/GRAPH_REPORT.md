# Graph Report - HR-Fashions  (2026-11-11)

## Corpus Check
- 40 files · ~12,484 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .example 1, .css 1)

## Summary
- 184 nodes · 337 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcd1c0e0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- Layout.jsx
- useDocumentMeta
- Home.jsx
- HR Fashions: build prompts (updated 2026-11-11)
- devDependencies
- App.jsx
- Gallery.jsx
- CLAUDE.md
- Frontend Design
- Architecture
- HR Fashions: front end
- supabase.js
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `useDocumentMeta()` - 16 edges
2. `OptimizedImage()` - 14 edges
3. `HR Fashions: build prompts (updated 2026-11-11)` - 14 edges
4. `react-router-dom` - 12 edges
5. `react` - 11 edges
6. `PageIntro()` - 11 edges
7. `App()` - 10 edges
8. `Layout()` - 9 edges
9. `lucide-react` - 7 edges
10. `ErrorBoundary` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Architecture` --references--> `ErrorBoundary`  [INFERRED]
  CLAUDE.md → Frontend/src/components/ui/ErrorBoundary.jsx
- `Architecture` --references--> `Home()`  [INFERRED]
  CLAUDE.md → Frontend/src/pages/Home.jsx
- `Architecture` --references--> `ServicePage()`  [INFERRED]
  CLAUDE.md → Frontend/src/pages/ServicePage.jsx
- `Architecture` --references--> `ServicesIndex()`  [INFERRED]
  CLAUDE.md → Frontend/src/pages/ServicesIndex.jsx
- `Rules` --references--> `OptimizedImage()`  [INFERRED]
  Frontend/README.md → Frontend/src/components/ui/OptimizedImage.jsx

## Import Cycles
- None detected.

## Communities (17 total, 4 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (30): dependencies, framer-motion, lucide-react, react, react-dom, react-router-dom, @supabase/supabase-js, engines (+22 more)

### Community 1 - "Layout.jsx"
Cohesion: 0.15
Nodes (15): Footer(), quickLinks, socials, Header(), navLinks, Layout(), PageLoader(), ScrollToTop() (+7 more)

### Community 2 - "useDocumentMeta"
Cohesion: 0.21
Nodes (15): Architecture, PageIntro(), DEFAULT_SERVICE_SLUG, getService(), serviceList, servicesBySlug, useDocumentMeta(), BookAppointment() (+7 more)

### Community 3 - "Home.jsx"
Cohesion: 0.22
Nodes (13): Hero(), DEFAULT_WIDTHS, OptimizedImage(), generalFaqs, steps, whatsappHref, imageSrcSet(), imageUrl() (+5 more)

### Community 4 - "HR Fashions: build prompts (updated 2026-11-11)"
Cohesion: 0.13
Nodes (14): HR Fashions: build prompts (updated 2026-11-11), Rules for every step, Step 10: deploy, keep-alive and backup (old prompt 8), Step 11: final review before launch (old prompt 9), Step 1: commit the cleanup (old prompts 0 and 1), Step 2: design direction and home page, Step 3: service pages, gallery and floating WhatsApp button, Step 4: Supabase tables, security rules and storage (old prompt 2) (+6 more)

### Community 5 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, postcss, tailwindcss (+4 more)

### Community 6 - "App.jsx"
Cohesion: 0.31
Nodes (8): App(), BookAppointment, Gallery, HowItWorks, NotFound, ServicePage, ServicesIndex, react-dom

### Community 7 - "Gallery.jsx"
Cohesion: 0.31
Nodes (6): designCategories, designList, designs, filterClass(), filters, Gallery()

### Community 8 - "CLAUDE.md"
Cohesion: 0.29
Nodes (5): Commands, Conventions, Git, Planned work, What this is

### Community 9 - "Frontend Design"
Cohesion: 0.29
Nodes (6): Design principles, Frontend Design, Ground your designs in the subject matter, More on writing in design, Process: plan, review against the brief, build, critique, Restraint and self-critique

### Community 10 - "Architecture"
Cohesion: 0.33
Nodes (5): Architecture, How to grow, Now, Planned (in order), Why it is fast

### Community 11 - "HR Fashions: front end"
Cohesion: 0.33
Nodes (5): Content to confirm before launch, Folder map, HR Fashions: front end, Rules, Run it

### Community 12 - "supabase.js"
Cohesion: 0.50
Nodes (3): config, supabase, @supabase/supabase-js

## Knowledge Gaps
- **10 isolated node(s):** `framer-motion`, `@types/react`, `@types/react-dom`, `autoprefixer`, `eslint` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 96 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Layout.jsx` to `package.json`, `useDocumentMeta`, `Home.jsx`, `App.jsx`, `Gallery.jsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `framer-motion`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Why does `react-router-dom` connect `Layout.jsx` to `package.json`, `useDocumentMeta`, `Home.jsx`, `App.jsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `HR Fashions: build prompts (updated 2026-11-11)` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._