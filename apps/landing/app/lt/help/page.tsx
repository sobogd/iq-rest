import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { lt as doc } from "@/app/_landing/help/content/lt";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/lt/help" },
};

export default function HelpPage() {
  return <HelpView locale="lt" texts={TEXTS} doc={doc} />;
}
