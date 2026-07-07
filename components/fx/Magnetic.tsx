"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic — el elemento se siente "atraído" hacia el cursor dentro de su
 * área de hover, con retorno elástico al salir. Firma de Cuberto/Dogstudio.
 *
 * strength: desplazamiento máximo en px (mantener ≤ 12 para elegancia).
 * Guards: (hover:hover)+(pointer:fine) y prefers-reduced-motion → estático.
 */
export default function Magnetic({
  children,
  strength = 10,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.3 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX * strength * 2);
      y.set(relY * strength * 2);
    },
    [x, y, strength],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
