import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ENTRY_REGISTRY } from "@/app/_landing/changelog/registry";
import { CHANGELOG_ENTRY_IDS, findEntryMeta } from "@/app/_landing/changelog/entries-meta";
import { CHANGELOG_TEXTS } from "../texts";
import { TEXTS } from "../../texts";

const LOCALE = "lt";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return CHANGELOG_ENTRY_IDS.map((entryId) => ({ entryId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entryId: string }>;
}): Promise<Metadata> {
  const { entryId } = await params;
  const entry = CHANGELOG_TEXTS.entries[entryId];
  if (!entry) return { title: "Not Found" };
  const url = `https://iq-rest.com/${LOCALE}/changelog/${entryId}`;
  return {
    metadataBase: new URL("https://iq-rest.com"),
    title: entry.meta.title,
    description: entry.meta.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function ChangelogEntryPage({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;
  const meta = findEntryMeta(entryId);
  const Component = ENTRY_REGISTRY[entryId];
  if (!meta || !Component) notFound();
  return (
    <Component
      texts={CHANGELOG_TEXTS}
      headerTexts={TEXTS.header}
      footerTexts={TEXTS.footer}
      locale={LOCALE}
    />
  );
}
