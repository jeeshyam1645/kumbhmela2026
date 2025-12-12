import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface PujaService {
  id: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
}

interface PujaServiceCardProps {
  service: PujaService;
}

export function PujaServiceCard({ service }: PujaServiceCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden group" data-testid={`card-puja-${service.id}`}>
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {service.nameEn}
          </h3>
          <p className="text-primary font-medium text-sm">
            {service.nameHi}
          </p>
        </div>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {t(service.descriptionEn, service.descriptionHi)}
        </p>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">
            {t(
              "Rates depend on Samagri and Dakshina",
              "दरें सामग्री और दक्षिणा पर निर्भर करती हैं"
            )}
          </span>
          <Link href={`/contact?puja=${service.id}`} className="w-full">
            <Button className="w-full" data-testid={`button-enquire-${service.id}`}>
              {t("Enquire Now", "पूछताछ करें")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
