import { Link } from "wouter";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { bathingDates, Camp, PujaService } from "@shared/types"; // Import Types only

// Fallback images if admin hasn't uploaded one yet
const campImages = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2069&auto=format&fit=crop",
];

export default function Home() {
  const { t } = useLanguage();

  // 1. FETCH CAMPS
  const { data: camps, isLoading: isLoadingCamps } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
      const response = await fetch("/api/camps");
      if (!response.ok) throw new Error("Failed to load camps");
      return response.json();
    },
  });

  // 2. FETCH PUJAS
  const { data: pujas, isLoading: isLoadingPujas } = useQuery<PujaService[]>({
    queryKey: ["/api/puja-services"],
    queryFn: async () => {
      const response = await fetch("/api/puja-services");
      if (!response.ok) throw new Error("Failed to load pujas");
      return response.json();
    },
  });

  const isLoading = isLoadingCamps || isLoadingPujas;

  return (
    <div className="min-h-screen" data-testid="page-home">
      <Hero />
      <TrustIndicators />

      {/* ACCOMMODATION SECTION */}
      <section className="py-16 md:py-20" data-testid="section-accommodation-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t("Our Accommodation", "हमारा आवास")}
              </h2>
              <p className="text-muted-foreground">
                {t("Choose from our range of comfortable stays", "हमारे आरामदायक प्रवास विकल्पों में से चुनें")}
              </p>
            </div>
            <Link href="/accommodation">
              <Button variant="outline">
                {t("View All", "सभी देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-3 flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              camps?.slice(0, 3).map((camp, index) => (
                <AccommodationCard
                  key={camp.id}
                  camp={camp}
                  imageUrl={camp.imageUrl || campImages[index % campImages.length]}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* PUJA SERVICES SECTION */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("Divine Rituals & Vedic Services", "दैवीय पूजा और वैदिक अनुष्ठान")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("Rates depend on Samagri and Dakshina. Contact us for customization.", "दरें सामग्री और दक्षिणा पर निर्भर करती हैं। अनुकूलन के लिए हमसे संपर्क करें।")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
               <div className="col-span-3 flex justify-center py-10">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
            ) : (
               pujas?.slice(0, 3).map((service) => (
                 <PujaServiceCard key={service.id} service={service} />
               ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/puja-services">
              <Button variant="outline">
                {t("View All Services", "सभी सेवाएं देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BATHING DATES SECTION */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("Important Bathing Dates", "महत्वपूर्ण स्नान तिथियां")}
            </h2>
            <p className="text-muted-foreground">
              {t("Plan your spiritual journey around these auspicious dates", "इन शुभ तिथियों के आसपास अपनी आध्यात्मिक यात्रा की योजना बनाएं")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bathingDates.map((date) => (
              <div key={date.date} className={`p-4 rounded-lg text-center ${date.importance === "highest" ? "bg-primary/10 border-2 border-primary" : "bg-muted/50 border border-border"}`}>
                <div className="text-2xl font-bold text-foreground mb-1">{new Date(date.date).getDate()}</div>
                <div className="text-xs text-muted-foreground mb-2">{new Date(date.date).toLocaleDateString("en-US", { month: "short" })}</div>
                <div className="text-xs font-medium text-foreground">{t(date.nameEn, date.nameHi)}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/kumbh-guide">
              <Button>{t("Learn More About Kumbh", "कुंभ के बारे में और जानें")}<ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {t("Ready to Book Your Spiritual Stay?", "अपना आध्यात्मिक प्रवास बुक करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t("Contact us now to secure your accommodation at Magh Mela 2026. Our team will call you within 2 hours.", "माघ मेला 2026 में अपना आवास सुरक्षित करने के लिए अभी हमसे संपर्क करें। हमारी टीम 2 घंटे के भीतर आपको कॉल करेगी।")}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t("Check Availability Now", "अभी उपलब्धता जांचें")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}