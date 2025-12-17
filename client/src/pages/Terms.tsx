import { useLanguage } from "@/context/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20" data-testid="page-terms">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Terms & Cancellation Policy", "नियम और रद्दीकरण नीति")}
          </h1>
          <p className="text-muted-foreground">
            {t("Last updated: December 2024", "अंतिम अद्यतन: दिसंबर 2024")}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-neutral dark:prose-invert max-w-none">
          <h2>{t("1. Booking Terms", "1. बुकिंग की शर्तें")}</h2>
          <ul>
            <li>
              {t(
                "All bookings are subject to availability and confirmation by our team.",
                "सभी बुकिंग उपलब्धता और हमारी टीम द्वारा पुष्टि के अधीन हैं।"
              )}
            </li>
            <li>
              {t(
                "A booking is confirmed only after receipt of the advance payment.",
                "बुकिंग केवल अग्रिम भुगतान प्राप्त होने के बाद ही पुष्ट होती है।"
              )}
            </li>
            <li>
              {t(
                "Full payment is due 7 days before check-in date.",
                "चेक-इन तारीख से 7 दिन पहले पूर्ण भुगतान देय है।"
              )}
            </li>
            <li>
              {t(
                "Rates quoted are per person per night unless otherwise specified.",
                "उद्धृत दरें प्रति व्यक्ति प्रति रात हैं जब तक अन्यथा निर्दिष्ट न हो।"
              )}
            </li>
          </ul>

          <h2>{t("2. Cancellation Policy", "2. रद्दीकरण नीति")}</h2>
          <p>
            {t(
              "We understand plans can change. Our refund policy is as follows:",
              "हम समझते हैं कि योजनाएं बदल सकती हैं। हमारी धनवापसी नीति इस प्रकार है:"
            )}
          </p>
          <ul>
            <li>
              <strong>{t("30+ days before check-in:", "चेक-इन से 30+ दिन पहले:")}</strong>{" "}
              {t("90% refund of the total amount", "कुल राशि का 90% रिफंड")}
            </li>
            <li>
              <strong>{t("15-29 days before check-in:", "चेक-इन से 15-29 दिन पहले:")}</strong>{" "}
              {t("70% refund of the total amount", "कुल राशि का 70% रिफंड")}
            </li>
            <li>
              <strong>{t("7-14 days before check-in:", "चेक-इन से 7-14 दिन पहले:")}</strong>{" "}
              {t("50% refund of the total amount", "कुल राशि का 50% रिफंड")}
            </li>
            <li>
              <strong>{t("Less than 7 days before check-in:", "चेक-इन से 7 दिन से कम:")}</strong>{" "}
              {t("No refund", "कोई रिफंड नहीं")}
            </li>
          </ul>

          <h2>{t("3. Camp Rules", "3. कैंप नियम")}</h2>
          <ul>
            <li>
              {t(
                "Check-in time is 12:00 PM and check-out time is 10:00 AM.",
                "चेक-इन का समय दोपहर 12:00 बजे है और चेक-आउट का समय सुबह 10:00 बजे है।"
              )}
            </li>
            <li>
              {t(
                "No alcohol, non-vegetarian food, or smoking is permitted in the camp premises.",
                "कैंप परिसर में शराब, मांसाहारी भोजन या धूम्रपान की अनुमति नहीं है।"
              )}
            </li>
            <li>
              {t(
                "Guests are responsible for their personal belongings.",
                "अतिथि अपने व्यक्तिगत सामान के लिए जिम्मेदार हैं।"
              )}
            </li>
            <li>
              {t(
                "Any damage to camp property will be charged to the guest.",
                "कैंप संपत्ति को कोई भी नुकसान अतिथि से वसूला जाएगा।"
              )}
            </li>
            <li>
              {t(
                "Quiet hours are from 10:00 PM to 6:00 AM.",
                "शांत समय रात 10:00 बजे से सुबह 6:00 बजे तक है।"
              )}
            </li>
          </ul>

          <h2>{t("4. Puja Services", "4. पूजा सेवाएं")}</h2>
          <ul>
            <li>
              {t(
                "Puja services are arranged through our network of qualified priests.",
                "पूजा सेवाएं हमारे योग्य पुजारियों के नेटवर्क के माध्यम से व्यवस्थित की जाती हैं।"
              )}
            </li>
            <li>
              {t(
                "Rates for puja services depend on the type of ritual, materials, and dakshina.",
                "पूजा सेवाओं की दरें अनुष्ठान के प्रकार, सामग्री और दक्षिणा पर निर्भर करती हैं।"
              )}
            </li>
            <li>
              {t(
                "Cancellation of puja services must be done at least 24 hours in advance.",
                "पूजा सेवाओं को रद्द करना कम से कम 24 घंटे पहले किया जाना चाहिए।"
              )}
            </li>
          </ul>

          <h2>{t("5. Limitation of Liability", "5. दायित्व की सीमा")}</h2>
          <p>
            {t(
              "The camp management shall not be liable for any loss, damage, or injury to guests or their belongings unless caused by gross negligence on our part. We recommend guests obtain travel insurance for their trip.",
              "कैंप प्रबंधन अतिथियों या उनके सामान को किसी भी हानि, क्षति या चोट के लिए उत्तरदायी नहीं होगा जब तक कि यह हमारी ओर से घोर लापरवाही के कारण न हो। हम अनुशंसा करते हैं कि अतिथि अपनी यात्रा के लिए यात्रा बीमा प्राप्त करें।"
            )}
          </p>

          <h2>{t("6. Contact", "6. संपर्क")}</h2>
          <p>
            {t(
              "For any queries regarding these terms, please contact us at:",
              "इन शर्तों के बारे में किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें:"
            )}
          </p>
          <ul>
            <li>{t("Phone:", "फोन:")} +91 70617 62868</li>
            <li>{t("Email:", "ईमेल:")} maghmelastays@gmail.com</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
