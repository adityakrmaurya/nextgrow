"use client";

import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const GETTING_STARTED = [
  { id: "01", title: "Initial Consultation", desc: "We learn your business, goals, and current marketing state." },
  { id: "02", title: "Business Assessment", desc: "Deep analysis of your audience, competition, and growth gaps." },
  { id: "03", title: "Strategic Proposal", desc: "A tailored roadmap with channels, timelines, and expected outcomes." },
  { id: "04", title: "Execution Planning", desc: "Budget allocation, team briefing, and KPI agreement." },
  { id: "05", title: "Launch & Optimise", desc: "Campaign goes live. We monitor, report, and improve continuously." },
];

export default function ContactPage() {
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
              Let&apos;s Work Together
            </span>
          </div>
          <h1
            className="font-display text-cream leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            GET IN TOUCH
          </h1>
          <p className="font-body text-cream/55 text-base md:text-lg max-w-xl leading-relaxed">
            Book a 30-minute strategy call. No pitch decks, no fluff — just a real
            conversation about your growth.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <div className="space-y-8 mb-12">
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime mb-3">
                  Phone & WhatsApp
                </p>
                <a
                  href="tel:+918317015652"
                  className="font-display text-2xl text-cream hover:text-lime transition-colors"
                >
                  +91 83170 15652
                </a>
              </div>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime mb-3">
                  Email
                </p>
                <a
                  href="mailto:connect@nextgrow.in"
                  className="font-display text-2xl text-cream hover:text-lime transition-colors"
                >
                  connect@nextgrow.in
                </a>
              </div>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime mb-3">
                  Office
                </p>
                <a
                  href="https://maps.google.com/?q=Skyline+Plaza+Sushant+Golf+City+Lucknow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-cream/65 text-sm leading-relaxed hover:text-cream transition-colors block"
                >
                  801 Skyline Plaza, Sushant Golf City<br />
                  Lucknow 226030, India ↗
                </a>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/918317015652?text=Hi%20NextGrow%2C%20I%27d%20like%20to%20book%20a%20strategy%20call."
                target="_blank"
                rel="noopener noreferrer"
                className="group font-body font-bold text-xs uppercase tracking-widest text-ink bg-lime px-7 py-4 inline-flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-lime/90"
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="mailto:connect@nextgrow.in"
                className="font-body font-medium text-xs uppercase tracking-widest text-cream border border-cream/20 px-7 py-4 inline-flex items-center justify-center gap-2 transition-colors duration-200 hover:border-lime hover:text-lime"
              >
                Send an Email
              </a>
            </div>
          </motion.div>

          {/* Getting Started process */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE_OUT_EXPO }}
          >
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime mb-8">
              Getting started is simple
            </p>
            <ol className="space-y-0">
              {GETTING_STARTED.map((step, i) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.07, ease: EASE_OUT_EXPO }}
                  className="flex gap-5 py-5 border-b border-cream/[0.08]"
                >
                  <span className="font-display text-xs text-lime/40 tracking-widest shrink-0 mt-0.5 w-6">
                    {step.id}
                  </span>
                  <div>
                    <p className="font-display text-xl text-cream leading-tight mb-1 tracking-wide">
                      {step.title}
                    </p>
                    <p className="font-body text-xs text-cream/45 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
