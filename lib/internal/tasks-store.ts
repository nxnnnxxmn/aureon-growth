"use client";

/**
 * useTasks — store de Tareas con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Task. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Task } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Task[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.tasks) || "[]"); } catch { return []; }
}
function writeLocal(list: Task[]) {
  try { localStorage.setItem(STORE_KEYS.tasks, JSON.stringify(list)); } catch {}
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/tasks");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setTasks(j.tasks as Task[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setTasks(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Task, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setTasks((arr) => [j.task as Task, ...arr]);
      return true;
    }
    setTasks((arr) => { const next = [{ id: `T-${400 + arr.length + 1}-${uid()}`, ...draft } as Task, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Task>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/tasks/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setTasks((arr) => { const next = arr.map((t) => (t.id === id ? { ...t, ...patch } : t)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setTasks((arr) => { const next = arr.filter((t) => t.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { tasks, mode, create, update, remove };
}
