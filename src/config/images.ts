/** Hosts next/image may optimize. Add a host here before using its photos. */
export const IMAGE_HOSTS = ["res.cloudinary.com", "images.unsplash.com", "img1.exportersindia.com"];

/** True when next/image can optimize this URL; otherwise render it unoptimized. */
export function isOptimizableImage(src: string) {
  try {
    const url = new URL(src);
    return url.protocol === "https:" && IMAGE_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}
