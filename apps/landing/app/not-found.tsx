import Link from "next/link";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { TEXTS } from "./en/texts";

// Global not-found — App Router renders this for any unmatched URL that
// wasn't caught by middleware (410 list lives in middleware.ts).
// We default to English chrome because the missing URL has no locale
// context we can trust; the header includes the language switcher so
// visitors can re-orient.
export const metadata = {
  title: "Not found · IQ Rest",
  robots: { index: false, follow: false },
};

// Skip static prerendering — the header/footer pull in client-only bits
// (analytics, language switcher) and bailing on prerender is fine for a
// rarely-hit 404 page.
export const dynamic = "force-dynamic";

const LOCALE = "en";

export default function NotFound() {
  return (
    <main className="relative">
      <LandingHeaderLp
        texts={TEXTS.header}
        locale={LOCALE}
        useLocalAnchors={false}
        featureLinks={TEXTS.footer.featureLinks}
      />

      <section className="px-5 py-24 sm:py-32">
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
            href={`/${LOCALE}`}
            className="inline-flex h-11 px-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Go to homepage
          </Link>
        </div>
      </section>

      <LandingFooterLp
        texts={TEXTS.footer}
        headerTexts={TEXTS.header}
        locale={LOCALE}
        variant="lp"
      />
    </main>
  );
}
