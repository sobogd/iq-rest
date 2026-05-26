import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { da as doc } from "@/app/_landing/help/content/da";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/da/help" },
};

export default function HelpPage() {
  return <HelpView locale="da" texts={TEXTS} doc={doc} />;
}
