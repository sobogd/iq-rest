import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { lv as doc } from "@/app/_landing/help/content/lv";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/lv/help" },
};

export default function HelpPage() {
  return <HelpView locale="lv" texts={TEXTS} doc={doc} />;
}
