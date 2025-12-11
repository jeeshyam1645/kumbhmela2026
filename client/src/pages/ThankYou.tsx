import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function ThankYou() {
  const { t } = useLanguage();
  const [name, setName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (nameParam) setName(nameParam);
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="page-thank-you">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        <Card className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("Thank You", "धन्यवाद")}
              {name && `, ${name}`}!
            </h1>

            <p className="text-muted-foreground mb-6">
              {t(
                "Your enquiry has been received successfully. Our Camp Manager will call you within 2 hours to discuss your requirements and provide a customized quote.",
                "आपकी पूछताछ सफलतापूर्वक प्राप्त हो गई है। हमारे कैंप मैनेजर आपकी आवश्यकताओं पर चर्चा करने और अनुकूलित कोट प्रदान करने के लिए 2 घंटे के भीतर आपको कॉल करेंगे।"
              )}
            </p>

            <div className="flex items-center justify-center gap-2 text-primary mb-8">
              <Phone className="w-5 h-5" />
              <span className="font-medium">
                {t("Expect our call soon!", "हमारी कॉल की उम्मीद करें!")}
              </span>
            </div>

            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-foreground mb-4">
                {t("Watch Our Camp Tour", "हमारे कैंप का दौरा देखें")}
              </h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example"
                  title={t("Camp Tour Video", "कैंप टूर वीडियो")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {t(
                  "Get a glimpse of our premium facilities",
                  "हमारी प्रीमियम सुविधाओं की एक झलक पाएं"
                )}
              </p>
            </div>

            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("Back to Home", "होम पर वापस जाएं")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
