import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { et as doc } from "@/app/_landing/help/content/et";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/et/help" },
};

export default function HelpPage() {
  return <HelpView locale="et" texts={TEXTS} doc={doc} />;
}
