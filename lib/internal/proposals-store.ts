"use client";

/**
 * useProposals — store de Propuestas con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Proposal. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Proposal } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Proposal[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.proposals) || "[]"); } catch { return []; }
}
function writeLocal(list: Proposal[]) {
  try { localStorage.setItem(STORE_KEYS.proposals, JSON.stringify(list)); } catch {}
}

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/proposals");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setProposals(j.proposals as Proposal[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setProposals(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Proposal, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/proposals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setProposals((arr) => [j.proposal as Proposal, ...arr]);
      return true;
    }
    setProposals((arr) => { const next = [{ id: `PR-${500 + arr.length + 1}-${uid()}`, ...draft } as Proposal, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Proposal>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/proposals/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setProposals((arr) => { const next = arr.map((p) => (p.id === id ? { ...p, ...patch } : p)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setProposals((arr) => { const next = arr.filter((p) => p.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { proposals, mode, create, update, remove };
}
