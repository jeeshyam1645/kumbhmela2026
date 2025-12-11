import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { campTypes, pujaServices, bathingDates } from "@shared/schema";

const campImages = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2069&auto=format&fit=crop",
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" data-testid="page-home">
      <Hero />
      <TrustIndicators />

      <section className="py-16 md:py-20" data-testid="section-accommodation-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t("Our Accommodation", "हमारा आवास")}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "Choose from our range of comfortable stays",
                  "हमारे आरामदायक प्रवास विकल्पों में से चुनें"
                )}
              </p>
            </div>
            <Link href="/accommodation">
              <Button variant="outline" data-testid="button-view-all-camps">
                {t("View All", "सभी देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {campTypes.map((camp, index) => (
              <AccommodationCard
                key={camp.id}
                camp={camp}
                imageUrl={campImages[index]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-puja-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("Divine Rituals & Vedic Services", "दैवीय पूजा और वैदिक अनुष्ठान")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Rates depend on Samagri and Dakshina. Contact us for customization.",
                "दरें सामग्री और दक्षिणा पर निर्भर करती हैं। अनुकूलन के लिए हमसे संपर्क करें।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pujaServices.slice(0, 3).map((service) => (
              <PujaServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/puja-services">
              <Button variant="outline" data-testid="button-view-all-pujas">
                {t("View All Services", "सभी सेवाएं देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-bathing-dates-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("Important Bathing Dates", "महत्वपूर्ण स्नान तिथियां")}
            </h2>
            <p className="text-muted-foreground">
              {t(
                "Plan your spiritual journey around these auspicious dates",
                "इन शुभ तिथियों के आसपास अपनी आध्यात्मिक यात्रा की योजना बनाएं"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bathingDates.map((date) => (
              <div
                key={date.date}
                className={`p-4 rounded-lg text-center ${
                  date.importance === "highest"
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/50 border border-border"
                }`}
                data-testid={`bathing-date-${date.date}`}
              >
                <div className="text-2xl font-bold text-foreground mb-1">
                  {new Date(date.date).getDate()}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(date.date).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="text-xs font-medium text-foreground">
                  {t(date.nameEn, date.nameHi)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/kumbh-guide">
              <Button data-testid="button-learn-more-kumbh">
                {t("Learn More About Kumbh", "कुंभ के बारे में और जानें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {t("Ready to Book Your Spiritual Stay?", "अपना आध्यात्मिक प्रवास बुक करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t(
              "Contact us now to secure your accommodation at Magh Mela 2025. Our team will call you within 2 hours.",
              "माघ मेला 2025 में अपना आवास सुरक्षित करने के लिए अभी हमसे संपर्क करें। हमारी टीम 2 घंटे के भीतर आपको कॉल करेगी।"
            )}
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              data-testid="button-cta-contact"
            >
              {t("Check Availability Now", "अभी उपलब्धता जांचें")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
