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
      <section className="section">
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
            label="Our content standard"
            title="Trust starts with how we share."
          />
          <div className="editorial-grid">
            <article>
              <span>01</span>
              <h3>Permission first</h3>
              <p>
                Identifiable professionals, patients and clinical footage are
                published only after documented authorization.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Accurate context</h3>
              <p>
                Content should identify the product and distinguish professional
                experience from general product education.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>No invented endorsements</h3>
              <p>
                We do not create clinician names, quotations, hospital
                affiliations or clinical results to fill a gallery.
              </p>
            </article>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
