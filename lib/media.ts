export const TENT_PHOTO_PLACEHOLDER = "/placeholders/tent.svg";

export function cloudinaryUrl(url: string) {
  if (!url || !url.includes("res.cloudinary.com/") || !url.includes("/upload/")) return url;
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

/** TODO(owner): replace the placeholder with real Swiss Cottage and Deluxe Tent photos. */
export function mediaForCamp(nameEn: string): string[] {
  const name = nameEn.toLowerCase();
  if (name.includes("deluxe")) {
    return [
      TENT_PHOTO_PLACEHOLDER,
      "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766419870/WhatsApp_Video_2025-12-22_at_8.21.56_PM_mdcgd5.mp4",
      "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766420195/whatsapp-video-2025-12-22-at-82302-pm_1IbTToLs_1_e4cduu.mp4",
    ];
  }
  if (name.includes("dorm")) {
    return ["https://res.cloudinary.com/dh7bx2qib/image/upload/v1765948645/shared_image_2_b3je3d.jpg"];
  }
  if (name.includes("swiss")) {
    return [
      TENT_PHOTO_PLACEHOLDER,
      "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766424600/f6ce-6f5d-4077-a2f5-2858495dec39_o4lrrk.mp4",
    ];
  }
  return [TENT_PHOTO_PLACEHOLDER];
}

export function displayImage(nameEn: string, imageUrl?: string | null) {
  if (imageUrl && !imageUrl.includes("exportersindia.com") && !imageUrl.startsWith("data:")) {
    return cloudinaryUrl(imageUrl);
  }
  return mediaForCamp(nameEn)[0];
}
