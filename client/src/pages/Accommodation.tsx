import { useQuery } from "@tanstack/react-query";
import { Camp } from "@app/shared";
import { Loader2, Tent } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { useLanguage } from "@/context/LanguageContext";
import { mediaForCamp } from "@/lib/campMedia";
import { Seo } from "@/components/Seo";
import { lodgingJsonLd } from "@/lib/jsonld";
import { TENT_OFFERS } from "@/lib/site";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Accommodation() {
  const { t } = useLanguage(); 
  
  const { data: camps, isLoading } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/camps`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/10">
      <Seo
        title="Accommodation | Magh Mela Stays"
        description="Swiss Cottage, Deluxe Tent, and Dormitory camps for Magh Mela Prayagraj 2026. Attached or shared bathrooms, bedding, and nightly rates from ₹999."
        path="/accommodation"
        jsonLd={[lodgingJsonLd()]}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary mb-4">
            {t("Comfort-First Pilgrimage", "आरामदायक तीर्थयात्रा")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
                "Experience the divine atmosphere of Kumbh Mela with our premium camping options. Clean, safe, and warm.",
                "हमारे प्रीमियम कैंपिंग विकल्पों के साथ कुंभ मेले के दिव्य वातावरण का अनुभव करें। स्वच्छ, सुरक्षित और गर्म।"
            )}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {TENT_OFFERS.map((offer) => `${offer.name} · ₹${offer.price.toLocaleString("en-IN")}/night`).join(" · ")}
            </p>
        </div>

        {camps === undefined || isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : camps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {camps.map((camp) => {
              const fullMediaList = mediaForCamp(camp.nameEn);
              
              // 2. First item is the main image/video
              const mainImage = fullMediaList[0] || "";
              
              // 3. Remaining items are the gallery
              const extraImages = fullMediaList.slice(1);

              return (
                <AccommodationCard 
                  key={camp.id} 
                  camp={camp} 
                  imageUrl={mainImage} 
                  gallery={extraImages}
                />
              );
            })}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Tent className="h-16 w-16 mb-4 opacity-20" />
                <p>{t("No camps available at the moment.", "फिलहाल कोई कैंप उपलब्ध नहीं है।")}</p>
            </div>
        )}
      </div>
    </div>
  );
}