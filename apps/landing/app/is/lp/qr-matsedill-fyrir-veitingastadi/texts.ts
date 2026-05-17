import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /is, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /is page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR matseðill fyrir veitingastaði",
    sub: "Yfir 500 veitingastaðir í 30+ löndum skipta út prentuðum matseðli fyrir QR matseðil, selja meira til ferðamanna og fjarlægja afhendingargjöld. Tilbúinn á 5 mínútum — 14 dagar ókeypis.",
    dynamicHeadlines: [],
    headlinePrefix: "QR matseðill fyrir ",
    accentWord: "veitingastaði",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Konan mín og ég opnuðum kaffihús og eyddum vikum í að leita að QR matseðli fyrir veitingastaði með borðpöntunum og bókunum án ljóts viðmóts —",
    quoteAccent: "svo við smíðuðum sjálf QR matseðilinn sem við vildum.",
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
        q: "Hvað er QR matseðill fyrir veitingastaði?",
        a: "QR matseðill fyrir veitingastaði er prentanlegur QR kóði á borðinu sem gestur skannar með myndavél símans til að opna matseðilinn í vafranum — ekkert app. Með IQ Rest inniheldur QR matseðillinn borðpantanir, bókanir 24/7 og AI þýðingu á 35 tungumál, allt uppfært úr símanum.",
      },
      {
        q: "Hvað kostar QR matseðill fyrir veitingastaði?",
        a: "6,90 €/mánuði, allt innifalið. Ótakmarkaðir QR kóðar á hvert borð, fullkomin ritstýring, beinar pantanir án umboðslauna, AI þýðing á 35 tungumál, bókanir og greiningar. 14 dagar ókeypis, ekkert kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR matseðill fyrir veitingastaði.",
    headingAccent: "Tilbúinn á 5 mínútum.",
    sub: "14 dagar ókeypis. Ekkert kort. Yfir 500 veitingastaðir nota QR matseðil á IQ Rest.",
  },

  meta: {
    title: "QR Matseðill fyrir Veitingastaði — 5 Mín | IQ Rest",
    description: "QR matseðill fyrir veitingastaði: QR kóði á hverju borði, beinar pantanir án umboðslauna, AI þýðing á 35 tungumál. Tilbúinn á 5 mínútum, 14 dagar ókeypis.",
    canonical: "https://iq-rest.com/is/lp/qr-matsedill-fyrir-veitingastadi",
    ogLocale: "is_IS",
    ogTitle: "QR Matseðill fyrir Veitingastaði — 5 Mínútur",
    ogDescription: "QR matseðill með beinum pöntunum, 35 AI tungumálum og bókunum. Tilbúinn á 5 mínútum — 14 dagar ókeypis.",
  },
};
