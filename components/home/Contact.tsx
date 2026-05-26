"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\+?[\d\s\-]{10,}$/, "Valid phone required"),
  company: z.string().min(2, "At least 2 characters"),
  industry: z.enum(["QSR", "Healthcare", "RealEstate", "Retail", "FMCG", "B2B", "Media", "Hospitality", "Other"]),
  budget: z.enum(["<50K", "50K-2L", "2L-5L", "5L+"]),
  services: z.array(z.string()).min(1, "Select at least one"),
  message: z.string().optional(),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS = ["Strategy", "Performance", "Content", "MarTech", "Scale"];

const STEPS = [
  { label: "Initial Consultation", desc: "Discovery call to understand your business." },
  { label: "Business Assessment", desc: "Analysis of current marketing and growth objectives." },
  { label: "Strategic Proposal", desc: "Customized strategy and engagement proposal." },
  { label: "Execution Planning", desc: "Detailed plans with clear timelines and milestones." },
  { label: "Launch & Optimize", desc: "Execution with continuous monitoring and reporting." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagramStep, setDiagramStep] = useState(-1);

  const { register, handleSubmit, formState: { errors, dirtyFields }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const watchedServices = watch("services");

  // Diagram draws in on scroll
  useEffect(() => {
    const el = diagramRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        STEPS.forEach((_, i) => {
          setTimeout(() => setDiagramStep(i), i * 280);
        });
        ob.disconnect();
      }
    }, { threshold: 0.3 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // Gamification: form progress fills diagram dots
  const filledFields = Object.keys(dirtyFields).length;
  const formProgress = Math.min(filledFields / 7, 1);

  const onSubmit = async (data: FormData) => {
    if (data.website) return; // honeypot
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-20">
      <div className="mb-12">
        <p className="font-body text-lime text-[0.65rem] uppercase tracking-[0.35em] mb-3">009 · Ready to grow?</p>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-none text-cream">
          Tell us about your business.
        </h2>
        <p className="font-body text-cream/50 text-sm mt-3">We respond within 24 hours.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* ── Form ── */}
        <div className="md:w-1/2">
          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input {...register("website")} type="text" tabIndex={-1} className="hidden" aria-hidden="true" />

              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} placeholder="Aditya Sharma" className={inputCls(!!errors.name)} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="you@company.com" className={inputCls(!!errors.email)} />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register("phone")} type="tel" placeholder="+91 98765 43210" className={inputCls(!!errors.phone)} />
                </Field>
              </div>

              <Field label="Company name" error={errors.company?.message}>
                <input {...register("company")} placeholder="Your Brand" className={inputCls(!!errors.company)} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Industry" error={errors.industry?.message}>
                  <select {...register("industry")} className={inputCls(!!errors.industry)}>
                    <option value="">Select…</option>
                    {["QSR", "Healthcare", "RealEstate", "Retail", "FMCG", "B2B", "Media", "Hospitality", "Other"].map((v) => (
                      <option key={v} value={v}>{v.replace("RealEstate", "Real Estate")}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Monthly budget" error={errors.budget?.message}>
                  <select {...register("budget")} className={inputCls(!!errors.budget)}>
                    <option value="">Select…</option>
                    <option value="<50K">Under ₹50K</option>
                    <option value="50K-2L">₹50K – ₹2L</option>
                    <option value="2L-5L">₹2L – ₹5L</option>
                    <option value="5L+">₹5L+</option>
                  </select>
                </Field>
              </div>

              <Field label="Looking for…" error={errors.services?.message}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SERVICE_OPTIONS.map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input {...register("services")} type="checkbox" value={opt} className="sr-only" />
                      <span
                        className={`inline-block px-4 py-2 border text-[0.7rem] uppercase tracking-widest font-body font-semibold transition-colors duration-200 ${
                          watchedServices?.includes(opt)
                            ? "border-lime bg-lime text-ink"
                            : "border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream"
                        }`}
                      >
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Message (optional)">
                <textarea {...register("message")} rows={3} placeholder="Tell us about your goals…" className={`${inputCls(false)} resize-none`} />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-lime text-ink py-4 font-body font-bold uppercase tracking-[0.18em] text-sm hover:bg-lime-dim transition-colors duration-200 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send →"}
              </button>

              <p className="font-body text-[0.6rem] text-cream/30 text-center">
                Or reach us on{" "}
                <a href="https://wa.me/918317015652" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
                  WhatsApp
                </a>
              </p>
            </form>
          )}
        </div>

        {/* ── Onboarding diagram ── */}
        <div ref={diagramRef} className="md:w-1/2 flex flex-col justify-center">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-cream/40 mb-8">Getting started with NextGrow</p>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div
              className="absolute left-[13px] top-0 w-[1.5px] bg-lime transition-all duration-[1200ms] ease-out"
              style={{ height: diagramStep >= 0 ? `${((diagramStep + 1) / STEPS.length) * 100}%` : "0%" }}
            />
            {STEPS.map((step, i) => {
              const active = i <= diagramStep;
              const formActive = i <= Math.round(formProgress * (STEPS.length - 1));
              return (
                <div
                  key={i}
                  className="relative flex gap-5 mb-8 last:mb-0 transition-all duration-300"
                  style={{ opacity: active ? 1 : 0.25, transform: active ? "translateX(0)" : "translateX(-8px)" }}
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-0 w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{
                      borderColor: active ? "#C4FF00" : "#333",
                      background: formActive ? "#C4FF00" : "transparent",
                    }}
                  >
                    <span className="font-body text-[0.55rem] font-bold" style={{ color: formActive ? "#0a0a0a" : "#C4FF00" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg text-cream leading-none mb-1">{step.label}</p>
                    <p className="font-body text-sm text-cream/45">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alternate contact strip */}
      <div className="flex gap-4 mt-12 flex-wrap">
        {[
          { label: "Phone", href: "tel:+918317015652", icon: "📞" },
          { label: "Email", href: "mailto:connect@nextgrow.in", icon: "✉" },
          { label: "WhatsApp", href: "https://wa.me/918317015652", icon: "💬" },
          { label: "Instagram", href: "https://instagram.com/nextgrow", icon: "📷" },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 border border-cream/10 px-4 py-2.5 font-body text-[0.7rem] uppercase tracking-widest text-cream/50 hover:text-cream hover:border-cream/30 transition-colors duration-200"
          >
            <span>{icon}</span> {label}
          </a>
        ))}
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-body text-[0.65rem] uppercase tracking-[0.15em] text-cream/50 mb-1.5">{label}</label>
      {children}
      {error && <p className="font-body text-[0.65rem] text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full bg-transparent border ${hasError ? "border-red-400/60" : "border-cream/15 focus:border-lime"} text-cream font-body text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-cream/25`;
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg viewBox="0 0 60 60" fill="none" className="w-16 h-16 mb-6">
        <circle cx="30" cy="30" r="28" stroke="#C4FF00" strokeWidth="1.5" />
        <path d="M18 30l8 8 16-16" stroke="#C4FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 50, strokeDashoffset: 50, animation: "dash 0.8s ease forwards" }}
        />
      </svg>
      <p className="font-display text-3xl text-cream mb-3">Message sent.</p>
      <p className="font-body text-cream/50 text-sm max-w-xs">We&apos;ll be in touch within 24 hours. In the meantime, explore our case studies.</p>
      <a href="/#case-studies" className="mt-6 font-body text-[0.7rem] uppercase tracking-widest text-lime hover:underline">
        View case studies →
      </a>
    </div>
  );
}
