import { CTA, PageHero, ResourceCards } from "@/components/shared";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Resource Centre",
  "Request current SkinSeal product catalogues, Instructions for Use and professional product information.",
  "/resources",
);
export default function Resources() {
  return (
    <>
      <PageHero
        label="Resource centre"
        title="Better information. Informed decisions."
        description="Find the documentation you need for your product enquiry. Request the latest applicable version directly from the SkinSeal team."
      />
      <section className="section">
        <div className="container">
          <div className="resource-notice">
            <strong>Current documents, directly from our team.</strong>
            <p>
              Source documents are being reviewed for current information and
              consistency. Public downloads will be available once approved.
              Until then, request the exact document you need.
            </p>
          </div>
          <ResourceCards />
          <p className="section-note">
            Listed file sizes refer to the supplied source files. Resource
            availability does not replace professional assessment or the
            Instructions for Use provided with your product.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
