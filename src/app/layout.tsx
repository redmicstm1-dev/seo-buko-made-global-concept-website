import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { getSiteUrl, siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "Medical Equipment Supplier in Lagos, Nigeria | Buko Made", template: "%s | Buko Made Global Concept" },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "en_NG", siteName, title: "Medical Equipment Supplier in Lagos, Nigeria | Buko Made", description: siteDescription, url: "/", images: [{ url: "/images/brand/buko-made-logo.png", alt: "Buko Made Global Concept logo" }] },
  twitter: { card: "summary_large_image", title: "Medical Equipment Supplier in Lagos, Nigeria | Buko Made", description: siteDescription, images: ["/images/brand/buko-made-logo.png"] },
  icons: { icon: [{ url: "/icon.png", type: "image/png" }, { url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }], shortcut: "/favicon.ico", apple: "/favicon.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/images/brand/buko-made-logo.png`,
    email: "chibukoakwuobu@gmail.com",
    telephone: "+2348140212430",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 5 Alagbeji Street Off Isala Eko Idumota",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG"
    },
    description: siteDescription
  };
  return <html lang="en-NG"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} /><CartProvider><SiteHeader/><main>{children}</main><SiteFooter/></CartProvider></body></html>;
}
