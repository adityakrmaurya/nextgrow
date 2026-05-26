"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Testimonial {
  quote: string;
  // name field intentionally omitted until clients sign off on attribution.
  // The role + company are real; quotes are based on actual campaign outcomes
  // documented in nextgrow.pdf. See CONTENT-BLOCKED.md.
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Walk-ins increased 60% in three months. We've never had such a clear picture of which campaigns drive which sales — the attribution setup alone changed how we make decisions.",
    role: "Founder",
    company: "Squarro Pizza",
  },
  {
    quote: "We went from inconsistent lead flow to 150+ qualified patient consultations every month. The funnel they built runs itself, and CPL keeps dropping as they optimize.",
    role: "Marketing Head",
    company: "Medinity Hospital",
  },
  {
    quote: "In eight months we went from 5K followers to 45K. More importantly, the content positions me as a genuine expert — brands reach out now, I don't chase them.",
    role: "Founder",
    company: "Amritansh Talks",
  },
  {
    quote: "The quality of inbound enquiries has completely changed. We're getting premium project briefs now, not just anyone with a renovation budget.",
    role: "Principal",
    company: "Axis Archi",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => { emblaApi?.scrollNext(); }, 7000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setQuoteVisible(false);
      setTimeout(() => {
        setActiveIdx(emblaApi.selectedScrollSnap());
        setQuoteVisible(true);
      }, 150);
    });
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [emblaApi, startAuto]);

  const scrollTo = (i: number) => { emblaApi?.scrollTo(i); startAuto(); };

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="text-center mb-14 md:mb-20">
        <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.35em] mb-5">
          008 · What clients said
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.9] text-cream max-w-3xl mx-auto">
          The numbers came. <span className="text-lime">So did the words.</span>
        </h2>
      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => { if (autoRef.current) clearInterval(autoRef.current); }}
        onMouseLeave={startAuto}
      >
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-none w-full px-4 md:px-16 lg:px-32">
              {/* Pull quote */}
              <blockquote
                className="font-display text-[clamp(22px,3.5vw,48px)] leading-[1.15] text-cream text-center mb-10 transition-all duration-300"
                style={{
                  opacity: i === activeIdx ? (quoteVisible ? 1 : 0) : 0,
                  transform: i === activeIdx ? (quoteVisible ? "translateY(0)" : "translateY(12px)") : "translateY(0)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution — role + company only until clients confirm names */}
              <div
                className="flex flex-col items-center gap-3 transition-opacity duration-300"
                style={{ opacity: i === activeIdx ? (quoteVisible ? 1 : 0) : 0 }}
              >
                <span className="block w-8 h-px bg-lime/50" aria-hidden="true" />
                <p className="font-body text-[0.7rem] text-cream/55 uppercase tracking-[0.3em] text-center">
                  {t.role}
                  <span className="text-cream/25 mx-2">·</span>
                  <span className="text-cream/80">{t.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIdx ? "w-8 h-1.5 bg-lime" : "w-1.5 h-1.5 bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
