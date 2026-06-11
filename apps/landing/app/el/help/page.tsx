import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { el as doc } from "@/app/_landing/help/content/el";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/el/help" },
};

export default function HelpPage() {
  return <HelpView locale="el" texts={TEXTS} doc={doc} />;
}
