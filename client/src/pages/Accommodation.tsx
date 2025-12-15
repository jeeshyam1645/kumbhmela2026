import { useQuery } from "@tanstack/react-query";
import { Camp } from "@shared/types";
import { Loader2 } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { useLanguage } from "@/context/LanguageContext"; // <--- Import

const campImages = [
  "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
];

export default function Accommodation() {
  const { t } = useLanguage(); // <--- Hook
  
  const { data: camps, isLoading } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
      const response = await fetch("/api/camps");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4 font-serif text-primary">
        {t("Luxury Accommodation", "लक्जरी आवास")}
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {t(
          "Experience the divine atmosphere of Kumbh Mela with our premium camping options.",
          "हमारे प्रीमियम कैंपिंग विकल्पों के साथ कुंभ मेले के दिव्य वातावरण का अनुभव करें।"
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps?.map((camp, index) => (
          <AccommodationCard 
            key={camp.id} 
            camp={camp} 
            imageUrl={camp.imageUrl || campImages[index % campImages.length]} 
          />
        ))}
      </div>
    </div>
  );
}