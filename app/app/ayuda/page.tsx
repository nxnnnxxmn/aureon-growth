import { BookOpen, Workflow, Users, FolderKanban, CheckSquare, Bot, Receipt, CreditCard, LineChart, BarChart3 } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel } from "@/components/app/primitives";
import { A } from "@/lib/ui";

const TOPICS = [
  { icon: Workflow, t: "Registrar leads", d: "Solicitudes → seleccionar → Convertir en lead. Pasa al CRM." },
  { icon: Users, t: "Crear clientes", d: "Cuando un lead pasa a Ganado, se crea automáticamente (placeholder)." },
  { icon: FolderKanban, t: "Crear proyectos", d: "Proyectos → Nuevo proyecto · vincular cliente y servicio." },
  { icon: CheckSquare, t: "Asignar tareas", d: "Tareas → Nueva tarea · proyecto, owner, fecha y prioridad." },
  { icon: Bot, t: "Usar agentes", d: "Agentes → seleccionar agente · crear tarea o asociarlo a proyecto." },
  { icon: Receipt, t: "Registrar facturas", d: "Facturación → Nueva factura · cliente, concepto y total." },
  { icon: CreditCard, t: "Registrar gastos", d: "Gastos → Nuevo gasto · proveedor, categoría y método de pago." },
  { icon: LineChart, t: "Revisar finanzas", d: "Finanzas → dashboard con ingresos, gastos y flujo de caja." },
  { icon: BarChart3, t: "Generar reportes", d: "Reportes → seleccionar tipo · aplicar filtros (periodo, cliente)." },
];

export default function AyudaPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Ayuda"
        subtitle="Guía interna del Aureon Command Center."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Ayuda" }]}
      />

      <Panel title="Cómo usar la plataforma">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOPICS.map((t) => (
            <div key={t.t} className="card-3d p-4 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(214,180,106,0.12)" }}><t.icon className="w-4 h-4" style={{ color: A.gold }} /></span>
                <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{t.t}</div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: A.text2 }}>{t.d}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Notas técnicas" className="mt-4">
        <ul className="space-y-2 text-sm" style={{ color: A.text2 }}>
          <li className="flex items-start gap-2"><BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} /> Toda la data mostrada es <b>mock interno</b> definida en <code>lib/internal/mock-data.ts</code>.</li>
          <li className="flex items-start gap-2"><BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} /> Los 24 agentes viven en <code>lib/internal/agents.ts</code>. Cada uno tiene prompt base preparado para conectar LLM.</li>
          <li className="flex items-start gap-2"><BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} /> El acceso usa <code>ADMIN_PASSWORD</code> (cookie HttpOnly, 12h). Reemplazar por NextAuth / Supabase Auth / Clerk antes de producción.</li>
          <li className="flex items-start gap-2"><BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} /> <code>robots.txt</code> bloquea /app, /admin y /command-center. /app no aparece en <code>sitemap.xml</code>.</li>
        </ul>
      </Panel>
    </AppShell>
  );
}
