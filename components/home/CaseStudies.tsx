"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Case {
  slug: string;
  industry: string;
  client: string;
  objective: string;
  stats: { value: string; label: string }[];
  bg: string;
}

const CASES: Case[] = [
  {
    slug: "squarro-pizza",
    industry: "QSR",
    client: "Squarro Pizza",
    objective: "Increase store footfall and strengthen local brand recall.",
    stats: [
      { value: "45%", label: "Store Visits ↑" },
      { value: "60%", label: "Walk-ins During Campaigns" },
      { value: "3.2×", label: "ROAS on Paid" },
    ],
    bg: "from-[#1a0800] via-[#0a0a0a] to-[#0a0a0a]",
  },
  {
    slug: "medinity-hospital",
    industry: "Healthcare",
    client: "Medinity Hospital",
    objective: "Generate qualified patient leads across multiple specialties.",
    stats: [
      { value: "150+", label: "Qualified Leads / Month" },
      { value: "35%", label: "Lead-to-Consultation Rate" },
      { value: "40%", label: "CPL Reduction" },
    ],
    bg: "from-[#000d1a] via-[#0a0a0a] to-[#0a0a0a]",
  },
  {
    slug: "amritansh-talks",
    industry: "Media",
    client: "Amritansh Talks",
    objective: "Build authority positioning and digital audience growth.",
    stats: [
      { value: "250%", label: "Engagement Growth" },
      { value: "45K", label: "Followers (from 5K)" },
      { value: "8mo", label: "to Establish Thought Leadership" },
    ],
    bg: "from-[#0d0014] via-[#0a0a0a] to-[#0a0a0a]",
  },
  {
    slug: "vpv-realty",
    industry: "Real Estate",
    client: "VPV Realty",
    objective: "Generate high-intent property leads for premium projects.",
    stats: [
      { value: "28%", label: "Lead-to-Site-Visit ↑" },
      { value: "80+", label: "Qualified Leads / Month" },
      { value: "Systematic", label: "Acquisition Model Built" },
    ],
    bg: "from-[#0a0e00] via-[#0a0a0a] to-[#0a0a0a]",
  },
  {
    slug: "axis-archi",
    industry: "Architecture",
    client: "Axis Archi",
    objective: "Attract premium architecture and interior design clients.",
    stats: [
      { value: "180%", label: "Instagram Follower Growth" },
      { value: "40%", label: "Higher Avg. Project Value" },
      { value: "3×", label: "Inbound Enquiries" },
    ],
    bg: "from-[#0a0a00] via-[#0a0a0a] to-[#0a0a0a]",
  },
];

// Heading lives INSIDE the pin so it persists across the card stack — the
// stack base clears the nav + heading block; each card peeks STACK_OFFSET
// below the previous.
const NAV_HEIGHT = 80;
const HEADING_BLOCK = 140;
const STACK_OFFSET = 48;
const STACK_BASE = NAV_HEIGHT + HEADING_BLOCK;

export default function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const pin = pinRef.current;
    if (cards.length === 0 || !pin) return;

    cards.forEach((c, i) => {
      if (i > 0) gsap.set(c, { yPercent: 100 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${(cards.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (cards.length - 1));
          setActiveIdx(idx);
        },
      },
    });

    cards.forEach((c, i) => {
      if (i === 0) return;
      tl.to(c, { yPercent: 0, ease: "none", duration: 1 }, i - 1);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      cards.forEach((c) => gsap.set(c, { clearProps: "all" }));
    };
  }, []);

  return (
    <section id="case-studies" className="relative bg-ink">
      {/* Desktop: pinned viewport — heading persists at z-50 above the card stack */}
      <div ref={trackRef} className="hidden md:block relative">
        <div ref={pinRef} className="h-screen overflow-hidden">
          {/* Persistent heading inside the pin */}
          <div
            data-case-heading=""
            className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 pt-24 pb-6 pointer-events-none"
          >
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.35em] mb-3">
                  005 · Selected Work
                </p>
                <h2 className="font-display text-[clamp(32px,4vw,60px)] leading-[0.9] text-cream max-w-3xl">
                  Real campaigns.{" "}
                  <span className="text-lime">Hard numbers.</span>
                </h2>
              </div>
              {/* Active-idx counter — tells users where they are in the stack */}
              <div className="hidden lg:flex flex-col items-end gap-3 pb-2 shrink-0">
                <span className="font-display text-cream/70 text-lg leading-none tabular-nums">
                  {String(activeIdx + 1).padStart(2, "0")}
                  <span className="text-cream/25 mx-2">/</span>
                  {String(CASES.length).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                  {CASES.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-[2px] transition-all duration-500 ${
                        i === activeIdx ? "w-10 bg-lime" : "w-4 bg-cream/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-body text-cream/35 text-[0.58rem] uppercase tracking-[0.3em] mt-1">
                  {CASES[activeIdx]?.industry}
                </p>
              </div>
            </div>
          </div>

          {/* Card stack */}
          <div className="absolute inset-0 px-4 md:px-6 lg:px-8">
            {CASES.map((c, i) => (
              <CasePanel
                key={c.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                case_={c}
                index={i}
                total={CASES.length}
                stickyTop={STACK_BASE + i * STACK_OFFSET}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: simple vertical list (pin/stack relies on viewport height
          and a fixed navbar that the mobile layout doesn't have room for) */}
      <div className="md:hidden px-4 pb-16 space-y-5">
        {CASES.map((c, i) => (
          <MobileCasePanel
            key={c.slug}
            case_={c}
            index={i}
            total={CASES.length}
          />
        ))}
      </div>
    </section>
  );
}

function MobileCasePanel({
  case_,
  index,
  total,
}: {
  case_: Case;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${case_.bg} border border-cream/10 transition-all duration-700`}
      style={{
        minHeight: "80vh",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 px-6 h-[48px] flex items-center justify-between border-b border-cream/10 bg-ink/30">
        <div className="flex items-center gap-3">
          <span className="font-display text-cream text-xl leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-body text-cream/60 text-[0.6rem] uppercase tracking-[0.3em]">
            {case_.industry}
          </span>
        </div>
        <span className="font-body text-cream/40 text-[0.55rem] uppercase tracking-[0.25em]">
          {index + 1} / {total}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[40vw] leading-none select-none pointer-events-none text-white/[0.03]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-10 pt-20 min-h-[80vh]">
        <h3 className="font-display text-[clamp(36px,9vw,56px)] leading-[0.9] text-cream mb-3">
          {case_.client}
        </h3>
        <p className="font-body text-cream/60 text-sm mb-6">{case_.objective}</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {case_.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-[clamp(20px,5vw,30px)] leading-none text-cream">
                {s.value}
              </p>
              <p className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-cream/40 mt-1.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <a
          href={`/case-studies/${case_.slug}`}
          className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-lime self-start"
        >
          Read full case study →
        </a>
      </div>
    </div>
  );
}

const CasePanel = function CasePanel({
  ref,
  case_,
  index,
  total,
  stickyTop,
}: {
  ref: (el: HTMLDivElement | null) => void;
  case_: Case;
  index: number;
  total: number;
  stickyTop: number;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(index === 0);
  const [statsVisible, setStatsVisible] = useState(index === 0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || index === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.35) {
          setVisible(true);
          setTimeout(() => setStatsVisible(true), 300);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={(el) => {
        innerRef.current = el;
        ref(el);
      }}
      className="case-card absolute left-0 right-0 will-change-transform"
      style={{
        top: `${stickyTop}px`,
        height: `calc(100vh - ${stickyTop + 24}px)`,
        zIndex: index,
      }}
    >
      <div
        className={`relative h-full rounded-3xl overflow-hidden bg-gradient-to-br ${case_.bg} border border-cream/10 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col`}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C4FF00 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 font-display text-[28vw] md:text-[22vw] leading-none select-none pointer-events-none text-white/[0.03]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content block — industry eyebrow + client + objective + stats + CTA */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-14 md:pb-20 pt-16 max-w-3xl min-h-0">
          <p className="font-body text-lime/80 text-[0.62rem] uppercase tracking-[0.35em] mb-4">
            {String(index + 1).padStart(2, "0")} · {case_.industry}
          </p>
          <h3 className="font-display text-[clamp(44px,8vw,96px)] leading-[0.88] text-cream mb-5 overflow-hidden">
            <span
              className="block transition-transform duration-700"
              style={{
                transform: visible ? "translateY(0)" : "translateY(110%)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "150ms",
              }}
            >
              {case_.client}
            </span>
          </h3>

          <p
            className="font-body text-cream/60 text-sm md:text-base mb-10 max-w-xl transition-all duration-600"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "300ms",
            }}
          >
            {case_.objective}
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-10 mb-10 max-w-2xl">
            {case_.stats.map((s, i) => (
              <div
                key={s.label}
                className="transition-all duration-500"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible
                    ? "translateY(0)"
                    : "translateY(12px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <p className="font-display text-[clamp(28px,3.6vw,52px)] leading-none text-cream">
                  {s.value}
                </p>
                <p className="font-body text-[0.58rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-cream/40 mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href={`/case-studies/${case_.slug}`}
            className="inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.25em] text-lime hover:gap-3 transition-all duration-300 self-start"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: "650ms",
            }}
          >
            Read full case study
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
