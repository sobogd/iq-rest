import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/en/dashboard/", "/es/dashboard/", "/m/", "/en/m/", "/es/m/"],
    },
    sitemap: "https://sobogdqr.com/sitemap.xml",
  };
}
