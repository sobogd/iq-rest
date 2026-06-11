import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { cs as doc } from "@/app/_landing/help/content/cs";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/cs/help" },
};

export default function HelpPage() {
  return <HelpView locale="cs" texts={TEXTS} doc={doc} />;
}
