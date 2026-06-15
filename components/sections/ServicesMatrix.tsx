"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES_CATALOG, SERVICE_CATEGORIES, SYSTEM_LABEL, type ServiceCategory } from "@/lib/services-catalog";
import { A } from "@/lib/ui";

/** Filterable matrix of the 24 services (dark). `showRelation` reveals the brand link on hover. */
export default function ServicesMatrix({
  showRelation = false,
}: {
  variant?: "light" | "dark";
  showRelation?: boolean;
}) {
  const [active, setActive] = useState<ServiceCategory | "Todos">("Todos");
  const filtered = active === "Todos" ? SERVICES_CATALOG : SERVICES_CATALOG.filter((s) => s.category === active);
  const filters: (ServiceCategory | "Todos")[] = ["Todos", ...SERVICE_CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="focus-ring px-4 py-2 rounded-full text-xs sm:text-sm font-display font-medium transition-all"
              style={{
                backgroundColor: isActive ? A.gold : "rgba(255,255,255,0.05)",
                color: isActive ? A.bg : A.text2,
                border: `1px solid ${isActive ? A.gold : A.border}`,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filtered.map((s, i) => (
          <motion.div
            layout
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
            className="card-3d group relative rounded-2xl p-5 overflow-hidden"
            style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-mono text-[10px] tabular-nums" style={{ color: A.gold }}>{String(s.id).padStart(2, "0")}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(124,92,191,0.16)", color: "#C7B8E8" }}>
                {SYSTEM_LABEL[s.system]}
              </span>
            </div>
            <h3 className="font-display font-semibold text-sm leading-snug mb-1" style={{ color: A.text }}>{s.title}</h3>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>{s.category}</div>

            {showRelation && (
              <p className="text-xs leading-relaxed mt-3 pt-3 border-t transition-all duration-300 lg:opacity-0 lg:max-h-0 lg:overflow-hidden lg:group-hover:opacity-100 lg:group-hover:max-h-32" style={{ color: A.text2, borderColor: A.border }}>
                {s.brandRelation}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
