import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { fr as doc } from "@/app/_landing/help/content/fr";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/fr/help" },
};

export default function HelpPage() {
  return <HelpView locale="fr" texts={TEXTS} doc={doc} />;
}
