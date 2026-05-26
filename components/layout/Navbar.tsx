"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "Work", href: "/#case-studies" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const WHATSAPP_URL =
  "https://wa.me/918317015652?text=Hi%20NextGrow%2C%20I%20want%20to%20discuss%20a%20project.";

export default function Navbar() {
  const [frosted, setFrosted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Magnetic CTA state
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ctaMx = useMotionValue(0);
  const ctaMy = useMotionValue(0);
  const ctaX = useSpring(ctaMx, { damping: 20, stiffness: 300, mass: 0.4 });
  const ctaY = useSpring(ctaMy, { damping: 20, stiffness: 300, mass: 0.4 });

  // GSAP mobile overlay timeline
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Frosted after 100vh
  useEffect(() => {
    const onScroll = () => setFrosted(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build GSAP timeline once overlay mounts
  useEffect(() => {
    if (!overlayRef.current) return;
    const links = overlayRef.current.querySelectorAll(".mobile-link");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    tlRef.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    tlRef.current
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.25 })
      .fromTo(
        links,
        prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReduced ? 0.01 : 0.5,
          stagger: prefersReduced ? 0 : 0.04,
        },
        "-=0.1"
      );

    return () => { tlRef.current?.kill(); };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      tlRef.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Magnetic CTA handlers
  const handleCtaMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 100) {
      ctaMx.set(dx * 0.3);
      ctaMy.set(dy * 0.3);
    }
  }, [ctaMx, ctaMy]);

  const handleCtaLeave = useCallback(() => {
    ctaMx.set(0);
    ctaMy.set(0);
  }, [ctaMx, ctaMy]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
          frosted
            ? "bg-ink/75 backdrop-blur-md border-b border-cream/8"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <ScrollProgress />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center h-[4.5rem] md:h-20">
          {/* Logo — left */}
          <Link
            href="/"
            className="font-display text-[1.65rem] tracking-[0.12em] leading-none text-cream hover:text-lime transition-colors duration-200 shrink-0"
          >
            NEXT<span className="text-lime">GROW</span>
          </Link>

          {/* Desktop nav — centered absolutely */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[0.7rem] font-body font-semibold uppercase tracking-[0.16em] text-cream/50 hover:text-cream transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right — magnetic CTA */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <motion.a
              ref={ctaRef}
              href="/#contact"
              style={{ x: ctaX, y: ctaY }}
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              className="inline-flex items-center gap-2 bg-lime text-ink px-5 py-2.5 text-[0.7rem] font-body font-bold uppercase tracking-[0.18em] hover:bg-lime-dim transition-colors duration-200 select-none"
            >
              Start a project
              <span className="text-base leading-none">→</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-cream flex items-center justify-center w-11 h-11 ml-auto"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-overlay"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="5" x2="19" y2="5" />
                <line x1="1" y1="10" x2="19" y2="10" />
                <line x1="1" y1="15" x2="19" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ visibility: "hidden", opacity: 0 }}
        className="fixed inset-0 z-40 bg-ink flex flex-col px-6 pt-28 pb-10"
        onClick={() => setMobileOpen(false)}
      >
        <nav
          className="flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="mobile-link font-display text-5xl tracking-wide text-cream hover:text-lime transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div
          className="mt-auto flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-link flex items-center gap-3 border border-cream/15 text-cream px-5 py-3.5 text-sm font-body font-semibold transition-colors"
          >
            <WhatsAppIcon />
            Chat on WhatsApp · +91 83170 15652
          </a>
          <a
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="mobile-link bg-lime text-ink px-5 py-3.5 text-sm font-body font-bold uppercase tracking-widest text-center transition-colors active:bg-lime-dim"
          >
            Start a project →
          </a>
        </div>
      </div>
    </>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 h-[2px] bg-lime origin-left"
      style={{ width: `${pct}%`, transition: "width 75ms linear" }}
    />
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-lime shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
