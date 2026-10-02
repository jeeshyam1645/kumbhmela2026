import { MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { site } from "@/config/site";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";

export function ClosingCta() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <div className="rounded-[2rem] bg-gradient-to-br from-saffron-600 to-saffron-800 px-6 py-12 text-center text-white md:px-16 md:py-16">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{t("cta.text")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={buildWhatsAppLink(locale)} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
              <MessageCircle />
              {t("actions.chatOnWhatsApp")}
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone.tel}`} variant="light" size="lg">
              <Phone />
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
