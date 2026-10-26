"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product-card";
export function ProductCatalogue() {
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("All categories");
 const filtered=useMemo(()=>products.filter((p)=>(category==="All categories"||p.category===category)&&`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())),[query,category]);
 return <><div className="catalogue-toolbar"><label className="search-input" style={{display:"flex",alignItems:"center",gap:9}}><Search size={18}/><input aria-label="Search products" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search equipment…" style={{border:0,outline:0,width:"100%",background:"transparent"}}/></label><select className="filter-select" aria-label="Filter by category" value={category} onChange={(e)=>setCategory(e.target.value)}><option>All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div><p className="form-note" aria-live="polite">Showing {filtered.length} {filtered.length===1?"product":"products"}. All products are quotation-based.</p><div className="product-grid">{filtered.map((product)=><ProductCard key={product.id} product={product}/>)}</div>{filtered.length===0&&<div className="empty-state"><h2>No matching products found</h2><p>Try a different search term or select another category.</p></div>}</>;
}
