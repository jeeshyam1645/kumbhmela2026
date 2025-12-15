// ---------- USERS ----------
export type User = {
  id: number;
  username: string;
  role: "admin" | "user";
  name: string;
  mobile: string | null;
  imageUrl?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  createdAt?: string;
};

// ---------- CAMPS ----------
export type Camp = {
  id: number;
  nameEn: string;
  nameHi?: string | null;
  descriptionEn: string;
  descriptionHi?: string | null;
  price: number;
  capacity: string;
  features?: string[] | null;
  imageUrl?: string | null;
  totalInventory: number;
};

// ---------- PUJA SERVICES ----------
export type PujaService = {
  id: number;
  nameEn: string;
  nameHi?: string | null;
  descriptionEn: string;
  descriptionHi?: string | null;
  price: number;
  imageUrl?: string | null;
};

// ---------- BOOKINGS ----------
export type Booking = {
  id: number;
  userId?: number | null;
  campId: number;

  guestName: string;
  mobile: string;

  checkIn: string;
  checkOut: string;
  guestCount: number;

  totalAmount: number;
  advanceAmount?: number;

  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid";
  bookingType: "online_token" | "inquiry_call" | "admin_manual";

  specialNeeds?: string | null;
  createdAt?: string;
};

// ---------- STATIC BATHING DATES ----------
export type BathingDate = {
  date: string;
  nameEn: string;
  nameHi: string;
  importance: "high" | "highest";
};
