import {
  Inbox, Workflow, Calendar, FolderKanban, AlertTriangle, Truck, TrendingUp,
  Coins, CreditCard, Banknote, Users, Bot, BellRing,
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, StatCard, Panel, StatusBadge, PriorityBadge, MiniBars } from "@/components/app/primitives";
import { KPIS, REQUESTS, EVENTS, PROJECTS, TASKS, INVOICES, EXPENSES } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Dashboard() {
  const newRequests = REQUESTS.filter((r) => r.status === "Nueva").slice(0, 4);
  const upcoming = [...EVENTS].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 5);
  const overdueTasks = TASKS.filter((t) => t.status !== "Completada" && t.dueDate < "2026-06-15");
  const receivable = INVOICES.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const monthExpenses = EXPENSES.filter((e) => e.date.startsWith("2026-06")).reduce((s, e) => s + e.value, 0);
  const monthInvoiced = INVOICES.filter((i) => i.issueDate.startsWith("2026-06")).reduce((s, i) => s + i.total, 0);
  const cashflowEstimate = monthInvoiced - monthExpenses;

  return (
    <AppShell>
      <AppPageHeader
        title="Command Center"
        subtitle="Resumen ejecutivo de la operación · datos mock claramente internos, editables al conectar backend."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Dashboard" }]}
      />

      {/* KPIs row 1 — operación */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-4">
        <StatCard label="Solicitudes nuevas" value={KPIS.newRequests} sub="Últimos 14 días" icon={Inbox} accent="gold" />
        <StatCard label="Leads activos" value={KPIS.activeLeads} sub="En pipeline" icon={Workflow} accent="violet" />
        <StatCard label="Diagnósticos" value={KPIS.pendingDiagnostics} sub="Agendados" icon={Calendar} accent="gold" />
        <StatCard label="Proyectos activos" value={KPIS.activeProjects} sub="En ejecución" icon={FolderKanban} accent="blue" />
        <StatCard label="Tareas vencidas" value={overdueTasks.length} sub="Requieren acción" icon={AlertTriangle} accent="alert" />
        <StatCard label="Entregables próx." value={5} sub="Esta semana" icon={Truck} accent="violet" />
        <StatCard label="Agentes" value={KPIS.activeAgents} sub="Catalogados" icon={Bot} accent="gold" />
      </section>

      {/* KPIs row 2 — finanzas */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard label="Ingresos mes" value={money(monthInvoiced)} sub="Junio 2026 · facturado" icon={TrendingUp} accent="positive" />
        <StatCard label="Por cobrar" value={money(receivable)} sub="Cuentas pendientes" icon={Coins} accent="gold" />
        <StatCard label="Gastos mes" value={money(monthExpenses)} sub="Operación + tooling" icon={CreditCard} accent="alert" />
        <StatCard label="Flujo de caja" value={money(cashflowEstimate)} sub="Estimado mensual" icon={Banknote} accent={cashflowEstimate >= 0 ? "positive" : "alert"} />
        <StatCard label="Próximas reuniones" value={upcoming.length} sub="7 días" icon={Users} accent="violet" />
      </section>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Recent requests */}
        <Panel title="Solicitudes nuevas" action={<a href="/app/solicitudes" className="text-xs font-display font-semibold" style={{ color: A.gold }}>Ver todas</a>}>
          <ul className="space-y-3">
            {newRequests.length === 0 && <li className="text-sm" style={{ color: A.textDim }}>Sin solicitudes nuevas.</li>}
            {newRequests.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{r.company || r.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] mt-0.5" style={{ color: A.textDim }}>{r.id} · {r.service}</div>
                </div>
                <PriorityBadge priority={r.priority} />
              </li>
            ))}
          </ul>
        </Panel>

        {/* Upcoming */}
        <Panel title="Próximas reuniones" action={<a href="/app/calendario" className="text-xs font-display font-semibold" style={{ color: A.gold }}>Calendario</a>}>
          <ul className="space-y-3">
            {upcoming.map((e) => (
              <li key={e.id} className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <div className="text-center shrink-0 w-14">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>{new Date(e.date).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}</div>
                  <div className="font-display font-bold text-lg tabular-nums" style={{ color: A.gold }}>{e.time}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{e.title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{e.type} · {e.owner}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Project status */}
        <Panel title="Estado de proyectos" action={<a href="/app/proyectos" className="text-xs font-display font-semibold" style={{ color: A.gold }}>Ver kanban</a>}>
          <ul className="space-y-3">
            {PROJECTS.slice(0, 4).map((p) => (
              <li key={p.id} className="rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{p.name}</div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${A.gold}, ${A.violet})` }} />
                </div>
                <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>
                  <span>{p.service}</span><span>{p.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Charts + alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Ingresos · últimos 7 días" className="lg:col-span-2">
          <MiniBars data={[2.1, 3.0, 1.8, 4.4, 3.2, 5.1, 4.8]} color={A.gold} />
          <div className="grid grid-cols-7 gap-1 mt-2">
            {["L","M","M","J","V","S","D"].map((d, i) => (
              <div key={i} className="text-center font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>{d}</div>
            ))}
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>Valores demo · en miles USD</div>
        </Panel>

        <Panel title="Alertas operativas" action={<BellRing className="w-4 h-4" style={{ color: A.alert }} />}>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.alert }} />
              <span style={{ color: A.text }}><b>{overdueTasks.length}</b> tareas vencidas requieren reasignación.</span>
            </li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.gold }} />
              <span style={{ color: A.text }}>1 factura próxima a vencer (INV-0042).</span>
            </li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.violet }} />
              <span style={{ color: A.text }}>Indaba en estado “Esperando cliente” &gt; 5 días.</span>
            </li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.blue }} />
              <span style={{ color: A.text }}>3 propuestas con probabilidad &gt; 60% sin próxima acción definida.</span>
            </li>
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
