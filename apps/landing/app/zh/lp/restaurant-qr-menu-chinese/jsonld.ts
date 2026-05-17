import { TEXTS } from "./texts";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: `IQ Rest — 餐厅QR菜单`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: TEXTS.meta.description,
      inLanguage: "zh",
      offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: TEXTS.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ],
};

export const JSON_LD_HTML = JSON.stringify(data).replace(/</g, "\\u003c");
