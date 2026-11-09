import {
  BenefitGrid,
  CTA,
  FAQ,
  MedicalNotice,
  PageHero,
  Process,
  SectionHeading,
} from "@/components/shared";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Why SkinSeal",
  "Understand the topical approach, product formulations and professional considerations behind SkinSeal.",
  "/why-skinseal",
);
export default function Why() {
  return (
    <>
      <PageHero
        label="Why SkinSeal"
        title="Designed around the details of care."
        description="Explore the topical approach and the product family, with clinical suitability and the current Instructions for Use guiding every selection."
      />
      <section className="section">
        <div className="container">
          <BenefitGrid />
          <MedicalNotice />
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHeading
            label="The closure journey"
            title="Understand the process."
            description="A high-level overview. Exact preparation, application and aftercare instructions are product-specific."
          />
          <Process />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Professional considerations"
            title="The right product. The appropriate case."
          />
          <div className="editorial-grid">
            <article>
              <span>01</span>
              <h3>Assess the wound</h3>
              <p>
                Clinical assessment establishes whether a superficial topical
                closure is suitable. Do not assume topical adhesive is
                appropriate for infected or high-tension wounds.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Confirm the variant</h3>
              <p>
                Check the formulation and intended use. Medical, dental and
                veterinary variants must be considered according to their own
                product documentation.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Follow the insert</h3>
              <p>
                The product’s current Instructions for Use govern handling,
                precautions and aftercare. Website summaries do not replace that
                documentation.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container faq-grid">
          <div>
            <SectionHeading
              label="Questions about SkinSeal"
              title="Start with clear information."
            />
          </div>
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
