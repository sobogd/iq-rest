import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sl",
  slug: "kuhinjski-zaslon",
  trackPrefix: "l_sl_kds",

  meta: {
    title: "Kuhinjski zaslon (KDS) za restavracije | IQ Rest",
    description:
      "Kuhinjski zaslon (KDS) za restavracije: naročila iz dvorane in QR jedilnika prispejo takoj na zaslon kuharja. Stolpci po mizi, statusi Čaka / V pripravi / Pripravljeno / Postreženo, filtri po območju. Deluje na tablici ali telefonu.",
    canonical: "https://iq-rest.com/sl/kuhinjski-zaslon",
    ogLocale: "sl_SI",
    ogTitle: "Kuhinjski zaslon (KDS) — Naročila na zaslonu kuharja",
    ogDescription:
      "Naročila iz dvorane na zaslonu kuharja. Stolpci po mizi, statusi in časomer. En dotik spremeni status.",
    brandLine: "IQ Rest — Kuhinjski zaslon",
  },

  hero: {
    headline: "Kuhinjski zaslon: naročila neposredno na zaslon kuharja.",
    cta: "Nastavi kuhinjski zaslon",
    sub: "Papirnati listki niso več potrebni. Naročila iz dvorane ali QR jedilnika prispejo takoj na kuhinjski zaslon — z opombami, alergeni in časomerom. En dotik spremeni status. Deluje na tablici pri izdajnem oknu ali na pametnem telefonu v žepu kuharja.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionalna kuhinja s tablico na medenem stojalu, ki prikazuje kuhinjski zaslon z aktivnimi naročili",
  },

  scan: {
    heading: "Nastavite kuhinjski zaslon",
    headingAccent: "v 5 minutah.",
    sub: "Naložite papirnati jedilnik ali PDF — AI prepozna jedi, kategorije in alergene. Povežite tablico v kuhinji in začnite prejemati naročila.",
    cta: "Skeniraj jedilnik",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Krmilniki in filtri",
      heading: "Več zaslonov po območju: kuhinja in šank.",
      body: "Postavite ločene tablice ob vročo linijo, šank ali slaščičarsko postajo — vsak zaslon prikazuje samo jedi, ki pripadajo njej. Filtri po statusu (Čaka / V pripravi / Pripravljeno / Postreženo) in kategoriji odstranijo šum: kuhar vidi le tisto, kar je relevantno za njegovo postajo.",
      bullets: [
        "Več KDS zaslonov s filtri po kategoriji.",
        "Filter statusa: prikaži samo V pripravi in Pripravljeno.",
        "Vsako območje vidi samo svoj tok naročil.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablica na medenem stojalu pri izdajnem oknu kuhinje — KDS s filtrom statusa" },
    },
    {
      icon: Timer,
      eyebrow: "Kartice in časomer",
      heading: "En dotik spremeni status. Opombe in alergeni poudarjeni z barvami.",
      body: "Kartica jedi prikazuje izbrane možnosti (brez čebule, dobro pečeno), opombo gosta, alergene in časomer od trenutka, ko je bilo naročilo oddano. Dotaknite se kartice in status preide na naslednjega: Čaka → V pripravi → Pripravljeno → Postreženo. Seznam se samodejno razvrsti po prednosti.",
      bullets: [
        "Dotik kartice — takojšnja sprememba statusa.",
        "Možnosti, opombe in alergeni poudarjeni z barvami.",
        "Razvrščanje po prednosti: postavke, ki čakajo dlje, gredo navzgor.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablica na medenem stojalu na šankovskem pultu — KDS s karticami naročil po mizi" },
    },
  ],

  faq: {
    sub: "Kaj gostinci vprašajo o kuhinjskem zaslonu v IQ Rest. Ne najdete svojega vprašanja? Pišite nam na WhatsApp.",
    items: [
      { q: "Kakšni statusi jedi obstajajo v kuhinji?", a: "Štirje statusi z različnimi barvami kartic: Čaka (siva) — naročilo je sprejeto in čaka; V pripravi (oranžna) — jed se pripravlja; Pripravljeno (modra) — pripravljeno za serviranje; Postreženo (zelena) — predano gostu. Dotik kartice jo premakne v naslednji status, brez menijev ali potrditev." },
      { q: "Ali lahko zaganjam več KDS zaslonov v različnih območjih?", a: "Da. Ena tablica ob vroči liniji, druga ob šanku, tretja ob slaščičarni — vsaka s svojim filtrom kategorije. Vsi zasloni so sinhronizirani v realnem času: status, spremenjen na enem zaslonu, se posodobi povsod." },
      { q: "Kakšno strojno opremo potrebujem za zagon KDS?", a: "KDS je spletna aplikacija, ki deluje v vsakem sodobnem brskalniku. Velika kuhinja — tablica na medenem stojalu ob izdajnem oknu ali televizor na steni. Manjši lokal — pametni telefon kuharja. Brez posebne strojne opreme, brez namestitve: odprite povezavo in se prijavite v račun." },
      { q: "Od kod prihajajo naročila na kuhinjski zaslon?", a: "Iz vseh virov: gost, ki je naročil prek QR jedilnika pri mizi; natakar, ki je sprejel naročilo s svojega telefona; gost, ki je oddal naročilo s spletne strani. Vsi prispejo na KDS z oznako vira in številko mize. Brez ročnih prenosov iz POS." },
      { q: "Kaj se prikazuje na kartici naročila?", a: "Ime jedi, izbrani modifikatorji (brez čebule, dobro pečeno, dodaj omako), komentar gosta, poudarjeni alergeni, status (Čaka / V pripravi / Pripravljeno / Postreženo) in časomer, ki prikazuje, kako dolgo jed čaka. Kartice so razvrščene po prednosti: dlje ko traja čakanje, višje v stolpcu." },
      { q: "Ali lahko filtriram kartice na zaslonu?", a: "Da. Dva filtra: po statusu (npr. prikaži samo Čaka in V pripravi, skrij Postreženo) in po kategoriji (samo pijače ob šanku, samo glavne jedi v kuhinji). Nastavitve se shranijo po napravi — vsako območje ohrani svoj niz." },
    ],
  },
};
