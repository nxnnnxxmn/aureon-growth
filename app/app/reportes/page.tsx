import { FileBarChart, FileText, TrendingUp, Users, FolderKanban, Layers, CheckSquare, Activity, DollarSign, Calendar } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel } from "@/components/app/primitives";
import { A } from "@/lib/ui";

const REPORTS = [
  { name: "Reporte comercial", desc: "Pipeline, conversión, fuentes, propuestas.", icon: TrendingUp, accent: A.gold },
  { name: "Reporte financiero", desc: "Ingresos, gastos, utilidad y flujo de caja.", icon: DollarSign, accent: A.positive },
  { name: "Reporte operativo", desc: "Tareas, entregables, bloqueos y SLAs.", icon: Activity, accent: A.violet },
  { name: "Reporte de proyectos", desc: "Estado y progreso por proyecto activo.", icon: FolderKanban, accent: A.blue },
  { name: "Reporte de leads", desc: "Volumen por fuente, conversión y owners.", icon: Users, accent: A.gold },
  { name: "Reporte de servicios", desc: "Demanda y rentabilidad por sistema.", icon: Layers, accent: A.violet },
  { name: "Tareas vencidas", desc: "Listado de tareas fuera de SLA.", icon: CheckSquare, accent: A.alert },
  { name: "Productividad", desc: "Carga por persona y horas estimadas.", icon: Activity, accent: A.blue },
  { name: "Rentabilidad por cliente", desc: "Ingresos vs costos directos por cuenta.", icon: TrendingUp, accent: A.positive },
  { name: "Mensual ejecutivo", desc: "Snapshot global de la agencia.", icon: Calendar, accent: A.gold },
];

export default function ReportesPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Reportes"
        subtitle="Reportes ejecutivos internos. Cada tarjeta abrirá un dashboard mock filtrable."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Reportes" }]}
      />

      <Panel title="Catálogo">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {REPORTS.map((r) => (
            <div key={r.name} className="card-3d p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}><r.icon className="w-4 h-4" style={{ color: r.accent }} /></span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{r.name}</div>
                <p className="text-xs" style={{ color: A.text2 }}>{r.desc}</p>
                <div className="mt-2.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.gold }}><FileBarChart className="w-3 h-3" /> Abrir</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Filtros estándar" className="mt-4">
        <p className="text-sm mb-3" style={{ color: A.text2 }}>Cada reporte permite filtros por periodo, cliente, servicio, owner y estado. Exportación a CSV pendiente de backend.</p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Periodo", "Cliente", "Servicio", "Owner", "Estado", "Fuente"].map((f) => (
            <li key={f} className="rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}`, color: A.text2 }}>
              <FileText className="inline w-3 h-3 mr-1" style={{ color: A.gold }} /> {f}
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
