"use client";

/**
 * Aureon Command Center — data source abstraction.
 *
 * HONESTY RULE: by default the app shows NO fake data. All stores seed empty
 * ([] / 0). Mock data only loads when the operator explicitly enables
 * "modo demo" from /app/configuracion/setup, which writes the mock fixtures
 * into localStorage. Production starts honest.
 *
 * When a real backend is added, replace `useStore` with repository calls
 * (see lib/internal/repositories — to be implemented) keyed by the same names.
 */
import { useCallback, useEffect, useState } from "react";
import * as mock from "./mock-data";

export const STORE_KEYS = {
  requests: "aureon_requests_v1",
  leads: "aureon_leads_v1",
  clients: "aureon_clients_v1",
  projects: "aureon_projects_v1",
  tasks: "aureon_tasks_v1",
  events: "aureon_events_v1",
  proposals: "aureon_proposals_v1",
  contracts: "aureon_contracts_v1",
  invoices: "aureon_invoices_v1",
  expenses: "aureon_expenses_v1",
  files: "aureon_files_v1",
  notes: "aureon_notes_v1",
  providers: "aureon_providers_v1",
  subscriptions: "aureon_subscriptions_v1",
  timeentries: "aureon_time_v1",
  audit: "aureon_audit_v1",
} as const;

export const DEMO_FLAG = "aureon_demo_mode";

/** Mock fixtures, used ONLY when the operator turns on demo mode. */
export const DEMO_FIXTURES: Record<string, unknown[]> = {
  [STORE_KEYS.requests]: mock.REQUESTS,
  [STORE_KEYS.leads]: mock.LEADS,
  [STORE_KEYS.clients]: mock.CLIENTS,
  [STORE_KEYS.projects]: mock.PROJECTS,
  [STORE_KEYS.tasks]: mock.TASKS,
  [STORE_KEYS.events]: mock.EVENTS,
  [STORE_KEYS.proposals]: mock.PROPOSALS,
  [STORE_KEYS.contracts]: mock.CONTRACTS,
  [STORE_KEYS.invoices]: mock.INVOICES,
  [STORE_KEYS.expenses]: mock.EXPENSES,
  [STORE_KEYS.files]: mock.FILES,
};

/** Read whether demo mode is active (client only). */
export function isDemoActive(): boolean {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem(DEMO_FLAG) === "on"; } catch { return false; }
}

/** Turn demo ON: write all fixtures + flag. */
export function enableDemo() {
  try {
    Object.entries(DEMO_FIXTURES).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
    localStorage.setItem(DEMO_FLAG, "on");
  } catch {}
}

/** Turn demo OFF: clear every store + flag → honest empty app. */
export function disableDemo() {
  try {
    Object.values(STORE_KEYS).forEach((k) => localStorage.removeItem(k));
    localStorage.setItem(DEMO_FLAG, "off");
  } catch {}
}

/**
 * Persistent store hook. Seeds EMPTY by default (honest). If demo is active
 * the fixtures were already written to localStorage by enableDemo().
 */
export function useStore<T>(key: string): [T[], (v: T[] | ((p: T[]) => T[])) => void, boolean] {
  const [value, setValue] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T[]);
    } catch {}
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value, hydrated]);

  return [value, setValue, hydrated];
}

/** Reactive demo-mode flag for UI badges. */
export function useDemoMode(): boolean {
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    setDemo(isDemoActive());
    const onStorage = () => setDemo(isDemoActive());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return demo;
}
