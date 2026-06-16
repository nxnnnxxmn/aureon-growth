"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, Table2, Check } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, StatusBadge, DataTable, Panel, PriorityBadge } from "@/components/app/primitives";
import { PROJECTS, CLIENTS } from "@/lib/internal/mock-data";
import type { Project, ProjectStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STAGES: ProjectStatus[] = ["Backlog", "Planeación", "En progreso", "En revisión", "Esperando cliente", "Entregado", "Cerrado"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function ProyectosPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  const grouped = useMemo(() => {
    const map: Record<ProjectStatus, Project[]> = {} as Record<ProjectStatus, Project[]>;
    STAGES.forEach((s) => (map[s] = []));
    projects.forEach((p) => map[p.status].push(p));
    return map;
  }, [projects]);

  function toggleDeliverable(projectId: string, idx: number) {
    setProjects((arr) => arr.map((p) => {
      if (p.id !== projectId) return p;
      const dels = p.deliverables.map((d, i) => (i === idx ? { ...d, done: !d.done } : d));
      const progress = Math.round((dels.filter((d) => d.done).length / dels.length) * 100);
      return { ...p, deliverables: dels, progress };
    }));
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Proyectos"
        subtitle="Trabajos activos por etapa, con checklist de entregables y progreso."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Proyectos" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("kanban")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "kanban" ? A.gold : "transparent", color: view === "kanban" ? A.bg : A.text2 }}><LayoutGrid className="w-3.5 h-3.5" /> Kanban</button>
              <button onClick={() => setView("table")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "table" ? A.gold : "transparent", color: view === "table" ? A.bg : A.text2 }}><Table2 className="w-3.5 h-3.5" /> Tabla</button>
            </div>
            <Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo proyecto</Button>
          </>
        }
      />

      {view === "kanban" ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {STAGES.map((stage) => (
              <div key={stage} className="w-[320px] shrink-0">
                <Panel title={stage} action={<span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{grouped[stage].length}</span>}>
                  <ul className="space-y-3">
                    {grouped[stage].length === 0 && <li className="text-xs" style={{ color: A.textDim }}>—</li>}
                    {grouped[stage].map((p) => (
                      <li key={p.id} className="card-3d p-3.5 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{p.name}</div>
                          <PriorityBadge priority={p.priority} />
                        </div>
                        <div className="text-xs" style={{ color: A.text2 }}>{clientName(p.clientId)}</div>
                        <div className="h-1.5 rounded-full overflow-hidden mt-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${A.gold}, ${A.violet})` }} />
                        </div>
                        <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>
                          <span>{p.service}</span><span>{p.progress}%</span>
                        </div>
                        <ul className="mt-3 space-y-1">
                          {p.deliverables.map((d, i) => (
                            <li key={i}>
                              <button onClick={() => toggleDeliverable(p.id, i)} className="flex items-center gap-2 text-xs w-full text-left focus-ring rounded">
                                <span className="w-3.5 h-3.5 rounded flex items-center justify-center" style={{ backgroundColor: d.done ? A.gold : "transparent", border: `1px solid ${d.done ? A.gold : A.border}` }}>
                                  {d.done && <Check className="w-2.5 h-2.5" style={{ color: A.bg }} strokeWidth={3} />}
                                </span>
                                <span style={{ color: d.done ? A.textDim : A.text, textDecoration: d.done ? "line-through" : "none" }}>{d.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mt-3 pt-3 border-t flex justify-between" style={{ color: A.textDim, borderColor: A.border }}>
                          <span>Entrega: {p.dueDate}</span><span style={{ color: A.gold }}>{money(p.budget)}</span>
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
          rows={projects}
          columns={[
            { key: "name", label: "Proyecto", render: (r) => (<div><div className="font-display font-semibold text-sm">{r.name}</div><div className="text-xs" style={{ color: A.textDim }}>{clientName(r.clientId)}</div></div>) },
            { key: "service", label: "Servicio" },
            { key: "owner", label: "Owner" },
            { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
            { key: "progress", label: "Progreso", render: (r) => (
              <div className="w-24"><div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}><div className="h-full rounded-full" style={{ width: `${r.progress}%`, background: `linear-gradient(90deg, ${A.gold}, ${A.violet})` }} /></div><div className="text-[10px] mt-0.5" style={{ color: A.textDim }}>{r.progress}%</div></div>
            )},
            { key: "dueDate", label: "Entrega" },
            { key: "budget", label: "Presupuesto", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{money(r.budget)}</span> },
            { key: "priority", label: "Prioridad", render: (r) => <PriorityBadge priority={r.priority} /> },
          ]}
        />
      )}
    </AppShell>
  );
}
