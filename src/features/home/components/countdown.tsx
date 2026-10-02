"use client";

import { CalendarDays } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { bathingDates } from "@/config/bathing-dates";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/utils";

const istDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

/** Today in India as YYYY-MM-DD, so the count is the same for every visitor. */
function todayInIndia() {
  return istDate.format(new Date());
}

const noopSubscribe = () => () => {};

function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

export function Countdown() {
  const t = useTranslations("countdown");
  const locale = useLocale() as Locale;
  // null during server render; the real date is filled in on the visitor's device.
  const today = useSyncExternalStore(noopSubscribe, todayInIndia, () => null);

  const next = today ? bathingDates.find((d) => d.date >= today) : undefined;

  return (
    <div className="mt-8 inline-flex min-h-16 items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-md">
      <CalendarDays className="size-7 shrink-0 text-gold" />
      {today === null ? (
        <span className="h-5 w-48 animate-pulse rounded bg-white/20" />
      ) : next ? (
        <div>
          <p className="text-xs uppercase tracking-wider text-white/70">
            {t("nextBath")}: {pick(locale, next.nameEn, next.nameHi)}
          </p>
          <p className="text-xl font-semibold">{t("daysToGo", { days: daysBetween(today, next.date) })}</p>
        </div>
      ) : (
        <p className="font-semibold">{t("seasonOver", { season: site.season + 1 })}</p>
      )}
    </div>
  );
}
