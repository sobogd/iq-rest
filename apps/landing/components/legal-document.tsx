import { LegalBackButton } from "./legal-back-button";

type Section = { heading?: string; paragraphs: string[] };

/** Renders a single legal document (Privacy / Terms / Cookies) as a
 *  standalone page. Content is English-only on purpose — translating legal
 *  text requires lawyer review and English is the canonical binding version. */
export function LegalDocument({
  title,
  sections,
  locale,
}: {
  title: string;
  sections: Section[];
  locale: string;
}) {
  return (
    <main className="min-h-dvh bg-background text-foreground antialiased tracking-tight">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        <LegalBackButton locale={locale} />
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-8">{title}</h1>
        <div className="space-y-6 leading-relaxed">
          {sections.map((s, i) => (
            <section key={i} className="space-y-3">
              {s.heading && (
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight mt-6">
                  {s.heading}
                </h2>
              )}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground whitespace-pre-line text-[15px]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
