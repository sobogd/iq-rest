import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { de as doc } from "@/app/_landing/help/content/de";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/de/help" },
};

export default function HelpPage() {
  return <HelpView locale="de" texts={TEXTS} doc={doc} />;
}
