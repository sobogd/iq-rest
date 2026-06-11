import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "objednavkovy-system-restauracia",
  trackPrefix: "l_sk_orders",

  meta: {
    title: "Objednávkový systém pre reštauráciu — hosť a čašník | IQ Rest",
    description:
      "Objednávky v reštaurácii z telefónu alebo tabletu: plán sály, delenie účtu, statusy, varianty a poznámky. Hostia objednávajú pri stole; čašník prijíma objednávky z akéhokoľvek zariadenia. 14 dní zadarmo.",
    canonical: "https://iq-rest.com/sk/objednavkovy-system-restauracia",
    ogLocale: "sk_SK",
    ogTitle: "Objednávkový systém pre reštauráciu — hosť a čašník",
    ogDescription:
      "Hosť pri stole alebo čašník na telefóne — objednávka dorazí okamžite do kuchyne. Plán sály, delenie účtu, statusy, varianty a poznámky.",
    brandLine: "IQ Rest — Objednávkový systém pre reštauráciu",
  },

  hero: {
    headline: "Prijímanie objednávok: hosť a čašník — rovno do kuchyne.",
    cta: "Nastaviť online objednávky",
    sub: "Hostia objednávajú cez QR menu pri stole alebo čašník prijíma objednávku z telefónu či tabletu — objednávka dorazí na kuchynský displej za pár sekúnd. Plán sály s farebne označenými stolmi, delenie účtu, flexibilné varianty a komentáre. Žiadne bloky, žiadne cesty k baru.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Čašník prijíma objednávku pri stole zo smartfónu — objednávka dorazí na kuchynský displej",
  },

  scan: {
    heading: "Nastavte objednávkový systém",
    headingAccent: "za 5 minút.",
    sub: "Nahrajte papierové menu alebo PDF — AI rozpozná jedlá, ceny a kategórie. Pripojte tablet v sále a začnite prijímať objednávky pri stoloch.",
    cta: "Skenovať menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Zoznam a plán sály",
      heading: "Zoznam objednávok vedľa plánu sály.",
      body: "Všetky aktívne objednávky vpravo: status, súčet, čas, počet položiek. Vľavo — plán sály: stoly farebne podľa stavu — voľný, obsadený, vyžaduje pozornosť. Ťuknite na stôl a otvoríte alebo vytvoríte objednávku; ťuknite na kartu a otvorí sa detail. Žiadne prepínanie medzi obrazovkami.",
      bullets: [
        "Plán sály: stoly farebne podľa stavu objednávky.",
        "Zoznam objednávok vedľa — súčet, čas, počet položiek.",
        "Ťuknite na stôl pre otvorenie alebo vytvorenie objednávky.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet pri čašníckej stanici: zoznam objednávok a plán sály s farebnými stolmi" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Karta objednávky",
      heading: "Karta objednávky: statusy, duplikácia, mazanie — jedno ťuknutie.",
      body: "Každá položka má svoj status (Čaká / Pripravuje sa / Hotové / Podané) — kuchyňa aj čašník vidia rovnaký obraz v reálnom čase. Ťuknutie na bodku otvorí menu akcií: zmena statusu, duplikácia položky s rovnakými modifikátormi a variantmi, zmazanie. Všetko v rámci karty.",
      bullets: [
        "Status na položku: Čaká / Pripravuje sa / Hotové / Podané.",
        "Duplikujte položku jedným ťuknutím s rovnakými variantmi.",
        "Zmažte položku priamo z karty.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet s detailnou kartou objednávky: statusy položiek, akcie duplikácie a mazania" },
    },
    {
      icon: Receipt,
      eyebrow: "Rozdeliť účet",
      heading: "Rozdeľte účet, keď hostia platia zvlášť.",
      body: "Hostia sa rozhodli rozdeliť — zaškrtnite položky, ktoré idú na nový bloček; zvyšok zostáva na aktuálnom. Systém okamžite zobrazí oba súčty. Jedno ťuknutie na „Rozdeliť objednávku“ a máte dve samostatné objednávky so správnymi súčtami, obe stále priradené k svojim stolom.",
      bullets: [
        "Vyberte položky na rozdelenie zaškrtávacími políčkami.",
        "Oba súčty sa zobrazia okamžite.",
        "Jedno ťuknutie a objednávka je rozdelená bez ručného počítania.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet na stole reštaurácie: modálne okno rozdelenia účtu medzi hosťami" },
    },
    {
      icon: Smartphone,
      eyebrow: "Pridanie z telefónu",
      heading: "Pridajte položky z telefónu — v troch krokoch.",
      body: "Čašník nie je viazaný na jedno zariadenie: otvorí prijímanie objednávok na svojom telefóne a pridá položku v troch krokoch — kategória, jedlo, varianty (veľkosť, prepečenie, extra omáčka alebo prísada). Cena sa prepočíta automaticky. Poznámka pre kuchyňu je v poslednom kroku.",
      bullets: [
        "Tri kroky: kategória → jedlo → varianty.",
        "Varianty (veľkosť, doplnky, extra) s cenou jedným kliknutím.",
        "Pole poznámky v poslednom kroku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Štyri telefóny s krokmi pridania položky objednávky: kategória, jedlo, veľkosť, komentár" },
    },
  ],

  faq: {
    sub: "Čo sa reštaurátori pýtajú o prijímaní objednávok v IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Môže pracovať niekoľko čašníkov súčasne z rôznych zariadení?", a: "Áno. Každý čašník sa prihlási do zdieľaného účtu reštaurácie zo svojho telefónu alebo tabletu — všetci vidia rovnaké stoly, objednávky a statusy v reálnom čase. Zmeny jedného čašníka sa zobrazia ostatným okamžite, bez konfliktov a uzamknutí." },
      { q: "Môžu čašníci používať vlastné zariadenia (BYOD)?", a: "Áno. Je to webová aplikácia v prehliadači — nie je čo inštalovať. Čašník otvorí odkaz, prihlási sa do účtu reštaurácie zo svojho iPhonu, Androidu alebo osobného tabletu a začne pracovať. Na konci zmeny sa jednoducho odhlási." },
      { q: "Možno k jedlám pridať povinné varianty (veľkosť, prepečenie atď.)?", a: "Áno. Každé jedlo môže mať ľubovoľný počet skupín variantov — povinné (napr. „Veľkosť“: Malá / Stredná / Veľká) a voliteľné („Prepečenie“: krvavé / medium / dobre prepečené). Varianty môžu meniť cenu (+1,00 €). Ak je skupina povinná, systém nedovolí hosťovi ani čašníkovi pridať jedlo bez výberu." },
      { q: "Môžu hostia pridať poznámky alebo extra k jedlu (pečivo, omáčka)?", a: "Áno. Posledný krok pridania má pole pre voľnú poznámku („bez cibule“, „dobre prepečené“, „alergia na orechy“). Extra sú samostatné platené modifikátory („+ BBQ omáčka +1,50 €“, „+ Pečivo +2,00 €“). Poznámky sa zobrazujú na kuchynskom displeji, farebne zvýraznené." },
      { q: "Sú k dispozícii štatistiky objednávok?", a: "Áno. Sekcia analytiky zobrazuje: tržby podľa dňa a hodiny, priemerný účet, top jedlá, konverzia hosť → objednávka, rýchlosť obsluhy (čas od Čaká po Podané). Pomáha to plánovať zmeny, nákupy a odhaliť slabo predávané jedlá." },
      { q: "Môžu sa objednávky rozdeliť alebo presunúť medzi stolmi?", a: "Áno, obidva scenáre sú podporované. Na rozdelenie — zaškrtnite položky, ktoré idú na nový bloček (pre hostí platiacich zvlášť). Na presun — otvorte kartu objednávky, vyberte nový stôl; celá objednávka sa presunie. Bez ručného počítania, bez opustenia panela." },
    ],
  },
};
