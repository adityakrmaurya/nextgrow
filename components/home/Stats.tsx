"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   Stats — animated counter section on cream background.
   Framer Motion: useMotionValue + useTransform + animate() count-up.
   Triggered once when section enters the viewport.
───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  motion,
  useInView,
} from "framer-motion";

/* ── Types ──────────────────────────────────────────────────────────────── */
interface StatDatum {
  /** The numeric value to count up to */
  target: number;
  /** Starting value for the counter animation */
  from: number;
  /** Optional suffix rendered after the animated number ("+" or "x") */
  suffix: string;
  label: string;
  /** Decimal places to show (0 = integer, 1 = one decimal) */
  decimals?: number;
}

const STATS: StatDatum[] = [
  { target: 300,  from: 0,   suffix: "+",  label: "Outdoor Ad\nLocations Pan-India" },
  { target: 18,   from: 0,   suffix: "+",  label: "Months Avg.\nClient Retention" },
  { target: 3.2,  from: 1.0, suffix: "x",  label: "ROAS\nAchieved", decimals: 1 },
  { target: 5,    from: 0,   suffix: "+",  label: "Years of Delivering\nReal Growth" },
];

/* ── AnimatedCounter ────────────────────────────────────────────────────── */
interface AnimatedCounterProps {
  target: number;
  from: number;
  suffix: string;
  inView: boolean;
  decimals?: number;
}

function AnimatedCounter({ target, from, suffix, inView, decimals = 0 }: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const formatted = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : String(Math.round(v))
  );

  useEffect(() => {
    if (!inView) {
      count.set(from);
      return;
    }
    const controls = animate(count, target, {
      duration: 1.8,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, count, target, from]);

  return (
    <span className="inline-flex items-baseline tabular-nums leading-none">
      <motion.span>{formatted}</motion.span>
      {suffix && (
        <span aria-hidden="true" className="ml-0.5">
          {suffix}
        </span>
      )}
    </span>
  );
}

/* ── StatCard ───────────────────────────────────────────────────────────── */
interface StatCardProps extends StatDatum {
  index: number;
  inView: boolean;
}

function StatCard({ target, from, suffix, label, index, inView, decimals }: StatCardProps) {
  const isFirst = index === 0;

  return (
    <motion.div
      className={[
        "flex flex-col justify-center px-8 md:px-10 xl:px-14 py-10 md:py-0",
        /* vertical divider on desktop for all but the first card */
        !isFirst ? "md:border-l border-ink/10" : "",
        /* horizontal divider on mobile for bottom-row cards */
        index >= 2 ? "border-t border-ink/10 md:border-t-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      initial={{ opacity: 0, scale: 0.86, y: 16 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Number */}
      <div className="font-display text-7xl md:text-8xl lg:text-9xl text-ink leading-none">
        <AnimatedCounter
          target={target}
          from={from}
          suffix={suffix}
          inView={inView}
          decimals={decimals}
        />
      </div>

      {/* Label */}
      <p className="font-body text-sm uppercase tracking-[0.18em] text-ink/50 mt-3 max-w-[12ch] leading-snug whitespace-pre-line">
        {label}
      </p>
    </motion.div>
  );
}

/* ── Stats (section) ────────────────────────────────────────────────────── */
export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  // once: false — allows counter to reset and replay on re-entry
  const inView = useInView(sectionRef, { once: false, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-20 md:py-28 overflow-hidden"
      aria-label="NextGrow by the numbers"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

        {/* ── Eyebrow ── */}
        <motion.div
          className="flex items-center gap-3 mb-14 md:mb-20"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-8 bg-lime flex-shrink-0" aria-hidden="true" />
          <span className="font-body text-ink text-xs uppercase tracking-[0.25em]">
            Proof, Not Promises
          </span>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── ROAS note + CTA ── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-xs text-ink/40 leading-relaxed">
            3.2x ROAS from documented case studies
          </p>
          <a
            href="/case-studies"
            className="group font-body text-xs font-semibold text-ink/60 uppercase tracking-widest inline-flex items-center gap-2 transition-colors duration-200 hover:text-ink"
          >
            See the results behind these numbers
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
