/**
 * CONSENT MANAGEMENT — Cookie consent state + change broadcasting.
 *
 * Architecture:
 *   - Stored in localStorage (key: lancheros_consent_v1)
 *   - Custom event "lancheros:consent_change" fires when state changes
 *   - Analytics component subscribes to events and loads scripts only on consent
 *
 * Legal frameworks supported:
 *   - LGPD (Colombia · Ley 1581 de 2012 + Decreto 1377 de 2013)
 *   - GDPR (EU)
 *   - LGPD Brasil (similar)
 *
 * Default behavior:
 *   - First visit: no consent assumed, banner shown, analytics NOT loaded
 *   - On consent: stored for 12 months, banner hidden, analytics loads
 *   - On reject: only necessary cookies, analytics NEVER loads
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: boolean; // Always true — required for site to function
  analytics: boolean;
  marketing: boolean;
  /** ISO date when consent was given */
  timestamp: string;
  /** Version of consent model (bump if categories change) */
  version: number;
}

const STORAGE_KEY = "lancheros_consent_v1";
const CONSENT_VERSION = 1;
const CONSENT_TTL_DAYS = 365;
export const CONSENT_EVENT = "lancheros:consent_change";

/** Default state when no consent has been given */
export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
  version: CONSENT_VERSION,
};

/**
 * Read consent from localStorage.
 * Returns null if no consent given (banner should show) or if expired.
 */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;

    // Invalidate if version bumped (categories changed)
    if (parsed.version !== CONSENT_VERSION) return null;

    // Invalidate if older than TTL
    if (parsed.timestamp) {
      const ageDays =
        (Date.now() - new Date(parsed.timestamp).getTime()) /
        (1000 * 60 * 60 * 24);
      if (ageDays > CONSENT_TTL_DAYS) return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Persist consent + broadcast change.
 */
export function setConsent(consent: Partial<ConsentState>): ConsentState {
  const next: ConsentState = {
    ...DEFAULT_CONSENT,
    ...consent,
    necessary: true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
    } catch {
      // localStorage may be blocked — fail silently
    }
  }

  return next;
}

/**
 * Convenience: accept all categories
 */
export function acceptAll(): ConsentState {
  return setConsent({ analytics: true, marketing: true });
}

/**
 * Convenience: reject all optional categories
 */
export function rejectAll(): ConsentState {
  return setConsent({ analytics: false, marketing: false });
}

/**
 * Check if a specific category has consent.
 * Returns false if no consent has been given at all.
 */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const c = getConsent();
  return c ? c[category] : false;
}
