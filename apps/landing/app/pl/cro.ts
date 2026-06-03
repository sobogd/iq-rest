import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restauracje","Kawiarnie","Bary","Pizzerie"],
    title: "Twoja restauracja,",
    titleAccent: "w pełni cyfrowa w 5 minut.",
    sub: "Kompletna platforma do prowadzenia nowoczesnej restauracji — piękna, wszystko w jednym miejscu, bez wiedzy technicznej.",
  },

  heroMicrocopy: "{count} restauracji · 14 dni za darmo · Bez karty",
  seeIncluded: "Zobacz, co zawiera",

  trust: [
    { kind: "num", value: 35, label: "Języki" },
    { kind: "text", value: "24/7", label: "Rezerwacje" },
    { kind: "num", value: 5, suffix: " min", label: "Start" },
    { kind: "count", label: "Restauracje" },
  ],

  bundle: {
    heading: "Wszystko, na czym działa twoja restauracja.",
    headingAccent: "W jednej aplikacji.",
    sub: "Menu, kuchnia i rezerwacje w jednym miejscu — nowocześnie, szybko i z myślą o tym, jak naprawdę pracują restauracje. Bez dodatków, bez opłat za funkcję.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu cyfrowe", title: "Menu, które sprzedaje.", bullets: ["35 języków z AI","Premium design","Ceny od razu aktualne"], image: "/landing/feature-design.webp", imageAlt: "Dwa telefony na stoliku w kawiarni: ekran powitalny menu cyfrowego i strona kontaktu z mapą" },
    { Icon: ChefHat, tag: "Ekran kuchni", title: "Gotuj szybciej, nic nie przeocz.", bullets: ["Na żywo na ekranie","Notatki i alergeny","Tablet lub telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na barze pokazujący ekran kuchni z zamówieniami według stolika" },
    { Icon: CalendarCheck, tag: "Rezerwacje", title: "Rezerwacje na autopilocie.", bullets: ["Samodzielna rezerwacja","Automatyczne potwierdzenie","Kalendarz po stolikach"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dwa tablety pokazujące kalendarz rezerwacji: widok dzienny po stolikach i widok miesięczny" },
    { Icon: Receipt, tag: "Zamówienia przy stoliku", title: "Zamówienia prosto do kuchni.", bullets: ["Gość lub kelner","Prosto do kuchni","Włącz, kiedy chcesz"], image: "/landing/feature-orders.webp", imageAlt: "Kelner przyjmuje zamówienie przy stoliku telefonem, trafia ono na ekran kuchni" },
  ],

  seeDetails: "Zobacz szczegóły",

  extras: {
    heading: "I cała reszta w zestawie.",
    items: [
      { Icon: ScanLine, label: "AI cyfryzuje papierowe menu w 60 sekund" },
      { Icon: QrCode, label: "Unikalny kod QR dla każdego stolika" },
      { Icon: Smartphone, label: "Bez aplikacji dla gości — otwiera się w przeglądarce" },
      { Icon: Globe, label: "Własna domena z SSL" },
      { Icon: BarChart3, label: "Analizy sprzedaży: przychód, topowe dania, godziny" },
      { Icon: Palette, label: "Etykiety alergenów i diet do filtrowania" },
    ],
  },

  midCta: {
    heading: "Jedna aplikacja zamiast pięciu.",
    sub: "Koniec żonglowania osobnymi narzędziami do menu, kuchni i rezerwacji — wszystko w jednym miejscu, na każdym telefonie lub tablecie, bez instalacji.",
  },

  how: {
    heading: "Gotowe w 5 minut",
    sub: "Cztery kroki. Bez instalacji, bez technicznej konfiguracji, bez karty.",
    steps: [
      { n: "1", t: "Typ i nazwa", d: "Typ lokalu i nazwa — to cała rejestracja." },
      { n: "2", t: "Zaloguj się", d: "E-mail lub Google. Bez karty." },
      { n: "3", t: "Dodaj menu", d: "Wpisz je lub pozwól AI zeskanować papierowe menu." },
      { n: "4", t: "Działasz", d: "Menu, kuchnia i rezerwacje — gotowe." },
    ],
  },
};
