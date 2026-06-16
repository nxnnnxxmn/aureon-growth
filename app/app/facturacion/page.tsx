"use client";

import { useMemo, useState } from "react";
import { Plus, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, DataTable, StatusBadge, StatCard, Panel } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { INVOICES, CLIENTS } from "@/lib/internal/mock-data";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Invoice, InvoiceStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (InvoiceStatus | "Todas")[] = ["Todas", "Borrador", "Emitida", "Enviada", "Pagada", "Vencida", "Anulada"];
const PAYMENTS: Invoice["paymentMethod"][] = ["Transferencia", "PSE", "Tarjeta", "Wise", "Stripe", "Otro"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

const empty: Omit<Invoice, "id"> = {
  number: "", clientId: CLIENTS[0]?.id || "", concept: "",
  issueDate: new Date().toISOString().slice(0, 10), dueDate: "",
  subtotal: 0, taxes: 0, total: 0, status: "Borrador", paymentMethod: "Transferencia",
};

export default function FacturacionPage() {
  const [filter, setFilter] = useState<InvoiceStatus | "Todas">("Todas");
  const [items, setItems] = useStore<Invoice>(STORE_KEYS.invoices);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Invoice, "id">>(empty);

  const filtered = useMemo(() => (filter === "Todas" ? items : items.filter((i) => i.status === filter)), [filter, items]);
  const total = items.reduce((s, i) => s + i.total, 0);
  const paid = items.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const receivable = items.filter((i) => ["Enviada", "Vencida", "Emitida"].includes(i.status)).reduce((s, i) => s + i.total, 0);

  function markPaid(id: string) { setItems((arr) => arr.map((i) => (i.id === id ? { ...i, status: "Pagada" } : i))); }

  function create() {
    const id = `I-${700 + items.length + 1}`;
    const number = draft.number || `INV-${String(items.length + 41).padStart(4, "0")}`;
    const total = (Number(draft.subtotal) || 0) + (Number(draft.taxes) || 0);
    setItems((arr) => [{ id, ...draft, number, total }, ...arr]);
    setModalOpen(false);
    setDraft(empty);
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Facturación"
        subtitle="Control administrativo interno. No constituye facturación electrónica oficial."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Facturación" }]}
        actions={<Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nueva factura</Button>}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total emitido" value={money(total)} sub={`${items.length} facturas`} accent="gold" />
        <StatCard label="Cobrado" value={money(paid)} sub="Pagadas" accent="positive" />
        <StatCard label="Por cobrar" value={money(receivable)} sub="Enviadas + vencidas" accent="alert" />
        <StatCard label="Vencidas" value={items.filter((i) => i.status === "Vencida").length} sub="Requieren cobro" accent="alert" />
      </section>

      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={STATUSES.map((s) => ({ value: s, label: s }))} /></div>

      <DataTable
        rows={filtered}
        columns={[
          { key: "number", label: "Número", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.number}</span> },
          { key: "clientId", label: "Cliente", render: (r) => clientName(r.clientId) },
          { key: "concept", label: "Concepto" },
          { key: "issueDate", label: "Emisión", render: (r) => <span className="font-mono text-xs">{r.issueDate}</span> },
          { key: "dueDate", label: "Vence", render: (r) => <span className="font-mono text-xs">{r.dueDate}</span> },
          { key: "total", label: "Total", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.total)}</span> },
          { key: "paymentMethod", label: "Método", render: (r) => <span className="text-xs">{r.paymentMethod || "—"}</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", label: "Acción", render: (r) => r.status !== "Pagada" ? (
            <button onClick={() => markPaid(r.id)} className="px-2.5 py-1 rounded-full text-[10px] font-display font-semibold focus-ring" style={{ backgroundColor: "rgba(126,226,168,0.14)", color: A.positive, border: `1px solid ${A.border}` }}>Marcar pagada</button>
          ) : <span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span> },
        ]}
      />

      <Panel title="Cuentas por cobrar" className="mt-6">
        <ul className="space-y-2">
          {items.filter((i) => ["Enviada", "Vencida"].includes(i.status)).map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-4 py-2.5" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <span className="font-mono text-xs" style={{ color: A.gold }}>{i.number}</span>
              <span className="text-sm flex-1 px-3" style={{ color: A.text }}>{clientName(i.clientId)}</span>
              <span className="font-mono text-xs tabular-nums" style={{ color: A.text }}>{money(i.total)}</span>
              <StatusBadge status={i.status} />
            </li>
          ))}
        </ul>
      </Panel>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva factura" size="lg"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Número interno" hint="Opcional, se autogenera si lo dejas vacío"><input className={inputClass} style={inputStyle} value={draft.number} onChange={(e) => setDraft({ ...draft, number: e.target.value })} placeholder="INV-0050" /></FormField>
          <FormField label="Cliente"><select className={inputClass} style={inputStyle} value={draft.clientId} onChange={(e) => setDraft({ ...draft, clientId: e.target.value })}>{CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></FormField>
          <div className="sm:col-span-2"><FormField label="Concepto" required><input className={inputClass} style={inputStyle} value={draft.concept} onChange={(e) => setDraft({ ...draft, concept: e.target.value })} required /></FormField></div>
          <FormField label="Fecha emisión"><input type="date" className={inputClass} style={inputStyle} value={draft.issueDate} onChange={(e) => setDraft({ ...draft, issueDate: e.target.value })} /></FormField>
          <FormField label="Fecha vencimiento"><input type="date" className={inputClass} style={inputStyle} value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} /></FormField>
          <FormField label="Subtotal (USD)"><input type="number" className={inputClass} style={inputStyle} value={draft.subtotal} onChange={(e) => setDraft({ ...draft, subtotal: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Impuestos (USD)"><input type="number" className={inputClass} style={inputStyle} value={draft.taxes} onChange={(e) => setDraft({ ...draft, taxes: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as InvoiceStatus })}>{(["Borrador", "Emitida", "Enviada", "Pagada", "Vencida", "Anulada"] as InvoiceStatus[]).map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Método de pago"><select className={inputClass} style={inputStyle} value={draft.paymentMethod} onChange={(e) => setDraft({ ...draft, paymentMethod: e.target.value as Invoice["paymentMethod"] })}>{PAYMENTS.map((p) => <option key={p}>{p}</option>)}</select></FormField>
          <div className="sm:col-span-2"><FormField label="Notas"><textarea rows={2} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></FormField></div>
        </div>
        <div className="mt-4 rounded-lg px-3 py-2 text-xs flex justify-between" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text2 }}>
          <span>Total calculado</span>
          <span className="font-mono tabular-nums" style={{ color: A.gold }}>{money((Number(draft.subtotal) || 0) + (Number(draft.taxes) || 0))}</span>
        </div>
      </Modal>
    </AppShell>
  );
}
