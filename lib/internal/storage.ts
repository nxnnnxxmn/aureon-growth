"use client";

/**
 * localStorage hook with SSR-safe defaults. Used to persist module data
 * (requests, leads, agent workspace) until a real backend is wired.
 */
import { useCallback, useEffect, useState } from "react";

export function useLocal<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {}
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, hydrated]);

  const reset = useCallback(() => {
    try { localStorage.removeItem(key); } catch {}
    setValue(initial);
  }, [key, initial]);

  return [value, setValue, reset];
}
