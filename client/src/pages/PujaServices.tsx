import { useQuery } from "@tanstack/react-query";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { PujaService } from "@app/shared"; 
import { Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "";
export default function PujaServices() {
  const { t } = useLanguage();

  // FETCH DATA FROM API
  const { data: services, isLoading } = useQuery<PujaService[]>({
    queryKey: ["/api/puja-services"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/puja-services`);
      if (!response.ok) throw new Error("Failed to load puja services");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen pt-20" data-testid="page-puja-services">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("Purohit Arrangements & Vedic Rituals", "पुरोहित व्यवस्था और वैदिक अनुष्ठान")}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "We assist in arranging experienced Brahmins for your Sankalp and Rituals at the sacred Sangam. We handle the Samagri logistics so you can focus purely on devotion.",
              "हम पवित्र संगम पर आपके संकल्प और अनुष्ठानों के लिए अनुभवी ब्राह्मणों की व्यवस्था करने में सहायता करते हैं। हम सामग्री रसद संभालते हैं ताकि आप पूरी तरह से भक्ति पर ध्यान केंद्रित कर सकें।"
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
              {t("How We Assist Your Spiritual Journey", "हम आपकी आध्यात्मिक यात्रा में कैसे सहायता करते हैं")}
            </h2>
            <div className="space-y-4 text-muted-foreground text-left">
              <p>
                {t(
                  "Finding the right priest during the busy Magh Mela can be challenging. We bridge this gap by connecting you with trusted, learned Purohits who perform rituals with strict adherence to Vedic traditions.",
                  "व्यस्त माघ मेला के दौरान सही पुजारी को खोजना चुनौतीपूर्ण हो सकता है। हम आपको विश्वसनीय, विद्वान पुरोहितों के साथ जोड़कर इस अंतर को पाटते हैं जो वैदिक परंपराओं का कड़ाई से पालन करते हुए अनुष्ठान करते हैं।"
                )}
              </p>
              <p>
                {t(
                  "Transparency is our core value. While we charge a nominal fee for arranging the Samagri (materials) and logistics, the Dakshina (honorarium) is a voluntary offering between you and the Priest.",
                  "पारदर्शिता हमारा मूल मूल्य है। जबकि हम सामग्री और रसद की व्यवस्था के लिए नाममात्र शुल्क लेते हैं, दक्षिणा (मानदेय) आपके और पुजारी के बीच एक स्वैच्छिक पेशकश है।"
                )}
              </p>
              <p>
                {t(
                  "From arranging the sacred space to guiding you through the Vidhi, our on-ground team ensures your ritual is conducted peacefully amidst the Mela crowd.",
                  "पवित्र स्थान की व्यवस्था करने से लेकर विधि के माध्यम से आपका मार्गदर्शन करने तक, हमारी ऑन-ग्राउंड टीम यह सुनिश्चित करती है कि मेला भीड़ के बीच आपका अनुष्ठान शांतिपूर्वक आयोजित किया जाए।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}