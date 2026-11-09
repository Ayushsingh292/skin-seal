import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { navigation, site } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map(([, href]) => href),
    ...products.map((p) => `/products/${p.slug}`),
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
  }));
}
