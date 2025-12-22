import { useQuery } from "@tanstack/react-query";
import { Camp } from "@app/shared";
import { Loader2, Tent } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { useLanguage } from "@/context/LanguageContext"; 

// --- MEDIA CONFIGURATION ---
const campMediaData: Record<number, string[]> = {
  1: [ // Deluxe Tent (Index 0 -> ID 1)
    "https://img1.exportersindia.com/product_images/bc-full/2020/10/1791501/swiss-cottage-tents-1604062326-5622067.jpeg", // Main Image
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766419870/WhatsApp_Video_2025-12-22_at_8.21.56_PM_mdcgd5.mp4", // Video 1
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766420195/whatsapp-video-2025-12-22-at-82302-pm_1IbTToLs_1_e4cduu.mp4"  // Video 2
  ],
  2: [ // Dormitory (Index 1 -> ID 2)
    "https://res.cloudinary.com/dh7bx2qib/image/upload/v1765948645/shared_image_2_b3je3d.jpg"
  ],
  3: [ // Swiss Cottage (Index 2 -> ID 3)
    "https://img1.exportersindia.com/product_images/bc-full/2020/10/1791501/swiss-cottage-tents-1604062326-5622067.jpeg",
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766424600/f6ce-6f5d-4077-a2f5-2858495dec39_o4lrrk.mp4" // Video
  ]
};

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/10">
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
        </div>

        {camps && camps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {camps.map((camp, index) => {
              // 1. Get the list of media for this specific card position (1, 2, or 3)
              const fullMediaList = campMediaData[index + 1] || [];
              
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