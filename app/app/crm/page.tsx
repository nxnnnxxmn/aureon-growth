"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, Table2, ArrowRight, GripVertical, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, StatusBadge, DataTable, Panel } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { LEADS } from "@/lib/internal/mock-data";
import { useLocal } from "@/lib/internal/storage";
import type { Lead, CrmStage, RequestSource } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STAGES: CrmStage[] = ["Nuevo lead", "Calificado", "Diagnóstico agendado", "Diagnóstico realizado", "Propuesta enviada", "Negociación", "Ganado", "Perdido", "Nurturing"];
const SOURCES: RequestSource[] = ["Diagnóstico web", "WhatsApp", "Email", "Referido", "Campaña", "LinkedIn", "Instagram"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const emptyLead: Omit<Lead, "id"> = {
  contact: "", company: "", email: "", phone: "",
  source: "Diagnóstico web", service: "Brand Authority System",
  budget: "Empresa en crecimiento", pain: "",
  stage: "Nuevo lead", probability: 25, value: 0,
  nextAction: "", owner: "Juan L.",
};

export default function CrmPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [filter, setFilter] = useState<string>("Todos");
  const [leads, setLeads] = useLocal<Lead[]>("aureon_leads_v1", LEADS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<CrmStage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Lead, "id">>(emptyLead);

  const services = useMemo(() => Array.from(new Set(leads.map((l) => l.service))), [leads]);
  const filtered = useMemo(() => leads.filter((l) => filter === "Todos" || l.service === filter), [filter, leads]);

  const grouped = useMemo(() => {
    const map: Record<CrmStage, Lead[]> = {} as Record<CrmStage, Lead[]>;
    STAGES.forEach((s) => (map[s] = []));
    filtered.forEach((l) => map[l.stage].push(l));
    return map;
  }, [filtered]);

  const pipelineValue = filtered.filter((l) => !["Ganado", "Perdido"].includes(l.stage)).reduce((s, l) => s + l.value, 0);

  function moveTo(id: string, stage: CrmStage) {
    setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, stage, probability: stage === "Ganado" ? 100 : stage === "Perdido" ? 0 : l.probability } : l)));
  }

  function moveStage(id: string, dir: 1 | -1) {
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    const idx = STAGES.indexOf(lead.stage);
    moveTo(id, STAGES[Math.max(0, Math.min(STAGES.length - 1, idx + dir))]);
  }

  function createLead() {
    const id = `L-${1000 + leads.length + 1}`;
    setLeads((arr) => [{ id, ...draft }, ...arr]);
    setModalOpen(false);
    setDraft(emptyLead);
  }

  return (
    <AppShell>
      <AppPageHeader
        title="CRM · Pipeline comercial"
        subtitle={`Valor en pipeline (excl. cerrados): ${money(pipelineValue)} · arrastra las cards entre columnas.`}
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
            <Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo lead</Button>
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
            {STAGES.map((stage) => {
              const isTarget = dragOverStage === stage;
              return (
                <div key={stage} className="w-[280px] shrink-0"
                  onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage); }}
                  onDragLeave={() => setDragOverStage((s) => (s === stage ? null : s))}
                  onDrop={(e) => { e.preventDefault(); if (draggingId) moveTo(draggingId, stage); setDraggingId(null); setDragOverStage(null); }}
                >
                  <Panel title={stage} action={<span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{grouped[stage].length}</span>}>
                    <div className="min-h-[80px] rounded-lg transition-colors" style={{ outline: isTarget ? `2px dashed ${A.gold}` : "none", outlineOffset: 4 }}>
                      <ul className="space-y-2.5">
                        {grouped[stage].length === 0 && <li className="text-xs px-1 py-2" style={{ color: A.textDim }}>—</li>}
                        {grouped[stage].map((l) => (
                          <li key={l.id} draggable
                            onDragStart={() => setDraggingId(l.id)}
                            onDragEnd={() => { setDraggingId(null); setDragOverStage(null); }}
                            className="card-3d p-3 rounded-xl cursor-grab active:cursor-grabbing"
                            style={{ backgroundColor: A.bg2, border: `1px solid ${draggingId === l.id ? A.gold : A.border}`, opacity: draggingId === l.id ? 0.6 : 1 }}>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="font-display font-semibold text-sm truncate flex items-center gap-1.5" style={{ color: A.text }}>
                                <GripVertical className="w-3.5 h-3.5 opacity-50" />{l.company}
                              </div>
                              <span className="font-mono text-[10px] tabular-nums" style={{ color: A.gold }}>{money(l.value)}</span>
                            </div>
                            <div className="text-xs truncate pl-5" style={{ color: A.text2 }}>{l.contact}</div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.14em] mt-2 pl-5" style={{ color: A.textDim }}>{l.service}</div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t pl-5" style={{ borderColor: A.border }}>
                              <span className="text-[10px]" style={{ color: A.text2 }}>{l.probability}% · {l.owner}</span>
                              <div className="flex items-center gap-1">
                                <button onClick={() => moveStage(l.id, -1)} className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: A.text2 }} aria-label="Etapa anterior">←</button>
                                <button onClick={() => moveStage(l.id, 1)} className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: "rgba(214,180,106,0.14)", color: A.gold }} aria-label="Etapa siguiente">→</button>
                              </div>
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

      {/* New lead modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo lead"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={createLead}><Save className="w-3.5 h-3.5" /> Guardar</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Contacto" required>
            <input className={inputClass} style={inputStyle} value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} required />
          </FormField>
          <FormField label="Empresa" required>
            <input className={inputClass} style={inputStyle} value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} required />
          </FormField>
          <FormField label="Email" required>
            <input type="email" className={inputClass} style={inputStyle} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} required />
          </FormField>
          <FormField label="Teléfono" required>
            <input className={inputClass} style={inputStyle} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} required />
          </FormField>
          <FormField label="Servicio">
            <select className={inputClass} style={inputStyle} value={draft.service} onChange={(e) => setDraft({ ...draft, service: e.target.value })}>
              {["Brand Authority System", "Acquisition Engine", "Revenue Automation", "Growth Intelligence", "Sistema integral"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Fuente">
            <select className={inputClass} style={inputStyle} value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value as RequestSource })}>
              {SOURCES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Etapa">
            <select className={inputClass} style={inputStyle} value={draft.stage} onChange={(e) => setDraft({ ...draft, stage: e.target.value as CrmStage })}>
              {STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Presupuesto / etapa">
            <select className={inputClass} style={inputStyle} value={draft.budget} onChange={(e) => setDraft({ ...draft, budget: e.target.value })}>
              {["Idea / etapa temprana", "Empresa en crecimiento", "Empresa consolidada", "Lo definimos en el diagnóstico"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Valor estimado (USD)">
            <input type="number" className={inputClass} style={inputStyle} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) || 0 })} />
          </FormField>
          <FormField label="Probabilidad (%)">
            <input type="number" min={0} max={100} className={inputClass} style={inputStyle} value={draft.probability} onChange={(e) => setDraft({ ...draft, probability: Number(e.target.value) || 0 })} />
          </FormField>
          <FormField label="Responsable">
            <input className={inputClass} style={inputStyle} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
          </FormField>
          <FormField label="Próxima acción">
            <input className={inputClass} style={inputStyle} value={draft.nextAction} onChange={(e) => setDraft({ ...draft, nextAction: e.target.value })} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Dolor principal">
              <textarea rows={3} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.pain} onChange={(e) => setDraft({ ...draft, pain: e.target.value })} />
            </FormField>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
