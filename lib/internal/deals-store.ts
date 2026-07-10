"use client";

/**
 * useDeals — store de Pipelines con backend real y degradación elegante.
 * Mismo patrón que useContacts: API-first con fallback a localStorage.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";

export type Deal = {
  id: string;
  name: string;
  contact: string;
  value: number;
  currency: string;
  stage: string;
  notes?: string;
  country?: string;
  createdAt: number;
};

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Deal[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.deals) || "[]"); } catch { return []; }
}
function writeLocal(list: Deal[]) {
  try { localStorage.setItem(STORE_KEYS.deals, JSON.stringify(list)); } catch {}
}

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/deals");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setDeals(j.deals as Deal[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setDeals(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Deal, "id" | "createdAt">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/deals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setDeals((arr) => [j.deal as Deal, ...arr]);
      return true;
    }
    setDeals((arr) => {
      const next: Deal[] = [{ id: uid(), createdAt: Date.now(), ...draft }, ...arr];
      writeLocal(next); return next;
    });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Deal>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/deals/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setDeals((arr) => { const next = arr.map((d) => (d.id === id ? { ...d, ...patch } : d)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/deals/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setDeals((arr) => { const next = arr.filter((d) => d.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { deals, mode, create, update, remove };
}
