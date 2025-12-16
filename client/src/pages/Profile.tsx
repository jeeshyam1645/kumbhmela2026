import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { updateUserSchema } from "@app/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext"; // 1. Import Language Context

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User as UserIcon, MapPin, Phone, Save, Edit2, Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useLanguage(); // 2. Get translation function
  
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      mobile: user?.mobile || "",
      imageUrl: user?.imageUrl || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zip: user?.zip || "",
      country: user?.country || "India",
    },
    values: {
      name: user?.name || "",
      mobile: user?.mobile || "",
      imageUrl: user?.imageUrl || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zip: user?.zip || "",
      country: user?.country || "India",
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast({ 
          title: t("File too large", "फ़ाइल बहुत बड़ी है"), 
          description: t("Please upload an image smaller than 5MB", "कृपया 5MB से छोटी छवि अपलोड करें"), 
          variant: "destructive" 
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("imageUrl", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", "/api/user", data);
      return res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      setIsEditing(false);
      toast({ 
        title: t("Success", "सफल"), 
        description: t("Profile updated successfully.", "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई।") 
      });
    },
    onError: (error: Error) => {
      toast({ 
        title: t("Error", "त्रुटि"), 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  if (isLoading || !user) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4"> 
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-primary">
          {t("My Profile", "मेरी प्रोफ़ाइल")}
        </h1>
        
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2 shadow-sm">
            <Edit2 className="w-4 h-4" /> {t("Edit Profile", "प्रोफ़ाइल संपादित करें")}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/10 shadow-md">
            <CardHeader className="text-center pb-2">
              <div className="flex flex-col items-center mb-4 relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={isEditing ? form.watch("imageUrl") : user.imageUrl || ""} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2">
                    <Button 
                      size="sm" 
                      onClick={triggerFileInput} 
                      className="rounded-full shadow-md gap-2 h-8 px-4" 
                      type="button"
                    >
                      <Upload className="w-3 h-3" /> {t("Change", "बदलें")}
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl mt-4">{user.name}</CardTitle>
              <CardDescription>{user.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  {user.mobile || t("No mobile added", "कोई मोबाइल नहीं")}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="font-medium">
                  {user.city ? `${user.city}, ${user.country}` : t("No location set", "कोई स्थान सेट नहीं")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing 
                  ? t("Edit Details", "विवरण संपादित करें") 
                  : t("Personal Information", "व्यक्तिगत जानकारी")}
              </CardTitle>
              <CardDescription>
                {isEditing 
                  ? t("Make changes to your profile below.", "नीचे अपनी प्रोफ़ाइल में परिवर्तन करें।") 
                  : t("Your account details and contact information.", "आपके खाते का विवरण और संपर्क जानकारी।")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                /* EDIT MODE FORM */
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6 animate-in fade-in duration-300">
                  
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2 text-primary">
                      <UserIcon className="w-4 h-4" /> {t("Basic Info", "मूल जानकारी")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t("Full Name", "पूरा नाम")}</Label>
                        <Input {...form.register("name")} />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("Mobile Number", "मोबाइल नंबर")}</Label>
                        <Input {...form.register("mobile")} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2 text-primary">
                      <MapPin className="w-4 h-4" /> {t("Address Details", "पता विवरण")}
                    </h3>
                    <div className="space-y-2">
                      <Label>{t("Street Address", "गली का पता")}</Label>
                      <Input {...form.register("address")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t("City", "शहर")}</Label>
                        <Input {...form.register("city")} />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("State", "राज्य")}</Label>
                        <Input {...form.register("state")} />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("Zip Code", "पिन कोड")}</Label>
                        <Input {...form.register("zip")} />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("Country", "देश")}</Label>
                        <Input {...form.register("country")} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>
                      <X className="mr-2 h-4 w-4" /> {t("Cancel", "रद्द करें")}
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" /> {t("Save Changes", "परिवर्तन सहेजें")}
                    </Button>
                  </div>
                </form>
              ) : (
                /* VIEW MODE */
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Full Name", "पूरा नाम")}</Label>
                      <div className="text-lg font-medium">{user.name}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Username / Email", "उपयोगकर्ता नाम / ईमेल")}</Label>
                      <div className="text-lg font-medium">{user.username}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Mobile", "मोबाइल")}</Label>
                      <div className="text-lg font-medium">{user.mobile || "—"}</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium flex items-center gap-2 text-primary mb-4">
                      <MapPin className="w-4 h-4" /> {t("Address", "पता")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Street", "गली")}</Label>
                        <div className="text-lg font-medium">{user.address || "—"}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("City", "शहर")}</Label>
                        <div className="text-lg font-medium">{user.city || "—"}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("State", "राज्य")}</Label>
                        <div className="text-lg font-medium">{user.state || "—"}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Zip Code", "पिन कोड")}</Label>
                        <div className="text-lg font-medium">{user.zip || "—"}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t("Country", "देश")}</Label>
                        <div className="text-lg font-medium">{user.country || "—"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}