import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/section";
import { LEGACY_PATHS } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { Logo } from "./logo";
import { navItems } from "./nav-items";
import { SiteLink } from "./site-link";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <footer className="bg-earth pb-28 pt-14 text-white/80 md:pb-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">{t("footer.about")}</p>
          </div>

          <FooterColumn title={t("footer.quickLinks")}>
            {navItems.map((item) => (
              <li key={item.key}>
                <SiteLink href={item.href} className="hover:text-white">
                  {t(`nav.${item.key}`)}
                </SiteLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.legal")}>
            <li>
              <SiteLink href={LEGACY_PATHS.terms} className="hover:text-white">
                {t("footer.terms")}
              </SiteLink>
            </li>
            <li>
              <SiteLink href={LEGACY_PATHS.privacy} className="hover:text-white">
                {t("footer.privacy")}
              </SiteLink>
            </li>
          </FooterColumn>

          <FooterColumn title={t("footer.contact")}>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                <a href={`tel:${site.phone.tel}`} className="hover:text-white">
                  {site.phone.display}
                </a>
                <span className="block text-xs text-white/50">{t("footer.whatsappAvailable")}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{site.address[locale]}</span>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/50 md:flex-row md:justify-between">
          <p>
            © {site.season} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.plotNote")}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
