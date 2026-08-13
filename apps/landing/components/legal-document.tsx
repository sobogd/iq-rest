import { LandingHeader } from "@/app/_landing/components/header";
import { LandingFooter } from "@/app/_landing/components/footer";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PAGE, Band, Content } from "@/app/_landing/components/shell";
import type { LandingChrome } from "@/app/_landing/lib/landing-chrome";

type Section = { heading?: string; paragraphs: string[] };

/** Renders a single legal document (Privacy / Terms / Cookies) inside the
 *  standard landing chrome (localized header/footer). Content is English-only
 *  on purpose — translating legal text requires lawyer review and English is
 *  the canonical binding version — hence the explicit lang/dir on the card:
 *  the surrounding <html> carries the active locale (possibly RTL).
 *
 *  Same big card as the FAQ block: tinted sticky 40% column on the LEFT
 *  (document title + revision date) and a plain 60% column on the RIGHT
 *  (the sections). */
export function LegalDocument({
  title,
  sections,
  locale,
  trackPage,
  chrome,
}: {
  title: string;
  sections: Section[];
  locale: string;
  /** Analytics page key. Without it the module-level page label keeps whatever
   *  the previously visited page set, so these clicks land in the wrong bucket. */
  trackPage: string;
  chrome: LandingChrome;
}) {
  // Every document in legal-text.tsx opens with a "Last updated: <date>"
  // paragraph (the cookie-consent modals rely on it staying in the shared
  // sections). Here that line moves into the tinted title column, so pull it
  // out of the body instead of rendering it twice.
  const lastUpdated = sections
    .flatMap((s) => s.paragraphs)
    .find((p) => p.startsWith("Last updated:"));
  const body = sections
    .map((s) => ({ ...s, paragraphs: s.paragraphs.filter((p) => !p.startsWith("Last updated:")) }))
    .filter((s) => s.heading || s.paragraphs.length > 0);

  return (
    <main className={`${PAGE} min-h-dvh bg-background text-foreground antialiased tracking-tight`}>
      <PageTracker page={trackPage} />
      <LandingHeader
        texts={chrome.header}
        locale={locale}
        featureLinks={chrome.footer.featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        <Band section={trackPage}>
          <div
            lang="en"
            dir="ltr"
            className="rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[2fr_3fr]"
          >
            {/* Same sticky-background construction as the FAQ card: the tint
                fills the grid row's full height, the content pins inside it. */}
            <div className="rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl bg-[hsl(28_48%_93%)] dark:bg-[hsl(28_15%_13%)]">
              <div className="flex flex-col items-start text-start lg:sticky lg:top-16 gap-3 p-5 sm:p-6">
                <h1 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
                  {title}
                </h1>
                {lastUpdated && (
                  <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                    {lastUpdated}
                  </p>
                )}
              </div>
            </div>

            {/* Plain sections — no per-item cards, just heading + text and
                gaps, mirroring the FAQ's Q&A column. */}
            <div className="flex flex-col gap-8 p-5 sm:p-6">
              {body.map((s, i) => (
                <section key={i}>
                  {s.heading && (
                    <h2 className="text-base sm:text-lg font-medium tracking-tight mb-2">
                      {s.heading}
                    </h2>
                  )}
                  <div className="space-y-2">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Band>
      </Content>

      <LandingFooter
        texts={chrome.footer}
        headerTexts={chrome.header}
        locale={locale}
        routeKey={`/${trackPage}`}
      />
    </main>
  );
}
