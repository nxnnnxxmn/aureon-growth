"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, DataTable, StatusBadge, StatCard, Panel } from "@/components/app/primitives";
import { INVOICES, CLIENTS } from "@/lib/internal/mock-data";
import type { Invoice, InvoiceStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (InvoiceStatus | "Todas")[] = ["Todas", "Borrador", "Emitida", "Enviada", "Pagada", "Vencida", "Anulada"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function FacturacionPage() {
  const [filter, setFilter] = useState<InvoiceStatus | "Todas">("Todas");
  const [items, setItems] = useState<Invoice[]>(INVOICES);
  const filtered = useMemo(() => (filter === "Todas" ? items : items.filter((i) => i.status === filter)), [filter, items]);

  const total = items.reduce((s, i) => s + i.total, 0);
  const paid = items.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const receivable = items.filter((i) => ["Enviada", "Vencida", "Emitida"].includes(i.status)).reduce((s, i) => s + i.total, 0);

  function markPaid(id: string) { setItems((arr) => arr.map((i) => (i.id === id ? { ...i, status: "Pagada" } : i))); }

  return (
    <AppShell>
      <AppPageHeader
        title="Facturación"
        subtitle="Control administrativo interno. No constituye facturación electrónica oficial — se integra con un proveedor tributario en producción."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Facturación" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nueva factura</Button>}
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
    </AppShell>
  );
}
