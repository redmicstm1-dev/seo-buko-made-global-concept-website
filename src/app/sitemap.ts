import type { MetadataRoute } from "next";
import { products, categories } from "@/data/products";
import { getSiteUrl } from "@/lib/seo";
import { guides } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const staticPages = ["", "/products", "/categories", "/guides", "/about", "/contact", "/faq", "/request-quote", "/privacy-policy", "/terms"];
  const categoryPages = categories.map((category) => `/categories/${category.toLowerCase().replaceAll(" ", "-")}`);
  const productPages = products.map((product) => `/products/${product.slug}`);
  const guidePages = guides.map((guide) => `/guides/${guide.slug}`);
  return [...staticPages, ...categoryPages, ...productPages, ...guidePages].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path.startsWith("/products/") ? 0.75 : 0.65,
  }));
}
