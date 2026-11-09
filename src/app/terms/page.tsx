import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Website Terms",
    "Information about use of the SkinSeal website and product enquiries.",
    "/terms",
  ),
  robots: { index: false, follow: false },
};
export default function Terms() {
  return <LegalPage type="terms" />;
}
