# Handover — Outcome Works (owl)

_Built: 2026-06-17 · Astro + Tailwind v4 + GitHub Pages · "One brand, two doors"_

## 1. Project path
`~/Development/websites/owl`

## 2. Repo URL
`https://github.com/lng-boomworks/owl` — **not yet created/pushed** (awaiting Gate 3 approval).

## 3. Deployment URL
`https://lng-boomworks.github.io/owl/` (base path `/owl`). Switch to `outcomeworks.co.uk` later by editing `astro.config.mjs` — see §9.

## 4. Local commands
```bash
cd ~/Development/websites/owl
npm run dev       # iterate
npm run build     # production build → dist/
npm run preview   # serve dist at http://localhost:4321/owl
```

## 5. Approved IA (page set + nav order)
Nav: **Consultancy · Products · Case Studies · Insights · About** + "Talk to us" → Contact.

| Route | Page |
|---|---|
| `/` | Home — two-doors hero, proof band, paths, featured case, OWL strip, insights, people, dual CTA |
| `/consultancy` | Consultancy (Door A) — services detailed, approach steps, proof, dual CTA |
| `/products` | Products hub (Door B) — suite grid, proof, dual CTA |
| `/products/owl-ops` · `/owl-bids` · `/owl-brain` · `/tender-intel` · `/cvinsight` | 5 OWL JTBD pages (one dynamic route, `[slug].astro`) |
| `/case-studies` | Sector-led, quantified, unnamed-client cases |
| `/insights` | Authority articles (stubs) |
| `/about` | Story, team, values |
| `/contact` | Dual-path contact + form |

## 6. Custom components shipped
| Component | Path |
|---|---|
| `DoorCard` (signature two-door fork) | `src/components/DoorCard.tsx` |
| `CaseMetric` (number-first case) | `src/components/CaseMetric.tsx` |
| `ProductCard` (OWL card) | `src/components/ProductCard.tsx` |
| `InsightCard` (article teaser) | `src/components/InsightCard.tsx` |
| `TeamGrid` (people, compact/full) | `src/components/TeamGrid.tsx` |
| `DualCTA` (two-doors CTA band) | `src/components/DualCTA.tsx` |
| `ContactForm` (dual-path, client:load) | `src/components/ContactForm.tsx` |
| `PageHero` (inner-page hero) | `src/components/PageHero.astro` |
| `SectionLabel` (mono kicker) | `src/components/SectionLabel.astro` |
| `Rule` (hairline/dashed divider) | `src/components/Rule.astro` |

Rewritten shared: `Navbar`, `Footer`, `Button`, `TrustPill`. Design system in `src/styles/global.css` (OWL palette + Space Grotesk / IBM Plex Mono). Layout `src/layouts/Base.astro` (fonts, Organization JSON-LD, navbar/footer).

Removed from starter: Decap content-collection indirection (`content.config.ts`, `src/content/`, `src/components/pages/`), old `home/` components, `services.astro`, and the template's prospect-pipeline cruft (`SKILL.md`, `docs/`, `pipeline/`).

## 7. Outstanding placeholder tokens (content unknowns — need real data)
| Token / item | Where |
|---|---|
| `PLACEHOLDER_PRODUCT_SCREENSHOT` (×5) | `src/pages/products/[slug].astro` — replace tinted blocks with real product captures |
| `PLACEHOLDER_TEAM` — names, roles, bios, photos | `src/pages/about.astro`, `src/pages/index.astro` (3 placeholder members) |
| `PLACEHOLDER_CONTACT_EMAIL` — `hello@outcomeworks.co.uk` assumed | `Footer.tsx`, `contact.astro`, `ContactForm.tsx`, `Base.astro` JSON-LD — **confirm address** |
| `PLACEHOLDER_FORM_ENDPOINT` — form falls back to mailto | `ContactForm.tsx` — wire to Formspree/Resend for real submissions |
| `PLACEHOLDER_INSIGHT_IMAGE` / thumbs | `InsightCard.tsx` — add real article artwork |
| `PLACEHOLDER_OG_IMAGE` — uses apple-touch-icon | `Base.astro` — add a 1200×630 social card |

## 8. Pending content (research wasn't deep enough to finalise — confirm copy)
- **Insights articles** are titled stubs (from the blueprint) all linking to `/insights`; no detail pages yet. Wire to real articles or a content collection.
- **Proof stats** (`3×`, `~70%`, `EU-wide`) and sector chips published as approved — re-confirm wording/NDA before launch.
- **Case studies** are sector-led summaries; no per-case detail pages.

## 9. Switching to the custom domain (`outcomeworks.co.uk`)
In `astro.config.mjs`: remove `base: '/owl'` and set `site: 'https://outcomeworks.co.uk'`. Add a `public/CNAME` file containing `outcomeworks.co.uk`, point DNS at GitHub Pages, rebuild. `withBase()` collapses to root automatically — no link changes needed.

## 10. Suggested next actions
- Wire the contact form to a real endpoint (Formspree or a Resend Worker).
- Replace product screenshots, team photos/bios, OG card.
- Build out Insights as a content collection with real articles (the inbound engine).
- Add per-product and per-case-study detail/SEO depth; richer JSON-LD (Product / Article schema).
- Accessibility pass (focus order, colour contrast on washes), Lighthouse/perf pass, image optimisation.
- Mobile visual QA at 375px (built responsive; not yet visually verified in a browser).

## 11. Library updates to apply (back into the skill)
- New section pattern **`hero-two-doors`** + **`paths-split`** (dual-audience consultancy/SaaS).
- New component **`DoorCard`** (semantic colour variant fork).
- New archetype hint: **professional services — dual (consultancy + product suite)**.

## Notes
- Research Path D (competitor benchmarking) was **skipped by user decision** — the supplied `owl-website-blueprint.html` served as the design basis. See `research/design_proposal.md`.
- Build: 12 pages, clean. Base-path grep clean (every internal link `/owl/`-prefixed). No project-token leaks. Fonts verified (Space Grotesk + IBM Plex Mono).
