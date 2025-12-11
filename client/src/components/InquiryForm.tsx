import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { campTypes, pujaServices } from "@shared/schema";
import { Link } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").max(15),
  countryCode: z.string().default("+91"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  persons: z.string(),
  campPreference: z.string(),
  specialNeeds: z.string().optional(),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
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

  const pujaService = pujaServices.find((p) => p.id === defaultPuja);
  const defaultMessage = pujaService
    ? `${t("I am interested in", "मुझे रुचि है")} ${pujaService.nameEn} (${pujaService.nameHi})`
    : "";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      countryCode: "+91",
      checkIn: "",
      checkOut: "",
      persons: "2",
      campPreference: defaultCamp || "swiss-cottage",
      specialNeeds: defaultMessage,
      agreedToTerms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        name: data.name,
        mobile: data.mobile,
        countryCode: data.countryCode,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        persons: parseInt(data.persons, 10),
        campPreference: data.campPreference,
        specialNeeds: data.specialNeeds || "",
        agreedToTerms: data.agreedToTerms ? 1 : 0,
        pujaRequest: defaultPuja || undefined,
      };
      const response = await apiRequest("POST", "/api/inquiries", payload);
      return response;
    },
    onSuccess: (data: any) => {
      setLocation(`/thank-you?name=${encodeURIComponent(form.getValues("name"))}`);
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
    mutation.mutate(data);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="inquiry-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Full Name", "पूरा नाम")} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Enter your name", "अपना नाम दर्ज करें")}
                    {...field}
                    data-testid="input-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>{t("Mobile Number", "मोबाइल नंबर")} *</Label>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-24" data-testid="select-country-code">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+971">+971</SelectItem>
                      <SelectItem value="+65">+65</SelectItem>
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
                      <Input
                        type="tel"
                        placeholder={t("Mobile number", "मोबाइल नंबर")}
                        {...field}
                        data-testid="input-mobile"
                      />
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
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Check-in Date", "चेक-इन तिथि")} *</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min={today}
                    {...field}
                    data-testid="input-checkin"
                  />
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
                <FormLabel>{t("Check-out Date", "चेक-आउट तिथि")} *</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min={form.watch("checkIn") || today}
                    {...field}
                    data-testid="input-checkout"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="persons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Number of Persons", "व्यक्तियों की संख्या")} *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-persons">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? t("Person", "व्यक्ति") : t("Persons", "व्यक्ति")}
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
            name="campPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Camp Preference", "कैंप वरीयता")} *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-camp">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {campTypes.map((camp) => (
                      <SelectItem key={camp.id} value={camp.id}>
                        {language === "hi" ? camp.nameHi : camp.nameEn}
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
              <FormLabel>{t("Special Needs / Puja Request", "विशेष आवश्यकताएं / पूजा अनुरोध")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t(
                    "Any special requirements or puja services you'd like to book...",
                    "कोई विशेष आवश्यकता या पूजा सेवाएं जो आप बुक करना चाहते हैं..."
                  )}
                  className="min-h-[100px]"
                  {...field}
                  data-testid="textarea-special-needs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="checkbox-terms"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  {t("I have read and agree to the", "मैंने पढ़ लिया है और सहमत हूं")}{" "}
                  <Link href="/terms" className="text-primary underline">
                    {t("Terms & Cancellation Policy", "नियम और रद्दीकरण नीति")}
                  </Link>
                  {" *"}
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full py-6 text-lg"
          disabled={mutation.isPending}
          data-testid="button-submit-inquiry"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t("Submitting...", "जमा हो रहा है...")}
            </>
          ) : (
            t("Submit Enquiry", "पूछताछ जमा करें")
          )}
        </Button>
      </form>
    </Form>
  );
}
