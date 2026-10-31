import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PHONE_E164, whatsAppLink } from "@/lib/site";

export function MobileContactBar() {
  const { t } = useLanguage();
  const href = whatsAppLink(
    t(
      "Namaste, I would like to enquire about a Magh Mela 2026 stay.",
      "नमस्ते, मैं माघ मेला 2026 में ठहरने के बारे में पूछताछ करना चाहता हूँ।",
    ),
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex md:hidden border-t border-orange-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <a
        href={`tel:${PHONE_E164}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-orange-900"
      >
        <Phone className="h-4 w-4" />
        {t("Call", "कॉल")}
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
