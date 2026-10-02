/**
 * Pages served by this app. Every other path is forwarded to the old (v1)
 * site until it is rebuilt here. Paths are written without a locale prefix:
 * "/" covers both "/" (English) and "/hi" (Hindi).
 *
 * To release a rebuilt page, add its path here.
 */
export const REBUILT_PATHS = ["/"] as const;

/** Paths that still live on the old site. Links to these must be plain <a> tags. */
export const LEGACY_PATHS = {
  about: "/about-us",
  accommodation: "/accommodation",
  pujaServices: "/puja-services",
  kumbhGuide: "/kumbh-guide",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
} as const;

const LOCALE_PREFIX = /^\/(en|hi)(?=\/|$)/;

export function stripLocale(pathname: string): string {
  return pathname.replace(LOCALE_PREFIX, "") || "/";
}

export function isRebuiltPath(pathname: string): boolean {
  const path = stripLocale(pathname).replace(/\/$/, "") || "/";
  return (REBUILT_PATHS as readonly string[]).includes(path);
}
