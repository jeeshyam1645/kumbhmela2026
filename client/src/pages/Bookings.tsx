import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { Booking, Camp } from "@shared/types";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2, CalendarDays, Users, Tent, Clock, CheckCircle, XCircle, Phone, AlertTriangle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Bookings() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State for cancelling
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/");
    }
  }, [user, authLoading, setLocation]);

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/my-bookings"],
    queryFn: async () => {
        const res = await fetch("/api/my-bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
    },
    enabled: !!user, 
  });

  const { data: camps } = useQuery<Camp[]>({
    queryKey: ["/api/camps"],
    queryFn: async () => {
        const res = await fetch("/api/camps");
        if (!res.ok) throw new Error("Failed to fetch camps");
        return res.json();
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const res = await apiRequest("PATCH", `/api/bookings/${bookingId}/cancel`);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("Booking Cancelled", "बुकिंग रद्द कर दी गई"), description: t("Your booking status has been updated.", "आपकी बुकिंग स्थिति अपडेट कर दी गई है।") });
      queryClient.invalidateQueries({ queryKey: ["/api/my-bookings"] });
      setBookingToCancel(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  if (authLoading || bookingsLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const getCampDetails = (campId: number) => camps?.find(c => c.id === campId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4 mr-1" />;
      case "cancelled": return <XCircle className="w-4 h-4 mr-1" />;
      default: return <Clock className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4 min-h-screen">
      <h1 className="text-3xl font-bold font-serif text-primary mb-2">{t("My Bookings", "मेरी बुकिंग")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("Track the status of your upcoming stays at Magh Mela.", "माघ मेला में अपने आगामी प्रवास की स्थिति देखें।")}
      </p>

      {bookings && bookings.length > 0 ? (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const camp = getCampDetails(booking.campId);
            const isConfirmed = booking.status === "confirmed";
            const isCancelled = booking.status === "cancelled";

            return (
              <Card key={booking.id} className={`overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-shadow ${isCancelled ? "border-l-gray-300 opacity-75" : "border-l-primary/60"}`}>
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-48 h-32 md:h-auto bg-muted relative">
                    {camp?.imageUrl ? (
                        <img src={camp.imageUrl} alt="Camp" className={`w-full h-full object-cover ${isCancelled ? "grayscale" : ""}`} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <Tent className="h-8 w-8" />
                        </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                            {language === "hi" && camp?.nameHi ? camp.nameHi : camp?.nameEn || "Unknown Camp"}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                           <Badge variant="secondary" className="text-xs font-normal">
                             ID: #{booking.id}
                           </Badge>
                           <Badge variant="outline" className={getStatusColor(booking.status || "pending")}>
                             {getStatusIcon(booking.status || "pending")}
                             <span className="capitalize">{booking.status}</span>
                           </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="block text-xs text-muted-foreground">{t("Total Amount", "कुल राशि")}</span>
                        <span className="text-xl font-bold text-primary">₹{booking.totalAmount}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <div>
                          <span className="block text-xs text-muted-foreground">{t("Check-in", "चेक-इन")}</span>
                          <span className="font-medium">{format(new Date(booking.checkIn), "PPP")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <div>
                          <span className="block text-xs text-muted-foreground">{t("Check-out", "चेक-आउट")}</span>
                          <span className="font-medium">{format(new Date(booking.checkOut), "PPP")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                          <span className="block text-xs text-muted-foreground">{t("Guests", "अतिथि")}</span>
                          <span className="font-medium">{booking.guestCount} {t("Persons", "लोग")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="w-full md:w-48 bg-muted/20 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-border">
                    {isCancelled ? (
                       <div className="text-center text-sm text-red-600 font-medium">{t("Booking Cancelled", "बुकिंग रद्द")}</div>
                    ) : isConfirmed ? (
                        <>
                          <Button variant="outline" size="sm" className="w-full border-primary text-primary">
                              {t("Download Receipt", "रसीद डाउनलोड")}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                            onClick={() => setShowSupportDialog(true)}
                          >
                              {t("Request Cancellation", "रद्दीकरण का अनुरोध")}
                          </Button>
                        </>
                    ) : (
                        <>
                           <div className="text-xs text-center text-muted-foreground mb-1">
                             {t("Pending Confirmation", "पुष्टि लंबित")}
                           </div>
                           <Button 
                             variant="destructive" 
                             size="sm" 
                             className="w-full"
                             onClick={() => setBookingToCancel(booking.id)}
                           >
                              {t("Cancel Booking", "बुकिंग रद्द करें")}
                           </Button>
                        </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed border-border">
          <Tent className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">{t("No bookings found", "कोई बुकिंग नहीं मिली")}</h3>
          <Link href="/accommodation">
            <Button>{t("Explore Camps", "कैंप देखें")}</Button>
          </Link>
        </div>
      )}

      {/* ALERT: Cancel Pending */}
      <AlertDialog open={!!bookingToCancel} onOpenChange={() => setBookingToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Cancel Booking?", "बुकिंग रद्द करें?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to cancel this booking request? This action cannot be undone.", "क्या आप वाकई इस बुकिंग अनुरोध को रद्द करना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Keep Booking", "बुकिंग रखें")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => bookingToCancel && cancelMutation.mutate(bookingToCancel)}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("Yes, Cancel", "हाँ, रद्द करें")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DIALOG: Cancel Confirmed (Support) */}
      <AlertDialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
               <AlertTriangle className="text-yellow-600 h-5 w-5" />
               {t("Cancellation Policy", "रद्दीकरण नीति")}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                {t(
                  "Confirmed bookings cannot be cancelled automatically as they may involve refunds.", 
                  "पुष्ट बुकिंग को स्वचालित रूप से रद्द नहीं किया जा सकता क्योंकि इसमें रिफंड शामिल हो सकता है।"
                )}
              </p>
              <p>
                {t(
                  "Please contact our support team to process your cancellation request.", 
                  "कृपया अपना रद्दीकरण अनुरोध संसाधित करने के लिए हमारी सहायता टीम से संपर्क करें।"
                )}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4 bg-muted rounded-md flex items-center justify-between">
             <div className="text-sm font-medium">Support: +91 76675 86151</div>
             <a href="tel:+917667586151">
               <Button size="sm" variant="outline"><Phone className="w-4 h-4 mr-2" /> Call Now</Button>
             </a>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Close", "बंद करें")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}