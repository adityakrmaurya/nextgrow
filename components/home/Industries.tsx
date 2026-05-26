"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface Industry {
  name: string;
  short: string;
  services: string[];
  icon: React.ReactNode;
}

const INDUSTRIES: Industry[] = [
  {
    name: "QSR & Food Service",
    short: "QSR",
    services: ["Hyperlocal", "Offers", "Delivery platforms", "Offline activation"],
    icon: <FoodIcon />,
  },
  {
    name: "Healthcare & Wellness",
    short: "Health",
    services: ["Patient leads", "Doctor branding", "Hospital positioning", "Compliance content"],
    icon: <HealthIcon />,
  },
  {
    name: "Real Estate & Property",
    short: "Realty",
    services: ["Project launches", "Investment messaging", "Site visits", "Lead nurturing"],
    icon: <RealEstateIcon />,
  },
  {
    name: "Retail & E-Commerce",
    short: "Retail",
    services: ["Omnichannel", "Seasonal planning", "Inventory marketing", "CRO"],
    icon: <RetailIcon />,
  },
  {
    name: "FMCG & Consumer Goods",
    short: "FMCG",
    services: ["Launch campaigns", "Trade marketing", "Influencer", "Packaging"],
    icon: <FMCGIcon />,
  },
  {
    name: "Professional Services & B2B",
    short: "B2B",
    services: ["LinkedIn strategy", "Thought leadership", "ABM", "Lead scoring"],
    icon: <B2BIcon />,
  },
  {
    name: "Media & Content",
    short: "Media",
    services: ["Audience building", "Algorithms", "Monetization", "Personal branding"],
    icon: <MediaIcon />,
  },
  {
    name: "Hospitality & Tourism",
    short: "Hospo",
    services: ["Visual storytelling", "Reputation", "Booking optimization", "Reviews"],
    icon: <HospitalityIcon />,
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Entrance — sequential stagger, scroll-triggered (matches Services / CaseStudies cadence)
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".industry-card");
      if (!cards || cards.length === 0) return;

      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "expo.out",
        stagger: { each: 0.06, from: "start" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Section heading — editorial template */}
      <div className="relative z-10 mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.35em] mb-4">
            006 · Sectors we serve
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.9] text-cream max-w-2xl">
            Eight sectors.{" "}
            <span className="text-lime">One repeatable</span> growth system.
          </h2>
        </div>
        <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-cream text-3xl lg:text-4xl leading-none tabular-nums">
              08
            </span>
            <span className="font-body text-cream/40 text-[0.6rem] uppercase tracking-[0.3em]">
              Sectors
            </span>
          </div>
          <span className="block w-12 h-px bg-cream/15 mt-2" aria-hidden="true" />
          <p className="font-body text-cream/35 text-[0.6rem] uppercase tracking-[0.3em]">
            Hover any sector
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {INDUSTRIES.map((ind, i) => (
          <IndustryCard key={ind.name} industry={ind} index={i} />
        ))}
        <CTACard />
      </div>
    </section>
  );
}

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const [pinned, setPinned] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`industry-card group relative rounded-2xl overflow-hidden border border-cream/10 bg-gradient-to-br from-cream/[0.03] via-ink to-ink hover:border-lime/45 transition-colors duration-500 min-h-[240px] cursor-pointer ${
        pinned ? "is-pinned" : ""
      }`}
      onClick={() => setPinned((v) => !v)}
    >
      {/* Lime dot grid — matches CaseStudies / Services card vocabulary */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C4FF00 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative h-full p-6 flex flex-col">
        <div className="flex items-start justify-between">
          <span className="font-body text-[0.62rem] tracking-[0.25em] text-cream/40 group-hover:text-lime group-[.is-pinned]:text-lime transition-colors duration-300 tabular-nums">
            {num}
          </span>
          <span className="font-body text-[0.55rem] uppercase tracking-[0.3em] text-cream/30">
            {industry.short}
          </span>
        </div>

        {/* Icon — breathes continuously, lifts on hover */}
        <div className="mt-6 mb-4 w-9 h-9 text-cream/45 animate-industry-breathe transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-lime group-hover:-translate-y-3 group-hover:scale-110 group-[.is-pinned]:text-lime group-[.is-pinned]:-translate-y-3 group-[.is-pinned]:scale-110">
          {industry.icon}
        </div>

        {/* Name — slides up and fades on hover, making room for capabilities */}
        <p className="font-display text-xl md:text-2xl text-cream transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 group-hover:opacity-0 group-[.is-pinned]:-translate-y-4 group-[.is-pinned]:opacity-0">
          {industry.name}
        </p>

        {/* Sub-services — absolute, slides up from below */}
        <div className="absolute left-6 right-6 bottom-6 opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 group-hover:opacity-100 group-hover:translate-y-0 group-[.is-pinned]:opacity-100 group-[.is-pinned]:translate-y-0">
          <p className="font-body text-[0.58rem] uppercase tracking-[0.25em] text-lime mb-2">
            Capabilities
          </p>
          <p className="font-body text-[0.74rem] text-cream/70 leading-[1.55]">
            {industry.services.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function CTACard() {
  return (
    <a
      href="/#contact"
      className="industry-card group relative block rounded-2xl overflow-hidden border border-lime/40 bg-[#0e1408] hover:bg-[#141d0a] hover:border-lime transition-colors duration-500 min-h-[240px]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border border-lime/60 pointer-events-none animate-pulse-ring"
      />

      <div className="relative h-full p-6 flex flex-col">
        <div className="flex items-start justify-between">
          <span className="font-body text-[0.7rem] tracking-[0.25em] text-lime">+</span>
          <span className="font-body text-[0.55rem] uppercase tracking-[0.3em] text-lime/55">
            CTA
          </span>
        </div>

        <div className="mt-6 mb-4 w-9 h-9 text-lime animate-industry-breathe transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:scale-110">
          <PlusIcon />
        </div>

        <div className="mt-auto">
          <p className="font-display text-xl md:text-2xl text-lime mb-1.5">
            Your industry?
          </p>
          <p className="font-body text-sm text-cream/55 mb-3">
            Let&apos;s see if we&apos;re a fit.
          </p>
          <span className="font-body text-[0.62rem] uppercase tracking-[0.25em] text-lime group-hover:underline">
            Start a conversation →
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Icons (line-stroke, matches CaseStudies / Services style) ───────────────
function FoodIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>; }
function HealthIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>; }
function RealEstateIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function RetailIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>; }
function FMCGIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>; }
function B2BIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>; }
function MediaIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>; }
function HospitalityIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3"/></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
