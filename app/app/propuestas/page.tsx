"use client";

import { useState } from "react";
import { Plus, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, DataTable, StatusBadge, FilterChips } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { PROPOSALS, CLIENTS } from "@/lib/internal/mock-data";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Proposal, ProposalStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (ProposalStatus | "Todas")[] = ["Todas", "Borrador", "Enviada", "En revisión", "Aprobada", "Rechazada", "Vencida"];
const SERVICES = ["Brand Authority System", "Acquisition Engine", "Revenue Automation", "Growth Intelligence", "Sistema integral"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

const empty: Omit<Proposal, "id"> = {
  clientId: CLIENTS[0]?.id || "", service: SERVICES[0], value: 0,
  status: "Borrador", sentDate: "", dueDate: "", owner: "Juan L.", probability: 30, notes: "",
};

export default function PropuestasPage() {
  const [filter, setFilter] = useState<ProposalStatus | "Todas">("Todas");
  const [items, setItems] = useStore<Proposal>(STORE_KEYS.proposals);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Proposal, "id">>(empty);

  const filtered = filter === "Todas" ? items : items.filter((p) => p.status === filter);

  function create() {
    const id = `PR-${500 + items.length + 1}`;
    setItems((arr) => [{ id, ...draft }, ...arr]);
    setModalOpen(false);
    setDraft(empty);
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Propuestas"
        subtitle="Propuestas comerciales por etapa."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Propuestas" }]}
        actions={<Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nueva propuesta</Button>}
      />
      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={STATUSES.map((s) => ({ value: s, label: s }))} /></div>
      <DataTable
        rows={filtered}
        columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "clientId", label: "Cliente", render: (r) => <span className="text-sm">{clientName(r.clientId)}</span> },
          { key: "service", label: "Servicio" },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
          { key: "sentDate", label: "Enviada", render: (r) => <span className="font-mono text-xs">{r.sentDate || "—"}</span> },
          { key: "dueDate", label: "Vence", render: (r) => <span className="font-mono text-xs">{r.dueDate || "—"}</span> },
          { key: "probability", label: "Prob.", render: (r) => <span className="font-mono text-xs">{r.probability}%</span> },
          { key: "owner", label: "Owner" },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva propuesta" size="md"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cliente"><select className={inputClass} style={inputStyle} value={draft.clientId} onChange={(e) => setDraft({ ...draft, clientId: e.target.value })}>{CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></FormField>
          <FormField label="Servicio"><select className={inputClass} style={inputStyle} value={draft.service} onChange={(e) => setDraft({ ...draft, service: e.target.value })}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Valor (USD)" required><input type="number" className={inputClass} style={inputStyle} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) || 0 })} required /></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ProposalStatus })}>{(["Borrador", "Enviada", "En revisión", "Aprobada", "Rechazada", "Vencida"] as ProposalStatus[]).map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Fecha enviada"><input type="date" className={inputClass} style={inputStyle} value={draft.sentDate || ""} onChange={(e) => setDraft({ ...draft, sentDate: e.target.value })} /></FormField>
          <FormField label="Fecha vencimiento"><input type="date" className={inputClass} style={inputStyle} value={draft.dueDate || ""} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} /></FormField>
          <FormField label="Probabilidad (%)"><input type="number" min={0} max={100} className={inputClass} style={inputStyle} value={draft.probability} onChange={(e) => setDraft({ ...draft, probability: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Responsable"><input className={inputClass} style={inputStyle} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} /></FormField>
          <div className="sm:col-span-2"><FormField label="Notas"><textarea rows={2} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></FormField></div>
        </div>
      </Modal>
    </AppShell>
  );
}
