import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "pl",
  htmlDir: "ltr",

  meta: {
    title: "Menu QR dla restauracji — Bezpośrednie zamówienia, zero prowizji | IQ Rest",
    description:
      "Kompleksowa platforma dla restauracji: cyfrowe menu, zamówienia QR, rezerwacja stolików i ekran kuchenny. Uruchomienie w 5 minut. 14 dni za darmo, bez karty.",
    canonical: "https://iq-rest.com/pl",
    ogLocale: "pl_PL",
    ogTitle: "Menu QR dla restauracji — Bezpośrednie zamówienia, zero prowizji",
    ogDescription:
      "Cyfrowe menu, zamówienia QR, rezerwacja stolików i tłumaczenie AI. Uruchomienie w 5 minut. 14 dni za darmo.",
  },

  ctaText: "Zacznij za darmo",
  homeCtaText: "Zbuduj swoją platformę",
  demoText: "Zobacz demo",
  microcopy: "14 dni za darmo · Bez karty · Anuluj w każdej chwili",

  header: {
    navFeatures: "Funkcje",
    navHow: "Jak to działa",
    navPricing: "Cennik",
    navFaq: "FAQ",
    signIn: "Zaloguj się",
    cta: "Stwórz menu",
  },

  hero: {
    verticals: ["Restauracje", "Kawiarnie", "Bary", "Hotele", "Pizzerie"],
    headline: "Cyfrowe menu dla restauracji. Online w 5 minut.",
    sub: "Cyfrowe menu dla Twojej restauracji w 5 minut. Wszystko w pakiecie: edytor bez kodu, rozpoznawanie menu AI, kody QR dla stolików i bezpośrednie zamówienia bez prowizji.",
    dynamicHeadlines: ["0% prowizji.", "35 języków AI.", "Zamówienia online.", "Rezerwacje 24/7.", "Premium design."],
    painBullets: [
      "0% prowizji: każde zamówienie trafia bezpośrednio do Twojej restauracji.",
      "Tłumaczenie AI na 35 języków — turyści rozumieją menu i zamawiają więcej.",
      "Rezerwacja 24/7: goście sami rezerwują stoliki, bez telefonów w godzinach szczytu.",
      "Elastyczne ceny: zmiany w menu pojawiają się online w kilka sekund.",
    ],
    rating: "Ponad 500 restauracji w ponad 30 krajach",
  },

  features: {
    heading: "Wszystko, czego potrzebujesz.",
    headingAccent: "Nic zbędnego.",
    sub: "Stworzone dla restauracji. Używane codziennie przy stoliku, w kuchni i na sali.",
    items: [
      { Icon: Monitor, title: "Cyfrowe menu", desc: "Menu w przeglądarce ze zdjęciami, cenami, alergenami i opisami. Aktualizuje się w czasie rzeczywistym z telefonu. Goście widzą menu w swoim języku; restauracja oszczędza na druku.", tag: "Cyfrowe menu", href: "/pl/cyfrowe-menu-restauracja" },
      { Icon: Receipt, title: "Przyjmowanie zamówień: gość i kelner", desc: "Kod QR na stoliku dla gościa lub kelner przyjmuje zamówienie z telefonu — oba trafiają bezpośrednio do kuchni lub WhatsApp. Bez prowizji, z numerem stolika na każdym rachunku.", tag: "Zamówienia", href: "/pl/system-zamowien-restauracja" },
      { Icon: CalendarCheck, title: "Rezerwacja stolików 24/7", desc: "Goście sami rezerwują stoliki przez stronę lub menu QR, podczas gdy Ty jesteś zajęty na sali. Kalendarz wg stolika, automatyczne potwierdzenia i przypomnienia. Ani jednego straconego gościa.", tag: "Rezerwacja", href: "/pl/rezerwacja-stolikow" },
      { Icon: ChefHat, title: "Ekran kuchenny (KDS)", desc: "Papierowe rachunki nie są już potrzebne. Zamówienia z sali trafiają bezpośrednio na ekran szefa kuchni — kolumny „przygotowywane / gotowe / podane“, alergeny i notatki wyróżnione kolorem. Na tablecie lub telefonie.", tag: "KDS", href: "/pl/ekran-kuchenny" },
    ],
  },

  founder: {
    eyebrow: "Zbudowane przez restauratorów",
    quoteStart:
      "Z żoną prowadziliśmy własną kawiarnię i z pierwszej ręki wiemy, jak naprawdę wygląda dzień w restauracji — przyjmowanie zamówień, rezerwacje, przepływ sali i kuchni. Chcieliśmy jednego narzędzia: nowoczesnego, łatwego do uruchomienia i czytelnego od pierwszego wejrzenia —",
    quoteAccent: "tak zaczęliśmy budować platformę, którą teraz rozwijamy dla innych restauratorów.",
    sign: "Bogdan Sokolov · założyciel, były właściciel kawiarni",
    photoAlt: "Bogdan Sokolov, założyciel IQ Rest",
  },

  how: {
    heading: "Online w 5 minut",
    sub: "Cztery krótkie kroki. Bez instalacji, bez konfiguracji technicznej.",
    steps: [
      { n: "1", t: "Typ i nazwa", d: "Wybierz typ lokalu i wprowadź nazwę." },
      { n: "2", t: "Zapisz", d: "Wprowadź swój email lub zaloguj się przez Google." },
      { n: "3", t: "Menu", d: "Dodaj pozycje ręcznie lub prześlij wydrukowane menu do skanowania AI." },
      { n: "4", t: "Gotowe", d: "Udostępnij link lub kod QR i zacznij przyjmować zamówienia." },
    ],
  },

  pricing: {
    badge: "Bez prowizji · Bez umów",
    heading: "Jeden plan.",
    headingAccent: "Wszystko w pakiecie.",
    sub: "Menu QR, przyjmowanie zamówień, tłumaczenie AI, strona restauracji i rezerwacja. Jedna przejrzysta opłata miesięczna.",
    monthlyLabel: "Miesięcznie",
    yearlyLabel: "Rocznie",
    saveBadge: "Oszczędź 25%",
    perMonth: "miesięcznie",
    billedAnnually: "Rozliczenie roczne: {total}",
    youSave: "Oszczędzasz {amount}",
    trust: { secure: "Bezpieczna płatność przez Stripe", noCommitment: "Bez zobowiązań", quick: "Aktywne w kilka minut", restaurants: "500+ restauracji" },
  },

  faq: {
    eyebrow: "Masz pytania?",
    heading: "Często zadawane",
    headingAccent: "pytania.",
    sub: "Co restauratorzy pytają przed rejestracją. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp — odpowiadają prawdziwi ludzie, nie bot.",
    whatsappCta: "Zapytaj na WhatsApp",
    whatsappPrefill: "Cześć, mam pytanie o IQ Rest",
    items: [
      { q: "Co obejmuje okres próbny i co dzieje się potem?", a: "Pełny dostęp do wszystkich funkcji przez 14 dni, bez karty. Po 14 dniach konto zostaje wstrzymane, jeśli nie dodano metody płatności — nigdy nie obciążamy automatycznie. Możesz dodać płatność później i kontynuować od miejsca, w którym przestałeś. Anuluj w każdej chwili jednym kliknięciem." },
      { q: "Pobieracie prowizję od zamówień?", a: "Nie. Każde zamówienie z menu QR trafia bezpośrednio do restauracji — bez procentów z naszej strony, bez opłat agregatorów. Jedna stała opłata miesięczna i nic więcej." },
      { q: "Czy goście potrzebują aplikacji, czy potrzebujemy umiejętności technicznych?", a: "Goście nie potrzebują aplikacji — kierują kamerę telefonu na kod QR i menu otwiera się w przeglądarce. Restauracje również nie potrzebują umiejętności technicznych: panel administracyjny działa w każdej nowoczesnej przeglądarce na telefonie, tablecie lub laptopie. Każda akcja jest kliknięciem i przeciąganiem, bez kodu." },
      { q: "Jak szybko zmieniają się ceny i pojawiają nowe dania?", a: "Natychmiast. Zmień cenę z telefonu — goście widzą ją w kilka sekund. Nowe danie wymaga kilku dotknięć: nazwa, cena, zdjęcie. Bez ponownego druku, bez czekania na grafika." },
      { q: "Ile języków jest obsługiwanych?", a: "35 języków z wbudowanym tłumaczeniem AI. Jedno dotknięcie i całe menu jest przetłumaczone; AI rozumie kontekst kulinarny — nazwy i opisy brzmią naturalnie w każdym języku. Turyści zamawiają z większą pewnością, gdy naprawdę rozumieją menu." },
    ],
  },

  finalCta: {
    heading: "Online w 5 minut.",
    headingAccent: "14 dni za darmo.",
    sub: "Bez karty, anuluj w każdej chwili. Dołącz do 500+ restauracji, które już używają IQ Rest.",
  },

  scan: {
    heading: "Masz menu papierowe lub PDF?",
    headingAccent: "AI zdigitalizuje je w 60 sekund.",
    sub: "Prześlij zdjęcie lub dokument — AI rozpozna kategorie, dania i ceny automatycznie.",
    cta: "Skanuj menu →",
  },

  pricingHero: {
    chips: ["Bez prowizji", "Bez umów", "14 dni za darmo"],
    heading: "Cennik.",
    headingAccent: "Bez ukrytych opłat.",
    sub: "Jedna przejrzysta opłata miesięczna. Bez procentu od zamówień i prowizji agregatorów. Anuluj subskrypcję w każdej chwili.",
    popularBadge: "Popularny",
    perMonthSuffix: "/mies.",
    whenAnnualTemplate: "rozliczenie roczne · {total} € rocznie",
    orMonthlyTemplate: "lub {price} €/mies.",
    savingsTemplate: "oszczędź {amount} € rocznie",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, zamówienia QR i tłumaczenie AI. Online w 5 minut.",
        features: [
          "Menu QR dla każdego stolika",
          "Cyfrowe menu ze zdjęciami i alergenami",
          "Tłumaczenie AI na 35 języków",
          "Zamówienia z menu (opcjonalnie)",
          "Generowanie zdjęć dań przez AI",
          "Zarządzanie z dowolnego telefonu lub tabletu",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Pełna kontrola restauracji: ekran kuchenny i rezerwacje.",
        features: [
          "Wszystko z Basic",
          "Ekran kuchenny (KDS)",
          "Rezerwacja stolików online 24/7",
          "Priorytetowe wsparcie WhatsApp",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/pl/cyfrowe-menu-restauracja", label: "Cyfrowe menu" },
      { href: "/pl/system-zamowien-restauracja", label: "Zamówienia" },
      { href: "/pl/rezerwacja-stolikow", label: "Rezerwacja" },
      { href: "/pl/ekran-kuchenny", label: "Ekran kuchenny" },
    ],
    navLinks: [
      { href: "/pl/cennik", label: "Cennik" },
      { href: "#faq", label: "FAQ" },
      { href: "/pl/languages", label: "Zmień język" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Wszelkie prawa zastrzeżone.",
  },
};
