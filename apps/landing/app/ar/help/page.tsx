import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ar as doc } from "@/app/_landing/help/content/ar";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ar/help" },
};

export default function HelpPage() {
  return <HelpView locale="ar" texts={TEXTS} doc={doc} />;
}
