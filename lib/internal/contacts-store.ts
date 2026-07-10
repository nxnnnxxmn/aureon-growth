"use client";

/**
 * useContacts — store de Contactos con backend real y degradación elegante.
 *
 *  - Si la API responde `persistent:true` (Supabase/Postgres, o SQLite en dev)
 *    → modo "db": todo se lee/escribe en el servidor vía Prisma.
 *  - Si no (producción sin Postgres) → modo "local": localStorage, como antes.
 *
 * El resto de la app no cambia: misma forma de Contact. El día que conectes
 * Supabase, el mismo código pasa a persistir en la nube sin tocar la UI.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";

export type Contact = {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  tags: string[];
  fields: Record<string, string>;
  source: string;
  country?: string;
};

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Contact[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.contacts) || "[]"); } catch { return []; }
}
function writeLocal(list: Contact[]) {
  try { localStorage.setItem(STORE_KEYS.contacts, JSON.stringify(list)); } catch {}
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/contacts");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setContacts(j.contacts as Contact[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setContacts(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Contact, "id">): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return false;
      setContacts((arr) => [j.contact as Contact, ...arr]);
      return true;
    }
    setContacts((arr) => { const next = [{ id: uid(), ...draft } as Contact, ...arr]; writeLocal(next); return next; });
    return true;
  }, [mode]);

  const update = useCallback(async (id: string, patch: Partial<Contact>): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/contacts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setContacts((arr) => { const next = arr.map((c) => (c.id === id ? { ...c, ...patch } : c)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setContacts((arr) => { const next = arr.filter((c) => c.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  /** Importar varios (desde el pool de Prospección) — dedup por nombre+teléfono. */
  const importMany = useCallback(async (incoming: Omit<Contact, "id">[]): Promise<number> => {
    const known = new Set(contacts.map((c) => `${c.name}|${c.phone || ""}`));
    const fresh = incoming.filter((c) => !known.has(`${c.name}|${c.phone || ""}`));
    if (fresh.length === 0) return 0;
    if (mode === "db") {
      const created: Contact[] = [];
      for (const c of fresh) {
        const r = await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
        const j = await r.json();
        if (j.ok) created.push(j.contact as Contact);
      }
      setContacts((arr) => [...created, ...arr]);
      return created.length;
    }
    setContacts((arr) => { const next = [...fresh.map((c) => ({ id: uid(), ...c } as Contact)), ...arr]; writeLocal(next); return next; });
    return fresh.length;
  }, [contacts, mode]);

  return { contacts, mode, create, update, remove, importMany };
}
