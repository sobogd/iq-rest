import type { Metadata } from "next";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import { HelpView } from "@/app/_landing/help/help-view";
import { ru as doc } from "@/app/_landing/help/content/ru";
import { faqJsonLd } from "@/app/_landing/help/faq-json-ld";
import { featureAlternates } from "@/lib/hreflang";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: `${TEXTS.meta.canonical}/help`, languages: featureAlternates("/help") },
};

// FAQPage structured data, derived from the guide's "faq" section (h3 =
// question, the following p = answer). Emitted as JSON-LD so the guide's
// troubleshooting Q&A is eligible for FAQ rich results.
const JSON_LD = faqJsonLd(doc);

export default function HelpPage() {
  return (
    <>
      {JSON_LD ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      ) : null}
      <HelpView locale="ru" texts={TEXTS} doc={doc} />
    </>
  );
}
