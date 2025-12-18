import { useState } from "react";
import { Users, Check, MessageCircle, Phone, Info } from "lucide-react"; 
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
}

export function AccommodationCard({ camp, imageUrl }: AccommodationCardProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  
  const [showBooking, setShowBooking] = useState(false);

  const features = camp.features || [];

  // WhatsApp Logic for this specific camp
  const WA_NUMBER = "919936399677"; 
  const campName = language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn;
  const waMessage = `Namaste, I am interested in ${campName}. Please share availability and best rates.`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <Card className="overflow-hidden group border-orange-100 hover:shadow-lg transition-all duration-300" data-testid={`card-camp-${camp.id}`}>
        
        {/* --- IMAGE SECTION --- */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={campName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Capacity Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/90 text-orange-800 backdrop-blur-sm shadow-sm font-medium">
              <Users className="w-3 h-3 mr-1" />
              {t(camp.capacity, camp.capacity)}
            </Badge>
          </div>
          {/* Price Badge (Subtle Overlay) */}
          <div className="absolute bottom-3 right-3">
             <div className="bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-md text-xs font-medium border border-white/20">
                {t("Starts @", "शुरुआत @")} ₹{camp.price}
             </div>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <CardContent className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
            {campName}
          </h3>
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
        <CardFooter className="p-5 pt-0 flex flex-col gap-3">
          
            {/* Primary Action: WhatsApp Inquiry */}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("Chat for Best Rate", "रेट के लिए चैट करें")}
                </Button>
            </a>

            {/* Secondary Action: Callback Request (Requires Login) */}
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

      {/* Render Inquiry Modal (Reusing BookingModal in 'inquiry' mode) */}
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