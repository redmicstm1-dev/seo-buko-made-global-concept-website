"use client";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/components/cart-provider";
export function WhatsAppOrder() {
  const { items } = useCart();
  const message = ["Hello Buko Made Global Concept, I would like to request a quotation for:", "", ...items.map(({ product, quantity }, index) => `${index + 1}. ${product.name} — Quantity: ${quantity}`), "", "Please confirm the available models, specifications, quotation and delivery options."].join("\n");
  const href = `https://wa.me/2348140212430?text=${encodeURIComponent(message)}`;
  return <a className="button button-whatsapp" href={href} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Continue on WhatsApp</a>;
}
