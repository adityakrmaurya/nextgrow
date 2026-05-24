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
  /** Optional suffix rendered after the animated number ("+" or "") */
  suffix: string;
  label: string;
}

const STATS: StatDatum[] = [
  { target: 300,  from: 0,    suffix: "+", label: "Outdoor Ad\nLocations Pan-India" },
  { target: 10,   from: 0,    suffix: "+", label: "Industries\nServed" },
  { target: 6,    from: 0,    suffix: "",  label: "Full-Service\nVerticals" },
  { target: 5,    from: 0,    suffix: "+", label: "Years of Delivering\nReal Growth" },
];

/* ── AnimatedCounter ────────────────────────────────────────────────────── */
interface AnimatedCounterProps {
  target: number;
  from: number;
  suffix: string;
  inView: boolean;
}

function AnimatedCounter({ target, from, suffix, inView }: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    // Reset to start value whenever visibility changes
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
      <motion.span>{rounded}</motion.span>
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

function StatCard({ target, from, suffix, label, index, inView }: StatCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Number */}
      <div className="font-display text-7xl md:text-8xl lg:text-9xl text-ink leading-none">
        <AnimatedCounter
          target={target}
          from={from}
          suffix={suffix}
          inView={inView}
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
          <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
            By the Numbers
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

      </div>
    </section>
  );
}
