"use client";

import { usePathname } from "next/navigation";
import { site, whatsAppLink } from "@/lib/site";
import { useT } from "./Language";

export function MobileBar() {
  const pathname = usePathname();
  const { t } = useT();
  if (pathname === "/thank-you") return null;
  const href = whatsAppLink(t(
    "Namaste, I would like to enquire about a Magh Mela 2027 stay.",
    "नमस्ते, मैं माघ मेला 2027 में ठहरने के बारे में पूछताछ करना चाहता हूँ।",
  ));
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-paper md:hidden">
      <a href={`tel:${site.phone}`} className="flex min-h-12 flex-1 items-center justify-center text-sm font-semibold text-saffron-dark active:bg-soft">{t("Call", "कॉल")}</a>
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-1 items-center justify-center bg-[#075e54] text-sm font-semibold text-white active:bg-[#064e46]">WhatsApp</a>
    </div>
  );
}
