import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { pt as doc } from "@/app/_landing/help/content/pt";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/pt/help" },
};

export default function HelpPage() {
  return <HelpView locale="pt" texts={TEXTS} doc={doc} />;
}
