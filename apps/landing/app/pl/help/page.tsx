import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { pl as doc } from "@/app/_landing/help/content/pl";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/pl/help" },
};

export default function HelpPage() {
  return <HelpView locale="pl" texts={TEXTS} doc={doc} />;
}
