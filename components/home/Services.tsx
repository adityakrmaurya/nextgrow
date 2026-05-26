"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface Card {
  id: string;
  title: string;
  tag: string;
  sub: string[];
  outcome: string;
  bg: string;
  icon: React.ReactNode;
}

const CARDS: Card[] = [
  {
    id: "01",
    tag: "Strategy",
    title: "Growth Strategy & Brand Positioning",
    sub: [
      "Market research",
      "Positioning frameworks",
      "Go-to-market strategy",
      "Brand architecture",
      "Growth roadmaps",
      "Competitive analysis",
      "Customer profiling",
      "Value proposition",
    ],
    outcome: "Clear strategic foundation aligned with revenue goals.",
    bg: "from-[#1a0800] via-[#0a0a0a] to-[#0a0a0a]",
    icon: <ChartIcon />,
  },
  {
    id: "02",
    tag: "Performance",
    title: "Performance Marketing & Lead Generation",
    sub: [
      "Meta Ads",
      "Google Ads",
      "Lead funnel architecture",
      "Conversion rate optimization",
      "Advanced targeting",
      "Retargeting",
      "Cost-per-lead optimization",
      "A/B testing",
    ],
    outcome: "Predictable customer acquisition at controlled CAC.",
    bg: "from-[#000d1a] via-[#0a0a0a] to-[#0a0a0a]",
    icon: <TargetIcon />,
  },
  {
    id: "03",
    tag: "Content",
    title: "Content, Media & Brand Communication",
    sub: [
      "Content strategy",
      "Video production",
      "Reels & shorts",
      "Storyboarding",
      "Storytelling frameworks",
      "Personal branding",
      "Photography",
      "Editorial planning",
    ],
    outcome: "Brand recall, audience growth, and earned media equity.",
    bg: "from-[#0d0014] via-[#0a0a0a] to-[#0a0a0a]",
    icon: <MediaIcon />,
  },
  {
    id: "04",
    tag: "MarTech",
    title: "Marketing Technology & Growth Systems",
    sub: [
      "CRM integration",
      "Analytics setup",
      "Funnel tracking",
      "Marketing automation",
      "Attribution modeling",
      "Pixel deployment",
      "Dashboard engineering",
    ],
    outcome: "Visible, measurable, automatable marketing operations.",
    bg: "from-[#0a0e00] via-[#0a0a0a] to-[#0a0a0a]",
    icon: <TechIcon />,
  },
  {
    id: "05",
    tag: "Scale",
    title: "Growth Consulting, Optimization & Scale",
    sub: [
      "Performance audits",
      "Optimization sprints",
      "Scale playbooks",
      "Channel expansion",
      "Quarterly reviews",
      "Margin discipline",
    ],
    outcome: "Sustainable scale without losing efficiency.",
    bg: "from-[#0a0a00] via-[#0a0a0a] to-[#0a0a0a]",
    icon: <ScaleIcon />,
  },
];

// Layout constants — horizontal mirror of CaseStudies vertical stack.
// Cards are absolute-positioned along the X-axis; each card's left edge
// sits SPINE_WIDTH px to the right of the previous, exposing a vertical
// peek strip ("spine") on the left of every card behind it.
const SPINE_WIDTH = 72;        // visible vertical strip per card
const STACK_LEFT = 24;         // left padding before the first card
const STACK_RIGHT = 24;        // right padding after the last card
const STACK_TOP = 240;         // clearance below navbar + section heading

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modal, setModal] = useState<number | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const pin = pinRef.current;
      const heading = headingRef.current;
      if (cards.length === 0 || !pin) return;

      // Heading entrance — scroll-triggered (not time-delayed on mount)
      if (heading) {
        const reveals = heading.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { yPercent: 110 });
        gsap.to(reveals, {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: pin,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Pre-stage cards 1..N off-screen-right and flip visibility back on.
      // Runs in useLayoutEffect via useGSAP — applies before paint, no flash.
      gsap.set(cards.slice(1), { xPercent: 100, visibility: "visible" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          // ~0.9 viewport per card-transition: snappy but legible.
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.9}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: { min: 0.2, max: 0.45 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (cards.length - 1));
            setActiveIdx(idx);
          },
        },
      });

      cards.forEach((c, i) => {
        if (i === 0) return;
        tl.to(c, { xPercent: 0, ease: "none", duration: 1 }, i - 1);
      });

      // Dev-only handle for scripts/visual-verify.mjs.
      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __servicesDebug: unknown }).__servicesDebug = {
          tl,
          cards,
        };
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── Desktop: horizontal card stack ── */}
      <section
        id="services"
        ref={sectionRef}
        className="hidden md:block relative bg-ink"
      >
        <div
          ref={pinRef}
          className="relative h-screen overflow-hidden"
        >
          {/* Sticky heading (lives inside pin so it stays visible across the stack) */}
          <div
            ref={headingRef}
            className="absolute top-0 left-0 right-0 z-50 px-8 lg:px-16 pt-24 pb-6 pointer-events-none"
          >
            <div className="flex items-end justify-between gap-8">
              <div>
                <span className="block overflow-hidden mb-3">
                  <span
                    data-reveal
                    className="block font-body text-lime text-[0.65rem] uppercase tracking-[0.35em]"
                  >
                    003 · What we do
                  </span>
                </span>
                <h2 className="font-display text-[clamp(32px,4vw,60px)] leading-[0.9] text-cream max-w-2xl">
                  <span className="block overflow-hidden">
                    <span data-reveal className="block">
                      Built as revenue engines,
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span data-reveal className="block text-lime">
                      not deliverables.
                    </span>
                  </span>
                </h2>
              </div>
              {/* Progress / counter */}
              <div className="hidden lg:flex flex-col items-end gap-3 pb-2">
                <span className="font-display text-cream/70 text-lg leading-none tabular-nums">
                  {String(activeIdx + 1).padStart(2, "0")}
                  <span className="text-cream/25 mx-2">/</span>
                  {String(CARDS.length).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                  {CARDS.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-[2px] transition-all duration-500 ${
                        i === activeIdx ? "w-10 bg-lime" : "w-4 bg-cream/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card stack canvas */}
          <div
            aria-label="Services"
            className="absolute inset-0"
            style={{ top: 0 }}
          >
            {CARDS.map((card, i) => (
              <ServiceCard
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                card={card}
                index={i}
                total={CARDS.length}
                onOpen={() => setModal(i)}
              />
            ))}
          </div>

          {/* Scroll-hint glyph — gesture is vertical scroll, even though motion is horizontal */}
          <div className="absolute bottom-6 right-8 z-40 flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.3em] text-cream/35">
            <span>Scroll</span>
            <svg
              width="10"
              height="22"
              viewBox="0 0 10 22"
              fill="none"
              aria-hidden="true"
              className="animate-[bounce_1.6s_ease-in-out_infinite]"
            >
              <path
                d="M5 0v20m0 0L1 16m4 4l4-4"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Mobile: simple vertical stack ── */}
      <section id="services-mobile" className="md:hidden bg-ink px-5 py-20">
        <div className="mb-10">
          <p className="font-body text-lime text-[0.6rem] uppercase tracking-[0.35em] mb-3">
            What we do
          </p>
          <h2 className="font-display text-[clamp(34px,9vw,52px)] leading-[0.9] text-cream">
            Built as revenue engines,
            <br />
            <span className="text-lime">not deliverables.</span>
          </h2>
        </div>
        <div className="space-y-4">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setModal(i)}
              className={`relative w-full text-left rounded-2xl overflow-hidden bg-gradient-to-br ${card.bg} border border-cream/10 p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-8 h-8 text-lime">{card.icon}</div>
                <span className="font-display text-4xl text-cream/12">{card.id}</span>
              </div>
              <p className="font-body text-cream/50 text-[0.6rem] uppercase tracking-[0.3em] mb-2">
                {card.tag}
              </p>
              <h3 className="font-display text-2xl leading-tight text-cream mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-cream/55 italic">{card.outcome}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── Modal ── */}
      {modal !== null && (
        <ServiceModal card={CARDS[modal]} onClose={() => setModal(null)} /> )}
    </>
  );
}

function ServiceModal({ card, onClose }: { card: Card; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const t = requestAnimationFrame(() => setOpen(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-6 transition-opacity duration-300"
      style={{
        backgroundColor: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(6px)",
        opacity: open ? 1 : 0,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-ink border border-cream/15 rounded-2xl max-w-2xl w-full p-8 md:p-12 relative transition-all duration-300"
        style={{
          transform: open ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-5 text-cream/50 hover:text-cream text-sm uppercase tracking-widest"
          onClick={onClose}
          aria-label="Close"
        >
          Close ✕
        </button>
        <div className="w-9 h-9 text-lime mb-5">{card.icon}</div>
        <p className="font-body text-lime/80 text-[0.62rem] uppercase tracking-[0.35em] mb-3">
          {card.id} · {card.tag}
        </p>
        <h3 className="font-display text-[clamp(26px,3.2vw,40px)] leading-[0.92] text-cream mb-6">
          {card.title}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-7">
          {card.sub.map((s) => (
            <li
              key={s}
              className="font-body text-sm text-cream/65 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
              {s}
            </li>
          ))}
        </ul>
        <div className="border-t border-cream/10 pt-5">
          <p className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-cream/45 mb-1.5">
            Outcome
          </p>
          <p className="font-body text-base text-lime">{card.outcome}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Single card ──────────────────────────────────────────────────────────────
const ServiceCard = function ServiceCard({
  ref,
  card,
  index,
  total,
  onOpen,
}: {
  ref: (el: HTMLDivElement | null) => void;
  card: Card;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  // left position grows by SPINE_WIDTH for each card so peek strips stack up.
  const left = STACK_LEFT + index * SPINE_WIDTH;

  return (
    <div
      ref={ref}
      // Hide cards 1..N pre-paint without using a CSS transform — GSAP would
      // misread `translateX(100%)` as `x: width-in-px` (not xPercent), then
      // add its own xPercent on top, double-translating the card. The
      // `invisible` class avoids the flash; useGSAP (useLayoutEffect) flips
      // it to visible via `gsap.set` before paint. `motion-reduce:visible`
      // keeps the reduced-motion path showing all cards in final stacked state.
      className={`service-card absolute will-change-transform ${
        index > 0 ? "invisible motion-reduce:visible" : ""
      }`}
      style={{
        top: STACK_TOP,
        bottom: 24,
        left,
        right: STACK_RIGHT,
        zIndex: index + 10,
      }}
    >
      <div
        className={`relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br ${card.bg} border border-cream/10 shadow-[-30px_0_60px_-20px_rgba(0,0,0,0.7)] flex`}
      >
        {/* ── Left spine: visible peek strip when stacked behind ── */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${card.title}`}
          className="relative z-30 shrink-0 flex flex-col items-center justify-between py-7 border-r border-cream/10 bg-ink/40 backdrop-blur-[3px] cursor-pointer group"
          style={{ width: SPINE_WIDTH }}
        >
          <span className="font-display text-cream/90 text-2xl leading-none tabular-nums">
            {card.id}
          </span>
          <span
            className="font-body text-cream/55 text-[0.6rem] uppercase tracking-[0.35em]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {card.tag}
          </span>
          <span className="w-px h-10 bg-lime/60" aria-hidden="true" />
        </button>

        {/* ── Body ── */}
        <div className="relative flex-1 min-w-0 flex flex-col">
          {/* Dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #C4FF00 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          {/* Watermark glyph */}
          <span
            aria-hidden="true"
            className="absolute -right-4 bottom-0 font-display text-[24vw] leading-[0.78] select-none pointer-events-none text-white/[0.035]"
          >
            {card.id}
          </span>

          {/* Top meta strip */}
          <div className="relative z-10 flex items-center justify-between px-8 lg:px-12 pt-7 pb-6">
            <span className="font-body text-cream/50 text-[0.6rem] uppercase tracking-[0.35em]">
              {card.tag} · service
            </span>
            <span className="font-body text-cream/35 text-[0.6rem] uppercase tracking-[0.3em] tabular-nums">
              {index + 1} / {total}
            </span>
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex-1 flex flex-col justify-end px-8 lg:px-12 pb-12 max-w-4xl">
            <div className="w-10 h-10 text-lime mb-6">{card.icon}</div>
            <h3 className="font-display text-[clamp(40px,5.5vw,86px)] leading-[0.9] text-cream mb-7 max-w-2xl">
              {card.title}
            </h3>

            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1.5 mb-8 max-w-2xl">
              {card.sub.map((s) => (
                <li
                  key={s}
                  className="font-body text-[0.78rem] text-cream/55 flex items-center gap-2.5"
                >
                  <span className="w-1 h-1 rounded-full bg-lime shrink-0" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-6 pt-5 border-t border-cream/10">
              <div className="min-w-0">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-cream/40 mb-1.5">
                  Outcome
                </p>
                <p className="font-body text-sm md:text-base text-cream/80 italic max-w-md">
                  {card.outcome}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpen}
                className="shrink-0 inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.25em] text-lime hover:gap-3 transition-all duration-300 cursor-pointer"
              >
                Open service
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Icons ───────────────────────────────────────────────────────────────────
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function MediaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}
function TechIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
