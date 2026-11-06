import type { MetadataRoute } from "next";
import { products, categories } from "@/data/products";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/seo";

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
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 6. Dynamic Guide / Blog Pages
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: guide.updatedAt ? new Date(guide.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...coreStaticRoutes,
    ...secondaryStaticRoutes,
    ...utilityRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...guideRoutes,
  ];
}