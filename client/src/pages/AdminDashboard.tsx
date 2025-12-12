import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { Booking, Camp, PujaService } from "@shared/schema";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Check, X, Loader2, Phone, AlertTriangle, Edit, Trash2, Plus, Upload } from "lucide-react";
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

// --- HELPER COMPONENT: IMAGE UPLOAD ---
// Handles toggling between URL input and File Upload
const ImageUploadField = ({ form, name, label }: { form: UseFormReturn<any>, name: string, label: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUrl = form.watch(name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
        toast({ title: "File too large", description: "Max 5MB allowed.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue(name, reader.result as string); // Save Base64 to form
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Image Preview */}
      {imageUrl && (
        <div className="relative w-full h-40 mb-2 rounded-md overflow-hidden border border-border bg-muted">
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          <Button 
            type="button" 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-6 w-6 opacity-80 hover:opacity-100"
            onClick={() => form.setValue(name, "")}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Input Group */}
      <div className="flex gap-2">
        <Input 
          {...form.register(name)} 
          placeholder="https://... or upload file" 
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Upload className="w-4 h-4" /> Upload
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  
  // State
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);
  const [isCampDialogOpen, setIsCampDialogOpen] = useState(false);
  const [editingPuja, setEditingPuja] = useState<PujaService | null>(null);
  const [isPujaDialogOpen, setIsPujaDialogOpen] = useState(false);

  // --- QUERIES ---
  const { data: bookings, isLoading } = useQuery<Booking[]>({ 
    queryKey: ["/api/admin/bookings"],
    refetchInterval: 10000 
  });
  
  const { data: camps } = useQuery<Camp[]>({ queryKey: ["/api/camps"] });
  const { data: pujas } = useQuery<PujaService[]>({ queryKey: ["/api/puja-services"] });

  // --- BOOKING MUTATIONS ---
  const confirmMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("PATCH", `/api/admin/bookings/${id}/confirm`);
    },
    onSuccess: () => {
      toast({ title: "Booking Confirmed", className: "bg-green-600 text-white" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("PATCH", `/api/admin/bookings/${id}/reject`);
    },
    onSuccess: () => {
      toast({ title: "Booking Rejected", description: "Refund process initiated." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      setRejectId(null);
    }
  });

  // --- CAMP MUTATIONS ---
  const saveCampMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingCamp) {
        await apiRequest("PATCH", `/api/admin/camps/${editingCamp.id}`, data);
      } else {
        await apiRequest("POST", "/api/admin/camps", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/camps"] });
      setIsCampDialogOpen(false);
      setEditingCamp(null);
      toast({ title: "Camp Saved Successfully" });
    }
  });

  const deleteCampMutation = useMutation({
    mutationFn: async (id: number) => {
      if(!confirm("Are you sure? This might affect existing bookings.")) return;
      await apiRequest("DELETE", `/api/admin/camps/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/camps"] });
      toast({ title: "Camp Deleted" });
    }
  });

  // --- PUJA MUTATIONS ---
  const savePujaMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingPuja) {
        await apiRequest("PATCH", `/api/admin/puja-services/${editingPuja.id}`, data);
      } else {
        await apiRequest("POST", "/api/admin/puja-services", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/puja-services"] });
      setIsPujaDialogOpen(false);
      setEditingPuja(null);
      toast({ title: "Puja Service Saved" });
    }
  });

  const deletePujaMutation = useMutation({
    mutationFn: async (id: number) => {
      if(!confirm("Are you sure you want to delete this service?")) return;
      await apiRequest("DELETE", `/api/admin/puja-services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/puja-services"] });
      toast({ title: "Puja Service Deleted" });
    }
  });

  if (isLoading) return <div className="flex justify-center pt-32"><Loader2 className="animate-spin" /></div>;

  // Filter Bookings
  const onlineBookings = bookings?.filter(b => b.bookingType === "online_token") || [];
  const inquiryRequests = bookings?.filter(b => b.bookingType === "inquiry_call" || !b.bookingType) || [];

  // Helper Components
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-green-600">Confirmed</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge className="bg-yellow-500 text-black">Pending</Badge>;
    }
  };

  const BookingTable = ({ data, showRefundWarning }: { data: Booking[], showRefundWarning?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest Details</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Financials</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              <div className="font-medium">{booking.guestName}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Phone className="w-3 h-3 mr-1" /> {booking.mobile}
              </div>
            </TableCell>
            <TableCell className="text-sm">
                {format(new Date(booking.checkIn), "MMM dd")} - {format(new Date(booking.checkOut), "MMM dd")}
            </TableCell>
            <TableCell>{booking.guestCount}</TableCell>
            <TableCell>{getStatusBadge(booking.status || "pending")}</TableCell>
            <TableCell>
              <div className="font-bold">Total: ₹{booking.totalAmount}</div>
              {booking.advanceAmount && booking.advanceAmount > 0 ? (
                  <div className="text-xs text-green-600 font-medium">Adv Paid: ₹{booking.advanceAmount}</div>
              ) : (
                  <div className="text-xs text-red-500">No Advance</div>
              )}
            </TableCell>
            <TableCell className="text-right">
              {booking.status === "pending" || (booking.status === "confirmed" && showRefundWarning) ? (
                <div className="flex justify-end gap-2">
                  {booking.status === "pending" && (
                    <Button 
                      size="sm" variant="outline" 
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => confirmMutation.mutate(booking.id)}
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  {booking.status !== "cancelled" && (
                    <Button 
                      size="sm" variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setRejectId(booking.id)}
                      title="Reject/Cancel"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic">Closed</span>
              )}
            </TableCell>
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No records found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  // --- FORMS (Now using ImageUploadField) ---
  const CampForm = ({ defaultValues, onSubmit }: any) => {
    const form = useForm({ defaultValues: defaultValues || { nameEn: "", price: 5000, capacity: "2-3 Persons", descriptionEn: "", imageUrl: "" } });
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name (English)</Label><Input {...form.register("nameEn")} required /></div>
                <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" {...form.register("price", { valueAsNumber: true })} required /></div>
            </div>
            <div className="space-y-2"><Label>Capacity</Label><Input {...form.register("capacity")} required /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea {...form.register("descriptionEn")} required /></div>
            
            {/* UPDATED: Image Upload */}
            <ImageUploadField form={form} name="imageUrl" label="Camp Image" />

            <Button type="submit" className="w-full" disabled={saveCampMutation.isPending}>{saveCampMutation.isPending ? "Saving..." : "Save Camp"}</Button>
        </form>
    );
  };

  const PujaForm = ({ defaultValues, onSubmit }: any) => {
    const form = useForm({ defaultValues: defaultValues || { nameEn: "", price: 1100, descriptionEn: "", imageUrl: "" } });
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name (English)</Label><Input {...form.register("nameEn")} required /></div>
                <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" {...form.register("price", { valueAsNumber: true })} required /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea {...form.register("descriptionEn")} required /></div>
            
            {/* UPDATED: Image Upload */}
            <ImageUploadField form={form} name="imageUrl" label="Puja Image" />

            <Button type="submit" className="w-full" disabled={savePujaMutation.isPending}>{savePujaMutation.isPending ? "Saving..." : "Save Service"}</Button>
        </form>
    );
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <h1 className="text-3xl font-bold font-serif text-primary mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="bookings">Direct Bookings</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="camps">Manage Camps</TabsTrigger>
          <TabsTrigger value="pujas">Manage Pujas</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader><CardTitle>Online Bookings ({onlineBookings.length})</CardTitle><CardDescription>Paid token bookings.</CardDescription></CardHeader>
            <CardContent><BookingTable data={onlineBookings} showRefundWarning={true} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card>
            <CardHeader><CardTitle>Callback Requests ({inquiryRequests.length})</CardTitle><CardDescription>Call to confirm.</CardDescription></CardHeader>
            <CardContent><BookingTable data={inquiryRequests} showRefundWarning={false} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camps">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div><CardTitle>Camps Inventory</CardTitle><CardDescription>Update prices and images.</CardDescription></div>
                <Dialog open={isCampDialogOpen} onOpenChange={setIsCampDialogOpen}>
                    <DialogTrigger asChild><Button onClick={() => setEditingCamp(null)}><Plus className="w-4 h-4 mr-2" /> Add Camp</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>{editingCamp ? "Edit Camp" : "Add New Camp"}</DialogTitle></DialogHeader><CampForm defaultValues={editingCamp} onSubmit={(data: any) => saveCampMutation.mutate(data)} /></DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Name</TableHead><TableHead>Price</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {camps?.map(camp => (
                            <TableRow key={camp.id}>
                                <TableCell><img src={camp.imageUrl} alt="" className="w-12 h-8 object-cover rounded" /></TableCell>
                                <TableCell className="font-medium">{camp.nameEn}</TableCell>
                                <TableCell>₹{camp.price}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button size="sm" variant="outline" onClick={() => { setEditingCamp(camp); setIsCampDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteCampMutation.mutate(camp.id)}><Trash2 className="w-4 h-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pujas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div><CardTitle>Puja Services</CardTitle><CardDescription>Update rituals and images.</CardDescription></div>
                <Dialog open={isPujaDialogOpen} onOpenChange={setIsPujaDialogOpen}>
                    <DialogTrigger asChild><Button onClick={() => setEditingPuja(null)}><Plus className="w-4 h-4 mr-2" /> Add Service</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>{editingPuja ? "Edit Service" : "Add New Service"}</DialogTitle></DialogHeader><PujaForm defaultValues={editingPuja} onSubmit={(data: any) => savePujaMutation.mutate(data)} /></DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Name</TableHead><TableHead>Price</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {pujas?.map(puja => (
                            <TableRow key={puja.id}>
                                <TableCell><img src={puja.imageUrl} alt="" className="w-12 h-8 object-cover rounded" /></TableCell>
                                <TableCell className="font-medium">{puja.nameEn}</TableCell>
                                <TableCell>₹{puja.price}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button size="sm" variant="outline" onClick={() => { setEditingPuja(puja); setIsPujaDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                                    <Button size="sm" variant="destructive" onClick={() => deletePujaMutation.mutate(puja.id)}><Trash2 className="w-4 h-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      <AlertDialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600"><AlertTriangle className="h-5 w-5" /> Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to reject/cancel this booking? <br/>The user will be notified about the refund.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={() => rejectId && rejectMutation.mutate(rejectId)} className="bg-red-600 hover:bg-red-700">Confirm Cancellation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}