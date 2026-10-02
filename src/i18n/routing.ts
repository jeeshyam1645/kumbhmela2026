import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  // English lives at "/", Hindi at "/hi".
  localePrefix: "as-needed",
  // Visitors always land on English first; they switch with the EN | हिं toggle.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
