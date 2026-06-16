"use client";

import Link from "next/link";
import {
  Inbox, Workflow, Users, FolderKanban, AlertTriangle, Receipt, TrendingUp,
  CreditCard, Banknote, Calendar, Plus, Database, BellRing,
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, StatCard, Panel, Button, EmptyState } from "@/components/app/primitives";
import DataStatus from "@/components/app/DataStatus";
import { useStore, STORE_KEYS, useDemoMode } from "@/lib/internal/data-source";
import type { IncomingRequest, Lead, Client, Project, Task, Invoice, Expense, CalendarEvent } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const TODAY = new Date().toISOString().slice(0, 10);

export default function Dashboard() {
  const demo = useDemoMode();
  const [requests] = useStore<IncomingRequest>(STORE_KEYS.requests);
  const [leads] = useStore<Lead>(STORE_KEYS.leads);
  const [clients] = useStore<Client>(STORE_KEYS.clients);
  const [projects] = useStore<Project>(STORE_KEYS.projects);
  const [tasks] = useStore<Task>(STORE_KEYS.tasks);
  const [invoices] = useStore<Invoice>(STORE_KEYS.invoices);
  const [expenses] = useStore<Expense>(STORE_KEYS.expenses);
  const [events] = useStore<CalendarEvent>(STORE_KEYS.events);

  const newRequests = requests.filter((r) => r.status === "Nueva" || r.status === "En revisión").length;
  const activeLeads = leads.filter((l) => !["Ganado", "Perdido"].includes(l.stage)).length;
  const activeClients = clients.filter((c) => c.status === "Activo").length;
  const activeProjects = projects.filter((p) => ["En progreso", "En revisión", "Planeación", "Esperando cliente"].includes(p.status)).length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completada").length;
  const pendingInvoices = invoices.filter((i) => ["Enviada", "Vencida", "Emitida"].includes(i.status)).length;
  const income = invoices.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expenseTotal = expenses.reduce((s, e) => s + e.value, 0);
  const net = income - expenseTotal;
  const receivable = invoices.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const upcoming = [...events].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).filter((e) => e.date >= TODAY).slice(0, 5);
  const overdueTasks = tasks.filter((t) => t.status !== "Completada" && t.dueDate && t.dueDate < TODAY);

  const totalRecords = requests.length + leads.length + clients.length + projects.length + tasks.length + invoices.length + expenses.length;
  const empty = totalRecords === 0;
  const src = (n: number) => (n > 0 ? (demo ? "demo" : "manual") : "sin-datos") as "demo" | "manual" | "sin-datos";

  const actions = [
    { label: "Registrar solicitud", href: "/app/solicitudes" },
    { label: "Crear lead", href: "/app/crm" },
    { label: "Crear cliente", href: "/app/clientes" },
    { label: "Crear proyecto", href: "/app/proyectos" },
    { label: "Registrar ingreso", href: "/app/facturacion" },
    { label: "Registrar gasto", href: "/app/gastos" },
    { label: "Crear factura interna", href: "/app/facturacion" },
    { label: "Configurar base de datos", href: "/app/configuracion/setup" },
  ];

  return (
    <AppShell>
      <AppPageHeader
        title="Command Center"
        subtitle="Resumen ejecutivo de la operación. Los KPIs muestran datos reales registrados; 0 si aún no hay datos."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Dashboard" }]}
        actions={<Link href="/app/configuracion/setup" className="btn-premium focus-ring inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-semibold" style={{ backgroundColor: A.gold, color: A.bg }}><Database className="w-3.5 h-3.5" /> Setup de datos</Link>}
      />

      <div className="mb-6"><DataStatus /></div>

      {/* KPIs — operación */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <StatCard label="Solicitudes nuevas" value={newRequests} sub="Sin contactar" icon={Inbox} accent="gold" source={src(newRequests)} />
        <StatCard label="Leads activos" value={activeLeads} sub="En pipeline" icon={Workflow} accent="violet" source={src(activeLeads)} />
        <StatCard label="Clientes activos" value={activeClients} sub="Cuentas vivas" icon={Users} accent="blue" source={src(activeClients)} />
        <StatCard label="Proyectos activos" value={activeProjects} sub="En ejecución" icon={FolderKanban} accent="gold" source={src(activeProjects)} />
        <StatCard label="Tareas pendientes" value={pendingTasks} sub="Sin completar" icon={AlertTriangle} accent={overdueTasks.length ? "alert" : "violet"} source={src(pendingTasks)} />
        <StatCard label="Facturas pendientes" value={pendingInvoices} sub="Por cobrar" icon={Receipt} accent="gold" source={src(pendingInvoices)} />
      </section>

      {/* KPIs — finanzas */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Ingresos registrados" value={money(income)} sub="Facturas pagadas" icon={TrendingUp} accent="positive" source={src(income)} />
        <StatCard label="Gastos registrados" value={money(expenseTotal)} sub="Egresos" icon={CreditCard} accent="alert" source={src(expenseTotal)} />
        <StatCard label="Flujo neto" value={money(net)} sub="Ingresos − gastos" icon={Banknote} accent={net >= 0 ? "positive" : "alert"} source={src(Math.abs(net))} />
        <StatCard label="Por cobrar" value={money(receivable)} sub="Cuentas pendientes" icon={Receipt} accent="gold" source={src(receivable)} />
        <StatCard label="Próximas reuniones" value={upcoming.length} sub="Agenda" icon={Calendar} accent="violet" source={src(upcoming.length)} />
      </section>

      {empty ? (
        <EmptyState
          title="No hay datos operativos registrados todavía"
          hint="Conecta una base de datos o empieza registrando tu primera solicitud, lead o cliente. También puedes activar el modo demo en Setup para explorar la interfaz con datos de muestra."
          icon={Database}
          action={
            <>
              <Link href="/app/solicitudes" className="btn-premium focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-semibold" style={{ backgroundColor: A.gold, color: A.bg }}><Plus className="w-3.5 h-3.5" /> Registrar solicitud</Link>
              <Link href="/app/configuracion/setup" className="focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-semibold border" style={{ borderColor: A.border, color: A.text }}>Ir a Setup</Link>
            </>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Panel title="Próximas reuniones" action={<Link href="/app/calendario" className="text-xs font-display font-semibold" style={{ color: A.gold }}>Calendario</Link>}>
            {upcoming.length === 0 ? <p className="text-sm" style={{ color: A.textDim }}>Sin eventos próximos.</p> : (
              <ul className="space-y-3">
                {upcoming.map((e) => (
                  <li key={e.id} className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <div className="text-center shrink-0 w-14"><div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>{new Date(e.date).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}</div><div className="font-display font-bold text-lg tabular-nums" style={{ color: A.gold }}>{e.time}</div></div>
                    <div className="min-w-0 flex-1"><div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{e.title}</div><div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{e.type} · {e.owner}</div></div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Proyectos" action={<Link href="/app/proyectos" className="text-xs font-display font-semibold" style={{ color: A.gold }}>Ver kanban</Link>}>
            {projects.length === 0 ? <p className="text-sm" style={{ color: A.textDim }}>Sin proyectos.</p> : (
              <ul className="space-y-3">
                {projects.slice(0, 4).map((p) => (
                  <li key={p.id} className="rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <div className="flex items-center justify-between gap-2 mb-2"><div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{p.name}</div></div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}><div className="h-full" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${A.gold}, ${A.violet})` }} /></div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Alertas operativas" action={<BellRing className="w-4 h-4" style={{ color: A.alert }} />}>
            {overdueTasks.length === 0 ? (
              <p className="text-sm" style={{ color: A.textDim }}>Sin alertas reales todavía.</p>
            ) : (
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.alert }} /><span style={{ color: A.text }}><b>{overdueTasks.length}</b> tareas vencidas requieren atención.</span></li>
              </ul>
            )}
          </Panel>
        </div>
      )}

      {/* Quick actions */}
      <Panel title="Acciones rápidas">
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Link key={a.label} href={a.href} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-display font-semibold transition-colors focus-ring" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}>
              <Plus className="w-3 h-3" style={{ color: A.gold }} /> {a.label}
            </Link>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
