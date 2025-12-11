import { Link } from "wouter";
import { Users, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface CampType {
  id: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  features: readonly string[];
  featuresHi: readonly string[];
  capacity: string;
  capacityHi: string;
}

interface AccommodationCardProps {
  camp: CampType;
  imageUrl: string;
}

export function AccommodationCard({ camp, imageUrl }: AccommodationCardProps) {
  const { t, language } = useLanguage();

  const features = language === "hi" ? camp.featuresHi : camp.features;

  return (
    <Card className="overflow-hidden group" data-testid={`card-camp-${camp.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={t(camp.nameEn, camp.nameHi)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            <Users className="w-3 h-3 mr-1" />
            {t(camp.capacity, camp.capacityHi)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t(camp.nameEn, camp.nameHi)}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {t(camp.descriptionEn, camp.descriptionHi)}
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
        <div className="w-full text-center py-2 bg-muted/50 rounded-md">
          <span className="text-sm text-muted-foreground">
            {t("Call for Rates", "दरों के लिए कॉल करें")}
          </span>
        </div>
        <Link href={`/contact?camp=${camp.id}`} className="w-full">
          <Button className="w-full" data-testid={`button-quote-${camp.id}`}>
            {t("Get Quote", "कोट प्राप्त करें")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
