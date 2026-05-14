import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Viacjazyčné reštauračné menu — 35 jazykov, jedným ťuknutím",
    description:
      "Obsluhujte medzinárodných hostí v ich jazyku. Reštauračné menu v 35 jazykoch s prepínaním jedným ťuknutím. RTL podpora pre arabčinu a perzštinu. 14-dňová skúšobná verzia zadarmo.",
    canonical: "https://iq-rest.com/sk/multilingual",
    ogLocale: "sk_SK",
    ogTitle: "Web viacjazyčného reštauračného menu — 35 jazykov v základe",
    ogDescription:
      "Turisti skenujú, vidia menu vo svojom jazyku automaticky. 35 jazykov, RTL podpora, auto-detekcia z nastavení telefónu. 14-dňová skúšobná verzia zadarmo.",
  },

  hero: {
    title: "Vaše menu hovorí jazykom každého turistu.",
    subtitle:
      "Viacjazyčné reštauračné menu by nemalo byť projekt. S IQ Rest vaše QR menu auto-deteguje jazyk telefónu každého hosťa a obslúži ho v ktoromkoľvek z 35 jazykov — vrátane arabčiny a perzštiny so správnym vykreslením sprava doľava.",
    trustLine: "500+ reštaurácií v 30+ krajinách",
  },

  seo: {
    description:
      "Postavte menu raz, obsluhujte ho v 35 jazykoch. IQ Rest auto-deteguje jazyk telefónu každého hosťa a vykreslí menu v ich jazyku — žiadne ťukanie na vlajky, žiadna jazyková bariéra, žiadne trápne momenty s Google Translate. Od španielčiny a nemčiny po japončinu, arabčinu a mandarínčinu vidia vaši hostia reštauráciu tak, ako má byť videná.",
    fullDescription:
      "Väčšina 'viacjazyčných' menu sú PDF rozbitého Google Translate, vytlačené raz a nikdy neaktualizované. Viacjazyčný reštauračný web IQ Rest je skutočná i18n: každý jazyk má vlastnú riadne preloženú kópiu, vlastný URL slug, vlastné meta tagy pre indexáciu Googlom a vlastný routing vnútri menu aplikácie.\n\nKeď turista s francúzskym iPhonom naskenuje váš QR, menu sa otvorí vo francúzštine automaticky — žiadne ťuknutia, žiadne rozhodnutia. Môžu prepnúť na iný jazyk prepínačom v hornej časti, ale väčšina nemusí. To isté platí pre diétne štítky ('vegan' sa stáva 'vegano' / 'vegetarisch' / 'ヴィーガン' podľa jazyka), pre chybové hlásenia, pre tlačidlá 'pridať do košíka', pre účtenky. Každý UI reťazec v 35 jazykoch, nielen obsah menu.\n\nPre RTL jazyky — arabčinu a perzštinu — sa celý layout správne otáča: text sa zarovná vpravo, menu sa otvárajú sprava, ceny sa objavujú za názvom jedla podľa očakávania. Nie je to CSS hack, je to plná RTL podpora, ktorá robí arabských a perzských hostí obslúžených, nie dorobených.",
    benefitsHeading: "Prečo skutočné viacjazyčné menu porazí PDF preklad",
    benefits: [
      "35 jazykov so správnym prekladom UI — nielen položky menu",
      "Auto-deteguje jazyk telefónu hosťa — žiadne ťuknutie",
      "Manuálny prepínač jazykov pre hostí, ktorí preferujú iný jazyk",
      "Plná RTL podpora pre arabčinu a perzštinu — nie CSS hack",
      "Každý jazyk má vlastnú URL — Google indexuje 35 verzií vášho webu",
      "Zmeňte popis jedla v rodnom jazyku — preklady nasledujú",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Všetkých 35 jazykov v cene.",
    sub: "Viacjazyčné menu, AI preklad, QR objednávky a rezervácie — všetko v jednej paušálnej cene. Žiadne poplatky za jazyk, žiadne príplatky za RTL.",
  },

  faq: {
    sub: "Všetko, na čo sa majitelia reštaurácií pýtajú ohľadom viacjazyčného menu. Nevidíte ten svoj? Napíšte nám na WhatsApp — odpovedajú skutoční ľudia.",
    items: [
      {
        q: "Koľko jazykov menu podporuje?",
        a: "35 jazykov vrátane angličtiny, španielčiny, nemčiny, francúzštiny, taliančiny, portugalčiny, holandčiny, poľštiny, češtiny, slovenčiny, maďarčiny, rumunčiny, bulharčiny, chorvátčiny, srbčiny, slovinčiny, gréčtiny, turečtiny, ruštiny, ukrajinčiny, litovčiny, lotyštiny, estónčiny, fínčiny, švédčiny, nórčiny, dánčiny, islandčiny, katalánčiny, írskej gaelčiny, arabčiny, perzštiny, japončiny, kórejčiny a čínštiny. UI reťazce sú profesionálne preložené pre každý.",
      },
      {
        q: "Ako zákazníci prepínajú jazyky?",
        a: "Dva spôsoby: automaticky (menu sa otvorí v jazyku telefónu) a manuálne (prepínač jazykov v hornej časti menu). 80 % turistov nikdy nesiahne na manuálny prepínač — auto-detekcia funguje, pretože telefón už pozná ich jazyk.",
      },
      {
        q: "Podporujete jazyky sprava doľava ako arabčina a perzština?",
        a: "Áno, s plným RTL layoutom. Celé menu sa otáča: text sa zarovnáva vpravo, stĺpce sa otáčajú, navigačné šuflíky sa otvárajú z pravej strany, ceny sa objavujú za názvami jedál. Je to skutočná RTL podpora implementovaná na úrovni layoutu, nielen CSS direction triky.",
      },
      {
        q: "Bude Google indexovať moje menu vo všetkých 35 jazykoch?",
        a: "Áno. Každý jazyk má vlastný URL slug (napr. /es, /fr, /de), správne hreflang tagy, lokalizované meta titulky a popisy a štruktúrované dáta špecifické pre jazyk. Google každý jazyk považuje za samostatnú stránku pre daný locale, čo znamená, že turisti hľadajúci vašu reštauráciu vo svojom jazyku vás skôr nájdu.",
      },
      {
        q: "Čo ak nechcem všetkých 35 jazykov — len svoje hlavné trhy?",
        a: "Vyberte, ktoré jazyky sú aktívne. Ak ste plážová reštaurácia v Grécku obsluhujúca hlavne britských, nemeckých a talianskych turistov, povoľte len angličtinu, nemčinu a taliančinu — ostatné sa nezobrazia v prepínači jazykov ani auto-detekcii. Môžete vždy povoliť viac neskôr, keď sa mení váš turistický mix.",
      },
    ],
  },

  finalCta: {
    heading: "Jazyk telefónu každého turistu.",
    headingAccent: "Už podporovaný.",
    sub: "Obsluhujte viacjazyčné menu v 35 jazykoch, vrátane RTL arabčiny a perzštiny. 14-dňová skúšobná verzia zadarmo, žiadna kreditná karta, žiadne poplatky za jazyk.",
  },
};
