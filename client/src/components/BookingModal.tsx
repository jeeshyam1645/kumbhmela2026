import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Camp } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Phone, CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // <--- Import

const bookingFormSchema = z.object({
  checkIn: z.string().min(1, "Required"),
  checkOut: z.string().min(1, "Required"),
  guestCount: z.string(),
  mobile: z.string().min(10),
  guestName: z.string().min(2),
});

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  camp: Camp;
}

export function BookingModal({ isOpen, onClose, camp }: BookingModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage(); // <--- Hook
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guestCount: "2",
      mobile: user?.mobile || "",
      guestName: user?.name || "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        guestCount: parseInt(data.guestCount),
        campId: camp.id,
      };
      const res = await apiRequest("POST", "/api/bookings", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({ 
        title: t("Success!", "सफल!"), 
        description: t("Your booking request has been placed.", "आपका बुकिंग अनुरोध प्राप्त हो गया है।") 
      });
      onClose();
      setLocation("/bookings");
    },
    onError: (err: Error) => {
      toast({ title: t("Error", "त्रुटि"), description: err.message, variant: "destructive" });
    }
  });

  const handleBooking = (type: "inquiry_call" | "online_token") => {
    const values = form.getValues();
    if (!values.checkIn || !values.checkOut || !values.mobile) {
      toast({ 
        title: t("Missing Details", "विवरण गायब है"), 
        description: t("Please fill in all fields.", "कृपया सभी फ़ील्ड भरें।"), 
        variant: "destructive" 
      });
      return;
    }

    if (type === "online_token") {
      toast({ 
        title: t("Processing Payment...", "भुगतान संसाधित हो रहा है..."), 
        description: t("Simulating payment...", "भुगतान का अनुकरण...") 
      });
      setTimeout(() => {
        mutation.mutate({ ...values, bookingType: "online_token" });
      }, 1500);
    } else {
      mutation.mutate({ ...values, bookingType: "inquiry_call" });
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const campName = language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn;

  // ... existing hooks ...
  
  // LIVE CALCULATION
  const checkInDate = form.watch("checkIn");
  const checkOutDate = form.watch("checkOut");
  const guestCount = parseInt(form.watch("guestCount") || "2");

  let calculatedTotal = 0;
  let advanceAmount = 0;

  if (checkInDate && checkOutDate) {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    calculatedTotal = camp.price * guestCount * diffDays;
    advanceAmount = Math.round(calculatedTotal * 0.10);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{t("Book", "बुक करें")} {campName}</DialogTitle>
          <DialogDescription>
            {t("Price", "मूल्य")}: ₹{camp.price} / {t("Night", "रात")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Check-in", "चेक-इन")}</Label>
              <Input type="date" min={today} {...form.register("checkIn")} />
            </div>
            <div className="space-y-2">
              <Label>{t("Check-out", "चेक-आउट")}</Label>
              <Input type="date" min={form.watch("checkIn") || today} {...form.register("checkOut")} />
            </div>
          </div>

          {/* Guests & Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Guests", "अतिथि")}</Label>
              <Select onValueChange={(v) => form.setValue("guestCount", v)} defaultValue="2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {t(num === 1 ? "Guest" : "Guests", num === 1 ? "अतिथि" : "अतिथि")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("Mobile", "मोबाइल")}</Label>
              <Input {...form.register("mobile")} placeholder={t("Contact Number", "संपर्क नंबर")} />
            </div>
          </div>

          <div className="space-y-2">
             <Label>{t("Guest Name", "अतिथि का नाम")}</Label>
             <Input {...form.register("guestName")} />
          </div>

          {/* HYBRID ACTION BUTTONS */}
          <div className="pt-4 flex flex-col gap-3">
            
            {/* OPTION 1: PAY TOKEN */}
<Button 
              size="lg" 
              className="w-full bg-green-700 hover:bg-green-800 text-white flex justify-between items-center"
              onClick={() => handleBooking("online_token")}
              disabled={mutation.isPending}
            >
              <span className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> 
                <div className="text-left leading-tight">
                  <div>Secure Slot</div>
                  {advanceAmount > 0 && (
                    <div className="text-xs opacity-80 font-normal">
                      Pay 10% Advance: ₹{advanceAmount}
                    </div>
                  )}
                </div>
              </span>
              {mutation.isPending ? <Loader2 className="animate-spin" /> : <span className="font-bold">→</span>}
            </Button>
            
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("OR", "या")}</span>
            </div>

            {/* OPTION 2: REQUEST CALLBACK */}
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/5"
              onClick={() => handleBooking("inquiry_call")}
              disabled={mutation.isPending}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t("Request Callback & Pay Later", "कॉलबैक का अनुरोध करें और बाद में भुगतान करें")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}