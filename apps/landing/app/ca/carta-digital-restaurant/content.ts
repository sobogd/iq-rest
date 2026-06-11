import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "carta-digital-restaurant",
  trackPrefix: "l_ca_digital",

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
    headline: "Carta digital per a restaurants.",
    cta: "Crear menú digital",
    sub: "Versió en línia de la teva carta en paper amb fotos, al·lèrgens, descripcions i actualitzacions de preus en directe. Els clients veuen la carta en la seva pròpia llengua; el restaurant estalvia en impressió.",
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
      heading: "35 idiomes IA — cada client llegeix la carta en la seva.",
      body: "Un sol codi QR, 35 idiomes. La IA gestiona el context culinari — noms i descripcions de plats sonen naturals. Els turistes demanen amb més confiança i el tiquet mitjà creix sense que un cambrer hagi de traduir cada plat.",
      bullets: [
        "35 idiomes inclosos a la subscripció, sense recàrrec.",
        "IA conscient del context culinari, no un Google Translate cru.",
        "El client canvia d'idioma amb un sol toc dins la carta.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos clients llegint la mateixa carta digital en idiomes diferents als seus mòbils" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Al·lèrgens",
      heading: "Etiquetes d'al·lèrgens i dietes.",
      body: "Marca els plats per a gluten, lactosa, fruita seca, marisc, opcions veganes i sense gluten. Els clients filtren la carta segons les seves necessitats dietètiques i demanen amb més confiança.",
      bullets: [
        "14 categories d'al·lèrgens estàndard a cada plat.",
        "Etiquetes vegà, vegetarià i sense gluten amb un sol clic.",
        "Els clients filtren la carta segons les seves restriccions dietètiques.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "El client filtra la carta per al·lèrgens al mòbil mentre el propietari edita la llista d'al·lèrgens a una tauleta" },
    },
    {
      icon: Palette,
      eyebrow: "Disseny premium",
      heading: "Disseny premium amb fons de vídeo i pàgina de contacte.",
      body: "Un vídeo o una foto a la pantalla de benvinguda, descripció del restaurant, pàgina de contacte dedicada amb mapa, telèfons i perfils socials. La carta digital sembla un web complet de restaurant, no un PDF darrere d'un codi QR.",
      bullets: [
        "Fons de vídeo o foto gran a la pantalla de benvinguda.",
        "Descripcions del restaurant i de les categories — explica la història del concepte.",
        "Pàgina de contacte: mapa, telèfon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos mòbils en una taula de cafeteria: pantalla d'inici de la carta amb fons de vídeo i pàgina de contacte amb mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comandes des de la carta · opcional",
      heading: "Els clients fan comandes directament des de la carta.",
      body: "Els clients munten un carret a la carta QR i envien la comanda — arriba al cambrer a la sala o a la tauleta de cuina. La funcionalitat es pot activar o desactivar a la configuració en qualsevol moment.",
      bullets: [
        "Carret, comentaris i enviament de comanda amb un sol toc.",
        "La comanda arriba a l'instant al panell d'administració, a WhatsApp o a la pantalla de cuina.",
        "Funcionalitat activable a la configuració.",
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
