export const TENT_PHOTO_PLACEHOLDER = "/placeholders/tent.svg";

/** Landscape 3:2 frames match the wide stay cards and the Swiss Cottage gallery. Order is exterior first: 2, 1, 3, 5, 4. */
export const swissCottagePhotos = [
  {
    webp: "/media/swiss-cottage-2-3x2.webp",
    jpg: "/media/swiss-cottage-2-3x2.jpg",
    alt: "Row of Swiss Cottage tents at the camp, seen from outside",
  },
  {
    webp: "/media/swiss-cottage-1-3x2.webp",
    jpg: "/media/swiss-cottage-1-3x2.jpg",
    alt: "Walkway leading to the Swiss Cottage tents at night",
  },
  {
    webp: "/media/swiss-cottage-3-3x2.webp",
    jpg: "/media/swiss-cottage-3-3x2.jpg",
    alt: "Double bed with floral blankets inside a Swiss Cottage tent",
  },
  {
    webp: "/media/swiss-cottage-5-3x2.webp",
    jpg: "/media/swiss-cottage-5-3x2.jpg",
    alt: "Swiss Cottage tent with a double bed",
  },
  {
    webp: "/media/swiss-cottage-4-3x2.webp",
    jpg: "/media/swiss-cottage-4-3x2.jpg",
    alt: "Interior of a Swiss Cottage tent with several beds",
  },
] as const;

export const swissCottageMedia = {
  image: swissCottagePhotos[0].webp,
  imageFallback: swissCottagePhotos[0].jpg,
  poster: "/media/swiss-cottage-poster.webp",
  tour: "/media/swiss-cottage-tour.mp4",
  alt: swissCottagePhotos[0].alt,
  photos: swissCottagePhotos,
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

export function campImageFallback(nameEn: string) {
  if (nameEn.toLowerCase().includes("swiss")) return swissCottageMedia.imageFallback;
  return undefined;
}

export function displayImage(nameEn: string, imageUrl?: string | null) {
  const local = mediaForCamp(nameEn)[0];
  if (local !== TENT_PHOTO_PLACEHOLDER) return local;
  if (imageUrl && !imageUrl.includes("exportersindia.com") && !imageUrl.startsWith("data:") && !isVideoUrl(imageUrl)) {
    return cloudinaryUrl(imageUrl);
  }
  return local;
}
