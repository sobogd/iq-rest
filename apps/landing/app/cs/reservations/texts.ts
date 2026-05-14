import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Rezervační systém pro restaurace — 24/7 rezervace stolů, žádné telefonáty",
    description:
      "Přijímejte rezervace stolů 24/7 z vašeho QR menu a webu. White-label rezervační widget, e-mailové připomenutí, méně no-show. 14denní zkušební verze zdarma.",
    canonical: "https://iq-rest.com/cs/reservations",
    ogLocale: "cs_CZ",
    ogTitle: "Restaurační rezervace — systém rezervací stolů pro restaurace 24/7",
    ogDescription:
      "Přestaňte propást rezervace, když vaříte. Hosté rezervují 24/7 z vašeho QR menu, dostávají e-mailové připomínky a vy snižujete no-show. 14denní zkušební verze zdarma.",
  },

  hero: {
    title: "Přestaňte propást rezervace, když vaříte.",
    subtitle:
      "Přijímejte rezervace stolů 24/7 — přímo z vašeho QR menu, webu a Instagramu. Hosté zvolí datum, čas a počet osob, vy potvrdíte jedním ťuknutím, e-mailové připomínky odcházejí automaticky. Méně telefonátů, méně no-show, víc krytů za večer.",
    trustLine: "500+ restaurací ve 30+ zemích",
  },

  seo: {
    description:
      "Plnohodnotný rezervační systém pro restaurace zabudovaný do vašeho QR menu. Hosté rezervují stůl z menu, vašeho webu, Instagram bio odkazu nebo tlačítka v Google Maps — kdykoli, ve dne i v noci. Nové rezervace vidíte v reálném čase, potvrdíte nebo odmítnete jedním ťuknutím a systém posílá e-mailové připomínky, které drasticky snižují no-show. Žádný podíl pro OpenTable, žádná provize za kryt, žádná smlouva.",
    fullDescription:
      "Telefonické rezervace umírají. Turisté nezavolají (jiná předvolba, jazyková bariéra), mileniálové nezavolají (textová generace) a vy ztrácíte půlku rezervací během provozu, kdy nikdo nezvedá. Rezervace IQ Rest žijí tam, kde už vaši hosté jsou: ve vašem menu, v prohlížeči jejich telefonu, v Instagram bio odkazu.\n\nRezervační tok jsou dvě obrazovky — vyberte datum a počet osob, nechte jméno a telefon, případně přidejte poznámku ('narozeniny', 'alergie: ořechy', 'vysoká židlička, prosím'). Rezervaci dostanete okamžitě s potvrzením/odmítnutím jedním ťuknutím. Potvrzení hosté dostanou automatickou e-mailovou připomínku 24 h předem, což samo o sobě snižuje no-show o ~30 %. Můžete také nastavit max. krytů na slot, blackout dny a které stoly jsou rezervovatelné vs. jen pro walk-in.\n\nNa rozdíl od OpenTable nebo TheFork tu není žádná provize za kryt, žádná samostatná aplikace ke stažení a žádný prostředník mezi vámi a hostem. Rezervace je vaše, data jsou vaše a systém je součástí vašeho předplatného — ne daň za rezervaci.",
    benefitsHeading: "Proč restaurace opouštějí OpenTable kvůli rezervacím IQ Rest",
    benefits: [
      "24/7 rezervace z QR menu, webu, Instagramu, tlačítka Google Maps",
      "Žádná provize za kryt — paušální předplatné, ponecháte si 100 % příjmů",
      "Auto e-mailové připomínky snižují no-show v průměru o ~30 %",
      "Potvrzení / odmítnutí jedním ťuknutím z telefonu, žádné čekání",
      "Max kryty na slot, blackout dny, pravidla rezervace na úrovni stolu",
      "Speciální požadavky (alergie, narozeniny) čistě zachycené u každé rezervace",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Neomezené rezervace.",
    sub: "Rezervace, QR menu, online objednávky a AI překlad — vše v jedné paušální ceně. Žádné poplatky za kryt, žádná provize, žádná smlouva.",
  },

  faq: {
    sub: "Vše, na co se majitelé restaurací ptají ohledně online rezervací. Nevidíte ten svůj? Napište nám na WhatsApp — odpovídají skuteční lidé.",
    items: [
      {
        q: "Berete si provizi z rezervace jako OpenTable nebo TheFork?",
        a: "Nulovou. Rezervace jsou součástí paušálního měsíčního předplatného — rezervujte 10 krytů denně nebo 1 000, cena je stejná. Žádný poplatek za kryt, žádná daň za rezervaci, žádný podíl z vašich příjmů. Oproti 1–2,50 € za kryt u OpenTable ušetří restaurace s 50 kryty denně 1 500–3 750 € měsíčně.",
      },
      {
        q: "Jak hosté rezervují — musí stahovat aplikaci?",
        a: "Žádnou aplikaci. Naskenují váš QR nebo kliknou na váš rezervační odkaz — datum, čas, počet osob, jméno, telefon, volitelná poznámka. Hotovo. Celý proces je pod 30 sekund a funguje v každém prohlížeči. Můžete také vložit rezervační formulář přímo na svůj web nebo sdílet čistou rezervační URL na Instagramu.",
      },
      {
        q: "Můžu rezervace potvrzovat ručně, nebo se potvrzují automaticky?",
        a: "Oba režimy — vaše volba na slot nebo den. Auto-potvrzení, pokud věříte své dostupnosti a chcete působit responzivně 24/7. Ruční potvrzení, pokud chcete rezervace prověřovat (rušné víkendy, speciální akce). Rezervaci dostanete okamžitě a potvrdíte jedním ťuknutím z telefonu.",
      },
      {
        q: "Jak systém zvládá no-show?",
        a: "Automatické e-mailové připomínky odcházejí 24 h a (volitelně) 2 h před rezervací — to samo o sobě snižuje no-show o ~30 % oproti telefonátům nebo systémům bez připomínek. Můžete také vyžadovat telefonní číslo, označit hosty jako 'no-show' v dashboardu a postupem času systém označuje opakované provinilce.",
      },
      {
        q: "Můžu omezit, kolik krytů přijmu za večer?",
        a: "Ano. Nastavte max kryty na časový slot, max kryty na den a blackout dny (zavírací dny, soukromé akce). Můžete dokonce označit konkrétní stoly jako 'rezervovatelné' vs. 'jen walk-in', takže vaše prémiová okenní místa zůstávají volná pro náhodu. Turisté i místní rezervují ze stejného systému, aniž by někdy zasahovali do vašeho plánu sálu.",
      },
    ],
  },

  finalCta: {
    heading: "Rezervace, když vaříte.",
    headingAccent: "Připomínky, aby přišli.",
    sub: "Přijímejte rezervace 24/7 z vašeho QR menu, webu a Instagramu. 14denní zkušební verze zdarma, žádná kreditní karta, žádná provize za kryt.",
  },
};
