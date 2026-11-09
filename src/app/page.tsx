import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Droplet,
  PackageCheck,
  MoveDown,
} from "lucide-react";
import {
  ApplicationGrid,
  BenefitGrid,
  CTA,
  Eyebrow,
  FAQ,
  Process,
  ProductGrid,
  ResourceCards,
  SectionHeading,
} from "@/components/shared";
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
            <Eyebrow>Precision in closure. Confidence in care.</Eyebrow>
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
              <Link href="/products" className="button">
                Explore Products <ArrowUpRight size={18} />
              </Link>
              <Link href="/contact" className="button outline">
                Enquire Now <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-footnote">
              <ShieldCheck size={17} />
              <span>Designed for healthcare professionals</span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-orbit orbit-one" />
            <span className="hero-orbit orbit-two" />
            <div className="visual-caption">
              <span className="live-dot" /> THE SKINSEAL ADVANTAGE
            </div>
            <div className="floating-label">
              <span className="icon-box">
                <Droplet size={20} />
              </span>
              <span>
                Topical skin adhesive
                <strong>Precision. In every application.</strong>
              </span>
            </div>
            <div className="hero-product">
              <Image
                src="/images/products/skinseal.webp"
                alt="Authentic SkinSeal N-Butyl-2-Cyanoacrylate 0.25 mL product packaging"
                width={1193}
                height={595}
                sizes="(max-width: 800px) 95vw, 50vw"
                preload
              />
            </div>
            <div className="hero-product-caption">
              <span>SKINSEAL</span>
              <span>N-Butyl-2-Cyanoacrylate</span>
            </div>
            <div className="visual-bottom">
              <span className="visual-cross">+</span>
              <p>
                Thoughtful technology.
                <br />
                <strong>A simpler approach to skin closure.</strong>
              </p>
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>
        <div className="hero-scroll container">
          <span>THE SCIENCE OF A SIMPLER CLOSURE</span>
          <a href="#introduction" aria-label="Discover SkinSeal">
            <MoveDown size={18} />
          </a>
          <span>01 — DISCOVER SKINSEAL</span>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container">
          <span>
            <ShieldCheck />
            Professional use
          </span>
          <span>
            <Droplet />
            Topical application
          </span>
          <span>
            <PackageCheck />
            Sterile & single-use*
          </span>
          <span>
            <span className="mini-cross">+</span>Multiple formulations
          </span>
        </div>
      </div>
      <section className="section" id="introduction">
        <div className="container intro-grid">
          <div className="intro-photo">
            <Image
              src="/images/applications/surgical.webp"
              alt="Representative photograph of healthcare professionals in an operating theatre"
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
            />
            <div className="photo-caption">
              <span className="caption-line" />
              Built around the needs of modern care.
            </div>
          </div>
          <div className="intro-copy">
            <Eyebrow>Meet SkinSeal</Eyebrow>
            <h2>
              Small application.
              <br />
              <span className="text-teal">Meaningful purpose.</span>
            </h2>
            <p className="lead">
              A considered approach to topical skin closure.
            </p>
            <p>
              SkinSeal brings together a range of cyanoacrylate-based topical
              skin adhesives for professional practice. Applied externally in
              appropriately selected cases, the adhesive forms a polymer film
              over approximated skin edges.
            </p>
            <p>
              Marketed in India by Asepsis Marketing, the range includes
              medical, dental and veterinary product families—so the
              conversation starts with the needs of your practice.
            </p>
            <Link className="text-link" href="/about">
              Get to know SkinSeal <ArrowUpRight size={18} />
            </Link>
            <small className="photo-credit">
              Representative stock photography. No SkinSeal use or endorsement
              implied.
            </small>
          </div>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="Our product portfolio"
            title="One family. Purposeful possibilities."
            description="Explore formulations and dedicated ranges for professional care."
            href="/products"
            link="Discover the range"
          />
          <ProductGrid />
          <p className="section-note">
            Product selection is subject to the exact variant’s Instructions for
            Use. Confirm current sizes and availability with our team.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="Why SkinSeal"
            title="Considered details. Practical design."
            description="A topical approach, with the professional in mind."
            href="/why-skinseal"
            link="Explore the approach"
          />
          <BenefitGrid />
          <p className="section-note">
            *Sterility and single-use information refer to the SkinSeal source
            product insert. Check the packaging of each variant.
          </p>
        </div>
      </section>
      <section className="section applications-section">
        <div className="container">
          <SectionHeading
            label="Clinical applications"
            title="Different settings. The same care."
            description="Explore areas of professional practice where an appropriately selected formulation may be considered."
            href="/applications"
            link="View all applications"
          />
          <ApplicationGrid limit={6} />
          <div className="application-bottom">
            <p>
              Representative stock photographs, not SkinSeal procedures or
              clinical outcomes.
            </p>
            <Link href="/applications#veterinary" className="text-link">
              Explore veterinary applications <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="In focus"
            title="A closer look at SkinSeal."
            description="Product demonstrations and professional learning, guided by the right information."
          />
          <VideoGallery />
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHeading
            label="The closure journey"
            title="Five stages. One considered process."
            description="An overview for professional awareness—not a substitute for the product’s Instructions for Use."
          />
          <Process />
          <p className="section-note">
            Timing, preparation, indications and aftercare vary by product.
            Always consult the current product insert.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container experiences-teaser">
          <div>
            <Eyebrow>Clinical experiences</Eyebrow>
            <h2>
              Real experiences.
              <br />
              Responsible sharing.
            </h2>
            <p>
              We believe clinical stories should be shared with permission and
              context. Ask our team about available professional experience
              materials.
            </p>
            <Link className="text-link" href="/clinical-experiences">
              Explore clinical learning <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="experience-quote">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <h3>
              Good information is
              <br />
              part of good care.
            </h3>
            <p>
              Verified content. Appropriate consent.
              <br />A professional perspective.
            </p>
            <span className="brand-statement">THE SKINSEAL APPROACH</span>
          </div>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="The resource centre"
            title="Information for informed decisions."
            description="Request the latest product documentation directly from our team."
            href="/resources"
            link="Explore resources"
          />
          <ResourceCards limit={3} />
        </div>
      </section>
      <section className="section">
        <div className="container faq-grid">
          <div>
            <Eyebrow>A little more clarity</Eyebrow>
            <h2>
              Your questions.
              <br />
              Considered answers.
            </h2>
            <p>
              Need something more specific?
              <br />
              Our team is here to help.
            </p>
            <Link className="text-link" href="/contact">
              Talk to us <ArrowUpRight size={18} />
            </Link>
          </div>
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
