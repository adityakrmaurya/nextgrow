"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface Differentiator {
  id: string;
  title: string;
  description: string;
}

const primary: Differentiator[] = [
  {
    id: "01",
    title: "Performance-First",
    description:
      "Revenue, leads, conversions, ROI — not vanity metrics. Every initiative is evaluated against clear business outcomes before a single rupee is spent.",
  },
  {
    id: "02",
    title: "Integrated Approach",
    description:
      "Strategy, creative, technology, and media work in harmony under one roof — eliminating gaps that plague multi-agency setups.",
  },
  {
    id: "03",
    title: "Data-Driven Decisions",
    description:
      "Advanced analytics, market intelligence, and real-time dashboards inform every decision. We optimize on evidence, not gut feel.",
  },
  {
    id: "04",
    title: "Scalable Systems",
    description:
      "Marketing systems engineered to scale with your business — from first lead funnel to national content pipeline, built for repeatability.",
  },
];

const secondary: Differentiator[] = [
  {
    id: "05",
    title: "Proven Track Record",
    description: "20+ partnerships averaging 18+ months retention.",
  },
  {
    id: "06",
    title: "Cost-Effective Excellence",
    description: "Metropolitan quality at Lucknow pricing.",
  },
  {
    id: "07",
    title: "Deep Industry Expertise",
    description: "Playbooks across QSR, healthcare, real estate, and more.",
  },
  {
    id: "08",
    title: "Transparent Collaboration",
    description: "Full dashboards, open comms, collaborative planning.",
  },
];

const proofStats = [
  { value: "20+", label: "Brands\nServed" },
  { value: "18+", label: "Months Avg.\nRetention" },
  { value: "3.2x", label: "ROAS\nAchieved" },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

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
            "radial-gradient(circle, rgba(245,240,232,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Lime radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0"
        style={{
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at bottom right, rgba(196,255,0,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-lime" />
              <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
                Why Choose Us
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="font-display text-cream leading-[0.9]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
              >
                WHY NEXTGROW
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE_OUT_EXPO }}
            className="font-body text-cream/40 text-sm leading-relaxed max-w-xs md:text-right italic"
          >
            &ldquo;Plan with clarity. Execute with precision.
            <br />
            Optimize with discipline. Scale with control.&rdquo;
          </motion.p>
        </div>

        {/* ── Primary differentiators — 2-col large ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-0">
          {primary.map((item, index) => {
            const isRightCol = index % 2 === 1;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isRightCol ? 40 : -40 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRightCol ? 40 : -40 }
                }
                transition={{
                  duration: 0.7,
                  delay: Math.floor(index / 2) * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
                className={[
                  "group flex gap-6 py-8 border-b border-cream/[0.08] cursor-default",
                  isRightCol ? "md:border-l md:pl-10 md:border-cream/[0.08]" : "md:pr-10",
                ].join(" ")}
              >
                <span className="font-display text-xs text-lime/50 tracking-widest shrink-0 mt-1.5 w-6">
                  {item.id}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-cream leading-none mb-3 tracking-wide transition-colors duration-300 group-hover:text-lime">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-cream/55 leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-4 h-px w-0 bg-lime/50 transition-all duration-500 group-hover:w-16"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Secondary differentiators — 4-col compact ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-cream/[0.08]">
          {secondary.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.35 + index * 0.07,
                ease: EASE_OUT_EXPO,
              }}
              className={[
                "group flex flex-col gap-2 py-6 cursor-default",
                index > 0 ? "lg:border-l lg:pl-6 border-cream/[0.08]" : "",
                index < secondary.length - 1 ? "lg:pr-6" : "",
              ].join(" ")}
            >
              <span className="font-display text-[0.6rem] text-lime/40 tracking-widest">
                {item.id}
              </span>
              <h4 className="font-display text-lg text-cream/80 leading-tight tracking-wide transition-colors duration-300 group-hover:text-lime">
                {item.title}
              </h4>
              <p className="font-body text-xs text-cream/40 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Proof stat bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.65, ease: EASE_OUT_EXPO }}
          className="mt-16 flex flex-wrap items-center gap-0 border border-cream/[0.08] divide-x divide-cream/[0.08]"
        >
          {proofStats.map(({ value, label }) => (
            <div
              key={value}
              className="flex items-center gap-4 px-8 py-6 flex-1 min-w-[140px]"
            >
              <span className="font-display text-4xl md:text-5xl text-lime leading-none">
                {value}
              </span>
              <span className="font-body text-xs text-cream/40 uppercase tracking-[0.18em] leading-snug whitespace-pre-line">
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 px-8 py-6 flex-1 min-w-[220px]">
            <div className="h-px w-6 bg-lime/40 shrink-0" />
            <p className="font-body text-xs text-cream/35 leading-relaxed italic">
              Metropolitan quality at Lucknow pricing — more in execution, less in overhead.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
