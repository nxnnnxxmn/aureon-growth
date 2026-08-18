"use client";

import { useState } from "react";
import { Plus, Save, Database, HardDrive } from "lucide-react";
import { AppPageHeader, Button, DataTable, StatusBadge } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { useContracts } from "@/lib/internal/contracts-store";
import { useClients } from "@/lib/internal/clients-store";
import type { Contract, ContractStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: ContractStatus[] = ["Borrador", "Enviado", "Firmado", "Activo", "Vencido", "Cancelado"];
const TYPES: Contract["type"][] = ["Retainer", "Proyecto", "Consultoría", "Sprint", "NDA"];
const RENEWALS: Contract["renewal"][] = ["Automática", "Manual", "No aplica"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const empty: Omit<Contract, "id"> = {
  clientId: "", type: "Retainer",
  startDate: new Date().toISOString().slice(0, 10), endDate: "",
  value: 0, status: "Borrador", renewal: "Manual",
};

export default function ContratosPage() {
  const { contracts: items, mode, create: createContract } = useContracts();
  const { clients } = useClients();
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Contract, "id">>(empty);

  const clientName = (id: string) => clients.find((c) => c.id === id)?.company || id;

  async function create() {
    const ok = await createContract(draft);
    if (!ok) return;
    setModalOpen(false);
    setDraft(empty);
  }

  return (
    <>
      <AppPageHeader
        title="Contratos"
        subtitle="Acuerdos comerciales, estados y vencimientos. La firma legal real se integra con un proveedor externo."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Contratos" }]}
        actions={<Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo contrato</Button>}
      />

      {/* Modo de persistencia: base de datos real vs. local (fallback) */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {mode === "db" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>
            <Database className="w-3 h-3" /> Base de datos conectada — sincroniza entre dispositivos
          </span>
        ) : mode === "local" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(240,195,106,0.10)", color: A.alert, border: `1px solid ${A.border}` }}>
            <HardDrive className="w-3 h-3" /> Guardado local — conecta Supabase para sincronizar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.textDim, border: `1px solid ${A.border}` }}>
            Cargando…
          </span>
        )}
      </div>

      <DataTable
        rows={items}
        columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "clientId", label: "Cliente", render: (r) => clientName(r.clientId) },
          { key: "type", label: "Tipo" },
          { key: "startDate", label: "Inicio", render: (r) => <span className="font-mono text-xs">{r.startDate}</span> },
          { key: "endDate", label: "Fin", render: (r) => <span className="font-mono text-xs">{r.endDate || "—"}</span> },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
          { key: "renewal", label: "Renovación", render: (r) => <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.text2 }}>{r.renewal}</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo contrato" size="md"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Cliente"><select className={inputClass} style={inputStyle} value={draft.clientId} onChange={(e) => setDraft({ ...draft, clientId: e.target.value })}><option value="">—</option>{clients.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></FormField>
          <FormField label="Tipo"><select className={inputClass} style={inputStyle} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Contract["type"] })}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></FormField>
          <FormField label="Inicio"><input type="date" className={inputClass} style={inputStyle} value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} /></FormField>
          <FormField label="Fin"><input type="date" className={inputClass} style={inputStyle} value={draft.endDate || ""} onChange={(e) => setDraft({ ...draft, endDate: e.target.value })} /></FormField>
          <FormField label="Valor (USD)" required><input type="number" className={inputClass} style={inputStyle} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) || 0 })} required /></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ContractStatus })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Renovación"><select className={inputClass} style={inputStyle} value={draft.renewal} onChange={(e) => setDraft({ ...draft, renewal: e.target.value as Contract["renewal"] })}>{RENEWALS.map((r) => <option key={r}>{r}</option>)}</select></FormField>
          <div className="sm:col-span-2"><FormField label="Notas"><textarea rows={2} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></FormField></div>
        </div>
      </Modal>
    </>
  );
}
