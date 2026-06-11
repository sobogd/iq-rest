import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { bg as doc } from "@/app/_landing/help/content/bg";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/bg/help" },
};

export default function HelpPage() {
  return <HelpView locale="bg" texts={TEXTS} doc={doc} />;
}
