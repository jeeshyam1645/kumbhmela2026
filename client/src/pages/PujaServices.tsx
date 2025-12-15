import { useQuery } from "@tanstack/react-query";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { PujaService } from "@shared/types"; // Import TYPE, not the variable
import { Loader2 } from "lucide-react";

export default function PujaServices() {
  const { t } = useLanguage();

  // FETCH DATA FROM API
  const { data: services, isLoading } = useQuery<PujaService[]>({
    queryKey: ["/api/puja-services"],
    queryFn: async () => {
      const response = await fetch("/api/puja-services");
      if (!response.ok) throw new Error("Failed to load puja services");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen pt-20" data-testid="page-puja-services">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("Divine Rituals & Vedic Services", "दैवीय पूजा और वैदिक अनुष्ठान")}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "Experience authentic Vedic rituals performed by learned priests at the sacred Sangam. Rates depend on Samagri and Dakshina. Contact us for customization.",
              "पवित्र संगम पर विद्वान पुजारियों द्वारा किए गए प्रामाणिक वैदिक अनुष्ठानों का अनुभव करें। दरें सामग्री और दक्षिणा पर निर्भर करती हैं। अनुकूलन के लिए हमसे संपर्क करें।"
            )}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16" data-testid="section-puja-list">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* LOADING STATE */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* MAP OVER FETCHED DATA */}
              {services?.map((service) => (
                <PujaServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30" data-testid="section-puja-info">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {t("About Our Puja Services", "हमारी पूजा सेवाओं के बारे में")}
            </h2>
            <div className="space-y-4 text-muted-foreground text-left">
              <p>
                {t(
                  "At Magh Mela, we facilitate authentic Vedic rituals performed by experienced and learned Brahmin priests who have deep knowledge of the scriptures and traditions. Our services are designed to help devotees connect with the divine at this sacred confluence of rivers.",
                  "माघ मेला में, हम अनुभवी और विद्वान ब्राह्मण पुजारियों द्वारा किए गए प्रामाणिक वैदिक अनुष्ठानों की सुविधा प्रदान करते हैं जिनके पास शास्त्रों और परंपराओं का गहन ज्ञान है। हमारी सेवाएं भक्तों को नदियों के इस पवित्र संगम पर परमात्मा से जुड़ने में मदद करने के लिए डिज़ाइन की गई हैं।"
                )}
              </p>
              <p>
                {t(
                  "Each puja is customized according to your specific requirements and intentions. The rates vary based on the samagri (materials) used and the dakshina (honorarium) for the priests. We recommend discussing your needs with our team for an accurate quote.",
                  "प्रत्येक पूजा आपकी विशिष्ट आवश्यकताओं और इरादों के अनुसार अनुकूलित है। दरें उपयोग की जाने वाली सामग्री और पुजारियों के लिए दक्षिणा (मानदेय) के आधार पर भिन्न होती हैं। हम सटीक उद्धरण के लिए हमारी टीम के साथ अपनी आवश्यकताओं पर चर्चा करने की सलाह देते हैं।"
                )}
              </p>
              <p>
                {t(
                  "All our rituals are performed with proper vidhi-vidhan (prescribed procedures) as mentioned in the scriptures. We provide all necessary arrangements including the sacred space, materials, and expert guidance throughout the ceremony.",
                  "हमारे सभी अनुष्ठान शास्त्रों में उल्लिखित उचित विधि-विधान के साथ किए जाते हैं। हम पूरे समारोह में पवित्र स्थान, सामग्री और विशेषज्ञ मार्गदर्शन सहित सभी आवश्यक व्यवस्थाएं प्रदान करते हैं।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}