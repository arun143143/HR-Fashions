# Positioning record: HR Fashions

Status: provisional        Last updated: 2026-11-11

No customer interviews or reviews yet. Every answer below is our own hypothesis or comes from the build plan, and is tagged so. Replace with the owner's words and real customer words as they arrive. This record caps what any page may claim.

## The six questions

1. **Who is the reader?** A woman in Chennai, usually 22 to 50, who has fabric (a saree, a lehenga set, kurti cloth) or an occasion coming (a wedding, a function, a festival), and wants it stitched to fit. Often also a mother stitching for her daughter. Right before landing she has searched "blouse stitching near me" or "lehenga tailor Chennai", or tapped a link a friend sent on WhatsApp. *(hypothesis)*
2. **One behavior:** send a booking request, which opens WhatsApp with her details filled in. A direct WhatsApp message is the fallback. *(build plan)*
3. **What she already believes:** tailors miss delivery dates, readymade clothes never fit at the shoulder or bust, and a good tailor is found through someone you know. *(hypothesis)*
4. **Journey stage:** mostly ready to decide (she has the fabric and a date) and comparing two or three tailors. *(hypothesis)*
5. **What stops her:** trust. Will it fit, and will it be ready on time? Price comes second. *(hypothesis)*
6. **True evidence we have:** the shop's address, the garments it stitches, that it stitches only for women and girls, that booking happens on WhatsApp. Everything else (years in trade, home measurement, free pickup and delivery, prices, turnaround times, reviews) is **unconfirmed** and may appear only as marked placeholders.

## Who it is not for
- Men's tailoring. We stitch only for women and girls, and saying so builds trust with the women it is for.
- Same-day emergency stitching, unless the owner says otherwise.

## Customer words
None collected yet. Once there are reviews or WhatsApp conversations (with permission), add the exact phrases here with source and date.

Words to avoid:
| Word | Why |
| --- | --- |
| bespoke, luxury, premium, elevate, experience the… | Stock phrases that make the site read as a template |
| best, number one, finest | Cannot be proved |
| 35 years, 20,000 customers, any number | Not confirmed by the owner |
| expert, master tailor | Show it with specifics (cuts, fittings) instead of saying it |
| store, shop has a range of… | We stitch; we do not sell readymade clothes |

## Switching forces
- **Push:** readymade clothes that pull at the armhole; a past tailor who missed the wedding date; a blouse that gapes at the back.
- **Pull:** a fitting on her before it is finished; a delivery date agreed before stitching starts; stitching only for women and girls.
- **Habit:** "my usual tailor"; a relative who stitches.
- **Anxiety:** handing over expensive fabric; whether it will be ready in time; the final price.

Pages answer anxiety with process, not adjectives: what happens at each step, when the date is agreed, when the price is confirmed.

## Voice
| Attribute | Means | Doesn't mean |
| --- | --- | --- |
| Plain-spoken | Short sentences, garment names, what we do at each step | Curt or technical |
| Specific | "Fits at the shoulder and lets you lift your arms" | "Perfect fit", "flawless finish" |
| Warm and local | Chennai, Vadapalani, pattu pavadai, maggam work | Slang, forced Tamil phrases |
| Honest | "We will tell you if your fabric can hold that design" | Promises we cannot keep |

Tone by context:
- **Pages:** like the tailor talking you through a fitting. "We" and "you".
- **Errors and empty states:** say what happened and what to do next. No apologies.
- **Money:** starting prices only, and always say when the final price is confirmed.

## Evidence
| Claim | Source | Confidence | Date |
| --- | --- | --- | --- |
| Shop is in Vadapalani, Chennai | `src/data/site.js` (placeholder address) | low (owner to confirm) | 2026-11-11 |
| Stitches only for women and girls | Build plan | medium | 2026-11-11 |
| Booking request opens WhatsApp | Build plan, `BookAppointment.jsx` | high | 2026-11-11 |
| Measured at the customer's home | Build plan | low (owner to confirm) | 2026-11-11 |
| Free pickup and delivery within Chennai | `site.js` | low (owner to confirm) | 2026-11-11 |
| Starting prices | `services.js` | low (placeholders) | 2026-11-11 |
| Supplies lining fabric; alters readymade kurtis | Written into FAQ answers | low (owner to confirm) | 2026-11-11 |

## Competitors
Reference site reviewed for structure only (silailor.in, 2026-11-11): full-screen hero, services dropdown, pricing page, long SEO text. Its numbers ("20,000 people", "17+ countries") are its own claims and are not a model for ours. No HR Fashions copy is taken from it.

## Learnings
| Date | Change | Evidence | Status |
| --- | --- | --- | --- |
| 2026-11-11 | Removed "35 years", "store has a range", "live call support" from service copy | Not confirmed by the owner | active |

## Changelog
- 2026-11-11: First record, written with the site copy rewrite. Provisional.
