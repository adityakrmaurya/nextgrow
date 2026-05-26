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
