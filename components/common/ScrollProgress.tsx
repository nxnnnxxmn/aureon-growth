"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar that fills as the user scrolls the page.
 * Lives inside the fixed navbar (bottom edge) so it stays in viewport.
 * Uses CSS transform only (no layout shift, no reflow).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left z-[60]"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(224,78,44,0) 0%, #E04E2C 30%, #A53B1F 70%, rgba(224,78,44,0) 100%)",
        boxShadow: "0 0 10px rgba(224, 78, 44, 0.4)",
      }}
    />
  );
}
