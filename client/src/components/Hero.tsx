import { Link } from "wouter";
import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { bathingDates } from "@shared/schema";

export function Hero() {
  const { t } = useLanguage();

  const nextBathingDate = bathingDates.find(
    (d) => new Date(d.date) >= new Date()
  ) || bathingDates[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1609947017136-9daf32c78206?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-white/90 text-sm">
            {t("Magh Mela", "माघ मेला")} 2025 • {t("Prayagraj", "प्रयागराज")}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t("Your Spiritual Home at", "प्रयागराज में आपका")}
          <span className="block text-primary mt-2">
            {t("Prayagraj", "आध्यात्मिक घर")}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t(
            "Experience divine comfort at the sacred Sangam. Premium camps with modern amenities and traditional hospitality.",
            "पवित्र संगम पर दिव्य आराम का अनुभव करें। आधुनिक सुविधाओं और पारंपरिक आतिथ्य के साथ प्रीमियम कैंप।"
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/contact">
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-hero-cta">
              {t("Check Availability", "उपलब्धता जांचें")}
            </Button>
          </Link>
          <Link href="/accommodation">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white"
              data-testid="button-hero-explore"
            >
              {t("Explore Camps", "कैंप देखें")}
            </Button>
          </Link>
        </div>

        <a
          href="#trust-section"
          className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">{t("Scroll to explore", "अधिक जानें")}</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm py-3 overflow-hidden">
        <div className="animate-scroll-ticker whitespace-nowrap flex items-center gap-8">
          <span className="text-primary-foreground font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t("Next Bathing Date:", "अगला स्नान तिथि:")} {nextBathingDate.nameEn} ({nextBathingDate.nameHi}) - {new Date(nextBathingDate.date).toLocaleDateString()}
          </span>
          <span className="text-primary-foreground/80">•</span>
          <span className="text-primary-foreground font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t("Next Bathing Date:", "अगला स्नान तिथि:")} {nextBathingDate.nameEn} ({nextBathingDate.nameHi}) - {new Date(nextBathingDate.date).toLocaleDateString()}
          </span>
          <span className="text-primary-foreground/80">•</span>
          <span className="text-primary-foreground font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t("Next Bathing Date:", "अगला स्नान तिथि:")} {nextBathingDate.nameEn} ({nextBathingDate.nameHi}) - {new Date(nextBathingDate.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </section>
  );
}
