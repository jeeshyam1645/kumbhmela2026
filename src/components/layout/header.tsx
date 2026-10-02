import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { LEGACY_PATHS } from "@/config/routes";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { navItems } from "./nav-items";
import { SiteLink } from "./site-link";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label={t("brand.name")}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <SiteLink
              key={item.key}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-earth transition-colors hover:bg-sand"
            >
              {t(`nav.${item.key}`)}
            </SiteLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <ButtonLink href={LEGACY_PATHS.accommodation} size="sm" className="hidden md:inline-flex">
            {t("actions.book")}
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
