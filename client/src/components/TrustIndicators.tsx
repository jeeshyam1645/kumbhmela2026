import { Bath, Utensils, Shield, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const trustItems = [
  {
    icon: Bath,
    titleEn: "Attached Toilet",
    titleHi: "अटैच्ड टॉयलेट",
    descEn: "Modern bathrooms with geyser",
    descHi: "गीजर के साथ आधुनिक बाथरूम",
  },
  {
    icon: Utensils,
    titleEn: "Satvik Food",
    titleHi: "सात्विक भोजन",
    descEn: "Pure vegetarian cuisine",
    descHi: "शुद्ध शाकाहारी भोजन",
  },
  {
    icon: Shield,
    titleEn: "24/7 Security",
    titleHi: "24/7 सुरक्षा",
    descEn: "Round-the-clock protection",
    descHi: "चौबीसों घंटे सुरक्षा",
  },
  {
    icon: MapPin,
    titleEn: "Near Sangam",
    titleHi: "संगम के पास",
    descEn: "Walking distance to ghats",
    descHi: "घाट से पैदल दूरी",
  },
];

export function TrustIndicators() {
  const { t } = useLanguage();

  return (
    <section
      id="trust-section"
      className="py-16 md:py-20 bg-muted/50"
      data-testid="section-trust"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t("Why Choose Our Camp?", "हमारा कैंप क्यों चुनें?")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Experience the perfect blend of spiritual serenity and modern comfort at our premium camp.",
              "हमारे प्रीमियम कैंप में आध्यात्मिक शांति और आधुनिक आराम का सही मिश्रण अनुभव करें।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background border border-border"
              data-testid={`trust-item-${index}`}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {t(item.titleEn, item.titleHi)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(item.descEn, item.descHi)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
