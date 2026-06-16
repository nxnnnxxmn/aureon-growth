"use client";

import { useState } from "react";
import { Plus, Repeat } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, DataTable, StatusBadge, FilterChips, StatCard } from "@/components/app/primitives";
import { EXPENSES } from "@/lib/internal/mock-data";
import type { ExpenseStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (ExpenseStatus | "Todos")[] = ["Todos", "Pendiente", "Pagado", "Recurrente", "En revisión"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function GastosPage() {
  const [filter, setFilter] = useState<ExpenseStatus | "Todos">("Todos");
  const filtered = filter === "Todos" ? EXPENSES : EXPENSES.filter((e) => e.status === filter);

  const total = EXPENSES.reduce((s, e) => s + e.value, 0);
  const recurring = EXPENSES.filter((e) => e.recurrent).reduce((s, e) => s + e.value, 0);

  return (
    <AppShell>
      <AppPageHeader
        title="Gastos"
        subtitle="Gastos operativos, proveedores y suscripciones recurrentes."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Gastos" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo gasto</Button>}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total mes" value={money(total)} sub={`${EXPENSES.length} registros`} accent="gold" />
        <StatCard label="Recurrentes" value={money(recurring)} sub="Suscripciones" icon={Repeat} accent="blue" />
        <StatCard label="Pendientes" value={EXPENSES.filter((e) => e.status === "Pendiente").length} sub="Por pagar" accent="alert" />
        <StatCard label="En revisión" value={EXPENSES.filter((e) => e.status === "En revisión").length} sub="Validar contador" accent="violet" />
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
    </AppShell>
  );
}
