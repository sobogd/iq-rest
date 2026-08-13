import type { Metadata } from "next";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import { HelpView } from "@/app/_landing/help/help-view";
import { no as doc } from "@/app/_landing/help/content/no";
import { faqJsonLd } from "@/app/_landing/help/faq-json-ld";
import { localizedHref } from "@/lib/locale-slug-overrides";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const SITE = "https://iq-rest.com";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: `${SITE}${localizedHref("/help", "no")}` },
};

const JSON_LD = faqJsonLd(doc);

export default function HelpPage() {
  return (
    <>
      {JSON_LD ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      ) : null}
      <HelpView locale="no" texts={TEXTS} doc={doc} />
    </>
  );
}
