"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/growth";
import { A } from "@/lib/ui";

export default function FAQ({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg2, color: A.text }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Preguntas frecuentes</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]" style={{ color: A.text }}>
            Lo que suelen{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>preguntarnos</span>.
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="surface overflow-hidden" style={{ backgroundColor: A.surface }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-ring"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-display font-semibold text-base lg:text-lg" style={{ color: A.text }}>{item.q}</span>
                  <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300" style={{ backgroundColor: isOpen ? A.gold : "rgba(255,255,255,0.06)", color: isOpen ? A.bg : A.gold, transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                {/* Always-rendered answer (crawlable + accessible), visually collapsed via grid-rows */}
                <div
                  id={`faq-answer-${i}`}
                  className="grid transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] px-6"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-sm lg:text-base leading-relaxed" style={{ color: A.text2 }}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {limit && limit < FAQS.length && (
          <div className="mt-10 text-center">
            <Link href="/diagnostico#faq" className="inline-flex items-center gap-2 font-display font-semibold text-sm focus-ring rounded" style={{ color: A.gold }}>
              Ver todas las preguntas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
