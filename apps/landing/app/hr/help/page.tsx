import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { hr as doc } from "@/app/_landing/help/content/hr";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/hr/help" },
};

export default function HelpPage() {
  return <HelpView locale="hr" texts={TEXTS} doc={doc} />;
}
