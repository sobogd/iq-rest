// Creates the route skeleton (dirs + page.tsx) for locales that only have a
// layout.tsx today. page.tsx is 100% locale-agnostic boilerplate for every
// route type except help (3 substitution points) — verified byte-identical
// across the 6 already-built locales before writing this script.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(ROOT, "..", "app");
const SLUGS = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n-slugs.json"), "utf8"));

const BUILT = new Set(["en", "es", "fr", "it", "pt", "ru"]);
const ALL_LOCALES = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt", "sr", "ca", "ga", "is",
  "fa", "ar", "ja", "ko", "zh",
];
const TARGET_LOCALES = ALL_LOCALES.filter((l) => !BUILT.has(l));

const FEATURE_ROUTES = ["digital-menu", "order-taking", "bookings", "kitchen-display", "menu-qr-code"];

const FEATURE_PAGE_TSX = `import type { Metadata } from "next";
import { FeatureLandingTemplate } from "@/app/_landing/templates/feature-landing-template";
import { buildFeatureMetadata } from "@/app/_landing/templates/build-feature-metadata";
import type { LandingTexts } from "@/app/_landing/types";
import { restaurantCount } from "@/lib/restaurant-count";
import type { FeatureContent } from "@/app/_landing/templates/types";
import CHROME_JSON from "../texts.json";
import CONTENT_JSON from "./content.json";

export const dynamic = "force-static";
export const revalidate = false;

const CHROME = CHROME_JSON as unknown as LandingTexts;
const CONTENT = CONTENT_JSON as unknown as FeatureContent;

export const metadata: Metadata = buildFeatureMetadata(CONTENT);

export default function Page() {
  return <FeatureLandingTemplate content={CONTENT} chrome={CHROME} count={restaurantCount()} />;
}
`;

const PRICING_PAGE_TSX = `import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import type { LandingTexts } from "@/app/_landing/types";
import DEFAULT_JSON from "../texts.json";
import PRICING_JSON from "./pricing.json";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";
import { restaurantCount } from "@/lib/restaurant-count";

export const dynamic = "force-static";
export const revalidate = false;

const SITE = "https://iq-rest.com";

const DEFAULT = DEFAULT_JSON as unknown as LandingTexts;
const TEXTS: LandingTexts = {
  ...DEFAULT,
  meta: PRICING_JSON.meta,
  finalCta: PRICING_JSON.finalCta ?? DEFAULT.finalCta,
};

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: PRICING_JSON.faqSub,
  items: PRICING_JSON.faqItems,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: \`IQ Rest — \${PRICING_JSON.breadcrumbLabel}\` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: DEFAULT.meta.canonical },
        { "@type": "ListItem", position: 2, name: PRICING_JSON.breadcrumbLabel, item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
  ],
}).replace(/</g, "\\\\u003c");

export default function PricingPage() {
  return (
    <PricingTemplate
      locale={DEFAULT.htmlLang}
      texts={TEXTS}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      count={restaurantCount()}
    />
  );
}
`;

const ABOUT_PAGE_TSX = `import type { Metadata } from "next";
import { AboutTemplate, type AboutCopy } from "@/app/_landing/templates/about-template";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import ABOUT_JSON from "./about.json";
import { restaurantCount } from "@/lib/restaurant-count";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";
import { WHATSAPP_E164 } from "@/lib/contact";

export const dynamic = "force-static";
export const revalidate = false;

const SITE = "https://iq-rest.com";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const ABOUT = ABOUT_JSON as unknown as AboutCopy;
const PAGE_URL = ABOUT.meta.canonical;

const COPY: AboutCopy = {
  ...ABOUT,
  story: {
    ...ABOUT.story,
    photo: ABOUT.story.photo ? { ...ABOUT.story.photo, alt: TEXTS.founder.photoAlt } : undefined,
    paragraphs: [\`\${TEXTS.founder.quoteStart} \${TEXTS.founder.quoteAccent}\`, ...ABOUT.story.paragraphs],
  },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  inLanguage: TEXTS.htmlLang,
  dateModified: SCHEMA_DATE_MODIFIED,
  mainEntity: {
    "@type": "Organization",
    "@id": \`\${SITE}/#organization\`,
    name: "IQ Rest",
    url: SITE,
    logo: \`\${SITE}/logo.png\`,
    founder: { "@type": "Person", name: "Bogdan Sokolov" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Boca del Río 2",
      addressLocality: "Oviedo",
      postalCode: "33010",
      addressRegion: "Asturias",
      addressCountry: "ES",
    },
    vatID: "ESZ1894474S",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@iq-rest.com",
        telephone: WHATSAPP_E164,
        availableLanguage: ["ru", "en", "es"],
      },
    ],
  },
}).replace(/</g, "\\\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: ABOUT.meta.ogTitle,
    description: ABOUT.meta.ogDescription,
    url: PAGE_URL,
    siteName: "IQ Rest",
    locale: ABOUT.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <AboutTemplate
        locale={TEXTS.htmlLang}
        texts={TEXTS}
        copy={COPY}
        count={restaurantCount()}
      />
    </>
  );
}
`;

const HOME_PAGE_TSX = fs.readFileSync(path.join(APP, "es", "page.tsx"), "utf8");

function helpPageTsx(locale) {
  return `import type { Metadata } from "next";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import { HelpView } from "@/app/_landing/help/help-view";
import { ${locale} as doc } from "@/app/_landing/help/content/${locale}";
import { faqJsonLd } from "@/app/_landing/help/faq-json-ld";
import { localizedHref } from "@/lib/locale-slug-overrides";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const SITE = "https://iq-rest.com";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: \`\${SITE}\${localizedHref("/help", "${locale}")}\` },
};

const JSON_LD = faqJsonLd(doc);

export default function HelpPage() {
  return (
    <>
      {JSON_LD ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      ) : null}
      <HelpView locale="${locale}" texts={TEXTS} doc={doc} />
    </>
  );
}
`;
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath)) {
    console.log(`  skip (exists): ${path.relative(APP, filePath)}`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  wrote: ${path.relative(APP, filePath)}`);
}

for (const locale of TARGET_LOCALES) {
  console.log(`\n${locale}:`);
  const localeDir = path.join(APP, locale);

  write(path.join(localeDir, "page.tsx"), HOME_PAGE_TSX);

  for (const route of FEATURE_ROUTES) {
    const slug = SLUGS[route][locale];
    if (!slug) {
      console.log(`  MISSING slug for ${route}/${locale}`);
      continue;
    }
    write(path.join(localeDir, slug, "page.tsx"), FEATURE_PAGE_TSX);
  }

  const pricingSlug = SLUGS.pricing[locale];
  write(path.join(localeDir, pricingSlug, "page.tsx"), PRICING_PAGE_TSX);

  const aboutSlug = SLUGS.about[locale] ?? "about";
  write(path.join(localeDir, aboutSlug, "page.tsx"), ABOUT_PAGE_TSX);

  const helpSlug = SLUGS.help[locale] ?? "help";
  write(path.join(localeDir, helpSlug, "page.tsx"), helpPageTsx(locale));
}

console.log("\nScaffold done.");
