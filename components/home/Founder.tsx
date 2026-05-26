"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PARAGRAPHS = [
  "NextGrow started in Lucknow as a lean performance practice, built on one belief: marketing should be measured in revenue, not reach. We were frustrated watching brands pour budget into campaigns with no accountability, no attribution, and no clear path to growth.",
  "We believe marketing is a revenue function — not a creative department. Every rupee spent should have a traceable path to outcome. That thesis drives every engagement, every channel decision, every optimization cycle.",
  "Today, five years and 20+ brands later, we operate across eight industries from our base in Lucknow. Our next chapter: scaling the same discipline-led model to brands across India who demand more from their marketing partners.",
];

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  { name: "Team Member", role: "Growth Strategist", bio: "Details coming soon." },
  { name: "Team Member", role: "Performance Lead", bio: "Details coming soon." },
  { name: "Team Member", role: "Content Director", bio: "Details coming soon." },
  { name: "Team Member", role: "MarTech Engineer", bio: "Details coming soon." },
];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  // Parallax portrait + text reveal
  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const text = textRef.current;
    if (!section || !portrait || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTextVisible(true); return; }

    // Portrait parallax at 0.85×
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to(portrait, { y: "-15%", ease: "none" }, 0);
    tl.to(text, { y: "5%", ease: "none" }, 0);

    // Text paragraphs reveal on scroll
    const paragraphs = text.querySelectorAll<HTMLElement>(".founder-para");
    paragraphs.forEach((p, i) => {
      ScrollTrigger.create({
        trigger: p,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(p, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.05 });
        },
        once: true,
      });
    });

    // Section enter
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => setTextVisible(true),
      once: true,
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  // Signature draw
  useEffect(() => {
    const path = signatureRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          path.style.strokeDashoffset = "0";
        } else {
          gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" });
        }
        ob.disconnect();
      }
    }, { threshold: 0.5 });
    ob.observe(path);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 overflow-hidden">
      {/* Split screen */}
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Portrait — left 60% */}
        <div
          ref={portraitRef}
          className="md:w-[60%] relative bg-cream/5 overflow-hidden"
          style={{ minHeight: "60vw", maxHeight: "80vh" }}
        >
          {/* Placeholder portrait — will be replaced with actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#0a1a00] to-ink flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-lime/10 border border-lime/20 mx-auto mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C4FF00" strokeWidth="1" className="w-12 h-12">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p className="font-body text-cream/30 text-sm">Founder portrait</p>
            </div>
          </div>
          {/* Noise overlay */}
          <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
            <filter id="noise-f">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-f)" />
          </svg>
        </div>

        {/* Content — right 40% */}
        <div
          ref={textRef}
          className="md:w-[40%] px-8 md:px-12 lg:px-16 py-12 md:py-20 flex flex-col justify-center"
        >
          <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-6">Our story</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] text-cream mb-8">
            Founder &<br />Growth Strategist
          </h2>

          {PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className="founder-para font-body text-sm md:text-base text-cream/60 leading-relaxed mb-5"
              style={{ opacity: 0 }}
            >
              {para}
            </p>
          ))}

          {/* Signature */}
          <div className="mt-6 mb-2">
            <svg viewBox="0 0 200 60" fill="none" className="w-40 h-12" aria-label="Founder signature">
              <path
                ref={signatureRef}
                d="M10 40 C30 20, 50 50, 70 30 C90 10, 110 45, 130 35 C150 25, 170 40, 190 30"
                stroke="#C4FF00"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-cream/40 hover:text-lime transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </div>

      {/* Team grid */}
      <div className="px-6 md:px-12 lg:px-20 mt-16">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-cream/40 mb-8">The team</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="bg-cream/3 border border-cream/8 p-6 hover:border-lime/30 transition-colors duration-300"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-lime/10 border border-lime/20 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C4FF00" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p className="font-body font-semibold text-cream text-sm mb-0.5">{member.name}</p>
              <p className="font-body text-[0.65rem] uppercase tracking-wider text-lime mb-2">{member.role}</p>
              <p className="font-body text-xs text-cream/40">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
