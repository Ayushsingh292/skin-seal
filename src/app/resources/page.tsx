import Link from "next/link";
import { CTA, PageHero } from "@/components/shared";
import { ResourceLibrary } from "@/components/resource-library";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
export const metadata = pageMetadata(
  "Resource Centre",
  "Browse and download SkinSeal company-supplied catalogues, product information, guides and the product insert.",
  "/resources",
);
export default function Resources() {
  return (
    <>
      <PageHero
        label="Resource centre"
        title="Product Brochures & Instructions"
        description="Explore the company-supplied SkinSeal document collection. View a brochure, download the product insert, or find background for your next product enquiry."
      ><Link className="text-link" href="/videos">Videos & Demonstrations <ArrowUpRight size={17} /></Link></PageHero>
      <section className="section">
        <div className="container">
          <article className="catalogue-feature">
            <a
              className="catalogue-cover"
              href="/documents/skinseal-catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View SkinSeal product catalogue"
            >
              <Image
                src="/images/media/catalogue-cover.webp"
                alt="Cover of the supplied SkinSeal product catalogue, showing original packaging and applicator"
                width={622}
                height={877}
                sizes="(max-width:760px) 210px, 300px"
              />
            </a>
            <div>
              <p className="eyebrow">Featured resource / 6 pages</p>
              <h2>SkinSeal Product Catalogue</h2>
              <p>
                The original company catalogue brings product artwork and
                product information together in one downloadable reference.
              </p>
              <div className="resource-actions">
                <a
                  className="button primary"
                  href="/documents/skinseal-catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View catalogue PDF <ArrowUpRight size={17} />
                </a>
                <a
                  className="text-link"
                  href="/documents/skinseal-catalogue.pdf"
                  download
                >
                  Download catalogue <Download size={17} />
                </a>
              </div>
            </div>
          </article>
          <div className="resource-notice">
            <strong>
              Company-supplied documents, available to view and download.
            </strong>
            <p>
              These materials are published with the owner’s approval. Confirm
              the current revision and applicability with the SkinSeal team. For
              treatment decisions, use the Instructions for Use supplied with
              the exact product; marketing guides do not replace them.
            </p>
          </div>
          <ResourceLibrary />
          <div className="info-panel simple-document-request">
            <h2>Need a Product Datasheet?</h2>
            <p>Ask our team for current datasheets and variant-specific instructions, including dental and veterinary documentation.</p>
            <Link className="text-link" href="/contact?type=documentation#enquiry">Request Document <ArrowUpRight size={17} /></Link>
          </div>
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
