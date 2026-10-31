/**
 * TODO(owner): Swiss Cottage and Deluxe Tent still need real photographs.
 * Upload them (Cloudinary is fine) and replace TENT_PHOTO_PLACEHOLDER below.
 * Do not hotlink other websites — the previous exportersindia.com URLs are removed.
 */
export const TENT_PHOTO_PLACEHOLDER = "/placeholders/tent.svg";

/** Gallery for a camp, matched by name so API row order cannot swap the photos. */
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
    return [
      "https://res.cloudinary.com/dh7bx2qib/image/upload/v1765948645/shared_image_2_b3je3d.jpg",
    ];
  }

  if (name.includes("swiss")) {
    return [
      TENT_PHOTO_PLACEHOLDER,
      "https://res.cloudinary.com/dh7bx2qib/video/upload/v1766424600/f6ce-6f5d-4077-a2f5-2858495dec39_o4lrrk.mp4",
    ];
  }

  return [TENT_PHOTO_PLACEHOLDER];
}
