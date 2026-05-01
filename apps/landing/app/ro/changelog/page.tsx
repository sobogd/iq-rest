import type { Metadata } from "next";
import { ChangelogListPage } from "@/app/_landing/changelog/list-page";
import { CHANGELOG_TEXTS } from "./texts";
import { TEXTS } from "../texts";

const LOCALE = "ro";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: CHANGELOG_TEXTS.meta.title,
  description: CHANGELOG_TEXTS.meta.description,
  alternates: { canonical: `https://iq-rest.com/${LOCALE}/changelog` },
  robots: { index: true, follow: true },
};

export default function ChangelogPage() {
  return (
    <ChangelogListPage
      texts={CHANGELOG_TEXTS}
      headerTexts={TEXTS.header}
      footerTexts={TEXTS.footer}
      locale={LOCALE}
    />
  );
}
