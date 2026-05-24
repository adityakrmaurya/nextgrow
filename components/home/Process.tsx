"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Easing ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Data ───────────────────────────────────────────────── */
interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "ASSESS",
    description:
      "Deep understanding of your business model, target audience, competitive landscape, revenue goals, and current marketing gaps.",
  },
  {
    number: "02",
    title: "STRATEGIZE",
    description:
      "We design the campaign architecture: positioning, messaging, acquisition channels, and customer journey mapping aligned to your objectives.",
  },
  {
    number: "03",
    title: "EXECUTE",
    description:
      "Campaign activation across digital and offline channels — content systems, performance marketing, and tracking infrastructure governed by clear KPIs.",
  },
  {
    number: "04",
    title: "OPTIMIZE",
    description:
      "Continuous monitoring through analytics dashboards. A/B testing, creative refresh, budget reallocation, and funnel optimization every cycle.",
  },
  {
    number: "05",
    title: "SCALE",
    description:
      "Once benchmarks are validated, we scale winning strategies across larger budgets, new geographies, and additional channels with cost discipline.",
  },
];

/* ── Step Card ──────────────────────────────────────────── */
interface StepCardProps {
  step: Step;
  index: number;
  isInView: boolean;
  isLast: boolean;
}

function StepCard({ step, index, isInView, isLast }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: EASE_OUT_EXPO,
      }}
      className={[
        /* Mobile: vertical stack with left border, overflow-hidden prevents deco number bleed */
        "relative flex gap-5 pl-6 border-l-2 border-ink/20 overflow-hidden",
        isLast ? "pb-0" : "pb-10",
        "md:flex-col md:pl-0 md:border-l-0 md:pb-0 md:overflow-visible",
      ].join(" ")}
    >
      {/* Giant decorative number — hidden on mobile to avoid text obstruction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none hidden md:block"
        style={{ top: "-0.25rem", left: "-0.5rem" }}
      >
        <span
          className="font-display text-ink/[0.07] leading-none block"
          style={{ fontSize: "clamp(5rem, 10vw, 7rem)" }}
        >
          {step.number}
        </span>
      </div>

      {/* Step indicator dot — desktop only */}
      <div className="hidden md:flex items-center relative z-10 mb-5">
        <div className="w-3 h-3 bg-ink flex-shrink-0" />
      </div>

      {/* Mobile: dot — aligned to match border-l with pl-6 */}
      <div className="md:hidden flex-shrink-0 mt-1.5">
        <div className="w-2.5 h-2.5 bg-ink/60 -ml-[1.1875rem]" />
      </div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col gap-3 pt-1 md:pt-0">
        {/* Number label — small, above title on desktop */}
        <span className="font-body text-xs text-ink/50 tracking-[0.25em] uppercase">
          {step.number}
        </span>

        {/* Title */}
        <h3 className="font-display text-3xl text-ink leading-none tracking-wide">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-ink/60 leading-relaxed max-w-xs">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Process Section ────────────────────────────────────── */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle noise texture — same as Services section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Ghost decorative "05" */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 overflow-hidden select-none"
      >
        <span
          className="font-display block text-ink"
          style={{
            fontSize: "clamp(14rem, 32vw, 30rem)",
            opacity: 0.03,
            letterSpacing: "0.02em",
            transform: "translate(-10%, 30%)",
            lineHeight: 1,
          }}
        >
          05
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-lime" />
            <span className="font-body text-ink text-xs uppercase tracking-[0.25em]">
              How We Work
            </span>
          </motion.div>

          <h2
            className="font-display text-ink leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={isInView ? { y: "0%" } : { y: "105%" }}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE_OUT_EXPO }}
              >
                OUR PROCESS
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="font-body text-sm text-ink/45 mt-5 max-w-2xl leading-relaxed"
          >
            Plan with clarity. Execute with precision. Optimize with discipline. Scale with control.
          </motion.p>
        </div>

        {/* ── Steps container ──
            Mobile:  vertical stacked (flex-col), lime left border on each card
            Desktop: horizontal 4-col grid with lime connector line across the top
        ── */}
        <div className="relative">

          {/* Desktop connecting line — runs across the step-indicator row */}
          {/* Positioned to bisect the lime squares (which are 12px tall, centered at ~20px from top of grid) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="hidden md:block absolute left-0 right-0 h-px bg-ink/20 origin-left"
            /*
              The lime squares are rendered inside a flex container at the very
              top of each column. The line should pass through their vertical
              midpoint. The squares are 12px (h-3) and their container has mb-5.
              We position at top: 6px (half of 12px).
            */
            style={{ top: "6px" }}
          />

          {/* Steps grid */}
          <div className="flex flex-col md:grid md:grid-cols-5 md:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isInView={isInView}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
