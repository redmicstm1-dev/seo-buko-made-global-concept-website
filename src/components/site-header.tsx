"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const links = [{ href: "/products", label: "Products" }, { href: "/categories", label: "Categories" }, { href: "/guides", label: "Buying Guides" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Buko Made home">
          <Image src="/images/brand/buko-made-logo.png" alt="Buko Made Global Concept logo" width={64} height={64} priority className="brand-logo" />
          <span className="brand-name">BUKO MADE <small>GLOBAL CONCEPT</small></span>
        </Link>
        <nav className={`desktop-nav ${menuOpen ? "mobile-nav-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
          <Link className="nav-cta" href="/request-quote" onClick={() => setMenuOpen(false)}>Request a quote <span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="header-actions">
          <Link href="/cart" className="icon-link cart-icon-link" aria-label={`Open enquiry cart${cartCount ? `, ${cartCount} ${cartCount === 1 ? "item" : "items"}` : ""}`}><span className="cart-icon-wrap"><ShoppingBag size={21} />{cartCount > 0 && <span className="cart-count" aria-live="polite">{cartCount > 99 ? "99+" : cartCount}</span>}</span><span className="cart-label">Enquiry cart</span></Link>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
