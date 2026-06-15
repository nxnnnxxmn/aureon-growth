"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface RotatingTextProps {
  words: string[];
  interval?: number; // ms between word changes
  className?: string;
}

/**
 * Vertical morphing text — rotates through a list of words with
 * spring-physics-based slide + blur for premium feel.
 * Respects prefers-reduced-motion (falls back to crossfade).
 */
export default function RotatingText({
  words,
  interval = 2600,
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  // Width-stabilizing trick: render the longest word invisibly so layout doesn't jump
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      // The wrapper keeps natural inline-block flow; the absolute child handles motion
    >
      {/* Invisible placeholder reserves max width to prevent layout shift */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {longest}
      </span>

      <span className="absolute inset-0 flex items-center justify-start overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "60%", filter: "blur(8px)" }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: "0%", filter: "blur(0px)" }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "-60%", filter: "blur(8px)" }
            }
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block whitespace-nowrap gradient-text"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
