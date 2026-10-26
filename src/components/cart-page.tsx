"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Mail } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { WhatsAppOrder } from "@/components/whatsapp-order";

export function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Your selection</span>
            <h2>Enquiry cart</h2>
            <p>Review your products and quantities, then choose how you would like to contact us. No prices or payment are collected here.</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <h2>Your enquiry cart is empty.</h2>
            <p>Explore the catalogue and add the equipment you would like to ask us about.</p>
            <Link href="/products" className="button button-primary">Explore products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="cart-item-image" aria-label={`View ${product.name}`}>
                    <Image src={product.image} alt={product.name} fill sizes="100px" />
                  </Link>
                  <div className="cart-item-main">
                    <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
                    <p>{product.category}</p>
                    <div className="cart-item-actions">
                      <span className="quantity-label">Quantity</span>
                      <div className="quantity-stepper" aria-label={`Quantity controls for ${product.name}`}>
                        <button
                          type="button"
                          className="quantity-stepper-button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          disabled={quantity <= 1}
                          onClick={() => updateQuantity(product.slug, quantity - 1)}
                        >
                          <Minus size={15} aria-hidden="true" />
                        </button>
                        <output className="quantity-value" aria-live="polite">{quantity}</output>
                        <button
                          type="button"
                          className="quantity-stepper-button"
                          aria-label={`Increase quantity of ${product.name}`}
                          disabled={quantity >= 99}
                          onClick={() => updateQuantity(product.slug, quantity + 1)}
                        >
                          <Plus size={15} aria-hidden="true" />
                        </button>
                      </div>
                      <button type="button" className="remove-button" onClick={() => removeItem(product.slug)}>
                        <Trash2 size={14} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Ready to enquire?</h2>
              <p>Your selection contains {totalItems} item(s) across {items.length} product type(s). We will confirm specifications, availability, quotation and delivery with you directly.</p>
              <WhatsAppOrder />
              <Link href="/request-quote" className="button button-dark"><Mail size={17} aria-hidden="true" /> Send by email</Link>
              <p className="form-note">The email option opens the website enquiry form. Your cart items will be included in the enquiry email after you submit it.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
