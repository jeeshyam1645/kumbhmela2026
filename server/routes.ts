import { Router, type Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, toPublicUser } from "./auth";
import { db } from "./db";
import { 
  users, 
  camps, 
  bookings, 
  pujaServices, 
  insertBookingSchema, 
  updateUserSchema, 
  insertCampSchema, 
  insertPujaSchema 
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      message: "Too many enquiries. Please try WhatsApp or try again later.",
    });
  },
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(10).max(20),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  tentType: z.string().trim().max(80).optional().or(z.literal("")),
  checkIn: z.string().trim().max(20).optional().or(z.literal("")),
  checkOut: z.string().trim().max(20).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(50).optional(),
  company: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

async function turnstileOk(token: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

// Middleware to check if user is Admin
function requireAdmin(req: any, res: any, next: any) {
  const user = req.user as { role?: string } | undefined;
  if (req.isAuthenticated?.() && user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access required" });
}

// Date calculation helper
const calculateNights = (start: string | Date, end: string | Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays > 0 ? diffDays : 1;
};

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // ---------------------------------------------------------
  // PUBLIC ROUTES
  // ---------------------------------------------------------

  app.get("/ping", (req, res) => {
  res.send("Pong");
});

  app.get("/api/camps", async (req, res) => {
    try {
      const allCamps = await db.select().from(camps);
      res.json(allCamps);
    } catch (error) {
      console.error("Error fetching camps:", error);
      res.status(500).json({ message: "Failed to fetch camps" });
    }
  });

  app.get("/api/puja-services", async (req, res) => {
    try {
      const services = await db.select().from(pujaServices);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pujas" });
    }
  });

// ---------------------------------------------------------
// CONTACT ROUTE (Frontend handles Web3Forms)
// ---------------------------------------------------------

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Please check the enquiry details." });
    }

    const data = parsed.data;

    // Honeypot: pretend success so automated posts are not retried.
    if (data.company && data.company.trim()) {
      return res.json({ success: true });
    }

    if (!(await turnstileOk(data.turnstileToken))) {
      return res.status(400).json({ message: "Please complete the spam check and try again." });
    }

    await resend.emails.send({
      from: "Magh Mela <onboarding@resend.dev>", // free tier sender
      to: ["maghmelastays@gmail.com"],
      subject: `New Inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        `Tent: ${data.tentType || "-"}`,
        `Check-in: ${data.checkIn || "-"}`,
        `Check-out: ${data.checkOut || "-"}`,
        `Guests: ${data.guests ?? "-"}`,
        "",
        "Message:",
        data.message || "-",
      ].join("\n"),
    });

    console.log("Enquiry email sent");
    res.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ message: "Failed to send inquiry" });
  }
});

  // ---------------------------------------------------------
  // USER ROUTES
  // ---------------------------------------------------------

  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Please login to book" });
    }

    try {
      const data = insertBookingSchema.parse(req.body);
      
      const campResult = await db.select().from(camps).where(eq(camps.id, data.campId)).limit(1);
      const camp = campResult[0];

      if (!camp) return res.status(404).json({ message: "Camp not found" });

      const nights = calculateNights(data.checkIn, data.checkOut);
      const totalAmount = camp.price * data.guestCount * nights;
      
      let advanceAmount = 0;
      let status = "pending";
      let paymentStatus = "unpaid";

      if (data.bookingType === "online_token") {
        advanceAmount = Math.round(totalAmount * 0.10); 
        status = "confirmed"; 
        paymentStatus = "partial";
      }

      const userId = (req.user as any).id;

      // 1. SAVE TO DATABASE
      const newBooking = await db.insert(bookings).values({
        ...data,
        userId: userId, 
        totalAmount: totalAmount,
        advanceAmount: advanceAmount,
        status: status, 
        paymentStatus: paymentStatus,
        bookingType: data.bookingType || "inquiry_call"
      }).returning();

      // 2. SEND RESPONSE IMMEDIATELY
      res.status(201).json(newBooking[0]);

    } catch (error) {
      console.error("Booking Error:", error);
      if (!res.headersSent) {
        res.status(400).json({ message: "Invalid booking data" });
      }
    }
  });

  app.get("/api/my-bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Not logged in");
    
    const userId = (req.user as any).id;

    const myBookings = await db.select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
      
    res.json(myBookings);
  });

  // PATCH: Cancel Booking (User)
  app.patch("/api/bookings/:id/cancel", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Not logged in");
    
    const bookingId = parseInt(req.params.id);
    const userId = (req.user as any).id;

    if (isNaN(bookingId)) return res.status(400).send("Invalid ID");

    const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    
    if (!booking) return res.status(404).send("Booking not found");
    if (booking.userId !== userId) return res.status(403).send("Unauthorized");

    if (booking.status === "confirmed") {
        return res.status(400).json({ message: "Confirmed bookings cannot be cancelled directly. Please contact support." });
    }

    await db.update(bookings)
      .set({ status: "cancelled" })
      .where(eq(bookings.id, bookingId));
      
    res.json({ success: true, message: "Booking Cancelled" });
  });

  // PATCH: User Profile
  app.patch("/api/user", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Not logged in");

    try {
      const data = updateUserSchema.parse(req.body);
      const userId = (req.user as any).id;

      const [updatedUser] = await db
        .update(users)
        .set(data)
        .where(eq(users.id, userId))
        .returning();

      res.json(toPublicUser(updatedUser));
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Every handler on this router is behind requireAdmin.
  const admin = Router();
  admin.use(requireAdmin);

  admin.get("/bookings", async (_req, res) => {
    try {
      const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
      res.json(allBookings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  admin.patch("/bookings/:id/confirm", async (req, res) => {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) return res.status(400).send("Invalid ID");

    await db.update(bookings)
      .set({ status: "confirmed", paymentStatus: "paid" })
      .where(eq(bookings.id, bookingId));
      
    res.json({ success: true, message: "Booking Confirmed" });
  });

  admin.patch("/bookings/:id/reject", async (req, res) => {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) return res.status(400).send("Invalid ID");

    await db.update(bookings)
      .set({ status: "cancelled" })
      .where(eq(bookings.id, bookingId));
      
    res.json({ success: true, message: "Booking Rejected" });
  });

  admin.post("/camps", async (req, res) => {
    try {
      const data = insertCampSchema.parse(req.body);
      const newCamp = await db.insert(camps).values(data).returning();
      res.status(201).json(newCamp[0]);
    } catch (e) { res.status(400).json({ message: "Invalid Data" }) }
  });

  admin.patch("/camps/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertCampSchema.partial().parse(req.body);
    await db.update(camps).set(data).where(eq(camps.id, id));
    res.json({ success: true });
  });

  admin.delete("/camps/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.delete(camps).where(eq(camps.id, id));
    res.json({ success: true });
  });

  admin.post("/puja-services", async (req, res) => {
    try {
      const data = insertPujaSchema.parse(req.body);
      const newPuja = await db.insert(pujaServices).values(data).returning();
      res.status(201).json(newPuja[0]);
    } catch (e) { res.status(400).json({ message: "Invalid Data" }) }
  });

  admin.patch("/puja-services/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertPujaSchema.partial().parse(req.body);
    await db.update(pujaServices).set(data).where(eq(pujaServices.id, id));
    res.json({ success: true });
  });

  admin.delete("/puja-services/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.delete(pujaServices).where(eq(pujaServices.id, id));
    res.json({ success: true });
  });

  app.use("/api/admin", admin);

  const httpServer = createServer(app);
  return httpServer;
}