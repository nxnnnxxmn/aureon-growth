"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * MaskReveal — el texto emerge desde una máscara (clip-path inset)
 * con un desplazamiento vertical. Firma editorial tipo Awwwards:
 * el titular "se imprime" en la página en vez de simplemente aparecer.
 */
export default function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "90%", clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ y: 0, clipPath: "inset(0 0 -8% 0)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
