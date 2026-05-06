import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "pl",
  htmlDir: "ltr",

  meta: {
    title: "Karta QR dla Restauracji — Bezpośrednie Zamówienia, Zero Prowizji | IQ Rest",
    description:
      "Koniec z drukowanymi kartami i prowizjami od aplikacji dostawy. Karta QR, bezpośrednie zamówienia, rezerwacje i wielojęzyczna strona. 14 dni za darmo, bez karty.",
    canonical: "https://iq-rest.com/pl",
    ogLocale: "pl_PL",
    ogTitle: "Karta QR dla Restauracji — Bezpośrednie Zamówienia, Zero Prowizji",
    ogDescription: "Karta QR, bezpośrednie zamówienia, rezerwacje i tłumaczenie AI. Gotowe w 5 minut. 14 dni za darmo — bez karty.",
  },

  ctaText: "Wypróbuj za darmo", ctaSite: "Stwórz stronę",
  demoText: "Zobacz demo",
  microcopy: "14 dni za darmo · Bez karty · Anuluj kiedy chcesz",

  header: {
    navFeatures: "Funkcje",
    navHow: "Jak to działa",
    navPricing: "Cennik",
    navFaq: "FAQ",
    signIn: "Zaloguj",
    cta: "Wypróbuj za darmo",
  },

  hero: {
    verticals: ["Restauracje", "Kawiarnie", "Bary", "Hotele", "Pizzerie"],
    qr: { headline: "Menu QR w 5 minut.", sub: "Gotowa strona dla Twojej restauracji — bez programistów i podwykonawców. Bezpośrednie zamówienia, rezerwacje i analityka gości w jednej subskrypcji." },
    web: { headline: "Strona restauracji w 5 min.", sub: "Gotowa strona dla Twojej restauracji — bez programistów i podwykonawców. Bezpośrednie zamówienia, rezerwacje i analityka gości w jednej subskrypcji." },
    dynamicHeadlines: ["0% prowizji.", "35 języków z AI.", "Zamówienia online.", "Rezerwacje 24/7.", "Design premium."],
    painBullets: ["0% prowizji: Wszystkie zamówienia trafiają bezpośrednio do Ciebie.", "Tłumaczenie AI: 35 języków dla wyższych rachunków od turystów.", "Rezerwacje 24/7: Pełna sala bez zbędnych telefonów.", "Elastyczne ceny: Aktualizuj menu w kilka sekund."],
    rating: "4,9 · ponad 500 restauracji w 30+ krajach",
  },

  features: {
    heading: "Wszystko, czego potrzebujesz.",
    headingAccent: "Nic zbędnego.",
    sub: "Stworzone dla restauracji. Używane przy stoliku.",
    items: [
      
      { Icon: ScanLine, title: "Zamówienia ze stolika", desc: "Zamówienia błyskawicznie trafiają na WhatsApp lub do panelu z numerem stolika. Szybsza obsługa.", tag: "Bezpośrednie zamówienia" },
      { Icon: Languages, title: "Tłumacz AI (35 języków)", desc: "Nasze AI zna się na gastronomii. Turyści zamawiają o 20% więcej, gdy rozumieją skład dań.", tag: "Tłumaczenie AI" },
      { Icon: CalendarCheck, title: "Rezerwacja stolików", desc: "System sam przyjmuje rezerwacje, gdy Ty pracujesz w kuchni. Żaden klient Ci nie ucieknie.", tag: "Rezerwacje" },
      { Icon: Palette, title: "Nowoczesny design", desc: "Tła wideo i soczyste zdjęcia. Twoje menu wygląda prestiżowo i budzi apetyt od razu.", tag: "Własny design" },
      { Icon: Smartphone, title: "Szybki edytor", desc: "Zarządzaj stop-listą i cenami prosto ze smartfona. Zmiany są widoczne dla gości natychmiast.", tag: "Edytor menu" },
      { Icon: ChefHat, title: "Wkrótce: Wyświetlacz kuchenny", desc: "Zapomnij o papierowych bonach. Zamówienia z sali trafiają prosto na ekran kucharza.", tag: "Wkrótce" },
    
    ],
  },

  founder: {
    eyebrow: "Zbudowane przez restauratora",
    quoteStart: "Z żoną otworzyliśmy kawiarnię i tygodniami szukaliśmy systemu, który ogarnia zamówienia online, rezerwacje i jeszcze wygląda nowocześnie. Wszystko, co próbowaliśmy, było toporne, brzydkie albo brakowało połowy funkcji —",
    quoteAccent: "więc zbudowaliśmy to, co sami chcieliśmy mieć.",
    sign: "Bogdan Sokolov · założyciel, były właściciel kawiarni",
    photoAlt: "Bogdan, założyciel IQ Rest",
  },

  how: {
    heading: "Online w mniej niż 5 minut",
    sub: "Cztery krótkie kroki. Bez instalacji, bez konfiguracji.",
    steps: [
      { n: "1", t: "Typ i nazwa", d: "Wybierz typ i wpisz nazwę." },
      { n: "2", t: "Zapis", d: "Email lub logowanie przez Google." },
      { n: "3", t: "Menu", d: "Stwórz sam lub zeskanuj papierowe." },
      { n: "4", t: "Gotowe", d: "Oglądaj, udostępniaj i przyjmuj zamówienia." },
    ],
  },

  pricing: {
    badge: "Zero prowizji · Zero umów",
    heading: "Jeden plan.",
    headingAccent: "Wszystko w cenie.",
    sub: "Karta QR, zamówienia, tłumaczenie AI, strona restauracji i rezerwacje. Jedna prosta cena.",
    monthlyLabel: "Miesięcznie",
    yearlyLabel: "Rocznie",
    saveBadge: "Oszczędź 25%",
    perMonth: "miesięcznie",
    billedAnnually: "Płatność roczna {total}",
    youSave: "Oszczędzasz {amount}",
    trust: { secure: "Bezpieczna płatność przez Stripe", noCommitment: "Bez zobowiązań", quick: "Aktywne w minuty", restaurants: "500+ restauracji" },
  },

  faq: {
    eyebrow: "Pytania?",
    heading: "Najczęściej zadawane",
    headingAccent: "pytania.",
    sub: "To, o co pytają restauratorzy przed rejestracją. Nie widzisz swojego? Napisz na WhatsAppie — odpowiadają prawdziwi ludzie.",
    whatsappCta: "Zapytaj na WhatsAppie",
    whatsappPrefill: "Cześć, mam pytanie o IQ Rest",
    items: [
      { q: "Co zawiera okres próbny i co dzieje się potem?", a: "14 dni, pełny dostęp, bez karty. Po 14 dniach konto pauzuje, jeśli nie dodasz metody płatności — nigdy nie pobieramy automatycznie. Dodaj dane płatnicze później, by reaktywować. Anulujesz jednym kliknięciem." },
      { q: "Bierzecie prowizję od zamówień?", a: "Zero. Każde zamówienie z karty QR idzie prosto do ciebie — bez naszego udziału, bez opłat Pyszne.pl / Uber Eats. Jedna stała cena miesięczna, tyle." },
      { q: "Czy goście potrzebują aplikacji? Czy ja muszę znać się na technologii?", a: "Zero aplikacji dla gości — skanują QR aparatem, karta otwiera się w przeglądarce. Zero techniki dla ciebie — cały panel działa na telefonie, stuknij by dodać danie, przeciągnij by zmienić kolejność, tyle." },
      { q: "Jak szybko mogę zmieniać ceny i dodawać dania?", a: "Natychmiast. Zmieniasz cenę na telefonie, goście widzą w sekundach. Nowe danie? Stuknij, wpisz, zdjęcie, gotowe — bez druku, bez czekania na grafika." },
      { q: "Ile języków obsługujecie?", a: "35 języków z wbudowanym tłumaczeniem AI. Jedno kliknięcie tłumaczy całą kartę, a AI rozumie kontekst kulinarny — nazwy i opisy brzmią naturalnie w każdym języku. Turyści zamawiają więcej, gdy faktycznie rozumieją." },
    ],
  },

  finalCta: {
    heading: "Gotowe w 5 minut.",
    headingAccent: "Za darmo przez 14 dni.",
    sub: "Bez karty. Anuluj kiedy chcesz. Dołącz do 500+ restauracji już na IQ Rest.",
  },

  scan: {
    heading: "Masz papierowe menu lub PDF?",
    headingAccent: "AI cyfryzuje je w 60 sekund.",
    sub: "Wgraj — AI wyodrębni kategorie, dania i ceny.",
    cta: "Zeskanuj menu →",
  },
  footer: {
    featureLinks: [
      { href: "/pl/online-orders", label: "Zamówienia online" },
      { href: "/pl/ai-translation", label: "Tłumaczenie AI" },
      { href: "/pl/reservations", label: "Rezerwacje" },
      { href: "/pl/mobile-management", label: "Zarządzanie z telefonu" },
      { href: "/pl/easy-menu", label: "Edytor karty" },
      { href: "/pl/custom-design", label: "Tła wideo i foto" },
      { href: "/pl/color-scheme", label: "Kolory marki" },
      { href: "/pl/multilingual", label: "Wielojęzyczna strona" },
      { href: "/pl/ai-images", label: "Optymalizacja zdjęć AI" },
      { href: "/pl/analytics", label: "Statystyki" },
      { href: "/pl/instant-setup", label: "Błyskawiczna konfiguracja" },
      { href: "/pl/personal-support", label: "Wsparcie osobiste" },
    ],
    navLinks: [
      { href: "#pricing", label: "Cennik" },
      { href: "#faq", label: "Pytania" },
      { href: "/pl/changelog", label: "Co nowego" },
      { href: "/pl/languages", label: "Zmień język" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Wszelkie prawa zastrzeżone.",
  },
};
