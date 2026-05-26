"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Step {
  id: string;
  title: string;
  duration: string;
  activities: string[];
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    id: "01",
    title: "Business & Market Assessment",
    duration: "Weeks 1–2",
    activities: ["Market research", "Competitor analysis", "Customer profiling", "KPI definition", "Gap analysis"],
    deliverables: ["Diagnostic report", "KPI framework", "Audience personas"],
  },
  {
    id: "02",
    title: "Strategic Framework & Positioning",
    duration: "Weeks 3–4",
    activities: ["Brand positioning framework", "Channel strategy", "Content direction", "Customer journey mapping", "Messaging house"],
    deliverables: ["Strategy document", "Channel plan", "Creative brief"],
  },
  {
    id: "03",
    title: "Execution & Deployment",
    duration: "Weeks 5–8",
    activities: ["Campaign builds", "Content production", "MarTech setup", "Pixel deployment", "Creative production"],
    deliverables: ["Live campaigns", "Measurement infrastructure", "Content library"],
  },
  {
    id: "04",
    title: "Measurement & Optimization",
    duration: "Ongoing from Month 2",
    activities: ["Weekly performance reviews", "A/B tests", "Creative refresh", "Budget reallocation", "Funnel optimization"],
    deliverables: ["Performance reports", "Optimization log", "Iteration roadmap"],
  },
  {
    id: "05",
    title: "Scale & Expansion",
    duration: "Month 4+",
    activities: ["Budget scaling", "Geographic expansion", "New channel rollout", "Automation deepening", "Margin control"],
    deliverables: ["Scale roadmap", "Expansion playbook", "New-market plan"],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const prevStep = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth < 768 || prefersReduced) return;

    const panels = section.querySelectorAll<HTMLElement>(".process-step-panel");

    // Pin section for 5× viewport
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${STEPS.length * 100}%`,
      pin: true,
      onUpdate: (self) => {
        const raw = self.progress * STEPS.length;
        const idx = Math.min(Math.floor(raw), STEPS.length - 1);
        // Update progress line
        if (progress) progress.style.height = `${self.progress * 100}%`;

        if (idx !== prevStep.current) {
          // Animate out
          setContentVisible(false);
          setTimeout(() => {
            setActiveStep(idx);
            prevStep.current = idx;
            setContentVisible(true);
          }, 120);
        }
      },
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  const step = STEPS[activeStep];

  return (
    <>
      {/* ── Desktop sticky timeline ── */}
      <div
        id="process"
        ref={sectionRef}
        className="hidden md:flex relative min-h-screen bg-ink overflow-hidden"
      >
        {/* Far-left progress line */}
        <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-[2px] bg-cream/10 z-10">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-lime transition-none"
            style={{ height: "0%" }}
          />
          {/* Step dots */}
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                i <= activeStep ? "bg-lime border-lime" : "bg-ink border-cream/20"
              }`}
              style={{ top: `${(i / (STEPS.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>

        {/* Left column — step number + title (40%) */}
        <div className="w-[40%] pl-24 lg:pl-32 flex flex-col justify-center pr-8">
          <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-4">How we work</p>
          <div
            className="transition-opacity duration-120"
            style={{ opacity: contentVisible ? 1 : 0 }}
          >
            <span
              aria-hidden="true"
              className="block font-display text-[clamp(80px,12vw,160px)] leading-none text-cream/6 mb-2 select-none"
            >
              {step.id}
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,52px)] leading-[1.05] text-cream">
              {step.title}
            </h2>
            <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.2em] mt-3">{step.duration}</p>
          </div>
        </div>

        {/* Right column — content (60%) */}
        <div
          className="w-[60%] flex flex-col justify-center px-10 lg:px-16 border-l border-cream/8"
          style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 120ms ease" }}
        >
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-cream/40 mb-4">Key activities</p>
            <ul className="space-y-2 mb-8">
              {step.activities.map((a) => (
                <li key={a} className="flex items-center gap-3 font-body text-sm text-cream/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                  {a}
                </li>
              ))}
            </ul>

            <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-cream/40 mb-4">Deliverables</p>
            <ul className="flex flex-wrap gap-2">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="font-body text-[0.7rem] border border-lime/30 text-lime px-3 py-1 uppercase tracking-wider"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Step progress */}
          <div className="flex gap-1.5 mt-10">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`block h-0.5 rounded-full transition-all duration-300 ${i === activeStep ? "w-10 bg-lime" : "w-2 bg-cream/15"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile vertical stack ── */}
      <div id="process-mobile" className="md:hidden px-6 py-16">
        <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.3em] mb-4">How we work</p>
        <h2 className="font-display text-[clamp(32px,8vw,52px)] leading-none text-cream mb-12">
          A repeatable playbook for predictable growth.
        </h2>

        {/* Vertical step cards */}
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex gap-6 mb-10 last:mb-0">
            {/* Timeline */}
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full bg-lime shrink-0" />
              {i < STEPS.length - 1 && <div className="w-[1px] bg-lime/30 flex-1 mt-2" />}
            </div>
            <div className="flex-1 pb-2">
              <span className="font-display text-5xl text-cream/10 block leading-none mb-2">{s.id}</span>
              <h3 className="font-display text-2xl text-cream mb-1">{s.title}</h3>
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-lime mb-4">{s.duration}</p>
              <ul className="space-y-1.5">
                {s.activities.map((a) => (
                  <li key={a} className="font-body text-sm text-cream/55 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-lime/60 shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
