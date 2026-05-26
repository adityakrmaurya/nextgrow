"use client";
import { useEffect, useRef, useState } from "react";

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

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative">
      {/* Lime swipe overlay that fires between cases */}
      <div id="case-swipe" aria-hidden="true" className="fixed inset-0 z-30 bg-lime pointer-events-none" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />

      {CASES.map((c, i) => (
        <CasePanel key={c.slug} case_={c} index={i} isFirst={i === 0} />
      ))}
    </section>
  );
}

function CasePanel({ case_, index, isFirst }: { case_: Case; index: number; isFirst: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState(case_.stats.map(() => "0"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setStatsVisible(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    setCounts(case_.stats.map((s) => s.value));
  }, [statsVisible, case_.stats]);

  return (
    <div
      ref={ref}
      className={`relative w-full flex flex-col justify-end overflow-hidden bg-gradient-to-br ${case_.bg}`}
      style={{ minHeight: "100svh" }}
    >
      {/* Animated bg pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #C4FF00 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "blob-drift 20s ease-in-out infinite",
        }}
      />

      {/* Content block — bottom left */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-20 max-w-2xl">
        {/* Industry tag */}
        <p
          className="font-body text-lime text-[0.62rem] uppercase tracking-[0.3em] mb-4 transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transitionDelay: "100ms",
          }}
        >
          {case_.industry}
        </p>

        {/* Client name — masked reveal */}
        <h2
          className="font-display text-[clamp(48px,8vw,96px)] leading-[0.88] text-cream mb-4 overflow-hidden"
        >
          <span
            className="block transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(110%)",
              transitionDelay: "200ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {case_.client}
          </span>
        </h2>

        {/* Objective */}
        <p
          className="font-body text-cream/60 text-sm md:text-base mb-8 transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "350ms",
          }}
        >
          {case_.objective}
        </p>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12 mb-8">
          {case_.stats.map((s, i) => (
            <div
              key={s.label}
              className="transition-all duration-500"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${500 + i * 80}ms`,
              }}
            >
              <p className="font-display text-[clamp(26px,3.5vw,44px)] leading-none text-cream">
                {counts[i]}
              </p>
              <p className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-cream/40 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`/case-studies/${case_.slug}`}
          className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-lime hover:underline transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "700ms",
          }}
        >
          Read full case study →
        </a>
      </div>

      {/* Case number watermark */}
      <span
        aria-hidden="true"
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 font-display text-[30vw] leading-none select-none pointer-events-none text-white/[0.03]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
