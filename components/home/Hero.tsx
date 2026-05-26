"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "@/lib/gsap";
import BackgroundPaths from "@/components/home/BackgroundPaths";

const HeroShader = dynamic(() => import("@/components/home/HeroShader"), {
  ssr: false,
});

const STATS = [
  { value: 20, suffix: "+", label: "Brands Served" },
  { value: 5, suffix: "+", label: "Years of Growth" },
  { value: 18, suffix: "+", label: "Months Avg. Retention" },
  { value: 8, suffix: "+", label: "Industries Served" },
];

const LINE1 = ["Grow", "Smarter."];
const LINE2 = ["Grow", "Faster."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shaderActive, setShaderActive] = useState(true);

  const handleShaderFallback = useCallback(() => setShaderActive(false), []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ctaX = useSpring(mx, { damping: 18, stiffness: 280, mass: 0.4 });
  const ctaY = useSpring(my, { damping: 18, stiffness: 280, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Entrance: eyebrow → word-by-word stagger with font-weight morph → sub → CTA → stats
  useEffect(() => {
    if (!mounted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = document.querySelectorAll<HTMLElement>(".hero-word");

    if (reduce) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      document
        .querySelectorAll<HTMLElement>(".hero-eyebrow,.hero-sub,.hero-cta,.hero-stat")
        .forEach((el) => {
          el.style.opacity = "1";
        });
      return;
    }

    gsap.fromTo(
      ".hero-eyebrow",
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.05 }
    );
    gsap.fromTo(
      words,
      { opacity: 0, y: "100%", fontWeight: 300 },
      {
        opacity: 1,
        y: "0%",
        fontWeight: 700,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      }
    );
    gsap.fromTo(
      ".hero-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6 }
    );
    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 1.0 }
    );
    gsap.fromTo(
      ".hero-stat",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 1.2 }
    );
  }, [mounted]);

  // Scroll handoff: headline shrinks + slides up as user scrolls past hero
  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
    tl.to(headlineRef.current, {
      y: -180,
      scale: 0.35,
      opacity: 0,
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [mounted]);

  const handleCtaMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < 100) {
      mx.set(dx * 0.3);
      my.set(dy * 0.3);
    }
  };
  const handleCtaLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: "max(100svh, 700px)" }}
    >
      {/* Background stack: ink → CSS aurora (fallback / first-paint) → WebGL shader → vignette */}
      <div className="absolute inset-0 -z-10 bg-ink" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <BackgroundPaths />
      </div>
      {shaderActive && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <HeroShader onFallback={handleShaderFallback} />
        </div>
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/85 pointer-events-none"
        aria-hidden="true"
      />

      {/* Headline anchored ~55% from top via flex-1 centering */}
      <div
        ref={headlineRef}
        className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 md:pt-32"
      >
        <p className="hero-eyebrow opacity-0 font-body text-lime text-[0.62rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.35em] mb-5">
          001 · Marketing Technology · Growth Solutions · Brand Development
        </p>

        {/* Line 1: mobile stacks Grow / Smarter. as two rows, desktop flows on one line */}
        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-x-[0.25em]">
            {LINE1.map((word, i) => (
              <span
                key={`l1-${i}`}
                className="hero-word inline-block font-display text-[clamp(52px,10.5vw,140px)] leading-[0.88] text-cream opacity-0"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Line 2: one row both viewports; indented 2ch on desktop */}
        <div className="overflow-hidden">
          <div className="flex flex-row flex-wrap gap-x-[0.25em] md:pl-[2ch]">
            {LINE2.map((word, i) => (
              <span
                key={`l2-${i}`}
                className="hero-word inline-block font-display text-[clamp(52px,10.5vw,140px)] leading-[0.88] text-lime opacity-0"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <p className="hero-sub opacity-0 font-body text-cream/65 text-[clamp(15px,1.5vw,22px)] max-w-[600px] mt-6 leading-relaxed">
          Performance-led marketing for brands that measure success in revenue, not vanity metrics.
        </p>

        <div className="hero-cta opacity-0 mt-8">
          <motion.div
            style={{ x: ctaX, y: ctaY }}
            onMouseMove={handleCtaMove}
            onMouseLeave={handleCtaLeave}
            className="group relative inline-block"
          >
            <span
              aria-hidden="true"
              className="cta-spin-border absolute -inset-[2px] opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 group-hover:animate-cta-spin"
            />
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              className="relative inline-flex items-center gap-3 bg-lime text-ink px-8 py-4 font-body font-bold uppercase tracking-[0.18em] text-[0.75rem] hover:bg-lime-dim transition-colors duration-200 select-none"
            >
              See how we grow brands <span className="text-base leading-none">→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Stats strip — 2×2 mobile, 4 cols desktop, 8vh from bottom */}
      <div className="px-6 md:px-12 lg:px-20 pb-[8vh]">
        <div className="border-t border-cream/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <StatCounter key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    const timer = setTimeout(() => {
      const start = performance.now();
      const duration = 1800;
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 1200 + index * 120);
    return () => clearTimeout(timer);
  }, [value, index]);

  return (
    <div className="hero-stat opacity-0">
      <p className="font-display text-[clamp(34px,4vw,58px)] leading-none text-cream tabular-nums">
        {count}
        <span className="text-lime">{suffix}</span>
      </p>
      <p className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-cream/40 mt-1">
        {label}
      </p>
    </div>
  );
}
