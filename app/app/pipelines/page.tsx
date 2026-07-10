"use client";

import { useMemo, useState } from "react";
import { KanbanSquare, Plus, ChevronLeft, ChevronRight, Trash2, DollarSign, Database, HardDrive } from "lucide-react";
import Link from "next/link";
import { AppPageHeader, Panel, Button, StatCard } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { useCfg, CFG, DEFAULTS } from "@/lib/internal/settings";
import { useDeals, type Deal } from "@/lib/internal/deals-store";
import { A } from "@/lib/ui";

/* ─────────────────────────────────────────────────────────────────
 * PIPELINES — tablero de deals por etapas configurables.
 * Ahora con backend real (Prisma/API) y fallback a localStorage.
 * Etapas y moneda se definen en Ajustes → Deals y moneda.
 * ───────────────────────────────────────────────────────────────── */

export type { Deal };

const CURRENCY_FMT: Record<string, Intl.NumberFormat> = {};
const fmt = (v: number, cur: string) => {
  if (!CURRENCY_FMT[cur]) CURRENCY_FMT[cur] = new Intl.NumberFormat("es-CO", { style: "currency", currency: cur, maximumFractionDigits: 0 });
  return CURRENCY_FMT[cur].format(v);
};

export default function PipelinesPage() {
  const { deals, mode, create: createDeal, update, remove } = useDeals();
  const [commerce] = useCfg(CFG.commerce, DEFAULTS.commerce);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ name: "", contact: "", value: "", stage: "", notes: "" });

  const stages = commerce.stages.length ? commerce.stages : DEFAULTS.commerce.stages;

  const byStage = useMemo(() => {
    const map: Record<string, Deal[]> = {};
    stages.forEach((s) => (map[s] = []));
    deals.forEach((d) => (map[d.stage] || (map[d.stage] = [])).push(d));
    return map;
  }, [deals, stages]);

  const totalOpen = deals.filter((d) => !/ganado|perdido/i.test(d.stage)).reduce((s, d) => s + d.value, 0);
  const totalWon = deals.filter((d) => /ganado/i.test(d.stage)).reduce((s, d) => s + d.value, 0);

  const move = async (id: string, dir: 1 | -1) => {
    const d = deals.find((x) => x.id === id);
    if (!d) return;
    const i = stages.indexOf(d.stage);
    const next = stages[Math.min(stages.length - 1, Math.max(0, i + dir))];
    if (next !== d.stage) await update(id, { stage: next });
  };

  const create = async () => {
    if (!draft.name.trim()) return;
    await createDeal({
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      value: Number(draft.value) || 0,
      currency: commerce.currency,
      stage: draft.stage || stages[0],
      notes: draft.notes,
    });
    setModalOpen(false);
    setDraft({ name: "", contact: "", value: "", stage: "", notes: "" });
  };

  return (
    <>
      <AppPageHeader
        title="Pipelines"
        subtitle={`Deals por etapa en ${commerce.currency}. Configura etapas y moneda en Ajustes → Deals y moneda.`}
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Pipelines" }]}
        actions={<Button onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo deal</Button>}
      />

      {/* Modo de persistencia */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {mode === "db" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>
            <Database className="w-3 h-3" /> Base de datos conectada — sincroniza entre dispositivos
          </span>
        ) : mode === "local" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(240,195,106,0.10)", color: A.alert, border: `1px solid ${A.border}` }}>
            <HardDrive className="w-3 h-3" /> Guardado local — conecta Supabase para sincronizar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.textDim, border: `1px solid ${A.border}` }}>
            Cargando…
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Deals abiertos" value={deals.filter((d) => !/ganado|perdido/i.test(d.stage)).length} icon={KanbanSquare} accent="gold" source="manual" />
        <StatCard label="Pipeline abierto" value={fmt(totalOpen, commerce.currency)} icon={DollarSign} accent="blue" source="manual" />
        <StatCard label="Ganado" value={fmt(totalWon, commerce.currency)} icon={DollarSign} accent="positive" source="manual" />
        <StatCard label="Etapas" value={stages.length} icon={ChevronRight} accent="violet" source="manual" hint="Editables en Ajustes" />
      </div>

      {deals.length === 0 ? (
        <Panel title="Sin deals aún">
          <p className="text-sm mb-4" style={{ color: A.text2 }}>
            Crea tu primer deal o convierte prospectos desde <Link href="/app/prospeccion" className="underline" style={{ color: A.gold }}>Prospección</Link>.
          </p>
          <Button onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Crear deal</Button>
        </Panel>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {stages.map((stage) => {
              const list = byStage[stage] || [];
              const total = list.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage} className="w-[280px] shrink-0">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.gold }}>{stage}</span>
                    <span className="font-mono text-[10px]" style={{ color: A.textDim }}>{list.length} · {fmt(total, commerce.currency)}</span>
                  </div>
                  <div className="space-y-2 min-h-[120px] p-2 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${A.border}` }}>
                    {list.map((d) => (
                      <div key={d.id} className="liquid-glass rounded-xl p-3" style={{ backgroundColor: "rgba(15,14,22,0.6)" }}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: A.text }}>{d.name}</div>
                            <div className="text-[11px] truncate" style={{ color: A.textDim }}>{d.contact}</div>
                          </div>
                          <button onClick={() => remove(d.id)} className="p-1 rounded focus-ring hover:bg-white/5 shrink-0" style={{ color: A.danger }} aria-label={`Eliminar ${d.name}`}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Moneda por deal — permite pipelines multi-país sin mezclar */}
                        <div className="font-display font-bold text-sm mt-1.5 tabular-nums" style={{ color: A.goldBright }}>{fmt(d.value, d.currency || commerce.currency)}</div>
                        <div className="flex justify-between mt-2">
                          <button onClick={() => move(d.id, -1)} disabled={stages.indexOf(d.stage) === 0} className="p-1 rounded focus-ring hover:bg-white/5 disabled:opacity-30" style={{ color: A.text2 }} aria-label="Etapa anterior">
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => move(d.id, 1)} disabled={stages.indexOf(d.stage) === stages.length - 1} className="p-1 rounded focus-ring hover:bg-white/5 disabled:opacity-30" style={{ color: A.text2 }} aria-label="Siguiente etapa">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo deal">
        <div className="space-y-4">
          <FormField label="Nombre del deal" required>
            <input className={inputClass} style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ej: Sistema de crecimiento — Clínica X" />
          </FormField>
          <FormField label="Contacto / empresa">
            <input className={inputClass} style={inputStyle} value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={`Valor (${commerce.currency})`}>
              <input type="number" className={inputClass} style={inputStyle} value={draft.value} onChange={(e) => setDraft({ ...draft, value: e.target.value })} />
            </FormField>
            <FormField label="Etapa">
              <select className={inputClass} style={inputStyle} value={draft.stage} onChange={(e) => setDraft({ ...draft, stage: e.target.value })}>
                {stages.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Notas">
            <textarea className={inputClass} style={inputStyle} rows={2} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
          </FormField>
          <Button onClick={create} className="w-full justify-center"><Plus className="w-4 h-4" /> Crear deal</Button>
        </div>
      </Modal>
    </>
  );
}
