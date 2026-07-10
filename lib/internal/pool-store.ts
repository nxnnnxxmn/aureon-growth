"use client";

/**
 * usePool — pool de prospectos con backend real y degradación elegante.
 * Alimenta la Cola del día. Reemplaza los flags contactado/lead en
 * localStorage con el flag `contacted` de la fila y el enlace `leadId`.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import { POOL_KEY, CONTACTED_KEY, LEADS_KEY, type PoolItem, type Prospect } from "@/lib/prospeccion";

export type PoolRow = PoolItem & { contacted?: boolean; leadId?: string };
export type DbMode = "db" | "local" | "loading";

function readLocalPool(): PoolRow[] {
  try { return JSON.parse(localStorage.getItem(POOL_KEY) || "[]"); } catch { return []; }
}
function writeLocalPool(list: PoolRow[]) {
  try { localStorage.setItem(POOL_KEY, JSON.stringify(list)); } catch {}
}
function readLocalFlags(key: string): Record<string, true> {
  try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; }
}
function writeLocalFlag(key: string, id: string) {
  try {
    const flags = readLocalFlags(key);
    flags[id] = true;
    localStorage.setItem(key, JSON.stringify(flags));
  } catch {}
}

/** Merge del pool DB con los flags locales (cuando estamos en modo local). */
function withLocalFlags(pool: PoolRow[]): PoolRow[] {
  const contactedFlags = readLocalFlags(CONTACTED_KEY);
  const leadFlags = readLocalFlags(LEADS_KEY);
  return pool.map((p) => ({
    ...p,
    contacted: p.contacted ?? !!contactedFlags[p.id],
    leadId: p.leadId ?? (leadFlags[p.id] ? "local" : undefined),
  }));
}

export function usePool() {
  const [pool, setPool] = useState<PoolRow[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/pool");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setPool(j.pool as PoolRow[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setPool(withLocalFlags(readLocalPool())); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  /** Añadir prospectos de una búsqueda (batch upsert por osmId). */
  const addBatch = useCallback(async (prospects: Prospect[], zoneLabel: string): Promise<number> => {
    if (mode === "db") {
      const r = await fetch("/api/pool", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: prospects.map((p) => ({ ...p, zoneLabel })) }),
      });
      const j = await r.json();
      if (!j.ok) return 0;
      // refrescar pool completo tras upsert
      const g = await (await fetch("/api/pool")).json();
      if (g.ok) setPool(g.pool as PoolRow[]);
      return j.created || 0;
    }
    // Local: dedup + cap 800 (mismo comportamiento que el helper original)
    const now = Date.now();
    const known = new Set(pool.map((p) => p.id));
    const fresh: PoolRow[] = prospects
      .filter((p) => !known.has(p.id))
      .map((p) => ({ ...p, zoneLabel, addedAt: now }));
    if (fresh.length === 0) return 0;
    const next = [...pool, ...fresh].slice(-800);
    writeLocalPool(next);
    setPool(withLocalFlags(next));
    return fresh.length;
  }, [mode, pool]);

  const markContacted = useCallback(async (osmId: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/pool/${encodeURIComponent(osmId)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacted: true }),
      });
      const j = await r.json();
      if (!j.ok) return false;
    } else {
      writeLocalFlag(CONTACTED_KEY, osmId);
    }
    setPool((arr) => arr.map((p) => (p.id === osmId ? { ...p, contacted: true } : p)));
    return true;
  }, [mode]);

  const markLead = useCallback(async (osmId: string, leadId: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/pool/${encodeURIComponent(osmId)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, contacted: true }),
      });
      const j = await r.json();
      if (!j.ok) return false;
    } else {
      writeLocalFlag(LEADS_KEY, osmId);
    }
    setPool((arr) => arr.map((p) => (p.id === osmId ? { ...p, leadId, contacted: true } : p)));
    return true;
  }, [mode]);

  return { pool, mode, addBatch, markContacted, markLead };
}

/* Re-export de tipos y keys que otros archivos aún importan de lib/prospeccion */
export type { PoolItem, Prospect };
export { STORE_KEYS };
