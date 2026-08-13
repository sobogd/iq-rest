import type { HelpDoc } from "./types";

// Build a schema.org FAQPage JSON-LD string from a HelpDoc's "faq" section.
// The section is authored as alternating h3 (question) / p (answer) blocks;
// each h3 pairs with the immediately following p. Returns null when there's
// no faq section or no question/answer pairs, so callers can skip the tag.
export function faqJsonLd(doc: HelpDoc): string | null {
  const faq = doc.sections.find((s) => s.id === "faq");
  if (!faq) return null;

  const pairs: { q: string; a: string }[] = [];
  for (let i = 0; i < faq.blocks.length; i++) {
    const block = faq.blocks[i];
    const next = faq.blocks[i + 1];
    if (block.type === "h3" && next && next.type === "p") {
      pairs.push({ q: block.text, a: next.text });
    }
  }
  if (pairs.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  }).replace(/</g, "\\u003c");
}
