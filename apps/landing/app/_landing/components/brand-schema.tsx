const SITE = "https://iq-rest.com";

const BRAND_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "IQ Rest",
      alternateName: "SoqrMenu",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "IQ Rest",
      alternateName: "SoqrMenu",
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
