import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { zh as doc } from "@/app/_landing/help/content/zh";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/zh/help" },
};

export default function HelpPage() {
  return <HelpView locale="zh" texts={TEXTS} doc={doc} />;
}
