"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

type CartItem = { product: Product; quantity: number };
type CartContextValue = { items: CartItem[]; addItem: (product: Product, quantity?: number) => void; updateQuantity: (slug: string, quantity: number) => void; removeItem: (slug: string) => void; clearCart: () => void };
const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "buko-made-enquiry-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setItems(JSON.parse(saved) as CartItem[]); } catch { localStorage.removeItem(STORAGE_KEY); } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items, ready]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (product, quantity = 1) => setItems((current) => { const found = current.find((item) => item.product.slug === product.slug); return found ? current.map((item) => item.product.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { product, quantity }]; }),
    updateQuantity: (slug, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.product.slug !== slug) : current.map((item) => item.product.slug === slug ? { ...item, quantity: Math.min(99, quantity) } : item)),
    removeItem: (slug) => setItems((current) => current.filter((item) => item.product.slug !== slug)),
    clearCart: () => setItems([]),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }
