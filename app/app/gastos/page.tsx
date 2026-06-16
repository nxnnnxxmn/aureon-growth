"use client";

import { useState } from "react";
import { Plus, Repeat, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, DataTable, StatusBadge, FilterChips, StatCard } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { EXPENSES } from "@/lib/internal/mock-data";
import { useLocal } from "@/lib/internal/storage";
import type { Expense, ExpenseStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (ExpenseStatus | "Todos")[] = ["Todos", "Pendiente", "Pagado", "Recurrente", "En revisión"];
const CATEGORIES = ["Software", "Publicidad interna", "Freelancers", "Nómina/equipo", "Herramientas IA", "Hosting", "Diseño", "Operación", "Transporte", "Impuestos por revisar", "Otros"];
const PAYMENTS = ["Transferencia", "PSE", "Tarjeta", "Wise", "Stripe", "Efectivo", "Otro"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const empty: Omit<Expense, "id"> = {
  date: new Date().toISOString().slice(0, 10), vendor: "", category: CATEGORIES[0], concept: "",
  value: 0, paymentMethod: "Tarjeta", status: "Pendiente", recurrent: false,
};

export default function GastosPage() {
  const [filter, setFilter] = useState<ExpenseStatus | "Todos">("Todos");
  const [items, setItems] = useLocal<Expense[]>("aureon_expenses_v1", EXPENSES);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Expense, "id">>(empty);

  const filtered = filter === "Todos" ? items : items.filter((e) => e.status === filter);
  const total = items.reduce((s, e) => s + e.value, 0);
  const recurring = items.filter((e) => e.recurrent).reduce((s, e) => s + e.value, 0);

  function create() {
    const id = `E-${800 + items.length + 1}`;
    setItems((arr) => [{ id, ...draft }, ...arr]);
    setModalOpen(false);
    setDraft(empty);
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Gastos"
        subtitle="Gastos operativos, proveedores y suscripciones recurrentes."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Gastos" }]}
        actions={<Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo gasto</Button>}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total mes" value={money(total)} sub={`${items.length} registros`} accent="gold" />
        <StatCard label="Recurrentes" value={money(recurring)} sub="Suscripciones" icon={Repeat} accent="blue" />
        <StatCard label="Pendientes" value={items.filter((e) => e.status === "Pendiente").length} sub="Por pagar" accent="alert" />
        <StatCard label="En revisión" value={items.filter((e) => e.status === "En revisión").length} sub="Validar contador" accent="violet" />
      </section>

      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={STATUSES.map((s) => ({ value: s, label: s }))} /></div>

      <DataTable
        rows={filtered}
        columns={[
          { key: "date", label: "Fecha", render: (r) => <span className="font-mono text-xs">{r.date}</span> },
          { key: "vendor", label: "Proveedor" },
          { key: "category", label: "Categoría", render: (r) => <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.violet }}>{r.category}</span> },
          { key: "concept", label: "Concepto" },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
          { key: "paymentMethod", label: "Método", render: (r) => <span className="text-xs">{r.paymentMethod}</span> },
          { key: "recurrent", label: "Recurrente", render: (r) => r.recurrent ? <Repeat className="w-3.5 h-3.5" style={{ color: A.blue }} /> : <span className="text-xs" style={{ color: A.textDim }}>—</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo gasto" size="md"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Guardar</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Fecha"><input type="date" className={inputClass} style={inputStyle} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></FormField>
          <FormField label="Proveedor" required><input className={inputClass} style={inputStyle} value={draft.vendor} onChange={(e) => setDraft({ ...draft, vendor: e.target.value })} required /></FormField>
          <FormField label="Categoría"><select className={inputClass} style={inputStyle} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></FormField>
          <FormField label="Concepto" required><input className={inputClass} style={inputStyle} value={draft.concept} onChange={(e) => setDraft({ ...draft, concept: e.target.value })} required /></FormField>
          <FormField label="Valor (USD)" required><input type="number" className={inputClass} style={inputStyle} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) || 0 })} required /></FormField>
          <FormField label="Método de pago"><select className={inputClass} style={inputStyle} value={draft.paymentMethod} onChange={(e) => setDraft({ ...draft, paymentMethod: e.target.value })}>{PAYMENTS.map((p) => <option key={p}>{p}</option>)}</select></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ExpenseStatus })}>{(["Pendiente", "Pagado", "Recurrente", "En revisión"] as ExpenseStatus[]).map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <label className="flex items-center gap-2 mt-6">
            <input type="checkbox" checked={draft.recurrent} onChange={(e) => setDraft({ ...draft, recurrent: e.target.checked })} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.text2 }}>Es recurrente</span>
          </label>
          <div className="sm:col-span-2"><FormField label="Notas"><textarea rows={2} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></FormField></div>
        </div>
      </Modal>
    </AppShell>
  );
}
