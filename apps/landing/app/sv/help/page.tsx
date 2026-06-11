import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { sv as doc } from "@/app/_landing/help/content/sv";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/sv/help" },
};

export default function HelpPage() {
  return <HelpView locale="sv" texts={TEXTS} doc={doc} />;
}
