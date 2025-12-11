import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create inquiry endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertInquirySchema.parse(req.body);
      
      // Create inquiry in storage
      const inquiry = await storage.createInquiry(validatedData);
      
      // Log for admin notification (in production, this would send email/WhatsApp)
      console.log("New inquiry received:", {
        id: inquiry.id,
        name: inquiry.name,
        mobile: `${inquiry.countryCode}${inquiry.mobile}`,
        checkIn: inquiry.checkIn,
        checkOut: inquiry.checkOut,
        persons: inquiry.persons,
        campPreference: inquiry.campPreference,
        specialNeeds: inquiry.specialNeeds,
        pujaRequest: inquiry.pujaRequest,
        createdAt: inquiry.createdAt,
      });
      
      res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: {
          id: inquiry.id,
          name: inquiry.name,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        });
      } else {
        console.error("Error creating inquiry:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Get all inquiries (for admin - in production would be protected)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  return httpServer;
}
