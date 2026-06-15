"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/growth";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

/** `limit` shows a subset (home). `showAll` link appears when limited. */
export default function FAQ({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Preguntas frecuentes
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: PALETTE.text }}
          >
            Lo que suelen{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              preguntarnos
            </span>
            .
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: PALETTE.bgWhite,
                  border: `1px solid ${PALETTE.hairline}`,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-display font-semibold text-base lg:text-lg"
                    style={{ color: PALETTE.text }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isOpen ? PALETTE.accent : "rgba(224,78,44,0.10)",
                      color: isOpen ? PALETTE.bgWhite : PALETTE.accent,
                    }}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p
                        className="px-6 pb-6 text-sm lg:text-base leading-relaxed"
                        style={{ color: PALETTE.textMuted }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {limit && limit < FAQS.length && (
          <div className="mt-10 text-center">
            <Link
              href="/diagnostico#faq"
              className="inline-flex items-center gap-2 font-display font-semibold text-sm"
              style={{ color: PALETTE.accent }}
            >
              Ver todas las preguntas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
