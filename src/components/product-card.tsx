import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { AddToCart } from "@/components/add-to-cart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" className="product-image" />
        <span className="image-watermark" aria-hidden="true">BUKO MADE</span>
      </Link>
      <div className="product-card-body">
        <span className="eyebrow">{product.category}</span>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.description}</p>
        <div className="product-card-actions">
          <AddToCart product={product} compact />
          <Link className="text-link" href={`/products/${product.slug}`} aria-label={`View details for ${product.name}`}>Details <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
