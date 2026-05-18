"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
}: GlowButtonProps) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-purple-700 text-white border border-violet-500/30 btn-glow",
    secondary:
      "bg-transparent text-violet-300 border border-violet-500/40 hover:bg-violet-500/10",
    ghost:
      "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:border-white/20",
  };

  const content = (
    <motion.span
      className={cn(
        "relative inline-flex items-center gap-2 font-display font-medium rounded-xl transition-all duration-300",
        sizes[size],
        variants[variant],
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      {showArrow && (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
