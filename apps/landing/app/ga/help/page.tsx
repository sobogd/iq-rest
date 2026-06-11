import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ga as doc } from "@/app/_landing/help/content/ga";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ga/help" },
};

export default function HelpPage() {
  return <HelpView locale="ga" texts={TEXTS} doc={doc} />;
}
