import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { no as doc } from "@/app/_landing/help/content/no";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/no/help" },
};

export default function HelpPage() {
  return <HelpView locale="no" texts={TEXTS} doc={doc} />;
}
