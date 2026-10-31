import { useLanguage } from "@/context/LanguageContext";

export const guestFaqs = [
  {
    question: "Do I need an account to ask about a stay?",
    questionHi: "क्या ठहराव पूछने के लिए खाता चाहिए?",
    answer:
      "No. Send the enquiry form with your name, phone, dates, guests, and tent type, or WhatsApp +91 99363 99677.",
    answerHi:
      "नहीं। अपना नाम, फ़ोन, तिथियाँ, अतिथि और टेंट का प्रकार फ़ॉर्म में भेजें, या व्हाट्सएप +91 99363 99677 पर लिखें।",
  },
  {
    question: "Where is the camp?",
    questionHi: "शिविर कहाँ है?",
    answer:
      "Near Sangam, Prayagraj, Uttar Pradesh. The exact plot is the one allotted by the Mela Adhikari.",
    answerHi:
      "संगम के पास, प्रयागराज, उत्तर प्रदेश। सटीक भूखंड मेला अधिकारी द्वारा आवंटित स्थान पर होता है।",
  },
  {
    question: "Which tents can I book?",
    questionHi: "कौन से टेंट बुक हो सकते हैं?",
    answer:
      "Swiss Cottage with an attached bathroom (₹5000/night), Deluxe Tent (₹3000/night), and a shared Dormitory (₹999/night). The final quote is confirmed on the call.",
    answerHi:
      "अटैच बाथरूम वाला स्विस कॉटेज (₹5000/रात), डीलक्स टेंट (₹3000/रात), और साझा शयनगृह (₹999/रात)। अंतिम कोटेशन कॉल पर तय होता है।",
  },
  {
    question: "How quickly will someone call?",
    questionHi: "कितनी जल्दी कॉल आएगी?",
    answer: "The camp team aims to call within 2 hours to confirm availability and the quote.",
    answerHi: "शिविर टीम उपलब्धता और कोटेशन की पुष्टि के लिए 2 घंटे के भीतर कॉल करने का प्रयास करती है।",
  },
  {
    question: "What is included with the stay?",
    questionHi: "ठहराव में क्या शामिल है?",
    answer: "Satvik meals, bedding for the January cold, and a guarded compound with staff on site.",
    answerHi: "सात्विक भोजन, जनवरी की ठंड के लिए बिस्तर, और कर्मचारियों के साथ सुरक्षित परिसर।",
  },
];

export function GuestFaq() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {t("Common questions", "आम सवाल")}
        </h2>
        <div className="space-y-6">
          {guestFaqs.map((faq) => (
            <div key={faq.question} className="border-b border-orange-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(faq.question, faq.questionHi)}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t(faq.answer, faq.answerHi)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
