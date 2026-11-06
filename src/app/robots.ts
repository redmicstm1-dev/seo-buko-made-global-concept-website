import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",       // Protect backend API routes from search crawlers
          "/admin/",     // Block admin panels (if applicable)
          "/checkout/",  // Block private session/cart flows
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}