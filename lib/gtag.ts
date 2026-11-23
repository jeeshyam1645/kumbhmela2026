export const NEXT_PUBLIC_GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17813766593";

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a gtag event. Ads conversion labels (send_to: 'AW-17813766593/<label>') can be added later. */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const payload: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  window.gtag("event", name, payload);
}
