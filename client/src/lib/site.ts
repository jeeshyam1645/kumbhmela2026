export const SITE_URL = "https://maghmelastays.in";
export const SITE_NAME = "Magh Mela Stays";
export const PHONE_E164 = "+919936399677";
export const PHONE_DISPLAY = "+91 99363 99677";
export const WHATSAPP_NUMBER = "919936399677";
export const CONTACT_EMAIL = "maghmelastays@gmail.com";

/**
 * TODO(owner): paste the real camp-tour YouTube id (the part after `v=`).
 * Leave this empty until then. Do not use a placeholder video.
 */
export const CAMP_TOUR_YOUTUBE_ID = "";

/** Published nightly rates. Keep in step with the camps in the admin panel. */
export const TENT_OFFERS = [
  {
    name: "Swiss Cottage",
    price: 5000,
    description: "Premium tent with an attached bathroom for 2–3 guests.",
  },
  {
    name: "Deluxe Tent",
    price: 3000,
    description: "Twin-bed tent with a shared bathroom for 2 guests.",
  },
  {
    name: "Dormitory",
    price: 999,
    description: "Shared dormitory stay for groups and solo pilgrims.",
  },
] as const;

export const OG_IMAGE_PATH = "/og-image.png";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
