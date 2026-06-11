import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { nl as doc } from "@/app/_landing/help/content/nl";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/nl/help" },
};

export default function HelpPage() {
  return <HelpView locale="nl" texts={TEXTS} doc={doc} />;
}
