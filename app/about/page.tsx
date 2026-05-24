"use client";

import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    label: "Vision",
    text: "To be the most trusted and results-driven marketing partner for growing businesses — turning marketing spend into measurable, scalable growth.",
  },
  {
    label: "Mission",
    text: "We deliver integrated marketing solutions that combine strategy, technology, creativity, and data to help brands grow faster, smarter, and more efficiently.",
  },
];

const STATS = [
  { value: "5+", label: "Years" },
  { value: "20+", label: "Brands" },
  { value: "8+", label: "Industries" },
  { value: "18+mo", label: "Avg. Retention" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink pt-28 md:pt-32 pb-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-lime" />
            <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
              About NextGrow
            </span>
          </div>
          <h1
            className="font-display text-cream leading-[0.9] mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            YOUR TRUSTED
            <br />
            <span className="text-lime">GROWTH PARTNER</span>
          </h1>
          <p className="font-body text-cream/60 text-base md:text-lg max-w-2xl leading-relaxed">
            NextGrow is a Marketing Technology &amp; Media company based in Lucknow,
            delivering strategy, performance marketing, and execution across
            digital, offline, and on-screen — for brands that want to grow
            smarter and faster.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center border border-cream/[0.08] divide-x divide-cream/[0.08] mb-16 md:mb-24"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col px-8 py-6 flex-1 min-w-[110px]">
              <span className="font-display text-3xl md:text-4xl text-lime leading-none mb-1">
                {value}
              </span>
              <span className="font-body text-xs text-cream/40 uppercase tracking-[0.18em]">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-16 md:mb-24">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, x: i === 0 ? -32 : 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.1, ease: EASE_OUT_EXPO }}
              className={[
                "py-10 pr-10",
                i === 1 ? "md:border-l md:pl-10 md:pr-0 border-cream/[0.08]" : "",
              ].join(" ")}
            >
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-lime mb-4">
                {pillar.label}
              </p>
              <p className="font-body text-cream/70 text-base leading-relaxed">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Who we are */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: EASE_OUT_EXPO }}
          className="border-t border-cream/[0.08] pt-12"
        >
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-lime mb-6">
            Who We Are
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <p className="font-body text-cream/55 text-sm leading-relaxed">
              Founded in 2019 and headquartered in Lucknow, NextGrow has grown from a
              local agency into a full-service marketing technology partner serving brands
              across 8+ industries. We combine the strategic depth of a consultancy with
              the execution speed of an in-house team.
            </p>
            <p className="font-body text-cream/55 text-sm leading-relaxed">
              Our integrated model — strategy, creative, media, and technology under one
              roof — eliminates the coordination gaps that plague multi-agency setups. Every
              campaign is governed by clear KPIs, real-time dashboards, and a relentless
              focus on business outcomes over vanity metrics.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
          className="mt-16 flex flex-wrap gap-4"
        >
          <a
            href="/contact"
            className="font-body font-bold text-xs uppercase tracking-widest text-ink bg-lime px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:bg-lime/90"
          >
            Book a Strategy Call →
          </a>
          <a
            href="/case-studies"
            className="font-body font-medium text-xs uppercase tracking-widest text-cream border border-cream/20 px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:border-lime hover:text-lime"
          >
            View Our Work
          </a>
        </motion.div>
      </div>
    </main>
  );
}
