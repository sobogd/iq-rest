import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { PageTracker } from "../components/page-tracker";
import { NARROW, PAGE, Band } from "../components/shell";
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
    <main className={PAGE}>
      <PageTracker page="help" />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        containerClass={NARROW}
        compact
        navLayout="grouped"
      />

      <Band section="help">
        <div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.05] mb-3">{doc.h1}</h1>
          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed mb-8 md:mb-10">{doc.intro}</p>

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
      </Band>

      <footer data-section="footer" className="w-full">
        <div className={NARROW}>
          <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} />
        </div>
      </footer>
    </main>
  );
}
