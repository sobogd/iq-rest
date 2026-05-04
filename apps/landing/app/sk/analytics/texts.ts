import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analytika reštauračného menu — QR skeny, top jedlá, turistické jazyky",
    description:
      "Vidíte presne, ako hostia používajú vaše QR menu. Denné skeny, najpozeranejšie jedlá, jazykové preferencie, špičkové hodiny. Rozhodovania založené na dátach pre vašu reštauráciu.",
    canonical: "https://iq-rest.com/sk/analytics",
    ogLocale: "sk_SK",
    ogTitle: "Reštauračná analytika — sledujte skeny QR menu, jedlá a jazyky",
    ogDescription:
      "Zistite, na ktoré jedlá sa hostia skutočne pozerajú, kedy sú špičkové hodiny a aká turistická národnosť je dnes večer vo vašej jedálni. 14-dňová skúšobná verzia zadarmo.",
  },

  hero: {
    title: "Prestaňte hádať. Vedzte, čo hostia skutočne robia.",
    subtitle:
      "Sledujte analytiku reštauračného menu v reálnom čase — QR skeny za hodinu, jedlá, na ktorých hostia zostávajú, jazyky turistov, najpomalší deň v týždni — a použite tie dáta na tlač menej menu, chytrejšie plánovanie, propagáciu správnych špecialít.",
    trustLine: "4.9 · 500+ reštaurácií v 30+ krajinách",
  },

  seo: {
    description:
      "Reštauračná analytika, ktorá nevyžaduje dátový tím. IQ Rest sleduje každý sken, prezeranie, prepnutie jazyka a objednávku z vášho QR menu a zviditeľňuje vzory, ktoré sú dôležité: najpozeranejšie jedlá, špičkové hodiny skenovania, najrušnejší deň v týždni, jazykové rozdelenie vášho turistického davu. Robte rozhodnutia založené na dátach, bez toho, aby ste otvorili tabuľku.",
    fullDescription:
      "Väčšina reštaurácií beží na intuícii — 'cítime, že utorky sú pomalé', 'myslím, že cestoviny idú dobre'. Intuícia je dobrá, ale dáta sú lepšie. IQ Rest sleduje každú interakciu s vaším QR menu, aby ste nemuseli hádať: koľkokrát bol váš QR dnes naskenovaný, na ktoré jedlá hostia najdlhšie hľadeli, ktoré jedlá pridali do košíka, ale neobjednali, aký jazyk turisti používali.\n\nDashboard analytiky zobrazuje odpovede v troch pohľadoch: dnes (živé skeny, aktuálne objednávky, čo sa práve teraz objednáva), tento týždeň (top 10 jedál, rušné hodiny, jazykové rozdelenie, no-show pri rezerváciách) a trendy (rast mesiac po mesiaci, sezónnosť, vzory dní v týždni). Môžete sa ponoriť do akéhokoľvek jedla a vidieť, ako často je prezerané vs. objednané (jedlo prezerané 200-krát, ale objednané 5-krát má problém s textom alebo fotkou), alebo do akéhokoľvek jazyka a vidieť, aký turistický mix skutočne obsluhujete.\n\nCieľom sú rozhodnutia, nie dashboardy: 'budúci utorok je historicky pomalý → spustiť happy hour push notifikáciu', 'talianski turisti objednávajú cestoviny 3-krát viac ako domáci → dajte cestoviny prvé, keď jazyk=it', 'toto jedlo má 90 % mieru prezerania, ale 5 % mieru objednania → vylepšite fotku'. Skutočné zmeny, skutočné príjmy, žiadne MBA potrebné.",
    benefitsHeading: "Prečo reštaurácie milujú analytiku IQ Rest oproti Google Analytics",
    benefits: [
      "Živý počítadlo QR skenov — vidíte, ako sa vám večer plní v reálnom čase",
      "Najpozeranejšie a najobjednávanejšie jedlá — všimnite si, čo funguje a čo nie",
      "Jazykové rozdelenie — vedzte, ktorí turisti sú vo vašej jedálni",
      "Špičkové hodiny a vzory dní — plánujte chytrejšie, pripravujte chytrejšie",
      "Konverzia prezerania na objednávku na jedlo — opravte zlé fotky a slabé popisy",
      "Analytika rezervácií — zdroje rezervácií, miera no-show, mix veľkosti skupín",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Plná analytika v cene.",
    sub: "Reštauračná analytika, QR objednávky, AI preklad a rezervácie — všetko v jednej paušálnej cene. Žiadny prémiový tier pre dáta, nikdy.",
  },

  faq: {
    sub: "Všetko, na čo sa majitelia reštaurácií pýtajú ohľadom analytiky menu. Nevidíte ten svoj? Napíšte nám na WhatsApp — odpovedajú skutoční ľudia.",
    items: [
      {
        q: "Čo vlastne môžem vidieť v dashboarde analytiky?",
        a: "Živé QR skeny (dnes, tento týždeň, tento mesiac), najpozeranejšie jedlá, najobjednávanejšie jedlá, konverziu prezerania na objednávku na jedlo, jazykové rozdelenie hostí, špičkové hodiny podľa dňa v týždni, priemernú hodnotu objednávky, najrušnejšie stoly, mieru no-show pri rezerváciách a trendy v čase. Všetko na jednom dashboarde, bez nutnosti nastavenia.",
      },
      {
        q: "Ako to skutočne použijem na rast príjmov?",
        a: "Tri vzory fungujú pre väčšinu reštaurácií: (1) preraďte menu, aby sa najlepšie konvertujúce jedlá objavovali prvé; (2) opravte fotku alebo popis pri jedlách s vysokým prezeraním, ale nízkym objednávaním; (3) propagujte happy hour alebo špecialitu v historicky pomalých dňoch/hodinách. Videli sme reštaurácie zvýšiť príjmy v týždni o 15–30 % len z týchto troch zmien.",
      },
      {
        q: "Je to anonymné, alebo sledujete jednotlivcov?",
        a: "Anonymné a agregované. Sledujeme prezerania menu a objednávky podľa session, nie podľa identifikovateľného používateľa. Žiadne e-maily, žiadne telefónne čísla, žiadne IP adresy uchovávané dlhodobo. Dashboard ukazuje vzory ('200 skenov v piatok'), nie ľudí. Plne GDPR-kompatibilné by design.",
      },
      {
        q: "Môžem dáta exportovať?",
        a: "Áno. Exportujte akýkoľvek pohľad ako CSV (top jedlá, denné skeny, hodinové rozdelenie atď.) a otvorte v Exceli alebo Google Sheets. Užitočné pre zdieľanie s investormi, účtovníkmi alebo pre kombinovanie s dátami vášho POS.",
      },
      {
        q: "Potrebujem nejaké technické nastavenie na získanie analytiky?",
        a: "Žiadne. Analytika je zapnutá v predvolenom nastavení v okamihu, keď je vaše QR menu živé — každý sken, prezeranie a objednávka sa sleduje automaticky. Dashboard je súčasťou štandardného predplatného, nie upsell, a užitočné dáta uvidíte prvý deň, keď hostia skenujú.",
      },
    ],
  },

  finalCta: {
    heading: "Prestaňte hádať.",
    headingAccent: "Začnite merať.",
    sub: "Živá analytika QR skenov, top jedlá, špičkové hodiny, jazykové rozdelenie turistov. 14-dňová skúšobná verzia zadarmo, žiadna kreditná karta.",
  },
};
