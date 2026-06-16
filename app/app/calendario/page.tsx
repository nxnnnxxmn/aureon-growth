"use client";

import { useState, useMemo } from "react";
import { Plus, Calendar as CalIcon, ChevronLeft, ChevronRight, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, Panel } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { EVENTS } from "@/lib/internal/mock-data";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { CalendarEvent } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const TYPE_COLOR: Record<string, string> = {
  Reunión: A.violet, Diagnóstico: A.gold, Entrega: A.positive, Facturación: A.alert, Vencimiento: "#F0A36A", Tarea: A.blue, Revisión: A.violet,
};
const TYPES: CalendarEvent["type"][] = ["Reunión", "Diagnóstico", "Entrega", "Facturación", "Vencimiento", "Tarea", "Revisión"];
const DAYS = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

const empty: Omit<CalendarEvent, "id"> = {
  title: "", date: new Date().toISOString().slice(0, 10), time: "09:00",
  duration: 60, type: "Reunión", client: "", owner: "Juan L.",
};

function buildMonth(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const startWeekday = (first.getDay() + 6) % 7; // lun=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: { date: string | null; day: number | null }[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ date: null, day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ date, day: d });
  }
  while (cells.length < 42) cells.push({ date: null, day: null });
  return cells;
}

export default function CalendarioPage() {
  const [events, setEvents] = useStore<CalendarEvent>(STORE_KEYS.events);
  const [view, setView] = useState<"month" | "agenda">("month");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5); // June (0-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<CalendarEvent, "id">>(empty);

  const byDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => { (map[e.date] ||= []).push(e); });
    return map;
  }, [events]);

  const monthCells = useMemo(() => buildMonth(year, month), [year, month]);
  const monthLabel = new Date(year, month, 1).toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  function gotoPrev() { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); }
  function gotoNext() { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); }
  function gotoToday() { const t = new Date(); setYear(t.getFullYear()); setMonth(t.getMonth()); setSelectedDate(t.toISOString().slice(0, 10)); }

  function openCreate(date?: string) {
    setDraft({ ...empty, date: date || empty.date });
    setModalOpen(true);
  }

  function create() {
    const id = `E-${Date.now().toString().slice(-6)}`;
    setEvents((arr) => [...arr, { id, ...draft }]);
    setModalOpen(false);
  }

  const datesAgenda = Object.keys(byDate).sort();
  const eventsForSelected = selectedDate ? (byDate[selectedDate] || []) : [];

  return (
    <AppShell>
      <AppPageHeader
        title="Calendario"
        subtitle="Vista mensual interactiva. Click en un día para ver eventos o crear uno."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Calendario" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("month")} className="px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "month" ? A.gold : "transparent", color: view === "month" ? A.bg : A.text2 }}>Mes</button>
              <button onClick={() => setView("agenda")} className="px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "agenda" ? A.gold : "transparent", color: view === "agenda" ? A.bg : A.text2 }}>Agenda</button>
            </div>
            <Button variant="outline" onClick={gotoToday}><CalIcon className="w-3.5 h-3.5" /> Hoy</Button>
            <Button variant="outline" onClick={() => openCreate()}><Plus className="w-3.5 h-3.5" /> Nuevo evento</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Panel title={monthLabel}
            action={
              <div className="flex items-center gap-1">
                <button onClick={gotoPrev} aria-label="Mes anterior" className="p-1.5 rounded focus-ring" style={{ color: A.text2 }}><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={gotoNext} aria-label="Mes siguiente" className="p-1.5 rounded focus-ring" style={{ color: A.text2 }}><ChevronRight className="w-4 h-4" /></button>
              </div>
            }
          >
            {view === "month" ? (
              <>
                <div className="grid grid-cols-7 gap-1 mb-2">{DAYS.map((d) => <div key={d} className="text-center font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-1">
                  {monthCells.map((cell, i) => {
                    if (!cell.date) return <div key={i} className="aspect-square" />;
                    const evs = byDate[cell.date] || [];
                    const isSelected = selectedDate === cell.date;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(cell.date)}
                        onDoubleClick={() => openCreate(cell.date!)}
                        className="aspect-square rounded text-[11px] flex flex-col items-start justify-between p-1.5 focus-ring transition-colors text-left"
                        style={{
                          backgroundColor: isSelected ? "rgba(214,180,106,0.15)" : A.surface,
                          border: `1px solid ${isSelected ? A.borderActive : A.border}`,
                          color: A.text2,
                        }}
                      >
                        <span style={{ color: evs.length ? A.gold : A.textDim }}>{cell.day}</span>
                        <div className="flex flex-wrap gap-0.5 self-end">
                          {evs.slice(0, 3).map((ev) => (
                            <span key={ev.id} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TYPE_COLOR[ev.type] || A.gold }} />
                          ))}
                          {evs.length > 3 && <span className="text-[8px]" style={{ color: A.textDim }}>+{evs.length - 3}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {datesAgenda.map((d) => {
                  const day = new Date(d);
                  return (
                    <div key={d}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: A.gold }}>{day.toLocaleDateString("es-CO", { weekday: "long", day: "2-digit", month: "long" })}</div>
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
                    </div>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        <div>
          <Panel title={selectedDate ? `Día ${selectedDate}` : "Selecciona un día"}
            action={selectedDate ? <button onClick={() => openCreate(selectedDate)} className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.gold }}>+ Nuevo</button> : null}>
            {!selectedDate && <p className="text-sm" style={{ color: A.textDim }}>Click en un día del calendario.</p>}
            {selectedDate && eventsForSelected.length === 0 && <p className="text-sm" style={{ color: A.textDim }}>Sin eventos. Doble click en el día o usa “+ Nuevo”.</p>}
            <ul className="space-y-2">
              {eventsForSelected.sort((a, b) => a.time.localeCompare(b.time)).map((e) => (
                <li key={e.id} className="rounded-xl p-3" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-base tabular-nums" style={{ color: A.gold }}>{e.time}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: TYPE_COLOR[e.type] || A.gold }}>{e.type}</span>
                  </div>
                  <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{e.title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] mt-0.5" style={{ color: A.textDim }}>{e.owner} {e.client ? `· ${e.client}` : ""}</div>
                </li>
              ))}
            </ul>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo evento" size="md"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><FormField label="Título" required><input className={inputClass} style={inputStyle} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required /></FormField></div>
          <FormField label="Fecha"><input type="date" className={inputClass} style={inputStyle} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></FormField>
          <FormField label="Hora"><input type="time" className={inputClass} style={inputStyle} value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} /></FormField>
          <FormField label="Duración (min)"><input type="number" className={inputClass} style={inputStyle} value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Tipo"><select className={inputClass} style={inputStyle} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as CalendarEvent["type"] })}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></FormField>
          <FormField label="Cliente"><input className={inputClass} style={inputStyle} value={draft.client || ""} onChange={(e) => setDraft({ ...draft, client: e.target.value })} placeholder="—" /></FormField>
          <FormField label="Responsable"><input className={inputClass} style={inputStyle} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} /></FormField>
        </div>
      </Modal>
    </AppShell>
  );
}
