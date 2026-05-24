"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Types ──────────────────────────────────────────────── */
interface Service {
  id: string;
  title: string;
  description: string;
  offerings: string[];
  stat?: string;
  statLabel?: string;
}

/* ── Data ───────────────────────────────────────────────── */
const services: Service[] = [
  {
    id: "01",
    title: "Digital Marketing",
    description:
      "Performance-driven campaigns across Meta, Google, and social channels — built to convert, not just reach.",
    offerings: ["Meta Ads", "Google Ads", "Social Media", "SEO", "Influencer Marketing", "WhatsApp Marketing"],
    stat: "3.2x",
    statLabel: "ROAS achieved",
  },
  {
    id: "02",
    title: "Content & YouTube",
    description:
      "Channel strategy, scripting, Shorts, Reels, and full monetization — we grow your audience and your revenue.",
    offerings: ["Channel Strategy", "Video Scripting", "Shorts & Reels", "YouTube Monetization"],
    stat: "250%",
    statLabel: "Engagement growth",
  },
  {
    id: "03",
    title: "Branding",
    description:
      "From logo to language — brand identities that hold up from a billboard to a business card.",
    offerings: ["Brand Identity", "Visual Systems", "Logo Design", "Ad Creatives", "Positioning Strategy"],
  },
  {
    id: "04",
    title: "Offline & On-Ground",
    description:
      "300+ outdoor locations across India. Hoardings, activations, hyperlocal campaigns, and brand launches.",
    offerings: ["Hoardings & Billboards", "Brand Activations", "Hyperlocal Campaigns", "Print Production"],
    stat: "300+",
    statLabel: "Outdoor locations",
  },
  {
    id: "05",
    title: "Content Production",
    description:
      "Studio-quality video, photography, and creative production — assets that perform across every platform.",
    offerings: ["Video Production", "Product Photography", "Testimonial Videos", "Reels & Shorts"],
  },
  {
    id: "06",
    title: "Corporate Events",
    description:
      "End-to-end corporate event management — from product launches to team offsites across India.",
    offerings: ["Conference Planning", "Product Launches", "Team Offsites", "Venue Coordination"],
  },
];

/* ── Easing ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Service Row ────────────────────────────────────────── */
interface ServiceRowProps {
  service: Service;
  index: number;
  isInView: boolean;
}

function ServiceRow({ service, index, isInView }: ServiceRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE_OUT_EXPO }}
      className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr_auto] items-start border-b border-ink/10 py-7 md:py-9 gap-x-5 md:gap-x-10 cursor-default"
    >
      {/* Large number — faint at rest, lime on hover */}
      <span
        aria-hidden="true"
        className="font-display text-ink/20 group-hover:text-lime transition-colors duration-300 leading-none select-none pt-1"
        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
      >
        {service.id}
      </span>

      {/* Main content */}
      <div className="min-w-0">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 mb-3">
          <h3
            className="font-display text-ink leading-none tracking-wide group-hover:text-lime transition-colors duration-300"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
          >
            {service.title.toUpperCase()}
          </h3>
          {/* Inline stat — visible on desktop inside the title row */}
          {service.stat && (
            <span className="hidden md:inline font-display text-sm text-ink/30 tracking-wider whitespace-nowrap">
              {service.stat} <span className="font-body text-xs text-ink/25 normal-case">{service.statLabel}</span>
            </span>
          )}
        </div>
        <p className="font-body text-sm text-ink/55 leading-relaxed max-w-xl mb-4">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.offerings.map((o) => (
            <span
              key={o}
              className="font-body text-xs text-ink/45 border border-ink/12 px-2.5 py-1 transition-colors duration-200 group-hover:border-ink/20 group-hover:text-ink/60"
            >
              {o}
            </span>
          ))}
        </div>
        {/* Lime accent line — slides in on hover */}
        <div
          aria-hidden="true"
          className="mt-4 h-px w-0 bg-lime/60 transition-all duration-500 group-hover:w-12"
        />
      </div>

      {/* Arrow — desktop only */}
      <div className="hidden md:flex items-start pt-1">
        <span
          aria-hidden="true"
          className="text-ink/20 text-base transition-all duration-300 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
    </motion.div>
  );
}

/* ── Services Section ───────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-lime" />
              <span className="font-body text-ink text-xs uppercase tracking-[0.25em]">
                What We Do
              </span>
            </motion.div>

            <h2
              className="font-display text-ink leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              {["THE FULL STACK,", "UNDER ONE ROOF"].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={isInView ? { y: "0%" } : { y: "105%" }}
                    transition={{ duration: 0.85, delay: 0.08 + i * 0.13, ease: EASE_OUT_EXPO }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="font-body text-xs text-ink/40 uppercase tracking-[0.18em] md:text-right max-w-[18ch] leading-relaxed"
          >
            Six disciplines.
            <br />
            One integrated team.
          </motion.p>
        </div>

        {/* Top border above rows */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="h-px bg-ink/10 origin-left mb-0"
        />

        {/* Rows */}
        <div>
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-10 flex items-center justify-between flex-wrap gap-4"
        >
          <p className="font-body text-xs text-ink/35 uppercase tracking-[0.18em]">
            Every service. One team. No handoffs.
          </p>
          <Link
            href="/services"
            className="group font-body font-semibold text-sm text-ink border border-ink/20 px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-ink hover:text-lime hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            See all services
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
