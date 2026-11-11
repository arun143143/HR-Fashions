# Design review: making HR Fashions look hand-made

Written 2026-11-11. This checks common advice about "sites that look AI-generated" against the HR Fashions code as it is today, and turns it into a short list of actions.

**The short answer:** the layout and styling already read as designed for this shop. What still gives the site away as a template is the **stock photos**, some **stock marketing phrases** in the service text, and **stock icons**. Real photos of the shop's own work would fix more than every other change on this page combined.

The goal is not to hide how the site was built. The goal is a site that could only belong to HR Fashions: its garments, its shop, its words.

## 1. The advice, judged for this shop

| Advice | Verdict for HR Fashions | Why |
| --- | --- | --- |
| Use real photography, no stock | **Adopt. Top priority** | The Unsplash placeholders are the biggest "template" signal on the site |
| Write human, brand-specific copy | **Adopt** | Stock phrases remain in `src/data/services.js` |
| Customise Tailwind instead of using defaults | Already done | Own colours and fonts in `tailwind.config.js`; own motifs in `src/styles/index.css` |
| Add scroll motion with GSAP | Already done. Keep it restrained | One hero load animation and one scroll scene (`ScrollScene.jsx`). Motion on every section is itself a generated-site habit |
| Use custom icons, not Lucide or Heroicons | **Adopt, as a small set** | 16 different Lucide icons, used 19 times across 6 files |
| Add micro-interactions | Adopt a few | A stitch-line underline on links and a pressed state on buttons suit the brand |
| Design in Figma first, sketch on paper | Optional | The owner is not a designer. The frontend-design skill's plan-and-review pass does this job here |
| WebGL, Three.js, particles, fluid effects | **Reject** | Heavy on mid-range phones, breaks the Lighthouse 90 target, and does not help anyone book a blouse |
| Custom cursor, 404 games, grain overlays | Reject | Novelty rather than craft. They cost speed or accessibility |
| Light and dark mode toggle | Reject for now | Black and antique gold is the brand by choice |
| Hide that AI was used | Reframe | Aim for specific and honest, not disguised |

Two parts of the advice contradict its own goal:

- It recommends **Playfair Display and Inter**. These are among the most common choices on generated sites. HR Fashions keeps Playfair Display and Lato because the owner chose that theme, not because they are distinctive.
- It recommends making **elements fade or slide in as you scroll**. Doing that on every section is exactly what generated sites do. One deliberate moment lands better than many small ones.

## 2. The site today, from the code

### Already reads as hand-made

| What | Where |
| --- | --- |
| Own colour tokens: onyx, charcoal, antique gold, soft gold | `tailwind.config.js` |
| Brand motifs: running stitch, zari frame, zari temple band, kolam dots | `src/styles/index.css` |
| Layouts built for the content: arched photo tiles, split hero, sticky price panel, stitched step line | `src/pages/Home.jsx`, `src/pages/ServicePage.jsx` |
| Sentence case everywhere; no all-caps labels above headings | All pages |
| Numbers only where the content is a real sequence (the five steps) | `src/data/process.js` |
| Motion limited to one load moment and one scroll scene, both off for reduced motion | `src/components/ui/Hero.jsx`, `src/components/ui/ScrollScene.jsx` |
| Almost no shadows or gradient decoration | Only the floating WhatsApp button has a shadow; gradients appear only behind text on photos, for legibility |

### Still reads as a template

| What | Where | Fix |
| --- | --- | --- |
| Unsplash stock photos | `src/data/services.js`, `src/data/designs.js`, `src/data/site.js`, `src/components/ui/ScrollScene.jsx` | Owner's own photos (action 1) |
| Stock marketing phrases, for example "Experience the perfect fit…", "Power dressing meets elegance…" | `src/data/services.js` (descriptions) | Rewrite from owner facts (action 2) |
| Title Case feature lists such as "Premium Interlining" and "Princess Cut & Katori Cut Expertise" | `src/data/services.js` (features) | Sentence case, concrete wording (action 2) |
| ~~Lucide icons~~ | `src/components/layout/Footer.jsx`, `src/components/layout/Header.jsx`, `src/components/ui/WhatsAppButton.jsx`, `src/pages/Gallery.jsx`, `src/pages/Home.jsx`, `src/pages/ServicePage.jsx` | Done: custom set in `src/components/ui/Icons.jsx` |
| ~~`framer-motion` installed but not used~~ | `package.json` | Done: removed, with `lucide-react` |

### Kept on purpose

The frontend-design skill would flag a near-black background with a single gold accent, and Playfair with Lato, as common defaults. Both stay: the owner chose black and antique gold, and the site's motifs carry the identity instead.

## 3. Actions, in order

| # | Priority | Action | Who | Effort |
| --- | --- | --- | --- | --- |
| 1 | High | Photograph 12 to 20 pieces of the shop's own work (see the shot list below) | Owner | One afternoon |
| 2 | High | Rewrite each service description and feature list in the shop's own voice, from facts the owner gives | Claude, then owner checks | Small |
| 3 | Done | Replaced Lucide with a custom line set in `src/components/ui/Icons.jsx`: needle, tape measure, dress form and calendar for the home page, a zari diamond bullet, and contact and interface icons, all in a 1.5px line | Claude | — |
| 4 | Done | Removed `framer-motion` and `lucide-react` | Claude | — |
| 5 | Done | Links: a gold stitch sews in on hover or keyboard focus (`.link-stitch`). Buttons: press in slightly when tapped. Neither moves for people who turn off motion | Claude | — |
| 6 | Later | Use the owner's own words: one real quote, real years in the trade, real reviews only | Owner | — |
| 7 | Later | Tamil version, with Noto Serif Tamil and Noto Sans Tamil | Claude | Medium |

### Shot list for action 1

- Hands at the sewing machine, close up
- A tape measure across fabric
- Fabric close-ups: silk border, georgette, embroidery
- Each garment type finished, worn by a person (blouse, lehenga, anarkali, kurti, suit, kids' frock)
- The shop counter or work table
- Shoot in daylight against one plain backdrop, so the photos look like a set

## 4. Skills and tools for this

| Tool | What it does here | Status |
| --- | --- | --- |
| frontend-design skill | Plans a design, checks it against generated-looking defaults, then builds | In the repo at `.claude/skills/frontend-design` |
| UI Design Review plugin | Reviews rendered screens like a senior designer and lists fixes, most important first | Available in the plugin directory |
| Design plugin | Design critique, UX copy and accessibility review | Available in the plugin directory |
| Axe Accessibility plugin | Scans pages for accessibility problems | Available in the plugin directory |
| Figma, Spline, Three.js | Design tools and 3D | Not needed for this site |

## 5. Checklist for every new page

- [ ] Uses a real photo of the shop's work, or no photo
- [ ] Copy names the garment and the shop. No stock phrases ("elevate", "experience the", "premium", "seamless")
- [ ] Sentence case. No all-caps labels or small labels above headings
- [ ] Numbers only for real sequences
- [ ] At most one motion moment on the page, switched off for reduced motion
- [ ] Custom icons only
- [ ] Checked at 375, 768 and 1440 pixels wide
