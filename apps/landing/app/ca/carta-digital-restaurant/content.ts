import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "carta-digital-restaurant",
  trackPrefix: "l_ca_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Carta digital per a restaurants | IQ Rest",
    description:
      "Carta digital per a restaurants: carta en línia amb fotos, al·lèrgens, traducció IA i actualitzacions de preus en directe. 14 dies gratis, sense targeta.",
    canonical: "https://iq-rest.com/ca/carta-digital-restaurant",
    ogLocale: "ca_ES",
    ogTitle: "Carta digital per a restaurants",
    ogDescription:
      "Versió en línia de la teva carta en paper — fotos, al·lèrgens, traducció IA, actualitzacions en temps real.",
    brandLine: "IQ Rest — Carta digital per a restaurants",
  },

  hero: {
    headline: "Una carta digital\nque ho té tot",
    cta: "Crear menú digital",
    sub: "Fotos, al·lèrgens i traducció a 35 idiomes. A més de comandes, WhatsApp i reserva de taula — tot en un sol IQ Rest.",
  },

  scan: {
    heading: "Tens una carta en paper o un PDF?",
    headingAccent: "La IA la digitalitza en 60 segons.",
    sub: "Puja una foto o un document — la IA reconeix categories, plats i preus automàticament.",
    cta: "Escaneja la carta",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Traducció IA",
      heading: "Carta en 35 idiomes",
      body: "Un QR, 35 idiomes. La IA tradueix amb context culinari, així cada plat sona natural. Els turistes demanen amb confiança.",
      bullets: [
        "35 idiomes al teu pla",
        "IA culinària, no Google",
        "Canvi d'idioma amb un toc",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos clients llegint la mateixa carta digital en idiomes diferents als seus mòbils" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Al·lèrgens",
      heading: "Al·lèrgens i dietes als plats",
      body: "Etiqueta gluten, lactosa, fruita seca, vegà i sense gluten. Els clients filtren la carta segons la seva dieta i demanen amb facilitat.",
      bullets: [
        "14 categories d'al·lèrgens",
        "Etiquetes vegà i sense gluten",
        "Els clients filtren per dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "El client filtra la carta per al·lèrgens al mòbil mentre el propietari edita la llista d'al·lèrgens a una tauleta" },
    },
    {
      icon: Palette,
      eyebrow: "Disseny i marca",
      heading: "Carta premium al teu domini",
      body: "Pantalla de benvinguda amb vídeo, el teu propi disseny i una pàgina de contacte amb mapa i xarxes — al teu propi domini, no un PDF.",
      bullets: [
        "Vídeo i disseny premium",
        "El teu domini amb SSL",
        "Contactes, mapa i xarxes",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos mòbils en una taula de cafeteria: pantalla d'inici de la carta amb fons de vídeo i pàgina de contacte amb mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comandes",
      heading: "Comandes en línia, zero comissió",
      body: "Els clients demanen des de la carta o directament al teu WhatsApp — arriba a la sala o la cuina, amb un 0% tret de les vendes.",
      bullets: [
        "Des de la carta o WhatsApp",
        "A sala o cuina, 0%",
        "Activa-ho a la configuració",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos mòbils en una taula: carret amb comanda i confirmació d'enviament" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reserves",
      heading: "Reserva de taula, 24/7",
      body: "Els clients reserven taula sols des de la carta o un enllaç, tu veus el calendari per taula i confirmes automàtic o manual.",
      bullets: [
        "Els clients reserven sols",
        "Calendari per taules",
        "Confirmació auto i manual",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gestió",
      heading: "Gestiona-ho des d'on vulguis",
      body: "El panell d'administració va a qualsevol navegador — mòbil, tauleta o PC. Res per instal·lar, i una carta bàsica es publica en minuts.",
      bullets: [
        "Qualsevol dispositiu i navegador",
        "Res per instal·lar",
        "Publica en minuts",
      ],
    },
  ],

  faq: {
    sub: "El que els restauradors pregunten sobre la carta digital d'IQ Rest. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
    items: [
      { q: "Necessito coneixements tècnics o experiència amb CMS?", a: "No, no calen coneixements especials. Cada acció al panell d'administració és per clic i arrossegar — sense codi. Afegir un article a la carta triga uns segons: nom, preu, foto. La configuració completa d'una carta sol ser de 30 minuts a una hora." },
      { q: "Què és la carta digital d'IQ Rest?", a: "IQ Rest és una plataforma al núvol per a restaurants. La carta digital és la versió en línia de la teva carta, disponible per als clients via codi QR o enllaç directe: fotos de plats, preus, al·lèrgens, traducció IA en 35 idiomes, actualitzacions en temps real. La carta s'hostatja als nostres servidors; no cal instal·lar ni mantenir programari — només cal obrir un navegador." },
      { q: "Els clients necessiten una app o maquinari especial?", a: "No. Els clients apunten la càmera del mòbil al codi QR i la carta s'obre al navegador. El panell d'administració del restaurant també funciona a qualsevol navegador modern — mòbil, tauleta o portàtil. Els codis QR s'imprimeixen a qualsevol impressora d'oficina." },
      { q: "Puc allotjar la carta al meu propi domini?", a: "Sí. Donem suport a un domini personalitzat amb certificat SSL — els clients veuen la carta a l'adreça del teu restaurant (per exemple carta.elteurestaurant.cat). T'ajudem amb la configuració del DNS; sol trigar entre 5 i 10 minuts." },
      { q: "Puc gestionar diversos restaurants des d'un sol compte?", a: "Sí, sota petició. Un compte pot allotjar diversos restaurants: cada local amb la seva carta, disseny, codis QR i analítica. Escriu-nos per WhatsApp i activarem el mode multi-restaurant per al teu grup." },
      { q: "Com de difícil és configurar la carta des de zero?", a: "La configuració consta de tres passos: (1) crear categories; (2) afegir els articles amb noms, preus i fotos; (3) imprimir els codis QR per a les taules. Si ja tens una carta en paper o un PDF, puja'l — la IA reconeixerà categories, noms i preus i omplirà les fitxes automàticament. Una carta bàsica pot publicar-se en 5 minuts; el temps total depèn del nombre d'articles." },
      { q: "Quin tipus de suport oferiu?", a: "Estem disponibles per WhatsApp en horari laboral i responem ràpidament per correu. T'ajudem amb la configuració inicial, la del domini, el disseny de la carta i qualsevol situació no estàndard. Si necessites una demo o suport directe durant el llançament — escriu-nos." },
    ],
  },
};
