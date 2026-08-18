"use client";

/**
 * useClients — store de Clientes con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Client. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { Client } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Client[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.clients) || "[]"); } catch { return []; }
}
function writeLocal(list: Client[]) {
  try { localStorage.setItem(STORE_KEYS.clients, JSON.stringify(list)); } catch {}
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/clients");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setClients(j.clients as Client[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setClients(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Client, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setClients((arr) => [j.client as Client, ...arr]);
      return true;
    }
    setClients((arr) => { const next = [{ id: `C-${200 + arr.length + 1}-${uid()}`, ...draft } as Client, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Client>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/clients/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setClients((arr) => { const next = arr.map((c) => (c.id === id ? { ...c, ...patch } : c)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setClients((arr) => { const next = arr.filter((c) => c.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { clients, mode, create, update, remove };
}
