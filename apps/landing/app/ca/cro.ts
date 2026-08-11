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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurants","Cafeteries","Bars","Pizzeries"],
    title: "El teu restaurant, digital",
    titleAccent: "en 5 min",
    sub: "Carta digital, pantalla de cuina i reserves 24/7 — tot el que necessita el teu restaurant, llest en 5 minuts.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurants" },
      { icon: "cafe", label: "Cafeteries" },
      { icon: "bar", label: "Bars" },
      { icon: "pizza", label: "Pizzeries" },
    ],
    title: "Tot el que necessita",
    titleAccent: "el teu restaurant!",
    sub: "Configura els processos en 10 minuts: llança el menú en línia, optimitza la cuina i controla l'ocupació de les taules.",
    primaryLabel: "Comença gratis",
    demoLabel: "Veure demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tauleta amb la pantalla de cuina: comandes per taula en columnes amb estats" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tauleta amb el calendari de reserves: vista mensual i reserves pendents de confirmar" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Mòbil amb la pàgina principal del web d'un restaurant: foto, reserves i menú en línia" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Mòbil amb la fitxa d'un plat: foto, preu i etiquetes d'al·lèrgens" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "En marxa en 10 minuts", sub: "Sense equips cars ni configuracions llargues" },
    { Icon: MessagesSquare, title: "Suport ràpid", sub: "Responem pel xat en poques hores" },
    { Icon: Globe, title: "L'elecció de {count} locals", sub: "Restaurants i cafeteries de més de 15 països confien en nosaltres" },
    { Icon: Palette, title: "100% amb la teva marca", sub: "Adaptem el disseny i la interfície a l'estil del teu local" },
  ],

  menu: {
    heading: "Web i menú digital",
    sub: {
      link: "Més que un menú QR!",
      rest: " Aconsegueix un web complet amb disseny únic, pàgina de contacte i reserva de taules.",
    },
    moreLabel: "Saber-ne més",
    mockupAlt: "Dos mòbils: la pàgina principal del web d'un restaurant i la pàgina d'un plat",
    bullets: [
      { Icon: Languages, title: "Traducció automàtica a 35 idiomes", sub: "Atén els clients estrangers sense barrera d'idioma: la traducció automàtica ho fa tot" },
      { Icon: ClipboardList, title: "Comandes des de la taula", sub: "Simplifica el servei: rep comandes des de la taula, ràpid i sense cambrer" },
      { Icon: WheatOff, title: "Al·lèrgens i dietes", sub: "Marca al·lèrgens i preferències (vegà, picant) perquè triar sigui fàcil i segur" },
    ],
  },

  reservations: {
    heading: "Reserva de taules",
    sub: {
      link: "Reserves intel·ligents de taules!",
      rest: " Un sistema automàtic de reserves que controla tot sol les taules lliures i el teu horari.",
    },
    moreLabel: "Saber-ne més",
    mockupAlt: "Tauleta amb el calendari de reserves: taules per dia i franja horària",
    bullets: [
      { Icon: CalendarCheck, title: "Mapa de reserves clar", sub: "Un quadre visual per dies i taules: els llocs lliures es veuen d'un cop d'ull" },
      { Icon: SlidersHorizontal, title: "Configuració flexible", sub: "Defineix horaris, durada de les franges, fotos de les taules i recull peticions dels clients" },
      { Icon: Users, title: "Control del flux de clients", sub: "Tria com gestionar les reserves i controla del tot el flux de clients" },
    ],
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

  platform: {
    hardwareTitle: "Treballa amb el teu propi maquinari",
    hardwareSub: "Mai t’obliguem a comprar-nos maquinari. Fes servir els telèfons, tauletes i ordinadors que ja tens.",
    anywhereTitle: "Funciona a tot arreu",
    anywhereSub: "Mòbil, tauleta, portàtil, PC. Android, iOS, Windows, Mac, Linux. Funciona en qualsevol navegador modern, sense instal·lació.",
  },

  activities: {
    heading: "Un sol sistema,",
    headingAccent: "tot el teu restaurant.",
    sub: "Servei més ràpid, una cuina més tranquil·la, menys costos i una experiència que el client recorda — tot en una plataforma.",
    groups: [
      {
        Icon: Smartphone,
        tag: "A taula — clients",
        bullets: [
          "Carta QR en 35 idiomes",
          "Demanar sense esperar el cambrer",
          "Cridar el cambrer o demanar el compte",
          "Reservar taula 24/7",
          "Un codi QR únic per a cada taula",
          "Sense app per als clients: s'obre al navegador",
          "Etiquetes d'al·lèrgens i dietes per filtrar",
        ],
      },
      {
        Icon: ChefHat,
        tag: "A la cuina",
        bullets: [
          "Les comandes arriben a la pantalla a l’instant",
          "Columnes en preparació / a punt / servit",
          "Al·lèrgens i notes destacats",
          "Tauleta o mòbil — sense tiquets de paper",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Gestió",
        bullets: [
          "Canvis de carta i preus a l’instant",
          "Traducció amb IA amb un clic",
          "Analítiques de vendes i informes",
          "Diversos restaurants en un sol compte",
          "La IA digitalitza la teva carta en paper en 60 segons",
          "El teu propi domini amb SSL",
        ],
      },
    ],
  },
};
