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
  icon: "chart" | "play" | "star" | "map" | "camera" | "users";
}

/* ── Data ───────────────────────────────────────────────── */
const services: Service[] = [
  {
    id: "01",
    title: "Digital Marketing",
    description:
      "Performance-driven campaigns across Meta, Google, and social channels — built to convert, not just reach.",
    offerings: [
      "Meta Ads",
      "Google Ads",
      "Social Media",
      "SEO",
      "Influencer Marketing",
      "WhatsApp Marketing",
    ],
    icon: "chart",
  },
  {
    id: "02",
    title: "Content & YouTube",
    description:
      "Channel strategy, scripting, Shorts, Reels, and full monetization — we grow your audience and your revenue.",
    offerings: [
      "Channel Strategy",
      "Video Scripting",
      "Shorts & Reels",
      "YouTube Monetization",
    ],
    icon: "play",
  },
  {
    id: "03",
    title: "Branding",
    description:
      "From logo to language — brand identities that hold up from a billboard to a business card.",
    offerings: [
      "Brand Identity",
      "Visual Systems",
      "Logo Design",
      "Ad Creatives",
      "Positioning Strategy",
    ],
    icon: "star",
  },
  {
    id: "04",
    title: "Offline & On-Ground",
    description:
      "300+ outdoor locations across India. Hoardings, activations, hyperlocal campaigns, and brand launches.",
    offerings: [
      "Hoardings & Billboards",
      "Brand Activations",
      "Hyperlocal Campaigns",
      "Print Production",
    ],
    icon: "map",
  },
  {
    id: "05",
    title: "Content Production",
    description:
      "Studio-quality video, photography, and creative production — assets that perform across every platform.",
    offerings: [
      "Video Production",
      "Product Photography",
      "Testimonial Videos",
      "Reels & Shorts",
    ],
    icon: "camera",
  },
  {
    id: "06",
    title: "Corporate Events",
    description:
      "End-to-end corporate event management — from product launches to team offsites across India.",
    offerings: [
      "Conference Planning",
      "Product Launches",
      "Team Offsites",
      "Venue Coordination",
    ],
    icon: "users",
  },
];

/* ── Inline SVG Icons ───────────────────────────────────── */
function IconChart() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="16" width="5" height="10" fill="#C4FF00" fillOpacity="0.9" />
      <rect x="9.5" y="10" width="5" height="16" fill="#C4FF00" fillOpacity="0.7" />
      <rect x="17" y="4" width="5" height="22" fill="#C4FF00" fillOpacity="0.5" />
      <path d="M2 22 L9 15 L16 9 L24 3" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="12" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="11,9 21,14 11,19" fill="#C4FF00" fillOpacity="0.9" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="14,2 17.5,10.5 26,11.5 20,17.5 21.5,26 14,22 6.5,26 8,17.5 2,11.5 10.5,10.5"
        stroke="#C4FF00"
        strokeWidth="1.5"
        strokeOpacity="0.9"
        fill="#C4FF00"
        fillOpacity="0.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMap() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 3C10.13 3 7 6.13 7 10C7 15.25 14 25 14 25C14 25 21 15.25 21 10C21 6.13 17.87 3 14 3Z"
        stroke="#C4FF00"
        strokeWidth="1.5"
        strokeOpacity="0.9"
        fill="#C4FF00"
        fillOpacity="0.12"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="10" r="2.5" fill="#C4FF00" fillOpacity="0.8" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="8"
        width="24"
        height="16"
        rx="2"
        stroke="#C4FF00"
        strokeWidth="1.5"
        strokeOpacity="0.9"
        fill="#C4FF00"
        fillOpacity="0.08"
      />
      <path d="M9 8 L11 4 L17 4 L19 8" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.6" strokeLinejoin="round" />
      <circle cx="14" cy="16" r="4" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="14" cy="16" r="1.5" fill="#C4FF00" fillOpacity="0.7" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="9" r="4" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.9" fill="#C4FF00" fillOpacity="0.1" />
      <path d="M2 24C2 19.58 5.58 16 10 16" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.9" strokeLinecap="round" />
      <circle cx="20" cy="11" r="3" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.6" fill="#C4FF00" fillOpacity="0.07" />
      <path d="M14.5 24C14.5 20.41 16.91 17.5 20 17.5C23.09 17.5 25.5 20.41 25.5 24" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

const iconMap: Record<Service["icon"], React.ReactNode> = {
  chart: <IconChart />,
  play: <IconPlay />,
  star: <IconStar />,
  map: <IconMap />,
  camera: <IconCamera />,
  users: <IconUsers />,
};

/* ── Easing ─────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Service Card ───────────────────────────────────────── */
interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_OUT_EXPO,
      }}
      className="group relative flex flex-col gap-5 bg-ink border border-cream/[0.08] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 active:scale-[0.98] focus-within:border-lime/30"
      style={{
        /* subtle inner shadow for depth */
        boxShadow: "inset 0 1px 0 rgba(245,240,232,0.04)",
      }}
    >
      {/* Top row: number + icon */}
      <div className="flex items-start justify-between">
        <span className="font-display text-sm text-lime/60 tracking-wider">
          {service.id}
        </span>
        <div className="transition-transform duration-300 group-hover:scale-110">
          {iconMap[service.icon]}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl text-cream leading-tight tracking-wide">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-cream/60 leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Offerings */}
      <div className="flex flex-wrap gap-2 pt-1">
        {service.offerings.map((offering) => (
          <span
            key={offering}
            className="bg-cream/5 text-xs text-cream/45 px-2.5 py-1 font-body rounded-sm"
          >
            {offering}
          </span>
        ))}
      </div>

      {/* Hover accent line at bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-lime transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
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

      {/* Ghost background number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0 overflow-hidden select-none"
      >
        <span
          className="font-display block text-ink"
          style={{
            fontSize: "clamp(10rem, 20vw, 22rem)",
            opacity: 0.04,
            letterSpacing: "0.02em",
            transform: "translate(15%, -25%)",
            lineHeight: 1,
          }}
        >
          06
        </span>
      </div>

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
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="font-display text-ink leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
          >
            SIX WAYS WE GROW
            <br />
            YOUR BRAND
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => (
            <ServiceCard
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
          className="mt-12 flex items-center justify-center"
        >
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
