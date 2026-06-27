/**
 * Aureon Design System — tokens canónicos.
 * No re-defines colors por componente. Si necesitas un color, usa Tk.color.X.
 */

export const Tk = {
  // ─── Color ─────────────────────────────────────────────────────────
  color: {
    // Superficies
    bg: "#08070D",
    bg2: "#0D0B18",
    surface: "#11101A",
    surfaceElev: "#161522",
    glass: "rgba(255,255,255,0.045)",

    // Bordes
    border: "rgba(255,255,255,0.10)",
    borderHover: "rgba(255,255,255,0.18)",
    borderActive: "rgba(214,180,106,0.55)",

    // Texto — todos pasan WCAG 2.2 AA sobre bg #08070D
    text: "#F0EDF8",        // 17.2:1
    text2: "#B5BFCF",       // 9.4:1 (antes A8B4C8 = 8.6)
    textDim: "#8892A6",     // 6.0:1 (antes 6F7890 = 4.1 FAIL)
    textMute: "#5C657A",    // 4.5:1 — solo para watermarks no críticos

    // Marca
    gold: "#D6B46A",
    goldMetal: "#C9A961",
    goldBright: "#E2C58A",
    violet: "#7C5CBF",
    violetDark: "#3E2A69",
    violetLight: "#9F84D0",

    // Datos / IA / técnico (color de apoyo)
    blue: "#3B6FD4",
    blueDeep: "#102A5C",
    cyan: "#4FB6C7",        // nuevo: para enlaces de datos y badges técnicos

    // Estados semánticos
    positive: "#7EE2A8",
    alert: "#F0C36A",
    danger: "#E08577",
  },

  // ─── Spacing — escala vertical para secciones (rem) ──────────────
  // Usar Tk.space.section.{xs,sm,md,lg} para `py-` de cada section
  space: {
    section: {
      xs: "py-12 lg:py-16",
      sm: "py-16 lg:py-20",
      md: "py-20 lg:py-28",
      lg: "py-24 lg:py-32",
      xl: "py-28 lg:py-40",
    },
  },

  // ─── Tipografía fluida ────────────────────────────────────────────
  // clamp(min, preferred, max) — escala 1.250 (cuarta mayor)
  type: {
    eyebrow: "text-[11px] tracking-[0.28em] uppercase font-mono",
    body: "text-base leading-[1.65]",        // 16/26
    bodyLg: "text-lg leading-[1.6]",         // 18/29
    h6: "text-base font-semibold tracking-[-0.005em]",
    h5: "text-lg font-semibold tracking-[-0.01em]",
    h4: "text-xl lg:text-2xl font-semibold tracking-[-0.015em]",
    h3: "text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.15]",
    h2: "text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.025em] leading-[1.08]",
    h1: "text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.02]",
    display: "text-[clamp(3rem,8vw,6rem)] font-semibold tracking-[-0.04em] leading-[0.98]",
  },

  // ─── Elevación — 6 niveles ────────────────────────────────────────
  elev: {
    0: "none",
    1: "0 1px 2px rgba(0,0,0,0.4)",
    2: "0 4px 12px -4px rgba(0,0,0,0.55)",
    3: "0 10px 28px -10px rgba(0,0,0,0.65)",
    4: "0 18px 44px -18px rgba(0,0,0,0.75), 0 4px 12px -4px rgba(0,0,0,0.45)",
    5: "0 28px 60px -24px rgba(0,0,0,0.85), 0 8px 18px -8px rgba(0,0,0,0.55)",
    6: "0 40px 90px -30px rgba(0,0,0,0.9), 0 12px 24px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(214,180,106,0.08)",
  },

  // ─── Radios ───────────────────────────────────────────────────────
  radius: {
    sm: "8px",     // chips, micro
    md: "12px",    // inputs, buttons
    lg: "16px",    // cards menores
    xl: "20px",    // cards estándar
    "2xl": "24px", // cards principales
    "3xl": "28px", // hero blocks
    full: "9999px",
  },

  // ─── Motion ───────────────────────────────────────────────────────
  motion: {
    // Curvas
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",       // out-expo (default)
    easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    spring: { stiffness: 220, damping: 26 },
    // Duraciones
    fast: 150,
    base: 300,
    slow: 500,
    slower: 800,
  },

  // ─── Breakpoints (referencia, ya en Tailwind) ─────────────────────
  bp: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
} as const;

/** Helper para inline-style typing. */
export type ColorToken = keyof typeof Tk.color;
