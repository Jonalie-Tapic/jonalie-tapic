# Strategy Brief — Jonalie, Virtual Assistant

Blueprint: `../../build-system/industries/virtual-assistant-admin.md` (written for this project; nearest existing: `professional-services`).

## Decision Profile

| Axis | Value |
|---|---|
| Trigger | Planned, tipped by overwhelm |
| Window | Days–weeks |
| Ticket | Mid, monthly retainer |
| Dominant fear | Delegating costs more time than it saves; access given to someone careless |
| Decision unit | Solo founder / coach / consultant |
| Proof currency | Named testimonials, quantified hours back, visible systems, tool fluency, a real face |
| Primary conversion | Book a free 20-min discovery call |
| Device | Mixed — mobile discovery, desktop booking |

## Belief ladder → section map

| Rung | Belief | Section |
|---|---|---|
| 1 | She handles *my* admin | Hero, Services |
| 2 | She's organised & fluent in my tools | TrustBar (tools + stats) |
| 5 | She gets my exact situation | "Sound familiar?" ScenarioSelector |
| 3 | She has done this for people like me | Case studies |
| 4 | Handing over is painless | Process |
| 3 | She's a real, careful person | About |
| 6 | I know the cost | Rates |
| 3 | Others vouch | Kind words |
| 7 | Next step is easy | FAQ, Contact |

## Design direction

- **Palette:** Piktochart "Twilight Sky" — `#0D1B2A` night · `#1B263B` dusk · `#415A77` slate · `#778DA9` mist · `#E0E1DD` pearl. No off-palette accent. Warmth comes from the photography and the serif italics.
- **Concept:** "Quietly handled." The site is calm, the night-sky palette is the calm, and the one bold element is the hero's layered photo composition with a live task list ticking off. That shows the result instead of describing it.
- **Type:** Cormorant Garamond (display, italic for emphasis) + Manrope (UI/body).
- **Shape language:** arches (portrait frames, CTA badges) and hairline rules. Soft, precise, feminine without pastels.
- **Layout:** fixed left side navigation on ≥1024px (name, anchors with active state, scroll progress, availability, CTA). On smaller screens, a top bar, a slide-in drawer and a sticky bottom CTA.
- **Motion:** Lenis smooth scroll, reveal-on-scroll, image parallax, pointer-driven 3D tilt on the hero stack and package cards, stacked sticky case-study cards, a process line drawn by scroll, marquee. Everything is disabled under `prefers-reduced-motion`. No loaders and no scroll-jacking.
