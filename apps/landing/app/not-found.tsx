import Link from "next/link";
import "./globals.css";
import { LandingHeader } from "@/app/_landing/components/header";
import { LandingFooter } from "@/app/_landing/components/footer";
import { LandingI18nWrap } from "@/app/_landing/components/landing-i18n-wrap";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PAGE, Content } from "@/app/_landing/components/shell";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "./(en)/texts.json";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;

// Global not-found — App Router renders this for any unmatched URL that
// wasn't caught by middleware (410 list lives in middleware.ts).
// We default to EN chrome (matches the hardcoded English body text and the
// <html lang>) because the missing URL has no locale context we can trust;
// the header includes the language switcher so visitors can re-orient.
export const metadata = {
  title: "Not found · IQ Rest",
  robots: { index: false, follow: false },
};

// Skip static prerendering — the header/footer pull in client-only bits
// (analytics, language switcher) and bailing on prerender is fine for a
// rarely-hit 404 page.
export const dynamic = "force-dynamic";

const LOCALE = "en";

// The root app/layout.tsx is a pass-through (returns `children` directly so
// per-locale layouts own their own <html>/<body>). Because no per-locale
// layout matches on an unmatched URL, not-found has to ship its own
// <html>/<body> and pull in globals.css — otherwise Tailwind classes
// resolve to nothing and the page renders unstyled.
export default async function NotFound() {
  return (
    <html lang={LOCALE} dir="ltr" translate="no" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased tracking-tight">
        <LandingI18nWrap locale={LOCALE}>
          <main className={PAGE}>
            {/* Own page bucket — header/footer clicks from a 404 would
                otherwise be attributed to whatever page ran before it. */}
            <PageTracker page="not-found" />
            <LandingHeader
              texts={TEXTS.header}
              locale={LOCALE}
              useLocalAnchors={false}
              featureLinks={TEXTS.footer.featureLinks}
              compact
              navLayout="grouped"
            />

            <Content>
              <section className="py-20 sm:py-28">
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    404
                  </p>
                  <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-4">
                    Page not found
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                    The page you were looking for doesn&apos;t exist or was moved.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex h-11 px-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    Go to homepage
                  </Link>
                </div>
              </section>
            </Content>

            <LandingFooter texts={TEXTS.footer} headerTexts={TEXTS.header} locale={LOCALE} />
          </main>
        </LandingI18nWrap>
      </body>
    </html>
  );
}
