import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/hooks/use-auth"; 
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Pages
import Home from "@/pages/Home";
import Accommodation from "@/pages/Accommodation";
import PujaServices from "@/pages/PujaServices";
import KumbhGuide from "@/pages/KumbhGuide";
import Contact from "@/pages/Contact";
import ThankYou from "@/pages/ThankYou";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";
import Profile from "@/pages/Profile";
import AdminDashboard from "@/pages/AdminDashboard";
import Bookings from "@/pages/Bookings"; // <--- 1. ADD IMPORT
import { ProtectedRoute } from "@/lib/protected-route";
import { useEffect } from "react"; // <--- 1. Import useEffect

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
<ProtectedRoute path="/admin" component={AdminDashboard} adminOnly={true} />
      
      {/* PROTECTED USER ROUTE (Optional, for profile/bookings if you want strict redirect) */}
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/bookings" component={Bookings} />
      <Route path="/accommodation" component={Accommodation} />
      <Route path="/puja-services" component={PujaServices} />
      <Route path="/kumbh-guide" component={KumbhGuide} />
      <Route path="/contact" component={Contact} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  const [location] = useLocation();
  // Don't show WhatsApp button on Thank You page
  const isThankYouPage = location === "/thank-you";

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      {!isThankYouPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider> 
            <Toaster />
            <Layout />
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;