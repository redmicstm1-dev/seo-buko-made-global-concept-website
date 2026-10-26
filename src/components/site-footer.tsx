import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><span className="footer-kicker">BUKO MADE GLOBAL CONCEPT</span><h2>Medical equipment sourcing, made clearer.</h2><p>Explore our catalogue and send your equipment requirements directly to our team for a quotation.</p></div>
        <div><h3>Explore</h3><Link href="/products">All products</Link><Link href="/categories">Categories</Link><Link href="/guides">Buying guides</Link><Link href="/about">About us</Link><Link href="/faq">FAQs</Link></div>
        <div><h3>Get in touch</h3><a href="https://wa.me/2348140212430" target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp: +234 814 021 2430</a><a href="mailto:chibukoakwuobu@gmail.com"><Mail size={16}/> chibukoakwuobu@gmail.com</a><p className="footer-address"><MapPin size={16}/> No. 5 Alagbeji Street, Off Isala Eko, Idumota, Lagos State, Nigeria</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Buko Made Global Concept</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </footer>
  );
}
