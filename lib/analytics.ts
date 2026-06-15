/**
 * ANALYTICS — Unified API for GA4 + Microsoft Clarity.
 *
 * Setup:
 *   1. GA4: https://analytics.google.com → Create property → Get Measurement ID
 *      Set NEXT_PUBLIC_GA4_ID="G-XXXXXXXXXX" in .env
 *   2. Clarity: https://clarity.microsoft.com → Create project → Get Project ID
 *      Set NEXT_PUBLIC_CLARITY_ID="xxxxxxxxxx" in .env
 *
 * Usage from any component:
 *   import { trackEvent, trackConversion } from "@/lib/analytics";
 *   trackEvent("whatsapp_click", { source: "floating_button" });
 *   trackConversion("lead_form_submit", { service: "growth-partner" });
 *
 * Behavior:
 *   - No-op in SSR / when env vars missing (production-safe)
 *   - Logs to console in dev mode for verification
 *   - Fires to both GA4 (gtag) and Clarity simultaneously
 *   - GA4 conversions also fire as "conversion" event (for Google Ads attribution)
 */

// Window globals provided by the loaded scripts
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

const isDev = process.env.NODE_ENV === "development";

const log = (label: string, data?: Record<string, unknown>) => {
  if (isDev && typeof console !== "undefined") {
    console.log(`%c[analytics] ${label}`, "color:#c9a961", data ?? "");
  }
};

/**
 * Fire a custom event to both GA4 and Clarity.
 * @param name - Event name (snake_case recommended: "lead_form_submit", "whatsapp_click")
 * @param params - Optional event parameters
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  // GA4 via gtag
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  // Clarity custom event (different API — uses set() for filtering in dashboard)
  if (typeof window.clarity === "function") {
    window.clarity("event", name);
    // Set primary param as a tag for filtering (Clarity convention)
    Object.entries(params).forEach(([key, value]) => {
      if (window.clarity) {
        window.clarity("set", key, String(value));
      }
    });
  }

  log(`event: ${name}`, params);
}

/**
 * Fire a conversion event. Same as trackEvent but also fires the
 * GA4 "conversion" event needed for Google Ads / Meta attribution.
 */
export function trackConversion(
  name: string,
  params: Record<string, unknown> = {}
) {
  trackEvent(name, params);

  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: name,
      ...params,
    });
  }

  // Clarity: upgrade session priority so it gets recorded (high-value sessions)
  if (typeof window.clarity === "function") {
    window.clarity("upgrade", name);
  }

  log(`CONVERSION: ${name}`, params);
}

/**
 * Manually fire a page view (useful for SPA route changes).
 * In Next.js App Router this is handled automatically by the Analytics component.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    if (gaId) {
      window.gtag("config", gaId, {
        page_path: path,
        page_title: title,
      });
    }
  }

  log(`page_view: ${path}`, { title });
}

/**
 * Identify a known user (post-form-submit) so Clarity recordings can be filtered.
 * Do NOT pass PII — use hashed IDs or role descriptors.
 */
export function identifyUser(
  userIdOrTag: string,
  traits: Record<string, string> = {}
) {
  if (typeof window === "undefined") return;

  if (typeof window.clarity === "function") {
    window.clarity("identify", userIdOrTag);
    Object.entries(traits).forEach(([key, value]) => {
      if (window.clarity) window.clarity("set", key, value);
    });
  }

  log(`identify: ${userIdOrTag}`, traits);
}
