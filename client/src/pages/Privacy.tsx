import { useLanguage } from "@/context/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20" data-testid="page-privacy">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Privacy Policy", "गोपनीयता नीति")}
          </h1>
          <p className="text-muted-foreground">
            {t("Last updated: December 2024", "अंतिम अद्यतन: दिसंबर 2024")}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-neutral dark:prose-invert max-w-none">
          <h2>{t("1. Information We Collect", "1. हम जो जानकारी एकत्र करते हैं")}</h2>
          <p>
            {t(
              "When you submit an enquiry through our website, we collect the following information:",
              "जब आप हमारी वेबसाइट के माध्यम से पूछताछ जमा करते हैं, तो हम निम्नलिखित जानकारी एकत्र करते हैं:"
            )}
          </p>
          <ul>
            <li>{t("Full Name", "पूरा नाम")}</li>
            <li>{t("Mobile Number", "मोबाइल नंबर")}</li>
            <li>{t("Check-in and Check-out Dates", "चेक-इन और चेक-आउट तिथियां")}</li>
            <li>{t("Number of Persons", "व्यक्तियों की संख्या")}</li>
            <li>{t("Accommodation Preference", "आवास वरीयता")}</li>
            <li>{t("Special Requirements or Puja Requests", "विशेष आवश्यकताएं या पूजा अनुरोध")}</li>
          </ul>

          <h2>{t("2. How We Use Your Information", "2. हम आपकी जानकारी का उपयोग कैसे करते हैं")}</h2>
          <p>{t("We use the collected information to:", "हम एकत्रित जानकारी का उपयोग इसके लिए करते हैं:")}</p>
          <ul>
            <li>
              {t(
                "Contact you regarding your booking enquiry",
                "आपकी बुकिंग पूछताछ के संबंध में आपसे संपर्क करना"
              )}
            </li>
            <li>
              {t(
                "Process and confirm your accommodation booking",
                "आपकी आवास बुकिंग को संसाधित और पुष्ट करना"
              )}
            </li>
            <li>
              {t(
                "Arrange puja services as requested",
                "अनुरोधित पूजा सेवाओं की व्यवस्था करना"
              )}
            </li>
            <li>
              {t(
                "Send important updates about your booking",
                "आपकी बुकिंग के बारे में महत्वपूर्ण अपडेट भेजना"
              )}
            </li>
            <li>
              {t(
                "Improve our services based on feedback",
                "प्रतिक्रिया के आधार पर हमारी सेवाओं में सुधार करना"
              )}
            </li>
          </ul>

          <h2>{t("3. Information Sharing", "3. जानकारी साझा करना")}</h2>
          <p>
            {t(
              "We do not sell, trade, or rent your personal information to third parties. Your information may be shared with:",
              "हम आपकी व्यक्तिगत जानकारी को तीसरे पक्षों को नहीं बेचते, व्यापार नहीं करते या किराए पर नहीं देते। आपकी जानकारी साझा की जा सकती है:"
            )}
          </p>
          <ul>
            <li>
              {t(
                "Camp staff members who need it to serve you",
                "कैंप स्टाफ सदस्य जिन्हें आपकी सेवा के लिए इसकी आवश्यकता है"
              )}
            </li>
            <li>
              {t(
                "Priests and service providers for puja arrangements",
                "पूजा व्यवस्था के लिए पुजारी और सेवा प्रदाता"
              )}
            </li>
            <li>
              {t(
                "Authorities if required by law",
                "अधिकारी यदि कानून द्वारा आवश्यक हो"
              )}
            </li>
          </ul>

          <h2>{t("4. Data Security", "4. डेटा सुरक्षा")}</h2>
          <p>
            {t(
              "We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
              "हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उचित सुरक्षा उपाय लागू करते हैं। हालांकि, इंटरनेट पर प्रसारण की कोई भी विधि 100% सुरक्षित नहीं है, और हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।"
            )}
          </p>

          <h2>{t("5. Data Retention", "5. डेटा प्रतिधारण")}</h2>
          <p>
            {t(
              "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.",
              "हम आपकी व्यक्तिगत जानकारी को इस नीति में उल्लिखित उद्देश्यों को पूरा करने के लिए आवश्यक समय तक बनाए रखते हैं, जब तक कि कानून द्वारा लंबी प्रतिधारण अवधि की आवश्यकता न हो।"
            )}
          </p>

          <h2>{t("6. Your Rights", "6. आपके अधिकार")}</h2>
          <p>{t("You have the right to:", "आपको अधिकार है:")}</p>
          <ul>
            <li>
              {t(
                "Access the personal information we hold about you",
                "हमारे पास आपके बारे में रखी व्यक्तिगत जानकारी तक पहुंचना"
              )}
            </li>
            <li>
              {t(
                "Request correction of inaccurate information",
                "गलत जानकारी के सुधार का अनुरोध करना"
              )}
            </li>
            <li>
              {t(
                "Request deletion of your personal information",
                "आपकी व्यक्तिगत जानकारी को हटाने का अनुरोध करना"
              )}
            </li>
            <li>
              {t(
                "Withdraw consent for marketing communications",
                "विपणन संचार के लिए सहमति वापस लेना"
              )}
            </li>
          </ul>

          <h2>{t("7. Cookies", "7. कुकीज़")}</h2>
          <p>
            {t(
              "Our website uses cookies to enhance your browsing experience. These cookies help us remember your language preference and improve site functionality.",
              "हमारी वेबसाइट आपके ब्राउज़िंग अनुभव को बढ़ाने के लिए कुकीज़ का उपयोग करती है। ये कुकीज़ हमें आपकी भाषा वरीयता याद रखने और साइट कार्यक्षमता में सुधार करने में मदद करती हैं।"
            )}
          </p>

          <h2>{t("8. Contact Us", "8. हमसे संपर्क करें")}</h2>
          <p>
            {t(
              "If you have any questions about this Privacy Policy, please contact us at:",
              "यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:"
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
