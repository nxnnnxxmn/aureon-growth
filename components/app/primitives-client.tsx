"use client";

import type React from "react";
import { A } from "@/lib/ui";

/* ─── Button (client) ─────────────────────────────────────────── */
export function Button({
  children, variant = "primary", size = "md", ...rest
}: { variant?: "primary" | "ghost" | "outline"; size?: "sm" | "md" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const style: React.CSSProperties =
    variant === "primary" ? { backgroundColor: A.gold, color: A.bg }
    : variant === "outline" ? { border: `1px solid ${A.border}`, color: A.text }
    : { backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` };
  return (
    <button {...rest} className={`btn-premium focus-ring inline-flex items-center gap-2 rounded-full font-display font-semibold transition-all ${pad} ${rest.className || ""}`} style={style}>
      {children}
    </button>
  );
}

/* ─── Filter chips ────────────────────────────────────────────── */
export function FilterChips<T extends string>({
  options, value, onChange,
}: { options: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const isActive = value === o.value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-medium transition-all focus-ring"
            style={{ backgroundColor: isActive ? A.gold : "rgba(255,255,255,0.05)", color: isActive ? A.bg : A.text2, border: `1px solid ${isActive ? A.gold : A.border}` }}>
            {o.label}
            {typeof o.count === "number" && <span className="font-mono text-[10px] opacity-70">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Data table (client — supports onRowClick) ─────────────── */
export function DataTable<T extends { id: string }>({
  columns, rows, onRowClick,
}: {
  columns: { key: keyof T | string; label: string; render?: (row: T) => React.ReactNode; className?: string }[];
  rows: T[];
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="surface overflow-hidden" style={{ backgroundColor: A.surface }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: A.bg2 }}>
              {columns.map((c) => (
                <th key={String(c.key)} className={`text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3 font-semibold ${c.className || ""}`} style={{ color: A.textDim, borderBottom: `1px solid ${A.border}` }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-sm" style={{ color: A.textDim }}>Sin registros.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} onClick={() => onRowClick?.(r)} className="transition-colors hover:bg-white/[0.025]" style={{ borderBottom: `1px solid ${A.border}`, cursor: onRowClick ? "pointer" : "default" }}>
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-4 py-3 align-middle ${c.className || ""}`} style={{ color: A.text }}>
                    {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key as string] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
