import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
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
import { AuthModal } from "@/components/AuthModal";

// Simplified Schema: Just Name, Mobile, Message
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits").max(15, "Mobile too long"), 
  countryCode: z.string().default("+91"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface InquiryFormProps {
  defaultCamp?: string; // Kept only to pre-fill message text if needed
  defaultPuja?: string;
}

export function InquiryForm({ defaultCamp, defaultPuja }: InquiryFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const cleanMobile = user?.mobile ? user.mobile.replace("+91", "").replace(/\D/g, "") : "";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      mobile: cleanMobile,
      countryCode: "+91",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      // ✅ CLEAN PAYLOAD: No dummy dates, no camp IDs.
      const payload = {
        name: data.name,
        mobile: `${data.countryCode}${data.mobile}`,
        message: data.message,
      };
      
      // Hit the NEW contact endpoint
      const response = await apiRequest("POST", "/api/contact", payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t("Message Sent!", "संदेश भेजा गया!"),
        description: t("Our team will contact you shortly.", "हमारी टीम आपको जल्द ही कॉल करेगी।"),
      });
      setLocation("/"); 
    },
    onError: (error: Error) => {
      toast({
        title: t("Error", "त्रुटि"),
        description: t("Failed to send message. Please try WhatsApp.", "संदेश भेजने में विफल। कृपया व्हाट्सएप का प्रयास करें।"),
        variant: "destructive",
      });
    },
  });



  const onSubmit = (data: FormData) => {
    if (!user) {
      toast({
        title: t("Login Required", "लॉगिन आवश्यक"),
        description: t("Please login to send a message.", "कृपया संदेश भेजने के लिए लॉगिन करें।"),
        variant: "destructive"
      });
      return;
    }
    mutation.mutate(data);
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please check the red fields.",
      variant: "destructive"
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6" data-testid="inquiry-form">
        
        {/* Name Field */}
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

          {/* Mobile Field */}
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

        {/* Message Field */}
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

        {/* Action Button */}
        {user ? (
          <Button type="submit" size="lg" className="w-full py-6 text-lg" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("Sending...", "भेज रहा है...")}</>
            ) : (
              <><Send className="mr-2 h-5 w-5" /> {t("Send Message", "संदेश भेजें")}</>
            )}
          </Button>
        ) : (
          <div className="space-y-3 p-4 border border-dashed border-primary/30 rounded-lg text-center bg-primary/5">
            <p className="text-sm text-muted-foreground">{t("Please login to send us a message", "कृपया हमें संदेश भेजने के लिए लॉगिन करें")}</p>
            <div className="flex justify-center">
               <AuthModal trigger={<Button variant="default">{t("Login & Send", "लॉगिन करें और भेजें")}</Button>} />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}