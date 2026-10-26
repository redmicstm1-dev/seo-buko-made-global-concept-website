import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Medical Equipment Buying Guides",
  description: "Practical guides to choosing medical equipment and preparing procurement enquiries for hospitals, clinics and diagnostic centres.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link> / Guides</div><span className="eyebrow">Helpful resources</span><h1>Medical equipment buying guides.</h1><p>Use these practical checklists to prepare a more informed equipment enquiry. Confirm clinical and technical requirements with qualified staff and the relevant manufacturer.</p></div></section><section className="section"><div className="container"><div className="product-grid">{guides.map((guide) => <article className="product-card" key={guide.slug}><div className="product-card-body"><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><Link className="text-link" href={`/guides/${guide.slug}`}>Read guide ↗</Link></div></article>)}</div></div></section></>;
}
