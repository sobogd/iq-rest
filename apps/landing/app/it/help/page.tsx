import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { it as doc } from "@/app/_landing/help/content/it";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/it/help" },
};

export default function HelpPage() {
  return <HelpView locale="it" texts={TEXTS} doc={doc} />;
}
