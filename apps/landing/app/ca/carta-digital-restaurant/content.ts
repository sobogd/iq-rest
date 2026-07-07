import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
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
      eyebrow: "35 idiomes IA",
      heading: "35 idiomes per a cada client",
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
      heading: "Al·lèrgens i dietes a cada plat",
      body: "Etiqueta gluten, lactosa, fruita seca, vegà i sense gluten. Els clients filtren la carta segons la seva dieta i demanen amb facilitat.",
      bullets: [
        "14 categories d'al·lèrgens",
        "Etiquetes vegà i sense gluten",
        "Els clients filtren per dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "El client filtra la carta per al·lèrgens al mòbil mentre el propietari edita la llista d'al·lèrgens a una tauleta" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Qualsevol dispositiu",
      heading: "Gestiona-ho des de qualsevol dispositiu",
      body: "El panell d'administració va al navegador — edita carta, preus i fotos des d'on vulguis. Res per instal·lar.",
      bullets: [
        "Va a qualsevol navegador",
        "Mòbil, tauleta o PC",
        "Res per instal·lar",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Sense comissió",
      heading: "Zero comissió, sense extres",
      body: "Una subscripció transparent. No ens quedem cap tall dels teus ingressos ni amaguem taxes — tot es queda al restaurant.",
      bullets: [
        "Zero per cent en comandes",
        "Sense extres ocults",
        "Un únic preu fix",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Domini propi",
      heading: "La carta al teu propi domini",
      body: "Connectem el teu domini amb SSL — els clients veuen la carta a l'adreça del teu restaurant. T'ajudem amb el DNS en 10 minuts.",
      bullets: [
        "El teu domini amb SSL",
        "carta.elteurestaurant.cat",
        "T'ajudem amb el DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "El teu disseny",
      heading: "Disseny flexible al teu estil",
      body: "Diverses plantilles i estils a punt — tria la portada, els colors i la presentació dels plats que van amb el teu local.",
      bullets: [
        "Diverses plantilles a punt",
        "La teva portada i colors",
        "Redissenya en uns clics",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contactes",
      heading: "Contactes i xarxes a la carta",
      body: "Una pàgina amb mapa, telèfon i enllaços a Instagram i WhatsApp — els clients et troben amb un sol toc.",
      bullets: [
        "Mapa, telèfon i adreça",
        "Instagram i WhatsApp",
        "Contacta amb un sol toc",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Comandes per WhatsApp",
      heading: "Rep comandes per WhatsApp",
      body: "Els clients munten el carret i envien la comanda directament al teu WhatsApp — sense cap app a part, al xat que ja fan servir.",
      bullets: [
        "Comanda al teu WhatsApp",
        "Sense cap app a part",
        "Xat com sempre",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reserves",
      heading: "Reserva de taula sense trucades",
      body: "Els clients reserven taula sols des de la carta o un enllaç, tu veus el calendari per taula i confirmes automàtic o manual.",
      bullets: [
        "Reserves 24/7, sense trucades",
        "Calendari per taules",
        "Confirmació auto i manual",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Disseny premium",
      heading: "Sembla un web, no un PDF",
      body: "Fons de vídeo a la pantalla de benvinguda, el teu concepte descrit i una pàgina de contacte a part amb mapa i xarxes.",
      bullets: [
        "Vídeo a la pantalla d'inici",
        "Concepte i plats descrits",
        "Pàgina de contacte a part",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos mòbils en una taula de cafeteria: pantalla d'inici de la carta amb fons de vídeo i pàgina de contacte amb mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comandes · opcional",
      heading: "Comandes directament des de la carta",
      body: "Els clients munten el carret i envien la comanda — arriba a la sala, WhatsApp o la pantalla de cuina. Opcional.",
      bullets: [
        "Carret i enviament amb un toc",
        "A sala, WhatsApp o cuina",
        "Activa-ho a la configuració",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos mòbils en una taula: carret amb comanda i confirmació d'enviament" },
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
