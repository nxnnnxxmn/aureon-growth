/**
 * PALETA EDITORIAL LIGHT — Cream + Charcoal + Vermillion
 * Inspiración: &Walsh + Mother Design + The Great Discontent
 * Light mode premium con un único pop saturado (vermillion = marketing energy)
 */

export const PALETA = {
  // Base
  bg: "#F5F1E8",         // warm cream paper
  bgAlt: "#EFE9DB",       // slightly darker cream (cards, panels)
  bgWhite: "#FBF8F1",     // softer near-white (elevation)
  bgDark: "#1A1815",      // contrast charcoal (the one inverted section)

  // Text
  text: "#1A1815",        // warm charcoal (NOT pure black)
  textMuted: "#6B655E",   // warm gray
  textSoft: "#9A938A",    // softer micro-copy
  textOnDark: "#F5F1E8",  // cream on dark

  // Accent — ONE saturated pop
  accent: "#E04E2C",      // vermillion (marketing energy, CTAs)
  accentSoft: "#F2D0C1",  // soft peach (backgrounds, hover bg)
  accentDeep: "#A53B1F",  // deep accent (hover state)

  // Secondary (sparse use only — sustainability moments)
  forest: "#2D5016",
  gold: "#C9A961",

  // Hairlines / shadows
  hairline: "rgba(26,24,21,0.10)",
  hairlineSoft: "rgba(26,24,21,0.06)",
  shadow: "rgba(26,24,21,0.08)",
  shadowSoft: "rgba(26,24,21,0.04)",
} as const;

export const SPACING = {
  section: "py-24 lg:py-36",
  sectionTight: "py-16 lg:py-24",
  headingGap: "mb-8 lg:mb-12",
  gridGap: "gap-6 lg:gap-8",
} as const;

export const RADIUS = {
  card: "rounded-3xl",     // 24px — soft generous
  cardSm: "rounded-2xl",   // 16px
  button: "rounded-full",  // pill
  input: "rounded-xl",     // 12px
} as const;

export const TYPO = {
  h1: "font-display font-semibold text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.02] tracking-[-0.025em]",
  h2: "font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em]",
  h3: "font-display font-semibold text-2xl lg:text-3xl leading-[1.1] tracking-[-0.01em]",
  body: "text-base lg:text-lg leading-relaxed",
  bodyMuted: "text-base lg:text-lg leading-relaxed",
  label: "font-mono text-xs uppercase tracking-[0.22em]",
  serifItalic: "italic font-light",
} as const;

export default PALETA;
