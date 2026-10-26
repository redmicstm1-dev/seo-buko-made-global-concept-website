"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function QuoteForm({ defaultMessage = "", compact = false }: { defaultMessage?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { items, clearCart } = useCart();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === "replace_with_your_access_key") { setStatus("error"); return; }
    const cartSummary = items.map(({ product, quantity }) => `${product.name} — Quantity: ${quantity}`).join("\n");
    data.set("access_key", accessKey);
    data.set("subject", "Buko Made website enquiry");
    data.set("order_items", cartSummary || "No cart items attached");
    data.set("from_name", "Buko Made Website");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      setStatus("success"); form.reset(); clearCart();
    } catch { setStatus("error"); }
  }
  return <form className={`quote-form ${compact ? "quote-form-compact" : ""}`} onSubmit={handleSubmit}>
    <div className="form-row"><label>Full name<input name="name" autoComplete="name" required placeholder="Your full name"/></label><label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@company.com"/></label></div>
    <div className="form-row"><label>Phone number<input name="phone" autoComplete="tel" required placeholder="Your contact number"/></label><label>Organization <span className="optional">(optional)</span><input name="organization" autoComplete="organization" placeholder="Hospital, clinic or company"/></label></div>
    <label>Delivery location<input name="location" placeholder="City or delivery address"/></label>
    <label>How can we help?<textarea name="message" rows={compact ? 3 : 5} required defaultValue={defaultMessage} placeholder="Tell us which equipment you need, quantities, or questions."/></label>
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="botcheck" tabIndex={-1} autoComplete="off"/></label>
    <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending enquiry…" : <><Send size={17}/> Send enquiry</>}</button>
    {status === "success" && <p className="form-success"><CheckCircle2 size={18}/> Your enquiry was submitted. We will review your request.</p>}
    {status === "error" && <p className="form-error"><AlertCircle size={18}/> The enquiry could not be sent. Check the form setup or try WhatsApp instead.</p>}
    <p className="form-note">Your request will be sent to Buko Made Global Concept through the configured Web3Forms service. Please do not include sensitive medical or patient information.</p>
  </form>;
}
