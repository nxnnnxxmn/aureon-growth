"use client";

import { LineChart } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, StatCard, Panel, EmptyState, MiniBars } from "@/components/app/primitives";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Invoice, Expense, Project, Client } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function FinanzasPage() {
  const [invoices] = useStore<Invoice>(STORE_KEYS.invoices);
  const [expenses] = useStore<Expense>(STORE_KEYS.expenses);
  const [projects] = useStore<Project>(STORE_KEYS.projects);
  const [clients] = useStore<Client>(STORE_KEYS.clients);
  const clientName = (id: string) => clients.find((c) => c.id === id)?.company || id;

  const income = invoices.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expense = expenses.reduce((s, e) => s + e.value, 0);
  const utility = income - expense;
  const margin = income > 0 ? Math.round((utility / income) * 100) : 0;
  const ar = invoices.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const ap = expenses.filter((e) => e.status === "Pendiente").reduce((s, e) => s + e.value, 0);
  const recurring = expenses.filter((e) => e.recurrent).reduce((s, e) => s + e.value, 0);
  const hasData = invoices.length > 0 || expenses.length > 0;
  const src = hasData ? "manual" : "sin-datos";

  return (
    <AppShell>
      <AppPageHeader
        title="Finanzas"
        subtitle="Dashboard financiero interno basado en datos registrados en el sistema. Los KPIs aparecen cuando existan ingresos, gastos, facturas y pagos reales."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Finanzas" }]}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Ingresos" value={money(income)} sub="Facturas pagadas" accent="positive" source={src} />
        <StatCard label="Gastos" value={money(expense)} sub="Egresos" accent="alert" source={src} />
        <StatCard label="Utilidad" value={money(utility)} sub={`Margen ${margin}%`} accent="gold" source={src} />
        <StatCard label="Flujo neto" value={money(utility)} sub="Estimado" accent={utility >= 0 ? "positive" : "alert"} source={src} />
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Por cobrar" value={money(ar)} sub="AR pendiente" accent="gold" source={src} />
        <StatCard label="Por pagar" value={money(ap)} sub="AP pendiente" accent="violet" source={src} />
        <StatCard label="Gastos recurrentes" value={money(recurring)} sub="Suscripciones" accent="blue" source={src} />
        <StatCard label="Presupuesto mes" value={money(0)} sub="Configurar meta" accent="gold" source="pendiente" />
      </section>

      {!hasData ? (
        <EmptyState
          icon={LineChart}
          title="No hay información financiera real"
          hint="Los KPIs financieros aparecerán cuando existan ingresos, gastos, facturas y pagos registrados. Registra tu primera factura o gasto para empezar."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Panel title="Ingresos vs gastos" className="lg:col-span-2"><MiniBars data={[income / 1000 || 0, expense / 1000 || 0, utility / 1000 || 0]} color={A.gold} /><div className="font-mono text-[10px] uppercase tracking-[0.16em] mt-3" style={{ color: A.textDim }}>Ingresos · Gastos · Utilidad (miles USD) · datos registrados</div></Panel>
            <Panel title="Rentabilidad por proyecto">
              <ul className="space-y-2 text-sm">
                {projects.length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin proyectos registrados.</li>}
                {projects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{p.name}</span><span className="font-mono text-xs" style={{ color: A.gold }}>{money(p.budget)}</span></li>
                ))}
              </ul>
            </Panel>
          </div>
          <p className="text-xs mt-4" style={{ color: A.textDim }}>Forecast y punto de equilibrio se habilitan cuando haya suficiente histórico de ingresos y gastos. Rentabilidad por cliente: {clients.length} clientes registrados.</p>
        </>
      )}
    </AppShell>
  );
}
