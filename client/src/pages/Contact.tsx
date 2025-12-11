import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryForm } from "@/components/InquiryForm";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [defaultCamp, setDefaultCamp] = useState<string | undefined>();
  const [defaultPuja, setDefaultPuja] = useState<string | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const camp = params.get("camp");
    const puja = params.get("puja");
    if (camp) setDefaultCamp(camp);
    if (puja) setDefaultPuja(puja);
  }, []);

  return (
    <div className="min-h-screen pt-20" data-testid="page-contact">
      <div className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("Contact Us", "संपर्क करें")}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "Fill out the form below and our team will call you within 2 hours to discuss your requirements and provide a customized quote.",
              "नीचे दिया गया फॉर्म भरें और हमारी टीम आपकी आवश्यकताओं पर चर्चा करने और अनुकूलित कोट प्रदान करने के लिए 2 घंटे के भीतर आपको कॉल करेगी।"
            )}
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("Enquiry Form", "पूछताछ फॉर्म")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InquiryForm defaultCamp={defaultCamp} defaultPuja={defaultPuja} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("Contact Information", "संपर्क जानकारी")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        +91 98765 43210
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("WhatsApp Available", "व्हाट्सएप उपलब्ध")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        info@maghmela.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("Email us anytime", "कभी भी ईमेल करें")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {t("Near Sangam", "संगम के पास")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("Prayagraj, UP, India", "प्रयागराज, उ.प्र., भारत")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {t("Response Time", "प्रतिक्रिया समय")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("We call within 2 hours", "हम 2 घंटे के भीतर कॉल करते हैं")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("Why Book With Us?", "हमारे साथ क्यों बुक करें?")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {t("Premium accommodation near Sangam", "संगम के पास प्रीमियम आवास")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {t("Authentic puja services by learned priests", "विद्वान पुजारियों द्वारा प्रामाणिक पूजा सेवाएं")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {t("Pure satvik food included", "शुद्ध सात्विक भोजन शामिल")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {t("24/7 security and assistance", "24/7 सुरक्षा और सहायता")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {t("Transparent pricing, no hidden costs", "पारदर्शी मूल्य निर्धारण, कोई छिपी लागत नहीं")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
