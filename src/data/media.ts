export type PublicationStatus = "approved" | "review-required";
export type Resource = {
  id: string;
  title: string;
  category: string;
  product: string;
  size: string;
  status: PublicationStatus;
  href?: string;
};
export const documents: Resource[] = [
  {
    id: "catalogue",
    title: "SkinSeal Product Catalogue",
    category: "Catalogue",
    product: "SkinSeal",
    size: "6.10 MB",
    status: "review-required",
  },
  {
    id: "insert",
    title: "SkinSeal Product Insert",
    category: "Instructions for Use",
    product: "SkinSeal",
    size: "1.36 MB",
    status: "review-required",
  },
  {
    id: "application",
    title: "How to Use SkinSeal",
    category: "Application guide",
    product: "SkinSeal",
    size: "304 KB",
    status: "review-required",
  },
  {
    id: "presentation",
    title: "SkinSeal Product Presentation",
    category: "Company document",
    product: "SkinSeal",
    size: "1.63 MB",
    status: "review-required",
  },
  {
    id: "surgical",
    title: "Surgical Application Guide",
    category: "Application guide",
    product: "SkinSeal",
    size: "1.32 MB",
    status: "review-required",
  },
  {
    id: "delivery",
    title: "Delivery Device Overview",
    category: "Product information",
    product: "SkinSeal",
    size: "614 KB",
    status: "review-required",
  },
  {
    id: "comparison",
    title: "SkinSeal and Sutures",
    category: "Product information",
    product: "SkinSeal",
    size: "495 KB",
    status: "review-required",
  },
];
export type ClinicalVideo = {
  id: string;
  title: string;
  description: string;
  product: string;
  status: PublicationStatus;
  src?: string;
  poster?: string;
};
export const videos: ClinicalVideo[] = [
  {
    id: "brand-video",
    title: "SkinSeal brand video",
    description:
      "AI-labelled source video. Claims and presentation require review; this is not a clinician testimonial.",
    product: "skinseal",
    status: "review-required",
  },
  {
    id: "vet-video",
    title: "SkinSeal veterinary product video",
    description:
      "Veterinary source video; publication rights and complete content require confirmation.",
    product: "skinseal-veterinary",
    status: "review-required",
  },
];
export const publishedDocuments = documents.filter(
  (d) => d.status === "approved" && d.href,
);
export const publishedVideos = videos.filter(
  (v) => v.status === "approved" && v.src && v.poster,
);
