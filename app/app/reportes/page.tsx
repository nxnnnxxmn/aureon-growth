"use client";

import { useMemo, useState } from "react";
import { FileText, TrendingUp, Activity, FolderKanban, Users, Layers, CheckSquare, DollarSign, Calendar, Download, BarChart3 } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatCard, Button, DataTable, StatusBadge, PriorityBadge, EmptyState } from "@/components/app/primitives";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Invoice, Expense, Lead, Task, Project, Client } from "@/lib/internal/types";
import { A } from "@/lib/ui";

type ReportId = "commercial" | "financial" | "operational" | "projects" | "leads" | "services" | "overdue" | "monthly";
const REPORTS: { id: ReportId; name: string; desc: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; accent: string }[] = [
  { id: "commercial", name: "Comercial", desc: "Pipeline y conversión.", icon: TrendingUp, accent: A.gold },
  { id: "financial", name: "Financiero", desc: "Ingresos y gastos.", icon: DollarSign, accent: A.positive },
  { id: "operational", name: "Operativo", desc: "Tareas y bloqueos.", icon: Activity, accent: A.violet },
  { id: "projects", name: "Proyectos", desc: "Estado y progreso.", icon: FolderKanban, accent: A.blue },
  { id: "leads", name: "Leads", desc: "Volumen por fuente.", icon: Users, accent: A.gold },
  { id: "services", name: "Servicios", desc: "Demanda por sistema.", icon: Layers, accent: A.violet },
  { id: "overdue", name: "Tareas vencidas", desc: "Fuera de SLA.", icon: CheckSquare, accent: A.alert },
  { id: "monthly", name: "Mensual", desc: "Snapshot global.", icon: Calendar, accent: A.gold },
];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const TODAY = new Date().toISOString().slice(0, 10);

export default function ReportesPage() {
  const [activeId, setActiveId] = useState<ReportId>("commercial");
  const [period, setPeriod] = useState("3m");
  const [clientFilter, setClientFilter] = useState("Todos");
  const [serviceFilter, setServiceFilter] = useState("Todos");

  const [leads] = useStore<Lead>(STORE_KEYS.leads);
  const [invoices] = useStore<Invoice>(STORE_KEYS.invoices);
  const [expenses] = useStore<Expense>(STORE_KEYS.expenses);
  const [tasks] = useStore<Task>(STORE_KEYS.tasks);
  const [projects] = useStore<Project>(STORE_KEYS.projects);
  const [clients] = useStore<Client>(STORE_KEYS.clients);
  const clientName = (id: string) => clients.find((c) => c.id === id)?.company || id;

  const services = useMemo(() => Array.from(new Set([...leads.map((l) => l.service), ...projects.map((p) => p.service)])), [leads, projects]);
  const hasAny = leads.length + invoices.length + expenses.length + tasks.length + projects.length > 0;

  function exportCSV() {
    let rows: string[][] = [];
    if (activeId === "commercial") { rows = [["ID", "Empresa", "Servicio", "Etapa", "Prob", "Valor"], ...leads.map((l) => [l.id, l.company, l.service, l.stage, `${l.probability}%`, String(l.value)])]; }
    else if (activeId === "financial") { rows = [["Tipo", "Concepto", "Valor", "Fecha"], ...invoices.map((i) => ["Ingreso", i.concept, String(i.total), i.issueDate]), ...expenses.map((e) => ["Gasto", e.concept, String(e.value), e.date])]; }
    else if (activeId === "projects") { rows = [["ID", "Proyecto", "Cliente", "Estado", "Progreso", "Presupuesto"], ...projects.map((p) => [p.id, p.name, clientName(p.clientId), p.status, `${p.progress}%`, String(p.budget)])]; }
    else { rows = [["ID", "Tarea", "Owner", "Vence", "Prioridad"], ...tasks.map((t) => [t.id, t.title, t.owner, t.dueDate, t.priority])]; }
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `aureon-${activeId}-${TODAY}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  const income = invoices.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expenseTotal = expenses.reduce((s, e) => s + e.value, 0);
  const overdue = tasks.filter((t) => t.status !== "Completada" && t.dueDate && t.dueDate < TODAY);

  return (
    <AppShell>
      <AppPageHeader
        title="Reportes"
        subtitle="Reportes ejecutivos construidos con datos reales del sistema. Sin datos, aparece vacío."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Reportes" }]}
        actions={hasAny ? <Button onClick={exportCSV}><Download className="w-3.5 h-3.5" /> Export CSV</Button> : undefined}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-5">
        {REPORTS.map((r) => {
          const on = activeId === r.id;
          return (
            <button key={r.id} onClick={() => setActiveId(r.id)} className="card-3d p-3 rounded-xl text-left focus-ring" style={{ backgroundColor: on ? "rgba(214,180,106,0.12)" : A.surface, border: `1px solid ${on ? A.borderActive : A.border}` }}>
              <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center mb-2" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}><r.icon className="w-4 h-4" style={{ color: r.accent }} /></span>
              <div className="font-display font-semibold text-xs leading-tight" style={{ color: A.text }}>{r.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: A.textDim }}>{r.desc}</div>
            </button>
          );
        })}
      </div>

      <Panel title="Filtros" className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="block"><span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Periodo</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}><option value="1m">Último mes</option><option value="3m">3 meses</option><option value="6m">6 meses</option><option value="ytd">Año a la fecha</option></select>
          </label>
          <label className="block"><span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Cliente</span>
            <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}><option>Todos</option>{clients.map((c) => <option key={c.id}>{c.company}</option>)}</select>
          </label>
          <label className="block"><span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Servicio</span>
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}><option>Todos</option>{services.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
        </div>
      </Panel>

      {!hasAny ? (
        <EmptyState icon={BarChart3} title="No hay reportes generados" hint="Los reportes se construirán con datos reales del CRM, proyectos, finanzas y operaciones. Registra información para empezar." />
      ) : activeId === "commercial" ? (
        <DataTable rows={leads.filter((l) => (clientFilter === "Todos" || l.company === clientFilter) && (serviceFilter === "Todos" || l.service === serviceFilter))} columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "company", label: "Empresa" }, { key: "service", label: "Servicio" },
          { key: "stage", label: "Etapa", render: (r) => <StatusBadge status={r.stage} /> },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{money(r.value)}</span> },
        ]} />
      ) : activeId === "financial" ? (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3"><StatCard label="Ingresos" value={money(income)} accent="positive" source="manual" /><StatCard label="Gastos" value={money(expenseTotal)} accent="alert" source="manual" /><StatCard label="Utilidad" value={money(income - expenseTotal)} accent="gold" source="manual" /><StatCard label="Margen" value={income ? `${Math.round(((income - expenseTotal) / income) * 100)}%` : "—"} accent="violet" source="manual" /></section>
      ) : activeId === "projects" ? (
        <DataTable rows={projects} columns={[{ key: "name", label: "Proyecto" }, { key: "clientId", label: "Cliente", render: (r) => clientName(r.clientId) }, { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> }, { key: "progress", label: "Progreso", render: (r) => `${r.progress}%` }]} />
      ) : activeId === "overdue" ? (
        overdue.length === 0 ? <EmptyState title="Sin tareas vencidas" hint="No hay tareas fuera de SLA." /> :
        <DataTable rows={overdue} columns={[{ key: "id", label: "ID" }, { key: "title", label: "Tarea" }, { key: "owner", label: "Owner" }, { key: "dueDate", label: "Venció" }, { key: "priority", label: "Prioridad", render: (r) => <PriorityBadge priority={r.priority} /> }]} />
      ) : activeId === "leads" || activeId === "services" ? (
        <Panel title={activeId === "leads" ? "Volumen por fuente" : "Demanda por servicio"}>
          <ul className="space-y-2">
            {Object.entries(leads.reduce((acc, l) => { const k = activeId === "leads" ? l.source : l.service; acc[k] = (acc[k] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([k, n]) => (
              <li key={k} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>{k}</span><span className="font-mono text-xs" style={{ color: A.gold }}>{n}</span></li>
            ))}
          </ul>
        </Panel>
      ) : activeId === "operational" ? (
        <DataTable rows={tasks} columns={[{ key: "title", label: "Tarea" }, { key: "owner", label: "Owner" }, { key: "dueDate", label: "Vence" }, { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> }]} />
      ) : (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3"><StatCard label="Leads" value={leads.length} accent="gold" source="manual" /><StatCard label="Proyectos" value={projects.length} accent="violet" source="manual" /><StatCard label="Ingresos" value={money(income)} accent="positive" source="manual" /><StatCard label="Clientes" value={clients.length} accent="blue" source="manual" /></section>
      )}
      <p className="text-xs mt-4 flex items-center gap-1.5" style={{ color: A.textDim }}><FileText className="w-3 h-3" /> Filtros aplicados: {period} · {clientFilter} · {serviceFilter}</p>
    </AppShell>
  );
}
