import { Check, MessageCircle, Users } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { isOptimizableImage } from "@/config/images";
import { LEGACY_PATHS } from "@/config/routes";
import type { Camp } from "@/db/schema";
import { campCapacity, campFeature } from "@/features/camps/translate";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/utils";

export function CampsSection({ camps }: { camps: Camp[] }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <Section id="stays">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t("camps.eyebrow")} title={t("camps.title")} intro={t("camps.intro")} />
          <ButtonLink href={LEGACY_PATHS.accommodation} variant="outline" className="self-start md:self-auto">
            {t("camps.viewAll")}
          </ButtonLink>
        </div>

        {camps.length === 0 ? (
          <p className="mt-10 rounded-[var(--radius-card)] bg-sand p-6 text-earth-muted">{t("camps.empty")}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {camps.map((camp) => {
              const name = pick(locale, camp.nameEn, camp.nameHi);
              return (
                <article
                  key={camp.id}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-[4/3] bg-sand">
                    {camp.imageUrl && (
                      <Image
                        src={camp.imageUrl}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        unoptimized={!isOptimizableImage(camp.imageUrl)}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-2xl font-semibold text-earth">{name}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-earth-muted">
                      <Users className="size-4" />
                      {campCapacity(locale, camp.capacity)}
                    </p>
                    <p className="mt-3 line-clamp-3 text-earth-muted">
                      {pick(locale, camp.descriptionEn, camp.descriptionHi)}
                    </p>
                    {camp.features && camp.features.length > 0 && (
                      <ul className="mt-4 grid gap-2 text-sm">
                        {camp.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-saffron-600" />
                            {campFeature(locale, feature)}
                          </li>
                        ))}
                      </ul>
                    )}
                    <ButtonLink
                      href={buildWhatsAppLink(locale, { topic: "camp", campName: name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      className="mt-6 w-full"
                    >
                      <MessageCircle />
                      {t("actions.checkAvailability")}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
