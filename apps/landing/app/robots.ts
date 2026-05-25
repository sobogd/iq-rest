import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/*/dashboard/", "/*/m/", "/detect-lang"],
    },
    sitemap: "https://iq-rest.com/sitemap.xml",
  };
}
