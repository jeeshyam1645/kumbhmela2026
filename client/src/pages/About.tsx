import { useLanguage } from "@/context/LanguageContext";
import { Shield, Users, Coffee, BedDouble, Heart, Landmark, Calendar } from "lucide-react";
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
      icon: <BedDouble className="h-6 w-6 text-primary" />,
      title: t("Cozy Winter Bedding", "आरामदायक बिस्तर"),
      desc: t("We provide heavy-duty mattresses and premium wool blankets (Rajai) to keep you warm in the January cold.", "हम जनवरी की ठंड में आपको गर्म रखने के लिए भारी गद्दे और प्रीमियम ऊनी कंबल (रजाई) प्रदान करते हैं।")
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t("24/7 Guarded Camp", "24/7 सुरक्षित शिविर"),
      desc: t("Gated compound with round-the-clock security guards and helpful staff present on-ground.", "चौबीसों घंटे सुरक्षा गार्ड और ऑन-ग्राउंड मौजूद सहायक कर्मचारियों के साथ गेटेड कंपाउंड।")
    },
    {
      icon: <Landmark className="h-6 w-6 text-primary" />,
      title: t("Spiritual Heritage", "आध्यात्मिक विरासत"),
      desc: t("For years, we have been privileged to facilitate and support the Police Pooja traditions.", "वर्षों से, हमें पुलिस पूजा परंपराओं में सहयोग करने का सौभाग्य प्राप्त हुआ है।")
    }
  ];

  const team = [
    {
      name: "Acharya Rajendra Mishra",
      photo: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766414799/WhatsApp_Image_2025-12-21_at_10.57.45_PM_kndk1l.jpg" // Replace with actual photo
    },
    {
      name: "Acharya Ratan Mishra",
      photo: "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766493490/WhatsApp_Image_2025-12-23_at_6.07.41_PM_bzfhtf.jpg" // Replace with actual photo
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
              "Rooted in tradition, serving with devotion in the holy city of Prayagraj.",
              "परंपरा से जुड़े, पवित्र शहर प्रयागराज में सेवा और समर्पण के साथ।"
            )}
          </p>
        </div>
      </section>

{/* TRADITION & POLICE POOJA SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-b">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Heart className="h-8 w-8" />
              {t("Years of Service", "सेवा के वर्ष")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "Our family has been deeply connected with the Magh Mela for generations. It has been our humble honor to assist in the 'Police Pooja' for years, maintaining the spiritual sanctity of our law enforcement traditions at the Sangam.",
                "हमारा परिवार पीढ़ियों से माघ मेले से गहराई से जुड़ा हुआ है। संगम पर हमारी कानून प्रवर्तन परंपराओं की आध्यात्मिक पवित्रता को बनाए रखते हुए, वर्षों तक 'पुलिस पूजा' में सहयोग करना हमारा विनम्र सम्मान रहा है।"
              )}
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-black relative">
            <video 
              src="https://res.cloudinary.com/dh7bx2qib/video/upload/v1766508972/WhatsApp_Video_2025-12-22_at_9.01.30_PM_zhdhkk.mp4" 
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              {t("Your browser does not support the video tag.", "आपका ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।")}
            </video>
          </div>
        </div>
      </section>

{/* BHOOMI PUJAN 2026 */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-lg aspect-video bg-black relative">
            <video 
              src="https://res.cloudinary.com/dh7bx2qib/video/upload/v1766508972/WhatsApp_Video_2025-12-22_at_9.01.30_PM_zhdhkk.mp4" 
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain" // Changed from object-cover to object-contain
            >
              {t("Your browser does not support the video tag.", "आपका ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।")}
            </video>
          </div>
          
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              {t("Magh Mela 2026", "माघ मेला 2026")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "The Bhoomi Pujan for the Reserve Police Line of Magh Mela 2026 was conducted with Vedic chants. The ceremony featured Shri Jairam Mishra, Rajendra Mishra, and Ratan Mishra, alongside Police Commissioner Tarun Gauba and senior officials, marking the start of preparations for three police lines in the Mela area.",
                "वैदिक मंत्रोच्चार के बीच माघ मेला 2026 की रिजर्व पुलिस लाइन का भूमि पूजन संपन्न हुआ। इस समारोह में श्री जयराम मिश्रा, राजेंद्र मिश्रा और रतन मिश्रा के साथ पुलिस कमिश्नर तरुण गाबा और वरिष्ठ अधिकारी शामिल हुए, जो मेला क्षेत्र में तीन पुलिस लाइनों की तैयारी की शुरुआत है।"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">{t("Our Guidance", "हमारा मार्गदर्शन")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-muted">
                  <img src={member.photo} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("Why Pilgrims Trust Us", "तीर्थयात्री हम पर क्यों भरोसा करते हैं")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-background p-6 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all">
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
            {t("Experience Prayagraj With Us", "हमारे साथ प्रयागराज का अनुभव करें")}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t(
              "Limited tents available for the main Snan dates. Join our spiritual family this Mela.",
              "मुख्य स्नान तिथियों के लिए सीमित तंबू उपलब्ध हैं। इस मेले में हमारे आध्यात्मिक परिवार से जुड़ें।"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-bold text-lg h-14 px-8">
                {t("Contact Us Now", "अभी संपर्क करें")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}