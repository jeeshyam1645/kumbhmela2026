import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { LEGACY_PATHS } from "@/config/routes";
import { site } from "@/config/site";
import { listCamps } from "@/features/camps/queries";
import { BathingDatesSection } from "@/features/home/components/bathing-dates-section";
import { CampsSection } from "@/features/home/components/camps-section";
import { ClosingCta } from "@/features/home/components/closing-cta";
import { Countdown } from "@/features/home/components/countdown";
import { GuidanceSection } from "@/features/home/components/guidance-section";
import { HeroSlider } from "@/features/home/components/hero-slider";
import { PujasSection } from "@/features/home/components/pujas-section";
import { TrustStrip } from "@/features/home/components/trust-strip";
import { heroSlides } from "@/features/home/content";
import { listPujas } from "@/features/pujas/queries";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/utils";

/** Rebuild from the database at most every 5 minutes. */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await rootLocale()) as Locale;
  return {
    alternates: {
      canonical: getPathname({ href: "/", locale }),
      languages: { en: "/", hi: "/hi", "x-default": "/" },
    },
  };
}

export default async function HomePage() {
  const [camps, pujas] = await Promise.all([listCamps(), listPujas()]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CampsSection camps={camps} />
      <PujasSection pujas={pujas} />
      <BathingDatesSection />
      <GuidanceSection />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const slides = heroSlides.map((slide) => ({
    image: slide.image,
    title: pick(locale, slide.titleEn, slide.titleHi),
    subtitle: pick(locale, slide.subtitleEn, slide.subtitleHi),
  }));

  return (
    <HeroSlider slides={slides} badge={t("hero.badge", { season: site.season })}>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={LEGACY_PATHS.accommodation} size="lg">
          {t("actions.planJourney")}
        </ButtonLink>
        <ButtonLink href={buildWhatsAppLink(locale)} target="_blank" rel="noopener noreferrer" variant="light" size="lg">
          <MessageCircle />
          {t("actions.talkToUs")}
        </ButtonLink>
      </div>
      <Countdown />
    </HeroSlider>
  );
}
