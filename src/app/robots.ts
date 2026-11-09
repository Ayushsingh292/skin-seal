import type { MetadataRoute } from "next";
import { site } from "@/data/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_APPROVED === "true"
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
