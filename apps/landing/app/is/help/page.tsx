import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { is as doc } from "@/app/_landing/help/content/is";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/is/help" },
};

export default function HelpPage() {
  return <HelpView locale="is" texts={TEXTS} doc={doc} />;
}
