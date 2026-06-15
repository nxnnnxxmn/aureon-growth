"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareIntensity?: number;
  perspective?: number;
  disabled?: boolean;
  scaleOnHover?: number;
}

/**
 * Premium 3D tilt effect using pure Framer Motion (no external deps).
 * - Subtle rotation following the mouse
 * - Dynamic glare following the cursor
 * - Disabled on touch / coarse pointer devices via CSS
 */
export default function TiltCard({
  children,
  className,
  intensity = 7,
  glareIntensity = 0.15,
  perspective = 1100,
  disabled = false,
  scaleOnHover = 1.015,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0); // -0.5 .. 0.5
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
    springConfig
  );

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(600px circle at ${gx} ${gy}, rgba(167,139,250,${glareIntensity}), transparent 40%)`
  );

  const handleMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style: MotionStyle = disabled
    ? {}
    : {
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      whileHover={disabled ? undefined : { scale: scaleOnHover }}
      transition={{ scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className={cn("relative", className)}
    >
      {children}
      {!disabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
