import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { tr as doc } from "@/app/_landing/help/content/tr";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/tr/help" },
};

export default function HelpPage() {
  return <HelpView locale="tr" texts={TEXTS} doc={doc} />;
}
