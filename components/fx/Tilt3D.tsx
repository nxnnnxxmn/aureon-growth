"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Tilt3D — rotación 3D según posición del mouse + shine radial que sigue el cursor.
 * Springs físicos (no lerp lineal) para sensación premium tipo Linear/Stripe.
 *
 * Guards: (hover:hover)+(pointer:fine) y prefers-reduced-motion.
 * En touch renderiza estático — cero costo.
 */
export default function Tilt3D({
  children,
  className = "",
  maxTilt = 7,
  shine = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  shine?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5); // 0..1 dentro de la card
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 260, damping: 22 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      px.set(x);
      py.set(y);
      if (ref.current) {
        ref.current.style.setProperty("--mx", `${x * 100}%`);
        ref.current.style.setProperty("--my", `${y * 100}%`);
      }
    },
    [px, py],
  );

  const onMouseLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <div className="tilt-wrapper" style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        className={`tilt-inner relative ${className}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
        {shine && <span aria-hidden className="tilt-shine rounded-[inherit]" />}
      </motion.div>
    </div>
  );
}
