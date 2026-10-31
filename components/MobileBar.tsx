"use client";

import { usePathname } from "next/navigation";
import { site, whatsAppLink } from "@/lib/site";
import { useT } from "./Language";

export function MobileBar() {
  const pathname = usePathname();
  const { t } = useT();
  if (pathname === "/thank-you") return null;
  const href = whatsAppLink(t(
    "Namaste, I would like to enquire about a Magh Mela 2026 stay.",
    "नमस्ते, मैं माघ मेला 2026 में ठहरने के बारे में पूछताछ करना चाहता हूँ।",
  ));
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-orange-200 bg-white md:hidden">
      <a href={`tel:${site.phone}`} className="flex-1 py-3 text-center text-sm font-semibold text-saffron-dark">{t("Call", "कॉल")}</a>
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
    </div>
  );
}
