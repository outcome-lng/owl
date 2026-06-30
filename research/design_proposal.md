# Design Proposal — Outcome Works Ltd

_Date: 2026-06-17_
_Prepared by: new-website skill_
_Inputs: `owl-website-blueprint.html` (v0.1, user-supplied), Phase 0 intake. Research (Path D) skipped by user decision — blueprint treated as the design basis._

---

This document is the second approval gate. The technology stack is fixed (Astro + GitHub Pages); everything below is per-business design intent, formalised from the supplied blueprint. Approve before any scaffolding begins.

**Core thesis (from blueprint):** _One brand, two doors._ The spine is **outcomes**. Every visitor self-selects into **Door A — Consultancy** ("work with our team") or **Door B — Products** ("run a tool yourself" — the Talon suite), held together by shared proof, insight and people. Audience: risk-averse buyers competing in **public-sector and enterprise procurement**.

---

## 1. Information Architecture

### Page set + nav order

| # | Route | Page name | Door | Reason |
|---|-------|-----------|------|--------|
| 1 | `/` | Home | Spine | One hero, two doors — the fork is the single most important block |
| 2 | `/consultancy` | Consultancy | A | "Work with us" hub: AI Advisory, Bid & Proposal Support, Enterprise Tooling |
| 3 | `/products` | Products | B | Talon suite overview — strip teases, this page + child pages sell |
| 4 | `/products/talon-ops` | Talon Ops | B | Job-to-be-done page (delivery ops) |
| 5 | `/products/talon-bids` | Talon Bids | B | Job-to-be-done page (respond to more) |
| 6 | `/products/owl-brain` | OWL Brain | B | Job-to-be-done page (knowledge core) |
| 7 | `/products/tender-intel` | Tender Intel | B | Job-to-be-done page (market radar) |
| 8 | `/products/cvinsight` | CVInsight | B | Job-to-be-done page (CV evaluation) |
| 9 | `/case-studies` | Case Studies | Spine | Sector-led, quantified, unnamed-client proof for both doors |
| 10 | `/insights` | Insights | Spine | House-voice authority — the inbound engine for a buyer who Googles quietly for months |
| 11 | `/about` | About / Team | Spine | The humans + procurement pedigree — consultancy sells people |
| 12 | `/contact` | Contact | Spine | Dual path — consultancy enquiry / product demo |

**Nav order:** `Consultancy · Products · Case Studies · Insights · About` + persistent CTA button **"Talk to us"** → `/contact`.

> Note: the blueprint's nav chip reads "Services"; I'm proposing **"Consultancy"** for symmetry with "Products" and to reinforce the two-doors framing. Flagged as Open Question 3 if you prefer "Services".

### Pages explicitly **not** included

- `blog` (as a name) — replaced by **Insights**, which signals authority/thought-leadership over a news feed.
- `pricing` (standalone) — pricing signals live inside each product JTBD page and the consultancy page; no central pricing table for a bespoke/enterprise sales motion.
- `team` (standalone) — folded into **About** per the blueprint's "About / Team" single node.

---

## 2. Per-page section list

Patterns referenced from `section_pattern_library.md`. Every page ends in a CTA. The home page deviates from `hero-classic` because the **two-door fork** is the whole point — it uses a custom hero composed of `DoorCard`s.

### `/` — Home
1. `hero-two-doors` *(custom — see §3)* — outcome-led H1 + lede, then the Door A / Door B fork
2. `proof-band` *(custom `ProofBand`)* — 3 stats + sector `TrustPill` chips
3. `paths-split` — two columns expanding Consultancy vs Products, each linking to its hub
4. `case-study-band` *(via `CaseMetric`)* — number-first featured case (e.g. "3× tenders/month")
5. `product-strip` *(via `ProductCard`, 5-up)* — Talon suite teaser → JTBD pages
6. `insights-teaser` *(via `InsightCard`, 3-up)* — `article-feature-plus-grid` style
7. `people-band` *(via `TeamGrid`)* — "the people behind the work" preview
8. `cta-band-dual` *(via `DualCTA`)* — Consultancy ("Talk to our team") + Products ("See the Talon suite")

### `/consultancy` — Consultancy (Door A, consult palette)
1. `hero-split` — consultancy-led headline + lede, single "Talk to us" CTA
2. `services-list-detailed` — AI Advisory · Bid & Proposal Support · Enterprise Tooling (outcome-framed)
3. `approach-steps` — how an engagement runs (signals process maturity to cautious buyers)
4. `case-study-band` — one relevant consultancy proof point
5. `trust-pill-row` — sector chips
6. `cta-band-simple` — "Talk to our team" → `/contact`

### `/products` — Products hub (Door B, product palette)
1. `hero-split` — "Run the Talon suite" headline + lede
2. `product-grid` *(`ProductCard`, 5-up)* — each card → its JTBD page
3. `case-study-band` — a product-led outcome (e.g. ~70% faster CV evaluation)
4. `cta-band-dual` — "Book a demo" / "Talk to us"

### `/products/{talon-ops|talon-bids|owl-brain|tender-intel|cvinsight}` — JTBD pages (×5, shared template)
1. `hero-split` — job-to-be-done headline ("Respond to more tenders", etc.)
2. `story-narrative` — the job / the problem this tool removes
3. `featured-product` — the tool shown running (placeholder screenshot until real assets)
4. `proof-band` (compact) — one stat or quantified outcome
5. `cta-band-simple` — "Book a demo"

### `/case-studies` — Case Studies (spine)
1. `hero-editorial` + `section-label`
2. `case-study-band` repeated — sector-led, unnamed clients, metric-first
3. `cta-band-dual`

### `/insights` — Insights (spine)
1. `hero-editorial`
2. `article-feature-plus-grid` *(via `InsightCard`)*
3. `cta-band-simple` — "Talk to us" / newsletter (TBD)

### `/about` — About / Team (spine)
1. `hero-split`
2. `story-narrative` — origin, mission, procurement pedigree, trust with sensitive work
3. `team-grid` *(`TeamGrid`)* — the humans
4. `values-grid` *(optional)*
5. `cta-band-dual`

### `/contact` — Contact (spine, dual path)
1. `hero-split` — "Talk to us" with the dual framing
2. `contact-methods-row` + `contact-form` — service-of-interest dropdown splits consultancy vs product demo
3. `cta-band-simple` — reassurance line on response time

---

## 3. Custom components needed

Beyond the starter's defaults (`Button`, `FadeIn`, `Footer`, `Navbar`, `TrustPill`, + `home/HomeHero`, `Services`, `FinalCTA`, `HomePage`).

| Component | Type | Lives at | Reason |
|-----------|------|----------|--------|
| `DoorCard` | `.tsx` | `src/components/DoorCard.tsx` | The two-door fork card; `variant="consult"\|"product"` drives colour. Used in home hero + footer CTA. **The signature component.** |
| `ProofBand` | `.tsx` | `src/components/home/ProofBand.tsx` | 3-stat band + sector chip row |
| `CaseMetric` | `.tsx` | `src/components/CaseMetric.tsx` | Number-first featured case study (big metric + sober story) |
| `ProductCard` | `.tsx` | `src/components/ProductCard.tsx` | Talon suite card (strip 5-up + products grid) |
| `InsightCard` | `.tsx` | `src/components/InsightCard.tsx` | Article teaser card (thumb, title, read-time) |
| `TeamGrid` | `.tsx` | `src/components/TeamGrid.tsx` | People profile cards (photo, name, role, bio) |
| `DualCTA` | `.tsx` | `src/components/DualCTA.tsx` | Consultancy + Products dual CTA band (footer + page ends) |
| `SectionLabel` | `.astro` | `src/components/SectionLabel.astro` | Mono eyebrow kicker (reuse oughterard convention) |
| `Rule` | `.astro` | `src/components/Rule.astro` | Dashed/hairline divider for the editorial rhythm (reuse oughterard convention) |

Sector chips reuse the shipped **`TrustPill`** (restyled to the blueprint's mono pill). The masthead's corner-bracket framing becomes a small CSS treatment on hero/section frames rather than a component.

---

## 4. Design system direction

### Palette (locked — from blueprint `:root`)

Required tokens mapped to the dual-door system:

- `--color-primary`: `#1B5E5A`   _(consult — Door A, calm authority)_
- `--color-secondary`: `#3A4654` _(spine — neutral ink-blue)_
- `--color-background`: `#E9ECEF` _(paper)_
- `--color-accent-1`: `#C2562F`  _(product — Door B, dynamic)_
- `--color-accent-2`: `#697785`  _(muted)_
- `--color-text`: `#16202B`      _(ink)_

Extended semantic tokens carried over verbatim (the design leans on these):

```
--color-surface:#FFFFFF;  --color-faint:#9AA6B2;  --color-line:#C2CBD3;
--color-consult:#1B5E5A;  --color-consult-wash:#E2EDEC;
--color-product:#C2562F;  --color-product-wash:#F6E6DE;
--color-spine:#3A4654;    --color-spine-wash:#E2E5E9;
```

### Typography (locked — from blueprint)

- Display: **Space Grotesk** (700/600) — Google Fonts
- Body: **Space Grotesk** (400/500) — Google Fonts
- Accent / labels: **IBM Plex Mono** (400/500/600) — used for kickers, tags, stats sub-labels, read-times

### Vertical rhythm + spacing

- Section vertical padding: ~6rem desktop / ~3.5rem mobile
- Container max-width: 1080px (matches the blueprint `.wrap`)
- Border radius: **mixed-sharp** — small radii (3–6px) on cards; hairline `1px`/`1.5px` borders and dashed rules carry the structure
- Corner-bracket accents on key framed blocks (the masthead motif)

### Treatment notes

Structured, precise, document-like — the register of a serious procurement partner, not a flashy SaaS. Generous hairlines and dashed rules, mono labels, restrained colour used **semantically** (teal = consultancy, terracotta = products, slate = shared spine). Numbers carry the weight; layout stays sober to signal "we don't oversell." Closer to a technical white-paper aesthetic than a service-business default.

---

## 5. Hero copy draft (from blueprint, verbatim)

- **Hero headline:** _Built to win the work that's hard to win._
- **Hero sub-headline:** _AI advisory, bid support and the Talon toolset — for teams competing in public-sector and enterprise procurement._
- **Door A card:** eyebrow "I want a partner" · "Work with our team" · "Advisory and hands-on bid & proposal support." · CTA "Explore consultancy →" → `/consultancy`
- **Door B card:** eyebrow "I want a tool" · "Run the Talon suite" · "Software you operate yourself, from day one." · CTA "See the products →" → `/products`
- **Primary nav CTA:** "Talk to us" → `/contact`

Proof band (from blueprint — pending confirmation, see OQ4): **3×** tender throughput (two-person team) · **~70%** faster CV evaluation · **EU-wide** public-sector delivery. Sector chips: Law enforcement · Air traffic management · EU procurement programmes · + enterprise.

---

## 6. Page-level copy direction

- `/consultancy` — Frame each service around the **outcome** (winning the bid, shipping the tool), not the methodology. Reassure on procurement-grade rigour and confidentiality.
- `/products` — "Strip teases, pages sell." Hub gives the suite at a glance; push to JTBD pages for the actual sell.
- `/products/*` — Lead with the job done, show the tool running, one quantified proof, demo CTA. Avoid feature-listing.
- `/case-studies` — Number first, story second. NDAs block names → lead with the **category** (law enforcement, air traffic, EU programmes) + quantified outcome.
- `/insights` — House-voice authority on AI-in-procurement (an underserved space). Real, opinionated, useful.
- `/about` — Don't hide the humans. Procurement pedigree + trustworthiness with sensitive work matters more here than for a product-only firm.
- `/contact` — Dual path; reassure on response time; make "consultancy enquiry" vs "product demo" an obvious choice.

---

## 7. Library updates (post-build candidates)

- **New section pattern:** `hero-two-doors` — outcome-led H1 + a two-card audience fork. Useful for any dual-audience (services + product) business.
- **New section pattern:** `paths-split` — two-column "choose your path" expander below the hero.
- **New custom component:** `DoorCard` — the door fork card with a semantic colour variant.
- **New archetype hint:** "Professional services — dual (consultancy + SaaS)" with the two-doors IA.

---

## 8. Open questions for the user

1. **Deploy target.** Build for GitHub Pages subpath `https://lng-boomworks.github.io/owl/` (base path `/owl`) for now, switching to the apex `outcomeworks.co.uk` (no base) when you point the domain? **Recommendation: build with base `/owl` now** — it's the safe default and works either way once verified. Confirm.
2. **Product JTBD pages.** Scaffold **all 5** individual product pages now, or ship a single `/products` hub for v1 (the 5 as on-page sections) and add individual pages in v2? **Recommendation: build all 5** — the blueprint is explicit they each get their own page; copy can stay light.
3. **Nav label.** "Consultancy" (my proposal, symmetric with "Products") or "Services" (blueprint's nav chip)?
4. **Proof numbers.** Are `3×`, `~70%`, `EU-wide` and the four sector chips cleared to publish (accuracy + NDA)? If not, I'll token them.
5. **Team.** Real names / roles / bios / photos for About + the home people-band — or placeholder tokens for now?
6. **Contact form target.** Where do submissions go — Formspree, a mailto, or Resend/email to `lee.nicholson@outcomeworks.co.uk`? (Form is otherwise a token.)
7. **Insights content.** Seed with real articles, or scaffold 3 placeholder article stubs (titles from the blueprint) for v1?

---

## Build Gate — Approval Required

Approve as-is, edit, or revise before scaffolding.

- [ ] Approved as-is
- [ ] Approved with edits (note below)
- [ ] More design work needed

### User notes / edits

**Approved as-is on 2026-06-17.** Resolved open questions:
1. Deploy target → **GitHub Pages subpath `/owl`** (base path).
2. Product pages → **all 5 JTBD pages + `/products` hub**.
3. Nav label → **"Consultancy"** (default kept).
4. Proof stats → **publish as-is** (3× / ~70% / EU-wide + 4 sector chips cleared).
5. Team → placeholder tokens (bios/photos/names) — listed in handover.
6. Contact form target → placeholder token — listed in handover.
7. Insights → 3 placeholder article stubs using blueprint titles.
