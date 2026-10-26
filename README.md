# Buko Made Global Concept

A fresh, quote-based medical equipment catalogue built with Next.js App Router, React, TypeScript and Tailwind CSS.

## Requirements
- Node.js 20.9 or newer (use a current supported LTS release)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Web3Forms setup
1. Create an access key at https://web3forms.com/.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to the key.
4. Restart the development server and test a real enquiry.

Web3Forms uses a client-side access key by design. Do not place email passwords or other private credentials in this variable. A successful browser submission is not a guarantee of inbox placement, so verify receipt and spam settings during testing.

## Catalogue and images
- Product information, descriptions, typical use settings, benefits and use cases are maintained in `src/data/products.ts`.
- Product detail pages include an overview, where the equipment is used, benefits, typical use cases and a checklist of model details to confirm. Product guidance is general and does not replace manufacturer documentation or clinical training.
- User-supplied images are stored locally in `public/images/products/`.
- The logo is stored in `public/images/brand/buko-made-logo.png`.
- All products are quotation-only; the site intentionally displays no prices.

Some original image filenames were timestamp-based. Files have been renamed according to the visible subject in the supplied images. Please verify ambiguous equipment identities and specifications before publishing. This starter uses generic copy and does not claim certifications, availability or model-specific performance.

## Watermark
The supplied product images are preserved as source assets. A subtle visual watermark is applied in the website product-image frame so the original files are not destructively altered. This is a presentation overlay, not embedded image metadata.

## Deployment
Push the project to GitHub and import it into Vercel. Add the Web3Forms environment variable in Vercel project settings before testing the production form.


## SEO setup (important before production)
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` and in the Vercel project environment variables to the real, public HTTPS domain, without a trailing slash. Do not leave the example domain in production.
- The project generates `/sitemap.xml` and `/robots.txt` from the static pages, product data, category data and educational buying guides.
- Three initial educational guides are included under `/guides`: choosing an ECG machine, selecting a patient monitor, and a medical equipment procurement checklist. They link readers to the product catalogue and quotation flow. Submit `https://YOUR-REAL-DOMAIN/sitemap.xml` in Google Search Console after deployment.
- Root metadata includes a unique site description, canonical URL, Open Graph/Twitter metadata, and an Organization JSON-LD entity using the business contact details supplied for the project.
- Product pages generate individual titles/descriptions/canonical URLs, Open Graph metadata, Product JSON-LD without invented prices/offers, and BreadcrumbList JSON-LD. Category pages have category-specific metadata and canonical URLs.
- The cart is excluded from crawling in `robots.ts`; keep the quotation/cart workflow available to customers but prioritise catalogue pages for organic discovery.
- Verify the business address and contact details before publishing structured data. Only add Google Business Profile if the business meets Google's in-person customer-contact eligibility rules.
- Register the domain in Google Search Console, verify ownership, submit the sitemap, inspect key URLs, and review indexing and search performance regularly. SEO does not guarantee indexing or ranking.
- Configure Google Analytics 4 only if you choose to use it, and track quotation submissions, WhatsApp clicks and email clicks without sending personal data in analytics events.
- Keep product information accurate. Do not add unverified stock, prices, certifications, review ratings, manufacturer claims or technical specifications to page content or structured data.
