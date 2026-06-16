import AppShell from "@/components/app/AppShell";
import { AppPageHeader, StatCard, Panel, MiniBars } from "@/components/app/primitives";
import { INVOICES, EXPENSES, PROJECTS, CLIENTS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function FinanzasPage() {
  const monthIncome = INVOICES.filter((i) => i.issueDate.startsWith("2026-06") && i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const monthExpense = EXPENSES.filter((e) => e.date.startsWith("2026-06")).reduce((s, e) => s + e.value, 0);
  const utility = monthIncome - monthExpense;
  const margin = monthIncome > 0 ? Math.round((utility / monthIncome) * 100) : 0;
  const ar = INVOICES.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const ap = EXPENSES.filter((e) => e.status === "Pendiente").reduce((s, e) => s + e.value, 0);
  const recurring = EXPENSES.filter((e) => e.recurrent).reduce((s, e) => s + e.value, 0);

  const projectByMargin = [...PROJECTS].sort((a, b) => b.budget - a.budget);

  return (
    <AppShell>
      <AppPageHeader
        title="Finanzas"
        subtitle="Dashboard financiero ejecutivo. Mock interno claramente etiquetado."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Finanzas" }]}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Ingresos mes" value={money(monthIncome)} sub="Junio 2026" accent="positive" />
        <StatCard label="Gastos mes" value={money(monthExpense)} sub="Operación" accent="alert" />
        <StatCard label="Utilidad" value={money(utility)} sub={`Margen ${margin}%`} accent="gold" />
        <StatCard label="Flujo neto" value={money(utility)} sub="Estimado" accent={utility >= 0 ? "positive" : "alert"} />
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Por cobrar" value={money(ar)} sub="AR pendiente" accent="gold" />
        <StatCard label="Por pagar" value={money(ap)} sub="AP pendiente" accent="violet" />
        <StatCard label="Gastos recurrentes" value={money(recurring)} sub="Suscripciones" accent="blue" />
        <StatCard label="Presupuesto mes" value={money(15000)} sub="Meta mensual" accent="gold" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Ingresos · 6 meses" className="lg:col-span-2">
          <MiniBars data={[6.5, 7.2, 8.4, 7.9, 9.1, monthIncome / 1000]} color={A.gold} />
          <div className="grid grid-cols-6 gap-1 mt-2">
            {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((m) => <div key={m} className="text-center font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>{m}</div>)}
          </div>
        </Panel>
        <Panel title="Gastos · 6 meses">
          <MiniBars data={[2.4, 2.7, 3.1, 2.9, 3.4, monthExpense / 1000]} color={A.alert} />
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Panel title="Proyectos más rentables (demo)">
          <ul className="space-y-2 text-sm">
            {projectByMargin.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <span style={{ color: A.text }}>{p.name}</span>
                <span className="text-xs" style={{ color: A.textDim }}>{clientName(p.clientId)}</span>
                <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(p.budget)}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Forecast (demo)">
          <ul className="space-y-2 text-sm" style={{ color: A.text }}>
            <li className="flex justify-between"><span>Próximo mes</span><span className="font-mono" style={{ color: A.gold }}>{money(Math.round(monthIncome * 1.1))}</span></li>
            <li className="flex justify-between"><span>Trimestre</span><span className="font-mono" style={{ color: A.gold }}>{money(Math.round(monthIncome * 3.4))}</span></li>
            <li className="flex justify-between"><span>Semestre</span><span className="font-mono" style={{ color: A.gold }}>{money(Math.round(monthIncome * 6.8))}</span></li>
          </ul>
          <p className="text-xs mt-3" style={{ color: A.textDim }}>Cifras proyectadas con factor demo. Reemplazar con motor financiero real.</p>
        </Panel>
      </div>
    </AppShell>
  );
}
