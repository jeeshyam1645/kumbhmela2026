import { MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";
import { acharyaPhoto } from "../content";

export function GuidanceSection() {
  const t = useTranslations("guidance");
  const locale = useLocale() as Locale;

  return (
    <Section>
      <Container className="grid items-center gap-10 md:grid-cols-[2fr_3fr] lg:gap-16">
        <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
          <Image src={acharyaPhoto} alt={t("name")} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover object-top" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 font-serif text-lg text-white">
            {t("name")}
          </figcaption>
        </figure>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-4 py-1.5 text-sm font-semibold text-earth">
            <Sparkles className="size-4" />
            {t("badge")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-earth md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-earth-muted">{t("text")}</p>
          <ButtonLink
            href={buildWhatsAppLink(locale, { topic: "guidance" })}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="mt-8"
          >
            <MessageCircle />
            {t("cta")}
          </ButtonLink>
          <p className="mt-3 text-sm text-earth-muted">{t("note")}</p>
        </div>
      </Container>
    </Section>
  );
}
