import type { MetadataRoute } from "next";
import { allTours } from "@/lib/data/tours";

const base = "https://howladartravels.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/packages", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const tourPages = allTours.map((t) => ({
    url: `${base}/packages/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...tourPages];
}
