import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { absoluteUrl, siteName } from "@/lib/seo";

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` }, openGraph: { type: "article", title: guide.title, description: guide.description, url: `/guides/${guide.slug}`, siteName } } : { robots: { index: false, follow: true } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`), author: { "@type": "Organization", name: siteName }, publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/buko-made-logo.png") } } };
  const related = guides.filter((item) => guide.relatedSlugs.includes(item.slug));
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} /><section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / {guide.title}</div><span className="eyebrow">Medical equipment buying guide</span><h1>{guide.title}</h1><p>{guide.description}</p></div></section><article className="section"><div className="container prose-page"><p>{guide.intro}</p>{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<p>Need to discuss a product requirement? Browse the <Link href="/products">medical equipment catalogue</Link> or <Link href="/request-quote">request a quotation</Link> from Buko Made Global Concept.</p><h2>Related guides</h2><ul>{related.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>)}</ul></div></article></>;
}
