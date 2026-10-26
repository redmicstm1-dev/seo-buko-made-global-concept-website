import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";
export const metadata: Metadata = { title: "Enquiry Cart", robots: { index: false, follow: true }, alternates: { canonical: "/cart" } };
export default function CartRoute(){return <><section className="page-hero"><div className="container"><div className="breadcrumb"><a href="/">Home</a> / Enquiry cart</div><span className="eyebrow">Review your selection</span><h1>Your equipment enquiry, organized.</h1><p>Collect the products you are interested in and send the list to our team. There is no payment step.</p></div></section><CartPage/></>}
