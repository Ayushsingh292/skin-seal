import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Privacy Policy",
    "How the SkinSeal website handles product enquiries and technical data.",
    "/privacy-policy",
  ),
  robots: { index: false, follow: false },
};
export default function Privacy() {
  return <LegalPage type="privacy" />;
}
