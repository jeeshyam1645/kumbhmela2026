export const NEXT_PUBLIC_GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17813766593";

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const LEAD_CONVERSION_SEND_TO = `${NEXT_PUBLIC_GOOGLE_ADS_ID}/f7foCJmS2b4dEMGDoq5C`;

/** Fire a gtag event. Other Ads conversion labels (send_to: 'AW-17813766593/<label>') can be added later. */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const payload: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  window.gtag("event", name, payload);
  if (name !== "generate_lead") return;
  const conversion: Record<string, string | number> = { send_to: LEAD_CONVERSION_SEND_TO };
  if (payload.value !== undefined) conversion.value = payload.value;
  if (payload.currency !== undefined) conversion.currency = payload.currency;
  window.gtag("event", "conversion", conversion);
}
