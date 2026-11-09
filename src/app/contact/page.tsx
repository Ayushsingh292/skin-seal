import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Eyebrow, PageHero } from "@/components/shared";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { documents } from "@/data/media";
import { pageMetadata } from "@/lib/metadata";
import type { EnquiryInput } from "@/lib/validations";
export const metadata = pageMetadata(
  "Contact & Enquiries",
  "Contact Asepsis Marketing for SkinSeal product information, documentation and professional enquiries.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const selected = products.find((p) => p.slug === query.product);
  const resource = documents.find((d) => d.id === query.resource);
  const message = resource
    ? `Please send the current ${resource.title}.`
    : query.type === "demonstration"
      ? `I would like to request a demonstration${selected ? ` for ${selected.name}` : ""}.`
      : "";
  return (
    <>
      <PageHero
        label="Get in touch"
        title="Let’s talk about your practice."
        description="Product information, professional learning or distribution enquiries—connect directly with the SkinSeal team."
      />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <Eyebrow>Here to help</Eyebrow>
            <h2>
              A better conversation
              <br />
              starts here.
            </h2>
            <p>
              Tell us about your product requirements. Our team can help with
              current product information, documentation and availability.
            </p>
            <div className="contact-method">
              <span className="icon-box">
                <Phone size={21} />
              </span>
              <div>
                <h3>Call our team</h3>
                <a href={`tel:${site.tel}`}>
                  {site.phone} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <Mail size={21} />
              </span>
              <div>
                <h3>Email us</h3>
                <a href={`mailto:${site.email}`}>
                  {site.email} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <MapPin size={21} />
              </span>
              <div>
                <h3>{site.company}</h3>
                <p>{site.address}</p>
              </div>
            </div>
            <div className="info-panel">
              <h3>For healthcare professionals</h3>
              <p>
                For product use, always request the Instructions for Use for
                your exact formulation. Please keep patient details out of your
                enquiry.
              </p>
            </div>
          </aside>
          <EnquiryForm
            product={(selected?.slug ?? "general") as EnquiryInput["product"]}
            message={message}
          />
        </div>
      </section>
    </>
  );
}
