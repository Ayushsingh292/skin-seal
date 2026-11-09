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
    status: "approved",
    href: "/documents/skinseal-catalogue.pdf",
  },
  {
    id: "insert",
    title: "SkinSeal Product Insert",
    category: "Instructions for Use",
    product: "SkinSeal",
    size: "1.36 MB",
    status: "approved",
    href: "/documents/skinseal-insert.pdf",
  },
  {
    id: "application",
    title: "How to Use SkinSeal",
    category: "Application guide",
    product: "SkinSeal",
    size: "304 KB",
    status: "approved",
    href: "/documents/skinseal-application-guide.pdf",
  },
  {
    id: "presentation",
    title: "SkinSeal Product Presentation",
    category: "Company document",
    product: "SkinSeal",
    size: "1.63 MB",
    status: "approved",
    href: "/documents/skinseal-presentation.pdf",
  },
  {
    id: "surgical",
    title: "Surgical Application Guide",
    category: "Application guide",
    product: "SkinSeal",
    size: "1.32 MB",
    status: "approved",
    href: "/documents/skinseal-surgical-guide.pdf",
  },
  {
    id: "delivery",
    title: "Delivery Device Overview",
    category: "Product information",
    product: "SkinSeal",
    size: "614 KB",
    status: "approved",
    href: "/documents/skinseal-delivery-device.pdf",
  },
  {
    id: "comparison",
    title: "SkinSeal and Sutures",
    category: "Product information",
    product: "SkinSeal",
    size: "495 KB",
    status: "approved",
    href: "/documents/skinseal-sutures-comparison.pdf",
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
  productName: string;
  duration: string;
  disclosure: string;
  orientation: "portrait" | "landscape";
};
export const videos: ClinicalVideo[] = [
  {
    id: "brand-video",
    title: "SkinSeal product overview",
    description:
      "Explore SkinSeal and take a closer look at the topical skin adhesive range.",
    product: "skinseal",
    productName: "SkinSeal",
    duration: "2:38",
    disclosure:
      "For product information. Follow the current product-specific Instructions for Use and seek professional guidance before use.",
    orientation: "portrait",
    status: "approved",
    src: "/videos/skinseal-ai-brand.mp4",
    poster: "/images/media/skinseal-ai-brand.webp",
  },
  {
    id: "vet-video",
    title: "SkinSeal veterinary product video",
    description:
      "Discover the SkinSeal veterinary range and its place in professional veterinary practice.",
    product: "skinseal-veterinary",
    productName: "SkinSeal Veterinary",
    duration: "2:22",
    disclosure:
      "For veterinary professionals. Follow the applicable product-specific Instructions for Use.",
    orientation: "landscape",
    status: "approved",
    src: "/videos/skinseal-veterinary.mp4",
    poster: "/images/media/skinseal-veterinary.webp",
  },
];
export const publishedDocuments = documents.filter(
  (d) => d.status === "approved" && d.href,
);
export const publishedVideos = videos.filter(
  (v) => v.status === "approved" && v.src && v.poster,
);
