import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel", "/admin", "/cart", "/checkout"],
    },
    sitemap: "https://redwebs.ir/sitemap.xml",
  };
}
