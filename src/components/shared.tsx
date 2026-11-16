import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { products, type Product } from "@/data/products";
import { applications } from "@/data/applications";
import { navigation, site, faqs } from "@/data/site";
import { documents } from "@/data/media";
import { ProductVisual } from "./product-visual";
import { ClosureJourney } from "./closure-journey";
import { ResourceRows } from "./resource-library";
import { BenefitShowcase } from "./benefit-showcase";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function PageHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {label}
        </div>
        <div className="page-hero-layout">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h1>{title}</h1>
          </div>
          <div>
            <p className="lead">{description}</p>
            {children}
          </div>
        </div>
        <span className="page-hero-mark" aria-hidden="true">
          +
        </span>
      </div>
    </section>
  );
}
export function SectionHeading({
  label,
  title,
  description,
  link,
  href,
}: {
  label: string;
  title: string;
  description?: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={20} />
        </Link>
      )}
    </div>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card simple-product-card">
      <div className="simple-card-visual">
        {p.image ? <Image src={p.image} alt={p.imageNote} width={1193} height={595} sizes="(max-width: 639px) 85vw, (max-width: 1023px) 42vw, 28vw" /> : <div className="simple-formulation"><span>{p.category} range</span><strong>{p.label}</strong><small>Formulation overview · pack photo on request</small></div>}
      </div>
      <div className="simple-card-copy">
        <span className="simple-category">{p.category}</span>
        <h3><Link href={`/products/${p.slug}`}>{p.name}</Link></h3>
        <p className="simple-composition">{p.composition}</p>
        <p>{p.description}</p>
        <p className="simple-sizes">Listed sizes: {p.sizes.join(" / ")}</p>
        <div className="simple-card-actions">
          <Link className="text-link" href={`/products/${p.slug}`} aria-label={`View Details: ${p.name}`}>View Details <ArrowUpRight size={16} /></Link>
          <Link className="simple-enquire" href={`/contact?product=${p.slug}#enquiry`} aria-label={`Enquire: ${p.name}`}>Enquire</Link>
        </div>
      </div>
    </article>
  );
}
export function ProductGrid({ items = products }: { items?: Product[] }) {
  return (
    <div className="product-grid simple-product-grid">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
export function ProductArt({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return <ProductVisual product={product} priority={priority} />;
}
export function ApplicationGrid({ limit }: { limit?: number }) {
  return (
    <div className="simple-application-grid">
      {applications.slice(0, limit).map((a) => (
        <Link
          href={`/applications#${a.slug}`}
          className="simple-application-card"
          key={a.slug}
        >
          <div className="simple-application-image"><Image
            src={`/images/applications/${a.image}.webp`}
            alt={a.alt}
            fill
            style={{ objectPosition: a.position }}
            sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 23vw"
          /></div>
          <div className="simple-application-copy">
            <h3>{a.name}</h3>
            <span>View Details <ArrowUpRight size={16} /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function BenefitGrid() {
  return <BenefitShowcase />;
}
export function Process() {
  return <ClosureJourney />;
}
export function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function ResourceCards({ limit }: { limit?: number }) {
  return <ResourceRows items={documents.slice(0, limit)} />;
}
export function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>Contact & enquiry</Eyebrow>
          <h2>Interested in SkinSeal?</h2>
        </div>
        <div className="cta-copy">
          <p>
            Contact our team for product information, availability, and professional enquiries.
          </p>
          <div className="button-row">
            <Link className="button white" href="/contact#enquiry">
              Enquire Now <ArrowUpRight size={20} />
            </Link>
            <Link className="text-link" href="/contact">
              Contact Us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <span className="cta-plus" aria-hidden="true">
          +
        </span>
      </div>
    </section>
  );
}
export function MedicalNotice() {
  return (
    <p className="medical-notice">
      <ShieldCheck size={18} />
      For professional use. Product selection and application must follow the
      specific product’s Instructions for Use. This website is not medical
      advice.
    </p>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-signature">
          <span>SkinSeal / Topical skin adhesives</span>
          <p>
            Just Seal <span>&</span> Heal.
          </p>
          <Link href="/contact" aria-label="Contact SkinSeal">
            <ArrowUpRight size={48} strokeWidth={1} />
          </Link>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="SkinSeal home">
              <Image
                src="/images/brand/skinseal-logo.png"
                alt="SkinSeal"
                width={145}
                height={116}
              />
            </Link>
            <p>
              Advanced topical skin adhesives.
              <br />
              For a considered approach to professional care.
            </p>
            <span>Medical · Dental · Veterinary</span>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/videos">Videos & Demonstrations</Link>
            <Link href="/why-skinseal">Why SkinSeal</Link>
            {navigation
              .filter(([name]) => name !== "Home" && name !== "Products")
              .map(([name, href]) => (
                <Link href={href} key={href}>
                  {name}
                </Link>
              ))}
          </div>
          <div>
            <h3>Product portfolio</h3>
            {products.map((p) => (
              <Link href={`/products/${p.slug}`} key={p.slug}>
                {p.name}
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <h3>Connect with our team</h3>
            <a href={`tel:${site.tel}`}>
              <Phone size={16} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={16} />
              {site.email}
            </a>
            <p>
              <MapPin size={17} />
              <span>
                {site.company}
                <br />
                {site.address}
              </span>
            </p>
          </div>
        </div>
        <MedicalNotice />
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SkinSeal. All rights reserved.</p>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
          <span>India / Professional care</span>
        </div>
      </div>
    </footer>
  );
}
