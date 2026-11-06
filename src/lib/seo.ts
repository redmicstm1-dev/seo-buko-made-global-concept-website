import { Metadata } from "next";

/**
 * Site Identity & Defaults
 */
export const siteName = "Buko Made Global Concept";
export const siteDescription =
  "Explore medical equipment and hospital supplies for hospitals, clinics and laboratories. Contact Buko Made Global Concept in Lagos, Nigeria, to request a quotation.";
export const siteLocale = "en_NG"; // Standardized regional locale for Nigerian market targeted SEO

/**
 * Resolves the base site URL safely across Local, Vercel Preview, and Production environments.
 */
export function getSiteUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  // Ensure protocol prefix is present (Vercel automatic env variables omit https://)
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Strip trailing slashes for path consistency
  return url.replace(/\/$/, "");
}

/**
 * Constructs absolute URLs for dynamic canonicals, OG images, and sitemaps.
 */
export function absoluteUrl(path: string = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${path ? normalizedPath : ""}`;
}

/**
 * Interface for custom page metadata overrides
 */
interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
}

/**
 * Industry-Standard Next.js Metadata Generator
 * Generates unified OpenGraph, Twitter, Canonical, and Indexing metadata.
 */
export function constructMetadata({
  title,
  description = siteDescription,
  image = "/og-image.jpg", // Ensure an OG image exists in your /public directory
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
}: ConstructMetadataParams = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = absoluteUrl(path);

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      locale: siteLocale,
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    icons,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}