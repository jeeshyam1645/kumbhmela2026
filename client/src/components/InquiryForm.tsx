import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { TENT_OFFERS, whatsAppLink } from "@/lib/site";

const TENT_OPTIONS = [...TENT_OFFERS.map((tent) => tent.name), "Not sure yet"];

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    mobile: z.string().min(10, "Mobile must be at least 10 digits").max(15, "Mobile too long"),
    countryCode: z.string().default("+91"),
    tentType: z.string().min(1, "Choose a tent type"),
    checkIn: z.string().min(1, "Check-in is required"),
    checkOut: z.string().min(1, "Check-out is required"),
    guests: z.string().min(1),
    message: z.string().optional(),
    company: z.string().optional(),
    turnstileToken: z.string().optional(),
  })
  .refine((data) => !data.checkIn || !data.checkOut || data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

type FormData = z.infer<typeof formSchema>;

interface InquiryFormProps {
  defaultTent?: string;
  defaultCamp?: string;
  defaultPuja?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
    };
    onTurnstileLoad?: () => void;
  }
}

export function InquiryForm({ defaultTent, defaultCamp, defaultPuja }: InquiryFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const cleanMobile = user?.mobile ? user.mobile.replace("+91", "").replace(/\D/g, "") : "";
  const presetTent = [defaultTent, defaultCamp].find((value) => value && TENT_OPTIONS.includes(value)) || "";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      mobile: cleanMobile,
      countryCode: "+91",
      tentType: presetTent,
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: defaultPuja ? `I would like to know more about puja service ${defaultPuja}.` : "",
      company: "",
      turnstileToken: "",
    },
  });

  useEffect(() => {
    if (user?.name && !form.getValues("name")) form.setValue("name", user.name);
    if (cleanMobile && !form.getValues("mobile")) form.setValue("mobile", cleanMobile);
  }, [user, cleanMobile, form]);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    const container = document.getElementById("enquiry-turnstile");
    if (!container) return;

    const renderWidget = () => {
      if (!window.turnstile || container.childElementCount > 0) return;
      window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => form.setValue("turnstileToken", token),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    window.onTurnstileLoad = renderWidget;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    document.body.appendChild(script);
  }, [turnstileSiteKey, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        name: data.name,
        mobile: `${data.countryCode}${data.mobile}`,
        tentType: data.tentType,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: Number(data.guests),
        message: data.message,
        company: data.company,
        turnstileToken: data.turnstileToken,
      };
      const response = await apiRequest("POST", "/api/contact", payload);
      return response.json();
    },
    onSuccess: (_data, variables) => {
      toast({
        title: t("Message Sent!", "संदेश भेजा गया!"),
        description: t("Our team will contact you shortly.", "हमारी टीम आपको जल्द ही कॉल करेगी।"),
      });
      setLocation(`/thank-you?name=${encodeURIComponent(variables.name)}`);
    },
    onError: () => {
      toast({
        title: t("Error", "त्रुटि"),
        description: t("Failed to send message. Please try WhatsApp.", "संदेश भेजने में विफल। कृपया व्हाट्सएप का प्रयास करें।"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (turnstileSiteKey && !data.turnstileToken) {
      toast({
        title: t("Error", "त्रुटि"),
        description: t("Please complete the spam check.", "कृपया स्पैम जाँच पूरी करें।"),
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(data);
  };

  const watched = form.watch();
  const whatsAppHref = whatsAppLink(
    [
      "Namaste, I would like to enquire about a Magh Mela 2026 stay.",
      `Name: ${watched.name || ""}`,
      `Phone: ${watched.countryCode || "+91"} ${watched.mobile || ""}`,
      `Tent: ${watched.tentType || ""}`,
      `Check-in: ${watched.checkIn || ""}`,
      `Check-out: ${watched.checkOut || ""}`,
      `Guests: ${watched.guests || ""}`,
      watched.message ? `Note: ${watched.message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const today = new Date().toISOString().split("T")[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="inquiry-form">
        <p className="text-sm text-muted-foreground">
          {t(
            "No account needed. Send this form or continue on WhatsApp.",
            "खाते की ज़रूरत नहीं। यह फ़ॉर्म भेजें या व्हाट्सएप पर जारी रखें।",
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Full Name", "पूरा नाम")} <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder={t("Enter your name", "अपना नाम दर्ज करें")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>{t("Mobile Number", "मोबाइल नंबर")} <span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="tel" maxLength={15} placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Tent type", "टेंट का प्रकार")} <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Choose a stay", "ठहराव चुनें")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TENT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Guests", "अतिथि")} <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Check-in", "चेक-इन")} <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Check-out", "चेक-आउट")} <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="date" min={watched.checkIn || today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Message / Requirement", "संदेश / आवश्यकता")}</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[120px]"
                  placeholder={t("Tell us what you are looking for...", "हमें बताएं कि आप क्या ढूंढ रहे हैं...")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" {...form.register("company")} />
          </label>
        </div>

        {turnstileSiteKey && <div id="enquiry-turnstile" className="min-h-[65px]" />}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="submit" size="lg" className="flex-1 py-6 text-lg" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("Sending...", "भेज रहा है...")}</>
            ) : (
              <><Send className="mr-2 h-5 w-5" /> {t("Send Enquiry", "पूछताछ भेजें")}</>
            )}
          </Button>
          <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button type="button" size="lg" className="w-full py-6 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageCircle className="mr-2 h-5 w-5" />
              {t("WhatsApp these details", "ये विवरण व्हाट्सएप करें")}
            </Button>
          </a>
        </div>
      </form>
    </Form>
  );
}
