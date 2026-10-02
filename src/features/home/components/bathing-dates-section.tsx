import { Star } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { bathingDates } from "@/config/bathing-dates";
import { LEGACY_PATHS } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { cn, pick } from "@/lib/utils";

export function BathingDatesSection() {
  const t = useTranslations("dates");
  const format = useFormatter();
  const locale = useLocale() as Locale;

  return (
    <Section className="bg-gradient-to-b from-river to-[#123f52]">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title", { season: site.season })}
          intro={t("intro")}
          tone="light"
          align="center"
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bathingDates.map((bath) => {
            const date = new Date(`${bath.date}T00:00:00+05:30`);
            const highest = bath.importance === "highest";
            return (
              <li
                key={bath.date}
                className={cn(
                  "flex items-center gap-4 rounded-[var(--radius-card)] p-5",
                  highest ? "bg-gold text-earth" : "bg-white/10 text-white ring-1 ring-white/20",
                )}
              >
                <time dateTime={bath.date} className="flex w-16 shrink-0 flex-col items-center leading-none">
                  <span className="text-3xl font-bold">{format.dateTime(date, { day: "numeric" })}</span>
                  <span className="mt-1 text-xs font-semibold uppercase">{format.dateTime(date, { month: "short" })}</span>
                </time>
                <div>
                  <p className="text-lg font-semibold">{pick(locale, bath.nameEn, bath.nameHi)}</p>
                  <p className={cn("text-sm", highest ? "text-earth/75" : "text-white/70")}>
                    {format.dateTime(date, { weekday: "long" })}
                  </p>
                  {highest && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold uppercase">
                      <Star className="size-3 fill-current" />
                      {t("mostImportant")}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-10 text-center">
          <a href={LEGACY_PATHS.kumbhGuide} className="font-semibold text-gold underline-offset-4 hover:underline">
            {t("guide")} →
          </a>
        </p>
      </Container>
    </Section>
  );
}
