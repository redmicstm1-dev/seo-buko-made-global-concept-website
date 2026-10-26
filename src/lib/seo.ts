/** Shared SEO helpers. Set NEXT_PUBLIC_SITE_URL to the final public HTTPS domain. */
export const siteName = "Buko Made Global Concept";
export const siteDescription = "Explore medical equipment and hospital supplies for hospitals, clinics and laboratories. Contact Buko Made Global Concept in Lagos, Nigeria, to request a quotation.";
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return configured.replace(/\/$/, "");
}
export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
