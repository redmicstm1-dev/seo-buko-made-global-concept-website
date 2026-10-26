import Link from "next/link";
export default function NotFound(){return <section className="section"><div className="container empty-state"><span className="eyebrow">404 · Page not found</span><h1>This page is not in the catalogue.</h1><p>The link may have changed or the page may no longer be available.</p><Link href="/" className="button button-primary">Return home</Link></div></section>}
