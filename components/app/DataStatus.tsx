"use client";

import { Database, FlaskConical } from "lucide-react";
import { useDemoMode } from "@/lib/internal/data-source";
import { A } from "@/lib/ui";

/**
 * Global "data reality" indicator. Honest by default:
 *  - demo OFF  → "Sin datos reales conectados · Modo demo desactivado"
 *  - demo ON   → "Modo demo activo (solo desarrollo)"
 * No backend is connected yet, so we never claim "datos reales conectados".
 */
export default function DataStatus({ compact = false }: { compact?: boolean }) {
  const demo = useDemoMode();

  if (demo) {
    return (
      <div className={`flex items-center gap-2.5 rounded-xl ${compact ? "px-3 py-2" : "px-4 py-3"}`} style={{ backgroundColor: "rgba(240,195,106,0.10)", border: `1px solid rgba(240,195,106,0.3)` }}>
        <FlaskConical className="w-4 h-4 shrink-0" style={{ color: A.alert }} />
        <div className="min-w-0">
          <div className="font-display font-semibold text-xs" style={{ color: A.alert }}>Modo demo activo · solo desarrollo</div>
          {!compact && <div className="text-[11px]" style={{ color: A.text2 }}>Los datos visibles son de muestra. Desactívalo en Configuración → Setup antes de operar con datos reales.</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 rounded-xl ${compact ? "px-3 py-2" : "px-4 py-3"}`} style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
      <Database className="w-4 h-4 shrink-0" style={{ color: A.textDim }} />
      <div className="min-w-0">
        <div className="font-display font-semibold text-xs" style={{ color: A.text }}>Sin datos reales conectados</div>
        {!compact && <div className="text-[11px]" style={{ color: A.textDim }}>Modo demo desactivado. La información se guarda localmente en este navegador hasta conectar una base de datos.</div>}
      </div>
    </div>
  );
}
