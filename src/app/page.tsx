import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown, ShieldCheck } from "lucide-react";
import {
  ApplicationGrid,
  BenefitGrid,
  CTA,
  Eyebrow,
  FAQ,
  Process,
  ResourceCards,
  SectionHeading,
} from "@/components/shared";
import { ProductCatalogue } from "@/components/product-catalogue";
import { VideoGallery } from "@/components/video-gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Advanced Skin Closure. Simplified.",
  "Explore the SkinSeal range of topical skin adhesives for appropriately selected superficial wound and surgical incision closure.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>SkinSeal / Topical skin adhesives</Eyebrow>
            <h1>
              Advanced
              <br />
              Skin Closure.
              <br />
              <span>Simplified.</span>
            </h1>
            <p className="hero-tagline">Just Seal & Heal.</p>
            <p className="hero-description">
              Explore the SkinSeal range of topical skin adhesives developed for
              appropriately selected superficial wound and surgical incision
              closure.
            </p>
            <div className="button-row">
              <Link href="/products" className="button bright">
                Explore Products <ArrowUpRight size={19} />
              </Link>
              <Link href="/contact" className="button outline-light">
                Enquire Now <ArrowRight size={19} />
              </Link>
            </div>
            <p className="hero-footnote">
              <ShieldCheck size={16} />
              For healthcare professionals. Guided by clinical judgement.
            </p>
          </div>
          <div className="hero-stage hero-showcase">
            <span className="showcase-wordmark" aria-hidden="true">
              SkinSeal
            </span>
            <Image
              className="hero-pack"
              src="/images/products/skinseal.webp"
              alt="Original SkinSeal N-Butyl-2-Cyanoacrylate 0.25 mL carton"
              width={1193}
              height={595}
              sizes="(max-width:760px) 88vw, 44vw"
              preload
            />
            <div className="stage-applicator">
              <Image
                src="/images/products/original-applicator.webp"
                alt="Authentic original SkinSeal applicator from the supplied product catalogue"
                width={2419}
                height={451}
                sizes="(max-width:760px) 85vw, 42vw"
              />
            </div>
            <div className="showcase-caption">
              <div>
                <strong>The original SkinSeal.</strong>
                <span>Topical skin adhesive</span>
              </div>
              <span>0.25 mL pack shown</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <a href="#introduction">
            <ArrowDown size={18} />
            Discover the SkinSeal approach
          </a>
          <span>
            Medical <i /> Dental <i /> Veterinary
          </span>
          <span>Made for professional practice.</span>
        </div>
      </section>
      <section id="introduction" className="section brand-story">
        <div className="container">
          <div className="story-heading">
            <Eyebrow>01 / A considered approach</Eyebrow>
            <h2>
              Skin closure is a detail.
              <br />
              <span>Care is the bigger picture.</span>
            </h2>
          </div>
          <div className="story-composition">
            <div className="story-manifesto">
              <span className="story-cross" aria-hidden="true">
                +
              </span>
              <p className="lead">
                A small application.
                <br />A clear purpose.
              </p>
              <p>
                SkinSeal brings together cyanoacrylate-based topical adhesives
                for professional practice. Applied externally in suitable cases,
                the adhesive forms a polymer film over approximated skin edges.
              </p>
              <p>
                From the original formulation to dedicated dental and veterinary
                ranges, product selection begins with the needs of your
                practice.
              </p>
              <Link className="text-link" href="/about">
                The story behind SkinSeal <ArrowUpRight size={20} />
              </Link>
              <span className="story-company">
                Marketed in India by Asepsis Marketing
              </span>
            </div>
            <div className="story-image">
              <Image
                src="/images/applications/surgical.webp"
                alt="Representative photograph of a surgical professional at work"
                fill
                sizes="(max-width:760px) 90vw,55vw"
              />
              <div className="story-image-caption">
                <span>
                  Professional care.
                  <br />
                  An informed approach.
                </span>
                <span>Representative photography</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section portfolio-section" id="portfolio">
        <div className="container">
          <SectionHeading
            label="02 / The product portfolio"
            title="The right formulation. A considered choice."
            description="Four medical formulations. Dedicated dental and veterinary ranges. Explore the details that make each family distinct."
            href="/products"
            link="View the full catalogue"
          />
          <ProductCatalogue />
          <p className="section-note">
            Confirm current availability and consult the exact variant’s
            Instructions for Use. Formulation presentations are not packaging
            illustrations.
          </p>
        </div>
      </section>
      <section className="section principle-section">
        <div className="container principle-layout">
          <div className="principle-heading">
            <Eyebrow>03 / Why SkinSeal</Eyebrow>
            <h2>
              Designed around
              <br />
              the way <br />
              <em>professionals care.</em>
            </h2>
            <p>
              Practical considerations. Clear product information. Clinical
              judgement at the centre.
            </p>
            <Link className="text-link" href="/why-skinseal">
              Explore the SkinSeal approach <ArrowUpRight size={19} />
            </Link>
          </div>
          <BenefitGrid />
        </div>
      </section>
      <section className="section applications-section">
        <div className="container">
          <SectionHeading
            label="04 / Areas of practice"
            title="Different disciplines. A shared attention to care."
            description="Explore clinical settings and dedicated product ranges. Suitability is always product- and case-specific."
            href="/applications"
            link="Explore applications"
          />
          <ApplicationGrid />
          <p className="section-note">
            Representative stock photographs. No SkinSeal treatment, outcome or
            endorsement is depicted.
          </p>
        </div>
      </section>
      <section className="cinema-section">
        <div className="container">
          <div className="cinema-heading">
            <Eyebrow>05 / SkinSeal in focus</Eyebrow>
            <span>Product knowledge / Professional learning</span>
          </div>
          <VideoGallery />
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHeading
            label="06 / The closure journey"
            title="From preparation to aftercare."
            description="Five stages to understand the topical approach. Explore each stage for a high-level professional overview."
          />
          <Process />
          <p className="section-note">
            This overview does not replace the product’s Instructions for Use.
            Timing, indications, preparation and aftercare are product-specific.
          </p>
        </div>
      </section>
      <section className="section resource-section">
        <div className="container resource-editorial">
          <div className="resource-intro">
            <Eyebrow>07 / The knowledge library</Eyebrow>
            <h2>
              Informed choices
              <br />
              start with
              <br />
              <span>clear information.</span>
            </h2>
            <p>
              Find product catalogues, application guides and Instructions for
              Use. View and download the company-supplied collection.
            </p>
            <Link className="text-link" href="/resources">
              Visit the resource library <ArrowUpRight size={20} />
            </Link>
          </div>
          <ResourceCards limit={3} />
        </div>
      </section>
      <section className="section">
        <div className="container faq-grid">
          <div>
            <Eyebrow>08 / A little more clarity</Eyebrow>
            <h2>
              Good questions.
              <br />
              Considered answers.
            </h2>
            <p>
              Looking for product-specific information?
              <br />
              Let’s start a conversation.
            </p>
            <Link className="text-link" href="/contact">
              Talk to the SkinSeal team <ArrowUpRight size={19} />
            </Link>
          </div>
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
