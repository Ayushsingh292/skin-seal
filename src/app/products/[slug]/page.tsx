import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, FileText, ShieldCheck } from "lucide-react";
import { findProduct, products } from "@/data/products";
import {
  CTA,
  Eyebrow,
  MedicalNotice,
  ProductGrid,
  ProductArt,
  SectionHeading,
} from "@/components/shared";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = findProduct(slug);
  return p
    ? pageMetadata(
        p.name,
        `${p.composition}. ${p.description}`,
        `/products/${slug}`,
      )
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) notFound();
  return (
    <>
      <section className="product-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            {p.name}
          </div>
          <div className="detail-grid">
            <div className="detail-visual">
              <ProductArt product={p} priority />
            </div>
            <div className="detail-copy">
              <Eyebrow>{p.label}</Eyebrow>
              <h1>{p.name}</h1>
              <p className="detail-composition">{p.composition}</p>
              <p>{p.description}</p>
              <div className="size-options">
                <span>Listed sizes</span>
                {p.sizes.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="small-copy muted">
                Confirm current availability and the applicable product insert
                with our team.
              </p>
              <Link href={`/contact?product=${p.slug}`} className="button">
                Enquire About{" "}
                {p.category === "Dental"
                  ? "Dental Range"
                  : p.name.replace(" Range", "")}{" "}
                <ArrowUpRight size={18} />
              </Link>
              <p className="detail-professional">
                <ShieldCheck size={16} />
                For {p.category === "Veterinary"
                  ? "veterinary"
                  : "healthcare"}{" "}
                professional use.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container product-info-grid">
          <div>
            <Eyebrow>Product perspective</Eyebrow>
            <h2>
              Understand the formulation.
              <br />
              Choose with confidence.
            </h2>
            <p className="content-paragraph">
              Every clinical setting is different. Selection of {p.name} should
              be based on professional assessment and the exact product’s
              approved indications, precautions and Instructions for Use.
            </p>
            <h3>Intended areas of practice</h3>
            <ul className="check-list">
              {p.applications.map((a) => (
                <li key={a}>
                  <Check size={17} />
                  {a}
                </li>
              ))}
            </ul>
            <h3>Before selecting a product</h3>
            <p className="content-paragraph">
              Review the variant, pack label, intended use, contraindications,
              storage requirements and aftercare guidance. Do not assume the
              instructions for one SkinSeal formulation apply to every other
              variant.
            </p>
          </div>
          <aside className="product-facts">
            <h3>At a glance</h3>
            <dl>
              <dt>Product family</dt>
              <dd>{p.name}</dd>
              <dt>Composition / variants</dt>
              <dd>{p.composition}</dd>
              <dt>Listed pack sizes</dt>
              <dd>{p.sizes.join(" · ")}</dd>
              <dt>Practice</dt>
              <dd>{p.category}</dd>
              <dt>Information source</dt>
              <dd>Official SkinSeal range and supplied product materials</dd>
            </dl>
            <Link
              className="text-link"
              href={`/contact?product=${p.slug}&resource=insert`}
            >
              <FileText size={18} />
              Request product documentation
            </Link>
          </aside>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="Product gallery"
            title={
              p.slug === "skinseal" || p.category === "Veterinary"
                ? "The details, in view."
                : "A distinct formulation. A clear identity."
            }
            description={
              p.slug === "skinseal" || p.category === "Veterinary"
                ? p.imageNote
                : "A product-specific formulation presentation. Request exact variant photography and documentation from our team."
            }
          />
          <div className="packaging-gallery">
            {p.slug === "skinseal" || p.category === "Veterinary" ? (
              <figure>
                <Image
                  src={p.image!}
                  alt={p.imageNote}
                  width={1193}
                  height={595}
                  sizes="(max-width: 800px) 90vw, 45vw"
                />
                <figcaption>
                  {p.category === "Veterinary"
                    ? "SkinSeal Vet — front of pack"
                    : "SkinSeal — family packaging reference"}
                </figcaption>
              </figure>
            ) : (
              <div className="formulation-gallery-note">
                <span>SKINSEAL / FORMULATION PROFILE</span>
                <h3>{p.name}</h3>
                <p>{p.composition}</p>
                <div>{p.sizes.join(" · ")}</div>
                <Link className="text-link" href={`/contact?product=${p.slug}`}>
                  Request exact product information <ArrowUpRight size={19} />
                </Link>
              </div>
            )}
            {p.slug === "skinseal" && (
              <figure>
                <Image
                  src="/images/products/skinseal-back.webp"
                  alt="Original SkinSeal reverse packaging with product information"
                  width={1244}
                  height={555}
                  sizes="(max-width: 800px) 90vw, 45vw"
                />
                <figcaption>
                  SkinSeal — reverse of supplied pack artwork
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container support-grid">
          <div>
            <Eyebrow>Professional learning</Eyebrow>
            <h2>Get the right information.</h2>
            <p>
              Request current product documentation and ask about demonstration
              materials for {p.name}. Our team can help identify the relevant
              information for your enquiry.
            </p>
            <Link
              className="text-link"
              href={`/contact?product=${p.slug}&type=demonstration`}
            >
              Request a demonstration <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="info-panel">
            <h3>Documentation & related videos</h3>
            <p>
              No variant-specific video or document is currently approved for
              public download. Please request the latest materials from our
              team.
            </p>
            <Link
              href={`/contact?product=${p.slug}`}
              className="button outline"
            >
              Ask the SkinSeal Team <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container">
          <SectionHeading
            label="Explore the portfolio"
            title="Other SkinSeal solutions."
            href="/products"
            link="All products"
          />
          <ProductGrid
            items={products.filter((x) => x.slug !== slug).slice(0, 3)}
          />
          <MedicalNotice />
        </div>
      </section>
      <CTA />
    </>
  );
}
