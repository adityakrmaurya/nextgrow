"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const QUICK_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Careers", href: "/careers" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/nextgrow", icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com/nextgrow", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/@nextgrow", icon: YouTubeIcon },
  { label: "Twitter / X", href: "https://x.com/nextgrow", icon: XIcon },
];

const WORDMARK = "NEXTGROW".split("");

export default function Footer() {
  const year = new Date().getFullYear();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [letterVisible, setLetterVisible] = useState<boolean[]>(Array(WORDMARK.length).fill(false));

  // Wordmark mask reveal on scroll
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLetterVisible(Array(WORDMARK.length).fill(true));
      return;
    }
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WORDMARK.forEach((_, i) => {
          setTimeout(() => {
            setLetterVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
          }, i * 90);
        });
        ob.disconnect();
      }
    }, { threshold: 0.3 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <footer className="bg-ink border-t border-cream/8 overflow-hidden">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1 — Brand */}
        <div>
          <Link href="/" className="font-display text-2xl tracking-[0.12em] text-cream hover:text-lime transition-colors">
            NEXT<span className="text-lime">GROW</span>
          </Link>
          <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-cream/40 mt-2 mb-4">
            Grow Smarter. Grow Faster.
          </p>
          <p className="font-body text-sm text-cream/50 leading-relaxed max-w-xs mb-6">
            Marketing Technology & Media company delivering strategy, campaigns, and execution for brands that measure success in revenue.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center text-cream/40 hover:text-lime hover:-translate-y-1 transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-cream/30 mb-5">Navigate</p>
          <ul className="space-y-3">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-body text-sm text-cream/50 hover:text-cream transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-cream/30 mb-5">Contact</p>
          <address className="not-italic space-y-3">
            <a
              href="https://maps.google.com/?q=Skyline+Plaza+Sushant+Golf+City+Lucknow"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-body text-sm text-cream/50 hover:text-cream transition-colors leading-relaxed"
            >
              Flat No. 801, Skyline Plaza 1,<br />
              Sushant Golf City, Lucknow,<br />
              Uttar Pradesh — 226030
            </a>
            <a href="tel:+918317015652" className="block font-body text-sm text-cream/50 hover:text-lime transition-colors">
              +91 83170 15652
            </a>
            <a href="mailto:connect@nextgrow.in" className="block font-body text-sm text-cream/50 hover:text-lime transition-colors">
              connect@nextgrow.in
            </a>
          </address>
        </div>
      </div>

      {/* ── Wordmark flourish ── */}
      <div ref={wordmarkRef} className="overflow-hidden" aria-hidden="true">
        <div className="flex">
          {WORDMARK.map((char, i) => (
            <span
              key={i}
              className="font-display text-[22vw] leading-none select-none"
              style={{
                WebkitTextStroke: "1px rgba(196, 255, 0, 0.25)",
                color: "transparent",
                opacity: letterVisible[i] ? 1 : 0,
                transform: letterVisible[i] ? "translateY(0)" : "translateY(100%)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${i * 40}ms`,
                display: "inline-block",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-cream/5 px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-body text-[0.6rem] text-cream/25">© {year} NextGrow. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {["Privacy Policy", "Terms of Service", "Sitemap", "Refund Policy"].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase().replace(/ /g, "-")}`}
              className="font-body text-[0.6rem] text-cream/25 hover:text-cream/50 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
