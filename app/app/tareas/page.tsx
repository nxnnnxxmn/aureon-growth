"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, List, Save } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, StatusBadge, PriorityBadge, Panel } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { TASKS, PROJECTS, CLIENTS } from "@/lib/internal/mock-data";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import type { Task, TaskStatus, Priority } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: TaskStatus[] = ["Pendiente", "En progreso", "En revisión", "Bloqueada", "Completada"];
const PRIORITIES: Priority[] = ["low", "medium", "high", "critical"];

const empty: Omit<Task, "id"> = {
  title: "", description: "", projectId: undefined, clientId: undefined, service: undefined,
  owner: "Juan L.", dueDate: "", priority: "medium", status: "Pendiente", tags: [],
};

export default function TareasPage() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [filter, setFilter] = useState<"Todas" | TaskStatus>("Todas");
  const [tasks, setTasks] = useStore<Task>(STORE_KEYS.tasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Task, "id">>(empty);
  const [tagsText, setTagsText] = useState("");

  const filtered = useMemo(() => tasks.filter((t) => filter === "Todas" || t.status === filter), [filter, tasks]);
  const grouped = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {} as Record<TaskStatus, Task[]>;
    STATUSES.forEach((s) => (map[s] = []));
    tasks.forEach((t) => map[t.status].push(t));
    return map;
  }, [tasks]);

  function move(id: string, status: TaskStatus) {
    setTasks((arr) => arr.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function create() {
    const id = `T-${400 + tasks.length + 1}`;
    const tags = tagsText.split(",").map((s) => s.trim()).filter(Boolean);
    setTasks((arr) => [{ id, ...draft, tags }, ...arr]);
    setModalOpen(false);
    setDraft(empty);
    setTagsText("");
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Tareas"
        subtitle="Trabajo operativo del equipo. Persistencia local."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Tareas" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("list")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "list" ? A.gold : "transparent", color: view === "list" ? A.bg : A.text2 }}><List className="w-3.5 h-3.5" /> Lista</button>
              <button onClick={() => setView("kanban")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "kanban" ? A.gold : "transparent", color: view === "kanban" ? A.bg : A.text2 }}><LayoutGrid className="w-3.5 h-3.5" /> Kanban</button>
            </div>
            <Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nueva tarea</Button>
          </>
        }
      />

      <div className="mb-4">
        <FilterChips value={filter} onChange={(v) => setFilter(v as typeof filter)} options={[{ value: "Todas" as const, label: "Todas" }, ...STATUSES.map((s) => ({ value: s as TaskStatus, label: s }))]} />
      </div>

      {view === "list" ? (
        <ul className="space-y-2">
          {filtered.map((t) => (
            <li key={t.id} className="surface flex items-center gap-3 px-4 py-3" style={{ backgroundColor: A.surface }}>
              <span className="font-mono text-[10px]" style={{ color: A.gold }}>{t.id}</span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{t.title}</div>
                <div className="text-xs truncate" style={{ color: A.textDim }}>{t.service || "—"} · {t.owner} · vence {t.dueDate || "—"}</div>
              </div>
              <PriorityBadge priority={t.priority} />
              <StatusBadge status={t.status} />
              <select value={t.status} onChange={(e) => move(t.id, e.target.value as TaskStatus)} className="text-xs rounded px-2 py-1.5 focus-ring" style={{ backgroundColor: A.bg2, color: A.text2, border: `1px solid ${A.border}` }}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {STATUSES.map((s) => (
              <div key={s} className="w-[280px] shrink-0">
                <Panel title={s} action={<span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{grouped[s].length}</span>}>
                  <ul className="space-y-2">
                    {grouped[s].map((t) => (
                      <li key={t.id} className="card-3d p-3 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px]" style={{ color: A.gold }}>{t.id}</span>
                          <PriorityBadge priority={t.priority} />
                        </div>
                        <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{t.title}</div>
                        <div className="text-xs mt-1" style={{ color: A.textDim }}>{t.owner} · {t.dueDate || "—"}</div>
                      </li>
                    ))}
                    {grouped[s].length === 0 && <li className="text-xs" style={{ color: A.textDim }}>—</li>}
                  </ul>
                </Panel>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva tarea" size="md"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Crear</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><FormField label="Título" required><input className={inputClass} style={inputStyle} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required /></FormField></div>
          <FormField label="Proyecto"><select className={inputClass} style={inputStyle} value={draft.projectId || ""} onChange={(e) => setDraft({ ...draft, projectId: e.target.value || undefined })}><option value="">—</option>{PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></FormField>
          <FormField label="Cliente"><select className={inputClass} style={inputStyle} value={draft.clientId || ""} onChange={(e) => setDraft({ ...draft, clientId: e.target.value || undefined })}><option value="">—</option>{CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}</select></FormField>
          <FormField label="Responsable"><input className={inputClass} style={inputStyle} value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} /></FormField>
          <FormField label="Fecha límite"><input type="date" className={inputClass} style={inputStyle} value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} /></FormField>
          <FormField label="Prioridad"><select className={inputClass} style={inputStyle} value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value as Priority })}>{PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}</select></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as TaskStatus })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <div className="sm:col-span-2"><FormField label="Etiquetas" hint="Separadas por coma"><input className={inputClass} style={inputStyle} value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="landing, CRO, urgent" /></FormField></div>
          <div className="sm:col-span-2"><FormField label="Descripción"><textarea rows={3} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></FormField></div>
        </div>
      </Modal>
    </AppShell>
  );
}
