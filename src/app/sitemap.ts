import type { MetadataRoute } from "next";
import { products, categories } from "@/data/products";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/seo";

// Safe helper to extract and validate date strings/objects across varied data items
function getValidDate(dateValue: unknown, fallback: Date): Date {
  if (!dateValue) return fallback;
  const parsed = new Date(dateValue as string | number | Date);
  return isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Core / High-Priority Static Pages
  const coreStaticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/categories",
    "/request-quote",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.9,
  }));

  // 2. Secondary Static Pages
  const secondaryStaticRoutes: MetadataRoute.Sitemap = [
    "/about",
    "/contact",
    "/guides",
    "/faq",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 3. Low-Priority Utility / Legal Pages
  const utilityRoutes: MetadataRoute.Sitemap = [
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  // 4. Dynamic Category Pages
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => {
    const slug = category.toLowerCase().replaceAll(" ", "-");
    return {
      url: absoluteUrl(`/categories/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  // 5. Dynamic Product Detail Pages
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => {
    const item = product as Record<string, unknown>;
    const rawDate = item.updatedAt || item.updated_at || item.createdAt || item.created_at;

    return {
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: getValidDate(rawDate, now),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  // 6. Dynamic Guide / Blog Pages
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => {
    const item = guide as Record<string, unknown>;
    const rawDate = item.updatedAt || item.updated_at || item.createdAt || item.created_at || item.date;

    return {
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: getValidDate(rawDate, now),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [
    ...coreStaticRoutes,
    ...secondaryStaticRoutes,
    ...utilityRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...guideRoutes,
  ];
}