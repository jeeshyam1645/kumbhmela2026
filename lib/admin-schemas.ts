import { z } from "zod";

export const campBody = z.object({
  nameEn: z.string().trim().min(2).max(120),
  nameHi: z.string().trim().max(120).optional().or(z.literal("")),
  descriptionEn: z.string().trim().min(2).max(2000),
  descriptionHi: z.string().trim().max(2000).optional().or(z.literal("")),
  price: z.coerce.number().int().min(0),
  capacity: z.string().trim().min(1).max(80),
  features: z.array(z.string().max(80)).max(20).optional(),
  imageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  totalInventory: z.coerce.number().int().min(0).max(500).optional(),
});

export const pujaBody = z.object({
  nameEn: z.string().trim().min(2).max(120),
  nameHi: z.string().trim().max(120).optional().or(z.literal("")),
  descriptionEn: z.string().trim().min(2).max(2000),
  descriptionHi: z.string().trim().max(2000).optional().or(z.literal("")),
  price: z.coerce.number().int().min(0).optional(),
  imageUrl: z.string().trim().max(500).optional().or(z.literal("")),
});
