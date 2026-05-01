// Reusable list-page renderer. Each locale's app/<locale>/changelog/page.tsx
// imports this and passes its own texts + meta + header/footer texts. Layout
// kept here so all locales share visual treatment of the list view.

import type { LandingTexts } from "../types";
import type { ChangelogTexts } from "./types";
import { CHANGELOG_ENTRIES } from "./entries-meta";
import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { ChangelogListCard } from "./list-card";

interface Props {
  texts: ChangelogTexts;
  headerTexts: LandingTexts["header"];
  footerTexts: LandingTexts["footer"];
  locale: string;
}

export function ChangelogListPage({ texts, headerTexts, footerTexts, locale }: Props) {
  return (
    <main className="relative">
      <LandingHeader texts={headerTexts} locale={locale} />

      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            {texts.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{texts.pageSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHANGELOG_ENTRIES.map((meta) => {
            const t = texts.entries[meta.id];
            if (!t) return null;
            return (
              <ChangelogListCard
                key={meta.id}
                href={`/${locale}/changelog/${meta.id}`}
                title={t.title}
                subtitle={t.subtitle}
                date={meta.date}
                image={meta.image}
                publishedOnLabel={texts.publishedOn}
                readMoreLabel={texts.readMore}
                locale={locale}
              />
            );
          })}
        </div>
      </section>

      <LandingFooter texts={footerTexts} headerTexts={headerTexts} locale={locale} />
    </main>
  );
}
