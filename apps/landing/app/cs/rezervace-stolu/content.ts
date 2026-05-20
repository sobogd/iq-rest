import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "rezervace-stolu",
  trackPrefix: "l_cs_bookings",

  meta: {
    title: "Rezervace stolů 24/7 pro restaurace | IQ Rest",
    description:
      "Rezervace stolů 24/7 pro restaurace: hosté si rezervují sami přes QR menu nebo web. Kalendář podle stolu, automatická potvrzení a připomínky. Ani jeden zmeškaný host. 14 dní zdarma.",
    canonical: "https://iq-rest.com/cs/rezervace-stolu",
    ogLocale: "cs_CZ",
    ogTitle: "Rezervace stolů 24/7 — hosté si rezervují sami",
    ogDescription:
      "Hosté rezervují stoly přes QR menu nebo web. Kalendář, automatická potvrzení, připomínky. Ani jeden zmeškaný host.",
    brandLine: "IQ Rest — Rezervace stolů pro restaurace",
  },

  hero: {
    headline: "Rezervace stolů 24/7 — hosté si rezervují sami.",
    sub: "Hosté rezervují stoly přes QR menu nebo přímý odkaz. Kalendář podle stolu, automatická potvrzení a připomínky. Ani jeden zmeškaný host a žádné telefonáty ve špičce.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hosteska spravuje rezervace z tabletu u vchodu do restaurace",
  },

  scan: {
    heading: "Spusťte rezervaci stolů",
    headingAccent: "za 5 minut.",
    sub: "Připojte kalendář, přidejte stoly s fotkami a kapacitou — hosté začnou rezervovat ještě týž den.",
    cta: "Aktivovat rezervace",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Rezervační formulář",
      heading: "Hosté si rezervují sami — podle data, času a počtu osob.",
      body: "Host otevře QR menu nebo přímý odkaz, vybere datum, čas a počet osob — a okamžitě vidí dostupné stoly, každý s fotkou, popisem (terasa, u okna, lavice u baru) a kapacitou. Potvrzení se odesílá automaticky e-mailem a na WhatsApp.",
      bullets: [
        "Výběr stolu podle fotky, popisu a kapacity.",
        "Automatické potvrzení a připomínka hodinu před návštěvou.",
        "Minimum polí ve formuláři: jméno, telefon, počet osob.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Host rezervuje stůl restaurace z telefonu: datum, čas, počet osob a výběr stolu" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Kalendář rezervací",
      heading: "Kalendář podle dne a stolu — vše na jeden pohled.",
      body: "Administrační panel zobrazuje kalendář rezervací rozdělený podle stolu, dne, týdne a měsíce. Volné sloty, obsazené stoly, potvrzené a nepotvrzené rezervace na jedné obrazovce. Funguje na tabletu v sále i na notebooku v kanceláři.",
      bullets: [
        "Pohledy den, týden a měsíc.",
        "Rozdělení podle stolu: kdo, kdy, kolik hostů.",
        "Přesunutí, zrušení nebo potvrzení rezervace jedním ťuknutím z telefonu.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Kalendář rezervací v administračním panelu IQ Rest na dvou tabletech: denní Gantt podle stolů a měsíční pohled" },
    },
  ],

  faq: {
    sub: "Co se restauratéři ptají na rezervaci stolů v IQ Rest. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
    items: [
      { q: "Můžu si vybrat, ve které dny a hodiny je možné rezervovat?", a: "Ano. Administrační panel umožňuje nastavit otevírací dobu a dostupné dny v týdnu — systém nedostupné sloty hostům nezobrazí. Můžete uzavřít konkrétní datum (firemní akce, soukromá rezervace) nebo dočasně vypnout celý kalendář." },
      { q: "Můžu nahrát fotku pro každý stůl?", a: "Ano. Každý stůl může mít fotku, popis (terasa, u okna, lavice u baru) a kapacitu. Host vidí přesný stůl, který rezervuje, a vybírá informovaně — to snižuje neuspokojená očekávání." },
      { q: "Můžu vypnout rezervace na konkrétní dny?", a: "Ano. Kalendář umožňuje zavřít konkrétní data (svátky, soukromé akce, rekonstrukce) nebo celé dny v týdnu. V těchto dnech hosté vidí zprávu „rezervace dočasně nedostupná“." },
      { q: "Můžu si nastavit, která pole se od hosta vybírají?", a: "Ano. Výchozí sada: jméno, telefon, e-mail, počet osob. Můžete přidat vlastní pole (příležitost, alergie, zvláštní požadavky) nebo odebrat nepotřebná, aby byl formulář co nejkratší." },
      { q: "Můžu omezit počet hostů na stůl?", a: "Ano. Každý stůl má nastavení „kapacita“ — systém nedovolí rezervovat stůl pro 2 osoby pro 6. U větších stolů můžete nastavit minimum, aby malé skupiny nezabíraly „stůl pro osm“ větším společnostem." },
      { q: "Jak těžké je nastavení rezervací?", a: "Trvá to velmi málo. Tři kroky: (1) přidat stoly se jmény, fotkami a kapacitou, (2) zapnout režim rezervací v nastavení, (3) sdílet odkaz nebo QR kód s hosty. Plné spuštění za 5–10 minut." },
      { q: "Můžu systém rezervací použít na vlastní doméně?", a: "Ano. Podporujeme vlastní doménu s SSL certifikátem: hosté rezervují na adrese vaší restaurace (např. rezervace.vaserestaurace.cz). Pomáháme s nastavením DNS; proces trvá 5–10 minut." },
      { q: "Můžu nastavit automatické nebo ruční potvrzení?", a: "Ano, režim se nastaví v nastavení. U automatického potvrzení host dostane potvrzení ihned po odeslání formuláře a rezervace se považuje za přijatou. U ručního potvrzení dorazí požadavek do administračního panelu se stavem „čeká na potvrzení“ — manažer ji projde a potvrdí nebo zamítne. Ruční režim je užitečný při omezeném počtu stolů nebo přísné politice." },
      { q: "Berete provizi z rezervací?", a: "Ne. Rezervace stolů je plně zahrnutá v tarifu Pro — žádné procento z hostů, žádný poplatek za slot, žádné provize agregátorů. Pevný měsíční poplatek a neomezený počet rezervací." },
    ],
  },
};
