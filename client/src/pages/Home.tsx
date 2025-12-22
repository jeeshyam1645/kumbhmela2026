import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Loader2, ChevronLeft, ChevronRight, Star, ShieldCheck, HeartHandshake, MessageCircle, Phone, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PujaServiceCard } from "@/components/PujaServiceCard";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { bathingDates, Camp, PujaService } from "@app/shared"; 

// --- CONFIGURATION ---
const WA_NUMBER = "919936399677"; 
const WA_MESSAGE = "Namaste, I am interested in Magh Mela 2026 accommodation. Please share details."; 
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

// HERO CAROUSEL IMAGES (Main Titles)
// const heroImages = [
//   {
//     url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055846/knocksense_2025-01-13_jcozh2xg_manoj-chhabra-81_bi4x8l.avif",
//     titleEn: "Sacred Dip at Sangam, Blessings for Life",
//     titleHi: "संगम में स्नान, जीवन का कल्याण",
//     subtitleEn: "Comfort is essential in your spiritual journey",
//     subtitleHi: "आस्था के सफर में आराम भी ज़रूरी"
//   },
//   {
//     url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055847/kumbh-mela-2025-tent-cities-1-2025-01-8be5d2fc3d38ece31a0c8da633e88743-scaled_ilkdkf.avif",
//     titleEn: "Prayagraj is Calling",
//     titleHi: "प्रयागराज बुला रहा है",
//     subtitleEn: "Safe and comfortable stay near the holy Sangam",
//     subtitleHi: "संगम के पास सुरक्षित और आरामदायक ठहराव"
//   },
//   {
//     url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055846/Mahakumbh-tent-new_yhusf3.avif",
//     titleEn: "Where Faith Meets Peace",
//     titleHi: "चलो संगम की ओर",
//     subtitleEn: "Where noise stops and serenity begins",
//     subtitleHi: "जहाँ शोर रुक जाता है और सुकून शुरू होता है"
//   }
// ];

// HERO CAROUSEL IMAGES (REFINED FOR HUMILITY & TRUST)
const heroImages = [
  {
    // HIGHLIGHT 1: BHUMI PUJAN
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766417368/WhatsApp_Image_2025-12-20_at_12.41.46_PM_xyhvwm.jpg", 
    titleEn: "Magh Mela 2025: The Sacred Beginning",
    titleHi: "माघ मेला 2025: पवित्र शुभारंभ",
    subtitleEn: "Continuing our family's tradition of performing the Bhumi Pujan for the Mela grounds",
    subtitleHi: "मेला क्षेत्र के भूमि पूजन की पारिवारिक परंपरा का निर्वहन करते हुए आचार्य गण"
  },
  {
    // HIGHLIGHT 2: POLICE/ADMIN PUJA
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766416628/WhatsApp_Image_2025-12-18_at_11.21.26_PM_l1lk7c.jpg", 
    titleEn: "Praying for Everyone's Safety",
    titleHi: "सर्वजन हिताय: सुरक्षा और शांति की प्रार्थना",
    subtitleEn: "Seeking divine blessings for a safe Mela alongside the Administration & Police force",
    subtitleHi: "मेला प्रशासन और पुलिस के साथ मिलकर निर्विघ्न आयोजन हेतु वैदिक प्रार्थना"
  },
  {
    // HIGHLIGHT 3: ACCOMMODATION
    url: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766055846/knocksense_2025-01-13_jcozh2xg_manoj-chhabra-81_bi4x8l.avif",
    titleEn: "Your Sanctuary at Sangam",
    titleHi: "संगम तट पर आपका आध्यात्मिक घर",
    subtitleEn: "A quiet, safe space to rest after your holy dip",
    subtitleHi: "स्नान के बाद विश्राम के लिए एक शांत और सुरक्षित स्थान"
  }
];

// TICKER SLOGANS (To mix with dates)
const tickerSlogans = [
    { en: "Sangam call for the soul", hi: "संगम की पुकार, चलो प्रयागराज" },
    { en: "Peace in every moment", hi: "संगम के पास एक शांत सा ठिकाना" },
    { en: "Faith, Peace, and Comfort", hi: "आस्था, शांति और सुकून एक साथ" }
];

// FALLBACK IMAGES
const campImages = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2069&auto=format&fit=crop",
];

const campMediaData: Record<number, string[]> = {
  1: [ // Deluxe Tent (ID 1)
    "https://img1.exportersindia.com/product_images/bc-full/2020/10/1791501/swiss-cottage-tents-1604062326-5622067.jpeg", // Extra Image 1
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766419870/WhatsApp_Video_2025-12-22_at_8.21.56_PM_mdcgd5.mp4", // Video
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766420195/whatsapp-video-2025-12-22-at-82302-pm_1IbTToLs_1_e4cduu.mp4"
  ],
  2: [ // Dormitory (ID 2)
    "https://res.cloudinary.com/dh7bx2qib/image/upload/v1765948645/shared_image_2_b3je3d.jpg"
  ],
  3: [ // Swiss Cottage (ID 3)
    "https://img1.exportersindia.com/product_images/bc-full/2020/10/1791501/swiss-cottage-tents-1604062326-5622067.jpeg",
    "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766420195/whatsapp-video-2025-12-22-at-82302-pm_1IbTToLs_1_e4cduu.mp4" // Video
  ]
};
const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Home() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // LOGIC: Find next bathing date for ticker
  const nextBathingDate = bathingDates.find(
    (d) => new Date(d.date) >= new Date()
  ) || bathingDates[0];

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
            {/* Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] hover:scale-105"
              style={{ backgroundImage: `url(${slide.url})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
            
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10">
              <div className={`transform transition-all duration-1000 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 shadow-xl">
                   <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                   <span className="text-orange-100 text-sm font-medium tracking-wide">
                     {t("Magh Mela 2026 • Prayagraj", "माघ मेला 2026 • प्रयागराज")}
                   </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
                  {t(slide.titleEn, slide.titleHi)}
                </h1>
                
                <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md font-medium leading-relaxed">
                  {t(slide.subtitleEn, slide.subtitleHi)}
                </p>

                {/* Primary Actions (No "Rates" word) */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105 border-none">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t("Plan Your Journey", "अपनी यात्रा की योजना बनाएं")}
                    </Button>
                  </a>
                  
                  <a href={`tel:${WA_NUMBER}`}>
                     <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/50 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-md transition-all">
                        <Phone className="w-5 h-5 mr-2" />
                        {t("Talk to Us", "हमसे बात करें")}
                     </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all hidden md:block border border-white/10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all hidden md:block border border-white/10">
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* SCROLLING TICKER (MIXED CONTENT) */}
        <div className="absolute bottom-0 left-0 right-0 bg-orange-900/90 backdrop-blur-md py-3 overflow-hidden border-t border-orange-500/30 z-20">
          <div className="animate-scroll-ticker whitespace-nowrap flex items-center gap-12">
             {/* We repeat the pattern: Date -> Slogan -> Date -> Slogan */}
             {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-12">
                    
                    {/* 1. Next Bathing Date */}
                    <span className="text-orange-50 font-medium flex items-center gap-3 text-sm md:text-base">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span className="opacity-75">{t("Next Bathing Date:", "अगला स्नान तिथि:")}</span> 
                        <span className="font-bold text-white">{t(nextBathingDate.nameEn, nextBathingDate.nameHi)}</span>
                        <span className="bg-orange-500/20 px-2 py-0.5 rounded text-xs border border-orange-500/30">
                            {new Date(nextBathingDate.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' })}
                        </span>
                    </span>

                    {/* 2. Slogan from your list */}
                    <span className="text-orange-100 italic font-medium flex items-center gap-2 text-sm md:text-base">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        {t(tickerSlogans[i].en, tickerSlogans[i].hi)}
                    </span>

                </div>
             ))}
          </div>
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
                {t("Choose from our range of comfortable stays. Plan your visit today.", "हमारे आरामदायक प्रवास विकल्पों में से चुनें। आज ही अपनी यात्रा की योजना बनाएं।")}
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
              camps?.slice(0, 3).map((camp, index) => {
                
                // 1. Get the specific media list for this card (1, 2, or 3)
                // We use (index + 1) to map Array Index 0 -> ID 1, etc.
                const fullMediaList = campMediaData[index + 1] || [];

                // 2. Extract the first image for the 'imageUrl' prop
                const mainImage = fullMediaList[0] || ""; 

                // 3. Extract the rest for the 'gallery' prop
                const extraImages = fullMediaList.slice(1);

                return (
                  <AccommodationCard
                    key={camp.id}
                    camp={camp}
                    // This forces the card to ONLY use your hardcoded media
                    imageUrl={mainImage} 
                    gallery={extraImages} 
                  />
                );
              })
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

      {/* --- ASTROLOGY / GUIDANCE SECTION --- */}
      <section className="py-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-indigo-950 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 opacity-90"></div>
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Side */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-800/50 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-indigo-100 text-sm font-medium">
                  {t("Exclusive for Our Guests", "हमारे अतिथियों के लिए विशेष")}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                {t("Vedic Guidance & Jyotish Paramarsh", "वैदिक मार्गदर्शन और ज्योतिष परामर्श")}
              </h2>
              
              <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                {t(
                  "A pilgrimage is the perfect time to seek clarity. Our camp is blessed by the presence of the revered Acharya Rajendra Mishra. Whether you seek answers regarding your future or spiritual growth, you may request a private session during your stay.",
                  "तीर्थयात्रा स्पष्टता पाने का सही समय है। हमारा शिविर प्रतिष्ठित आचार्य राजेंद्र मिश्र की उपस्थिति से धन्य है। चाहे आप अपने भविष्य या आध्यात्मिक विकास के बारे में उत्तर चाहते हों, आप अपने प्रवास के दौरान एक निजी सत्र का अनुरोध कर सकते हैं।"
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                 <a href={`https://wa.me/919936399677?text=${encodeURIComponent("Namaste, I am interested in seeking guidance from Acharya Rajendra Mishra ji.")}`} target="_blank">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-indigo-950 font-bold border-none text-lg px-8">
                    {t("Request Appointment", "समय का अनुरोध करें")}
                  </Button>
                </a>
              </div>
              
              <p className="mt-4 text-xs text-indigo-400 italic opacity-80">
                {t("*Availability is limited. Dakshina is voluntary.", "*उपलब्धता सीमित है। दक्षिणा स्वैच्छिक है।")}
              </p>
            </div>

            {/* Image/Visual Side */}
            <div className="w-full md:w-1/3 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-yellow-500/20 shadow-2xl bg-indigo-900/50">
                 {/* Tip: Replace this URL with a real photo of Acharya Ji for maximum trust */}
                 <img 
                   src="https://res.cloudinary.com/dh7bx2qib/image/upload/v1766414799/WhatsApp_Image_2025-12-21_at_10.57.45_PM_kndk1l.jpg" 
                   alt="Acharya Rajendra Mishra" 
                   className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                 />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
                    <p className="text-yellow-400 font-serif text-xl italic font-semibold">
                      {t("Acharya Rajendra Mishra", "आचार्य राजेंद्र मिश्र")}
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (Bottom) --- */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("Ready to Book Your Spiritual Stay?", "अपना आध्यात्मिक प्रवास बुक करने के लिए तैयार हैं?")}
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t("We have limited availability for the main bathing dates. Contact us to discuss your requirements.", "मुख्य स्नान तिथियों के लिए हमारे पास सीमित उपलब्धता है। अपनी आवश्यकताओं पर चर्चा करने के लिए हमसे संपर्क करें।")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xl px-10 py-8 rounded-full shadow-2xl transition-transform hover:scale-105 border-none">
                <MessageCircle className="w-6 h-6 mr-3" />
                {t("Plan Your Journey", "अपनी यात्रा की योजना बनाएं")}
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