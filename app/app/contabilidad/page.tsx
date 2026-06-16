import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, StatCard, Panel } from "@/components/app/primitives";
import { INVOICES, EXPENSES, CLIENTS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

const INCOME_CATS = ["Retainers", "Proyectos únicos", "Diagnósticos", "Automatización", "Consultoría", "Desarrollo web", "Performance", "Branding"];
const EXPENSE_CATS = ["Software", "Publicidad interna", "Freelancers", "Nómina/equipo", "Herramientas IA", "Hosting", "Diseño", "Operación", "Transporte", "Impuestos por revisar", "Otros"];

export default function ContabilidadPage() {
  const income = INVOICES.filter((i) => i.issueDate.startsWith("2026-06") && i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expense = EXPENSES.filter((e) => e.date.startsWith("2026-06")).reduce((s, e) => s + e.value, 0);
  const utility = income - expense;
  const margin = income > 0 ? Math.round((utility / income) * 100) : 0;
  const ar = INVOICES.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const ap = EXPENSES.filter((e) => e.status === "Pendiente").reduce((s, e) => s + e.value, 0);

  return (
    <AppShell>
      <AppPageHeader
        title="Contabilidad"
        subtitle="Contabilidad administrativa básica. No reemplaza contabilidad oficial — se conecta a herramienta contable en producción."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Contabilidad" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo movimiento</Button>}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Ingresos mes" value={money(income)} sub="Facturas pagadas" icon={ArrowDownLeft} accent="positive" />
        <StatCard label="Gastos mes" value={money(expense)} sub="Operación + tooling" icon={ArrowUpRight} accent="alert" />
        <StatCard label="Utilidad" value={money(utility)} sub={`Margen ${margin}%`} accent={utility >= 0 ? "positive" : "alert"} />
        <StatCard label="Flujo neto" value={money(utility)} sub="Estimado mensual" accent="gold" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Panel title="Categorías · Ingresos">
          <ul className="space-y-2 text-sm">
            {INCOME_CATS.map((c) => (<li key={c} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{c}</span><span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span></li>))}
          </ul>
        </Panel>
        <Panel title="Categorías · Gastos">
          <ul className="space-y-2 text-sm">
            {EXPENSE_CATS.map((c) => (<li key={c} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{c}</span><span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span></li>))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title={`Cuentas por cobrar · ${money(ar)}`}>
          <ul className="space-y-2 text-sm">
            {INVOICES.filter((i) => ["Enviada", "Vencida"].includes(i.status)).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <span className="font-mono text-xs" style={{ color: A.gold }}>{i.number}</span>
                <span style={{ color: A.text }}>{clientName(i.clientId)}</span>
                <span className="font-mono text-xs" style={{ color: A.text }}>{money(i.total)}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={`Cuentas por pagar · ${money(ap)}`}>
          <ul className="space-y-2 text-sm">
            {EXPENSES.filter((e) => e.status !== "Pagado").map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <span className="text-xs" style={{ color: A.text2 }}>{e.vendor}</span>
                <span className="font-mono text-xs" style={{ color: A.text }}>{money(e.value)}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.alert }}>{e.status}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
