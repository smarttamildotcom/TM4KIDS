import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/membership"] }, sitemap: "https://ip2kids.com/sitemap.xml", host: "https://ip2kids.com" };
}
