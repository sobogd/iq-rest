import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/en/dashboard/", "/es/dashboard/"],
    },
    sitemap: "https://sobogdqr.com/sitemap.xml",
  };
}
