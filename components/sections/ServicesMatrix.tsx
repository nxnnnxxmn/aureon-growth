"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES_CATALOG, SERVICE_CATEGORIES, SYSTEM_LABEL, type ServiceCategory } from "@/lib/services-catalog";

type Variant = "light" | "dark";

const THEMES: Record<Variant, Record<string, string>> = {
  light: {
    card: "#FBF8F1",
    cardHover: "#1A1815",
    border: "rgba(26,24,21,0.10)",
    text: "#1A1815",
    textMuted: "#6B655E",
    accent: "#E04E2C",
    gold: "#C9A961",
    chip: "#F5F1E8",
    chipActive: "#E04E2C",
    chipText: "#6B655E",
  },
  dark: {
    card: "rgba(251,248,241,0.04)",
    cardHover: "rgba(224,78,44,0.14)",
    border: "rgba(251,248,241,0.12)",
    text: "#FBF8F1",
    textMuted: "rgba(251,248,241,0.65)",
    accent: "#E04E2C",
    gold: "#C9A961",
    chip: "rgba(251,248,241,0.05)",
    chipActive: "#E04E2C",
    chipText: "rgba(251,248,241,0.65)",
  },
};

/** Filterable matrix of the 24 services. `showRelation` reveals the brand link. */
export default function ServicesMatrix({
  variant = "light",
  showRelation = false,
}: {
  variant?: Variant;
  showRelation?: boolean;
}) {
  const c = THEMES[variant];
  const [active, setActive] = useState<ServiceCategory | "Todos">("Todos");

  const filtered =
    active === "Todos"
      ? SERVICES_CATALOG
      : SERVICES_CATALOG.filter((s) => s.category === active);

  const filters: (ServiceCategory | "Todos")[] = ["Todos", ...SERVICE_CATEGORIES];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-display font-medium transition-all"
              style={{
                backgroundColor: isActive ? c.chipActive : c.chip,
                color: isActive ? "#FBF8F1" : c.chipText,
                border: `1px solid ${isActive ? c.chipActive : c.border}`,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
      >
        {filtered.map((s, i) => (
          <motion.div
            layout
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
            className="group relative rounded-2xl p-5 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
            style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-mono text-[10px] tabular-nums" style={{ color: c.gold }}>
                {String(s.id).padStart(2, "0")}
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: variant === "dark" ? "rgba(201,169,97,0.12)" : "#F2D0C1",
                  color: c.accent,
                }}
              >
                {SYSTEM_LABEL[s.system]}
              </span>
            </div>
            <h3 className="font-display font-semibold text-sm leading-snug mb-1" style={{ color: c.text }}>
              {s.title}
            </h3>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: c.textMuted }}>
              {s.category}
            </div>

            {showRelation && (
              <p
                className="text-xs leading-relaxed mt-3 pt-3 border-t transition-opacity duration-300 lg:opacity-0 lg:max-h-0 lg:overflow-hidden lg:group-hover:opacity-100 lg:group-hover:max-h-32"
                style={{ color: c.textMuted, borderColor: c.border }}
              >
                {s.brandRelation}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
