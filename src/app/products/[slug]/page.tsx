import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { findProduct, products } from "@/data/products";
import { Eyebrow, MedicalNotice, ProductArt, SectionHeading } from "@/components/shared";
import { VideoGallery } from "@/components/video-gallery";
import { ResourceRows } from "@/components/resource-library";
import { documents, publishedVideos } from "@/data/media";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  return product ? pageMetadata(product.name, `${product.composition}. ${product.description}`, `/products/${slug}`) : {};
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) notFound();
  const original = p.slug === "skinseal";
  return <>
    <section className="product-detail-hero">
      <div className="container">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span>{p.name}</div>
        <div className="detail-grid">
          <div className="detail-visual"><ProductArt product={p} priority /></div>
          <div className="detail-copy">
            <Eyebrow>{p.category} range</Eyebrow>
            <h1>{p.name}</h1>
            <p className="detail-composition">{p.composition}</p>
            <p>{p.description}</p>
            <div className="size-options"><span>Listed sizes</span>{p.sizes.map(size => <span key={size}>{size}</span>)}</div>
            <p className="small-copy muted">Confirm current availability and the exact variant’s Instructions for Use with our team.</p>
            <Link className="button" href={`/contact?product=${p.slug}#enquiry`}>Enquire About {p.name} <ArrowUpRight size={18} /></Link>
            <Link className="text-link" href="/products#compare">Compare Formulations <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container simple-detail-info">
        <div>
          <h2>Product Information</h2>
          <ul className="check-list">
            <li><Check size={17} />{p.composition}</li>
            <li><Check size={17} />{original ? "Sterile, single-use topical adhesive with a dedicated applicator." : `${p.category} product family. Request the exact variant’s current insert for features and precautions.`}</li>
            <li><Check size={17} />Available in listed sizes: {p.sizes.join(" / ")}</li>
          </ul>
          {original && <details className="simple-pack-details"><summary>View reverse packaging</summary><Image src="/images/products/skinseal-back.webp" alt="Reverse of the supplied original SkinSeal packaging" width={1244} height={555} sizes="(max-width: 767px) 90vw, 45vw" /></details>}
        </div>
        <div>
          <h2>Relevant Applications</h2>
          <ul className="check-list">{p.applications.map(application => <li key={application}><Check size={17} />{application}</li>)}</ul>
          <Link className="text-link" href={`/applications${p.category === "Dental" ? "#dental" : p.category === "Veterinary" ? "#veterinary" : "#surgical"}`}>Explore Applications <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
    {publishedVideos.some(v => v.product === p.slug) && <section className="section product-films"><div className="container"><VideoGallery product={p.slug} /></div></section>}
    <section className="section soft-bg">
      <div className="container">
        <SectionHeading label="Product support" title="Documentation & Demonstrations" description={original ? "Company-supplied references for the original SkinSeal product. Confirm the current revision before use." : "Request documentation for this exact variant. Original SkinSeal instructions must not be assumed to apply to every product."} />
        {original && <ResourceRows items={documents.filter(d => ["catalogue", "insert", "application"].includes(d.id))} />}
        <div className="button-row simple-detail-actions">
          <Link className="button" href={`/contact?product=${p.slug}&resource=insert#enquiry`}>Request Product Documentation <ArrowUpRight size={17} /></Link>
          <Link className="text-link" href={`/contact?product=${p.slug}&type=demonstration#enquiry`}>Request a Demonstration <ArrowUpRight size={17} /></Link>
          {original && <Link className="text-link" href="/resources">All Resources <ArrowUpRight size={17} /></Link>}
        </div>
        <MedicalNotice />
      </div>
    </section>
  </>;
}
