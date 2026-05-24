"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.8;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION, delay, ease: EASE_OUT_EXPO },
  };
}

/* ── Dot-grid ── */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(245,240,232,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

/* ── Scroll Indicator ── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <div className="w-5 h-8 rounded-full border border-cream/40 flex items-start justify-center pt-1.5">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-lime"
          animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span aria-hidden="true" className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-cream/60">
        Scroll
      </span>
    </motion.div>
  );
}

/* ── Stat Pill ── */
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 border border-cream/15 px-4 py-2 rounded-full">
      <span className="font-display text-cream/70 text-base tracking-wide">{value}</span>
      <span className="font-body text-cream/50 text-xs uppercase tracking-widest whitespace-nowrap">{label}</span>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const { scrollY } = useScroll();
  const ghostY = useTransform(scrollY, [0, 600], [0, -110]);
  const squaresY = useTransform(scrollY, [0, 600], [0, -55]);
  const blobY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="relative w-full min-h-[100dvh] bg-ink flex flex-col justify-center overflow-hidden pt-20 md:pt-24">
      <DotGrid />

      {/* Animated gradient blob */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 animate-blob"
        style={{
          y: blobY,
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(ellipse, rgba(196,255,0,0.045) 0%, transparent 70%)",
          top: "5%",
          left: "-8%",
        }}
      />

      {/* Ghost background word — parallax */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 overflow-hidden select-none"
        style={{ lineHeight: 0.85, y: ghostY }}
      >
        <span
          className="font-display block text-cream"
          style={{
            fontSize: "clamp(12rem, 30vw, 28rem)",
            opacity: 0.025,
            letterSpacing: "0.02em",
            transform: "translateX(12%)",
          }}
        >
          GROW
        </span>
      </motion.div>

      {/* Concentric rotated squares — parallax */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: squaresY }}
      >
        {[0.06, 0.04, 0.025].map((opacity, i) => (
          <div
            key={i}
            className="absolute bottom-0 right-0"
            style={{
              width: `${35 + i * 18}vw`,
              height: `${35 + i * 18}vw`,
              border: `1px solid rgba(196,255,0,${opacity})`,
              transform: `translate(${28 + i * 2}%, ${28 + i * 2}%) rotate(45deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Radial glow behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(ellipse at center, rgba(196,255,0,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto w-full py-16 md:py-20">

        {/* Eyebrow */}
        <motion.div
          {...fadeUp(0)}
          className="mb-6 md:mb-8 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-lime shrink-0" />
          <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
            Grow Smarter. Grow Faster.
          </span>
        </motion.div>

        {/* Headline — curtain reveal (text rises from below overflow clip) */}
        <h1 className="font-display leading-[0.9] mb-8 md:mb-10">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-cream"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, delay: 0.08, ease: EASE_OUT_EXPO }}
              style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
            >
              FROM HERE TO
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-lime"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, delay: 0.22, ease: EASE_OUT_EXPO }}
              style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
            >
              EVERYWHERE.
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.42)}
          className="font-body text-cream/65 text-base md:text-lg max-w-lg leading-relaxed mb-10 md:mb-12"
        >
          We turn marketing spend into measurable outcomes — digital
          campaigns, offline presence, and on-screen production, all
          under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.52)}
          className="flex flex-wrap items-center gap-4 mb-12 md:mb-16"
        >
          <Link
            href="/contact"
            className="font-body font-bold text-xs uppercase tracking-widest text-ink bg-lime px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:bg-lime-dim active:bg-lime-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a Strategy Call
            <span aria-hidden="true" className="text-sm">→</span>
          </Link>
          <Link
            href="/case-studies"
            className="font-body font-medium text-xs uppercase tracking-widest text-cream border border-cream/20 px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:border-lime hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            View Case Studies
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-wrap items-center gap-3"
        >
          <StatPill value="300+" label="Outdoor Locations" />
          <StatPill value="18+ Mo" label="Avg. Retention" />
          <StatPill value="3.2x" label="ROAS Achieved" />
        </motion.div>
      </div>

      <ScrollIndicator />

      {/* Bottom edge lime accent line */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-lime/20 z-10"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.0, duration: 1.2, ease: EASE_OUT_EXPO }}
      />
    </section>
  );
}
