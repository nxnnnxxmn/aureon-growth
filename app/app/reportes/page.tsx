"use client";

import { useMemo, useState } from "react";
import { FileText, TrendingUp, Activity, FolderKanban, Users, Layers, CheckSquare, DollarSign, Calendar, BarChart3, Download } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatCard, Button, MiniBars, DataTable, StatusBadge, PriorityBadge } from "@/components/app/primitives";
import { INVOICES, EXPENSES, LEADS, TASKS, PROJECTS, CLIENTS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

type ReportId = "commercial" | "financial" | "operational" | "projects" | "leads" | "services" | "overdue" | "monthly";

interface ReportDef {
  id: ReportId;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}

const REPORTS: ReportDef[] = [
  { id: "commercial", name: "Reporte comercial", desc: "Pipeline, conversión, fuentes.", icon: TrendingUp, accent: A.gold },
  { id: "financial", name: "Reporte financiero", desc: "Ingresos, gastos, utilidad.", icon: DollarSign, accent: A.positive },
  { id: "operational", name: "Reporte operativo", desc: "Tareas y bloqueos.", icon: Activity, accent: A.violet },
  { id: "projects", name: "Proyectos", desc: "Estado y progreso.", icon: FolderKanban, accent: A.blue },
  { id: "leads", name: "Leads", desc: "Volumen por fuente.", icon: Users, accent: A.gold },
  { id: "services", name: "Servicios", desc: "Demanda por sistema.", icon: Layers, accent: A.violet },
  { id: "overdue", name: "Tareas vencidas", desc: "Listado fuera de SLA.", icon: CheckSquare, accent: A.alert },
  { id: "monthly", name: "Mensual ejecutivo", desc: "Snapshot global.", icon: Calendar, accent: A.gold },
];

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function ReportesPage() {
  const [activeId, setActiveId] = useState<ReportId>("commercial");
  const active = REPORTS.find((r) => r.id === activeId)!;

  const [period, setPeriod] = useState<"1m" | "3m" | "6m" | "ytd">("3m");
  const [clientFilter, setClientFilter] = useState<string>("Todos");
  const [serviceFilter, setServiceFilter] = useState<string>("Todos");

  const services = useMemo(() => Array.from(new Set([...LEADS.map((l) => l.service), ...PROJECTS.map((p) => p.service)])), []);
  const periodLabel = { "1m": "Último mes", "3m": "Últimos 3 meses", "6m": "Últimos 6 meses", "ytd": "Año a la fecha" }[period];

  function exportCSV() {
    const rows: string[][] = [];
    if (activeId === "commercial") {
      rows.push(["ID", "Empresa", "Servicio", "Etapa", "Probabilidad", "Valor"]);
      LEADS.filter((l) => clientFilter === "Todos" || l.company === clientFilter)
        .filter((l) => serviceFilter === "Todos" || l.service === serviceFilter)
        .forEach((l) => rows.push([l.id, l.company, l.service, l.stage, `${l.probability}%`, String(l.value)]));
    } else if (activeId === "financial") {
      rows.push(["Tipo", "Concepto", "Valor", "Fecha"]);
      INVOICES.forEach((i) => rows.push(["Ingreso", i.concept, String(i.total), i.issueDate]));
      EXPENSES.forEach((e) => rows.push(["Gasto", e.concept, String(e.value), e.date]));
    } else if (activeId === "overdue") {
      rows.push(["ID", "Tarea", "Owner", "Vence", "Prioridad"]);
      TASKS.filter((t) => t.status !== "Completada" && t.dueDate < "2026-06-15").forEach((t) => rows.push([t.id, t.title, t.owner, t.dueDate, t.priority]));
    } else if (activeId === "projects") {
      rows.push(["ID", "Proyecto", "Cliente", "Estado", "Progreso", "Presupuesto"]);
      PROJECTS.forEach((p) => rows.push([p.id, p.name, clientName(p.clientId), p.status, `${p.progress}%`, String(p.budget)]));
    } else {
      rows.push(["—"]); rows.push(["Sin estructura específica para este reporte"]);
    }
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aureon-${activeId}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Reportes"
        subtitle="Reportes ejecutivos con filtros y export a CSV."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Reportes" }]}
        actions={<Button onClick={exportCSV}><Download className="w-3.5 h-3.5" /> Export CSV</Button>}
      />

      {/* Catalog */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-5">
        {REPORTS.map((r) => {
          const isActive = activeId === r.id;
          return (
            <button key={r.id} onClick={() => setActiveId(r.id)} className="card-3d p-3 rounded-xl text-left focus-ring transition-all"
              style={{ backgroundColor: isActive ? "rgba(214,180,106,0.12)" : A.surface, border: `1px solid ${isActive ? A.borderActive : A.border}` }}>
              <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center mb-2" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <r.icon className="w-4 h-4" style={{ color: r.accent }} />
              </span>
              <div className="font-display font-semibold text-xs leading-tight" style={{ color: A.text }}>{r.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: A.textDim }}>{r.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <Panel title={`Filtros · ${active.name}`} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Periodo</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value as typeof period)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
              <option value="1m">Último mes</option>
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="ytd">Año a la fecha</option>
            </select>
          </label>
          <label className="block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Cliente</span>
            <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
              <option value="Todos">Todos</option>
              {CLIENTS.map((c) => <option key={c.id} value={c.company}>{c.company}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Servicio</span>
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="w-full rounded-lg px-3 py-2 text-sm outline-none focus-ring" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
              <option value="Todos">Todos</option>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>
          {periodLabel} · {clientFilter} · {serviceFilter}
        </div>
      </Panel>

      {/* Reporte view */}
      {activeId === "commercial" && <CommercialReport clientFilter={clientFilter} serviceFilter={serviceFilter} />}
      {activeId === "financial" && <FinancialReport />}
      {activeId === "operational" && <OperationalReport />}
      {activeId === "projects" && <ProjectsReport />}
      {activeId === "leads" && <LeadsReport />}
      {activeId === "services" && <ServicesReport />}
      {activeId === "overdue" && <OverdueReport />}
      {activeId === "monthly" && <MonthlyReport />}
    </AppShell>
  );
}

function CommercialReport({ clientFilter, serviceFilter }: { clientFilter: string; serviceFilter: string }) {
  const rows = LEADS
    .filter((l) => clientFilter === "Todos" || l.company === clientFilter)
    .filter((l) => serviceFilter === "Todos" || l.service === serviceFilter);
  const pipeline = rows.filter((l) => !["Ganado", "Perdido"].includes(l.stage)).reduce((s, l) => s + l.value, 0);
  const won = rows.filter((l) => l.stage === "Ganado").reduce((s, l) => s + l.value, 0);
  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Leads totales" value={rows.length} accent="gold" />
        <StatCard label="Pipeline" value={`$${pipeline.toLocaleString()}`} accent="violet" />
        <StatCard label="Ganados" value={`$${won.toLocaleString()}`} accent="positive" />
        <StatCard label="Conversión" value={rows.length ? `${Math.round((rows.filter((l) => l.stage === "Ganado").length / rows.length) * 100)}%` : "0%"} accent="blue" />
      </section>
      <DataTable rows={rows} columns={[
        { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
        { key: "company", label: "Empresa" },
        { key: "service", label: "Servicio" },
        { key: "stage", label: "Etapa", render: (r) => <StatusBadge status={r.stage} /> },
        { key: "probability", label: "Prob.", render: (r) => `${r.probability}%` },
        { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>${r.value.toLocaleString()}</span> },
      ]} />
    </>
  );
}

function FinancialReport() {
  const income = INVOICES.filter((i) => i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expense = EXPENSES.reduce((s, e) => s + e.value, 0);
  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Ingresos" value={`$${income.toLocaleString()}`} accent="positive" />
        <StatCard label="Gastos" value={`$${expense.toLocaleString()}`} accent="alert" />
        <StatCard label="Utilidad" value={`$${(income - expense).toLocaleString()}`} accent="gold" />
        <StatCard label="Margen" value={income ? `${Math.round(((income - expense) / income) * 100)}%` : "—"} accent="violet" />
      </section>
      <Panel title="Tendencia 6 meses"><MiniBars data={[5.2, 6.1, 7.8, 7.5, 8.2, income / 1000]} color={A.gold} /></Panel>
    </>
  );
}

function OperationalReport() {
  const overdue = TASKS.filter((t) => t.status !== "Completada" && t.dueDate < "2026-06-15");
  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Tareas activas" value={TASKS.filter((t) => t.status !== "Completada").length} accent="gold" />
        <StatCard label="Vencidas" value={overdue.length} accent="alert" />
        <StatCard label="Bloqueadas" value={TASKS.filter((t) => t.status === "Bloqueada").length} accent="violet" />
        <StatCard label="Completadas" value={TASKS.filter((t) => t.status === "Completada").length} accent="positive" />
      </section>
      <DataTable rows={TASKS} columns={[
        { key: "title", label: "Tarea" },
        { key: "owner", label: "Owner" },
        { key: "dueDate", label: "Vence" },
        { key: "priority", label: "Prioridad", render: (r) => <PriorityBadge priority={r.priority} /> },
        { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
      ]} />
    </>
  );
}

function ProjectsReport() {
  return (
    <DataTable rows={PROJECTS} columns={[
      { key: "name", label: "Proyecto" },
      { key: "clientId", label: "Cliente", render: (r) => clientName(r.clientId) },
      { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
      { key: "progress", label: "Progreso", render: (r) => `${r.progress}%` },
      { key: "budget", label: "Presupuesto", render: (r) => `$${r.budget.toLocaleString()}` },
    ]} />
  );
}

function LeadsReport() {
  const bySource: Record<string, number> = {};
  LEADS.forEach((l) => { bySource[l.source] = (bySource[l.source] || 0) + 1; });
  return (
    <Panel title="Volumen por fuente">
      <ul className="space-y-2">
        {Object.entries(bySource).map(([src, n]) => (
          <li key={src} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
            <span style={{ color: A.text }}>{src}</span>
            <div className="flex items-center gap-3"><div className="h-1.5 rounded-full" style={{ width: `${n * 30}px`, backgroundColor: A.gold }} /><span className="font-mono text-xs" style={{ color: A.text2 }}>{n}</span></div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ServicesReport() {
  const byService: Record<string, number> = {};
  LEADS.forEach((l) => { byService[l.service] = (byService[l.service] || 0) + 1; });
  return (
    <Panel title="Demanda por servicio">
      <ul className="space-y-2">
        {Object.entries(byService).map(([s, n]) => (
          <li key={s} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
            <span style={{ color: A.text }}>{s}</span>
            <span className="font-mono text-xs" style={{ color: A.gold }}>{n} leads</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function OverdueReport() {
  const overdue = TASKS.filter((t) => t.status !== "Completada" && t.dueDate < "2026-06-15");
  return (
    <DataTable rows={overdue} columns={[
      { key: "id", label: "ID" },
      { key: "title", label: "Tarea" },
      { key: "owner", label: "Owner" },
      { key: "dueDate", label: "Venció" },
      { key: "priority", label: "Prioridad", render: (r) => <PriorityBadge priority={r.priority} /> },
    ]} />
  );
}

function MonthlyReport() {
  const income = INVOICES.filter((i) => i.issueDate.startsWith("2026-06") && i.status === "Pagada").reduce((s, i) => s + i.total, 0);
  const expense = EXPENSES.filter((e) => e.date.startsWith("2026-06")).reduce((s, e) => s + e.value, 0);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <StatCard label="Leads junio" value={LEADS.length} icon={Users} accent="gold" />
      <StatCard label="Proyectos activos" value={PROJECTS.filter((p) => ["En progreso", "Planeación"].includes(p.status)).length} icon={FolderKanban} accent="violet" />
      <StatCard label="Ingresos junio" value={money(income)} icon={DollarSign} accent="positive" />
      <StatCard label="Utilidad estimada" value={money(income - expense)} icon={BarChart3} accent="gold" />
    </section>
  );
}
