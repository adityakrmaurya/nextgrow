"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springCfg = { damping: 20, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(x, springCfg);
  const ringY = useSpring(y, springCfg);

  useEffect(() => {
    setMounted(true);
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovered(!!el.closest('a, button, [role="button"], input, select, textarea, label'));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isPointerFine, x, y]);

  if (!mounted || !isPointerFine) return null;

  return (
    <>
      {/* Dot — exact position, no lag */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "#C4FF00",
        }}
      />
      {/* Ring — spring lag, expands on hover */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1.5px solid rgba(196,255,0,0.45)",
        }}
        animate={{
          width: hovered ? 50 : 32,
          height: hovered ? 50 : 32,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
