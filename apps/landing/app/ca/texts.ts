import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ca", htmlDir: "ltr",
  meta: {
    title: "Carta QR per a Restaurants — Comandes Directes, Zero Comissions | IQ Rest",
    description: "S'acabaren les cartes de paper i les comissions de les apps de delivery. Carta QR, comandes directes, reserves i web multilingüe. 14 dies gratis, sense targeta.",
    canonical: "https://iq-rest.com/ca", ogLocale: "ca_ES",
    ogTitle: "Carta QR per a Restaurants — Comandes Directes, Zero Comissions",
    ogDescription: "Carta QR, comandes directes, reserves i traducció IA. Llesta en 5 minuts. 14 dies gratis — sense targeta.",
  },
  ctaText: "Prova-ho gratis",
  demoText: "Veure demo en directe", microcopy: "14 dies gratis · Sense targeta · Cancel·la quan vulguis",
  header: { navFeatures: "Funcions", navHow: "Com funciona", navPricing: "Preus", navFaq: "FAQ", signIn: "Entrar", cta: "Prova-ho gratis" },
  hero: {
    verticals: ["Restaurants", "Cafeteries", "Bars", "Hotels", "Pizzeries"],
    headline: "Carta QR en 5 minuts.",
    sub: "Lloc web llest per al teu restaurant — sense programadors ni contractistes. Comandes directes, reserves i analítica de clients en una sola subscripció.",
    dynamicHeadlines: ["0% comissions.", "35 idiomes amb IA.", "Comandes online.", "Reserves 24/7.", "Disseny premium."],
    painBullets: ["0% comissions: Totes les comandes van directament a tu.", "Traducció IA: 35 idiomes per augmentar el tiquet dels turistes.", "Reserves 24/7: Sala plena sense trucades innecessàries.", "Preus flexibles: Actualitza la carta en segons."],
    rating: "Més de 500 restaurants en 30+ països",
  },
  features: {
    heading: "Tot el que cal.", headingAccent: "Res que no.",
    sub: "Fet per a restaurants. Usat a taula.",
    items: [
      
      { Icon: ScanLine, title: "Comandes des de la taula", desc: "Les comandes arriben a l'instant per WhatsApp o al taulell amb el número de taula. Servei més ràpid.", tag: "Comandes directes" },
      { Icon: Languages, title: "Traductor IA (35 idiomes)", desc: "La nostra IA entén la gastronomia. Els turistes demanen un 20% més quan entenen el plat.", tag: "Traducció IA" },
      { Icon: CalendarCheck, title: "Reserva de taules", desc: "El sistema accepta reserves mentre ets a la cuina. Cap client perdut.", tag: "Reserves" },
      { Icon: Palette, title: "Disseny modern", desc: "Fons de vídeo i fotos atractives. La teva carta sembla premium i fa venir gana al moment.", tag: "Disseny personalitzat" },
      { Icon: Smartphone, title: "Editor ràpid", desc: "Gestiona la llista d'esgotats i preus des del mòbil. Canvis instantanis per als clients.", tag: "Editor de carta" },
      { Icon: ChefHat, title: "Properament: Pantalla de cuina", desc: "Oblida els tiquets de paper. Les comandes de la sala van directe a la pantalla del xef.", tag: "Aviat" },
    
    ],
  },
  founder: {
    eyebrow: "Fet per un propietari de restaurant",
    quoteStart: "La meva dona i jo vam obrir una cafeteria i vam passar setmanes buscant un sistema que acceptés comandes online, reserves i que a sobre semblés modern. Tot el que vam provar era pesat, lleig o li faltaven la meitat de funcions —",
    quoteAccent: "així que vam construir el que ens hauria agradat tenir.",
    sign: "Bogdan Sokolov · fundador, ex propietari de cafeteria",
    photoAlt: "Bogdan, fundador d'IQ Rest",
  },
  how: {
    heading: "En menys de 5 minuts",
    sub: "Quatre passos curts. Sense instal·lacions, sense configuració tècnica.",
    steps: [
      { n: "1", t: "Tipus i nom", d: "Tria el tipus i escriu el nom." },
      { n: "2", t: "Desar", d: "Email o accés amb Google." },
      { n: "3", t: "Carta", d: "Crea-la o escaneja una en paper." },
      { n: "4", t: "Llest", d: "Mira, comparteix i rep comandes." },
    ],
  },
  pricing: {
    badge: "Sense comissions · Sense contractes",
    heading: "Un únic pla.", headingAccent: "Tot inclòs.",
    sub: "Carta QR, comandes, traducció IA, web del restaurant i reserves. Un preu simple.",
    monthlyLabel: "Mensual", yearlyLabel: "Anual", saveBadge: "Estalvia 25%", perMonth: "al mes",
    billedAnnually: "Facturat anualment {total}", youSave: "Estalvies {amount}",
    trust: { secure: "Pagament segur amb Stripe", noCommitment: "Sense compromís", quick: "Actiu en minuts", restaurants: "500+ restaurants" },
  },
  faq: {
    eyebrow: "Tens dubtes?", heading: "Preguntes", headingAccent: "freqüents.",
    sub: "El que els propietaris de restaurants pregunten abans de registrar-se. No veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    whatsappCta: "Pregunta per WhatsApp", whatsappPrefill: "Hola, tinc una pregunta sobre IQ Rest",
    items: [
      { q: "Què inclou la prova gratis i què passa després?", a: "14 dies, accés complet, sense targeta. Passats els 14 dies, si no afegeixes mètode de pagament, el compte es pausa — mai cobrem automàticament. Afegeix les dades quan vulguis per reactivar. La cancel·les amb un clic." },
      { q: "Us emporteu comissió per les comandes?", a: "Zero. Cada comanda de la teva carta QR arriba directe a tu — sense la nostra part, sense taxes tipus Glovo o Uber Eats. Un sol preu mensual, ja està." },
      { q: "Els meus clients necessiten una app? Jo necessito coneixements tècnics?", a: "Zero apps per als clients — escanegen el QR amb la càmera del mòbil i la carta s'obre al navegador. Zero coneixements tècnics per a tu — tot el panell funciona al mòbil, toques per afegir un plat, arrossegues per reordenar, això és tot." },
      { q: "Com de ràpid canvio preus o afegeixo plats?", a: "A l'instant. Canvies un preu al mòbil i els clients ho veuen en segons. Plat nou? Toques, escrius, puges foto, fet — sense reimpressions, sense esperar al dissenyador." },
      { q: "Quants idiomes traduïu?", a: "35 idiomes amb traducció IA integrada. Un toc tradueix tota la carta i l'IA entén el context culinari — els noms i descripcions sonen naturals en cada idioma. Els turistes demanen més quan entenen de veritat." },
    ],
  },
  finalCta: { heading: "Llesta en 5 minuts.", headingAccent: "Gratis 14 dies.", sub: "Sense targeta. Cancel·la quan vulguis. Uneix-te a 500+ restaurants ja a IQ Rest." },
  scan: {
    heading: "Tens una carta en paper o PDF?",
    headingAccent: "La IA la digitalitza en 60 segons.",
    sub: "Puja-la — la IA n'extreu categories, plats i preus.",
    cta: "Escanejar la carta →",
  },
  footer: {
    featureLinks: [
      { href: "/ca/online-orders", label: "Comandes online" }, { href: "/ca/ai-translation", label: "Traducció IA" },
      { href: "/ca/reservations", label: "Reserves" }, { href: "/ca/mobile-management", label: "Gestió des del mòbil" },
      { href: "/ca/easy-menu", label: "Editor de carta" }, { href: "/ca/custom-design", label: "Fons en vídeo i foto" },
      { href: "/ca/color-scheme", label: "Colors de marca" }, { href: "/ca/multilingual", label: "Web multilingüe" },
      { href: "/ca/ai-images", label: "Optimització de fotos amb IA" }, { href: "/ca/analytics", label: "Analítiques" },
      { href: "/ca/instant-setup", label: "Configuració a l'instant" }, { href: "/ca/personal-support", label: "Suport personal" },
    ],
    navLinks: [
      { href: "#pricing", label: "Preus" }, { href: "#faq", label: "Preguntes" },
      { href: "/ca/languages", label: "Canvia d'idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tots els drets reservats.",
  },
};
