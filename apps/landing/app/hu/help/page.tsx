import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { hu as doc } from "@/app/_landing/help/content/hu";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/hu/help" },
};

export default function HelpPage() {
  return <HelpView locale="hu" texts={TEXTS} doc={doc} />;
}
