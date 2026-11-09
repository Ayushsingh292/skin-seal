import { CTA, MedicalNotice, PageHero } from "@/components/shared";
import { ProductFilter } from "@/components/product-filter";
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
        title="A range shaped around your practice."
        description="Explore topical adhesive formulations and dedicated product families. Find product information, available sizes and a direct connection to our team."
      />
      <section className="section">
        <div className="container">
          <ProductFilter />
          <MedicalNotice />
        </div>
      </section>
      <CTA />
    </>
  );
}
