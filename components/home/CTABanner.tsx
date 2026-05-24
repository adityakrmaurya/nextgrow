"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Easing ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Dot Grid — dark on lime ────────────────────────────── */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(10,10,10,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

/* ── CTABanner ──────────────────────────────────────────── */
export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-lime py-20 md:py-28 overflow-hidden"
    >
      {/* Dot grid background decoration */}
      <DotGrid />

      {/* Subtle radial vignette — slightly darker lime at edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.06) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-ink/30" />
          <span className="font-body text-ink/60 text-xs uppercase tracking-[0.25em]">
            Let&apos;s Work Together
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="mb-8 md:mb-10 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.85, delay: 0.06, ease: EASE_OUT_EXPO }}
            className="font-display text-ink leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            READY TO GO FROM
            <br />
            HERE TO EVERYWHERE?
          </motion.h2>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE_OUT_EXPO }}
          className="font-body text-ink/70 text-base md:text-lg max-w-xl leading-relaxed mb-10 md:mb-12"
        >
          Book a 30-minute strategy call. No pitch decks, no fluff — just a
          real conversation about your growth.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center gap-4 mb-10 md:mb-12"
        >
          {/* Primary — dark filled */}
          <Link
            href="/contact"
            className="group font-body font-bold text-xs uppercase tracking-widest text-lime bg-ink px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-lime"
          >
            Book a Strategy Call
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          {/* Secondary — ghost */}
          <a
            href="https://wa.me/918317015652?text=Hi%20NextGrow%2C%20let%27s%20talk."
            target="_blank"
            rel="noopener noreferrer"
            className="group font-body font-medium text-xs uppercase tracking-widest text-ink border border-ink/30 px-7 py-4 inline-flex items-center gap-2 transition-colors duration-200 hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-lime"
          >
            {/* WhatsApp icon */}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 transition-opacity duration-200"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </motion.div>

        {/* Contact info row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.55, delay: 0.38, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {/* Divider dot */}
          <a
            href="tel:+918317015652"
            className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-200 underline-offset-2 hover:underline inline-flex items-center gap-2"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 opacity-60"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.13h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            +91 83170 15652
          </a>

          <span aria-hidden="true" className="text-ink/20 text-xs">|</span>

          <a
            href="mailto:connect@nextgrow.in"
            className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-200 underline-offset-2 hover:underline inline-flex items-center gap-2"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 opacity-60"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
            connect@nextgrow.in
          </a>
        </motion.div>
      </div>

      {/* Bottom edge — thin ink line for visual grounding before footer */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-ink/10"
      />
    </section>
  );
}
