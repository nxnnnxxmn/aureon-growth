"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON"
      );
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mounted, mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="rounded-full border border-violet-400/60 -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isPointer ? 40 : 24,
            height: isPointer ? 40 : 24,
            opacity: isVisible ? 1 : 0,
            borderColor: isPointer
              ? "rgba(167,139,250,0.9)"
              : "rgba(139,92,246,0.6)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-violet-400 -translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: isVisible ? 1 : 0, scale: isPointer ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </>
  );
}
