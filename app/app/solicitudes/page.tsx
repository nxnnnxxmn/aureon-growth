"use client";

import { useMemo, useState } from "react";
import { Plus, MessageSquare, Calendar, ArrowRightCircle, X } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, FilterChips, Button, PriorityBadge, StatusBadge, DataTable, Panel } from "@/components/app/primitives";
import { REQUESTS } from "@/lib/internal/mock-data";
import type { IncomingRequest, RequestStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (RequestStatus | "Todas")[] = ["Todas", "Nueva", "En revisión", "Contactada", "Diagnóstico agendado", "Propuesta enviada", "Ganada", "Perdida", "Nurturing"];

export default function SolicitudesPage() {
  const [filter, setFilter] = useState<RequestStatus | "Todas">("Todas");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<IncomingRequest | null>(null);
  const [items, setItems] = useState(REQUESTS);

  const filtered = useMemo(() => items.filter((r) => {
    if (filter !== "Todas" && r.status !== filter) return false;
    if (q) {
      const needle = q.toLowerCase();
      if (![r.id, r.name, r.company || "", r.email, r.service].some((s) => s.toLowerCase().includes(needle))) return false;
    }
    return true;
  }), [filter, q, items]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Todas: items.length };
    items.forEach((r) => { map[r.status] = (map[r.status] || 0) + 1; });
    return map;
  }, [items]);

  function updateStatus(id: string, status: RequestStatus) {
    setItems((arr) => arr.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Solicitudes"
        subtitle="Entradas desde el diagnóstico, WhatsApp, email y campañas. Mock data interno."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Solicitudes" }]}
        actions={<><Button variant="outline"><Plus className="w-3.5 h-3.5" />Nueva solicitud</Button></>}
      />

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={STATUSES.map((s) => ({ value: s, label: s, count: counts[s] || 0 }))}
        />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre, empresa, ID…" className="ml-auto lg:max-w-sm w-full rounded-lg px-3 py-2 text-sm outline-none"
          style={{ backgroundColor: A.surface, border: `1px solid ${A.border}`, color: A.text }} />
      </div>

      <DataTable
        rows={filtered}
        onRowClick={(r) => setSelected(r)}
        columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "date", label: "Fecha", render: (r) => <span className="font-mono text-xs" style={{ color: A.textDim }}>{r.date}</span> },
          { key: "name", label: "Contacto", render: (r) => (
            <div>
              <div className="font-display font-semibold text-sm">{r.name}</div>
              <div className="text-xs" style={{ color: A.textDim }}>{r.company}</div>
            </div>
          )},
          { key: "service", label: "Servicio", render: (r) => <span className="text-sm">{r.service}</span> },
          { key: "source", label: "Fuente", render: (r) => <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.text2 }}>{r.source}</span> },
          { key: "priority", label: "Prioridad", render: (r) => <PriorityBadge priority={r.priority} /> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
          { key: "owner", label: "Responsable", render: (r) => <span className="text-xs">{r.owner}</span> },
        ]}
      />

      {/* Detail drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} aria-hidden />
          <aside className="fixed top-0 right-0 z-50 h-full w-full sm:w-[460px] overflow-y-auto p-6 border-l" style={{ backgroundColor: A.bg2, borderColor: A.border }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>{selected.id}</div>
                <h2 className="font-display font-semibold text-xl" style={{ color: A.text }}>{selected.company || selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded focus-ring" style={{ color: A.text2 }} aria-label="Cerrar"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <Row label="Contacto" value={selected.name} />
              <Row label="Email" value={<a href={`mailto:${selected.email}`} style={{ color: A.gold }}>{selected.email}</a>} />
              <Row label="WhatsApp" value={selected.whatsapp} />
              {selected.website && <Row label="Sitio" value={selected.website} />}
              <Row label="Servicio" value={selected.service} />
              <Row label="Fuente" value={selected.source} />
              <Row label="Reto principal" value={selected.challenge} />
              <Row label="Próxima acción" value={selected.nextAction || "—"} />
              <Row label="Responsable" value={selected.owner || "Sin asignar"} />
              <Row label="Prioridad" value={<PriorityBadge priority={selected.priority} />} />
              <Row label="Estado" value={<StatusBadge status={selected.status} />} />
            </div>

            <Panel title="Mover estado" className="mt-6">
              <div className="grid grid-cols-2 gap-2">
                {STATUSES.filter((s) => s !== "Todas").map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s as RequestStatus)} className="px-3 py-2 rounded-lg text-xs font-display font-semibold transition-colors focus-ring text-left"
                    style={{ backgroundColor: selected.status === s ? "rgba(214,180,106,0.12)" : "rgba(255,255,255,0.04)", color: selected.status === s ? A.gold : A.text2, border: `1px solid ${selected.status === s ? A.borderActive : A.border}` }}>
                    {s}
                  </button>
                ))}
              </div>
            </Panel>

            <div className="grid grid-cols-1 gap-2 mt-6">
              <Button><ArrowRightCircle className="w-3.5 h-3.5" />Convertir en lead</Button>
              <Button variant="outline"><Calendar className="w-3.5 h-3.5" />Agendar diagnóstico</Button>
              <a href={`https://wa.me/${selected.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                 className="btn-premium focus-ring inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-display font-semibold"
                 style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>
                <MessageSquare className="w-3.5 h-3.5" /> Escribir por WhatsApp
              </a>
            </div>
          </aside>
        </>
      )}
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>{label}</div>
      <div className="text-sm" style={{ color: A.text }}>{value}</div>
    </div>
  );
}
