import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { mainNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...mainNav.map((l) => l.href), "/snap"];
  return paths.map((href) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    lastModified: now,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
