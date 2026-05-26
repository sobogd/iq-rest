import type { Metadata } from "next";
import { TEXTS } from "../texts";
import { HelpView } from "@/app/_landing/help/help-view";
import { es as doc } from "@/app/_landing/help/content/es";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "https://iq-rest.com/es/help" },
};

export default function HelpPage() {
  return <HelpView locale="es" texts={TEXTS} doc={doc} />;
}
