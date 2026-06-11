import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { sk as doc } from "@/app/_landing/help/content/sk";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/sk/help" },
};

export default function HelpPage() {
  return <HelpView locale="sk" texts={TEXTS} doc={doc} />;
}
