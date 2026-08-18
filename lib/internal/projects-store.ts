"use client";

/**
 * useProjects — store de Proyectos con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Project. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Project } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Project[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.projects) || "[]"); } catch { return []; }
}
function writeLocal(list: Project[]) {
  try { localStorage.setItem(STORE_KEYS.projects, JSON.stringify(list)); } catch {}
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/projects");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setProjects(j.projects as Project[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setProjects(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Project, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setProjects((arr) => [j.project as Project, ...arr]);
      return true;
    }
    setProjects((arr) => { const next = [{ id: `P-${300 + arr.length + 1}-${uid()}`, ...draft } as Project, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Project>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/projects/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setProjects((arr) => { const next = arr.map((p) => (p.id === id ? { ...p, ...patch } : p)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setProjects((arr) => { const next = arr.filter((p) => p.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { projects, mode, create, update, remove };
}
