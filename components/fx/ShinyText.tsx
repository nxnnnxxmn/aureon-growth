"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * ShinyText — gradiente metálico que barre el texto de izquierda a derecha
 * en loop continuo. backgroundClip: text + backgroundPosition animado.
 *
 * Con prefers-reduced-motion el gradiente queda estático (sigue siendo
 * dorado metálico — el impacto visual no depende de la animación).
 */
export default function ShinyText({
  text,
  baseColor = "#D6B46A",
  shineColor = "#FFF6E3",
  speed = 3,
  spread = 100,
  className = "",
}: {
  text: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const style: React.CSSProperties = {
    display: "inline-block",
    color: "transparent",
    backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 38%, ${shineColor} 50%, ${baseColor} 62%)`,
    backgroundSize: "220% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  };

  if (reduced) {
    return <span className={className} style={{ ...style, backgroundPosition: "50% 0" }}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ backgroundPosition: "120% 0" }}
      animate={{ backgroundPosition: "-120% 0" }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}
