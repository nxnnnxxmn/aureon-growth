"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ListChecks, MessageCircle, PhoneCall, Mail, ExternalLink, Search,
  Check, SkipForward, RefreshCw, MapPin, CalendarClock, Flame, Copy,
} from "lucide-react";
import { AppPageHeader, StatCard, Panel, Button, PriorityBadge } from "@/components/app/primitives";
import { A } from "@/lib/ui";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Task } from "@/lib/internal/types";
import {
  type PoolItem, readPool, readFlags, writeFlag, scheduleFollowUps,
  CONTACTED_KEY, LEADS_KEY, waNumber, buildWhatsApp, buildCallScript,
  outlookComposeUrl, googleMapsUrl, googleContactUrl, pitchFor,
} from "@/lib/prospeccion";

/* ─────────────────────────────────────────────────────────────────
 * COLA DEL DÍA — "hoy contacta estos 10".
 * Selección determinística diaria desde el pool de prospección,
 * rotando categorías para variedad. Marcar contactado programa
 * seguimientos día 3 y día 7 como tareas reales del módulo Tareas.
 * ───────────────────────────────────────────────────────────────── */

const QUEUE_SIZE = 10;
type QueueItem = { id: string; state: "pendiente" | "contactado" | "saltado" };

const todayKey = () => `aureon:cola:${new Date().toISOString().slice(0, 10)}`;
const todayISO = () => new Date().toISOString().slice(0, 10);

function readQueue(): QueueItem[] {
  try { return JSON.parse(localStorage.getItem(todayKey()) || "[]"); } catch { return []; }
}
function writeQueue(q: QueueItem[]) {
  try { localStorage.setItem(todayKey(), JSON.stringify(q)); } catch {}
}

/** Round-robin por categoría (arranque rotado por día del año) → variedad diaria. */
function pickDaily(pool: PoolItem[], exclude: Set<string>): QueueItem[] {
  const candidates = pool.filter((p) => !exclude.has(p.id));
  if (candidates.length === 0) return [];
  const byCat = new Map<string, PoolItem[]>();
  for (const p of candidates) {
    if (!byCat.has(p.category)) byCat.set(p.category, []);
    byCat.get(p.category)!.push(p);
  }
  const cats = [...byCat.keys()];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const start = dayOfYear % cats.length;
  const picked: PoolItem[] = [];
  let round = 0;
  while (picked.length < QUEUE_SIZE && round < 200) {
    const cat = cats[(start + round) % cats.length];
    const bucket = byCat.get(cat)!;
    if (bucket.length > 0) picked.push(bucket.shift()!);
    if ([...byCat.values()].every((b) => b.length === 0)) break;
    round++;
  }
  return picked.map((p) => ({ id: p.id, state: "pendiente" as const }));
}

export default function ColaPage() {
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [tasks, setTasks] = useStore<Task>(STORE_KEYS.tasks);

  /* Hidratar: pool + cola de hoy (autogenerar si no existe y hay pool) */
  useEffect(() => {
    const pl = readPool();
    setPool(pl);
    let q = readQueue();
    if (q.length === 0 && pl.length > 0) {
      const exclude = new Set([...Object.keys(readFlags(CONTACTED_KEY)), ...Object.keys(readFlags(LEADS_KEY))]);
      q = pickDaily(pl, exclude);
      writeQueue(q);
    }
    setQueue(q);
    setHydrated(true);
  }, []);

  const poolById = useMemo(() => new Map(pool.map((p) => [p.id, p])), [pool]);
  const items = useMemo(
    () => queue.map((q) => ({ ...q, p: poolById.get(q.id) })).filter((x): x is QueueItem & { p: PoolItem } => !!x.p),
    [queue, poolById],
  );
  const done = items.filter((i) => i.state === "contactado").length;

  /* Seguimientos que vencen hoy o están atrasados */
  const dueFollowUps = useMemo(
    () => tasks.filter((t) => t.tags?.includes("seguimiento") && t.status !== "Completada" && t.dueDate <= todayISO()),
    [tasks],
  );

  const setState = (id: string, state: QueueItem["state"]) => {
    setQueue((prev) => {
      const next = prev.map((q) => (q.id === id ? { ...q, state } : q));
      writeQueue(next);
      return next;
    });
  };

  const contact = (item: QueueItem & { p: PoolItem }) => {
    writeFlag(CONTACTED_KEY, item.id);
    scheduleFollowUps(item.p, item.p.zoneLabel);
    setState(item.id, "contactado");
  };

  const regenerate = () => {
    const exclude = new Set([
      ...Object.keys(readFlags(CONTACTED_KEY)),
      ...Object.keys(readFlags(LEADS_KEY)),
      ...queue.filter((q) => q.state === "contactado").map((q) => q.id),
    ]);
    const kept = queue.filter((q) => q.state === "contactado");
    const fresh = pickDaily(pool, exclude).slice(0, QUEUE_SIZE - kept.length);
    const next = [...kept, ...fresh];
    writeQueue(next);
    setQueue(next);
  };

  const completeTask = (id: string) => {
    setTasks((arr) => arr.map((t) => (t.id === id ? { ...t, status: "Completada" as Task["status"] } : t)));
  };

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <AppPageHeader
        title="Cola del día"
        subtitle="Hoy contacta estos 10. El sistema rota categorías del pool de prospección y programa los seguimientos por ti."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Cola del día" }]}
        actions={
          <Button variant="ghost" onClick={regenerate} disabled={pool.length === 0}>
            <RefreshCw className="w-3.5 h-3.5" /> Regenerar pendientes
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="En la cola de hoy" value={items.length} icon={ListChecks} accent="gold" source="manual" />
        <StatCard label="Contactados hoy" value={done} icon={Check} accent="positive" source="manual" hint={items.length ? `${Math.round((done / items.length) * 100)}% completado` : undefined} />
        <StatCard label="Seguimientos que vencen" value={dueFollowUps.length} icon={CalendarClock} accent={dueFollowUps.length > 0 ? "alert" : "blue"} source="manual" />
        <StatCard label="Pool de prospectos" value={pool.length} icon={Flame} accent="violet" source="importado" hint="Alimentado por Prospección" />
      </div>

      {/* Barra de progreso del día */}
      {items.length > 0 && (
        <div className="mb-6" aria-hidden>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(done / items.length) * 100}%`, backgroundColor: A.gold }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ── Cola ── */}
        <div className="xl:col-span-8">
          {hydrated && pool.length === 0 ? (
            <Panel title="Sin pool de prospectos">
              <p className="text-sm leading-relaxed mb-4" style={{ color: A.text2 }}>
                La cola se alimenta de tus búsquedas en el mapa. Haz una búsqueda en Prospección y los resultados quedarán disponibles aquí.
              </p>
              <Link href="/app/prospeccion" className="btn-premium focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-semibold text-sm" style={{ backgroundColor: A.gold, color: A.bg }}>
                <MapPin className="w-4 h-4" /> Ir a Prospección
              </Link>
            </Panel>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => {
                const p = item.p;
                const wa = waNumber(p.phone);
                const isDone = item.state === "contactado";
                const isSkipped = item.state === "saltado";
                return (
                  <div
                    key={item.id}
                    className="liquid-glass rounded-2xl p-4 lg:p-5 transition-opacity"
                    style={{ backgroundColor: "rgba(15,14,22,0.55)", opacity: isDone || isSkipped ? 0.55 : 1 }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-xs shrink-0" style={{ backgroundColor: isDone ? "rgba(126,226,168,0.14)" : "rgba(214,180,106,0.12)", color: isDone ? A.positive : A.gold }}>
                        {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display font-semibold text-sm" style={{ color: A.text }}>{p.name}</span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: p.color }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                            {p.categoryLabel}
                          </span>
                          <span className="font-mono text-[10px]" style={{ color: A.textDim }}>{p.zoneLabel}</span>
                          {isSkipped && <span className="font-mono text-[9px] uppercase" style={{ color: A.alert }}>Saltado</span>}
                        </div>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: A.textDim }}>
                          {pitchFor(p.category).need}
                        </p>

                        {/* Acciones de contacto según canales */}
                        {!isDone && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {wa && (
                              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(buildWhatsApp(p))}`} target="_blank" rel="noopener noreferrer" onClick={() => contact(item)}
                                className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-semibold text-[11px]" style={{ backgroundColor: "#22C15E", color: "#06130A" }}>
                                <MessageCircle className="w-3 h-3" /> WhatsApp
                              </a>
                            )}
                            {p.phone && (
                              <>
                                <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`} onClick={() => contact(item)}
                                  className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: A.border, color: A.text }}>
                                  <PhoneCall className="w-3 h-3" style={{ color: A.gold }} /> Llamar
                                </a>
                                <button onClick={() => copyText(`s-${item.id}`, buildCallScript(p))}
                                  className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: A.border, color: copied === `s-${item.id}` ? A.positive : A.text2 }}>
                                  {copied === `s-${item.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Guion
                                </button>
                              </>
                            )}
                            <a href={outlookComposeUrl(p)} target="_blank" rel="noopener noreferrer" onClick={() => { if (p.email) contact(item); }}
                              className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(77,124,254,0.4)", color: "#8FAEFF" }}>
                              <Mail className="w-3 h-3" /> Outlook
                            </a>
                            <a href={googleMapsUrl(p)} target="_blank" rel="noopener noreferrer"
                              className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: A.border, color: A.text2 }}>
                              <ExternalLink className="w-3 h-3" /> Ficha Maps
                            </a>
                            {!p.phone && !p.website && (
                              <a href={googleContactUrl(p, p.zoneLabel)} target="_blank" rel="noopener noreferrer"
                                className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(214,180,106,0.35)", color: A.gold }}>
                                <Search className="w-3 h-3" /> Buscar canales
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Estado */}
                      {!isDone && (
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button onClick={() => contact(item)}
                            className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-semibold text-[11px]" style={{ backgroundColor: "rgba(126,226,168,0.14)", color: A.positive }}>
                            <Check className="w-3 h-3" /> Contactado
                          </button>
                          {!isSkipped && (
                            <button onClick={() => setState(item.id, "saltado")}
                              className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-colors hover:bg-white/5" style={{ color: A.textDim }}>
                              <SkipForward className="w-3 h-3" /> Saltar
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {hydrated && items.length === 0 && pool.length > 0 && (
                <Panel title="Cola vacía">
                  <p className="text-sm mb-3" style={{ color: A.text2 }}>Todos los prospectos del pool ya fueron contactados o convertidos. Busca más en Prospección o regenera.</p>
                  <Button variant="ghost" onClick={regenerate}><RefreshCw className="w-3.5 h-3.5" /> Regenerar</Button>
                </Panel>
              )}
            </div>
          )}
        </div>

        {/* ── Seguimientos ── */}
        <div className="xl:col-span-4">
          <Panel title={`Seguimientos que vencen (${dueFollowUps.length})`}>
            {dueFollowUps.length === 0 ? (
              <p className="text-sm py-4" style={{ color: A.textDim }}>
                Nada vence hoy. Al marcar un prospecto como contactado se programan automáticamente los seguimientos de día 3 y día 7.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {dueFollowUps.map((t) => (
                  <li key={t.id} className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium leading-snug" style={{ color: A.text }}>{t.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[10px]" style={{ color: t.dueDate < todayISO() ? A.alert : A.textDim }}>
                            {t.dueDate < todayISO() ? `Atrasada · ${t.dueDate}` : "Vence hoy"}
                          </span>
                          <PriorityBadge priority={t.priority} />
                        </div>
                      </div>
                      <button onClick={() => completeTask(t.id)} aria-label={`Completar ${t.title}`}
                        className="focus-ring p-1.5 rounded-lg transition-colors hover:bg-white/5 shrink-0" style={{ color: A.positive }} title="Marcar completada">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                    {t.description && <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: A.textDim }}>{t.description.slice(0, 140)}…</p>}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/app/tareas" className="inline-flex items-center gap-1.5 mt-4 text-xs font-display font-semibold focus-ring rounded" style={{ color: A.gold }}>
              Ver todas en Tareas →
            </Link>
          </Panel>
        </div>
      </div>
    </>
  );
}
