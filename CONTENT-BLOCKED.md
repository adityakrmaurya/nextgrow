# Content Blocked — Required From Client Before Go-Live

The code-side polish pass is complete. The remaining gaps to lift the site to
awwwards-tier quality are **content** items that only the client can provide.
Memory rule: **do not fabricate testimonials, names, or quotes.**

## Critical (visible placeholder content)

### Founder portrait & bio
- `components/home/Founder.tsx` currently renders an SVG silhouette with
  caption "Founder portrait" inside a placeholder gradient.
- Required: high-resolution portrait (min 1600×2000, 3:4 portrait), founder's
  real name, role title, 2–3 paragraph bio, LinkedIn URL.
- The `href="https://linkedin.com"` link is currently a placeholder — needs the
  real profile URL.

### Real testimonials
- `components/home/Testimonials.tsx` currently shows attribution
  `Client Name / FOUNDER · AMRITANSH TALKS` — literal placeholder string.
- Required: 5–8 testimonials each with **real name**, **role**, **company**,
  **outcome-driven quote**. Memory's template: "In eight months we went from
  5K followers to 45K…" — quotes that name a number or a specific outcome.
- Optional: small client headshots (256×256, square) for the avatar slot.

### Team grid
- `Founder.tsx` lists 4 team members but with placeholder names/roles.
- Required: name, role, optional photo for each.

## Important (would meaningfully lift the page)

### Client logos for "Trusted by" strip
- 15+ additional client logos (SVG preferred, monochrome white).
- Drop into `public/logos/` and the marquee/strip in `MarqueeStrip.tsx` can
  switch from text-only to logo-based.

### Case study imagery
- `components/home/CaseStudies.tsx` cards currently use only gradient
  backgrounds (`from-[#1a0800]` etc.). Real campaign creatives (1 hero
  image per case, 1920×1080) would replace the dot-grid texture and lift
  each card significantly.

### GSTIN number
- For footer compliance.

## Operational

### Resend API key
- `app/api/contact/route.ts` currently logs to console; email delivery is
  stubbed. Add `RESEND_API_KEY` to `.env.local` to enable production sends.

## Out-of-scope (not blocking)

- Pricing/packages section — not in current scope
- Blog / insights index — not in current scope
- Detail pages for each case study (slug routes exist as `<a>` links but
  the `/case-studies/[slug]` pages are not built yet)

## Quality bar without content gaps

With the polish pass done (Services horizontal stack, Process timeline split,
Work heading meta column, Marquee header, Founder rebalance), the site reads
as a competent agency portfolio. The ceiling without real content is roughly
"high B+ / low A-." Real founder bio, real testimonials, real case study
imagery would lift this into A / A+ territory and make awwwards
consideration realistic.

When those land, also revisit:
- Founder portrait area ratio (currently 50/50; once a strong portrait
  exists, 55/45 favoring portrait often reads better)
- Testimonials carousel — consider replacing Embla with a static editorial
  layout when quotes are strong enough to stand alone
- Hero — consider an optional 1-frame intro animation that reveals the
  WebGL gradient (currently fades in immediately)
