import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA, Eyebrow, PageHero, SectionHeading } from "@/components/shared";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About SkinSeal",
  "Meet SkinSeal, a topical skin adhesive range marketed in India by Asepsis Marketing.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHero
        label="About SkinSeal"
        title="Thoughtful technology. A human purpose."
        description="A professional approach to topical skin closure, with product information and clinical judgement at its centre."
      />
      <section className="section">
        <div className="container intro-grid">
          <div className="intro-photo">
            <Image
              src="/images/applications/surgical.webp"
              alt="Representative photograph of a surgical care environment"
              fill
              sizes="(max-width:800px) 90vw,45vw"
            />
          </div>
          <div className="intro-copy">
            <Eyebrow>Our brand</Eyebrow>
            <h2>
              Skin closure.
              <br />
              Considered differently.
            </h2>
            <p className="lead">Just Seal & Heal.</p>
            <p>
              SkinSeal is a range of cyanoacrylate-based topical adhesives
              marketed in India by Asepsis Marketing. The portfolio includes
              butyl and octyl formulations, nano silver variants, and dedicated
              dental and veterinary ranges.
            </p>
            <p>
              The original SkinSeal product is supplied as a sterile, single-use
              topical adhesive. Its product insert describes external
              application over appropriately approximated skin edges.
            </p>
            <p>
              Our website helps professionals explore the range and connect with
              the team for current, variant-specific documentation.
            </p>
            <Link className="text-link" href="/products">
              Explore our product families <ArrowUpRight size={18} />
            </Link>
            <small className="photo-credit">
              Representative stock image. No product use or endorsement implied.
            </small>
          </div>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="What guides this website"
            title="Clarity is part of care."
          />
          <div className="editorial-grid">
            <article>
              <span>01</span>
              <h3>Product clarity</h3>
              <p>
                Formulations and sizes are clearly identified. Product selection
                should always refer to the specific variant’s documentation.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Professional judgement</h3>
              <p>
                Wound suitability and treatment choices belong with the
                qualified treating professional.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Responsible communication</h3>
              <p>
                No invented clinical outcomes, endorsements or testimonials.
                Clinical media is shared only after appropriate review and
                permission.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container support-grid">
          <div>
            <Eyebrow>Our team in India</Eyebrow>
            <h2>
              A direct connection.
              <br />
              An informed conversation.
            </h2>
            <p>
              For product information, professional enquiries or distribution
              discussions, contact {site.company}.
            </p>
          </div>
          <div className="info-panel">
            <h3>{site.company}</h3>
            <p>{site.address}</p>
            <a href={`tel:${site.tel}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/contact" className="text-link">
              Contact the team <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
