export const TENT_PHOTO_PLACEHOLDER = "/placeholders/tent.svg";

/** Exterior first, then the three enhanced interiors, then the earlier photos that still show the camp. Photo 2 is omitted: its 3:2 crop does not show the tents. */
export const swissCottagePhotos = [
  {
    webp: "/media/swiss-cottage-exterior.webp",
    jpg: "/media/swiss-cottage-exterior.jpg",
    alt: "White Swiss Cottage tents lining a walkway at the camp",
  },
  {
    webp: "/media/swiss-cottage-interior-1.webp",
    jpg: "/media/swiss-cottage-interior-1.jpg",
    alt: "Double bed inside a Swiss Cottage tent",
  },
  {
    webp: "/media/swiss-cottage-interior-2.webp",
    jpg: "/media/swiss-cottage-interior-2.jpg",
    alt: "Several single beds inside a Swiss Cottage tent",
  },
  {
    webp: "/media/swiss-cottage-interior-3.webp",
    jpg: "/media/swiss-cottage-interior-3.jpg",
    alt: "Double bed in a Swiss Cottage room with blue walls",
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

export const epTentPhotos = {
  sharedExterior: {
    webp: "/media/ep-tent-shared-exterior.webp",
    jpg: "/media/ep-tent-shared-exterior.jpg",
    alt: "Yellow and white EP tent with floor bedding, for a shared stay without beds",
  },
  familyExterior: {
    webp: "/media/ep-tent-family-exterior.webp",
    jpg: "/media/ep-tent-family-exterior.jpg",
    alt: "Colourful decorated EP tent with beds inside, for a family stay",
  },
  dormitory: {
    webp: "/media/ep-tent-dormitory.webp",
    jpg: "/media/ep-tent-dormitory.jpg",
    alt: "Floor bedding in the EP tent, with gadda mattresses, pillows and blankets",
  },
  family: {
    webp: "/media/ep-tent-family.webp",
    jpg: "/media/ep-tent-family.jpg",
    alt: "Takht beds with pillows and blankets inside the EP tent",
  },
} as const;

export function cloudinaryUrl(url: string) {
  if (!url || !url.includes("res.cloudinary.com/") || !url.includes("/upload/")) return url;
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function isEpFamily(name: string) {
  return name.includes("ep tent") && name.includes("family");
}

function isEpShared(name: string) {
  return !isEpFamily(name) && (name.includes("ep tent") || name.includes("dorm"));
}

export function mediaForCamp(nameEn: string): string[] {
  const name = nameEn.toLowerCase();
  if (name.includes("deluxe")) return [deluxeTentMedia.image];
  if (name.includes("swiss")) return [swissCottageMedia.image];
  if (isEpFamily(name)) return [epTentPhotos.familyExterior.webp];
  if (isEpShared(name)) return [epTentPhotos.sharedExterior.webp];
  return [TENT_PHOTO_PLACEHOLDER];
}

export function campAlt(nameEn: string) {
  const name = nameEn.toLowerCase();
  if (name.includes("swiss")) return swissCottageMedia.alt;
  if (name.includes("deluxe")) return deluxeTentMedia.alt;
  if (isEpFamily(name)) return epTentPhotos.familyExterior.alt;
  if (isEpShared(name)) return epTentPhotos.sharedExterior.alt;
  return nameEn;
}

export function campImageFallback(nameEn: string) {
  const name = nameEn.toLowerCase();
  if (name.includes("swiss")) return swissCottageMedia.imageFallback;
  if (isEpFamily(name)) return epTentPhotos.familyExterior.jpg;
  if (isEpShared(name)) return epTentPhotos.sharedExterior.jpg;
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
