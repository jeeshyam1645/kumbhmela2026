import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppButton() {
  const { t } = useLanguage();

  const phoneNumber = "919936399677";
  const message = encodeURIComponent(
    t(
      "Hello! I am interested in booking a camp at Magh Mela 2026.",
      "नमस्ते! मुझे माघ मेला 2026 में कैंप बुक करने में रुचि है।"
    )
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-lg animate-pulse-glow"
      data-testid="button-whatsapp"
      aria-label={t("Chat on WhatsApp", "व्हाट्सएप पर चैट करें")}
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
    </a>
  );
}
