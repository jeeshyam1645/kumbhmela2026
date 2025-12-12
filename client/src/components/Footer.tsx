import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/", label: t("Home", "होम") },
    { href: "/kumbh-guide", label: t("Kumbh Guide", "कुंभ गाइड") },
    { href: "/accommodation", label: t("Accommodation", "आवास") },
    { href: "/puja-services", label: t("Puja Services", "पूजा सेवाएं") },
    { href: "/contact", label: t("Contact", "संपर्क") },
  ];

  const legalLinks = [
    { href: "/terms", label: t("Terms & Conditions", "नियम और शर्तें") },
    { href: "/privacy", label: t("Privacy Policy", "गोपनीयता नीति") },
  ];

  return (
    <footer className="bg-foreground text-background py-12 md:py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {t("M", "म")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-lg text-background">
                  {t("Magh Mela", "माघ मेला")}
                </span>
                <span className="block text-xs text-background/70">
                  {t("Prayagraj 2026", "प्रयागराज 2026")}
                </span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {t(
                "Your trusted partner for comfortable and spiritual stay during the sacred Magh Mela at Prayagraj.",
                "पवित्र माघ मेला प्रयागराज में आरामदायक और आध्यात्मिक प्रवास के लिए आपका विश्वसनीय साथी।"
              )}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">
              {t("Quick Links", "त्वरित लिंक")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.href.replace("/", "") || "home"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">
              {t("Legal", "कानूनी")}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.href.replace("/", "")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">
              {t("Contact Us", "संपर्क करें")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+917061762868"
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                    data-testid="footer-phone"
                  >
                    +91 70617 62868
                  </a>
                  <span className="block text-xs text-background/50">
                    {t("WhatsApp Available", "व्हाट्सएप उपलब्ध")}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <a
                  href="mailto:info@maghmela.com"
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                  data-testid="footer-email"
                >
                  info@maghmela.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  {t(
                    "Near Sangam, Prayagraj, Uttar Pradesh, India",
                    "संगम के पास, प्रयागराज, उत्तर प्रदेश, भारत"
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © 2026 {t("Magh Mela Camp", "माघ मेला कैंप")}. {t("All rights reserved.", "सर्वाधिकार सुरक्षित।")}
            </p>
            <p className="text-background/40 text-xs text-center">
              {t(
                "Note: Actual camp location depends on the plot allotted by the Mela Adhikari.",
                "नोट: वास्तविक कैंप स्थान मेला अधिकारी द्वारा आवंटित भूखंड पर निर्भर करता है।"
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
