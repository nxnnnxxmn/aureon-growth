"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: CSSProperties;
  /** Strength of pull. Higher = stronger magnetism. Default 0.35 (subtle premium). */
  strength?: number;
  /** Inner content moves a bit more than the wrapper for a parallax feel. */
  innerStrength?: number;
  /** Distance in px from button center where magnetism activates. Default 120. */
  radius?: number;
  /** Render as <a> when href is given, else <button>. */
  as?: "a" | "button";
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
} & Omit<HTMLMotionProps<"a">, "ref" | "style" | "children" | "onClick">;

/**
 * Magnetic button — follows the cursor when within `radius` px.
 * Used by Linear, Vercel, Stripe-tier sites. Pure transform-based (no layout shift).
 *
 * - Respects prefers-reduced-motion (becomes a normal button).
 * - Spring physics for natural release.
 * - Inner span moves slightly more than the wrapper for a parallax depth cue.
 */
export default function MagneticButton({
  children,
  href,
  className,
  style,
  strength = 0.35,
  innerStrength = 0.55,
  radius = 120,
  as,
  onClick,
  target,
  rel,
  ariaLabel,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Wrapper translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Inner content translation (more pronounced)
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  const isx = useSpring(innerX, springConfig);
  const isy = useSpring(innerY, springConfig);

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > radius) {
      x.set(0);
      y.set(0);
      innerX.set(0);
      innerY.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
    innerX.set(dx * innerStrength);
    innerY.set(dy * innerStrength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  const Tag = (as ?? (href ? "a" : "button")) as "a" | "button";

  // Common motion props
  const motionProps = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    style: { x: sx, y: sy, ...style },
    className: cn(
      "inline-flex items-center justify-center relative will-change-transform",
      className
    ),
    "aria-label": ariaLabel,
  };

  // Wrap children with an inner motion span that moves more for parallax depth
  const innerNode = (
    <motion.span
      style={{ x: isx, y: isy }}
      className="inline-flex items-center gap-3 will-change-transform"
    >
      {children}
    </motion.span>
  );

  if (Tag === "a") {
    return (
      <motion.a
        {...(motionProps as HTMLMotionProps<"a">)}
        href={href}
        target={target}
        rel={rel}
        {...rest}
      >
        {innerNode}
      </motion.a>
    );
  }
  return (
    <motion.button
      {...(motionProps as HTMLMotionProps<"button">)}
      type="button"
    >
      {innerNode}
    </motion.button>
  );
}
