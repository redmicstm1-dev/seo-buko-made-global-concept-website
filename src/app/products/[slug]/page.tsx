import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import { AddToCart } from "@/components/add-to-cart";
import { absoluteUrl, siteName } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? {
    title: `${product.name} | Medical Equipment Nigeria`,
    description: `${product.overview} Explore uses, benefits and quotation options from ${siteName} in Lagos, Nigeria.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { type: "website", title: `${product.name} | ${siteName}`, description: product.overview, url: `/products/${product.slug}`, images: [{ url: product.image, alt: product.name }] },
    twitter: { card: "summary_large_image", title: `${product.name} | ${siteName}`, description: product.overview, images: [product.image] },
  } : { robots: { index: false, follow: true } };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const whatsapp = `https://wa.me/2348140212430?text=${encodeURIComponent(`Hello Buko Made Global Concept, I would like to request a quotation for ${product.name}. Please confirm the exact model, specifications, accessories and availability.`)}`;
  const relatedProducts = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.overview,
    image: [absoluteUrl(product.image)],
    category: product.category,
    url: absoluteUrl(`/products/${product.slug}`),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: absoluteUrl(`/products/${product.slug}`) }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.name}</div>
        </div>
      </section>

      <section className="section product-detail-section" style={{ paddingTop: 35 }}>
        <div className="container product-detail-grid">
          <div className="detail-image">
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 90vw, 50vw" priority style={{ objectFit: "contain", padding: 24 }} />
            <span className="image-watermark" aria-hidden="true">BUKO MADE</span>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-intro">{product.overview}</p>
            <div className="detail-info-block">
              <h2>Where it is used</h2>
              <p>{product.usedIn}</p>
            </div>
            <div className="detail-info-block">
              <h2>Key benefits</h2>
              <ul className="detail-benefits">
                {product.benefits.map((benefit) => <li key={benefit}><CheckCircle2 size={17} /><span>{benefit}</span></li>)}
              </ul>
            </div>
            <div className="detail-info-block">
              <h2>Typical use cases</h2>
              <ul className="detail-features">
                {product.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
              </ul>
            </div>
            <div className="detail-info-block">
              <h2>Product details to confirm</h2>
              <p>Medical equipment can vary by manufacturer and model. Before you order, we recommend confirming the exact model, dimensions or capacity, accessories, power or utility requirements where relevant, warranty, service arrangements and intended-use compatibility with our team.</p>
            </div>
            <div className="detail-actions">
              <AddToCart product={product} />
              <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Request on WhatsApp</a>
            </div>
            <p className="form-note">Prices are provided by quotation. No online price is displayed; final model and supply arrangements are confirmed directly with Buko Made Global Concept.</p>
            <Link href="/products" className="text-link detail-back-link"><ArrowLeft size={16} /> Back to catalogue</Link>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">Continue exploring</span><h2>Related catalogue products.</h2></div>
              <Link className="text-link" href="/products">Browse all <ArrowUpRight size={16} /></Link>
            </div>
            <div className="product-grid">
              {relatedProducts.map((related) => (
                <article className="product-card" key={related.id}>
                  <Link href={`/products/${related.slug}`} className="product-image-wrap" aria-label={`View ${related.name}`}>
                    <Image src={related.image} alt={related.name} fill className="product-image" sizes="25vw" />
                    <span className="image-watermark" aria-hidden="true">BUKO MADE</span>
                  </Link>
                  <div className="product-card-body"><h3><Link href={`/products/${related.slug}`}>{related.name}</Link></h3><Link className="text-link" href={`/products/${related.slug}`}>View product <ArrowUpRight size={15} /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
