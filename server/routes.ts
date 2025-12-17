import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
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
import nodemailer from "nodemailer";

// Middleware to check if user is Admin
function requireAdmin(req: any, res: any, next: any) {
  const user = req.user as any;
  if (req.isAuthenticated() && user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
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
  // NEW CONTACT ROUTE (Email Only - No Database Record)
  // ---------------------------------------------------------
  app.post("/api/contact", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Please login to send a message" });
    }

    try {
      const { name, mobile, message } = req.body;

      // 1. Configure Transporter
const transporter = nodemailer.createTransport({
        service: "gmail", // <--- USE THIS SHORTCUT
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        // Only keep these network-level fixes
        family: 4, 
        logger: true,
        debug: true
      });

      // 2. Email Content
      const mailOptions = {
        from: `"Magh Mela Website" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Send to Admin
        subject: `📩 New General Inquiry: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #2563eb;">New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile:</strong> <a href="tel:${mobile}">${mobile}</a></p>
            <hr />
            <p><strong>Message:</strong><br/>${message || "No message provided"}</p>
          </div>
        `,
      };

      // 3. Fire and Forget Email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("❌ Contact Email Failed:", err.message);
        else console.log("✅ Contact Email Sent:", info.response);
      });

      // 4. Respond Immediately
      res.json({ success: true, message: "Inquiry received" });

    } catch (error) {
      console.error("Contact API Error:", error);
      res.status(500).json({ message: "Failed to process inquiry" });
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

      // 3. SEND EMAIL NOTIFICATION (Background)
const transporter = nodemailer.createTransport({
        service: "gmail", // <--- USE THIS SHORTCUT
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        // Only keep these network-level fixes
        family: 4, 
        logger: true,
        debug: true
      });

      const mailOptions = {
        from: `"Magh Mela Bot" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, 
        subject: `🔔 New Booking Inquiry: ${data.guestName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #d97706;">New Inquiry Received</h2>
            <p><strong>Name:</strong> ${data.guestName}</p>
            <p><strong>Mobile:</strong> <a href="tel:${data.mobile}">${data.mobile}</a></p>
            <p><strong>Camp:</strong> ${camp.nameEn}</p>
            <p><strong>Guests:</strong> ${data.guestCount}</p>
            <p><strong>Dates:</strong> ${data.checkIn} to ${data.checkOut}</p>
            <p><strong>Total Estimate:</strong> ₹${totalAmount}</p>
            <hr />
            <p><strong>Message/Special Needs:</strong><br/>${data.specialNeeds || "None"}</p>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("❌ Email Failed:", err.message);
        else console.log("✅ Email Sent:", info.response);
      });

    } catch (error) {
      console.error("Booking Error:", error);
      if (!res.headersSent) {
        res.status(400).json({ message: "Invalid booking data" });
      }
    }
  });

  app.get("/api/my-bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Not logged in from routes.ts booking");
    
    const userId = (req.user as any).id;

    const myBookings = await db.select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));
      
    res.json(myBookings);
  });

  // PATCH: Cancel Booking (User)
  app.patch("/api/bookings/:id/cancel", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Not logged in from bookings cancel. ");
    
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

      res.json(updatedUser);
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // ---------------------------------------------------------
  // ADMIN ROUTES (Admin Only)
  // ---------------------------------------------------------

  app.get("/api/admin/bookings", requireAdmin, async (req, res) => {
    try {
      const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
      res.json(allBookings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch("/api/admin/bookings/:id/confirm", requireAdmin, async (req, res) => {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) return res.status(400).send("Invalid ID");

    await db.update(bookings)
      .set({ status: "confirmed", paymentStatus: "paid" })
      .where(eq(bookings.id, bookingId));
      
    res.json({ success: true, message: "Booking Confirmed" });
  });

  app.patch("/api/admin/bookings/:id/reject", requireAdmin, async (req, res) => {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) return res.status(400).send("Invalid ID");

    await db.update(bookings)
      .set({ status: "cancelled" })
      .where(eq(bookings.id, bookingId));
      
    res.json({ success: true, message: "Booking Rejected" });
  });

  // --- ADMIN CAMP MANAGEMENT ---

  app.post("/api/admin/camps", requireAdmin, async (req, res) => {
    try {
      const data = insertCampSchema.parse(req.body);
      const newCamp = await db.insert(camps).values(data).returning();
      res.status(201).json(newCamp[0]);
    } catch (e) { res.status(400).json({ message: "Invalid Data" }) }
  });

  app.patch("/api/admin/camps/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertCampSchema.partial().parse(req.body);
    await db.update(camps).set(data).where(eq(camps.id, id));
    res.json({ success: true });
  });

  app.delete("/api/admin/camps/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    await db.delete(camps).where(eq(camps.id, id));
    res.json({ success: true });
  });

  // --- ADMIN PUJA MANAGEMENT ---

  app.post("/api/admin/puja-services", requireAdmin, async (req, res) => {
    try {
      const data = insertPujaSchema.parse(req.body);
      const newPuja = await db.insert(pujaServices).values(data).returning();
      res.status(201).json(newPuja[0]);
    } catch (e) { res.status(400).json({ message: "Invalid Data" }) }
  });

  app.patch("/api/admin/puja-services/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = insertPujaSchema.partial().parse(req.body);
    await db.update(pujaServices).set(data).where(eq(pujaServices.id, id));
    res.json({ success: true });
  });

  app.delete("/api/admin/puja-services/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    await db.delete(pujaServices).where(eq(pujaServices.id, id));
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}