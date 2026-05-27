import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ca as doc } from "@/app/_landing/help/content/ca";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ca/help" },
};

export default function HelpPage() {
  return <HelpView locale="ca" texts={TEXTS} doc={doc} />;
}
