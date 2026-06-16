import { Plus, Calendar as CalIcon } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, Panel } from "@/components/app/primitives";
import { EVENTS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

const TYPE_COLOR: Record<string, string> = {
  Reunión: A.violet, Diagnóstico: A.gold, Entrega: A.positive, Facturación: A.alert, Vencimiento: "#F0A36A", Tarea: A.blue, Revisión: A.violet,
};
const DAYS = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

export default function CalendarioPage() {
  // Group by date string
  const byDate: Record<string, typeof EVENTS> = {};
  EVENTS.forEach((e) => { (byDate[e.date] ||= []).push(e); });
  const dates = Object.keys(byDate).sort();

  return (
    <AppShell>
      <AppPageHeader
        title="Calendario"
        subtitle="Agenda semanal (vista de agenda). Estructura lista para integrar Google Calendar o Cal.com."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Calendario" }]}
        actions={<><Button variant="outline"><CalIcon className="w-3.5 h-3.5" />Hoy</Button><Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo evento</Button></>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {dates.map((d) => {
            const day = new Date(d);
            return (
              <Panel key={d} title={day.toLocaleDateString("es-CO", { weekday: "long", day: "2-digit", month: "long" })}>
                <ul className="space-y-2">
                  {byDate[d].sort((a, b) => a.time.localeCompare(b.time)).map((e) => (
                    <li key={e.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                      <span className="font-display font-bold text-base tabular-nums w-12 text-center" style={{ color: A.gold }}>{e.time}</span>
                      <span className="w-1 h-8 rounded-full" style={{ backgroundColor: TYPE_COLOR[e.type] || A.gold }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{e.title}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{e.type} · {e.client || "Interno"} · {e.owner}</div>
                      </div>
                      {e.duration > 0 && <span className="font-mono text-[10px]" style={{ color: A.textDim }}>{e.duration} min</span>}
                    </li>
                  ))}
                </ul>
              </Panel>
            );
          })}
        </div>

        <div>
          <Panel title="Vista mensual">
            <div className="grid grid-cols-7 gap-1 mb-2">{DAYS.map((d) => <div key={d} className="text-center font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 7 + 1;
                const visible = day >= 1 && day <= 30;
                const date = `2026-06-${String(day).padStart(2, "0")}`;
                const has = visible && byDate[date];
                return (
                  <div key={i} className="aspect-square rounded text-[11px] flex items-start justify-end p-1 relative" style={{ backgroundColor: visible ? A.surface : "transparent", border: visible ? `1px solid ${A.border}` : "none", color: A.text2 }}>
                    {visible && <span style={{ color: has ? A.gold : A.textDim }}>{day}</span>}
                    {has && <span className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: A.gold }} />}
                  </div>
                );
              })}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mt-3" style={{ color: A.textDim }}>Junio 2026 · demo</div>
          </Panel>

          <Panel title="Categorías" className="mt-4">
            <ul className="space-y-2 text-sm">
              {Object.entries(TYPE_COLOR).map(([k, c]) => (
                <li key={k} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} /><span style={{ color: A.text2 }}>{k}</span></li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
