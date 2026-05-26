import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { sl as doc } from "@/app/_landing/help/content/sl";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/sl/help" },
};

export default function HelpPage() {
  return <HelpView locale="sl" texts={TEXTS} doc={doc} />;
}
