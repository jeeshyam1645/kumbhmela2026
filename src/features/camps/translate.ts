import type { Locale } from "@/i18n/routing";

/**
 * Hindi for camp features and capacity, which v1 stores in English only.
 * Replaced by Hindi columns edited from the admin in Part 4.
 * Features missing here are shown in English.
 */
const featuresHi: Record<string, string> = {
  "Premium Double Bed": "प्रीमियम डबल बेड",
  "Private En-suite Washroom": "निजी अटैच्ड बाथरूम",
  "Thermal Carpet Flooring": "थर्मल कारपेट फ़र्श",
  "Power & Charging Point": "बिजली व चार्जिंग पॉइंट",
  "2 Single Beds": "2 सिंगल बेड",
  "Shared Bathroom": "साझा बाथरूम",
  Heater: "हीटर",
  Mattress: "गद्दा",
  "Clean Linens": "साफ़ चादरें",
  "Single Cot": "सिंगल चारपाई",
  "Common Locker": "साझा लॉकर",
  "Charging Point": "चार्जिंग पॉइंट",
  "Shared Washroom": "साझा शौचालय",
};

export function campFeature(locale: Locale, feature: string) {
  return locale === "hi" ? (featuresHi[feature.trim()] ?? feature) : feature;
}

/** "2-3 Persons" → "2-3 व्यक्ति" */
export function campCapacity(locale: Locale, capacity: string) {
  return locale === "hi" ? capacity.replace(/\b(persons?|people|pax)\b/i, "व्यक्ति") : capacity;
}
