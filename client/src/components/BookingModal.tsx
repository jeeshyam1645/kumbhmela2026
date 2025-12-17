import { useState, useEffect } from "react"; // Added useEffect
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Camp } from "@app/shared";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const bookingFormSchema = z.object({
  checkIn: z.string().min(1, "Required"),
  checkOut: z.string().min(1, "Required"),
  guestCount: z.string(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"), // improved validation
  guestName: z.string().min(2, "Name is required"),
});

// 1. FIX: Update Interface to accept defaultTab
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  camp: Camp;
  defaultTab?: "book" | "inquiry"; // <--- ADDED THIS
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  camp, 
  defaultTab = "book" // <--- Default value (optional usage)
}: BookingModalProps) {
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
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

  // 2. OPTIONAL: If 'inquiry' is passed, you could scroll to buttons or auto-focus
  // For now, we just accept the prop so TypeScript stops complaining.

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
    
    // Manual Validation Check
    if (!values.checkIn || !values.checkOut || !values.mobile || !values.guestName) {
      toast({ 
        title: t("Missing Details", "विवरण गायब है"), 
        description: t("Please fill in all fields (Dates, Name, Mobile).", "कृपया सभी फ़ील्ड (तिथियां, नाम, मोबाइल) भरें।"), 
        variant: "destructive" 
      });
      return;
    }

    if (type === "online_token") {
      toast({ 
        title: t("Processing Payment...", "भुगतान संसाधित हो रहा है..."), 
        description: t("Redirecting to payment gateway...", "भुगतान गेटवे पर पुनर्निर्देशित किया जा रहा है...") 
      });
      // Simulate delay for effect
      setTimeout(() => {
        mutation.mutate({ ...values, bookingType: "online_token" });
      }, 1000);
    } else {
      mutation.mutate({ ...values, bookingType: "inquiry_call" });
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const campName = language === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn;

  // LIVE CALCULATION
  const checkInDate = form.watch("checkIn");
  const checkOutDate = form.watch("checkOut");
  const guestCount = parseInt(form.watch("guestCount") || "2");

  let calculatedTotal = 0;
  let advanceAmount = 0;

  if (checkInDate && checkOutDate) {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime(); // Removed Math.abs for logical check
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      calculatedTotal = camp.price * guestCount * diffDays;
      advanceAmount = Math.round(calculatedTotal * 0.10);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {t(num === 1 ? "Guest" : "Guests", num === 1 ? "अतिथि" : "अतिथि")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("Mobile", "मोबाइल")}</Label>
              <Input {...form.register("mobile")} placeholder="9876543210" type="tel" />
            </div>
          </div>

          <div className="space-y-2">
             <Label>{t("Guest Name", "अतिथि का नाम")}</Label>
             <Input {...form.register("guestName")} placeholder="Enter full name" />
          </div>

          {/* TOTAL DISPLAY */}
          {calculatedTotal > 0 && (
            <div className="bg-muted p-3 rounded-md text-sm flex justify-between items-center font-medium">
              <span>Total Estimate:</span>
              <span className="text-primary text-lg">₹{calculatedTotal}</span>
            </div>
          )}

          {/* HYBRID ACTION BUTTONS */}
{/* ACTION BUTTONS: Request Callback Only */}
          <div className="pt-4 flex flex-col gap-3">
            <Button 
              size="lg"
              className="w-full h-12 text-base font-semibold shadow-md"
              onClick={() => handleBooking("inquiry_call")}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Phone className="w-5 h-5 mr-2" />
              )}
              {t("Request Callback to Book", "बुक करने के लिए कॉलबैक का अनुरोध करें")}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-3">
              {t(
                "Our team will call you shortly to confirm availability and payment details.", 
                "हमारी टीम उपलब्धता और भुगतान विवरण की पुष्टि करने के लिए आपको शीघ्र ही कॉल करेगी।"
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}