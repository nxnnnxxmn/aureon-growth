"use client";

/**
 * useFiles — store de Archivos con backend real y degradación elegante.
 * SOLO METADATOS: no hay Supabase Storage conectado, así que esto nunca
 * almacena los bytes reales del archivo — solo nombre/categoría/tamaño.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": los metadatos se leen/escriben en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de FileRecord. El día que
 * conectes Supabase Storage, el flujo de subida real se agrega aparte —
 * esto solo cubre el registro de metadatos.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";
import type { FileRecord } from "./types";

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): FileRecord[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.files) || "[]"); } catch { return []; }
}
function writeLocal(list: FileRecord[]) {
  try { localStorage.setItem(STORE_KEYS.files, JSON.stringify(list)); } catch {}
}

export function useFiles() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/files");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setFiles(j.files as FileRecord[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setFiles(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<FileRecord, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/files", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setFiles((arr) => [j.file as FileRecord, ...arr]);
      return true;
    }
    setFiles((arr) => { const next = [{ id: `F-${Date.now()}-${uid()}`, ...draft } as FileRecord, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const createMany = useCallback(async (drafts: Omit<FileRecord, "id">[]): Promise<FileRecord[]> => {
    if (mode === "db") {
      const created: FileRecord[] = [];
      for (const d of drafts) {
        const r = await fetch("/api/files", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
        const j = await r.json();
        if (j.ok) created.push(j.file as FileRecord);
      }
      setFiles((arr) => [...created, ...arr]);
      return created;
    }
    const withIds = drafts.map((d, i) => ({ id: `F-${Date.now()}-${i}-${uid()}`, ...d } as FileRecord));
    setFiles((arr) => { const next = [...withIds, ...arr]; writeLocal(next); return next; });
    return withIds;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/files/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setFiles((arr) => { const next = arr.filter((f) => f.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { files, mode, create, createMany, remove };
}
