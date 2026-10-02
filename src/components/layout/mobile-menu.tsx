"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/config/site";
import { buildWhatsAppLink } from "@/features/whatsapp/link";
import type { Locale } from "@/i18n/routing";
import { navItems } from "./nav-items";
import { SiteLink } from "./site-link";

export function MobileMenu() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("nav.closeMenu") : t("nav.menu")}
        className="flex size-11 items-center justify-center rounded-full text-earth hover:bg-sand"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cream px-4 pb-10 pt-4"
        >
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <SiteLink
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg font-medium text-earth"
              >
                {t(`nav.${item.key}`)}
              </SiteLink>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <ButtonLink
              variant="whatsapp"
              size="lg"
              href={buildWhatsAppLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              {t("actions.chatOnWhatsApp")}
            </ButtonLink>
            <ButtonLink variant="outline" size="lg" href={`tel:${site.phone.tel}`}>
              <Phone />
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
