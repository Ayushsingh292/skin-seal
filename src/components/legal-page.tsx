import Link from "next/link";
import { PageHero } from "./shared";
import { site } from "@/data/site";
export function LegalPage({
  type,
}: {
  type: "privacy" | "terms" | "disclaimer";
}) {
  const title =
    type === "privacy"
      ? "Privacy Policy"
      : type === "terms"
        ? "Website Terms"
        : "Medical & Product Disclaimer";
  return (
    <>
      <PageHero
        label={title}
        title={title}
        description="Information about this website and your interactions with the SkinSeal team."
      />
      <section className="section">
        <article className="container legal-copy">
          <div className="review-banner">
            <strong>
              Development draft — company approval required before launch.
            </strong>
            <p>
              This text describes the implemented website. Company policies and
              legal terms must be reviewed and approved before publication.
            </p>
          </div>
          <p>Draft prepared: 9 November 2026.</p>
          {type === "privacy" ? (
            <>
              <h2>Information you provide</h2>
              <p>
                The enquiry form asks for your name, email, phone, organization,
                profession, product interest, message and consent to be
                contacted. Please do not send patient information or sensitive
                medical records.
              </p>
              <h2>How enquiries are handled</h2>
              <p>
                When email delivery is configured, the server validates the form
                and sends the enquiry through Resend to the configured company
                inbox. Successful delivery is reported only after the email
                provider confirms acceptance. The application does not save
                enquiries to its own database.
              </p>
              <h2>Technical data and spam prevention</h2>
              <p>
                The handler uses a short-lived hash of the connecting IP address
                to limit repeated submissions within the running server process.
                Hosting and email providers may process technical logs according
                to their own policies. No advertising or analytics tracking is
                included in this implementation.
              </p>
              <h2>Service providers and retention</h2>
              <p>
                The company must confirm the hosting provider, email processing
                arrangements, mailbox retention, applicable rights and response
                procedures before launch. Email provider information is
                available at{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend’s privacy policy
                </a>
                .
              </p>
              <h2>Your enquiries</h2>
              <p>
                To ask about an enquiry or request correction or deletion of
                information you have provided, contact{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. Specific
                policies and applicable obligations require company review.
              </p>
            </>
          ) : type === "terms" ? (
            <>
              <h2>Purpose of the website</h2>
              <p>
                This website presents SkinSeal product information for
                healthcare, dental, veterinary and distribution enquiries. It
                does not operate an online checkout or establish a sale through
                submission of an enquiry.
              </p>
              <h2>Product information</h2>
              <p>
                Product availability and documentation should be confirmed with
                the team. The product label and current Instructions for Use for
                the exact variant take precedence over a website summary.
              </p>
              <h2>Appropriate use</h2>
              <p>
                Please use the enquiry service for legitimate product enquiries.
                Do not submit patient records, unlawful content, automated spam
                or material you are not entitled to share.
              </p>
              <h2>Brand and source material</h2>
              <p>
                SkinSeal brand artwork and supplied product materials are used
                to identify the brand and product range. Representative stock
                photographs do not imply endorsement or document actual SkinSeal
                procedures.
              </p>
              <h2>Company terms</h2>
              <p>
                Commercial terms, distribution agreements, limitations of
                liability, dispute procedures and governing law must be supplied
                and approved by the company before launch. No purchase or
                distribution agreement is created by browsing this site.
              </p>
            </>
          ) : (
            <>
              <h2>For professional information</h2>
              <p>
                This website provides general product awareness. It does not
                offer medical advice, diagnosis or treatment instructions.
                Consult a qualified healthcare or veterinary professional, as
                appropriate.
              </p>
              <h2>Clinical selection</h2>
              <p>
                Topical skin adhesives are not appropriate for every wound or
                anatomical site. The treating professional must assess
                suitability and follow the exact product’s current Instructions
                for Use, precautions and contraindications.
              </p>
              <h2>Different formulations</h2>
              <p>
                Do not assume indications, application timings, aftercare or
                precautions are identical across the medical, dental and
                veterinary ranges. Request product-specific documentation.
              </p>
              <h2>Photographs and clinical experiences</h2>
              <p>
                Clinical application photographs are representative stock
                images. They do not show SkinSeal treatment, clinical outcomes
                or endorsements. No identifiable patient footage or unverified
                clinician testimonial is published.
              </p>
              <h2>Product enquiries and urgent care</h2>
              <p>
                The enquiry service is for product information. It is not a
                clinical consultation service. Seek appropriate local medical
                care for wounds or urgent health concerns.
              </p>
            </>
          )}
          <h2>Contact</h2>
          <p>
            {site.company}
            <br />
            {site.address}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a href={`tel:${site.tel}`}>{site.phone}</a>
          </p>
          <Link className="text-link" href="/contact">
            Contact the team
          </Link>
        </article>
      </section>
    </>
  );
}
