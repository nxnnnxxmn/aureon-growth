"use client";

/**
 * useInvoices — store de Facturación con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Invoice. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Invoice } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Invoice[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.invoices) || "[]"); } catch { return []; }
}
function writeLocal(list: Invoice[]) {
  try { localStorage.setItem(STORE_KEYS.invoices, JSON.stringify(list)); } catch {}
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/invoices");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setInvoices(j.invoices as Invoice[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setInvoices(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Invoice, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setInvoices((arr) => [j.invoice as Invoice, ...arr]);
      return true;
    }
    setInvoices((arr) => { const next = [{ id: `I-${700 + arr.length + 1}-${uid()}`, ...draft } as Invoice, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Invoice>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setInvoices((arr) => { const next = arr.map((i) => (i.id === id ? { ...i, ...patch } : i)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setInvoices((arr) => { const next = arr.filter((i) => i.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { invoices, mode, create, update, remove };
}
