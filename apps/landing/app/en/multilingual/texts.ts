import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Multilingual Restaurant Menu — 35 Languages, One Tap to Switch",
    description:
      "Serve international guests in their language. Restaurant menu in 35 languages with one-tap switching. RTL support for Arabic and Persian. 14-day free trial.",
    canonical: "https://iq-rest.com/en/multilingual",
    ogLocale: "en_US",
    ogTitle: "Multilingual Restaurant Menu Website — 35 Languages Built In",
    ogDescription:
      "Tourists scan, see your menu in their language automatically. 35 languages, RTL support, auto-detect from phone settings. 14-day free trial.",
  },

  hero: {
    title: "Your menu speaks every tourist's language.",
    subtitle:
      "A multilingual restaurant menu shouldn't be a project. With IQ Rest, your QR menu auto-detects each guest's phone language and serves it in any of 35 languages — including Arabic and Persian with proper right-to-left rendering.",
    trustLine: "4.9 · 500+ restaurants in 30+ countries",
  },

  seo: {
    description:
      "Build your menu once, serve it in 35 languages. IQ Rest auto-detects each guest's phone language and renders the menu in their tongue — no flag-tapping, no language barrier, no awkward Google Translate moments. From Spanish and German to Japanese, Arabic and Mandarin, your guests see your restaurant the way it was meant to be seen.",
    fullDescription:
      "Most 'multilingual' menus are PDFs of broken Google Translate, printed once and never updated. IQ Rest's multilingual restaurant website is real i18n: each language has its own properly translated copy, its own URL slug, its own meta tags for Google to index, and its own routing inside the menu app.\n\nWhen a tourist with a French-language iPhone scans your QR code, the menu opens in French automatically — no taps, no decisions. They can switch to any other language with the language selector at the top, but most never need to. The same applies to dietary tags ('vegan' becomes 'vegano' / 'vegetarisch' / 'ヴィーガン' depending on language), to error messages, to 'add to cart' buttons, to receipts. Every UI string in 35 languages, not just menu content.\n\nFor RTL languages — Arabic and Persian — the entire layout flips properly: text aligns right, menus open from the right, prices appear after the dish name as expected. This isn't a CSS hack, it's full RTL support that makes Arabic and Persian guests feel served, not retrofitted.",
    benefitsHeading: "Why a real multilingual menu beats a PDF translation",
    benefits: [
      "35 languages with proper UI translation — not just menu items",
      "Auto-detects guest's phone language — no taps required",
      "Manual language switcher for guests who prefer another language",
      "Full RTL support for Arabic and Persian — not a CSS hack",
      "Each language has its own URL — Google indexes 35 versions of your site",
      "Switch a dish description in your native language — translations follow",
    ],
  },

  pricing: {
    heading: "One plan.",
    headingAccent: "All 35 languages included.",
    sub: "Multilingual menu, AI translation, QR ordering and reservations — all in one flat price. No per-language fees, no extras for RTL.",
  },

  faq: {
    sub: "Everything restaurant owners ask about a multilingual menu. Don't see yours? Ping us on WhatsApp — real humans reply.",
    items: [
      {
        q: "How many languages does the menu support?",
        a: "35 languages including English, Spanish, German, French, Italian, Portuguese, Dutch, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Greek, Turkish, Russian, Ukrainian, Lithuanian, Latvian, Estonian, Finnish, Swedish, Norwegian, Danish, Icelandic, Catalan, Irish Gaelic, Arabic, Persian, Japanese, Korean, and Chinese. UI strings are professionally translated for every one.",
      },
      {
        q: "How do customers switch languages?",
        a: "Two ways: automatic (the menu opens in their phone's language) and manual (a language selector at the top of the menu). 80% of tourists never touch the manual selector — auto-detect just works because their phone already knows their language.",
      },
      {
        q: "Do you support right-to-left languages like Arabic and Persian?",
        a: "Yes, with full RTL layout. The entire menu flips: text aligns to the right, columns reverse, navigation drawers open from the right side, prices appear after dish names. This is real RTL support implemented at the layout level, not just CSS direction tricks.",
      },
      {
        q: "Will Google index my menu in all 35 languages?",
        a: "Yes. Each language has its own URL slug (e.g., /es, /fr, /de), proper hreflang tags, localized meta titles and descriptions, and language-specific structured data. Google treats each language as a separate page for that locale, which means tourists searching for your restaurant in their language are more likely to find you.",
      },
      {
        q: "What if I don't want all 35 languages — just my main markets?",
        a: "Pick which languages are active. If you're a beach restaurant in Greece serving mostly British, German and Italian tourists, enable just English, German and Italian — the rest don't appear in the language selector or auto-detection. You can always enable more later as your tourist mix changes.",
      },
    ],
  },

  finalCta: {
    heading: "Every tourist's phone language.",
    headingAccent: "Already supported.",
    sub: "Serve a multilingual menu in 35 languages, including RTL Arabic and Persian. 14-day free trial, no credit card, no per-language fees.",
  },
};
