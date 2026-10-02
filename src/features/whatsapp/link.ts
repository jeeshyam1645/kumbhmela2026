import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type WhatsAppContext =
  | { topic: "general" }
  | { topic: "camp"; campName: string }
  | { topic: "puja"; pujaName: string }
  | { topic: "guidance" };

const templates: Record<Locale, (ctx: WhatsAppContext) => string> = {
  en: (ctx) => {
    switch (ctx.topic) {
      case "camp":
        return `Namaste! I am interested in ${ctx.campName} for Magh Mela ${site.season}. Please share availability and details.`;
      case "puja":
        return `Namaste! I would like to arrange ${ctx.pujaName} during Magh Mela ${site.season}. Please share details.`;
      case "guidance":
        return "Namaste! I would like to request guidance from Acharya Rajendra Mishra ji.";
      default:
        return `Namaste! I am interested in staying at your camp for Magh Mela ${site.season}. Please share details.`;
    }
  },
  hi: (ctx) => {
    switch (ctx.topic) {
      case "camp":
        return `नमस्ते! मुझे माघ मेला ${site.season} के लिए ${ctx.campName} में रुचि है। कृपया उपलब्धता और विवरण बताएं।`;
      case "puja":
        return `नमस्ते! मैं माघ मेला ${site.season} के दौरान ${ctx.pujaName} करवाना चाहता/चाहती हूँ। कृपया विवरण बताएं।`;
      case "guidance":
        return "नमस्ते! मैं आचार्य राजेंद्र मिश्र जी से मार्गदर्शन का समय लेना चाहता/चाहती हूँ।";
      default:
        return `नमस्ते! मुझे माघ मेला ${site.season} में आपके कैंप में ठहरने में रुचि है। कृपया विवरण बताएं।`;
    }
  },
};

/** Builds a wa.me link that opens a chat with a ready-to-send message. */
export function buildWhatsAppLink(locale: Locale, ctx: WhatsAppContext = { topic: "general" }) {
  const text = encodeURIComponent(templates[locale](ctx));
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
