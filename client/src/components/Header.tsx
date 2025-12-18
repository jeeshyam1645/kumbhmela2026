import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogOut, User, CalendarDays, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("Home", "होम") },
    { href: "/about", label: t("About Us", "हमारे बारे में") }, // ADDED THIS
    { href: "/accommodation", label: t("Accommodation", "आवास") },
    { href: "/puja-services", label: t("Vedic Rituals", "वैदिक अनुष्ठान") }, // UPDATED LABEL
    { href: "/kumbh-guide", label: t("Kumbh Guide", "कुंभ गाइड") },
    { href: "/contact", label: t("Contact", "संपर्क") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const useDarkTheme = isScrolled || !isHomePage || isMobileMenuOpen;

  const getTextColor = (active: boolean) => {
    if (active) return "bg-primary/10 text-primary hover:bg-primary/20";
    if (useDarkTheme) return "text-zinc-900 hover:bg-zinc-100"; 
    return "text-white hover:bg-white/20"; 
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        useDarkTheme
          ? "bg-background/95 backdrop-blur-md shadow-sm border-border/40"
          : "bg-transparent border-transparent"
      )}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">
                {t("M", "म")}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                "font-semibold text-lg transition-colors",
                useDarkTheme ? "text-foreground" : "text-white drop-shadow-md"
              )}>
                {t("Magh Mela", "माघ मेला")}
              </span>
              <span className={cn(
                "block text-xs transition-colors",
                useDarkTheme ? "text-muted-foreground" : "text-white/90 drop-shadow-md"
              )}>
                {t("Prayagraj 2026", "प्रयागराज 2026")}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "font-medium transition-colors duration-200",
                    getTextColor(isActive(link.href))
                  )}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Language Toggle */}
            <div
              className={cn(
                "flex items-center rounded-full border overflow-hidden transition-colors flex",
                useDarkTheme ? "border-border bg-background" : "border-white/30 bg-black/20 backdrop-blur-sm"
              )}
            >
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : useDarkTheme ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/20"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  language === "hi"
                    ? "bg-primary text-primary-foreground"
                    : useDarkTheme ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/20"
                )}
              >
                हिं
              </button>
            </div>

            {/* USER MENU (Desktop) */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={user.imageUrl || ""} alt={user.name} objectFit="cover" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.username}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer w-full flex items-center font-semibold text-primary">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>{t("Admin Dashboard", "प्रशासन डैशबोर्ड")}</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer w-full flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("Profile", "प्रोफ़ाइल")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings" className="cursor-pointer w-full flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <span>{t("My Bookings", "मेरी बुकिंग")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logoutMutation.mutate()} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("Log out", "लॉग आउट")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <AuthModal 
                  trigger={
                    <Button 
                      className={cn(
                        "shadow-md",
                        !useDarkTheme && "bg-white text-primary hover:bg-white/90"
                      )}
                    >
                      {t("Login", "लॉग इन")}
                    </Button>
                  } 
                />
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden",
                useDarkTheme ? "text-foreground" : "text-white hover:bg-white/20"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border shadow-xl absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            
            {/* Mobile Auth Section */}
            <div className="mb-6 pb-6 border-b border-border">
               {user ? (
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 px-2">
                     <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={user.imageUrl || ""} />
                        <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                     </Avatar>
                     <div>
                       <p className="font-medium">{user.name}</p>
                       <p className="text-xs text-muted-foreground">{user.username}</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-2 mt-2">
                     <Link href="/profile">
                       <Button variant="outline" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                         <User className="mr-2 h-4 w-4" /> Profile
                       </Button>
                     </Link>
                     <Link href="/bookings">
                       <Button variant="outline" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                         <CalendarDays className="mr-2 h-4 w-4" /> Bookings
                       </Button>
                     </Link>
                   </div>

                   {/* ADMIN LINK MOBILE */}
                   {user.role === 'admin' && (
                     <Link href="/admin">
                       <Button variant="outline" className="w-full justify-start border-primary/50 text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                         <Shield className="mr-2 h-4 w-4" /> Admin Dashboard
                       </Button>
                     </Link>
                   )}

                   <Button variant="destructive" className="w-full" onClick={() => logoutMutation.mutate()}>
                      Log Out
                   </Button>
                 </div>
               ) : (
                 <AuthModal 
                   trigger={<Button className="w-full size-lg text-lg">Login / Register</Button>} 
                 />
               )}
            </div>

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-base h-12",
                    isActive(link.href) ? "text-primary font-semibold" : "text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}