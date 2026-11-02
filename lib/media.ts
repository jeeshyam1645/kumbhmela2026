export const TENT_PHOTO_PLACEHOLDER = "/placeholders/tent.svg";

export const swissCottageMedia = {
  image: "/media/swiss-cottage.webp",
  poster: "/media/swiss-cottage-poster.webp",
  tour: "/media/swiss-cottage-tour.mp4",
  alt: "Colourful patterned Swiss Cottage tent at the Magh Mela camp near Sangam, Prayagraj",
};

export const deluxeTentMedia = {
  image: "/media/deluxe-tent.webp",
  alt: "Patterned canvas tents in the camp at the 2019 Prayagraj Kumbh Mela",
};

export const dormitoryMedia = {
  image: "/media/dormitory.webp",
  alt: "Simpler cloth tents in the pilgrims' camp at the 2019 Prayagraj Kumbh Mela",
};

export function cloudinaryUrl(url: string) {
  if (!url || !url.includes("res.cloudinary.com/") || !url.includes("/upload/")) return url;
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export function mediaForCamp(nameEn: string): string[] {
  const name = nameEn.toLowerCase();
  if (name.includes("deluxe")) return [deluxeTentMedia.image];
  if (name.includes("dorm")) return [dormitoryMedia.image];
  if (name.includes("swiss")) return [swissCottageMedia.image];
  return [TENT_PHOTO_PLACEHOLDER];
}

export function campAlt(nameEn: string) {
  const name = nameEn.toLowerCase();
  if (name.includes("swiss")) return swissCottageMedia.alt;
  if (name.includes("deluxe")) return deluxeTentMedia.alt;
  if (name.includes("dorm")) return dormitoryMedia.alt;
  return nameEn;
}

export function displayImage(nameEn: string, imageUrl?: string | null) {
  const local = mediaForCamp(nameEn)[0];
  if (local !== TENT_PHOTO_PLACEHOLDER) return local;
  if (imageUrl && !imageUrl.includes("exportersindia.com") && !imageUrl.startsWith("data:") && !isVideoUrl(imageUrl)) {
    return cloudinaryUrl(imageUrl);
  }
  return local;
}
