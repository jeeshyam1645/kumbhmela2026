import { HeartHandshake, Leaf, MapPin, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/section";

const items = [
  { icon: ShieldCheck, key: "safe" },
  { icon: HeartHandshake, key: "hosts" },
  { icon: MapPin, key: "location" },
  { icon: Leaf, key: "food" },
] as const;

export function TrustStrip() {
  const t = useTranslations("trust");
  return (
    <div className="border-b border-line bg-white">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-4 md:py-10">
        {items.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-saffron-50 text-saffron-700">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-earth">{t(`${key}Title`)}</p>
              <p className="text-sm text-earth-muted">{t(`${key}Text`)}</p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
