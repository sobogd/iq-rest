import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { fa as doc } from "@/app/_landing/help/content/fa";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/fa/help" },
};

export default function HelpPage() {
  return <HelpView locale="fa" texts={TEXTS} doc={doc} />;
}
