const BASE_URL = "https://iq-rest.com";

// Dynamic price validity - always 1 year from now
const getPriceValidUntil = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split("T")[0];
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IQ Rest",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description: "Digital QR menu solution for restaurants and cafes worldwide",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Bogdan",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@iq-rest.com",
  },
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "IQ Rest",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: getPriceValidUntil(),
  },
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "IQ Rest - QR Menu Solution for Restaurants",
  description:
    "Professional QR menu system for restaurants and cafes with instant updates, multilingual support, and analytics",
  image: [`${BASE_URL}/logo.svg`, `${BASE_URL}/og-image.svg`],
  brand: {
    "@type": "Brand",
    name: "IQ Rest",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "2",
    reviewCount: "2",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "9",
    priceCurrency: "USD",
    offerCount: "3",
    availability: "https://schema.org/InStock",
    priceValidUntil: getPriceValidUntil(),
    url: `${BASE_URL}/pricing`,
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "WorldWide",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "USD",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "WorldWide",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 0,
          unitCode: "DAY",
        },
      },
    },
  },
  review: [
    {
      "@type": "Review",
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: "IQ Rest",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: "Restaurant Owner",
      },
      reviewBody:
        "IQ Rest transformed our restaurant menu experience. Customers love the multilingual support and the ordering process is much smoother.",
      datePublished: "2024-10-15",
    },
    {
      "@type": "Review",
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: "IQ Rest",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: "Cafe Manager",
      },
      reviewBody:
        "Easy to set up and maintain. The analytics help us understand what our customers prefer. Highly recommended!",
      datePublished: "2024-11-20",
    },
  ],
};

// Contact Page Schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact IQ Rest",
  description: "Get in touch with the IQ Rest team for support with your restaurant QR menu",
  url: `${BASE_URL}/en/contacts`,
  mainEntity: {
    "@type": "Organization",
    name: "IQ Rest",
    email: "support@iq-rest.com",
    url: BASE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@iq-rest.com",
      availableLanguage: ["English", "Spanish"],
    },
  },
};

// WebPage Schema for legal pages
export const createWebPageSchema = (
  name: string,
  description: string,
  url: string,
  dateModified: string = "2025-12-17"
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url,
  dateModified,
  publisher: {
    "@type": "Organization",
    name: "IQ Rest",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
    },
  },
  inLanguage: ["en", "es"],
});

// Breadcrumb Schema helper
export const createBreadcrumbSchema = (
  locale: string,
  items: Array<{ name: string; path?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.path ? `${BASE_URL}/${locale}${item.path}` : `${BASE_URL}/${locale}`,
  })),
});

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
