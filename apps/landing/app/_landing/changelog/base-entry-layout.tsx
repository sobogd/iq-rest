// Default visual layout for one changelog entry. Per-entry components in
// entries/<id>.tsx may opt to use this as-is or render their own custom layout
// when an entry deserves a bespoke design (e.g. landing-page-style hero).

import Image from "next/image";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";
import type { ChangelogEntryTexts, ChangelogTexts } from "./types";
import type { ChangelogEntryMeta } from "./entries-meta";
import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { createUrl } from "@/lib/dashboard-url";

interface Props {
  meta: ChangelogEntryMeta;
  entry: ChangelogEntryTexts;
  texts: ChangelogTexts;
  headerTexts: LandingTexts["header"];
  footerTexts: LandingTexts["footer"];
  locale: string;
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BaseEntryLayout({
  meta,
  entry,
  texts,
  headerTexts,
  footerTexts,
  locale,
}: Props) {
  const createHref = `${createUrl(locale)}&from=changelog`;

  return (
    <main className="relative">
      <LandingHeader texts={headerTexts} locale={locale} />

      <article className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/changelog`}
            onClick={() => analytics.track("land_changelog_back_click")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-flex items-center gap-1"
          >
            ← {texts.backToList}
          </Link>

          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
            {texts.publishedOn} · {formatDate(meta.date, locale)}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-5">
            {entry.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {entry.subtitle}
          </p>

          <div className="relative aspect-[16/9] bg-secondary rounded-2xl overflow-hidden mb-10 border border-border">
            <Image
              src={meta.image}
              alt={entry.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <p className="text-base text-foreground leading-relaxed mb-10">{entry.intro}</p>

          {entry.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-semibold tracking-tight mb-3">{section.title}</h2>
              <p className="text-base text-foreground/90 leading-relaxed">{section.body}</p>
            </section>
          ))}

          <section className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-10">
            <h2 className="text-xl font-semibold tracking-tight mb-4">{entry.benefitsTitle}</h2>
            <ul className="space-y-2">
              {entry.benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-foreground/90 leading-relaxed"
                >
                  <span className="text-primary shrink-0">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">{entry.conclusionTitle}</h2>
            <p className="text-base text-foreground/90 leading-relaxed">{entry.conclusionBody}</p>
          </section>

          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 lg:p-8 text-center">
            <p className="text-base text-foreground mb-5">{entry.ctaText}</p>
            <a
              href={createHref}
              onClick={() => analytics.track("land_changelog_cta_click")}
              className="inline-flex items-center justify-center h-11 px-7 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {entry.ctaButton} →
            </a>
          </div>
        </div>
      </article>

      <LandingFooter texts={footerTexts} headerTexts={headerTexts} locale={locale} />
    </main>
  );
}
