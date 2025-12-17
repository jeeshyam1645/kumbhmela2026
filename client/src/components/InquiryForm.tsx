import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Camp, PujaService } from "@app/shared"; 
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";

// --- 1. DEFINE API BASE URL ---
// If you have a VITE_API_URL in .env, use it. Otherwise, fallback to your Render URL.
const API_BASE = import.meta.env.VITE_API_URL || "https://magh-mela-backend.onrender.com";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  // Relaxed regex to allow simple numbers
  mobile: z.string().min(10, "Mobile must be at least 10 digits").max(15, "Mobile too long"), 
  countryCode: z.string().default("+91"),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  persons: z.string().optional(),
  campPreference: z.string().optional(),
  specialNeeds: z.string().optional(),
  agreedToTerms: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface InquiryFormProps {
  defaultCamp?: string;
  defaultPuja?: string;
}

export function InquiryForm({ defaultCamp, defaultPuja }: InquiryFormProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  // --- 2. FIX FETCH URLS (Use API_BASE) ---
  const { data: camps, isLoading: isLoadingCamps } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
      // Use Absolute URL
      const response = await fetch(`${API_BASE}/api/camps`);
      if (!response.ok) throw new Error("Failed to load camps");
      return response.json();
    },
  });

  const { data: pujas } = useQuery<PujaService[]>({
    queryKey: ["/api/puja-services"],
    queryFn: async () => {
      // Use Absolute URL
      const response = await fetch(`${API_BASE}/api/puja-services`);
      if (!response.ok) throw new Error("Failed to load pujas");
      return response.json();
    },
  });

  // --- 3. CLEAN MOBILE NUMBER ---
  // If user.mobile has +91, remove it so it fits the input field
  const cleanMobile = user?.mobile ? user.mobile.replace("+91", "").replace(/\D/g, "") : "";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      mobile: cleanMobile, // Use cleaned mobile
      countryCode: "+91",
      checkIn: "",
      checkOut: "",
      persons: "2",
      campPreference: defaultCamp || "",
      specialNeeds: "",
      agreedToTerms: true,
    },
  });

  useEffect(() => {
    if (defaultPuja && pujas) {
      const targetId = parseInt(defaultPuja);
      const service = pujas.find((p) => p.id === targetId);
      if (service) {
        const msg = `${t("I am interested in", "मुझे रुचि है")} ${service.nameEn} (${service.nameHi})`;
        form.setValue("specialNeeds", msg);
      }
    }
  }, [defaultPuja, pujas, t, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);

      const defaultCampId = camps && camps.length > 0 ? camps[0].id : 1;
      const selectedCampId = data.campPreference ? parseInt(data.campPreference) : defaultCampId;

      const payload = {
        guestName: data.name,
        mobile: `${data.countryCode}${data.mobile}`,
        checkIn: data.checkIn || tomorrow.toISOString().split('T')[0],
        checkOut: data.checkOut || dayAfter.toISOString().split('T')[0],
        guestCount: data.persons ? parseInt(data.persons) : 2,
        campId: isNaN(selectedCampId) ? 1 : selectedCampId,
        specialNeeds: data.specialNeeds || "",
        pujaRequest: defaultPuja || undefined, 
        bookingType: "inquiry_call",
        totalAmount: 0, 
      };
      
      const response = await apiRequest("POST", "/api/bookings", payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t("Inquiry Sent!", "पूछताछ भेजी गई!"),
        description: t("We will call you shortly on your mobile.", "हम जल्द ही आपके मोबाइल पर कॉल करेंगे।"),
      });
      setLocation("/bookings"); // Redirect to bookings or thank you
    },
    onError: (error: Error) => {
      toast({
        title: t("Error", "त्रुटि"),
        description: error.message || t("Something went wrong", "कुछ गलत हो गया"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!user) {
      toast({
        title: t("Login Required", "लॉगिन आवश्यक"),
        description: t("Please login to submit.", "कृपया जमा करने के लिए लॉगिन करें।"),
        variant: "destructive"
      });
      return;
    }
    mutation.mutate(data);
  };

  // --- 4. DEBUG FORM ERRORS ---
  // This helps you see why the button "does nothing"
  const onError = (errors: any) => {
    console.log("Form Validation Errors:", errors);
    toast({
      title: "Form Error",
      description: "Please check the red fields.",
      variant: "destructive"
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Form {...form}>
      {/* Pass onError to handleSubmit to catch validation issues */}
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6" data-testid="inquiry-form">
        
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

        {/* ... (Rest of your fields: Optional Details, CheckIn, Camp Preference, Special Needs - No changes needed below) ... */}
        
        <div className="text-sm font-medium text-muted-foreground mt-4 mb-2">
          {t("Optional Details (We can discuss this on call)", "वैकल्पिक विवरण (हम कॉल पर चर्चा कर सकते हैं)")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/20 rounded-lg">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Check-in (Tentative)", "चेक-इन (संभावित)")}</FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Camp Preference", "कैंप वरीयता")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoadingCamps}>
                      <SelectValue placeholder={t("Any / Not Sure", "कोई भी / निश्चित नहीं")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {camps?.map((camp) => (
                      <SelectItem key={camp.id} value={camp.id.toString()}>
                        {language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Message / Puja Request", "संदेश / पूजा अनुरोध")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("Tell us what you are looking for...", "हमें बताएं कि आप क्या ढूंढ रहे हैं...")} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {user ? (
          <Button type="submit" size="lg" className="w-full py-6 text-lg bg-green-700 hover:bg-green-800" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("Sending...", "भेज रहा है...")}</>
            ) : (
              t("Request Callback", "कॉलबैक का अनुरोध करें")
            )}
          </Button>
        ) : (
          <div className="space-y-3 p-4 border border-dashed border-primary/30 rounded-lg text-center bg-primary/5">
            <p className="text-sm text-muted-foreground">{t("Please login to verify your phone number", "कृपया अपना फोन नंबर सत्यापित करने के लिए लॉगिन करें")}</p>
            <div className="flex justify-center">
               <AuthModal trigger={<Button variant="default">{t("Login & Send Inquiry", "लॉगिन करें और पूछताछ भेजें")}</Button>} />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}