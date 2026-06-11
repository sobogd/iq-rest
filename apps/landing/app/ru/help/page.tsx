import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ru as doc } from "@/app/_landing/help/content/ru";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ru/help" },
};

export default function HelpPage() {
  return <HelpView locale="ru" texts={TEXTS} doc={doc} />;
}
