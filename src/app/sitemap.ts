import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ip2kids.com";
  const routes = ["", "/about", "/books", "/contact", "/parents-educators", "/privacy-policy", ...Array.from({ length: 15 }, (_, i) => `/worlds/${i + 1}`)];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route.startsWith("/worlds/") ? 0.8 : 0.7 }));
}
