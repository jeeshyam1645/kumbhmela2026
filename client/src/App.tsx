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
import { MobileContactBar } from "@/components/MobileContactBar";

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
import { ProtectedRoute } from "@/lib/protected-route";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import About from "./pages/About";

const Profile = lazy(() => import("@/pages/Profile"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const Bookings = lazy(() => import("@/pages/Bookings"));

function PageLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Switch>
      <Route path="/" component={Home} />
<ProtectedRoute path="/admin" component={AdminDashboard} adminOnly={true} />
      
      {/* PROTECTED USER ROUTE (Optional, for profile/bookings if you want strict redirect) */}
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/bookings" component={Bookings} />
      <Route path="/accommodation" component={Accommodation} />
      <Route path="/puja-services" component={PujaServices} />
      <Route path="/about-us" component={About} />
      <Route path="/kumbh-guide" component={KumbhGuide} />
      <Route path="/contact" component={Contact} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
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
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      {!isThankYouPage && <WhatsAppButton />}
      {!isThankYouPage && <MobileContactBar />}
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