import { CTA, PageHero, SectionHeading } from "@/components/shared";
import { VideoGallery } from "@/components/video-gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Clinical Experiences",
  "Request SkinSeal professional demonstrations and learn about responsible sharing of clinical experiences.",
  "/clinical-experiences",
);
export default function Clinical() {
  return (
    <>
      <PageHero
        label="Clinical experiences"
        title="A professional perspective. Shared responsibly."
        description="Clinical experiences need context, accurate product information and appropriate permission. Explore our approach to professional learning."
      />
      <section className="cinema-section clinical-cinema">
        <div className="container">
          <SectionHeading
            label="Demonstrations & learning"
            title="Bring your questions. Start a conversation."
          />
          <VideoGallery />
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="Professional learning"
            title="Make the conversation relevant to your practice."
          />
          <div className="editorial-grid">
            <article>
              <span>01</span>
              <h3>Know the formulation</h3>
              <p>
                Start with the exact SkinSeal product. Explore its formulation,
                listed sizes and dedicated range before discussing its intended
                use.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Ask to see the detail</h3>
              <p>
                Request a professional demonstration for the product relevant to
                your practice. Ask about preparation, handling and
                product-specific precautions.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep the insert close</h3>
              <p>
                The current Instructions for Use are the reference for product
                selection and application. Request the correct document for your
                formulation.
              </p>
            </article>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
