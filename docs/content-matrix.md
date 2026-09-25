# Content Matrix — what's real, what needs confirming

All site copy lives in `src/lib/content.ts`. Edit it there.

## ⚠ Must be confirmed by Jonalie before launch

Everything below is **realistic placeholder copy** written to the blueprint. None of it may go live as fact until confirmed.

| Item | Where | Current placeholder |
|---|---|---|
| Surname / business name | `site.name` | "Jonalie" only |
| LinkedIn, booking link | `site.*` | `#` links (email, phone and location are confirmed, see below) |
| Years of experience, clients, retention | `stats` | 5+ yrs, 30+ clients, 4 yrs longest client |
| Time zones & hours covered | `site.hours`, FAQ | US, AU & UK business hours |
| Response-time promise | Hero, Contact | Within 1 business day |
| Availability | `site.availability` | "2 client spots open" |
| Tools she's fluent in | `tools` | Workspace, M365, Notion, Asana… |
| Case studies & numbers | `caseStudies` | 3 anonymised examples |
| Testimonials: names, roles, quotes | `testimonials` | **Fictional. Replace with real, permissioned quotes** |
| Rates | `pricing`, `packages` | No published prices. Tiers show "To be discussed", with notes on what shapes a quote. Confirm tier names and inclusions |
| Certifications / training | `about.credentials` | Generic examples |

## Confirmed by Jonalie

| Item | Value |
|---|---|
| Email | jonalietapicworkemail@gmail.com |
| Phone | +63 962 899 3813 |
| Location | Manila, Philippines (GMT+8) |

## Photography

Supplied photos live in `public/images/` and are mapped in `photos` in `src/lib/content.ts`. If a mapped file goes missing, the site renders a styled fallback frame instead of a broken image.

| File | Photo | Used in |
|---|---|---|
| `jonalie-standing.jpg` (1023×1537) | Full-length, navy suit, glass office | Hero arch, Contact arch |
| `jonalie-portrait.jpg` (402×619) | Head-and-shoulders, smiling | Hero tilt card |
| `jonalie-desk.jpg` (900×1024) | Seated at desk, plant | About (full-bleed) |
| `jonalie-over-shoulder.jpg` (410×616) | Glancing over shoulder | About (small arch) |
| `jonalie-laptop.jpg` (423×625) | At laptop, chin on hand | Kind words (b&w, colour on hover) |

Four of the five are only ~400px wide. They look fine in the small frames, but the testimonial photo can look soft on high-DPI screens. Supply higher-resolution originals before launch.

Case-study imagery (notebook, laptop, desk flat-lay) is still Unsplash placeholder.
