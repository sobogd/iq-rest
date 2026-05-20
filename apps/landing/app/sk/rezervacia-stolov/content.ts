import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "rezervacia-stolov",
  trackPrefix: "l_sk_bookings",

  meta: {
    title: "Rezervácia stolov 24/7 pre reštaurácie | IQ Rest",
    description:
      "Rezervácia stolov 24/7 pre reštaurácie: hostia si rezervujú sami cez QR menu alebo web. Kalendár podľa stola, automatické potvrdenia a pripomienky. Ani jeden zmeškaný hosť. 14 dní zadarmo.",
    canonical: "https://iq-rest.com/sk/rezervacia-stolov",
    ogLocale: "sk_SK",
    ogTitle: "Rezervácia stolov 24/7 — hostia si rezervujú sami",
    ogDescription:
      "Hostia rezervujú stoly cez QR menu alebo web. Kalendár, automatické potvrdenia, pripomienky. Ani jeden zmeškaný hosť.",
    brandLine: "IQ Rest — Rezervácia stolov pre reštaurácie",
  },

  hero: {
    headline: "Rezervácia stolov 24/7 — hostia si rezervujú sami.",
    sub: "Hostia rezervujú stoly cez QR menu alebo priamy odkaz. Kalendár podľa stola, automatické potvrdenia a pripomienky. Ani jeden zmeškaný hosť a žiadne telefonáty v špičke.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hosteska spravuje rezervácie z tabletu pri vchode do reštaurácie",
  },

  scan: {
    heading: "Spustite rezerváciu stolov",
    headingAccent: "za 5 minút.",
    sub: "Pripojte kalendár, pridajte stoly s fotografiami a kapacitou — hostia začnú rezervovať ešte v ten istý deň.",
    cta: "Aktivovať rezervácie",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Rezervačný formulár",
      heading: "Hostia si rezervujú sami — podľa dátumu, času a počtu osôb.",
      body: "Hosť otvorí QR menu alebo priamy odkaz, vyberie dátum, čas a počet osôb — a okamžite vidí dostupné stoly, každý s fotografiou, popisom (terasa, pri okne, lavica pri bare) a kapacitou. Potvrdenie sa odosiela automaticky e-mailom a na WhatsApp.",
      bullets: [
        "Výber stola podľa fotografie, popisu a kapacity.",
        "Automatické potvrdenie a pripomienka hodinu pred návštevou.",
        "Minimum polí vo formulári: meno, telefón, počet osôb.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Hosť rezervuje stôl reštaurácie z telefónu: dátum, čas, počet osôb a výber stola" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Kalendár rezervácií",
      heading: "Kalendár podľa dňa a stola — všetko na jeden pohľad.",
      body: "Administračný panel zobrazuje kalendár rezervácií rozdelený podľa stola, dňa, týždňa a mesiaca. Voľné sloty, obsadené stoly, potvrdené a nepotvrdené rezervácie na jednej obrazovke. Funguje na tablete v sále aj na notebooku v kancelárii.",
      bullets: [
        "Pohľady deň, týždeň a mesiac.",
        "Rozdelenie podľa stola: kto, kedy, koľko hostí.",
        "Presunutie, zrušenie alebo potvrdenie rezervácie jedným ťuknutím z telefónu.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Kalendár rezervácií v administračnom paneli IQ Rest na dvoch tabletoch: denný Gantt podľa stolov a mesačný pohľad" },
    },
  ],

  faq: {
    sub: "Čo sa reštaurátori pýtajú o rezervácii stolov v IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Môžem si vybrať, v ktoré dni a hodiny je možná rezervácia?", a: "Áno. Administračný panel umožňuje nastaviť otváraciu dobu a dostupné dni v týždni — systém nezobrazí hosťom nedostupné sloty. Môžete zatvoriť konkrétny dátum (firemná akcia, súkromná rezervácia) alebo dočasne vypnúť celý kalendár." },
      { q: "Môžem nahrať fotografiu pre každý stôl?", a: "Áno. Každý stôl môže mať fotografiu, popis (terasa, pri okne, lavica pri bare) a kapacitu. Hosť vidí presný stôl, ktorý rezervuje, a robí informované rozhodnutie — to znižuje neuspokojené očakávania." },
      { q: "Môžem vypnúť rezervácie na konkrétne dni?", a: "Áno. Kalendár umožňuje zatvoriť konkrétne dátumy (sviatky, súkromné akcie, rekonštrukcie) alebo celé dni v týždni. V týchto dňoch hostia vidia správu „rezervácia dočasne nedostupná“." },
      { q: "Môžem si nastaviť, ktoré polia sa od hosťa zbierajú?", a: "Áno. Predvolená sada: meno, telefón, e-mail, počet osôb. Môžete pridať vlastné polia (príležitosť, alergie, špeciálne požiadavky) alebo odstrániť nepotrebné, aby bol formulár čo najkratší." },
      { q: "Môžem obmedziť počet hostí na stôl?", a: "Áno. Každý stôl má nastavenie „kapacita“ — systém nedovolí rezervovať stôl pre 2 osoby pre 6. Na väčších stoloch môžete nastaviť minimum, aby malé skupiny nezaberali „stôl pre osem“ väčším spoločnostiam." },
      { q: "Ako ťažké je nastavenie rezervácií?", a: "Trvá to veľmi krátko. Tri kroky: (1) pridať stoly s názvami, fotografiami a kapacitou, (2) zapnúť režim rezervácií v nastaveniach, (3) zdieľať odkaz alebo QR kód s hosťami. Plné spustenie za 5–10 minút." },
      { q: "Môžem rezervačný systém použiť na vlastnej doméne?", a: "Áno. Podporujeme vlastnú doménu s SSL certifikátom: hostia rezervujú na adrese vašej reštaurácie (napr. rezervacia.vasarestauracia.sk). Pomáhame s nastavením DNS; proces trvá 5–10 minút." },
      { q: "Môžem nastaviť automatické alebo manuálne potvrdenie?", a: "Áno, režim sa nastaví v nastaveniach. Pri automatickom potvrdení hosť dostane potvrdenie hneď po odoslaní formulára a rezervácia sa považuje za prijatú. Pri manuálnom potvrdení požiadavka dorazí do administračného panela so stavom „čaká na potvrdenie“ — manažér ju prejde a potvrdí alebo zamietne. Manuálny režim je užitočný pri obmedzenom počte stolov alebo prísnej politike." },
      { q: "Beriete províziu z rezervácií?", a: "Nie. Rezervácia stolov je plne zahrnutá v tarife Pro — žiadne percento z hostí, žiadny poplatok za slot, žiadne provízie agregátorov. Pevný mesačný poplatok a neobmedzený počet rezervácií." },
    ],
  },
};
