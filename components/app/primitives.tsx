import Link from "next/link";
import type React from "react";
import { A } from "@/lib/ui";

// Re-export the client-interactive primitives so module pages can import everything from this file.
export { Button, FilterChips, DataTable } from "./primitives-client";

/* ─── Page header ────────────────────────────────────────────────── */
export function AppPageHeader({
  title, subtitle, breadcrumbs, actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {breadcrumbs && (
        <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] mb-3">
          {breadcrumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {c.href ? <Link href={c.href} style={{ color: A.textDim }}>{c.label}</Link> : <span style={{ color: A.gold }}>{c.label}</span>}
              {i < breadcrumbs.length - 1 && <span style={{ color: A.border }}>/</span>}
            </li>
          ))}
        </ol>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl lg:text-3xl tracking-[-0.01em]" style={{ color: A.text }}>{title}</h1>
          {subtitle && <p className="text-sm mt-1.5 max-w-2xl" style={{ color: A.text2 }}>{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

/* ─── KPI / stat card ───────────────────────────────────────────── */
export function StatCard({
  label, value, sub, accent = "gold", icon: Icon, hint, source,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "gold" | "violet" | "blue" | "positive" | "alert";
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  hint?: string;
  source?: "real" | "manual" | "importado" | "pendiente" | "sin-datos" | "demo";
}) {
  const color = { gold: A.gold, violet: A.violet, blue: A.blue, positive: A.positive, alert: A.alert }[accent];
  return (
    <div className="card-3d surface relative p-5" style={{ backgroundColor: A.surface }}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: A.textDim }}>{label}</div>
        {Icon && (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </span>
        )}
      </div>
      <div className="font-display font-bold text-2xl lg:text-3xl tabular-nums" style={{ color: A.text }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: A.text2 }}>{sub}</div>}
      <div className="flex items-center justify-between mt-2">
        {hint ? <div className="text-[10px] font-mono" style={{ color: A.textDim }}>{hint}</div> : <span />}
        {source && <SourceTag origin={source} />}
      </div>
    </div>
  );
}

/* ─── Status / priority badge ───────────────────────────────────── */
const BADGE_TONE: Record<string, { bg: string; fg: string }> = {
  // request / crm
  Nueva: { bg: "rgba(214,180,106,0.12)", fg: A.gold },
  "En revisión": { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  Contactada: { bg: "rgba(124,92,191,0.16)", fg: A.violet },
  "Diagnóstico agendado": { bg: "rgba(214,180,106,0.14)", fg: A.gold },
  "Diagnóstico realizado": { bg: "rgba(126,226,168,0.12)", fg: A.positive },
  "Propuesta enviada": { bg: "rgba(124,92,191,0.16)", fg: A.violet },
  Negociación: { bg: "rgba(240,195,106,0.16)", fg: A.alert },
  Ganada: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Ganado: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Perdida: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Perdido: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Nurturing: { bg: "rgba(124,92,191,0.14)", fg: A.violet },
  "Nuevo lead": { bg: "rgba(214,180,106,0.12)", fg: A.gold },
  Calificado: { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  // project / task
  Backlog: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Planeación: { bg: "rgba(124,92,191,0.14)", fg: A.violet },
  "En progreso": { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  "Esperando cliente": { bg: "rgba(240,195,106,0.14)", fg: A.alert },
  Entregado: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Cerrado: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Pendiente: { bg: "rgba(255,255,255,0.06)", fg: A.text2 },
  Bloqueada: { bg: "rgba(240,195,106,0.16)", fg: A.alert },
  Completada: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  // proposal / contract / invoice / expense
  Borrador: { bg: "rgba(255,255,255,0.06)", fg: A.text2 },
  Enviada: { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  Enviado: { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  Aprobada: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Rechazada: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Vencida: { bg: "rgba(240,99,71,0.14)", fg: "#F0A36A" },
  Vencido: { bg: "rgba(240,99,71,0.14)", fg: "#F0A36A" },
  Firmado: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Activo: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Cancelado: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Emitida: { bg: "rgba(214,180,106,0.14)", fg: A.gold },
  Pagada: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Pagado: { bg: "rgba(126,226,168,0.16)", fg: A.positive },
  Anulada: { bg: "rgba(255,255,255,0.05)", fg: A.textDim },
  Recurrente: { bg: "rgba(59,111,212,0.16)", fg: A.blue },
  // client / generic
  Pausado: { bg: "rgba(240,195,106,0.14)", fg: A.alert },
  Potencial: { bg: "rgba(124,92,191,0.14)", fg: A.violet },
};

export function StatusBadge({ status }: { status: string }) {
  const tone = BADGE_TONE[status] || { bg: "rgba(255,255,255,0.06)", fg: A.text2 };
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: tone.bg, color: tone.fg }}>
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: tone.fg }} />
      {status}
    </span>
  );
}

const PRIORITY_TONE: Record<string, { bg: string; fg: string; label: string }> = {
  low: { bg: "rgba(255,255,255,0.06)", fg: A.text2, label: "Baja" },
  medium: { bg: "rgba(59,111,212,0.16)", fg: A.blue, label: "Media" },
  high: { bg: "rgba(214,180,106,0.16)", fg: A.gold, label: "Alta" },
  critical: { bg: "rgba(240,99,71,0.16)", fg: "#F0A36A", label: "Crítica" },
};

export function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" | "critical" }) {
  const t = PRIORITY_TONE[priority];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.12em]" style={{ backgroundColor: t.bg, color: t.fg }}>{t.label}</span>
  );
}

/* ─── Surface / panel ────────────────────────────────────────────── */
export function Panel({ children, className = "", title, action }: { children: React.ReactNode; className?: string; title?: string; action?: React.ReactNode }) {
  return (
    <section className={`surface p-5 lg:p-6 ${className}`} style={{ backgroundColor: A.surface }}>
      {(title || action) && (
        <header className="flex items-center justify-between mb-4">
          {title && <h2 className="font-display font-semibold text-sm uppercase tracking-[0.16em]" style={{ color: A.text }}>{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/* ─── Empty state ───────────────────────────────────────────────── */
export function EmptyState({ title, hint, icon: Icon, action }: { title: string; hint?: string; icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; action?: React.ReactNode }) {
  return (
    <div className="text-center py-16 px-6 surface" style={{ backgroundColor: A.surface }}>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(214,180,106,0.10)", border: `1px solid ${A.border}` }}>
        {Icon ? <Icon className="w-5 h-5" style={{ color: A.gold }} /> : <span className="font-mono text-xs" style={{ color: A.gold }}>0</span>}
      </div>
      <div className="font-display font-semibold text-base" style={{ color: A.text }}>{title}</div>
      {hint && <div className="text-sm mt-1.5 max-w-md mx-auto leading-relaxed" style={{ color: A.textDim }}>{hint}</div>}
      {action && <div className="mt-5 flex items-center justify-center gap-2">{action}</div>}
    </div>
  );
}

/* ─── Data source label (every KPI must declare its source) ─────── */
type DataOrigin = "real" | "manual" | "importado" | "pendiente" | "sin-datos" | "demo";
const ORIGIN_META: Record<DataOrigin, { label: string; color: string }> = {
  real: { label: "Real", color: A.positive },
  manual: { label: "Manual", color: A.gold },
  importado: { label: "Importado", color: A.blue },
  pendiente: { label: "Pendiente", color: A.violet },
  "sin-datos": { label: "Sin datos", color: A.textDim },
  demo: { label: "Demo", color: A.alert },
};
export function SourceTag({ origin }: { origin: DataOrigin }) {
  const m = ORIGIN_META[origin];
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-full" style={{ color: m.color, backgroundColor: "rgba(255,255,255,0.04)" }}>
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: m.color }} />{m.label}
    </span>
  );
}

/* ─── Sparkline bar chart (CSS, no deps) ─────────────────────────── */
export function MiniBars({ data, color = A.gold }: { data: number[]; color?: string }) {
  const max = Math.max(1, ...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, minHeight: 4, backgroundColor: color, opacity: 0.55 + (i / data.length) * 0.45 }} />
      ))}
    </div>
  );
}
