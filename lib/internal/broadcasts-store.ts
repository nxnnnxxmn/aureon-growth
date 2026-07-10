"use client";

/**
 * useBroadcasts — Broadcasts con backend real y degradación elegante.
 * Mismo patrón que useContacts/useDeals/useConversations.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";

export type Broadcast = {
  id: string;
  name: string;
  kind: "whatsapp" | "meta-ads";
  audienceTag: string;
  templateId?: string;
  objective?: string;
  budget?: string;
  status: "Borrador" | "Activo" | "Cerrado";
  sent: string[];
  country?: string;
  createdAt: number;
};

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Broadcast[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.broadcasts) || "[]"); } catch { return []; }
}
function writeLocal(list: Broadcast[]) {
  try { localStorage.setItem(STORE_KEYS.broadcasts, JSON.stringify(list)); } catch {}
}

export function useBroadcasts() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/broadcasts");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setBroadcasts(j.broadcasts as Broadcast[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setBroadcasts(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const create = useCallback(async (draft: Omit<Broadcast, "id" | "status" | "sent" | "createdAt">): Promise<Broadcast | null> => {
    if (mode === "db") {
      const r = await fetch("/api/broadcasts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return null;
      const b = j.broadcast as Broadcast;
      setBroadcasts((arr) => [b, ...arr]);
      return b;
    }
    const b: Broadcast = { id: uid(), status: "Borrador", sent: [], createdAt: Date.now(), ...draft };
    setBroadcasts((arr) => { const next = [b, ...arr]; writeLocal(next); return next; });
    return b;
  }, [mode]);

  const setStatus = useCallback(async (id: string, status: Broadcast["status"]): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/broadcasts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setBroadcasts((arr) => { const next = arr.map((b) => (b.id === id ? { ...b, status } : b)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  /** Marcar un contacto como enviado (idempotente, activa el broadcast automático). */
  const markSent = useCallback(async (id: string, contactId: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/broadcasts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markSent: contactId }) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setBroadcasts((arr) => {
      const next = arr.map((b) =>
        b.id === id
          ? {
              ...b,
              status: (b.status === "Borrador" ? "Activo" : b.status) as Broadcast["status"],
              sent: [...new Set([...b.sent, contactId])],
            }
          : b,
      );
      if (mode === "local") writeLocal(next);
      return next;
    });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/broadcasts/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setBroadcasts((arr) => { const next = arr.filter((b) => b.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { broadcasts, mode, create, setStatus, markSent, remove };
}
