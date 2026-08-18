"use client";

/**
 * useExpenses — store de Gastos con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Expense. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Expense } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Expense[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.expenses) || "[]"); } catch { return []; }
}
function writeLocal(list: Expense[]) {
  try { localStorage.setItem(STORE_KEYS.expenses, JSON.stringify(list)); } catch {}
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/expenses");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setExpenses(j.expenses as Expense[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setExpenses(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Expense, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/expenses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setExpenses((arr) => [j.expense as Expense, ...arr]);
      return true;
    }
    setExpenses((arr) => { const next = [{ id: `E-${800 + arr.length + 1}-${uid()}`, ...draft } as Expense, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Expense>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/expenses/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setExpenses((arr) => { const next = arr.map((e) => (e.id === id ? { ...e, ...patch } : e)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setExpenses((arr) => { const next = arr.filter((e) => e.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { expenses, mode, create, update, remove };
}
