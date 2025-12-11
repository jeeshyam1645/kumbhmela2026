import { useLanguage } from "@/context/LanguageContext";
import { bathingDates } from "@shared/schema";
import { Calendar, Star, Droplets, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function KumbhGuide() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20" data-testid="page-kumbh-guide">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Kumbh Mela Guide", "कुंभ मेला गाइड")}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "Discover the spiritual significance and important dates of the world's largest religious gathering at Prayagraj.",
              "प्रयागराज में दुनिया की सबसे बड़ी धार्मिक सभा के आध्यात्मिक महत्व और महत्वपूर्ण तिथियों की खोज करें।"
            )}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16" data-testid="section-significance">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t("The Sacred Significance", "पवित्र महत्व")}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t(
                    "Magh Mela is an annual fair held at Prayagraj, at the confluence of three sacred rivers - Ganga, Yamuna, and the mythical Saraswati (known as Triveni Sangam). This gathering transforms into the grand Kumbh Mela every 12 years and Ardh Kumbh every 6 years.",
                    "माघ मेला प्रयागराज में तीन पवित्र नदियों - गंगा, यमुना और पौराणिक सरस्वती (जिसे त्रिवेणी संगम के नाम से जाना जाता है) के संगम पर आयोजित एक वार्षिक मेला है। यह सभा हर 12 साल में भव्य कुंभ मेला और हर 6 साल में अर्ध कुंभ में बदल जाती है।"
                  )}
                </p>
                <p>
                  {t(
                    "According to Hindu mythology, during the cosmic churning of the ocean (Samudra Manthan), drops of the nectar of immortality (Amrit) fell at four places - Prayagraj, Haridwar, Ujjain, and Nashik. These four cities host the Kumbh Mela in rotation.",
                    "हिंदू पौराणिक कथाओं के अनुसार, समुद्र मंथन के दौरान अमृत की बूंदें चार स्थानों पर गिरीं - प्रयागराज, हरिद्वार, उज्जैन और नासिक। ये चार शहर बारी-बारी से कुंभ मेले की मेजबानी करते हैं।"
                  )}
                </p>
                <p>
                  {t(
                    "Taking a holy dip in the Sangam during the auspicious bathing dates is believed to cleanse sins and liberate the soul from the cycle of birth and death. Millions of pilgrims gather to experience this spiritual transformation.",
                    "शुभ स्नान तिथियों के दौरान संगम में पवित्र स्नान करने से पापों से मुक्ति और आत्मा को जन्म और मृत्यु के चक्र से मुक्ति मिलती है। लाखों तीर्थयात्री इस आध्यात्मिक परिवर्तन का अनुभव करने के लिए इकट्ठा होते हैं।"
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <Droplets className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {t("Triveni Sangam", "त्रिवेणी संगम")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Three rivers confluence", "तीन नदियों का संगम")}
                </p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {t("Millions", "लाखों")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Pilgrims gather annually", "तीर्थयात्री हर साल")}
                </p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <Star className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {t("Ancient", "प्राचीन")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Thousands of years old", "हजारों साल पुरानी परंपरा")}
                </p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg text-center">
                <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {t("45 Days", "45 दिन")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Magh Mela duration", "माघ मेला अवधि")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30" data-testid="section-bathing-dates">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("Auspicious Bathing Dates 2025", "शुभ स्नान तिथियां 2025")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "These are the most important dates for the holy dip during Magh Mela 2025. Plan your visit around these dates for maximum spiritual benefit.",
                "माघ मेला 2025 के दौरान पवित्र स्नान के लिए ये सबसे महत्वपूर्ण तिथियां हैं। अधिकतम आध्यात्मिक लाभ के लिए इन तिथियों के आसपास अपनी यात्रा की योजना बनाएं।"
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-background rounded-lg overflow-hidden" data-testid="table-bathing-dates">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 font-semibold text-foreground">
                    {t("Date", "तारीख")}
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    {t("Festival", "त्योहार")}
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    {t("Hindi Name", "हिंदी नाम")}
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    {t("Importance", "महत्व")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {bathingDates.map((date, index) => (
                  <tr
                    key={date.date}
                    className={`border-t border-border ${
                      date.importance === "highest" ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="p-4 text-foreground">
                      {new Date(date.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-foreground font-medium">{date.nameEn}</td>
                    <td className="p-4 text-foreground">{date.nameHi}</td>
                    <td className="p-4">
                      <Badge
                        variant={date.importance === "highest" ? "default" : "secondary"}
                      >
                        {date.importance === "highest"
                          ? t("Most Auspicious", "सबसे शुभ")
                          : t("Auspicious", "शुभ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-rituals">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t("Common Rituals at Sangam", "संगम पर सामान्य अनुष्ठान")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Snan (Holy Bath)", "स्नान")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Taking a dip in the sacred confluence to cleanse body and soul. Best done during Brahma Muhurta (before sunrise).",
                  "शरीर और आत्मा को शुद्ध करने के लिए पवित्र संगम में स्नान। ब्रह्म मुहूर्त (सूर्योदय से पहले) में करना सबसे अच्छा है।"
                )}
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Sankalp (Resolution)", "संकल्प")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Making spiritual vows and resolutions at the sacred waters with the guidance of a priest.",
                  "पुजारी के मार्गदर्शन में पवित्र जल पर आध्यात्मिक प्रतिज्ञा और संकल्प लेना।"
                )}
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Pind Daan", "पिंड दान")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Offering prayers and rice balls for departed ancestors to ensure their peaceful journey.",
                  "दिवंगत पूर्वजों की शांतिपूर्ण यात्रा सुनिश्चित करने के लिए प्रार्थना और पिंड अर्पित करना।"
                )}
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Ganga Aarti", "गंगा आरती")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Witnessing the evening prayer ceremony with oil lamps offered to the sacred river.",
                  "पवित्र नदी को दीपक अर्पित करते हुए संध्या प्रार्थना समारोह देखना।"
                )}
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Akshay Vat Darshan", "अक्षय वट दर्शन")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Visiting the immortal Banyan tree within the Allahabad Fort, a sacred pilgrimage site.",
                  "इलाहाबाद किले के भीतर अमर बरगद के पेड़ का दर्शन, एक पवित्र तीर्थ स्थल।"
                )}
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Akhara Visits", "अखाड़ा दर्शन")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Observing the traditional processions of Naga sadhus and saints from various akharas.",
                  "विभिन्न अखाड़ों के नागा साधुओं और संतों के पारंपरिक जुलूसों को देखना।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
