import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ca",
  htmlDir: "ltr",

  meta: {
    title: "Carta QR per a restaurants — Comandes directes, zero comissions | IQ Rest",
    description:
      "Plataforma tot-en-un per a restaurants: carta digital, comandes QR, reserva de taules i pantalla de cuina. Engega en 5 minuts. 14 dies gratis, sense targeta.",
    canonical: "https://iq-rest.com/ca",
    ogLocale: "ca_ES",
    ogTitle: "Carta QR per a restaurants — Comandes directes, zero comissions",
    ogDescription:
      "Carta digital, comandes QR, reserva de taules i traducció IA. Engega en 5 minuts. 14 dies gratis.",
  },

  ctaText: "Comença gratis",
  homeCtaText: "Crea la teva plataforma",
  demoText: "Mira la demo",
  microcopy: "14 dies gratis · Sense targeta · Cancel·la quan vulguis",

  header: {
    navFeatures: "Funcionalitats",
    navHow: "Com funciona",
    navPricing: "Preus",
    navFaq: "Preguntes",
    signIn: "Inicia sessió",
    viewFeatures: "Veure funcions",
    cta: "Comença gratis",
  },

  hero: {
    verticals: ["Restaurants", "Cafeteries", "Bars", "Hotels", "Pizzeries"],
    headline: "Carta digital per a restaurants. En línia en 5 minuts.",
    sub: "Carta digital per al teu restaurant en 5 minuts. Tot inclòs: editor sense codi, escaneig IA de la carta, codis QR per a les taules i comandes directes sense comissions.",
    dynamicHeadlines: ["0 % de comissió.", "35 idiomes IA.", "Comandes en línia.", "Reserves 24/7.", "Disseny premium."],
    painBullets: [
      "0 % de comissió: cada comanda va directament al teu restaurant.",
      "Traducció IA en 35 idiomes — els turistes entenen la carta i demanen més.",
      "Reserva 24/7: els clients reserven taules sols, sense trucades en hores punta.",
      "Preus flexibles: les actualitzacions de la carta es publiquen en segons.",
    ],
    rating: "Més de 500 restaurants en més de 30 països",
  },

  features: {
    heading: "Tot el que necessites.",
    headingAccent: "Res de més.",
    sub: "Fet per a restaurants. S'usa cada dia a la taula, a la cuina i a la sala.",
    items: [
      { Icon: Monitor, title: "Carta digital", desc: "Carta al navegador amb fotos, preus, al·lèrgens i descripcions. S'actualitza en temps real des del mòbil. Els clients veuen la carta en la seva llengua; el restaurant estalvia en impressió.", tag: "Carta digital", href: "/ca/carta-digital-restaurant" },
      { Icon: Receipt, title: "Recepció de comandes: client i cambrer", desc: "Un codi QR a la taula per al client, o el cambrer pren la comanda des del mòbil — totes dues van directament a la cuina o a WhatsApp. Sense comissions, amb el número de taula a cada tiquet.", tag: "Comandes", href: "/ca/sistema-comandes-restaurant" },
      { Icon: CalendarCheck, title: "Reserva de taules 24/7", desc: "Els clients reserven taules ells mateixos a través del web o de la carta QR mentre tu estàs ocupat a la sala. Calendari per taula, confirmacions i recordatoris automàtics. Cap client perdut.", tag: "Reserves", href: "/ca/reserva-de-taules" },
      { Icon: ChefHat, title: "Pantalla de cuina (KDS)", desc: "Els tiquets de paper ja no calen. Les comandes de la sala van directament a la pantalla del xef — columnes «en preparació / a punt / servit», al·lèrgens i notes destacats en color. A tauleta o mòbil.", tag: "KDS", href: "/ca/pantalla-de-cuina" },
    ],
  },

  founder: {
    eyebrow: "Fet per restauradors",
    quoteStart:
      "La meva dona i jo portàvem una cafeteria pròpia i sabem de primera mà com funciona realment un dia de restaurant — recepció de comandes, reserves, flux de sala i de cuina. Volíem una única eina: moderna, fàcil d'engegar i clara a primer cop d'ull —",
    quoteAccent: "així vam començar a construir la plataforma que ara desenvolupem per a altres restauradors.",
    sign: "Bogdan Sokolov · fundador, ex-propietari de cafeteria",
    photoAlt: "Bogdan Sokolov, fundador d'IQ Rest",
  },

  how: {
    heading: "En línia en 5 minuts",
    sub: "Quatre passos curts. Sense instal·lacions, sense configuració tècnica.",
    steps: [
      { n: "1", t: "Tipus i nom", d: "Tria el tipus d'establiment i introdueix el nom." },
      { n: "2", t: "Desa", d: "Introdueix el teu correu o entra amb Google." },
      { n: "3", t: "Carta", d: "Afegeix els articles manualment o puja una carta impresa per a l'escaneig IA." },
      { n: "4", t: "Fet", d: "Comparteix un enllaç o codi QR i comença a rebre comandes." },
    ],
  },

  pricing: {
    badge: "Sense comissions · Sense contractes",
    heading: "Un sol pla.",
    headingAccent: "Tot inclòs.",
    sub: "Carta QR, recepció de comandes, traducció IA, web del restaurant i reserva. Una sola tarifa mensual transparent.",
    monthlyLabel: "Mensual",
    yearlyLabel: "Anual",
    saveBadge: "Estalvia 25 %",
    perMonth: "al mes",
    billedAnnually: "Facturació anual: {total}",
    youSave: "Estalvies {amount}",
    trust: { secure: "Pagament segur amb Stripe", noCommitment: "Sense compromís", quick: "Actiu en minuts", restaurants: "500+ restaurants" },
  },

  faq: {
    eyebrow: "Tens preguntes?",
    heading: "Preguntes",
    headingAccent: "freqüents.",
    sub: "El que els restauradors demanen abans de registrar-se. No trobes la teva pregunta? Escriu-nos per WhatsApp — responen persones reals, no un bot.",
    whatsappCta: "Pregunta per WhatsApp",
    whatsappPrefill: "Hola, tinc una pregunta sobre IQ Rest",
    items: [
      { q: "Què inclou la prova i què passa després?", a: "Accés complet a totes les funcionalitats durant 14 dies, sense targeta. Passats 14 dies el compte es pausa si no s'ha afegit un mètode de pagament — mai no cobrem automàticament. Pots afegir el pagament més tard i continuar on ho havies deixat. Cancel·la quan vulguis amb un sol clic." },
      { q: "Cobreu comissió sobre les comandes?", a: "No. Cada comanda des de la carta QR va directament al restaurant — sense percentatges del nostre costat, sense comissions d'agregadors. Una tarifa mensual fixa i res més." },
      { q: "Els clients necessiten una app? Necessitem coneixements tècnics?", a: "Els clients no necessiten cap app — apunten la càmera del mòbil al codi QR i la carta s'obre al navegador. Els restaurants tampoc necessiten coneixements tècnics: el panell d'administració funciona a qualsevol navegador modern al mòbil, tauleta o portàtil. Cada acció és per clic i arrossegar, sense codi." },
      { q: "Com de ràpid canvien els preus i apareixen nous plats?", a: "A l'instant. Canvia un preu des del mòbil — els clients el veuen en segons. Un plat nou només requereix uns tocs: nom, preu, foto. Sense reimpressions, sense esperar un dissenyador." },
      { q: "Quants idiomes hi ha disponibles?", a: "35 idiomes amb traducció IA integrada. Un toc i tota la carta es tradueix; la IA entén el context culinari — noms i descripcions sonen naturals en qualsevol idioma. Els turistes demanen amb més confiança quan entenen realment la carta." },
    ],
  },

  finalCta: {
    heading: "En línia en 5 minuts.",
    headingAccent: "14 dies gratis.",
    sub: "Sense targeta, cancel·la quan vulguis. Uneix-te a més de 500 restaurants que ja treballen amb IQ Rest.",
  },

  scan: {
    heading: "Tens una carta en paper o un PDF?",
    headingAccent: "La IA la digitalitza en 60 segons.",
    sub: "Puja una foto o un document — la IA reconeix categories, plats i preus automàticament.",
    cta: "Escaneja la carta →",
  },

  pricingHero: {
    chips: ["Sense comissions", "Sense contractes", "14 dies gratis"],
    heading: "Preus.",
    headingAccent: "Sense costos amagats.",
    sub: "Una sola tarifa mensual transparent. Sense percentatges sobre comandes ni comissions d'agregadors. Cancel·la la subscripció quan vulguis.",
    popularBadge: "Popular",
    perMonthSuffix: "/mes",
    whenAnnualTemplate: "facturació anual · {total} € l'any",
    orMonthlyTemplate: "o {price} €/mes",
    savingsTemplate: "estalvia {amount} € l'any",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Carta, comandes QR i traducció IA. En línia en 5 minuts.",
        features: [
          "Carta QR per a cada taula",
          "Carta digital amb fotos i al·lèrgens",
          "Traducció IA en 35 idiomes",
          "Comandes des de la carta (opcional)",
          "Generació IA de fotos de plats",
          "Gestió des de qualsevol mòbil o tauleta",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Control total del restaurant: pantalla de cuina i reserves.",
        features: [
          "Tot el del Basic",
          "Pantalla de cuina (KDS)",
          "Reserva de taules en línia 24/7",
          "Suport prioritari per WhatsApp",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/ca/carta-digital-restaurant", label: "Carta digital" },
      { href: "/ca/sistema-comandes-restaurant", label: "Comandes" },
      { href: "/ca/reserva-de-taules", label: "Reserves" },
      { href: "/ca/pantalla-de-cuina", label: "Pantalla de cuina" },
    ],
    navLinks: [
      { href: "/ca/preus", label: "Preus" },
      { href: "#faq", label: "Preguntes" },
      { href: "/ca/languages", label: "Canvia l'idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tots els drets reservats.",
  },
};
