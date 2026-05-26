"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Walk-ins increased 60% in three months. We've never had such a clear picture of which campaigns drive which sales — the attribution setup alone changed how we make decisions.",
    name: "Client Name",
    title: "Founder",
    company: "Squarro Pizza",
  },
  {
    quote: "We went from inconsistent lead flow to 150+ qualified patient consultations every month. The funnel they built runs itself, and CPL keeps dropping as they optimize.",
    name: "Client Name",
    title: "Marketing Head",
    company: "Medinity Hospital",
  },
  {
    quote: "In eight months we went from 5K followers to 45K. More importantly, the content positions me as a genuine expert — brands reach out now, I don't chase them.",
    name: "Client Name",
    title: "Founder",
    company: "Amritansh Talks",
  },
  {
    quote: "The quality of inbound enquiries has completely changed. We're getting premium project briefs now, not just anyone with a renovation budget.",
    name: "Client Name",
    title: "Principal",
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
    <section className="py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-cream/40 mb-10 text-center">What clients say</p>

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

              {/* Attribution */}
              <div
                className="flex items-center justify-center gap-4 transition-opacity duration-300"
                style={{ opacity: i === activeIdx ? (quoteVisible ? 1 : 0) : 0 }}
              >
                <div className="w-10 h-10 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C4FF00" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-body font-semibold text-cream text-sm">{t.name}</p>
                  <p className="font-body text-[0.65rem] text-cream/40 uppercase tracking-wider">{t.title} · {t.company}</p>
                </div>
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
