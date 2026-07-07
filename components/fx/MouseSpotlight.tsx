"use client";

import { useEffect, useRef } from "react";

/**
 * MouseSpotlight — halo plateado sutil que sigue al cursor sobre toda la
 * página (mix-blend-mode: screen). La luz "revela" las superficies al pasar.
 *
 * Guards: solo (hover:hover)+(pointer:fine), respeta prefers-reduced-motion.
 * rAF-throttled: una escritura de estilo por frame como máximo.
 */
export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = -9999, y = -9999;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.background = `radial-gradient(560px circle at ${x}px ${y}px, rgba(201,207,218,0.07), transparent 62%)`;
          raf = 0;
        });
      }
    };
    const onLeave = () => {
      el.style.background = "transparent";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
