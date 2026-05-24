"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const CASE_STUDIES = [
  {
    client: "Squarro Pizza",
    category: "QSR · Offline & Digital Marketing",
    result: "3.2x",
    resultLabel: "ROAS Achieved",
    metrics: ["45% more store visits", "60% walk-in lift in 60 days", "Hyperlocal Meta campaigns (3km radius)"],
    description:
      "Hyperlocal Meta ads, offer-driven creatives, offline balloon activations, and free tasting campaigns — all driving measurable foot traffic within 60 days of campaign launch.",
    tags: ["Hoardings", "Social Media", "Hyperlocal", "Meta Ads"],
    industry: "QSR",
  },
  {
    client: "Medinity Hospital",
    category: "Healthcare · Digital Marketing",
    result: "150+",
    resultLabel: "Qualified Leads/Month",
    metrics: ["35% lead-to-consult rate", "40% CPL improvement", "6+ months consistent delivery"],
    description:
      "Multi-step lead funnels, trust-based creatives featuring doctor credentials, and A/B tested cost-per-lead optimization — delivered consistently over 6+ months.",
    tags: ["Meta Ads", "Google Ads", "SEO", "Lead Generation"],
    industry: "Healthcare",
  },
  {
    client: "Amritansh Talks",
    category: "Media · Content & YouTube",
    result: "5K → 45K",
    resultLabel: "Followers in 8 Months",
    metrics: ["250% engagement growth", "Reel-first distribution model", "Cross-platform amplification"],
    description:
      "Structured content calendar, reel-first distribution model, and cross-platform amplification that built an engaged thought leadership community from scratch in under a year.",
    tags: ["YouTube", "Instagram", "Content Strategy", "Community"],
    industry: "Media",
  },
  {
    client: "VPV Realty",
    category: "Real Estate · Digital Marketing",
    result: "80+",
    resultLabel: "Qualified Leads/Month",
    metrics: ["28% lead-to-site-visit improvement", "Meta lead campaigns with qualification forms", "Automated nurturing"],
    description:
      "Meta lead campaigns with qualification forms, automated nurturing, and coordinated sales follow-up — cutting through Lucknow's saturated real estate market.",
    tags: ["Meta Ads", "Landing Pages", "CRM", "Lead Nurturing"],
    industry: "Real Estate",
  },
  {
    client: "Axis Archi",
    category: "Architecture · Branding",
    result: "+180%",
    resultLabel: "Instagram Growth",
    metrics: ["40% higher average project value", "Premium positioning established", "Professional portfolio photography"],
    description:
      "Brand-focused social media, professional portfolio photography, and premium positioning that repositioned Axis Archi as a top-tier architecture and design firm.",
    tags: ["Branding", "Social Media", "Content", "Photography"],
    industry: "Architecture",
  },
];

interface CaseStudyProps {
  study: typeof CASE_STUDIES[number];
}

function CaseStudyCard({ study }: CaseStudyProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, delay: 0.05, ease: EASE_OUT_EXPO }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-cream/[0.08]"
    >
      {/* Left: result + client */}
      <div className="md:col-span-4">
        <span className="font-body text-lime/60 text-xs uppercase tracking-widest block mb-3">
          {study.category}
        </span>
        <div
          className="font-display text-lime leading-none mb-2"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          {study.result}
        </div>
        <p className="font-body text-cream/55 text-xs leading-snug mb-5">
          {study.resultLabel}
        </p>
        <h2 className="font-display text-2xl text-cream tracking-wide">
          {study.client}
        </h2>
      </div>

      {/* Right: description + metrics + tags */}
      <div className="md:col-span-8 flex flex-col gap-5">
        <p className="font-body text-cream/60 text-sm leading-relaxed">
          {study.description}
        </p>

        {/* Key metrics */}
        <ul className="space-y-2">
          {study.metrics.map((m) => (
            <li key={m} className="flex items-start gap-2 font-body text-xs text-cream/50">
              <span className="text-lime/60 shrink-0 mt-0.5">→</span>
              {m}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs text-cream/50 border border-cream/10 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function CaseStudiesPage() {
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
              Results That Speak
            </span>
          </div>
          <h1
            className="font-display text-cream leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            BRANDS WE&apos;VE
            <br />
            GROWN
          </h1>
          <p className="font-body text-cream/50 text-sm max-w-md leading-relaxed">
            Real numbers. Real clients. Every result is verified and documented
            from our actual campaign data.
          </p>
        </motion.div>

        {/* Case study list */}
        {CASE_STUDIES.map((study) => (
          <CaseStudyCard key={study.client} study={study} />
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
            Start Your Growth Story →
          </a>
        </motion.div>
      </div>
    </main>
  );
}
