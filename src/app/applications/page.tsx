import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { applications } from "@/data/applications";
import { CTA, Eyebrow, MedicalNotice, PageHero } from "@/components/shared";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Clinical Applications",
  "Explore areas of clinical practice and dedicated dental and veterinary SkinSeal ranges.",
  "/applications",
);
export default function Applications() {
  return (
    <>
      <PageHero
        label="Clinical applications"
        title="Care takes many forms."
        description="Explore professional practice settings. Suitability depends on the specific product, the wound, the anatomical site and the treating professional’s assessment."
      />
      <section className="section">
        <div className="container">
          <div className="application-jump">
            {applications.map((a) => (
              <a href={`#${a.slug}`} key={a.slug}>
                {a.name}
              </a>
            ))}
          </div>
          <div className="application-details">
            {applications.map((a, i) => (
              <article id={a.slug} key={a.slug}>
                <div className="application-detail-image">
                  <Image
                    src={`/images/applications/${a.image}.webp`}
                    alt={a.alt}
                    fill
                    sizes="(max-width:800px) 90vw,40vw"
                  />
                </div>
                <div>
                  <Eyebrow>Application area 0{i + 1}</Eyebrow>
                  <h2>{a.name}</h2>
                  <p>{a.description}</p>
                  <p className="small-copy">
                    This overview does not establish an indication for every
                    formulation. Obtain the relevant product documentation and
                    assess suitability before use.
                  </p>
                  <Link
                    className="text-link"
                    href={`/contact?product=${a.slug === "veterinary" ? "skinseal-veterinary" : a.slug === "dental" ? "skinseal-dental" : "general"}`}
                  >
                    Discuss this application <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="section-note">
            All photographs are representative stock images of healthcare
            settings. They do not depict SkinSeal use, results, customers or
            endorsements.
          </p>
          <MedicalNotice />
        </div>
      </section>
      <CTA />
    </>
  );
}
