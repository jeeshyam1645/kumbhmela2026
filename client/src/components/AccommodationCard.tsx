import { useState } from "react";
import { Users, Check, MessageCircle, Phone, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react"; 
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Camp } from "@app/shared";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";
import { BookingModal } from "@/components/BookingModal";

interface AccommodationCardProps {
  camp: Camp;
  imageUrl: string;
  gallery?: string[]; // Added support for extra media
}

export function AccommodationCard({ camp, imageUrl, gallery = [] }: AccommodationCardProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  
  const [showBooking, setShowBooking] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Combine main image with extra gallery items
  const slides = [imageUrl, ...gallery];

  const features = camp.features || [];

  // WhatsApp Logic
  const WA_NUMBER = "919936399677"; 
  const campName = language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn;
  const waMessage = `Namaste, I am interested in ${campName}. Please share availability and details.`; 
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  // Carousel Handlers
  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Helper to check if URL is video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <>
      <Card className="overflow-hidden group border-orange-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full" data-testid={`card-camp-${camp.id}`}>
        
        {/* --- CAROUSEL SECTION --- */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          
          {/* Media Render */}
          {isVideo(slides[currentSlide]) ? (
            <video 
              src={slides[currentSlide]} 
              controls 
              className="w-full h-full object-cover"
              poster={slides[0]} // Use first image as poster if needed
            />
          ) : (
            <img
              src={slides[currentSlide]}
              alt={campName}
              className="w-full h-full object-cover transition-transform duration-700"
            />
          )}

          {/* Navigation Arrows (Only if > 1 slide) */}
          {slides.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full backdrop-blur-sm transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full backdrop-blur-sm transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {slides.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentSlide ? "bg-white w-3" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Capacity Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            <Badge variant="secondary" className="bg-white/90 text-orange-800 backdrop-blur-sm shadow-sm font-medium">
              <Users className="w-3 h-3 mr-1" />
              {t(camp.capacity, camp.capacity)}
            </Badge>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
              {campName}
            </h3>
          </div>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {language === "hi" && camp.descriptionHi ? camp.descriptionHi : camp.descriptionEn}
          </p>

          {/* Features List */}
          <div className="space-y-2 mb-2">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>

        {/* --- ACTION FOOTER --- */}
        <CardFooter className="p-5 pt-0 flex flex-col gap-3 mt-auto">
          
            {/* Primary Action: WhatsApp Inquiry */}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("Check Availability", "उपलब्धता जांचें")} 
                </Button>
            </a>

            {/* Secondary Action: Callback Request */}
            {user ? (
                <Button 
                    variant="outline" 
                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => setShowBooking(true)}
                >
                    <Phone className="w-4 h-4 mr-2" />
                    {t("Request Callback", "कॉल बैक का अनुरोध करें")}
                </Button>
            ) : (
                <AuthModal 
                    trigger={
                        <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-orange-600">
                            {t("Login to Request Call", "कॉल के लिए लॉगिन करें")}
                        </Button>
                    } 
                />
            )}

        </CardFooter>
      </Card>

      {/* Render Inquiry Modal */}
      {showBooking && (
        <BookingModal 
          isOpen={showBooking} 
          onClose={() => setShowBooking(false)} 
          camp={camp} 
          defaultTab="inquiry" 
        />
      )}
    </>
  );
}