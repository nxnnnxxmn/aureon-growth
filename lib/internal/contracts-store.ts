"use client";

/**
 * useContracts — store de Contratos con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Contract. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Contract } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Contract[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.contracts) || "[]"); } catch { return []; }
}
function writeLocal(list: Contract[]) {
  try { localStorage.setItem(STORE_KEYS.contracts, JSON.stringify(list)); } catch {}
}

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/contracts");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setContracts(j.contracts as Contract[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setContracts(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Contract, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/contracts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setContracts((arr) => [j.contract as Contract, ...arr]);
      return true;
    }
    setContracts((arr) => { const next = [{ id: `CT-${600 + arr.length + 1}-${uid()}`, ...draft } as Contract, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Contract>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/contracts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setContracts((arr) => { const next = arr.map((c) => (c.id === id ? { ...c, ...patch } : c)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/contracts/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setContracts((arr) => { const next = arr.filter((c) => c.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { contracts, mode, create, update, remove };
}
