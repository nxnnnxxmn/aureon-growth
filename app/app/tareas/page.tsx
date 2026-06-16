"use client";

import { useMemo, useState } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, StatusBadge, PriorityBadge, Panel } from "@/components/app/primitives";
import { TASKS } from "@/lib/internal/mock-data";
import type { Task, TaskStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: TaskStatus[] = ["Pendiente", "En progreso", "En revisión", "Bloqueada", "Completada"];

export default function TareasPage() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [filter, setFilter] = useState<"Todas" | TaskStatus>("Todas");
  const [tasks, setTasks] = useState<Task[]>(TASKS);

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

  return (
    <AppShell>
      <AppPageHeader
        title="Tareas"
        subtitle="Trabajo operativo del equipo. Mock interno."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Tareas" }]}
        actions={
          <>
            <div className="inline-flex p-1 rounded-full" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
              <button onClick={() => setView("list")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "list" ? A.gold : "transparent", color: view === "list" ? A.bg : A.text2 }}><List className="w-3.5 h-3.5" /> Lista</button>
              <button onClick={() => setView("kanban")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: view === "kanban" ? A.gold : "transparent", color: view === "kanban" ? A.bg : A.text2 }}><LayoutGrid className="w-3.5 h-3.5" /> Kanban</button>
            </div>
            <Button variant="outline"><Plus className="w-3.5 h-3.5" />Nueva tarea</Button>
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
                <div className="text-xs truncate" style={{ color: A.textDim }}>{t.service} · {t.owner} · vence {t.dueDate}</div>
              </div>
              <PriorityBadge priority={t.priority} />
              <StatusBadge status={t.status} />
              <select value={t.status} onChange={(e) => move(t.id, e.target.value as TaskStatus)} className="text-xs rounded px-2 py-1.5" style={{ backgroundColor: A.bg2, color: A.text2, border: `1px solid ${A.border}` }}>
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
                        <div className="text-xs mt-1" style={{ color: A.textDim }}>{t.owner} · {t.dueDate}</div>
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
    </AppShell>
  );
}
