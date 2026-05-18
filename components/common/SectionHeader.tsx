"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const parts = titleHighlight
    ? title.split(titleHighlight)
    : [title];

  return (
    <motion.div
      className={cn("flex flex-col gap-4 max-w-3xl", alignClasses[align], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {badge && (
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-sm font-medium font-display tracking-wide"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          {badge}
        </motion.span>
      )}

      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-tight tracking-tight">
        {titleHighlight ? (
          <>
            {parts[0]}
            <span className="gradient-text">{titleHighlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <motion.p
          className="text-slate-400 text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
