import { Flame, MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { LEGACY_PATHS } from "@/config/routes";
import type { PujaSummary } from "@/features/pujas/queries";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/utils";

export function PujasSection({ pujas }: { pujas: PujaSummary[] }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <Section className="bg-sand">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t("pujas.eyebrow")} title={t("pujas.title")} intro={t("pujas.intro")} />
          <ButtonLink href={LEGACY_PATHS.pujaServices} variant="outline" className="self-start md:self-auto">
            {t("pujas.viewAll")}
          </ButtonLink>
        </div>

        {pujas.length === 0 ? (
          <p className="mt-10 rounded-[var(--radius-card)] bg-white p-6 text-earth-muted">{t("pujas.empty")}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pujas.map((puja) => {
              const name = pick(locale, puja.nameEn, puja.nameHi);
              return (
                <article key={puja.id} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)]">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-saffron-700 text-white">
                    <Flame className="size-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-earth">{name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-earth-muted">
                    {pick(locale, puja.descriptionEn, puja.descriptionHi)}
                  </p>
                  <p className="mt-4 text-xs italic text-earth-muted">{t("pujas.rates")}</p>
                  <a
                    href={buildWhatsAppLink(locale, { topic: "puja", pujaName: name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-whatsapp-dark hover:underline"
                  >
                    <MessageCircle className="size-4" />
                    {t("actions.enquire")}
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
