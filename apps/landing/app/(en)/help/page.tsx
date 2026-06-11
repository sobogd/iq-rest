import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { en as doc } from "@/app/_landing/help/content/en";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/help" },
};

export default function HelpPage() {
  return <HelpView locale="en" texts={TEXTS} doc={doc} />;
}
