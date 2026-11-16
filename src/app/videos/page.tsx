import { CTA, PageHero } from "@/components/shared";
import { VideoGallery } from "@/components/video-gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Videos & Demonstrations", "Watch company-supplied SkinSeal and SkinSeal Vet product overview videos.", "/videos");
export default function VideosPage() {
  return <>
    <PageHero label="Videos & Demonstrations" title="Videos & Demonstrations" description="Watch the SkinSeal and veterinary product overviews. For a product-specific demonstration, contact our team." />
    <section className="cinema-section clinical-cinema"><div className="container"><VideoGallery /><p className="film-disclosure">These company-supplied product films include generated presentation scenes. They are not clinician testimonials or verified treatment outcomes. Follow the exact product’s Instructions for Use.</p></div></section>
    <CTA />
  </>;
}
