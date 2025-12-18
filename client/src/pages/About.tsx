import { useLanguage } from "@/context/LanguageContext";
import { Shield, Users, Coffee, BedDouble } from "lucide-react"; // Changed ThermometerSun to BedDouble for better context
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: t("Local Team", "स्थानीय टीम"),
      desc: t("We are Prayagraj locals. We know the Mela grounds better than Google Maps.", "हम प्रयागराज के स्थानीय निवासी हैं। हम मेला मैदान को गूगल मैप्स से बेहतर जानते हैं।")
    },
    {
      icon: <BedDouble className="h-6 w-6 text-primary" />, // Changed Icon
      title: t("Cozy Winter Bedding", "आरामदायक बिस्तर"), // Changed Title
      desc: t("We provide heavy-duty mattresses and premium wool blankets (Rajai) to keep you warm in the January cold.", "हम जनवरी की ठंड में आपको गर्म रखने के लिए भारी गद्दे और प्रीमियम ऊनी कंबल (रजाई) प्रदान करते हैं।") // Changed Desc
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t("24/7 Guarded Camp", "24/7 सुरक्षित शिविर"), // Changed Title
      desc: t("Gated compound with round-the-clock security guards and helpful staff present on-ground.", "चौबीसों घंटे सुरक्षा गार्ड और ऑन-ग्राउंड मौजूद सहायक कर्मचारियों के साथ गेटेड कंपाउंड।") // Changed Desc
    },
    {
      icon: <Coffee className="h-6 w-6 text-primary" />,
      title: t("Satvik Food", "सात्विक भोजन"),
      desc: t("Fresh, hygienic, home-style Satvik meals prepared in our clean kitchen.", "हमारी साफ रसोई में तैयार ताजा, स्वच्छ, घर जैसा सात्विक भोजन।")
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative bg-primary/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t("Atithi Devo Bhava", "अतिथि देवो भव")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
            {t(
              "We are not a hotel chain. We are your hosts in the holy city.",
              "हम कोई होटल चेन नहीं हैं। हम पवित्र शहर में आपके मेजबान हैं।"
            )}
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              {t("Our Story", "हमारी कहानी")}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "MaghMelaStays was born out of a simple observation: Pilgrims often struggle to find clean and safe accommodation near the Sangam. Many are promised 'luxury' but end up in uncomfortable conditions.",
                  "माघ मेला स्टेज़ का जन्म एक साधारण अवलोकन से हुआ था: तीर्थयात्रियों को अक्सर संगम के पास स्वच्छ और सुरक्षित आवास खोजने के लिए संघर्ष करना पड़ता है। कई लोगों को 'लक्जरी' का वादा किया जाता है लेकिन वे असुविधाजनक परिस्थितियों में समाप्त होते हैं।"
                )}
              </p>
              <p>
                {t(
                  "We decided to change that. Founded by a group of Prayagraj residents, our goal is simple: To ensure that after your holy dip in the Ganges, you have a safe and warm place to rest.",
                  "हमने इसे बदलने का फैसला किया। प्रयागराज के निवासियों के एक समूह द्वारा स्थापित, हमारा लक्ष्य सरल है: यह सुनिश्चित करना कि गंगा में पवित्र डुबकी लगाने के बाद, आपके पास आराम करने के लिए एक सुरक्षित और गर्म जगह हो।"
                )}
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-muted">
            {/* Placeholder for a team photo or camp photo */}
            <img 
              src="https://images.unsplash.com/photo-1524443169398-9aa1ce60d7e1?q=80&w=2071&auto=format&fit=crop" 
              alt="Pilgrims at Ghat" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("Why Pilgrims Trust Us", "तीर्थयात्री हम पर क्यों भरोसा करते हैं")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("We understand the challenges of Magh Mela. Here is how we solve them.", "हम माघ मेला की चुनौतियों को समझते हैं। यहां बताया गया है कि हम उन्हें कैसे हल करते हैं।")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-background p-6 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-colors">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("Come as a Guest, Leave as Family", "मेहमान बनकर आएं, परिवार बनकर जाएं")}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t(
              "We have limited tents available for the main bathing dates. Contact us directly to discuss your requirements.",
              "मुख्य स्नान तिथियों के लिए हमारे पास सीमित तंबू उपलब्ध हैं। अपनी आवश्यकताओं पर चर्चा करने के लिए हमसे सीधे संपर्क करें।"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-bold text-lg h-14 px-8">
                {t("Contact Us Now", "अभी संपर्क करें")}
              </Button>
            </Link>
            <Link href="/accommodation">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg h-14 px-8">
                {t("View Tents", "तंबू देखें")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}