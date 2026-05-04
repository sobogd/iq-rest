import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Online objednávky cez QR menu — reštauračné objednávky bez provízie",
    description:
      "Prijímajte priame objednávky z vášho QR menu. Nulová provízia, žiadny podiel pre Uber Eats / Glovo. Hostia skenujú, objednávajú, platia — priamo k vám. 14-dňová skúšobná verzia zadarmo.",
    canonical: "https://iq-rest.com/sk/online-orders",
    ogLocale: "sk_SK",
    ogTitle: "Online objednávky bez provízie — priame objednávky z vášho QR menu",
    ogDescription:
      "Nahraďte 30 % provízie doručovacích aplikácií priamymi objednávkami. Hostia skenujú QR, objednávajú, platia — každý cent ide k vám. 14-dňová skúšobná verzia zadarmo, bez karty.",
  },

  hero: {
    title: "Priame objednávky. Nulová provízia. Rovno do kuchyne.",
    subtitle:
      "Prestaňte platiť 30 % Uber Eats, Glovu a Woltu. S IQ Rest hostia naskenujú QR, zostavia objednávku v telefóne a tiket dorazí do vašej kuchyne — každý cent zostáva u vás.",
    trustLine: "4.9 · 500+ reštaurácií v 30+ krajinách",
  },

  seo: {
    description:
      "Premeňte svoje QR menu na plnohodnotný systém online objednávok bez toho, aby ste odovzdávali 30 % doručovacím aplikáciám. Hostia skenujú váš QR kód, prechádzajú menu vo svojom jazyku, zostavujú košík, odosielajú objednávku — a vy ju okamžite dostávate s číslom stola. Žiadne sťahovanie aplikácií, žiadne provízie, žiadny sprostredkovateľ medzi vami a hosťom.",
    fullDescription:
      "Väčšina reštaurácií prichádza o peniaze ešte predtým, než jedlo opustí kuchyňu — Uber Eats si berie 30 %, Glovo si berie 30 %, Wolt si berie 30 %. Online objednávky cez IQ Rest fungujú úplne inak. Objednávka ide priamo z telefónu hosťa do vášho dashboardu a celá marža je vaša.\n\nUX objednávok je postavený špeciálne pre využitie v reštaurácii: hostia si vyberú stôl, prechádzajú menu, pridajú položky do košíka, nechajú odkaz pre kuchyňu a odošlú. Nové objednávky vidíte v reálnom čase v telefóne alebo na kuchynskej obrazovke, s číslom stola, položkami, modifikátormi a poznámkami. Označíte jedlá ako hotové, stôl vidí stav — a šetríte serverom desiatky ciest za zmenu.\n\nFunguje aj na takeaway a pickup: hostia skenujú QR nálepku pri vchode, zadajú objednávku a zaplatia — nepotrebujete samostatnú objednávkovú aplikáciu, samostatný web ani projekt integrácie Stripe.",
    benefitsHeading: "Prečo priame objednávky cez IQ Rest porazia doručovacie aplikácie",
    benefits: [
      "Nulová provízia z každej objednávky — ponecháte si 100 % príjmov",
      "Objednávky letia do dashboardu s číslom stola v reálnom čase",
      "Žiadna aplikácia pre hostí — naskenujú váš QR a objednajú v prehliadači",
      "Modifikátory, komentáre, diétne poznámky — všetko čisto zachytené",
      "Funguje pre stolovanie, takeaway aj pickup — jedno menu, tri toky",
      "Vstavané upsell prompty zvyšujú priemernú hodnotu objednávky",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Nulová provízia.",
    sub: "Priame objednávky, QR menu, web reštaurácie a rezervácie — všetko v cene. Žiadne poplatky za objednávku, žiadny projekt integrácie Stripe.",
  },

  faq: {
    sub: "Všetko, na čo sa majitelia reštaurácií pýtajú ohľadom online objednávok. Nevidíte ten svoj? Napíšte nám na WhatsApp — odpovedajú skutoční ľudia.",
    items: [
      {
        q: "Beriete si províziu z objednávok?",
        a: "Nulovú. Každá objednávka z vášho QR menu ide priamo k vám — žiadny podiel pre nás, žiadne poplatky pre Glovo / Uber Eats. Jeden paušálny mesačný predplatné, to je všetko. Matematika je jednoduchá: ak máte 5 000 €/mesiac v objednávkach cez doručovacie aplikácie, strácate 1 500 €. Prejdite na priame objednávky a tých 1 500 € vám zostane vo vrecku.",
      },
      {
        q: "Ako hostia zadávajú objednávku — potrebujú aplikáciu?",
        a: "Žiadnu aplikáciu. Hostia naskenujú váš QR kód kamerou telefónu, menu sa otvorí v prehliadači, vyberú stôl, prechádzajú, pridajú do košíka a odošlú. Celý proces sú dve ťuknutia po naskenovaní. Žiadne hľadanie v App Store, žiadna registrácia, žiadne trenie.",
      },
      {
        q: "Ako prijímam objednávky v kuchyni?",
        a: "Objednávky sa objavujú okamžite v dashboarde, s číslom stola, položkami, modifikátormi a prípadnými poznámkami. Zobrazte ich v telefóne, na tablete pri prechode alebo na kuchynskej obrazovke. Označte položky ako hotové a stôl vidí stav — menej otázok 'už mi nesú?', rýchlejšie obrátky.",
      },
      {
        q: "Môžu hostia platiť cez QR menu, alebo len pri stole?",
        a: "Oboje. Môžu odoslať a zaplatiť hotovo alebo kartou pri stole klasickým spôsobom, alebo platiť online cez Stripe priamo z menu. Vy rozhodujete, čo je povolené. Online platby zabezpečuje Stripe — IQ Rest peniaze nikdy nedrží, idú priamo na váš Stripe účet.",
      },
      {
        q: "Funguje to pre takeaway a pickup, nielen pre stolovanie?",
        a: "Áno. Nalepte QR nálepku pri vchode pre takeaway alebo zdieľajte odkaz na menu na Instagrame a WhatsApp. Hostia zvolia 'pickup', objednajú, zaplatia — vy pripravíte, oni si vyzdvihnú. Rovnaký systém, tri rôzne toky objednávok: stolovanie, takeaway, pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Prestaňte kŕmiť doručovacie aplikácie.",
    headingAccent: "Začnite si nechávať 100 %.",
    sub: "Nahraďte svoje 30 % provízie paušálnym mesačným poplatkom. 14-dňová skúšobná verzia zadarmo. Žiadna kreditná karta. Zrušte kedykoľvek.",
  },
};
