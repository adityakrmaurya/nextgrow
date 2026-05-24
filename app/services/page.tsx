"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "01",
    title: "Digital Marketing",
    description:
      "Performance-driven campaigns across Meta, Google, and social channels — built to convert, not just reach. We run the full funnel from awareness to retargeting to conversion.",
    offerings: ["Meta Ads", "Google Ads", "Social Media Management", "SEO", "Influencer Marketing", "WhatsApp Marketing"],
    anchor: "digital-marketing",
  },
  {
    id: "02",
    title: "Content & YouTube",
    description:
      "Channel strategy, scripting, Shorts, Reels, and full monetization — we grow your audience and your revenue. Structured content calendars with reel-first distribution.",
    offerings: ["Channel Strategy", "Video Scripting", "Shorts & Reels", "YouTube Monetization", "Content Calendar"],
    anchor: "content-youtube",
  },
  {
    id: "03",
    title: "Branding",
    description:
      "From logo to language — brand identities that hold up from a billboard to a business card. Positioning strategy that makes your brand the obvious choice.",
    offerings: ["Brand Identity", "Visual Systems", "Logo Design", "Ad Creatives", "Positioning Strategy"],
    anchor: "branding",
  },
  {
    id: "04",
    title: "Offline & On-Ground",
    description:
      "300+ outdoor locations across India. Hoardings, activations, hyperlocal campaigns, and brand launches that create real-world presence and measurable foot traffic.",
    offerings: ["Hoardings & Billboards", "Brand Activations", "Hyperlocal Campaigns", "Print Production", "Event Branding"],
    anchor: "offline-marketing",
  },
  {
    id: "05",
    title: "Content Production",
    description:
      "Studio-quality video, photography, and creative production — assets that perform across every platform. From product shoots to testimonial videos.",
    offerings: ["Video Production", "Product Photography", "Testimonial Videos", "Reels & Shorts", "Explainer Videos"],
    anchor: "content-production",
  },
  {
    id: "06",
    title: "Corporate Events",
    description:
      "End-to-end corporate event management — from product launches to team offsites. We handle logistics, creative, and execution across India.",
    offerings: ["Conference Planning", "Product Launches", "Team Offsites", "Venue Coordination", "Event Marketing"],
    anchor: "corporate-events",
  },
];

interface ServiceBlockProps {
  service: typeof SERVICES[number];
}

function ServiceBlock({ service }: ServiceBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      id={service.anchor}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-cream/[0.08]"
    >
      {/* Left: number + title */}
      <div className="md:col-span-5">
        <span className="font-display text-xs text-lime/50 tracking-widest block mb-3">
          {service.id}
        </span>
        <h2
          className="font-display text-cream leading-[0.9] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {service.title.toUpperCase()}
        </h2>
      </div>

      {/* Right: description + offerings */}
      <div className="md:col-span-7 flex flex-col gap-5">
        <p className="font-body text-cream/60 text-sm md:text-base leading-relaxed">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.offerings.map((o) => (
            <span
              key={o}
              className="font-body text-xs text-cream/65 border border-cream/10 px-3 py-1.5"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-ink pt-28 md:pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-lime" />
            <span className="font-body text-lime text-xs uppercase tracking-[0.25em]">
              What We Do
            </span>
          </div>
          <h1
            className="font-display text-cream leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            THE FULL STACK,
            <br />
            UNDER ONE ROOF
          </h1>
          <p className="font-body text-cream/55 text-base md:text-lg max-w-xl leading-relaxed">
            Six specialised disciplines. One integrated team. No agency
            coordination overhead.
          </p>
        </motion.div>

        {/* Services list */}
        {SERVICES.map((service) => (
          <ServiceBlock key={service.id} service={service} />
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
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
            See Our Results
          </a>
        </motion.div>
      </div>
    </main>
  );
}
