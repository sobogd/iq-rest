import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ro as doc } from "@/app/_landing/help/content/ro";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ro/help" },
};

export default function HelpPage() {
  return <HelpView locale="ro" texts={TEXTS} doc={doc} />;
}
