import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "cs", htmlDir: "ltr",
  meta: {
    title: "QR Jídelní Lístek pro Restaurace — Přímé Objednávky, Nulová Provize | IQ Rest",
    description: "Konec s tištěnými lístky a provizemi rozvozových aplikací. QR jídelní lístek, přímé objednávky, rezervace a vícejazyčný web. 14 dní zdarma, bez karty.",
    canonical: "https://iq-rest.com/cs", ogLocale: "cs_CZ",
    ogTitle: "QR Jídelní Lístek pro Restaurace — Přímé Objednávky, Nulová Provize",
    ogDescription: "QR jídelní lístek, přímé objednávky, rezervace a AI překlad. Hotovo za 2 minuty. 14 dní zdarma — bez karty.",
  },
  ctaText: "Začni zdarma →",
  demoText: "Podívat se na demo", microcopy: "14 dní zdarma · Bez karty · Zruš kdykoliv",
  header: { navFeatures: "Funkce", navHow: "Jak to funguje", navPricing: "Ceny", navFaq: "FAQ", signIn: "Přihlásit", cta: "Začni zdarma →" },
  hero: {
    verticals: ["Restaurace", "Kavárny", "Bary", "Hotely", "Pizzerie"],
    variants: [
      { headline: "Přestaň tisknout jídelní lístky.", headlineAccent: "Přestaň platit 30% rozvozovým aplikacím.", sub: "QR jídelní lístek, přímé objednávky, rezervace a vícejazyčný web. Hotovo za 2 minuty — bez karty." },
      { headline: "Tvoje restaurace si zaslouží víc než", headlineAccent: "papírový lístek a zmeškané hovory.", sub: "Přímé objednávky, okamžité úpravy lístku a rezervace 24/7. Nastaveno za 2 minuty." },
      { headline: "Jeden QR kód.", headlineAccent: "Nulová provize. Sbohem papíře.", sub: "QR jídelní lístek, online objednávky a rezervace — vše na jednom místě. 14 dní zdarma, bez karty." },
      { headline: "Příjmej přímé objednávky.", headlineAccent: "Vynech provizi.", sub: "Hosté skenují, objednávají a platí — přímo tobě, bez podílu Wolt. Hotovo za 2 minuty." },
      { headline: "Více objednávek. Více rezervací.", headlineAccent: "Bez papíru, bez aplikací.", sub: "QR lístek + rezervace + vícejazyčný web na autopilotu. 14denní zkouška zdarma." },
      { headline: "Turisté nečtou tvůj lístek?", headlineAccent: "Vyřešeno za 2 minuty.", sub: "AI překládá celý lístek do 35 jazyků. Plus QR objednávky a rezervace v ceně." },
      { headline: "Z papírové karty na QR kód,", headlineAccent: "než vychladne espresso.", sub: "QR jídelní lístek, přímé objednávky a rezervace 24/7. Hotovo za 2 minuty — bez karty." },
      { headline: "Osvěživě jednoduchý QR lístek.", headlineAccent: "Tiše silný uvnitř.", sub: "Přímé objednávky, AI překlad, rezervace a web — vše jedním klepnutím v telefonu." },
    ],
    painBullets: ["Bez tisku — měň ceny okamžitě", "Nulová provize — objednávky přímo k tobě", "Bez zmeškaných hovorů — rezervace 24/7", "35 jazyků — neztratíš turistu"],
    rating: "4,9 · přes 500 restaurací ve 30+ zemích",
  },
  features: {
    heading: "Vše co potřebuješ.", headingAccent: "Nic navíc.",
    sub: "Postaveno pro restaurace. Používá se u stolu.",
    items: [
      { Icon: ScanLine, title: "Nech si 100% z každé objednávky", desc: "Hosté skenují, objednávají a platí — rovnou tobě. Žádné aplikace ke stažení, žádný 30% podíl rozvozu. Každá objednávka přijde v reálném čase s číslem stolu do panelu." },
      { Icon: Languages, title: "Prodávej turistům v jejich jazyce", desc: "Jedno klepnutí přeloží celý lístek do 35 jazyků. AI rozumí kulinářskému kontextu — hosté objednávají víc, když chápou jídlo." },
      { Icon: CalendarCheck, title: "Neztratíš rezervaci, zatímco vaříš", desc: "Hosté rezervují 24/7, bez hovorů. Auto- nebo manuální potvrzení, e-mailové připomínky — méně neúčastí, nula stresu." },
      { Icon: Palette, title: "Nezapomenutelné za 1 sekundu", desc: "Dej video kuchyně nebo fotku jídla na pozadí lístku. Hosté přestanou scrollovat. Tvoje značka utkví." },
      { Icon: Smartphone, title: "Měň v sekundách, ne ve dnech", desc: "Změň ceny, vyměň fotky, přidej polední menu — z mobilu, mezi stoly. Živé pro hosty hned. Žádné dotisky." },
      { Icon: ListPlus, title: "Když umíš poslat WhatsApp, zvládneš to", desc: "Klepni pro přidání jídla. Táhni pro přeřazení. Vypni, co došlo. Žádné manuály, žádné tutoriály, žádná křivka učení." },
    ],
  },
  founder: {
    eyebrow: "Postaveno restauratérem",
    quoteStart: "S manželkou jsme otevřeli kavárnu a týdny jsme hledali systém, který zvládá online objednávky, rezervace a zároveň vypadá moderně. Vše co jsme zkoušeli bylo neohrabané, ošklivé nebo postrádalo polovinu funkcí —",
    quoteAccent: "tak jsme postavili to, co bychom sami chtěli mít.",
    sign: "Bogdan Sokolov · zakladatel, ex-majitel kavárny",
    photoAlt: "Bogdan, zakladatel IQ Rest",
  },
  how: {
    heading: "Spuštěno za méně než 2 minuty",
    sub: "Čtyři krátké kroky. Žádné instalace, žádná tech konfigurace.",
    steps: [
      { n: "1", t: "Registruj se", d: "E-mail nebo Google. Bez karty. Hotovo za 10 sekund." },
      { n: "2", t: "Název restaurace", d: "Napiš název. Objeví se nahoře na lístku." },
      { n: "3", t: "Přidej první jídlo", d: "Kategorie, název, cena, fotka. To je vše." },
      { n: "4", t: "Vyber pozadí a vytiskni QR", d: "Vyber pozadí. Vezmi QR. Nalep na stoly." },
    ],
  },
  pricing: {
    badge: "Nulová provize · Bez smluv",
    heading: "Jeden plán.", headingAccent: "Vše zahrnuto.",
    sub: "QR lístek, objednávky, AI překlad, web restaurace a rezervace. Jedna jednoduchá cena.",
    monthlyLabel: "Měsíčně", yearlyLabel: "Ročně", saveBadge: "Ušetři 25%", perMonth: "měsíčně",
    billedAnnually: "Roční fakturace {total}", youSave: "Ušetříš {amount}",
    trust: { secure: "Bezpečná platba přes Stripe", noCommitment: "Bez závazků", quick: "Aktivní za minuty", restaurants: "500+ restaurací" },
  },
  faq: {
    eyebrow: "Otázky?", heading: "Časté", headingAccent: "otázky.",
    sub: "Co se restauratéři ptají před registrací. Nevidíš svou? Napiš nám na WhatsApp — odpovídají skuteční lidé.",
    whatsappCta: "Zeptej se na WhatsApp", whatsappPrefill: "Ahoj, mám otázku ohledně IQ Rest",
    items: [
      { q: "Co zahrnuje zkušební doba a co potom?", a: "14 dní plný přístup, bez karty. Po 14 dnech se účet pozastaví, pokud nepřidáš platební metodu — nikdy strháváme automaticky. Přidej platbu později pro reaktivaci. Zruš jedním klepnutím." },
      { q: "Berete provizi z objednávek?", a: "Nulu. Každá objednávka z tvého QR lístku jde rovnou tobě — žádný náš podíl, žádné poplatky Wolt / Bolt Food. Jedna pevná měsíční cena, to je vše." },
      { q: "Potřebují hosté aplikaci? Potřebuji technické dovednosti?", a: "Žádné aplikace pro hosty — skenují QR fotoaparátem, lístek se otevře v prohlížeči. Žádné technické dovednosti pro tebe — celý panel funguje na mobilu, klepneš pro přidání, táhneš pro přeřazení, to je celá křivka." },
      { q: "Můžu spravovat víc restaurací z jednoho účtu?", a: "Ano. Plán Pro umožňuje víc restaurací v jednom účtu — oddělené lístky, oddělené QR, oddělená statistika, jedno přihlášení. Přepneš na dvě klepnutí." },
      { q: "Jak rychle změním ceny a přidám jídla?", a: "Okamžitě. Změň cenu na mobilu, hosté vidí během sekund. Nové jídlo? Klepni, napiš, fotka, hotovo — bez dotisků, bez čekání na grafika." },
      { q: "Kolik jazyků podporujete?", a: "35 jazyků s vestavěným AI překladem. Jedno klepnutí přeloží celý lístek a AI rozumí kulinářskému kontextu — názvy a popisy zní přirozeně v každém jazyce. Turisté objednávají víc, když opravdu rozumí." },
    ],
  },
  finalCta: { heading: "Hotovo za 2 minuty.", headingAccent: "Zdarma 14 dní.", sub: "Bez karty. Zruš kdykoliv. Připoj se k 500+ restauracím už na IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/cs/online-orders", label: "Online objednávky" }, { href: "/cs/ai-translation", label: "AI překlad" },
      { href: "/cs/reservations", label: "Rezervace" }, { href: "/cs/mobile-management", label: "Správa z mobilu" },
      { href: "/cs/easy-menu", label: "Editor lístku" }, { href: "/cs/custom-design", label: "Video a foto pozadí" },
      { href: "/cs/color-scheme", label: "Barvy značky" }, { href: "/cs/multilingual", label: "Vícejazyčný web" },
      { href: "/cs/ai-images", label: "AI optimalizace foto" }, { href: "/cs/analytics", label: "Analytika" },
      { href: "/cs/instant-setup", label: "Okamžité nastavení" }, { href: "/cs/personal-support", label: "Osobní podpora" },
    ],
    navLinks: [
      { href: "#pricing", label: "Ceny" }, { href: "#faq", label: "Otázky" },
      { href: "/cs/languages", label: "Změnit jazyk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Všechna práva vyhrazena.",
  },
};
