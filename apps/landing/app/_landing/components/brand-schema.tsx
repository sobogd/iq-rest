const SITE = "https://iq-rest.com";

const BRAND_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "IQ Rest",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: ["https://www.facebook.com/people/IQ-Rest/100066874241445/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "IQ Rest",
      url: SITE,
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
}).replace(/</g, "\\u003c");

export function BrandSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: BRAND_JSON_LD }}
    />
  );
}
