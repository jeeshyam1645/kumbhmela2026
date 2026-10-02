"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="flex overflow-hidden rounded-full border border-line bg-white text-sm font-medium"
    >
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "px-3 py-1.5 transition-colors",
            locale === current ? "bg-saffron-600 text-white" : "text-earth hover:bg-sand",
          )}
        >
          {t(locale)}
        </Link>
      ))}
    </nav>
  );
}
