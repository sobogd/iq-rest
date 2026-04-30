import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
    ogDescription: "Karta QR, bezpośrednie zamówienia, rezerwacje i tłumaczenie AI. Gotowe w 2 minuty. 14 dni za darmo — bez karty.",
  },

  ctaText: "Zacznij za darmo →",
  demoText: "Zobacz demo",
  microcopy: "14 dni za darmo · Bez karty · Anuluj kiedy chcesz",

  header: {
    navFeatures: "Funkcje",
    navHow: "Jak to działa",
    navPricing: "Cennik",
    navFaq: "FAQ",
    signIn: "Zaloguj",
    cta: "Zacznij za darmo →",
  },

  hero: {
    verticals: ["Restauracje", "Kawiarnie", "Bary", "Hotele", "Pizzerie"],
    variants: [
      {
        headline: "Przestań drukować karty.",
        headlineAccent: "Przestań oddawać 30% aplikacjom dostawy.",
        sub: "Karta QR, bezpośrednie zamówienia, rezerwacje i wielojęzyczna strona. Gotowe w 2 minuty — bez karty kredytowej.",
      },
      {
        headline: "Twoja restauracja zasługuje na więcej niż",
        headlineAccent: "papierową kartę i nieodebrane telefony.",
        sub: "Bezpośrednie zamówienia, błyskawiczne aktualizacje karty i rezerwacje 24/7. Konfiguracja w 2 minuty.",
      },
      {
        headline: "Jeden kod QR.",
        headlineAccent: "Zero prowizji. Koniec papieru.",
        sub: "Karta QR, zamówienia online i rezerwacje — wszystko w jednym. 14 dni za darmo, bez karty.",
      },
      {
        headline: "Odbieraj zamówienia bezpośrednio.",
        headlineAccent: "Pomiń prowizję.",
        sub: "Goście skanują, zamawiają i płacą — prosto do ciebie, bez działki Pyszne.pl. Gotowe w 2 minuty.",
      },
      {
        headline: "Więcej zamówień. Więcej rezerwacji.",
        headlineAccent: "Bez papieru, bez aplikacji.",
        sub: "Karta QR + rezerwacje + strona wielojęzyczna na autopilocie. 14 dni testów za darmo.",
      },
      {
        headline: "Turyści nie czytają karty?",
        headlineAccent: "Załatwione w 2 minuty.",
        sub: "AI tłumaczy całą kartę na 35 języków. Plus zamówienia QR i rezerwacje w cenie.",
      },
      {
        headline: "Z papierowej karty na kod QR,",
        headlineAccent: "zanim wystygnie kawa.",
        sub: "Karta QR, bezpośrednie zamówienia i rezerwacje 24/7. Gotowe w 2 minuty — bez karty.",
      },
      {
        headline: "Odświeżająco prosta karta QR.",
        headlineAccent: "Cicho potężna w środku.",
        sub: "Bezpośrednie zamówienia, tłumaczenie AI, rezerwacje i strona — jednym kliknięciem na telefonie.",
      },
    ],
    painBullets: [
      "Bez druku — zmieniaj ceny natychmiast",
      "Zero prowizji — zamówienia prosto do ciebie",
      "Bez nieodebranych telefonów — rezerwacje 24/7",
      "35 języków — nigdy nie tracisz turysty",
    ],
    rating: "4,9 · ponad 500 restauracji w 30+ krajach",
  },

  features: {
    heading: "Wszystko, czego potrzebujesz.",
    headingAccent: "Nic zbędnego.",
    sub: "Stworzone dla restauracji. Używane przy stoliku.",
    items: [
      { Icon: ScanLine, title: "Zatrzymaj 100% każdego zamówienia", desc: "Goście skanują, zamawiają i płacą — prosto do ciebie. Bez pobierania aplikacji, bez 30% dla dostawy. Każde zamówienie trafia w czasie rzeczywistym do panelu z numerem stolika." },
      { Icon: Languages, title: "Sprzedawaj turystom w ich języku", desc: "Jednym kliknięciem przetłumaczysz całą kartę na 35 języków. AI rozumie kontekst kulinarny — goście zamawiają więcej, gdy faktycznie rozumieją danie." },
      { Icon: CalendarCheck, title: "Nie traać rezerwacji w trakcie gotowania", desc: "Goście rezerwują 24/7, bez telefonów. Auto- lub ręczne potwierdzenie, przypomnienia mailem — mniej no-show, zero stresu." },
      { Icon: Palette, title: "Niezapomniane w 1 sekundę", desc: "Wrzuć film z kuchni albo zdjęcie dania jako tło karty. Goście przestają scrollować. Twoja marka zostaje." },
      { Icon: Smartphone, title: "Aktualizuj w sekundach, nie w dniach", desc: "Zmień ceny, zamień zdjęcia, dodaj danie dnia — z telefonu, między stolikami. Na żywo dla gości natychmiast. Koniec z drukowaniem." },
      { Icon: ListPlus, title: "Jak umiesz pisać SMS, umiesz to obsłużyć", desc: "Stuknij, by dodać danie. Przeciągnij, by zmienić kolejność. Wyłącz to, co się skończyło. Bez instrukcji, bez tutoriali, bez krzywej uczenia." },
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
    heading: "Online w mniej niż 2 minuty",
    sub: "Cztery krótkie kroki. Bez instalacji, bez konfiguracji.",
    steps: [
      { n: "1", t: "Zarejestruj się", d: "Email lub Google. Bez karty. Gotowe w 10 sekund." },
      { n: "2", t: "Nazwa restauracji", d: "Wpisz nazwę. Pojawi się na górze karty." },
      { n: "3", t: "Dodaj pierwsze danie", d: "Kategoria, nazwa, cena, zdjęcie. Tyle." },
      { n: "4", t: "Wybierz tło i wydrukuj QR", d: "Wybierz tło. Pobierz QR. Naklej na stoliki." },
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
      { q: "Czy mogę zarządzać kilkoma restauracjami z jednego konta?", a: "Tak. Plan Pro pozwala na kilka restauracji w jednym koncie — osobne karty, osobne kody QR, osobne statystyki, jeden login. Przełączasz między nimi w dwa stuknięcia." },
      { q: "Jak szybko mogę zmieniać ceny i dodawać dania?", a: "Natychmiast. Zmieniasz cenę na telefonie, goście widzą w sekundach. Nowe danie? Stuknij, wpisz, zdjęcie, gotowe — bez druku, bez czekania na grafika." },
      { q: "Ile języków obsługujecie?", a: "35 języków z wbudowanym tłumaczeniem AI. Jedno kliknięcie tłumaczy całą kartę, a AI rozumie kontekst kulinarny — nazwy i opisy brzmią naturalnie w każdym języku. Turyści zamawiają więcej, gdy faktycznie rozumieją." },
    ],
  },

  finalCta: {
    heading: "Gotowe w 2 minuty.",
    headingAccent: "Za darmo przez 14 dni.",
    sub: "Bez karty. Anuluj kiedy chcesz. Dołącz do 500+ restauracji już na IQ Rest.",
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
    legalLinks: [
      { href: "/pl/terms", label: "Regulamin" },
      { href: "/pl/privacy", label: "Polityka prywatności" },
      { href: "/pl/cookies", label: "Cookies" },
      { href: "/sitemap.xml", label: "Mapa strony" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Wszelkie prawa zastrzeżone.",
  },
};
