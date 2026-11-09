import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplet,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  Crosshair,
  Layers,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { products, type Product } from "@/data/products";
import { applications } from "@/data/applications";
import { benefits, navigation, site, steps, faqs } from "@/data/site";
import { documents } from "@/data/media";

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
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {children}
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
          {link} <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className={`product-card accent-${p.accent}`}>
      <Link
        href={`/products/${p.slug}`}
        className="product-image"
        aria-label={`Explore ${p.name} — ${p.category}`}
      >
        <span className="product-tag">{p.category}</span>
        <Image
          src={p.image}
          alt={
            p.slug === "skinseal-veterinary"
              ? "SkinSeal Vet 0.50 mL product packaging"
              : "Original SkinSeal 0.25 mL family packaging"
          }
          width={1193}
          height={595}
          sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
        />
      </Link>
      <div className="product-card-content">
        <p className="product-label">{p.label}</p>
        <h3>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="composition">{p.composition}</p>
        <p>{p.description}</p>
        <div className="product-card-bottom">
          <span>{p.sizes.join(" / ")}</span>
          <Link
            href={`/products/${p.slug}`}
            aria-label={`View Details: ${p.name}`}
          >
            View Details <ArrowUpRight size={17} />
          </Link>
        </div>
        {p.slug !== "skinseal" && p.category !== "Veterinary" && (
          <small className="image-note">Family packaging shown</small>
        )}
      </div>
    </article>
  );
}
export function ProductGrid({ items = products }: { items?: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
export function ApplicationGrid({ limit }: { limit?: number }) {
  return (
    <div className="application-grid">
      {applications.slice(0, limit).map((a, i) => (
        <Link
          href={`/applications#${a.slug}`}
          className="application-card"
          key={a.slug}
        >
          <Image
            src={`/images/applications/${a.image}.webp`}
            alt={a.alt}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
          />
          <div className="application-overlay">
            <span className="application-number">0{i + 1}</span>
            <h3>{a.name}</h3>
            <ArrowUpRight size={22} />
          </div>
        </Link>
      ))}
    </div>
  );
}
const icons = [Droplet, Sparkles, ShieldCheck, PackageCheck, Crosshair, Layers];
export function BenefitGrid() {
  return (
    <div className="benefit-grid">
      {benefits.map((b, i) => {
        const Icon = icons[i];
        return (
          <article className="benefit" key={b.title}>
            <span className="icon-box">
              <Icon size={25} strokeWidth={1.5} />
            </span>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </article>
        );
      })}
    </div>
  );
}
export function Process() {
  return (
    <div className="process">
      {steps.map(([title, text], i) => (
        <article key={title}>
          <span className="step-number">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
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
  return (
    <div className="resource-grid">
      {documents.slice(0, limit).map((d) => (
        <article className="resource-card" key={d.id}>
          <div className="document-top">
            <FileText size={32} strokeWidth={1.3} />
            <span>PDF · {d.size}</span>
          </div>
          <p className="product-label">{d.category}</p>
          <h3>{d.title}</h3>
          <p>{d.product} product information</p>
          {d.status === "approved" && d.href ? (
            <div className="resource-actions">
              <a href={d.href} target="_blank" rel="noopener noreferrer">
                View PDF <ArrowUpRight size={16} />
              </a>
              <a href={d.href} download>
                Download <Download size={16} />
              </a>
            </div>
          ) : (
            <Link className="text-link" href={`/contact?resource=${d.id}`}>
              Request current document <ArrowUpRight size={16} />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>Let’s move care forward</Eyebrow>
          <h2>
            Discover the right SkinSeal
            <br className="desktop-break" /> solution for your practice.
          </h2>
          <p>Connect with our team for product information and availability.</p>
        </div>
        <div className="cta-buttons">
          <Link className="button white" href="/contact">
            Contact Us <ArrowUpRight size={18} />
          </Link>
          <Link className="button outline-light" href="/products">
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>
        <span className="cta-orbit" aria-hidden="true" />
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
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="SkinSeal home">
              <Image
                src="/images/brand/skinseal-logo.png"
                alt="SkinSeal"
                width={145}
                height={78}
              />
            </Link>
            <p>
              Advanced topical skin adhesives.
              <br />
              Thoughtfully developed for professional care.
            </p>
            <span className="footer-tagline">Just Seal & Heal.</span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation
              .filter(([name]) => name !== "Home" && name !== "Products")
              .map(([name, href]) => (
                <Link href={href} key={href}>
                  {name}
                </Link>
              ))}
          </div>
          <div>
            <h3>Our Products</h3>
            {products.map((p) => (
              <Link href={`/products/${p.slug}`} key={p.slug}>
                {p.name}
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <h3>Get in touch</h3>
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
          <span className="made-india">
            <Check size={14} /> Based in India. Focused on care.
          </span>
        </div>
      </div>
    </footer>
  );
}
