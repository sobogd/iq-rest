import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/*/dashboard/", "/*/m/", "/*/login/", "/*/logout/", "/*/otp/"],
    },
    sitemap: "https://iq-rest.com/sitemap.xml",
  };
}
