"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";

type AddToCartProps = { product: Product; compact?: boolean };

export function AddToCart({ product, compact = false }: AddToCartProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className={`button button-primary add-to-cart-button${compact ? " add-to-cart-compact" : ""}`} onClick={handleAdd} aria-label={`Add ${product.name} to enquiry cart`}>
      {added ? <Check size={compact ? 15 : 18} /> : <ShoppingBag size={compact ? 15 : 18} />}
      <span>{added ? (compact ? "Added" : "Added to enquiry cart") : (compact ? "Add to cart" : "Add to enquiry cart")}</span>
    </button>
  );
}
