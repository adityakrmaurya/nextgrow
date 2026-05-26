"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const SIZE = 540;
    let tx = -SIZE;
    let ty = -SIZE;
    let cx = tx;
    let cy = ty;
    let armed = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!armed) {
        cx = tx;
        cy = ty;
        el.style.opacity = "1";
        armed = true;
      }
    };

    const loop = () => {
      cx += (tx - cx) * 0.28;
      cy += (ty - cy) * 0.28;
      el.style.transform = `translate3d(${cx - SIZE / 2}px, ${cy - SIZE / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [active]);

  if (!mounted || !active) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-cursor-glow=""
      className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 transition-opacity duration-300 will-change-transform"
      style={{
        width: 540,
        height: 540,
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle, rgba(196,255,0,0.14) 0%, rgba(196,255,0,0.05) 32%, transparent 62%)",
      }}
    />
  );
}
