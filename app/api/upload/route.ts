import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Not logged in" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Max 5MB" }, { status: 400 });

  try {
    const url = await uploadToCloudinary(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ message }, { status: 503 });
  }
}
