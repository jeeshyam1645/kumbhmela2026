/** Insert Cloudinary's automatic format and quality transforms. */
export function cloudinaryUrl(url: string) {
  if (!url || !url.includes("res.cloudinary.com/") || !url.includes("/upload/")) {
    return url;
  }
  if (/\/upload\/(?:[^/]+\/)*f_auto/.test(url) || url.includes("/upload/f_auto")) {
    return url;
  }
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function isVideoUrl(url: string) {
  return Boolean(url && /\.(mp4|webm|ogg)(\?|$)/i.test(url));
}
