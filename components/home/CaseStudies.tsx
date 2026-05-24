"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Types ──────────────────────────────────────────────── */
interface CaseStudy {
  client: string;
  category: string;
  result: string;
  resultLabel: string;
  description: string;
  tags: string[];
}

/* ── Data ───────────────────────────────────────────────── */
const caseStudies: CaseStudy[] = [
  {
    client: "Squarro Pizza",
    category: "QSR · Offline Marketing",
    result: "+45%",
    resultLabel: "Increase in Store Visits",
    description:
      "Hyperlocal outdoor campaign and social activation that drove measurable foot traffic to Squarro's Lucknow outlets within 60 days.",
    tags: ["Hoardings", "Social Media", "Hyperlocal"],
  },
  {
    client: "Medinity Hospital",
    category: "Healthcare · Digital Marketing",
    result: "150+",
    resultLabel: "Qualified Leads Per Month",
    description:
      "Performance-driven Meta and Google campaigns targeting high-intent patients in Lucknow, delivered consistently at low CPL.",
    tags: ["Meta Ads", "Google Ads", "SEO"],
  },
  {
    client: "Amritansh Talks",
    category: "Media · Content & YouTube",
    result: "5K → 45K",
    resultLabel: "Followers, 250% Engagement Growth",
    description:
      "Full YouTube and Instagram strategy that grew an emerging speaker's personal brand to a loyal 45K community in under 8 months.",
    tags: ["YouTube", "Instagram", "Content Strategy"],
  },
  {
    client: "VPV Realty",
    category: "Real Estate · Digital Marketing",
    result: "80+",
    resultLabel: "Qualified Leads Per Month",
    description:
      "Targeted digital campaigns cutting through Lucknow's saturated real estate market to deliver pre-qualified buyer inquiries.",
    tags: ["Meta Ads", "Landing Pages", "CRM"],
  },
  {
    client: "Axis Archi",
    category: "Architecture · Branding",
    result: "+180%",
    resultLabel: "Instagram Growth",
    description:
      "Brand identity refresh and social media strategy that repositioned Axis Archi as a premium design firm.",
    tags: ["Branding", "Social Media", "Content"],
  },
];

/* ── Easing ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Case Study Card ────────────────────────────────────── */
interface CardProps {
  study: CaseStudy;
  index: number;
  isInView: boolean;
  large?: boolean;
}

function CaseStudyCard({ study, index, isInView, large = false }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative flex flex-col justify-between bg-cream/5 border border-cream/[0.08] p-7 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:border-lime/30 hover:bg-cream/[0.07] active:scale-[0.99] cursor-pointer"
      style={{
        boxShadow: "inset 0 1px 0 rgba(245,240,232,0.04)",
      }}
    >
      {/* Full-card link overlay */}
      <Link
        href="/case-studies"
        className="absolute inset-0 z-10"
        aria-label={`View ${study.client} case study`}
      />

      {/* Top: category */}
      <div className="flex items-start justify-between mb-6 relative z-20">
        <span className="font-body text-lime/70 text-xs uppercase tracking-widest leading-tight">
          {study.category}
        </span>
        {/* Corner arrow — always visible, brightens and shifts out on hover */}
        <span
          aria-hidden="true"
          className="font-body text-lime/30 text-sm transition-all duration-300 group-hover:text-lime/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>

      {/* Middle: big result */}
      <div className="flex-1 flex flex-col justify-center mb-4">
        <div
          className="font-display text-lime leading-none mb-2 transition-all duration-300"
          style={{
            fontSize: large
              ? "clamp(3.5rem, 7vw, 6rem)"
              : "clamp(3rem, 5vw, 4.5rem)",
          }}
        >
          {study.result}
        </div>
        <p className="font-body text-sm text-cream/60 leading-snug">
          {study.resultLabel}
        </p>
      </div>

      {/* Client name */}
      <h3 className="font-display text-2xl text-cream mt-4 tracking-wide leading-tight">
        {study.client}
      </h3>

      {/* Description */}
      <p className="font-body text-xs text-cream/50 leading-relaxed mt-2 mb-5">
        {study.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-cream/[0.06]">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs text-cream/40 border border-cream/10 px-2.5 py-1 transition-colors duration-200 group-hover:border-lime/20 group-hover:text-cream/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-lime/60 transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  );
}

/* ── Decorative number ──────────────────────────────────── */
function GhostNumber({ n }: { n: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 overflow-hidden select-none z-0"
    >
      <span
        className="font-display block text-cream"
        style={{
          fontSize: "clamp(12rem, 28vw, 26rem)",
          opacity: 0.025,
          letterSpacing: "0.02em",
          transform: "translate(18%, 22%)",
          lineHeight: 1,
        }}
      >
        {n}
      </span>
    </div>
  );
}

/* ── CaseStudies Section ────────────────────────────────── */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  // Bento-style layout:
  // Row 1: cards 0 + 1 — 2 equal columns, taller
  // Row 2: cards 2 + 3 + 4 — 3 equal columns

  const topRow = caseStudies.slice(0, 2);
  const bottomRow = caseStudies.slice(2, 5);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ink py-24 md:py-32 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(245,240,232,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow behind stats */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "50vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(196,255,0,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Ghost word */}
      <GhostNumber n="05" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-lime" />
            <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
              Results That Speak
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="font-display text-cream leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              BRANDS WE'VE
              <br />
              GROWN
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="font-body text-sm text-cream/40 max-w-xs leading-relaxed md:text-right"
            >
              Real numbers. Real clients.
              <br />
              Every result is verified and documented.
            </motion.p>
          </div>
        </div>

        {/* ── Bento Grid ── */}

        {/* Row 1: 2 large cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          {topRow.map((study, i) => (
            <CaseStudyCard
              key={study.client}
              study={study}
              index={i}
              isInView={isInView}
              large={true}
            />
          ))}
        </div>

        {/* Row 2: 3 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {bottomRow.map((study, i) => (
            <CaseStudyCard
              key={study.client}
              study={study}
              index={i + 2}
              isInView={isInView}
              large={false}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT_EXPO }}
          className="mt-12 flex items-center justify-center"
        >
          <Link
            href="/case-studies"
            className="group font-body font-semibold text-sm text-lime border border-lime/30 px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-lime hover:text-ink hover:border-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            View all case studies
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
