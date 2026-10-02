import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/routing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Picks the Hindi value for Hindi pages when it exists, otherwise English. */
export function pick(locale: Locale, en: string, hi: string | null | undefined): string {
  return locale === "hi" && hi ? hi : en;
}
