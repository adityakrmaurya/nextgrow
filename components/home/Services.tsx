"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface Card {
  id: string;
  title: string;
  sub: string[];
  outcome: string;
  icon: React.ReactNode;
}

const CARDS: Card[] = [
  {
    id: "01",
    title: "Growth Strategy & Brand Positioning",
    sub: ["Market research", "Positioning frameworks", "Go-to-market strategy", "Brand architecture", "Growth roadmaps", "Competitive analysis", "Customer profiling", "Value proposition"],
    outcome: "Clear strategic foundation aligned with revenue goals.",
    icon: <ChartIcon />,
  },
  {
    id: "02",
    title: "Performance Marketing & Lead Generation",
    sub: ["Meta Ads", "Google Ads", "Lead funnel architecture", "Conversion rate optimization", "Advanced targeting", "Retargeting", "Cost-per-lead optimization", "A/B testing"],
    outcome: "Predictable customer acquisition at controlled CAC.",
    icon: <TargetIcon />,
  },
  {
    id: "03",
    title: "Content, Media & Brand Communication",
    sub: ["Content strategy", "Video production", "Reels & shorts", "Storyboarding", "Storytelling frameworks", "Personal branding", "Photography", "Editorial planning"],
    outcome: "Brand recall, audience growth, and earned media equity.",
    icon: <MediaIcon />,
  },
  {
    id: "04",
    title: "Marketing Technology & Growth Systems",
    sub: ["CRM integration", "Analytics setup", "Funnel tracking", "Marketing automation", "Attribution modeling", "Pixel deployment", "Dashboard engineering"],
    outcome: "Visible, measurable, automatable marketing operations.",
    icon: <TechIcon />,
  },
  {
    id: "05",
    title: "Growth Consulting, Optimization & Scale",
    sub: ["Performance audits", "Optimization sprints", "Scale playbooks", "Channel expansion", "Quarterly reviews", "Margin discipline"],
    outcome: "Sustainable scale without losing efficiency.",
    icon: <ScaleIcon />,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modal, setModal] = useState<number | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const cards = gsap.utils.toArray<HTMLElement>(".service-card", track);
        if (cards.length === 0) return;

        // True scroll distance: full track width minus the viewport.
        // offsetLeft of the last card already includes all preceding cards + gaps.
        const getDistance = () => {
          const last = cards[cards.length - 1];
          return last.offsetLeft;
        };

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            end: () => "+=" + getDistance(),
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: { min: 0.15, max: 0.4 },
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (cards.length - 1));
              setActiveIdx(idx);
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* ── Desktop horizontal-scroll section ── */}
      <div
        id="services"
        ref={sectionRef}
        className="hidden md:block relative"
      >
        {/* Sticky heading */}
        <div className="relative z-10 px-12 lg:px-20 pt-16 pb-8">
          <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-2">What we do</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-cream max-w-2xl">
            Built as scalable revenue engines, not deliverables.
          </h2>

          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {CARDS.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-300 ${i === activeIdx ? "w-8 bg-lime" : "w-2 bg-cream/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Cards track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex will-change-transform">
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                className="service-card shrink-0 w-[80vw] h-[75vh] relative border border-cream/8 bg-ink/60 mr-6 last:mr-0 flex flex-col justify-between p-10 lg:p-14 cursor-pointer group"
                style={{ transition: i === activeIdx ? "transform 0.3s, opacity 0.3s" : "transform 0.4s, opacity 0.4s" }}
                onClick={() => setModal(i)}
              >
                {/* Watermark number */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-8 font-display text-[240px] leading-none select-none pointer-events-none"
                  style={{ opacity: 0.06, lineHeight: 1 }}
                >
                  {card.id}
                </span>

                <div>
                  <div className="w-10 h-10 text-lime mb-6">{card.icon}</div>
                  <h3 className="font-display text-[clamp(28px,3.5vw,48px)] leading-none text-cream mb-6 max-w-sm">
                    {card.title}
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {card.sub.map((s) => (
                      <li key={s} className="font-body text-[0.72rem] text-cream/45 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-lime shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-cream/10 pt-5">
                  <p className="font-body text-sm text-cream/60 italic">Outcome: {card.outcome}</p>
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-lime mt-3 group-hover:underline">
                    View details →
                  </p>
                </div>

                {/* Hover top border */}
                <div className="absolute top-0 left-0 h-[2px] bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile vertical stack ── */}
      <div id="services-mobile" className="md:hidden px-6 py-16 space-y-6">
        <div className="mb-8">
          <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-2">What we do</p>
          <h2 className="font-display text-[clamp(32px,8vw,52px)] leading-none text-cream">
            Built as scalable revenue engines, not deliverables.
          </h2>
        </div>
        {CARDS.map((card, i) => (
          <div key={card.id} className="border border-cream/10 p-6 cursor-pointer" onClick={() => setModal(i)}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 text-lime">{card.icon}</div>
              <span className="font-display text-4xl text-cream/10">{card.id}</span>
            </div>
            <h3 className="font-display text-2xl text-cream mb-3">{card.title}</h3>
            <p className="font-body text-sm text-cream/50 italic">{card.outcome}</p>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setModal(null)}
          >
            <motion.div
              layoutId={`card-${modal}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ink border border-cream/15 max-w-xl w-full p-8 md:p-12 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-cream/40 hover:text-cream text-sm uppercase tracking-widest"
                onClick={() => setModal(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="w-8 h-8 text-lime mb-4">{CARDS[modal].icon}</div>
              <h3 className="font-display text-[clamp(24px,3vw,36px)] text-cream mb-5">{CARDS[modal].title}</h3>
              <ul className="space-y-2 mb-6">
                {CARDS[modal].sub.map((s) => (
                  <li key={s} className="font-body text-sm text-cream/60 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm text-lime border-t border-cream/10 pt-4">Outcome: {CARDS[modal].outcome}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// SVG icons
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function MediaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}
function TechIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
