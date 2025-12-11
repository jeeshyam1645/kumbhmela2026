import { AccommodationCard } from "@/components/AccommodationCard";
import { useLanguage } from "@/context/LanguageContext";
import { campTypes } from "@shared/schema";
import { AlertTriangle } from "lucide-react";

const campImages = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=2069&auto=format&fit=crop",
];

export default function Accommodation() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20" data-testid="page-accommodation">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Accommodation", "आवास")}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "Choose from our range of comfortable stays designed for pilgrims seeking both spiritual peace and modern comfort.",
              "तीर्थयात्रियों के लिए डिज़ाइन किए गए हमारे आरामदायक प्रवास विकल्पों में से चुनें जो आध्यात्मिक शांति और आधुनिक आराम दोनों चाहते हैं।"
            )}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16" data-testid="section-camps-list">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {campTypes.map((camp, index) => (
              <AccommodationCard
                key={camp.id}
                camp={camp}
                imageUrl={campImages[index]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30" data-testid="section-camp-layout">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("Camp Layout", "कैंप लेआउट")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "A representative layout of our camp facilities showing the arrangement of tents, dining area, and proximity to the river.",
                "हमारी कैंप सुविधाओं का एक प्रतिनिधि लेआउट जो टेंट, भोजन क्षेत्र और नदी से निकटता की व्यवस्था दिखाता है।"
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 flex items-center justify-center p-8">
              <div className="w-full max-w-4xl">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
                  <rect x="0" y="0" width="800" height="400" fill="none" />
                  <rect x="0" y="350" width="800" height="50" fill="hsl(200, 70%, 60%)" opacity="0.5" />
                  <text x="400" y="380" textAnchor="middle" fill="hsl(200, 70%, 30%)" fontSize="14" fontWeight="bold">
                    {t("SANGAM / RIVER", "संगम / नदी")}
                  </text>
                  <rect x="50" y="50" width="120" height="80" rx="8" fill="hsl(25, 95%, 45%)" opacity="0.8" />
                  <text x="110" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {t("Swiss Cottage", "स्विस कॉटेज")}
                  </text>
                  <rect x="200" y="50" width="120" height="80" rx="8" fill="hsl(25, 95%, 45%)" opacity="0.8" />
                  <text x="260" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {t("Swiss Cottage", "स्विस कॉटेज")}
                  </text>
                  <rect x="350" y="50" width="120" height="80" rx="8" fill="hsl(25, 95%, 45%)" opacity="0.8" />
                  <text x="410" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {t("Swiss Cottage", "स्विस कॉटेज")}
                  </text>
                  <rect x="50" y="160" width="100" height="70" rx="6" fill="hsl(45, 85%, 50%)" opacity="0.8" />
                  <text x="100" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                    {t("Deluxe Tent", "डीलक्स टेंट")}
                  </text>
                  <rect x="170" y="160" width="100" height="70" rx="6" fill="hsl(45, 85%, 50%)" opacity="0.8" />
                  <text x="220" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                    {t("Deluxe Tent", "डीलक्स टेंट")}
                  </text>
                  <rect x="290" y="160" width="100" height="70" rx="6" fill="hsl(45, 85%, 50%)" opacity="0.8" />
                  <text x="340" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                    {t("Deluxe Tent", "डीलक्स टेंट")}
                  </text>
                  <rect x="500" y="80" width="250" height="100" rx="8" fill="hsl(140, 50%, 45%)" opacity="0.8" />
                  <text x="625" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    {t("DINING HALL", "भोजन हॉल")}
                  </text>
                  <text x="625" y="150" textAnchor="middle" fill="white" fontSize="10">
                    {t("Satvik Food", "सात्विक भोजन")}
                  </text>
                  <rect x="500" y="200" width="120" height="80" rx="6" fill="hsl(280, 60%, 50%)" opacity="0.8" />
                  <text x="560" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {t("Dormitory", "डॉरमिटरी")}
                  </text>
                  <rect x="640" y="200" width="110" height="80" rx="6" fill="hsl(200, 60%, 50%)" opacity="0.8" />
                  <text x="695" y="235" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                    {t("Common", "सामान्य")}
                  </text>
                  <text x="695" y="250" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                    {t("Bathroom", "बाथरूम")}
                  </text>
                  <circle cx="130" y="310" r="20" fill="hsl(120, 50%, 40%)" opacity="0.6" />
                  <circle cx="300" y="310" r="25" fill="hsl(120, 50%, 40%)" opacity="0.6" />
                  <circle cx="500" y="310" r="18" fill="hsl(120, 50%, 40%)" opacity="0.6" />
                  <circle cx="700" y="310" r="22" fill="hsl(120, 50%, 40%)" opacity="0.6" />
                  <rect x="350" y="300" width="80" height="30" rx="4" fill="hsl(0, 0%, 50%)" opacity="0.6" />
                  <text x="390" y="320" textAnchor="middle" fill="white" fontSize="9">
                    {t("SECURITY", "सुरक्षा")}
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>{t("Note:", "नोट:")}</strong>{" "}
              {t(
                "This is a representative layout. Actual camp location depends on the plot allotted by the Mela Adhikari.",
                "यह एक प्रतिनिधि लेआउट है। वास्तविक कैंप स्थान मेला अधिकारी द्वारा आवंटित भूखंड पर निर्भर करता है।"
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-amenities">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t("Camp Amenities", "कैंप सुविधाएं")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Food & Dining", "भोजन और भोजनालय")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Pure vegetarian satvik meals prepared in hygienic conditions. Breakfast, lunch, and dinner included.",
                  "स्वच्छ परिस्थितियों में तैयार शुद्ध शाकाहारी सात्विक भोजन। नाश्ता, दोपहर का भोजन और रात का खाना शामिल।"
                )}
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Sanitation", "स्वच्छता")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Clean bathroom facilities with hot water (geyser). Regular housekeeping and waste management.",
                  "गर्म पानी (गीजर) के साथ स्वच्छ बाथरूम सुविधाएं। नियमित हाउसकीपिंग और अपशिष्ट प्रबंधन।"
                )}
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                {t("Safety & Security", "सुरक्षा")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "24/7 security personnel, CCTV surveillance, and safe storage for valuables.",
                  "24/7 सुरक्षा कर्मी, सीसीटीवी निगरानी और कीमती सामान के लिए सुरक्षित भंडारण।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
