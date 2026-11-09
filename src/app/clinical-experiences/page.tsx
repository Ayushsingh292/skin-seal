import { CTA, PageHero, SectionHeading } from "@/components/shared";
import { VideoGallery } from "@/components/video-gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Clinical Experiences",
  "Explore SkinSeal product videos and the veterinary range with professional product information.",
  "/clinical-experiences",
);
export default function Clinical() {
  return (
    <>
      <PageHero
        label="Clinical experiences"
        title="The range in motion. The story behind it."
        description="Explore SkinSeal through our product videos, discover the veterinary range and find information relevant to your practice."
      />
      <section className="cinema-section clinical-cinema">
        <div className="container">
          <SectionHeading
            label="Product videos & professional learning"
            title="SkinSeal on screen."
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
