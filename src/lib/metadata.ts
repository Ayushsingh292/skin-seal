import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | SkinSeal`,
      description,
      url: `${site.url}${path}`,
      type: "website",
      images: [
        {
          url: "/images/products/skinseal.webp",
          width: 1193,
          height: 595,
          alt: "Authentic SkinSeal product packaging",
        },
      ],
    },
  };
}
