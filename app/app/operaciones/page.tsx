import { Plus, FileCheck, ListChecks, Workflow, Repeat, ClipboardCheck, Users } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, Panel } from "@/components/app/primitives";
import { A } from "@/lib/ui";

const PROCESSES = [
  { name: "Proceso de diagnóstico", steps: 5, owner: "Strategy", icon: ClipboardCheck },
  { name: "Onboarding de cliente", steps: 7, owner: "Operations", icon: Users },
  { name: "Creación de propuesta", steps: 4, owner: "Strategy", icon: FileCheck },
  { name: "Lanzamiento de campaña", steps: 8, owner: "Performance", icon: Workflow },
  { name: "Diseño de landing", steps: 6, owner: "Design", icon: ListChecks },
  { name: "Implementación CRM", steps: 9, owner: "Automation", icon: Workflow },
  { name: "Reporte mensual", steps: 5, owner: "Data & AI", icon: FileCheck },
  { name: "Facturación", steps: 4, owner: "Finance", icon: Repeat },
  { name: "Cierre de proyecto", steps: 6, owner: "Operations", icon: ClipboardCheck },
];

const SECTIONS = ["SOPs", "Checklists", "Flujos de trabajo", "Plantillas", "Procesos por servicio", "Onboarding de cliente", "Offboarding", "QA de entregables", "Reuniones", "Reportes", "Aprobaciones"];

export default function OperacionesPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Operaciones"
        subtitle="SOPs, checklists, flujos de trabajo y procesos por servicio."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Operaciones" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo proceso</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <Panel title="Secciones" className="lg:col-span-1">
          <ul className="space-y-1.5">
            {SECTIONS.map((s) => (
              <li key={s} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                <span className="text-xs" style={{ color: A.text }}>{s}</span>
                <span className="font-mono text-[10px]" style={{ color: A.textDim }}>—</span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="lg:col-span-3">
          <Panel title="Procesos clave">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {PROCESSES.map((p) => (
                <div key={p.name} className="card-3d p-4 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(214,180,106,0.14)" }}><p.icon className="w-4 h-4" style={{ color: A.gold }} /></span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{p.steps} pasos</span>
                  </div>
                  <div className="font-display font-semibold text-sm mb-1" style={{ color: A.text }}>{p.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.violet }}>Owner: {p.owner}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
