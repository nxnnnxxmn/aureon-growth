"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, Table2, Check, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, StatusBadge, DataTable, Panel, PriorityBadge } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { PROJECTS, CLIENTS } from "@/lib/internal/mock-data";
import { useLocal } from "@/lib/internal/storage";
import type { Project, ProjectStatus, Priority } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STAGES: ProjectStatus[] = ["Backlog", "Planeación", "En progreso", "En revisión", "Esperando cliente", "Entregado", "Cerrado"];
const PRIORITIES: Priority[] = ["low", "medium", "high", "critical"];
const SERVICES = ["Brand Authority System", "Acquisition Engine", "Revenue Automation", "Growth Intelligence", "Sistema integral"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

const empty: Omit<Project, "id"> = {
  name: "", clientId: CLIENTS[0]?.id || "", service: SERVICES[0], owner: "Juan L.",
  startDate: new Date().toISOString().slice(0, 10), dueDate: "", priority: "medium", progress: 0,
  status: "Backlog", budget: 0, deliverables: [],
};

export default function ProyectosPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [projects, setProjects] = useLocal<Project[]>("aureon_projects_v1", PROJECTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Project, "id">>(empty);
  const [deliverablesText, setDeliverablesText] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<ProjectStatus | null>(null);

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
      const progress = dels.length ? Math.round((dels.filter((d) => d.done).length / dels.length) * 100) : p.progress;
      return { ...p, deliverables: dels, progress };
    }));
  }

  function moveTo(id: string, status: ProjectStatus) {
    setProjects((arr) => arr.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  function create() {
    const id = `P-${300 + projects.length + 1}`;
    const deliverables = deliverablesText.split("\n").map((t) => t.trim()).filter(Boolean).map((title) => ({ title, done: false }));
    setProjects((arr) => [{ id, ...draft, deliverables }, ...arr]);
    setModalOpen(false);
    setDraft(empty);
    setDeliverablesText("");
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Proyectos"
        subtitle="Trabajos activos por etapa, drag & drop entre columnas, checklist editable."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Proyectos" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("kanban")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "kanban" ? A.gold : "transparent", color: view === "kanban" ? A.bg : A.text2 }}><LayoutGrid className="w-3.5 h-3.5" /> Kanban</button>
              <button onClick={() => setView("table")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "table" ? A.gold : "transparent", color: view === "table" ? A.bg : A.text2 }}><Table2 className="w-3.5 h-3.5" /> Tabla</button>
            </div>
            <Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo proyecto</Button>
          </>
        }
      />

      {view === "kanban" ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {STAGES.map((stage) => {
              const isTarget = dragOver === stage;
              return (
                <div key={stage} className="w-[320px] shrink-0"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(stage); }}
                  onDragLeave={() => setDragOver((s) => (s === stage ? null : s))}
                  onDrop={(e) => { e.preventDefault(); if (dragId) moveTo(dragId, stage); setDragId(null); setDragOver(null); }}
                >
                  <Panel title={stage} action={<span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{grouped[stage].length}</span>}>
                    <div className="min-h-[80px] rounded-lg" style={{ outline: isTarget ? `2px dashed ${A.gold}` : "none", outlineOffset: 4 }}>
                      <ul className="space-y-3">
                        {grouped[stage].length === 0 && <li className="text-xs px-1 py-2" style={{ color: A.textDim }}>—</li>}
                        {grouped[stage].map((p) => (
                          <li key={p.id}
                            draggable
                            onDragStart={() => setDragId(p.id)}
                            onDragEnd={() => { setDragId(null); setDragOver(null); }}
                            className="card-3d p-3.5 rounded-xl cursor-grab active:cursor-grabbing"
                            style={{ backgroundColor: A.bg2, border: `1px solid ${dragId === p.id ? A.gold : A.border}`, opacity: dragId === p.id ? 0.6 : 1 }}>
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
                              <span>Entrega: {p.dueDate || "—"}</span><span style={{ color: A.gold }}>{money(p.budget)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Panel>
                </div>
              );
            })}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo proyecto" size="lg"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nombre" required><input className={inputClass} style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></FormField>
          <FormField label="Cliente"><select className={inputClass} style={inputStyle} value={draft.clientId} onChange={(e) => setDraft({ ...draft, clientId: e.target.value })}>{CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></FormField>
          <FormField label="Servicio"><select className={inputClass} style={inputStyle} value={draft.service} onChange={(e) => setDraft({ ...draft, service: e.target.value })}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Responsable"><input className={inputClass} style={inputStyle} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} /></FormField>
          <FormField label="Inicio"><input type="date" className={inputClass} style={inputStyle} value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} /></FormField>
          <FormField label="Entrega"><input type="date" className={inputClass} style={inputStyle} value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} /></FormField>
          <FormField label="Prioridad"><select className={inputClass} style={inputStyle} value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value as Priority })}>{PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}</select></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ProjectStatus })}>{STAGES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Presupuesto (USD)"><input type="number" className={inputClass} style={inputStyle} value={draft.budget} onChange={(e) => setDraft({ ...draft, budget: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Progreso inicial (%)"><input type="number" min={0} max={100} className={inputClass} style={inputStyle} value={draft.progress} onChange={(e) => setDraft({ ...draft, progress: Number(e.target.value) || 0 })} /></FormField>
          <div className="sm:col-span-2">
            <FormField label="Entregables (uno por línea)" hint="Cada línea genera un ítem en la checklist.">
              <textarea rows={4} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={deliverablesText} onChange={(e) => setDeliverablesText(e.target.value)} placeholder="Plan de medios&#10;Landing optimizada&#10;Setup tracking" />
            </FormField>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
