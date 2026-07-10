"use client";

/**
 * useConversations — Inbox con backend real y degradación elegante.
 * Sigue el mismo patrón que useContacts/useDeals: API-first con fallback
 * a localStorage. Mensajes se acumulan dentro de cada conversación.
 */
import { useCallback, useEffect, useState } from "react";
import { STORE_KEYS } from "./data-source";

export type Channel = "whatsapp" | "instagram" | "facebook" | "email" | "web";
export type Msg = { id: string; dir: "in" | "out"; text: string; at: number };
export type Conversation = {
  id: string;
  name: string;
  channel: Channel;
  phone?: string;
  handle?: string;
  messages: Msg[];
  unread?: boolean;
  country?: string;
};

export type DbMode = "db" | "local" | "loading";

const uid = () => Math.random().toString(36).slice(2, 10);

function readLocal(): Conversation[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEYS.conversations) || "[]"); } catch { return []; }
}
function writeLocal(list: Conversation[]) {
  try { localStorage.setItem(STORE_KEYS.conversations, JSON.stringify(list)); } catch {}
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [mode, setMode] = useState<DbMode>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/conversations");
        const j = await r.json();
        if (cancelled) return;
        if (j.ok && j.persistent) {
          setConversations(j.conversations as Conversation[]);
          setMode("db");
          return;
        }
      } catch { /* cae a local */ }
      if (!cancelled) { setConversations(readLocal()); setMode("local"); }
    })();
    return () => { cancelled = true; };
  }, []);

  /** Crear conversación con un primer mensaje entrante opcional. */
  const create = useCallback(async (draft: {
    name: string; channel: Channel; phone?: string; handle?: string; firstMsg?: string;
  }): Promise<Conversation | null> => {
    if (mode === "db") {
      const r = await fetch("/api/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const j = await r.json();
      if (!j.ok) return null;
      const conv = j.conversation as Conversation;
      setConversations((arr) => [conv, ...arr]);
      return conv;
    }
    const conv: Conversation = {
      id: uid(), name: draft.name, channel: draft.channel,
      phone: draft.phone, handle: draft.handle,
      messages: draft.firstMsg ? [{ id: uid(), dir: "in", text: draft.firstMsg, at: Date.now() }] : [],
      unread: !!draft.firstMsg,
    };
    setConversations((arr) => { const next = [conv, ...arr]; writeLocal(next); return next; });
    return conv;
  }, [mode]);

  /** Añadir mensaje a una conversación (entrante o saliente). */
  const addMessage = useCallback(async (id: string, dir: "in" | "out", text: string): Promise<boolean> => {
    if (!text.trim()) return false;
    if (mode === "db") {
      const r = await fetch(`/api/conversations/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addMessage: { dir, text }, unread: dir === "in" }),
      });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setConversations((arr) => {
      const next = arr.map((c) =>
        c.id === id
          ? { ...c, unread: dir === "in", messages: [...c.messages, { id: uid(), dir, text: text.trim(), at: Date.now() }] }
          : c,
      );
      if (mode === "local") writeLocal(next);
      return next;
    });
    return true;
  }, [mode]);

  const markRead = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/conversations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ unread: false }) });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setConversations((arr) => { const next = arr.map((c) => (c.id === id ? { ...c, unread: false } : c)); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    if (mode === "db") {
      const r = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      const j = await r.json();
      if (!j.ok) return false;
    }
    setConversations((arr) => { const next = arr.filter((c) => c.id !== id); if (mode === "local") writeLocal(next); return next; });
    return true;
  }, [mode]);

  return { conversations, mode, create, addMessage, markRead, remove };
}
