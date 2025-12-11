import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("Home", "होम") },
    { href: "/kumbh-guide", label: t("Kumbh Guide", "कुंभ गाइड") },
    { href: "/accommodation", label: t("Accommodation", "आवास") },
    { href: "/puja-services", label: t("Puja Services", "पूजा सेवाएं") },
    { href: "/contact", label: t("Contact", "संपर्क") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg md:text-xl">
                  {t("M", "म")}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-semibold text-lg ${isScrolled ? "text-foreground" : "text-white"}`}>
                  {t("Magh Mela", "माघ मेला")}
                </span>
                <span className={`block text-xs ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>
                  {t("Prayagraj 2025", "प्रयागराज 2025")}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : isScrolled
                        ? "text-foreground"
                        : "text-white"
                    }`}
                    data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <div
                className="flex items-center rounded-full border border-border overflow-hidden"
                data-testid="language-toggle"
              >
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : isScrolled
                      ? "text-foreground"
                      : "text-white"
                  }`}
                  data-testid="button-lang-en"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === "hi"
                      ? "bg-primary text-primary-foreground"
                      : isScrolled
                      ? "text-foreground"
                      : "text-white"
                  }`}
                  data-testid="button-lang-hi"
                >
                  हिं
                </button>
              </div>

              <Link href="/contact" className="hidden md:block">
                <Button data-testid="button-check-availability">
                  <Phone className="w-4 h-4 mr-2" />
                  {t("Check Availability", "उपलब्धता जांचें")}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            className="lg:hidden bg-background border-t border-border"
            data-testid="nav-mobile"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <Link href="/contact" className="fixed bottom-20 right-4 z-40 md:hidden">
        <Button size="lg" className="shadow-lg rounded-full" data-testid="button-mobile-cta">
          <Phone className="w-5 h-5 mr-2" />
          {t("Check Availability", "जांचें")}
        </Button>
      </Link>
    </>
  );
}
