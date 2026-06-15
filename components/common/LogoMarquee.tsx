"use client";

import { motion } from "framer-motion";

/**
 * Infinite horizontal marquee of trust marks — light editorial style.
 * Two rows opposing direction for visual richness.
 */

const PALETTE = {
  bg: "#F5F1E8",
  bgAlt: "#EFE9DB",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  hairline: "rgba(26,24,21,0.10)",
};

type Mark = {
  label: string;
  sub?: string;
};

const MARKS_TOP: Mark[] = [
  { label: "Google", sub: "Premier Partner" },
  { label: "Meta", sub: "Business Partner" },
  { label: "HubSpot", sub: "Diamond Solutions" },
  { label: "Shopify", sub: "Plus Partner" },
  { label: "LinkedIn", sub: "Marketing Partner" },
  { label: "TikTok", sub: "for Business" },
];

const MARKS_BOTTOM: Mark[] = [
  { label: "Klaviyo", sub: "Master Partner" },
  { label: "Webflow", sub: "Enterprise Partner" },
  { label: "ISO 27001", sub: "Data Protection" },
  { label: "Effie Awards", sub: "Finalist 2024" },
  { label: "Stripe", sub: "Verified Partner" },
  { label: "Notion", sub: "Implementation" },
];

function MarqueeRow({ items, reverse }: { items: Mark[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background: `linear-gradient(to right, ${PALETTE.bg} 0%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background: `linear-gradient(to left, ${PALETTE.bg} 0%, transparent 100%)`,
        }}
      />

      <div
        className={`flex gap-10 sm:gap-14 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } motion-reduce:animate-none whitespace-nowrap`}
        style={{ width: "max-content" }}
      >
        {doubled.map((m, i) => (
          <div
            key={`${m.label}-${i}`}
            className="flex items-center gap-4 shrink-0 group cursor-default px-3 py-2 rounded-2xl transition-all duration-300"
            style={{
              borderColor: PALETTE.hairline,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = PALETTE.bgWhite;
              e.currentTarget.style.boxShadow = "0 8px 24px -10px rgba(26,24,21,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.bgWhite,
              }}
            >
              <span className="font-display font-bold text-lg">
                {m.label.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-display font-semibold text-base tracking-tight"
                style={{ color: PALETTE.text }}
              >
                {m.label}
              </span>
              {m.sub && (
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] mt-0.5"
                  style={{ color: PALETTE.textMuted }}
                >
                  {m.sub}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <motion.section
      aria-label="Certificaciones y partners"
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ backgroundColor: PALETTE.bg }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Top + bottom hairlines */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ backgroundColor: PALETTE.hairline }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ backgroundColor: PALETTE.hairline }}
      />

      {/* Editorial label */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10 flex items-center gap-4">
        <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
        <p
          className="font-mono text-xs uppercase tracking-[0.28em]"
          style={{ color: PALETTE.accent }}
        >
          Partners certificados · Reconocimientos
        </p>
      </div>

      {/* Two opposing rows */}
      <div className="space-y-4">
        <MarqueeRow items={MARKS_TOP} />
        <MarqueeRow items={MARKS_BOTTOM} reverse />
      </div>
    </motion.section>
  );
}
