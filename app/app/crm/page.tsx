"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, Table2, ArrowRight } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, StatusBadge, DataTable, Panel } from "@/components/app/primitives";
import { LEADS } from "@/lib/internal/mock-data";
import type { Lead, CrmStage } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STAGES: CrmStage[] = ["Nuevo lead", "Calificado", "Diagnóstico agendado", "Diagnóstico realizado", "Propuesta enviada", "Negociación", "Ganado", "Perdido", "Nurturing"];

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function CrmPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [filter, setFilter] = useState<string>("Todos");
  const [leads, setLeads] = useState<Lead[]>(LEADS);

  const services = useMemo(() => Array.from(new Set(leads.map((l) => l.service))), [leads]);
  const filtered = useMemo(() => leads.filter((l) => filter === "Todos" || l.service === filter), [filter, leads]);

  function moveStage(id: string, dir: 1 | -1) {
    setLeads((arr) => arr.map((l) => {
      if (l.id !== id) return l;
      const idx = STAGES.indexOf(l.stage);
      const next = Math.max(0, Math.min(STAGES.length - 1, idx + dir));
      return { ...l, stage: STAGES[next] };
    }));
  }

  const grouped = useMemo(() => {
    const map: Record<CrmStage, Lead[]> = {} as Record<CrmStage, Lead[]>;
    STAGES.forEach((s) => (map[s] = []));
    filtered.forEach((l) => map[l.stage].push(l));
    return map;
  }, [filtered]);

  const pipelineValue = filtered.filter((l) => !["Ganado", "Perdido"].includes(l.stage)).reduce((s, l) => s + l.value, 0);

  return (
    <AppShell>
      <AppPageHeader
        title="CRM · Pipeline comercial"
        subtitle={`Valor en pipeline (excl. cerrados): ${money(pipelineValue)} · Mock interno.`}
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "CRM" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("kanban")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "kanban" ? A.gold : "transparent", color: view === "kanban" ? A.bg : A.text2 }}>
                <LayoutGrid className="w-3.5 h-3.5" /> Kanban
              </button>
              <button onClick={() => setView("table")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "table" ? A.gold : "transparent", color: view === "table" ? A.bg : A.text2 }}>
                <Table2 className="w-3.5 h-3.5" /> Tabla
              </button>
            </div>
            <Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo lead</Button>
          </>
        }
      />

      <div className="mb-4">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[{ value: "Todos", label: "Todos" }, ...services.map((s) => ({ value: s, label: s }))]}
        />
      </div>

      {view === "kanban" ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {STAGES.map((stage) => (
              <div key={stage} className="w-[280px] shrink-0">
                <Panel title={stage} action={<span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{grouped[stage].length}</span>}>
                  <ul className="space-y-2.5">
                    {grouped[stage].length === 0 && <li className="text-xs" style={{ color: A.textDim }}>—</li>}
                    {grouped[stage].map((l) => (
                      <li key={l.id} className="card-3d p-3 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{l.company}</div>
                          <span className="font-mono text-[10px] tabular-nums" style={{ color: A.gold }}>{money(l.value)}</span>
                        </div>
                        <div className="text-xs truncate" style={{ color: A.text2 }}>{l.contact}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mt-2" style={{ color: A.textDim }}>{l.service}</div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: A.border }}>
                          <span className="text-[10px]" style={{ color: A.text2 }}>{l.probability}% prob · {l.owner}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => moveStage(l.id, -1)} className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: A.text2 }}>←</button>
                            <button onClick={() => moveStage(l.id, 1)} className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "rgba(214,180,106,0.14)", color: A.gold }}>→</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          rows={filtered}
          columns={[
            { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
            { key: "contact", label: "Contacto", render: (r) => (<div><div className="font-display font-semibold text-sm">{r.contact}</div><div className="text-xs" style={{ color: A.textDim }}>{r.company}</div></div>) },
            { key: "service", label: "Servicio" },
            { key: "stage", label: "Etapa", render: (r) => <StatusBadge status={r.stage} /> },
            { key: "probability", label: "Prob.", render: (r) => <span className="font-mono text-xs">{r.probability}%</span> },
            { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
            { key: "nextAction", label: "Próx. acción", render: (r) => <span className="text-xs">{r.nextAction}</span> },
            { key: "owner", label: "Owner" },
          ]}
        />
      )}

      <Panel title="Atajos" className="mt-6">
        <div className="flex flex-wrap gap-2">
          <a href="/app/solicitudes" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}>Solicitudes <ArrowRight className="w-3 h-3" /></a>
          <a href="/app/propuestas" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}>Propuestas <ArrowRight className="w-3 h-3" /></a>
          <a href="/app/clientes" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}>Clientes <ArrowRight className="w-3 h-3" /></a>
        </div>
      </Panel>
    </AppShell>
  );
}
