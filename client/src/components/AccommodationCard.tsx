import { useState } from "react";
import { Users, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Camp } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";
import { BookingModal } from "@/components/BookingModal"; // <--- New Booking Modal

interface AccommodationCardProps {
  camp: Camp;
  imageUrl: string;
}

export function AccommodationCard({ camp, imageUrl }: AccommodationCardProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  
  // State to control booking modal visibility
  const [showBooking, setShowBooking] = useState(false);

  // Safety check for array (in case DB returns null)
  const features = camp.features || [];

  return (
    <>
      <Card className="overflow-hidden group" data-testid={`card-camp-${camp.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              <Users className="w-3 h-3 mr-1" />
              {/* Fallback string for capacity */}
              {t(camp.capacity, camp.capacity)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {language === "hi" && camp.descriptionHi ? camp.descriptionHi : camp.descriptionEn}
          </p>

          <div className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          {/* Price Display */}
          <div className="w-full text-center py-2 bg-muted/50 rounded-md">
            <span className="text-sm font-medium text-foreground">
              {/* Show price if available, otherwise fallback */}
              ₹{camp.price} <span className="text-muted-foreground text-xs">/ {t("Night", "रात")}</span>
            </span>
          </div>
          
          {/* ACTION BUTTONS */}
          {user ? (
            /* Logged In: Open Booking Modal */
            <Button 
              className="w-full" 
              onClick={() => setShowBooking(true)}
              data-testid={`button-book-${camp.id}`}
            >
              {t("Book Now", "अभी बुक करें")}
            </Button>
          ) : (
            /* Logged Out: Open Auth Modal */
            <AuthModal 
              trigger={
                <Button className="w-full" variant="outline">
                  {t("Login to Book", "बुक करने के लिए लॉगिन करें")}
                </Button>
              } 
            />
          )}
        </CardFooter>
      </Card>

      {/* Render Booking Modal when state is true */}
      {showBooking && (
        <BookingModal 
          isOpen={showBooking} 
          onClose={() => setShowBooking(false)} 
          camp={camp} 
        />
      )}
    </>
  );
}