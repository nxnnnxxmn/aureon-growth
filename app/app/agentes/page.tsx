"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Search, Sparkles } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatusBadge } from "@/components/app/primitives";
import { AGENTS } from "@/lib/internal/agents";
import { A } from "@/lib/ui";

export default function AgentesPage() {
  const [q, setQ] = useState("");
  const filtered = AGENTS.filter((a) => !q || [a.name, a.specialty, a.description].some((s) => s.toLowerCase().includes(q.toLowerCase())));

  return (
    <AppShell>
      <AppPageHeader
        title="Centro de Agentes"
        subtitle="24 agentes internos profesionales por servicio. Estructura preparada para conectar LLM."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Agentes" }]}
        actions={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: A.textDim }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar agente…" className="pl-9 pr-3 py-2 rounded-lg text-sm outline-none" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}`, color: A.text }} />
          </div>
        }
      />

      <Panel title={`Catálogo (${filtered.length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((a) => (
            <Link key={a.id} href={`/app/agentes/${a.id}`} className="card-3d p-4 rounded-xl flex flex-col" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div className="flex items-start justify-between mb-3">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})` }}>
                  <Bot className="w-4 h-4" style={{ color: A.bg }} />
                </span>
                <StatusBadge status={a.status === "Disponible" ? "Activo" : a.status === "Requiere integración IA" ? "En revisión" : "Borrador"} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: A.gold }}>{a.id}</div>
              <h3 className="font-display font-semibold text-sm leading-tight mb-2" style={{ color: A.text }}>{a.name}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: A.text2 }}>{a.description}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t font-mono text-[10px] uppercase tracking-[0.14em]" style={{ borderColor: A.border, color: A.textDim }}>
                <span>{a.relatedServices.length} servicios</span>
                <span className="inline-flex items-center gap-1" style={{ color: A.gold }}><Sparkles className="w-3 h-3" /> Abrir</span>
              </div>
            </Link>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
