import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { sr as doc } from "@/app/_landing/help/content/sr";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/sr/help" },
};

export default function HelpPage() {
  return <HelpView locale="sr" texts={TEXTS} doc={doc} />;
}
