const BASE_URL = "https://sobogdqr.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SobogdQR",
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
    email: "support@sobogdqr.com",
  },
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SobogdQR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SobogdQR - QR Menu Solution for Restaurants",
  description:
    "Professional QR menu system for restaurants and cafes with instant updates, multilingual support, and analytics",
  image: [`${BASE_URL}/logo.svg`, `${BASE_URL}/product-image.svg`],
  brand: {
    "@type": "Brand",
    name: "SobogdQR",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "9",
    priceCurrency: "EUR",
    offerCount: "3",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
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
        currency: "EUR",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Restaurant Owner",
      },
      reviewBody:
        "SobogdQR transformed our restaurant menu experience. Customers love the multilingual support and the ordering process is much smoother.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Cafe Manager",
      },
      reviewBody:
        "Easy to set up and maintain. The analytics help us understand what our customers prefer. Highly recommended!",
    },
  ],
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
