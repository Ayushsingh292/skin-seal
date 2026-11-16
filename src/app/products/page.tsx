import Link from "next/link";
import { CTA, MedicalNotice, PageHero, ProductGrid } from "@/components/shared";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Product Range",
  "Explore the SkinSeal, Plus, Adv, Adv Plus, Dental and Veterinary product families.",
  "/products",
);
export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Our products"
        title="Explore Our Products"
        description="Compare six product families, formulations and listed sizes. Select a product for details or contact our team for current availability."
      ><a className="text-link" href="#compare">Compare Formulations ↓</a></PageHero>
      <section className="section">
        <div className="container">
          <ProductGrid />
          <div className="simple-comparison" id="compare">
            <h2>Compare Formulations</h2>
            <p>Listed in the company product materials. Confirm the exact variant and current availability with our team.</p>
            <div className="simple-table-scroll" role="region" aria-label="Product comparison, scroll horizontally on smaller screens" tabIndex={0}>
              <table aria-label="Compare SkinSeal products">
                <thead><tr><th scope="col">Product family</th><th scope="col">Formulation / category</th><th scope="col">Listed sizes</th><th scope="col">Enquiry</th></tr></thead>
                <tbody>{products.map(p => <tr key={p.slug}><th scope="row"><Link href={`/products/${p.slug}`}>{p.name}</Link></th><td>{p.composition}</td><td>{p.sizes.join(" / ")}</td><td><Link className="text-link" href={`/contact?product=${p.slug}#enquiry`} aria-label={`Request information: ${p.name}`}>Request information</Link></td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <MedicalNotice />
        </div>
      </section>
      <CTA />
    </>
  );
}
