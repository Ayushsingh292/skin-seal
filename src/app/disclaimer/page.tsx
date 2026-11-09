import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Medical & Product Disclaimer",
    "Professional use and medical content information for the SkinSeal website.",
    "/disclaimer",
  ),
  robots: { index: false, follow: false },
};
export default function Disclaimer() {
  return <LegalPage type="disclaimer" />;
}
