"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ── Shared easing ─────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.8;

/* ── Reusable motion preset ────────────────────────────── */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION, delay, ease: EASE_OUT_EXPO },
  };
}

/* ── Dot-grid background ───────────────────────────────── */
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

/* ── Ghost background word ─────────────────────────────── */
function GhostWord() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-0 overflow-hidden select-none"
      style={{ lineHeight: 0.85 }}
    >
      <span
        className="font-display block text-cream"
        style={{
          fontSize: "clamp(12rem, 30vw, 28rem)",
          opacity: 0.025,
          letterSpacing: "0.02em",
          transform: "translateX(12%)",
          userSelect: "none",
        }}
      >
        GROW
      </span>
    </div>
  );
}

/* ── Scroll Indicator ──────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      {/* Mouse shell */}
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

/* ── Stat Pill ─────────────────────────────────────────── */
interface StatPillProps {
  value: string;
  label: string;
}

function StatPill({ value, label }: StatPillProps) {
  return (
    <div className="flex items-center gap-2 border border-cream/15 px-4 py-2 rounded-full">
      <span className="font-display text-cream/70 text-base tracking-wide">
        {value}
      </span>
      <span className="font-body text-cream/50 text-xs uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] bg-ink flex flex-col justify-center overflow-hidden pt-20 md:pt-24">
      {/* ── Layered backgrounds ── */}
      <DotGrid />
      <GhostWord />

      {/* ── Subtle radial glow behind headline ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "60vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(196,255,0,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto w-full py-16 md:py-20">

        {/* ── Eyebrow — line rendered outside motion so it's never invisible ── */}
        <motion.div
          {...fadeUp(0)}
          className="mb-6 md:mb-8 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-lime shrink-0" />
          <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
            Marketing Technology &amp; Media
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <h1 className="font-display leading-[0.9] mb-8 md:mb-10">
          {/* Line 1 */}
          <motion.span
            {...fadeUp(0.05)}
            className="block text-cream"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
            }}
          >
            FROM HERE TO
          </motion.span>

          {/* Line 2 — lime accent */}
          <motion.span
            {...fadeUp(0.15)}
            className="block text-lime"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
            }}
          >
            EVERYWHERE.
          </motion.span>
        </h1>

        {/* ── Subheadline ── */}
        <motion.p
          {...fadeUp(0.25)}
          className="font-body text-cream/60 text-base md:text-lg max-w-xl leading-relaxed mb-10 md:mb-12"
        >
          We connect brands in Tier-1 and Tier-2 India to the audiences that
          move markets — online, on-ground, and on-screen. One agency.
          Every medium.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-wrap items-center gap-4 mb-12 md:mb-16"
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="font-body font-bold text-xs uppercase tracking-widest text-ink bg-lime px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:bg-lime-dim active:bg-lime-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a Strategy Call
            <span aria-hidden="true" className="text-sm">→</span>
          </Link>

          {/* Secondary / ghost */}
          <Link
            href="/work"
            className="font-body font-medium text-xs uppercase tracking-widest text-cream border border-cream/20 px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:border-lime hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            View Case Studies
          </Link>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap items-center gap-3"
        >
          <StatPill value="20+" label="Brands Served" />
          <StatPill value="300+" label="Outdoor Locations" />
          <StatPill value="Since 2019" label="Lucknow, India" />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Bottom edge lime accent line ── */}
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
