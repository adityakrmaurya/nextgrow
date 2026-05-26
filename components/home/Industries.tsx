"use client";
import { useRef, useState, useEffect } from "react";

interface Industry {
  name: string;
  services: string[];
  icon: React.ReactNode;
}

const INDUSTRIES: Industry[] = [
  {
    name: "QSR & Food Service",
    services: ["Hyperlocal targeting", "Offer campaigns", "Delivery platform optimization", "Offline activation"],
    icon: <FoodIcon />,
  },
  {
    name: "Healthcare & Wellness",
    services: ["Qualified patient leads", "Doctor branding", "Hospital positioning", "Compliance-aware content"],
    icon: <HealthIcon />,
  },
  {
    name: "Real Estate & Property",
    services: ["Project launches", "Investment messaging", "Site visit generation", "Lead nurturing"],
    icon: <RealEstateIcon />,
  },
  {
    name: "Retail & E-Commerce",
    services: ["Omnichannel journeys", "Seasonal planning", "Inventory-based marketing", "CRO"],
    icon: <RetailIcon />,
  },
  {
    name: "FMCG & Consumer Goods",
    services: ["Launch campaigns", "Trade marketing", "Influencer collaborations", "Packaging design"],
    icon: <FMCGIcon />,
  },
  {
    name: "Professional Services & B2B",
    services: ["Thought leadership", "LinkedIn strategy", "ABM", "Lead scoring"],
    icon: <B2BIcon />,
  },
  {
    name: "Media & Content Creation",
    services: ["Audience building", "Platform algorithms", "Monetization", "Personal branding"],
    icon: <MediaIcon />,
  },
  {
    name: "Hospitality & Tourism",
    services: ["Visual storytelling", "Reputation management", "Booking optimization", "Review management"],
    icon: <HospitalityIcon />,
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect(); } }, { threshold: 0.15 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="py-20 px-6 md:px-12 lg:px-20">
      <div className="mb-12">
        <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-3">Industries</p>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-cream max-w-2xl">
          Eight sectors. One repeatable growth system.
        </h2>
      </div>

      {/* 3×3 grid on desktop, 2-col on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-cream/8">
        {INDUSTRIES.map((ind, i) => (
          <IndustryCell key={ind.name} industry={ind} index={i} visible={visible} />
        ))}

        {/* 9th cell — CTA */}
        <a
          href="/#contact"
          className="relative bg-ink p-8 flex flex-col justify-between min-h-[200px] md:min-h-[240px] group overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            transitionDelay: `${INDUSTRIES.length * 60}ms`,
          }}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 border border-lime/20 animate-pulse" aria-hidden="true" />
          <div className="w-8 h-8 text-lime">
            <PlusIcon />
          </div>
          <div>
            <p className="font-display text-2xl text-cream mb-1">Your industry?</p>
            <p className="font-body text-sm text-cream/50 mb-3">Let's see if we're a fit.</p>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-lime group-hover:underline">
              Start a conversation →
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

function IndustryCell({ industry, index, visible }: { industry: Industry; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false); // mobile tap

  return (
    <div
      className="relative bg-ink p-8 flex flex-col justify-between min-h-[200px] md:min-h-[240px] overflow-hidden group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Hover lime border — stroke-dasharray approach */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          fill="none"
          stroke="#C4FF00"
          strokeWidth="1.5"
          strokeDasharray="400"
          strokeDashoffset={hovered ? "0" : "400"}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      {/* Icon */}
      <div
        className="w-8 h-8 text-cream/30 transition-colors duration-300"
        style={{ color: hovered ? "#C4FF00" : undefined }}
      >
        {industry.icon}
      </div>

      {/* Name */}
      <div>
        <p className="font-display text-xl md:text-2xl text-cream mb-3">{industry.name}</p>

        {/* Sub-services — hover on desktop, tap-expand on mobile */}
        <ul
          className={`space-y-1 overflow-hidden transition-all duration-300 ${
            hovered || expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {industry.services.map((s) => (
            <li key={s} className="font-body text-[0.68rem] text-cream/45 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-lime shrink-0" />{s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// SVG icons — line-style
function FoodIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>; }
function HealthIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>; }
function RealEstateIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function RetailIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>; }
function FMCGIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>; }
function B2BIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>; }
function MediaIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>; }
function HospitalityIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3"/></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
