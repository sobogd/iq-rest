import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { fi as doc } from "@/app/_landing/help/content/fi";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/fi/help" },
};

export default function HelpPage() {
  return <HelpView locale="fi" texts={TEXTS} doc={doc} />;
}
