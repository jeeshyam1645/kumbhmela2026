import { createHash } from "crypto";

export async function uploadToCloudinary(file: File) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret) {
    throw new Error("Cloudinary is not configured");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = createHash("sha1").update(`timestamp=${timestamp}${secret}`).digest("hex");
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body,
  });
  const json = (await response.json()) as { secure_url?: string; error?: { message?: string } };
  if (!response.ok || !json.secure_url) {
    throw new Error(json.error?.message || "Upload failed");
  }
  return json.secure_url;
}
