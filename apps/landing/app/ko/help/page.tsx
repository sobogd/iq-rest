import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { ko as doc } from "@/app/_landing/help/content/ko";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/ko/help" },
};

export default function HelpPage() {
  return <HelpView locale="ko" texts={TEXTS} doc={doc} />;
}
