/**
 * Aureon Design System — primitivas canónicas para la web pública.
 * Fase 4: "use client" para magnetic buttons + card reactive glow.
 * Todo componente usa Tk de design-tokens. Cero colores ad-hoc.
 */
"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { Tk } from "@/lib/design-tokens";

/* ─────────────────────────────────────────────────────────────────
 * MAGNETIC HOOK — spring-based cursor attraction for desktop hover.
 * Guard: (hover: hover) and (pointer: fine) — never fires on touch.
 * ───────────────────────────────────────────────────────────────── */
function useMagnetic(strength = 0.28) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 20, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 250, damping: 20, mass: 0.8 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof window === "undefined") return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set((e.clientX - rect.left - rect.width / 2) * strength);
      rawY.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [rawX, rawY, strength],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { x, y, onMouseMove, onMouseLeave };
}

// Motion-wrapped Next.js Link
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionLink = motion(Link) as any;

/* ─────────────────────────────────────────────────────────────────
 * SECTION — wrapper canónico para ritmo vertical consistente.
 * ───────────────────────────────────────────────────────────────── */
export function Section({
  children, id, size = "md", bg = "default", className = "",
}: {
  children: React.ReactNode;
  id?: string;
  size?: "sm" | "md" | "lg" | "xl";
  bg?: "default" | "alt" | "deep";
  className?: string;
}) {
  const bgColor = bg === "alt" ? Tk.color.bg2 : bg === "deep" ? Tk.color.bg : Tk.color.bg;
  return (
    <section id={id} className={`relative w-full overflow-hidden ${Tk.space.section[size]} ${className}`} style={{ backgroundColor: bgColor, color: Tk.color.text }}>
      {bg !== "default" && <div aria-hidden className="absolute inset-0 -z-0 tech-grid-faint opacity-60" />}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * EYEBROW + HEADING + LEAD — jerarquía tipográfica consistente
 * ───────────────────────────────────────────────────────────────── */
export function Eyebrow({ children, color = Tk.color.gold }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-10" style={{ backgroundColor: color }} />
      <span className={Tk.type.eyebrow} style={{ color }}>{children}</span>
    </div>
  );
}

export function Heading({
  as = "h2", level = "h2", children, className = "", italic,
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  level?: keyof typeof Tk.type;
  children: React.ReactNode;
  className?: string;
  italic?: { word: string; color?: string };
}) {
  const Tag = as;
  const cls = `${Tk.type[level]} font-display ${className}`;
  if (italic && typeof children === "string" && children.includes(italic.word)) {
    const parts = children.split(italic.word);
    return (
      <Tag className={cls} style={{ color: Tk.color.text }}>
        {parts[0]}
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: italic.color || Tk.color.gold }}>{italic.word}</span>
        {parts[1]}
      </Tag>
    );
  }
  return <Tag className={cls} style={{ color: Tk.color.text }}>{children}</Tag>;
}

export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`${Tk.type.bodyLg} max-w-2xl ${className}`} style={{ color: Tk.color.text2 }}>{children}</p>;
}

/* ─────────────────────────────────────────────────────────────────
 * BUTTON — variants: primary, secondary, ghost, outline, link
 *   sizes: sm, md, lg
 *   props: icon (leading), iconRight, loading, fullWidth
 *   polymorphic: href → Link/a; otherwise → button
 *   Fase 4: spring magnetic on desktop hover (pointer: fine)
 * ───────────────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const BTN_BASE = "btn-premium focus-ring inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed";

const BTN_SIZE: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-sm",
};

function variantStyle(v: ButtonVariant): React.CSSProperties {
  switch (v) {
    case "primary":
      return { backgroundColor: Tk.color.gold, color: Tk.color.bg, boxShadow: "0 16px 40px -12px rgba(214,180,106,0.45)" };
    case "secondary":
      return { backgroundColor: Tk.color.surfaceElev, color: Tk.color.text, border: `1px solid ${Tk.color.border}` };
    case "outline":
      return { backgroundColor: "transparent", color: Tk.color.text, border: `1.5px solid ${Tk.color.border}` };
    case "ghost":
      return { backgroundColor: "transparent", color: Tk.color.text2 };
    case "link":
      return { backgroundColor: "transparent", color: Tk.color.gold, padding: 0, borderRadius: 0 };
  }
}

interface ButtonAnchorProps extends CommonButtonProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}
interface ButtonElementProps extends CommonButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: never;
  external?: never;
}
export type ButtonProps = ButtonAnchorProps | ButtonElementProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconRight, loading, fullWidth, className = "", children, ...rest } = props;
  const cls = `${BTN_BASE} ${variant === "link" ? "" : BTN_SIZE[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  const vstyle = variantStyle(variant);
  const { x, y, onMouseMove, onMouseLeave } = useMagnetic();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mstyle: any = { ...vstyle, x, y };

  const content = (
    <>
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : icon ? (
        <span className="inline-flex shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props as ButtonAnchorProps;
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={mstyle as any}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink
        href={href}
        className={cls}
        style={mstyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </MotionLink>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { href: _h, external: _e, ...btnRest } = rest as any;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <motion.button
      {...(btnRest as any)}
      className={cls}
      style={mstyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * CARD — base reutilizable.
 *   Fase 4: reactive radial glow que sigue el cursor (pointer: fine).
 *   El glow se actualiza via DOM ref sin re-renders.
 * ───────────────────────────────────────────────────────────────── */
export function Card({
  variant = "surface", hover = false, featured = false, padded = true, className = "", children, accentColor,
}: {
  variant?: "surface" | "glass" | "gradient";
  hover?: boolean;
  featured?: boolean;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
  accentColor?: string;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(380px circle at ${px}px ${py}px, rgba(214,180,106,0.10), transparent 65%)`;
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  const base = variant === "glass" ? "glass" : variant === "gradient" ? "border-grad" : "surface";
  const cls = `${base} relative ${hover ? "card-3d" : ""} ${padded ? "p-6 lg:p-8" : ""} ${featured ? "lg:-mt-2" : ""} ${className}`;
  const style: React.CSSProperties = featured
    ? { backgroundColor: Tk.color.surfaceElev, borderColor: Tk.color.borderActive, boxShadow: "var(--elev-6)" }
    : { backgroundColor: variant === "surface" ? Tk.color.surface : undefined };

  return (
    <div className={cls} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Reactive glow overlay — below content, updated via ref (no re-renders) */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: 0, transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)", zIndex: 0 }}
      />
      {featured && accentColor && (
        <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accentColor}26 0%, transparent 70%)`, zIndex: 0 }} />
      )}
      <div className="relative" style={{ zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * BADGE — semantic chip
 * ───────────────────────────────────────────────────────────────── */
const BADGE_TONE: Record<string, { bg: string; fg: string }> = {
  gold:     { bg: "rgba(214,180,106,0.14)", fg: Tk.color.gold },
  violet:   { bg: "rgba(124,92,191,0.16)",  fg: "#C7B8E8" },
  blue:     { bg: "rgba(59,111,212,0.16)",  fg: Tk.color.blue },
  cyan:     { bg: "rgba(79,182,199,0.14)",  fg: Tk.color.cyan },
  positive: { bg: "rgba(126,226,168,0.14)", fg: Tk.color.positive },
  alert:    { bg: "rgba(240,195,106,0.14)", fg: Tk.color.alert },
  danger:   { bg: "rgba(224,133,119,0.14)", fg: Tk.color.danger },
  neutral:  { bg: "rgba(255,255,255,0.06)", fg: Tk.color.text2 },
};

export function Badge({
  tone = "neutral", children, dot = false, size = "md",
}: {
  tone?: keyof typeof BADGE_TONE;
  children: React.ReactNode;
  dot?: boolean;
  size?: "sm" | "md";
}) {
  const t = BADGE_TONE[tone];
  const cls = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-[0.14em] ${cls}`} style={{ backgroundColor: t.bg, color: t.fg }}>
      {dot && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: t.fg }} />}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * INPUT / TEXTAREA / SELECT / FIELD — controlados desde fuera
 * ───────────────────────────────────────────────────────────────── */
const INPUT_BASE = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors";
const INPUT_STYLE: React.CSSProperties = {
  backgroundColor: Tk.color.bg,
  border: `1px solid ${Tk.color.border}`,
  color: Tk.color.text,
};

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${INPUT_BASE} ${props.className || ""}`} style={{ ...INPUT_STYLE, ...props.style }} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${INPUT_BASE} ${props.className || ""}`} style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 100, ...props.style }} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${INPUT_BASE} ${props.className || ""}`} style={{ ...INPUT_STYLE, ...props.style }} />;
}
export function Field({ label, required, hint, children, className = "" }: { label: string; required?: boolean; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-display font-medium text-xs uppercase tracking-[0.12em] mb-2" style={{ color: Tk.color.text2 }}>
        {label}{required && <span style={{ color: Tk.color.gold }}> *</span>}
      </span>
      {children}
      {hint && <span className="block text-[10px] mt-1" style={{ color: Tk.color.textDim }}>{hint}</span>}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * TABS — accesible (role=tablist/tab/tabpanel + arrow nav)
 *   Client-only (usa hooks). Importar desde "@/components/ds/Tabs".
 * ───────────────────────────────────────────────────────────────── */
export { Tabs } from "./Tabs";
