"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useT } from "./Language";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-ink text-orange-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl">Magh Mela 2026</p>
          <p className="mt-2 text-sm text-orange-100/80">{t("Camps near Sangam, Prayagraj.", "संगम के पास शिविर, प्रयागराज।")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{t("Visit", "देखें")}</p>
          <Link className="block text-orange-100/80" href="/accommodation">{t("Stays", "आवास")}</Link>
          <Link className="block text-orange-100/80" href="/puja-services">{t("Rituals", "अनुष्ठान")}</Link>
          <Link className="block text-orange-100/80" href="/kumbh-guide">{t("Guide", "गाइड")}</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{t("Contact", "संपर्क")}</p>
          <a className="block text-orange-100/80" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <a className="block text-orange-100/80" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="text-orange-100/80">{t("Near Sangam, Prayagraj", "संगम के पास, प्रयागराज")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{t("Legal", "कानूनी")}</p>
          <Link className="block text-orange-100/80" href="/privacy">{t("Privacy", "गोपनीयता")}</Link>
          <Link className="block text-orange-100/80" href="/terms">{t("Terms", "नियम")}</Link>
          <Link className="block text-orange-100/80" href="/credits">{t("Photo credits", "फ़ोटो श्रेय")}</Link>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-orange-100/60">
        © 2026 Magh Mela Camp. {t("Plot location depends on the Mela Adhikari allotment.", "स्थान मेला अधिकारी के आवंटन पर निर्भर है।")}
      </p>
    </footer>
  );
}
