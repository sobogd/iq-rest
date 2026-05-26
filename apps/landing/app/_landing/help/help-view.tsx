import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import type { LandingTexts } from "../types";
import type { Block, HelpDoc } from "./types";
import { HelpSidebar } from "./help-sidebar";

// Shared renderer for every per-locale help page. Same header/footer/layout as
// the rest of the landing (e.g. pricing) — no hero, just the guide. Per-locale
// data comes from the HelpDoc; the locale's home TEXTS supply header/footer.

function BlockView({ block, tipLabel, noteLabel }: { block: Block; tipLabel: string; noteLabel: string }) {
  switch (block.type) {
    case "h3":
      return <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
    case "p":
      return <p className="text-[15px] leading-relaxed text-foreground/80 mb-3">{block.text}</p>;
    case "steps":
      return (
        <ol className="list-decimal pl-5 space-y-1.5 mb-3 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/40">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "list":
      return (
        <ul className="list-disc pl-5 space-y-1.5 mb-3 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/40">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div className="my-4 rounded-xl border border-border bg-card/60 px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
          <span className="font-semibold text-foreground">💡 {tipLabel}: </span>
          {block.text}
        </div>
      );
    case "note":
      return (
        <div className="my-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
          <span className="font-semibold text-amber-400">{noteLabel}: </span>
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

export function HelpView({
  locale,
  texts,
  doc,
}: {
  locale: string;
  texts: LandingTexts;
  doc: HelpDoc;
}) {
  const { tipLabel, noteLabel } = doc;
  return (
    <main className="relative">
      <PageTracker />
      <LandingHeader texts={texts.header} locale={locale} featureLinks={texts.footer.featureLinks} />

      <Section dataSection="help" noContainer className="!pt-10 md:!pt-12 !pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{doc.h1}</h1>
          <p className="text-muted-foreground mb-8 md:mb-10">{doc.intro}</p>

          <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12">
            <HelpSidebar items={doc.sections.map((s) => ({ id: s.id, title: s.title }))} />

            <div className="min-w-0">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} data-section={`help_${s.id}`} className="scroll-mt-24 mb-12">
                  <h2 className="text-2xl font-semibold tracking-tight mb-4 pb-2 border-b border-border">
                    {s.title}
                  </h2>
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} block={b} tipLabel={tipLabel} noteLabel={noteLabel} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8 bg-muted/30 border-t border-border">
        <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} />
      </Section>
    </main>
  );
}
