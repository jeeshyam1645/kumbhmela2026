import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";

/** Desktop only; phones use the bottom action bar instead. */
export function FloatingWhatsApp() {
  const t = useTranslations("actions");
  const locale = useLocale() as Locale;

  return (
    <a
      href={buildWhatsAppLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("chatOnWhatsApp")}
      className="fixed bottom-6 right-6 z-40 hidden size-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle className="size-8" />
    </a>
  );
}
