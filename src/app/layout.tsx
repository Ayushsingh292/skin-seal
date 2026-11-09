import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import { site } from "@/data/site";
import "./globals.css";
import "./refinements.css";
const inter = localFont({
  src: "../../public/fonts/inter.woff2",
  weight: "400 800",
  variable: "--font-inter",
  display: "swap",
});
const manrope = localFont({
  src: "../../public/fonts/manrope.woff2",
  weight: "400 800",
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SkinSeal | Advanced Topical Skin Adhesives",
    template: "%s | SkinSeal",
  },
  description:
    "Explore SkinSeal topical skin adhesives for professional practice. Just Seal & Heal.",
  robots:
    process.env.SITE_APPROVED === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              email: site.email,
              telephone: site.tel,
              logo: `${site.url}/images/brand/skinseal-logo.png`,
            }),
          }}
        />
      </body>
    </html>
  );
}
