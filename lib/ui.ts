/**
 * Legacy palette accessor — mantenido por compatibilidad con componentes ya
 * escritos. Para nuevo código, usar `Tk` de design-tokens.ts.
 *
 * Cambios v2 (Fase 2 — accesibilidad):
 *  - text2 #A8B4C8 → #B5BFCF  (8.6:1 → 9.4:1)
 *  - textDim #6F7890 → #8892A6 (4.1:1 FAIL → 6.0:1 AA)
 *  + cyan (color de apoyo para datos/IA)
 *  + surfaceElev (superficie elevada)
 *  + borderHover (estado hover de borders)
 */
import { Tk } from "./design-tokens";

export const A = {
  bg: Tk.color.bg,
  bg2: Tk.color.bg2,
  surface: Tk.color.surface,
  surfaceSolid: Tk.color.surfaceElev,
  surfaceElev: Tk.color.surfaceElev,
  glass: Tk.color.glass,
  border: Tk.color.border,
  borderHover: Tk.color.borderHover,
  borderActive: Tk.color.borderActive,
  gold: Tk.color.gold,
  goldMetal: Tk.color.goldMetal,
  goldBright: Tk.color.goldBright,
  violet: Tk.color.violet,
  violetDark: Tk.color.violetDark,
  blue: Tk.color.blue,
  blueDeep: Tk.color.blueDeep,
  cyan: Tk.color.cyan,
  text: Tk.color.text,
  text2: Tk.color.text2,
  textDim: Tk.color.textDim,
  textMute: Tk.color.textMute,
  positive: Tk.color.positive,
  alert: Tk.color.alert,
  danger: Tk.color.danger,
} as const;
