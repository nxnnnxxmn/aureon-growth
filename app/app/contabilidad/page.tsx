"use client";

import { ArrowDownLeft, ArrowUpRight, Calculator } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, StatCard, Panel, EmptyState } from "@/components/app/primitives";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Invoice, Expense, Client } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const INCOME_CATS = ["Retainers", "Proyectos únicos", "Diagnósticos", "Automatización", "Consultoría", "Desarrollo web", "Performance", "Branding"];
const EXPENSE_CATS = ["Software", "Publicidad interna", "Freelancers", "Nómina/equipo", "Herramientas IA", "Hosting", "Diseño", "Operación", "Transporte", "Impuestos por revisar", "Otros"];

export default function ContabilidadPage() {
  const [invoices] = useStore<Invoice>(STORE_KEYS.invoices);
  const [expenses] = useStore<Expense>(STORE_KEYS.expenses);
  const [clients] = useStore<Client>(STORE_KEYS.clients);
  const clientName = (id: string) => clients.find((c) => c.id === id)?.company || id;

  const income = invoices.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expense = expenses.reduce((s, e) => s + e.value, 0);
  const utility = income - expense;
  const margin = income > 0 ? Math.round((utility / income) * 100) : 0;
  const ar = invoices.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const ap = expenses.filter((e) => e.status === "Pendiente").reduce((s, e) => s + e.value, 0);
  const hasData = invoices.length > 0 || expenses.length > 0;
  const src = hasData ? "manual" : "sin-datos";

  return (
    <AppShell>
      <AppPageHeader
        title="Contabilidad"
        subtitle="Contabilidad administrativa interna. Validar con contador antes de usar para declaraciones, reportes tributarios o decisiones legales."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Contabilidad" }]}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Ingresos" value={money(income)} sub="Facturas pagadas" icon={ArrowDownLeft} accent="positive" source={src} />
        <StatCard label="Gastos" value={money(expense)} sub="Egresos registrados" icon={ArrowUpRight} accent="alert" source={src} />
        <StatCard label="Utilidad" value={money(utility)} sub={`Margen ${margin}%`} accent={utility >= 0 ? "positive" : "alert"} source={src} />
        <StatCard label="Flujo neto" value={money(utility)} sub="Ingresos − gastos" accent="gold" source={src} />
      </section>

      {!hasData ? (
        <EmptyState
          icon={Calculator}
          title="No hay movimientos contables registrados"
          hint="Registra ingresos (facturas pagadas) y egresos (gastos) reales para construir reportes contables. Esta contabilidad es administrativa interna; no reemplaza a un contador."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Panel title="Categorías · Ingresos"><ul className="space-y-2 text-sm">{INCOME_CATS.map((c) => (<li key={c} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{c}</span><span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span></li>))}</ul></Panel>
            <Panel title="Categorías · Gastos"><ul className="space-y-2 text-sm">{EXPENSE_CATS.map((c) => (<li key={c} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{c}</span><span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span></li>))}</ul></Panel>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Panel title={`Cuentas por cobrar · ${money(ar)}`}>
              <ul className="space-y-2 text-sm">
                {invoices.filter((i) => ["Enviada", "Vencida"].includes(i.status)).map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span className="font-mono text-xs" style={{ color: A.gold }}>{i.number}</span><span style={{ color: A.text }}>{clientName(i.clientId)}</span><span className="font-mono text-xs" style={{ color: A.text }}>{money(i.total)}</span></li>
                ))}
                {invoices.filter((i) => ["Enviada", "Vencida"].includes(i.status)).length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin cuentas por cobrar.</li>}
              </ul>
            </Panel>
            <Panel title={`Cuentas por pagar · ${money(ap)}`}>
              <ul className="space-y-2 text-sm">
                {expenses.filter((e) => e.status !== "Pagado").map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span className="text-xs" style={{ color: A.text2 }}>{e.vendor}</span><span className="font-mono text-xs" style={{ color: A.text }}>{money(e.value)}</span><span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.alert }}>{e.status}</span></li>
                ))}
                {expenses.filter((e) => e.status !== "Pagado").length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin cuentas por pagar.</li>}
              </ul>
            </Panel>
          </div>
        </>
      )}
    </AppShell>
  );
}
