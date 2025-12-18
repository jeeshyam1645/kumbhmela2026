import { useQuery } from "@tanstack/react-query";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { PujaService } from "@app/shared"; 
import { Loader2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 md:py-16 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            {t("Purohit Arrangements & Vedic Rituals", "पुरोहित व्यवस्था और वैदिक अनुष्ठान")}
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
            {t(
              "We assist in arranging experienced Brahmins for your Sankalp and Rituals at the sacred Sangam. We handle the Samagri logistics so you can focus purely on devotion.",
              "हम पवित्र संगम पर आपके संकल्प और अनुष्ठानों के लिए अनुभवी ब्राह्मणों की व्यवस्था करने में सहायता करते हैं। हम सामग्री रसद संभालते हैं ताकि आप पूरी तरह से भक्ति पर ध्यान केंद्रित कर सकें।"
            )}
          </p>
        </div>
      </div>

      {/* --- ASTROLOGY / GUIDANCE SECTION (Placed First for Logic) --- */}
      <section className="py-16 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-indigo-950 text-white relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 opacity-95"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            {/* Image (Guru/Astrologer) */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
               <div className="relative aspect-[3/4] w-64 md:w-full max-w-sm rounded-xl overflow-hidden border-4 border-yellow-500/30 shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1605218427368-2c262a6df7a0?q=80&w=1956&auto=format&fit=crop" 
                   alt="Acharya Rajendra Mishra" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                    <p className="text-yellow-400 font-serif text-lg font-semibold">
                      {t("Acharya Rajendra Mishra", "आचार्य राजेंद्र मिश्र")}
                    </p>
                 </div>
               </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-800/50 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-indigo-100 text-sm font-medium">
                  {t("Vedic Guidance", "वैदिक मार्गदर्शन")}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
                {t("Seek Clarity Before You Begin", "आरंभ करने से पहले स्पष्टता प्राप्त करें")}
              </h2>
              
              <p className="text-indigo-200 text-lg mb-6 leading-relaxed max-w-2xl">
                {t(
                  "Often, we perform rituals without knowing what is truly beneficial for our life path. Acharya Rajendra Mishra provides Jyotish Paramarsh (Astrological Guidance) to help you understand your planetary influences and choose the right Anushthan for your spiritual growth.",
                  "अक्सर, हम यह जाने बिना अनुष्ठान करते हैं कि हमारे जीवन पथ के लिए वास्तव में क्या फायदेमंद है। आचार्य राजेंद्र मिश्र आपके ग्रहों के प्रभावों को समझने और आपके आध्यात्मिक विकास के लिए सही अनुष्ठान चुनने में मदद करने के लिए ज्योतिष परामर्श प्रदान करते हैं।"
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                 <a href={`https://wa.me/919936399677?text=${encodeURIComponent("Namaste, I wish to seek guidance from Acharya Rajendra Mishra ji regarding my horoscope.")}`} target="_blank">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-indigo-950 font-bold border-none text-lg px-8">
                    {t("Request Consultation", "परामर्श का अनुरोध करें")}
                  </Button>
                </a>
              </div>
              
              <p className="mt-4 text-sm text-indigo-400 italic">
                {t("*Prior appointment required. Dakshina is voluntary.", "*पूर्व नियुक्ति आवश्यक है। दक्षिणा स्वैच्छिक है।")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- PUJA LIST SECTION --- */}
      <section className="py-12 md:py-16" data-testid="section-puja-list">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="mb-10 text-center md:text-left">
             <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("Specific Rituals & Offerings", "विशिष्ट अनुष्ठान और प्रस्ताव")}
             </h2>
             <p className="text-gray-500">
                {t("We can arrange arrangements for the following rituals upon request:", "हम अनुरोध पर निम्नलिखित अनुष्ठानों के लिए व्यवस्था कर सकते हैं:")}
             </p>
          </div>

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

      {/* --- INFO / TRUST SECTION --- */}
      <section className="py-12 md:py-16 bg-muted/30 border-t border-gray-200" data-testid="section-puja-info">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {t("How We Assist Your Spiritual Journey", "हम आपकी आध्यात्मिक यात्रा में कैसे सहायता करते हैं")}
            </h2>
            <div className="space-y-4 text-muted-foreground text-left bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <p className="flex gap-3">
                <Star className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <span>
                {t(
                  "Finding the right priest during the busy Magh Mela can be challenging. We bridge this gap by connecting you with trusted, learned Purohits who perform rituals with strict adherence to Vedic traditions.",
                  "व्यस्त माघ मेला के दौरान सही पुजारी को खोजना चुनौतीपूर्ण हो सकता है। हम आपको विश्वसनीय, विद्वान पुरोहितों के साथ जोड़कर इस अंतर को पाटते हैं जो वैदिक परंपराओं का कड़ाई से पालन करते हुए अनुष्ठान करते हैं।"
                )}
                </span>
              </p>
              <p className="flex gap-3">
                <Star className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <span>
                {t(
                  "Transparency is our core value. While we charge a nominal fee for arranging the Samagri (materials) and logistics, the Dakshina (honorarium) is a voluntary offering between you and the Priest.",
                  "पारदर्शिता हमारा मूल मूल्य है। जबकि हम सामग्री और रसद की व्यवस्था के लिए नाममात्र शुल्क लेते हैं, दक्षिणा (मानदेय) आपके और पुजारी के बीच एक स्वैच्छिक पेशकश है।"
                )}
                </span>
              </p>
              <p className="flex gap-3">
                <Star className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <span>
                {t(
                  "From arranging the sacred space to guiding you through the Vidhi, our on-ground team ensures your ritual is conducted peacefully amidst the Mela crowd.",
                  "पवित्र स्थान की व्यवस्था करने से लेकर विधि के माध्यम से आपका मार्गदर्शन करने तक, हमारी ऑन-ग्राउंड टीम यह सुनिश्चित करती है कि मेला भीड़ के बीच आपका अनुष्ठान शांतिपूर्वक आयोजित किया जाए।"
                )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}