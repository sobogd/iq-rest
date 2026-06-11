import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { uk as doc } from "@/app/_landing/help/content/uk";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/uk/help" },
};

export default function HelpPage() {
  return <HelpView locale="uk" texts={TEXTS} doc={doc} />;
}
