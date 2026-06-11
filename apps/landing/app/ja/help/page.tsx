import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ja as doc } from "@/app/_landing/help/content/ja";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ja/help" },
};

export default function HelpPage() {
  return <HelpView locale="ja" texts={TEXTS} doc={doc} />;
}
