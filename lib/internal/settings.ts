"use client";

/**
 * Configuraciones no-tabulares del Command Center (objetos únicos, no arrays).
 * Mismo principio del data-source: localStorage, honesto, sin backend.
 */
import { useCallback, useEffect, useState } from "react";

export const CFG = {
  profile: "aureon_cfg_profile_v1",
  appearance: "aureon_cfg_appearance_v1",
  whatsapp: "aureon_cfg_whatsapp_v1",
  channels: "aureon_cfg_channels_v1",
  commerce: "aureon_cfg_commerce_v1",
} as const;

/* ── Tipos ── */
export type Profile = { name: string; title: string; email: string; phone: string };
export type Appearance = { accent: "gold" | "violet" | "electric" | "cyan"; density: "comfortable" | "compact"; motion: "auto" | "reduced" };
export type WhatsAppCfg = { phoneNumberId: string; wabaId: string; token: string; displayPhone: string; autoReply: boolean };
export type ChannelCfg = { instagram: boolean; facebook: boolean; email: boolean; autoReplyAll: boolean };
export type CommerceCfg = { currency: "COP" | "USD" | "EUR" | "MXN"; stages: string[] };

export const DEFAULTS = {
  profile: { name: "Juan L.", title: "CEO · Owner", email: "aureongrowthservices@outlook.com", phone: "" } as Profile,
  appearance: { accent: "gold", density: "comfortable", motion: "auto" } as Appearance,
  whatsapp: { phoneNumberId: "", wabaId: "", token: "", displayPhone: "", autoReply: false } as WhatsAppCfg,
  channels: { instagram: false, facebook: false, email: false, autoReplyAll: false } as ChannelCfg,
  commerce: { currency: "COP", stages: ["Nuevo", "Contactado", "Propuesta", "Negociación", "Ganado", "Perdido"] } as CommerceCfg,
};

export function getCfg<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...def, ...JSON.parse(raw) } : def;
  } catch { return def; }
}
export function setCfg<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function useCfg<T>(key: string, def: T): [T, (v: T | ((p: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(def);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setValue(getCfg(key, def)); setHydrated(true); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key]);
  const update = useCallback((v: T | ((p: T) => T)) => {
    setValue((prev) => {
      const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
      setCfg(key, next);
      return next;
    });
  }, [key]);
  return [value, update, hydrated];
}

/* ── Apariencia aplicada en vivo (acento, densidad, motion) ── */
const ACCENTS: Record<Appearance["accent"], { main: string; bright: string }> = {
  gold: { main: "#D6B46A", bright: "#E2C58A" },
  violet: { main: "#9F84D0", bright: "#C7B8E8" },
  electric: { main: "#4D7CFE", bright: "#8FAEFF" },
  cyan: { main: "#4FB6C7", bright: "#8AD8E4" },
};

export function applyAppearance(a: Appearance) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const acc = ACCENTS[a.accent] || ACCENTS.gold;
  root.style.setProperty("--a-gold", acc.main);
  root.style.setProperty("--a-gold-bright", acc.bright);
  root.dataset.density = a.density;
  root.dataset.motion = a.motion;
}
