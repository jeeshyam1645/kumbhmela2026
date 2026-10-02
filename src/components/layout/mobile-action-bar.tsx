import { BedDouble, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LEGACY_PATHS } from "@/config/routes";
import { site } from "@/config/site";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";

/** Fixed bottom bar on phones: the three things pilgrims do most. */
export function MobileActionBar() {
  const t = useTranslations("actions");
  const locale = useLocale() as Locale;

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-semibold";

  return (
    <nav
      aria-label={t("quickActions")}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(59_42_26/0.08)] md:hidden"
    >
      <a href={`tel:${site.phone.tel}`} className={`${item} text-earth`}>
        <Phone className="size-5" />
        {t("call")}
      </a>
      <a
        href={buildWhatsAppLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} text-whatsapp`}
      >
        <MessageCircle className="size-5" />
        {t("whatsapp")}
      </a>
      <a href={LEGACY_PATHS.accommodation} className={`${item} bg-saffron-600 text-white`}>
        <BedDouble className="size-5" />
        {t("book")}
      </a>
    </nav>
  );
}
