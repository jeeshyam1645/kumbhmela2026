import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-02");
  return ["/", "/about-us", "/accommodation", "/accommodation/swiss-cottage", "/accommodation/ep-tent", "/puja-services", "/kumbh-guide", "/contact", "/privacy", "/terms", "/credits"].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/accommodation" ? 0.9 : 0.6,
  }));
}
