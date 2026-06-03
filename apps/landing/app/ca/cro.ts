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
    verticals: ["Restaurants","Cafeteries","Bars","Pizzeries"],
    title: "El teu restaurant,",
    titleAccent: "100% digital en 5 minuts.",
    sub: "La plataforma completa per gestionar un restaurant modern — bonica, tot en un sol lloc i sense coneixements tècnics.",
  },

  heroMicrocopy: "{count} restaurants · 14 dies gratis · Sense targeta",
  seeIncluded: "Mira què inclou",

  trust: [
    { kind: "num", value: 35, label: "Idiomes" },
    { kind: "text", value: "24/7", label: "Reserves" },
    { kind: "num", value: 5, suffix: " min", label: "Engegada" },
    { kind: "count", label: "Restaurants" },
  ],

  bundle: {
    heading: "Tot el que mou el teu restaurant.",
    headingAccent: "En una sola app.",
    sub: "Carta, cuina i reserves en un sol lloc — modern, ràpid i pensat per a com funcionen de debò els restaurants. Sense extres, sense pagament per funció.",
  },

  benefits: [
    { Icon: Languages, tag: "Carta digital", title: "Una carta que ven.", bullets: ["35 idiomes amb IA","Disseny premium","Preus a l'instant"], image: "/landing/feature-design.webp", imageAlt: "Dos mòbils a la taula d'un cafè: la pantalla de benvinguda de la carta digital i la pàgina de contacte amb un mapa" },
    { Icon: ChefHat, tag: "Pantalla de cuina", title: "Cuina més ràpid, sense errades.", bullets: ["En directe a la pantalla","Notes i al·lèrgens","Tauleta o mòbil"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tauleta a la barra mostrant la pantalla de cuina amb comandes per taula" },
    { Icon: CalendarCheck, tag: "Reserves", title: "Reserves en pilot automàtic.", bullets: ["Reserva sense trucades","Confirmació automàtica","Calendari per taula"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dues tauletes mostrant el calendari de reserves: vista diària per taula i vista mensual" },
    { Icon: Receipt, tag: "Comandes a taula", title: "Comandes directes a la cuina.", bullets: ["Client o cambrer","Directe a la cuina","Activa-ho quan vulguis"], image: "/landing/feature-orders-map.webp", imageAlt: "Tauleta amb la pantalla de comandes: llista de comandes i plànol de sala amb taules per colors." },
  ],

  seeDetails: "Mira els detalls",

  extras: {
    heading: "I tota la resta inclosa.",
    items: [
      { Icon: ScanLine, label: "La IA digitalitza la teva carta en paper en 60 segons" },
      { Icon: QrCode, label: "Un codi QR únic per a cada taula" },
      { Icon: Smartphone, label: "Sense app per als clients: s'obre al navegador" },
      { Icon: Globe, label: "El teu propi domini amb SSL" },
      { Icon: BarChart3, label: "Analítiques de vendes: ingressos, plats top, hores" },
      { Icon: Palette, label: "Etiquetes d'al·lèrgens i dietes per filtrar" },
    ],
  },

  midCta: {
    heading: "Una app en lloc de cinc.",
    sub: "Sense fer malabars amb eines separades per a la carta, la cuina i les reserves — tot en un sol lloc, en qualsevol mòbil o tauleta i sense instal·lar res.",
  },

  how: {
    heading: "A punt en 5 minuts",
    sub: "Quatre passos. Sense instal·lacions, sense configuració tècnica, sense targeta.",
    steps: [
      { n: "1", t: "Tipus i nom", d: "Tipus de local i nom — això és tot el registre." },
      { n: "2", t: "Inicia sessió", d: "Correu o Google. Sense targeta." },
      { n: "3", t: "Afegeix la carta", d: "Escriu-la o deixa que la IA escanegi la teva carta en paper." },
      { n: "4", t: "Ja estàs en línia", d: "Carta, cuina i reserves — a punt." },
    ],
  },
};
