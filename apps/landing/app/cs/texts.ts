import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "cs", htmlDir: "ltr",
  meta: {
    title: "QR Jídelní Lístek pro Restaurace — Přímé Objednávky, Nulová Provize | IQ Rest",
    description: "Konec s tištěnými lístky a provizemi rozvozových aplikací. QR jídelní lístek, přímé objednávky, rezervace a vícejazyčný web. 14 dní zdarma, bez karty.",
    canonical: "https://iq-rest.com/cs", ogLocale: "cs_CZ",
    ogTitle: "QR Jídelní Lístek pro Restaurace — Přímé Objednávky, Nulová Provize",
    ogDescription: "QR jídelní lístek, přímé objednávky, rezervace a AI překlad. Hotovo za 5 minut. 14 dní zdarma — bez karty.",
  },
  ctaText: "Zkusit zdarma",
  demoText: "Podívat se na demo", microcopy: "14 dní zdarma · Bez karty · Zruš kdykoliv",
  header: { navFeatures: "Funkce", navHow: "Jak to funguje", navPricing: "Ceny", navFaq: "FAQ", signIn: "Přihlásit", cta: "Začít" },
  hero: {
    verticals: ["Restaurace", "Kavárny", "Bary", "Hotely", "Pizzerie"],
    headline: "Digitální menu pro restaurace. Hotové za 5 minut.",
    sub: "Digitální menu pro vaši restauraci za 5 minut. Vše v ceně: mobilní editor bez kódu, AI skenování menu, QR kódy pro stoly a přímé objednávky bez provizí.",
    dynamicHeadlines: ["0% provize.", "35 jazyků s AI.", "Online objednávky.", "Rezervace 24/7.", "Prémiový design."],
    painBullets: ["Provize 0%: Všechny objednávky jdou přímo vám.", "AI překlad: 35 jazyků pro vyšší útraty od turistů.", "Rezervace 24/7: Plná obsazenost bez zbytečných hovorů.", "Flexibilní ceny: Aktualizujte menu během pár sekund."],
    rating: "Přes 500 restaurací ve 30+ zemích",
  },
  features: {
    heading: "Vše co potřebuješ.", headingAccent: "Nic navíc.",
    sub: "Postaveno pro restaurace. Používá se u stolu.",
    items: [
      
      { Icon: QrCode, title: "Objednávky od stolu", desc: "Objednávky okamžitě přicházejí do WhatsAppu nebo panelu s číslem stolu. Obsluha je rychlejší.", tag: "Přímé objednávky", href: "/cs/online-objednavkovy-system-restaurace" },
      { Icon: Languages, title: "AI překladač (35 jazyků)", desc: "Naše AI rozumí gastronomii. Turisté objednávají o 20 % více, když rozumí složení jídel.", tag: "Překlad AI" },
      { Icon: CalendarCheck, title: "Rezervace stolů", desc: "Systém sám přijímá rezervace, zatímco jste v kuchyni. Žádný ztracený zákazník.", tag: "Rezervace" },
      { Icon: Palette, title: "Moderní design", desc: "Video pozadí a lákavé fotky. Vaše menu vypadá luxusně a vzbuzuje chuť k jídlu.", tag: "Vlastní design" },
      { Icon: Smartphone, title: "Rychlý editor", desc: "Spravujte stop-list a ceny přímo z mobilu. Změny jsou hostům viditelné okamžitě.", tag: "Editor menu" },
      { Icon: ChefHat, title: "Kuchyňský displej", desc: "Zapomeňte na papírové lístky. Objednávky ze sálu jdou rovnou na obrazovku kuchaři.", tag: "Kuchyňský displej" },
    
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
    heading: "Spuštěno za méně než 5 minut",
    sub: "Čtyři krátké kroky. Žádné instalace, žádná tech konfigurace.",
    steps: [
      { n: "1", t: "Typ a název", d: "Vyber typ a zadej název." },
      { n: "2", t: "Uložení", d: "E-mail nebo přihlášení přes Google." },
      { n: "3", t: "Menu", d: "Vytvoř ručně nebo naskenuj papírové." },
      { n: "4", t: "Hotovo", d: "Prohlížej, sdílej a přijímej objednávky." },
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
      { q: "Jak rychle změním ceny a přidám jídla?", a: "Okamžitě. Změň cenu na mobilu, hosté vidí během sekund. Nové jídlo? Klepni, napiš, fotka, hotovo — bez dotisků, bez čekání na grafika." },
      { q: "Kolik jazyků podporujete?", a: "35 jazyků s vestavěným AI překladem. Jedno klepnutí přeloží celý lístek a AI rozumí kulinářskému kontextu — názvy a popisy zní přirozeně v každém jazyce. Turisté objednávají víc, když opravdu rozumí." },
    ],
  },
  finalCta: { heading: "Hotovo za 5 minut.", headingAccent: "Zdarma 14 dní.", sub: "Bez karty. Zruš kdykoliv. Připoj se k 500+ restauracím už na IQ Rest." },
  scan: {
    heading: "Papírové menu nebo PDF?",
    headingAccent: "AI ho digitalizuje za 60 sekund.",
    sub: "Nahraj — AI rozpozná kategorie, jídla a ceny.",
    cta: "Naskenovat menu →",
  },
  footer: {
    featureLinks: [
      { href: "/cs/online-objednavkovy-system-restaurace", label: "Online objednávkový systém" }, { href: "/cs/ai-translation", label: "AI překlad" },
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
