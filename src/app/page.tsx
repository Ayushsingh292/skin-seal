import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Droplets, ShieldCheck, PackageCheck, Layers, Crosshair, Sparkles } from "lucide-react";
import { ApplicationGrid, CTA, Eyebrow, ProductGrid, SectionHeading } from "@/components/shared";
import { VideoGallery } from "@/components/video-gallery";
import { benefits } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Advanced Skin Closure. Simplified.", "SkinSeal offers a range of topical skin adhesives for selected superficial wounds and surgical skin closure.", "/");
const icons = [Droplets, Sparkles, ShieldCheck, PackageCheck, Crosshair, Layers];

export default function Home() {
  return <>
    <section className="simple-hero">
      <div className="container simple-hero-grid">
        <div>
          <Eyebrow>Topical skin adhesives</Eyebrow>
          <h1>Advanced Skin Closure. <span>Simplified.</span></h1>
          <p className="simple-hero-description">SkinSeal offers a range of topical skin adhesives for selected superficial wounds and surgical skin closure.</p>
          <p className="simple-tagline">Just Seal &amp; Heal.</p>
          <div className="button-row">
            <Link href="/products" className="button bright">Explore Products <ArrowUpRight size={18} /></Link>
            <Link href="/contact#enquiry" className="button outline-light">Enquire Now</Link>
          </div>
          <p className="simple-audience">For medical, dental &amp; veterinary professionals.</p>
        </div>
        <figure className="simple-hero-visual">
          <Image src="/images/products/skinseal.webp" alt="Authentic SkinSeal N-Butyl-2-Cyanoacrylate 0.25 mL carton" width={1193} height={595} sizes="(max-width: 767px) calc(100vw - 76px), (max-width: 1440px) 42vw, 590px" loading="eager" fetchPriority="high" />
          <Image className="simple-applicator" src="/images/products/original-applicator.webp" alt="Original SkinSeal applicator from the company catalogue" width={2419} height={451} sizes="(max-width: 767px) 75vw, 35vw" />
          <figcaption>Original SkinSeal · 0.25 mL pack shown</figcaption>
        </figure>
      </div>
    </section>
    <section className="section simple-products" id="products">
      <div className="container">
        <SectionHeading label="Our range" title="Our Products" description="Six product families. Find the formulation and size for your practice." href="/products" link="View All Products" />
        <ProductGrid />
      </div>
    </section>
    <section className="section simple-benefits-section">
      <div className="container">
        <SectionHeading label="Product characteristics" title="Why Choose SkinSeal?" description="A topical approach to selected superficial skin closures." />
        <div className="simple-benefits">{benefits.map((benefit, i) => {
          const Icon = icons[i];
          return <article key={benefit.title}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /><h3>{benefit.title}</h3><p>{benefit.text}</p></article>;
        })}</div>
        <p className="section-note">Characteristics refer to the original SkinSeal and listed product families. Follow the Instructions for Use for your exact variant.</p>
      </div>
    </section>
    <section className="section simple-applications">
      <div className="container">
        <SectionHeading label="Areas of practice" title="Clinical Applications" description="Explore clinical settings and dedicated dental and veterinary ranges." href="/applications" link="View All Applications" />
        <ApplicationGrid />
        <p className="section-note">Representative healthcare photography, not SkinSeal treatment results. Suitability requires professional assessment and product-specific instructions.</p>
      </div>
    </section>
    <section className="cinema-section simple-video" id="demonstrations">
      <div className="container">
        <SectionHeading label="Videos & demonstrations" title="See SkinSeal in Action" description="Get to know the product through the company-supplied overview video." href="/videos" link="More Videos & Demonstrations" />
        <VideoGallery product="skinseal" compact />
      </div>
    </section>
    <CTA />
  </>;
}
