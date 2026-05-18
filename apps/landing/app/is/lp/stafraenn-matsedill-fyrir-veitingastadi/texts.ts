import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /is, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /is page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Frá 6,90 €/mán · 14 dagar ókeypis · Hættu hvenær sem er",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Stafrænn matseðill fyrir veitingastaði. Tilbúinn á 5 mínútum.",
    sub: "Stafrænn matseðill fyrir veitingastaðinn þinn á 5 mínútum. Allt innifalið: farsímaritstjóri án kóða, AI matseðils-skönnun, QR-kóðar fyrir borð og beinar pantanir án þóknunar.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Konan mín og ég opnuðum kaffihús og eyddum vikum í að leita að stafrænum matseðli fyrir veitingastaði sem ræður líka við pantanir við borðið og bókanir án þess að vera klúðurslegt eða ljótt —",
    quoteAccent: "svo við smíðuðum stafræna matseðilinn sem við sjálf vildum.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "Hvað er stafrænn matseðill fyrir veitingastaði?",
        a: "Stafrænn matseðill fyrir veitingastaði er netútgáfa pappírsmatseðils: gesturinn skannar QR kóða við borðið með símanum og sér strax rétti, myndir, ofnæmisvalda og verð í vafranum — án forrits. Með IQ Rest inniheldur stafræni matseðillinn einnig beinar pantanir við borðið, bókanir 24/7 og AI þýðingu á 35 tungumál — allt uppfært í rauntíma úr símanum.",
      },
      {
        q: "Hvað kostar stafrænn matseðill fyrir veitingastaði?",
        a: "6,90 €/mánuði, allt innifalið (afsláttur á árspakka). Fullkominn ritill, ótakmarkaðir QR kóðar, beinar pantanir án þóknunar, AI þýðing á 35 tungumál, bókanir og mælingar. 14 daga ókeypis prufa, án korts.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Stafrænn matseðill fyrir veitingastaði.",
    headingAccent: "Tilbúið á 5 mínútum.",
    sub: "14 dagar ókeypis. Ekkert kort. Vertu með 500+ veitingastöðum sem reka stafræna matseðilinn á IQ Rest.",
  },

  meta: {
    title: "Stafrænn Matseðill fyrir Veitingastaði — 5 Mín | IQ Rest",
    description: "Stafrænn matseðill fyrir veitingastaði: prentanlegur QR kóði, beinar pantanir án þóknunar, AI þýðing á 35 tungumál. 5 mín, 14 dagar ókeypis.",
    canonical: "https://iq-rest.com/is/lp/stafraenn-matsedill-fyrir-veitingastadi",
    ogLocale: "is_IS",
    ogTitle: "Stafrænn Matseðill fyrir Veitingastaði — Á 5 Mínútum",
    ogDescription: "Stafrænn matseðill fyrir veitingastaði með QR kóða, beinum pöntunum og 35 AI tungumálum. Í loftinu á 5 mínútum — 14 dagar ókeypis.",
  },
};
