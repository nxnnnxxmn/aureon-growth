import Link from "next/link";
import { Plus, Check, ArrowUpRight } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, Panel, StatusBadge } from "@/components/app/primitives";
import { INTERNAL_SERVICES } from "@/lib/internal/mock-data";
import { SERVICES_CATALOG, SERVICE_CATEGORIES, SYSTEM_LABEL } from "@/lib/services-catalog";
import { A } from "@/lib/ui";

export default function AppServiciosPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Servicios"
        subtitle="4 sistemas principales + 24 especialidades catalogadas."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Servicios" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo servicio</Button>}
      />

      {/* 4 sistemas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {INTERNAL_SERVICES.map((s) => (
          <div key={s.id} className="card-3d surface p-6" style={{ backgroundColor: A.surface }}>
            <div className="flex items-start justify-between mb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>{s.system}</div>
              <StatusBadge status={s.active ? "Activo" : "Pausado"} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1.5" style={{ color: A.text }}>{s.name}</h3>
            <p className="text-sm mb-4" style={{ color: A.text2 }}>{s.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Rango precio</div><div className="text-sm" style={{ color: A.text }}>{s.basePriceRange}</div></div>
              <div><div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Duración</div><div className="text-sm" style={{ color: A.text }}>{s.estimatedTime}</div></div>
              <div><div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Owner ideal</div><div className="text-sm" style={{ color: A.text }}>{s.idealOwner}</div></div>
              <div><div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Agente</div>
                {s.agentId && <Link href={`/app/agentes/${s.agentId}`} className="text-sm inline-flex items-center gap-1" style={{ color: A.gold }}>{s.agentId} <ArrowUpRight className="w-3 h-3" /></Link>}
              </div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: A.gold }}>Entregables</div>
            <ul className="space-y-1.5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm" style={{ color: A.text }}><Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} strokeWidth={2.5} />{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 24 especialidades */}
      <Panel title="24 especialidades">
        <div className="space-y-6">
          {SERVICE_CATEGORIES.map((cat) => {
            const items = SERVICES_CATALOG.filter((s) => s.category === cat);
            return (
              <div key={cat}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2.5" style={{ color: A.gold }}>{cat} · {items.length}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                  {items.map((s) => (
                    <div key={s.id} className="rounded-xl p-3.5" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px]" style={{ color: A.gold }}>{String(s.id).padStart(2, "0")}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(124,92,191,0.16)", color: "#C7B8E8" }}>{SYSTEM_LABEL[s.system]}</span>
                      </div>
                      <div className="font-display font-semibold text-sm leading-snug" style={{ color: A.text }}>{s.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </AppShell>
  );
}
