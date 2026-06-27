"use client";

import { useRef, useState, useId, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tk } from "@/lib/design-tokens";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

/**
 * Tabs accesible — WAI-ARIA Authoring Practices.
 * Soporta navegación con flechas, Home/End, y restaura el foco al cambiar.
 */
export function Tabs({
  items, defaultId, onChange, ariaLabel = "Pestañas", variant = "pills",
}: {
  items: TabItem[];
  defaultId?: string;
  onChange?: (id: string) => void;
  ariaLabel?: string;
  variant?: "pills" | "underline";
}) {
  const [active, setActive] = useState<string>(defaultId || items[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => { onChange?.(active); }, [active, onChange]);

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    const last = items.length - 1;
    let next = idx;
    if (e.key === "ArrowRight") next = idx === last ? 0 : idx + 1;
    else if (e.key === "ArrowLeft") next = idx === 0 ? last : idx - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    const nextId = items[next].id;
    setActive(nextId);
    requestAnimationFrame(() => tabRefs.current[nextId]?.focus());
  }

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel} className={variant === "pills"
        ? "inline-flex flex-wrap gap-2 p-1 rounded-full"
        : "flex flex-wrap gap-1 border-b"}
        style={variant === "underline" ? { borderColor: Tk.color.border } : undefined}>
        {items.map((item, i) => {
          const isActive = item.id === active;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;
          const pillStyle: React.CSSProperties = isActive
            ? { backgroundColor: Tk.color.gold, color: Tk.color.bg, border: `1px solid ${Tk.color.gold}` }
            : { backgroundColor: "rgba(255,255,255,0.05)", color: Tk.color.text2, border: `1px solid ${Tk.color.border}` };
          const underlineStyle: React.CSSProperties = isActive
            ? { color: Tk.color.gold, borderBottom: `2px solid ${Tk.color.gold}` }
            : { color: Tk.color.text2, borderBottom: `2px solid transparent` };
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[item.id] = el; }}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`focus-ring inline-flex items-center gap-2 font-display font-medium transition-colors ${
                variant === "pills" ? "px-4 py-2 rounded-full text-sm" : "px-4 py-2.5 text-sm -mb-px"
              }`}
              style={variant === "pills" ? pillStyle : underlineStyle}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {items.map((item) =>
          item.id === active ? (
            <motion.div
              key={item.id}
              id={`${baseId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${item.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 focus:outline-none"
            >
              {item.content}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
