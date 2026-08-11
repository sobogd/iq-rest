import type { Metadata } from "next";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "../texts.json";
import { HelpView } from "@/app/_landing/help/help-view";
import { ru as doc } from "@/app/_landing/help/content/ru";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ru/help" },
};

export default function HelpPage() {
  return <HelpView locale="ru" texts={TEXTS} doc={doc} />;
}
