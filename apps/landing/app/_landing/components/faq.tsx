import { LinkForward } from "./link-forward";
import { BTN_BOX } from "./shell";
import type { LandingTexts } from "../types";
import { WHATSAPP_NUMBER } from "@/lib/contact";

interface FaqProps {
  texts: LandingTexts["faq"];
}

// One layout everywhere (home, pricing, feature pages) — same big card as
// the pricing hero, mirrored: a tinted 40% column on the LEFT (heading/sub/
// WhatsApp CTA) and a plain 60% column on the RIGHT (the questions).
// Server component, no state — renders straight to HTML, so Google/AI
// crawlers get real content (not JS-hydrated later). Schema.org FAQPage
// microdata is baked into the markup itself (itemScope/itemProp) rather
// than a separate JSON-LD blob, so it's correct wherever this component is
// used without every caller having to build its own structured data.
export function Faq({ texts }: FaqProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texts.whatsappPrefill)}`;

  return (
    <div
      itemScope
      itemType="https://schema.org/FAQPage"
      className="rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[2fr_3fr]"
    >
      {/* Background stretches to the grid row's full height (the Q&A
          column's height, since this cell isn't self-start); the sticky
          content lives in an inner wrapper so it pins at the top of that
          tall background instead of shrinking the background down to its
          own height. No overflow-hidden on the outer card — that would
          confine position:sticky to the card's own (non-scrolling) box
          instead of the page. Each column carries its own corner rounding
          instead of relying on a clipping parent. */}
      <div className="rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl bg-[hsl(28_48%_93%)] dark:bg-[hsl(28_15%_13%)]">
        <div className="flex flex-col items-start text-start lg:sticky lg:top-16 gap-3 p-5 sm:p-6">
          <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
            {texts.heading} {texts.headingAccent}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
            {texts.sub}
          </p>
          <LinkForward
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            trackName="FAQ WhatsApp link"
            className={`inline-flex items-center justify-center ${BTN_BOX} bg-gradient-to-br from-[#1CA85A] to-[#25D366] text-white hover:opacity-90 active:scale-[0.99] transition-all mt-2`}
          >
            {texts.whatsappCta}
          </LinkForward>
        </div>
      </div>

      {/* Plain Q&A — no per-item cards, just heading + text and gaps. */}
      <div className="flex flex-col gap-8 p-5 sm:p-6">
        {texts.items.map(({ q, a }) => (
          <div key={q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name" className="text-base sm:text-lg font-medium tracking-tight mb-2">
              {q}
            </h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" className="text-sm text-muted-foreground leading-relaxed">
                {a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
