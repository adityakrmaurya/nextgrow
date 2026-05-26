<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Frontend Design — NextGrow stack contract

When `/frontend-design` is invoked in this project, generate code that:

- Uses **GSAP + ScrollTrigger** for all scroll-driven animation (not CSS scroll-timeline or Framer Motion scroll)
- Uses **Lenis** for smooth scroll (already wired at app root via `components/providers/SmoothScroll.tsx`)
- Uses **SplitType** (`split-type` npm package) for kinetic text reveals — char/word/line splits + GSAP stagger
- Uses **React Three Fiber** (`next/dynamic({ ssr: false })`) for any 3D or WebGL element
- Uses **`@gsap/react`** hooks (`useGSAP`, `useGSAPContext`) inside React components
- Animates **ONLY `transform` and `opacity`** — never `top`, `left`, `width`, `height`, or layout properties
- Guards every GSAP timeline with `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;`
- Follows the design tokens: `--ink #0A0A0A` · `--cream #F5F0E8` · `--lime #C4FF00` · Bebas Neue display · DM Sans body
- Targets: LCP < 2s on 4G · CLS < 0.05 · JS < 250 KB gzipped (WebGL chunk excluded and lazy-loaded)
- Imports GSAP from `@/lib/gsap` (already registers ScrollTrigger; do not re-register)

### Motion choreography standard (igloo.inc tier)
- Every section entrance is scroll-triggered (not time-delayed on mount)
- Text reveals use masked overflow (`overflow: hidden` wrapper + `y: "110%"` → `y: "0%"`)
- EASE_OUT_EXPO = `[0.16, 1, 0.3, 1]` — use this for all entrance animations
- Stagger: 0.04–0.10s between siblings
- Horizontal scroll sections use GSAP `pin: true` + `scrub: 1` + `snap`
- All `ScrollTrigger.create` calls must be cleaned up with `st.kill()` in `useEffect` return

### Pinned card-stack pattern (basement.studio mechanic)

Used by **CaseStudies** (vertical axis) and **Services** (horizontal axis). Both sections share the same primitive — cards absolute-positioned inside a pinned wrapper, each offset by a fixed peek size along one axis, with subsequent cards pre-translated 100% along that axis and scrubbed back to 0% in sequence as the user scrolls.

**Mechanic (axis-agnostic):**

```
top/left = STACK_BASE + i * STACK_OFFSET     // axis-aligned peek strip per card
zIndex   = i + base                          // later cards cover earlier ones
initial  = { y/xPercent: 100 } for i > 0     // card 0 starts visible
timeline = scroll-scrubbed; for i > 0, animate to { y/xPercent: 0 }
end      = `+=${(N - 1) * viewport * factor}` // factor ≈ 0.9–1.0 per card
```

**Required guardrails — learned the hard way:**

1. **DO NOT pre-stage with inline CSS `transform: translateX(100%)`.** GSAP parses `translateX(100%)` as `x: <width>px` (absolute pixels, not `xPercent: 100`). Then `gsap.set({ xPercent: 100 })` adds xPercent **on top of** that already-resolved x, putting cards at effective 200% off-screen. The 100→0 tween only zeroes the xPercent component, leaving the cached x:width-in-px — so cards never reach their target. **Fix:** pre-stage with `className="invisible motion-reduce:visible"` (no transform) and flip visibility back inside `useGSAP` via `gsap.set(cards.slice(1), { xPercent: 100, visibility: "visible" })`. `useGSAP` runs in `useLayoutEffect` so this applies before paint — no flash. The `motion-reduce:visible` Tailwind variant keeps reduced-motion users seeing the fully-stacked end state.

2. **Use `useGSAP` from `@gsap/react`, not bare `useEffect`.** It handles cleanup automatically and runs at the right phase. Scope it to the section ref: `useGSAP(() => {...}, { scope: sectionRef })`.

3. **Pin the wrapper, not the section.** A separate `pinRef` inside the section lets the heading live outside the pin if you want it to scroll past, or inside the pin (absolute-positioned, z-50, pointer-events-none) if you want it to persist across the stack.

4. **`scrub: 1` + `snap` works; `scrub: 0.6` + `snap` feels jumpy.** The lerp and the snap fight at boundaries. Match CaseStudies' `scrub: 1`.

5. **Snap config:** `snapTo: 1 / (cards.length - 1)` · `duration: { min: 0.2, max: 0.45 }` · `ease: "power2.inOut"`. Gives "one scroll commits one card" feel.

6. **Peek-strip is also a button.** When cards stack, only the peek strip of cards behind is visible — make it interactive (open modal, deep-link, etc.) so users can navigate back to earlier cards without reverse-scrolling.

7. **Mobile fallback is non-negotiable.** The pin geometry depends on viewport height + fixed navbar clearance; below `md` (768px), render a simple vertical list. Guard with `if (window.innerWidth < 768) return;` inside the `useGSAP` callback.

8. **Reduced-motion path leaves cards stacked in final position.** That's fine — peek strips remain clickable so the content is still reachable. Verify keyboard tab order before declaring done.

9. **Body overflow:** must be `overflow-x: clip`, not `hidden`. `hidden` turns body into a scroll container and breaks the pin's containing-block logic. Already set in `app/globals.css`.

10. **Scroll-hint affordance must match input.** Even when motion is horizontal, the gesture is vertical scroll — use a down-chevron, not a right-arrow. Same applies vice-versa for vertical-stack sections with horizontal panning content.

11. **Modals inside a pinned section MUST use `createPortal(..., document.body)`.** GSAP ScrollTrigger wraps the pinned element in a `pin-spacer` div mid-flight. React 19's reconciler tracks DOM positions and throws `Failed to execute 'insertBefore' on 'Node'` when it tries to mount a sibling modal whose reference node is now nested inside the pin-spacer it didn't put there. Portal escapes the subtree entirely. Also gate the portal on a `mounted` state set in `useEffect` to avoid SSR mismatch.

12. **Framer Motion 12 + React 19 + GSAP pin = sharp edges.** `<AnimatePresence>` with a `layoutId` shared-element transition reliably throws the same insertBefore error inside a pinned section, even with a portal. For modals in pinned sections, prefer plain conditional rendering + CSS transitions over Framer Motion shared-layout transitions — fewer moving parts, no reconciliation surprises.

### Verification harness (`scripts/visual-verify.mjs`)

Playwright-based — boots a Chromium against the live dev server, walks scroll snaps via real wheel events (which Lenis interprets), captures screenshots at each snap point, and prints card transforms + tx values per card per snap so you can verify the timeline is actually moving things. Run with `node scripts/visual-verify.mjs` after any scroll-driven section edit. Screenshots land in `screenshots/`. Probes `window.__servicesDebug` exposed by Services.tsx (timeline duration, progress, tween count, ScrollTrigger presence) and runs a direct `tl.progress(0|0.25|0.5|0.75|1)` test to isolate timeline correctness from scroll-driven progress correctness. Critical: cursor must be parked at `(2,2)` before each `page.screenshot` or it appears as a circle in the shot.

Companion scripts: `scripts/capture-sections.mjs` walks every `<section id>` on the homepage and captures both desktop (1440×900) and mobile (390×844) shots. `scripts/capture-process-steps.mjs` walks the GSAP pinned Process section step-by-step (5 steps × 1 viewport each) so you can verify the 2-column key-activities / deliverables layout holds across all step content lengths.

## Editorial design system (final pass)

### Section numbering
Every section's eyebrow follows `NNN · Topic` where NNN is the 0-padded section index in scroll order:
- 001 — Hero (`Marketing Technology · Growth Solutions`)
- 002 — Marquee (`10 sectors`)
- 003 — Services (`What we do`)
- 004 — Process (`How we work`)
- 005 — Work (`Selected Work`)
- 006 — Industries (`Sectors we serve`)
- 007 — Founder (`Our story`)
- 008 — Testimonials (`What clients said`)
- 009 — Contact (`Ready to grow?`)

This is the editorial signal. Skipping a number reads as draft, so when adding a new section, renumber everything below it.

### Section heading template
Every section's heading uses this pattern (compose with appropriate spacing — `pt-24/32` for stand-alone, `pt-0` when nested inside a pinned wrapper):

```jsx
<div className="flex items-end justify-between gap-8">
  <div>
    <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.35em] mb-4">
      NNN · Topic
    </p>
    <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.9] text-cream max-w-2xl">
      First line.{" "}
      <span className="text-lime">Second line / accent.</span>
    </h2>
  </div>
  {/* Right-side meta column — balances the heading; visible from md up */}
  <div className="hidden md:flex flex-col items-end gap-4 shrink-0">
    {/* stats / counts / hint copy */}
  </div>
</div>
```

The `flex items-end justify-between` with right-meta-column kills the "orphan-left heading with empty right half" anti-pattern that the polish pass found in Work, Industries, and Services.

### Type rhythm
- **Eyebrow** — `font-body text-[0.65rem] uppercase tracking-[0.35em] text-lime` (mb-4)
- **Display h2** — `font-display text-[clamp(36px,5vw,72px)] leading-[0.9] text-cream`
- **Display h3** — `font-display text-[clamp(28px,3.5vw,52px)] leading-[0.95] text-cream`
- **Body** — `font-body text-cream/60 text-sm md:text-base` for descriptions, `text-cream/45` for meta
- **Tabular numbers** — always `tabular-nums` to prevent counter jitter

Lime accents go on the single emphasis word in each h2 line (or the second of two stacked lines). Don't lime more than one phrase per h2.

### Opacity palette
Tailwind v4 accepts arbitrary integer opacity (`/3`, `/7`, etc.), but the standard scale reads more consistently. Use:
- `/5` — extremely faint backgrounds (`bg-cream/5`)
- `/[0.03]` — when you need lower than 5%; spell it explicitly
- `/8 /10 /15` — borders and dividers
- `/20 /25 /30` — secondary borders, dim accents
- `/35 /40 /45 /50` — meta text, captions, descriptions
- `/55 /60 /65 /70` — body text
- `/80 /85` — emphasized body
- `/100` (default) — full text

The bug was `bg-cream/3` — Tailwind v4 generates it but the scale jumps from 0 to 5, so `/3` reads as "a value I didn't plan." Prefer `/[0.03]` when you need that granularity.

### Stack-section heading content
When a section is pinned (Services horizontal stack, Process vertical timeline), the heading lives **inside** the pinned wrapper so it persists during the scroll choreography. Always wrap it in `pointer-events-none` so it doesn't block clicks on the content beneath, and `absolute top-0 left-0 right-0 z-50` to float it above the moving cards.

### Third-party component adaptation: kokonutd/background-paths

The Hero background is adapted from **@dorianbaffier / kokonut UI's `background-paths`** (MIT) — see `components/home/BackgroundPaths.tsx` for attribution comments. The original is a self-contained hero; we extracted just the path renderer so the NextGrow Hero owns layout and text.

**Adaptation gotchas to remember when bringing in any framer-motion SVG component from kokonutui or similar:**

1. **`motion/react` vs `framer-motion`.** kokonut ships against `motion/react` (Framer Motion's standalone fork). NextGrow uses `framer-motion`. Imports must be rewritten; the APIs are identical at our usage level.

2. **SSR hydration mismatch on opacity attribute.** The original's pattern is `initial={{ opacity: 0, scale: 0.8 }}` + `style={{ opacity: p.opacity }}` per `motion.path`. On SSR the motion props write `opacity={0}` as an attribute, but the inline style says `opacity={p.opacity}`. React reports a hydration mismatch on every path. **Two valid fixes:**
   - Drop the entrance opacity/scale animations entirely; rely on `style.opacity` for the visual and let motion only drive the continuous y-bob loop. `initial={false}` tells motion to start from the rendered state.
   - Or gate the entire component on a `mounted` useState — SSR returns `null`, client mounts after hydration. We use both belt-and-braces.

3. **Math.random() in id generators causes server/client divergence.** The original uses `Math.random().toString(36)` to generate `<path>` IDs. SSR-rendered IDs differ from client-rendered IDs → hydration mismatch even after fixing opacity. Replace with deterministic IDs (`${prefix}-${index}`).

4. **`viewBox` + `preserveAspectRatio="xMidYMid slice"` crops the wave envelope off-screen on narrow viewports.** The default viewBox `-2400 -800 4800 1600` is 3:1 aspect; on mobile portrait (390×844, ~0.46:1), `slice` scales the SVG so its 1600-unit height fills 844px (scale ~0.527) — the visible x-range collapses to ±103 viewBox units, while the interesting waves live at ±2400. Fix: swap to a tighter viewBox on narrow viewports (we use `-1100 -800 2200 1600` for `<md`). Verify with `scripts/verify-hero.mjs` at 390×844.

5. **Verification harness lives at `scripts/verify-hero.mjs`.** It mounts the page, samples DOM (counts SVG nodes, paths, opacity/stroke per path), captures hero shots at desktop and mobile, and reports any page errors or console errors. Run it after every BackgroundPaths edit — it caught both the hydration mismatch and the mobile-viewBox crop in one pass.

### Pinned-section motion choreography
See "Pinned card-stack pattern" earlier in this file for the 12-guardrail mechanics. The pattern works on both axes (CaseStudies vertical, Services horizontal). Process uses a different mechanic (content swap on scroll step boundary, not card translation), but shares the pin/scrub timing.
