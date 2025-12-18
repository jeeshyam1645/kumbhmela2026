import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Loader2, ChevronLeft, ChevronRight, Star, ShieldCheck, HeartHandshake, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { bathingDates, Camp, PujaService } from "@app/shared"; 

// --- CONFIGURATION ---
const WA_NUMBER = "919936399677"; // Your number with Country Code
const WA_MESSAGE = "Namaste, I am interested in Magh Mela 2026 accommodation. Please share rates and details."; // Pre-filled message
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

// HERO CAROUSEL IMAGES
const heroImages = [
  {
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055846/knocksense_2025-01-13_jcozh2xg_manoj-chhabra-81_bi4x8l.avif",
    titleEn: "Experience Divinity at Sangam",
    titleHi: "संगम पर दिव्यता का अनुभव करें",
    subtitleEn: "Secure, Warm & Comfortable Swiss Tents for Magh Mela 2026",
    subtitleHi: "माघ मेला 2026 के लिए सुरक्षित, गर्म और आरामदायक स्विस टेंट"
  },
  {
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055847/kumbh-mela-2025-tent-cities-1-2025-01-8be5d2fc3d38ece31a0c8da633e88743-scaled_ilkdkf.avif",
    titleEn: "Your Home in the Holy City",
    titleHi: "पवित्र शहर में आपका घर",
    subtitleEn: "Starting from Just 500m from the Holy Bathing Ghats",
    subtitleHi: "पवित्र स्नान घाटों से सिर्फ 500 मीटर की दूरी से शुरू"
  },
  {
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055846/Mahakumbh-tent-new_yhusf3.avif",
    titleEn: "Warmth in Winter",
    titleHi: "सर्दियों में गर्माहट",
    subtitleEn: "Premium Woolen Bedding & 24/7 Assistance",
    subtitleHi: "प्रीमियम ऊनी बिस्तर और 24/7 सहायता"
  }
];

// FALLBACK IMAGES
const campImages = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2069&auto=format&fit=crop",
];
const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // CAROUSEL LOGIC
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // FETCH DATA
  const { data: camps, isLoading: isLoadingCamps } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/camps`);
      if (!response.ok) throw new Error("Failed to load camps");
      return response.json();
    },
  });

  const { data: pujas, isLoading: isLoadingPujas } = useQuery<PujaService[]>({
    queryKey: ["/api/puja-services"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/puja-services`);
      if (!response.ok) throw new Error("Failed to load pujas");
      return response.json();
    },
  });

  const isLoading = isLoadingCamps || isLoadingPujas;

  return (
    <div className="min-h-screen font-sans" data-testid="page-home">
      
      {/* --- HERO SECTION (CAROUSEL) --- */}
      <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] hover:scale-105"
              style={{ backgroundImage: `url(${slide.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-400 text-orange-200 text-sm font-semibold mb-4 backdrop-blur-sm">
                  {t("Magh Mela 2026", "माघ मेला 2026")}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                  {t(slide.titleEn, slide.titleHi)}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md font-medium">
                  {t(slide.subtitleEn, slide.subtitleHi)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* WHATSAPP CTA - PRIMARY */}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t("Get Rates on WhatsApp", "व्हाट्सएप पर रेट जानें")}
                    </Button>
                  </a>
                  
                  {/* PHONE CALL - SECONDARY */}
                  <a href={`tel:${WA_NUMBER}`}>
                     <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/50 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-sm">
                        <Phone className="w-5 h-5 mr-2" />
                        {t("Call Us", "हमें कॉल करें")}
                     </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all hidden md:block">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all hidden md:block">
          <ChevronRight className="w-8 h-8" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- TRUST INDICATORS --- */}
      <section className="bg-[#FFFBF0] border-b border-orange-100">
         <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-orange-100/50">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600"><ShieldCheck className="w-6 h-6"/></div>
                  <div>
                    <h3 className="font-bold text-gray-800">{t("Safe & Secure", "सुरक्षित")}</h3>
                    <p className="text-sm text-gray-500">{t("Guarded Compound", "गार्डेड कंपाउंड")}</p>
                  </div>
               </div>
               <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-orange-100/50">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600"><HeartHandshake className="w-6 h-6"/></div>
                  <div>
                    <h3 className="font-bold text-gray-800">{t("Local Hosts", "स्थानीय मेजबान")}</h3>
                    <p className="text-sm text-gray-500">{t("Authentic Hospitality", "प्रामाणिक आतिथ्य")}</p>
                  </div>
               </div>
               <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-orange-100/50">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600"><Star className="w-6 h-6"/></div>
                  <div>
                    <h3 className="font-bold text-gray-800">{t("Prime Location", "प्रमुख स्थान")}</h3>
                    <p className="text-sm text-gray-500">{t("Near Sangam", "संगम के पास")}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- ACCOMMODATION SECTION --- */}
      <section className="py-20 bg-gradient-to-b from-[#FFFBF0] to-white" data-testid="section-accommodation-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12">
            <div>
              <span className="text-orange-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
                 {t("Your Comfort is Our Duty", "आपकी सुविधा हमारा कर्तव्य है")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("Our Accommodation", "हमारा आवास")}
              </h2>
              <p className="text-gray-600 max-w-xl text-lg">
                {t("Choose from our range of comfortable stays. Contact us for the best rates.", "हमारे आरामदायक प्रवास विकल्पों में से चुनें। सर्वोत्तम दरों के लिए हमसे संपर्क करें।")}
              </p>
            </div>
            <Link href="/accommodation">
              <Button variant="outline" className="border-orange-200 text-orange-800 hover:bg-orange-50">
                {t("View All Tents", "सभी टेंट देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
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

      {/* --- PUJA SERVICES SECTION --- */}
      <section className="py-20 bg-orange-50/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="text-orange-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
                {t("Connect with the Divine", "परमात्मा से जुड़ें")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("Spiritual Assistance & Vedic Rituals", "आध्यात्मिक सहायता और वैदिक अनुष्ठान")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t(
                "We facilitate connections with learned Purohits. Samagri arrangements are handled with devotion.", 
                "हम विद्वान पुरोहितों के साथ संपर्क की सुविधा प्रदान करते हैं। सामग्री की व्यवस्था भक्तिभाव से की जाती है।"
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
               <div className="col-span-3 flex justify-center py-10">
                 <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
               </div>
            ) : (
               pujas?.slice(0, 3).map((service) => (
                 <PujaServiceCard key={service.id} service={service} />
               ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/puja-services">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                {t("View Ritual Arrangements", "अनुष्ठान व्यवस्था देखें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- BATHING DATES SECTION --- */}
      <section className="py-20 bg-sky-50/50 border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-sky-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
                {t("Mark Your Calendar", "अपना कैलेंडर चिह्नित करें")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("Important Bathing Dates", "महत्वपूर्ण स्नान तिथियां")}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t("Plan your spiritual journey around these auspicious dates for the holy dip.", "पवित्र डुबकी के लिए इन शुभ तिथियों के आसपास अपनी आध्यात्मिक यात्रा की योजना बनाएं।")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bathingDates.map((date) => (
              <div 
                key={date.date} 
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  date.importance === "highest" 
                    ? "bg-white border-2 border-orange-400 shadow-md relative overflow-hidden" 
                    : "bg-white border border-sky-100 shadow-sm"
                }`}
              >
                {date.importance === "highest" && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-orange-500"></div>
                )}
                <div className={`text-3xl font-bold mb-1 ${date.importance === "highest" ? "text-orange-600" : "text-gray-800"}`}>
                    {new Date(date.date).getDate()}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">
                    {new Date(date.date).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="text-sm font-medium text-gray-700 leading-tight">
                    {t(date.nameEn, date.nameHi)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/kumbh-guide">
              <Button variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50">
                {t("Learn More About Kumbh", "कुंभ के बारे में और जानें")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (WhatsApp Focused) --- */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("Ready to Book Your Spiritual Stay?", "अपना आध्यात्मिक प्रवास बुक करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t("We have limited availability for the main bathing dates. Chat with us now to get the best quote.", "मुख्य स्नान तिथियों के लिए हमारे पास सीमित उपलब्धता है। सर्वोत्तम उद्धरण प्राप्त करने के लिए अभी हमारे साथ चैट करें।")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xl px-10 py-8 rounded-full shadow-2xl transition-transform hover:scale-105">
                <MessageCircle className="w-6 h-6 mr-3" />
                {t("Chat on WhatsApp", "व्हाट्सएप पर चैट करें")}
              </Button>
            </a>
          </div>
          
          <p className="mt-6 text-white/80 text-sm font-medium">
             Or Call us at: <a href={`tel:${WA_NUMBER}`} className="underline hover:text-white">+91 99363 99677</a>
          </p>

        </div>
      </section>
    </div>
  );
}