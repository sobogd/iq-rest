import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ca", htmlDir: "ltr",
  meta: {
    title: "Carta QR per a Restaurants — Comandes Directes, Zero Comissions | IQ Rest",
    description: "S'acabaren les cartes de paper i les comissions de les apps de delivery. Carta QR, comandes directes, reserves i web multilingüe. 14 dies gratis, sense targeta.",
    canonical: "https://iq-rest.com/ca", ogLocale: "ca_ES",
    ogTitle: "Carta QR per a Restaurants — Comandes Directes, Zero Comissions",
    ogDescription: "Carta QR, comandes directes, reserves i traducció IA. Llesta en 2 minuts. 14 dies gratis — sense targeta.",
  },
  ctaText: "Comença gratis →",
  demoText: "Veure demo en directe", microcopy: "14 dies gratis · Sense targeta · Cancel·la quan vulguis",
  header: { navFeatures: "Funcions", navHow: "Com funciona", navPricing: "Preus", navFaq: "FAQ", signIn: "Entrar", cta: "Comença gratis →" },
  hero: {
    verticals: ["Restaurants", "Cafeteries", "Bars", "Hotels", "Pizzeries"],
    variants: [
      { headline: "Deixa d'imprimir cartes.", headlineAccent: "Deixa de pagar 30% a les apps de delivery.", sub: "Carta QR, comandes directes, reserves i web multilingüe. Llesta en 2 minuts — sense targeta." },
      { headline: "El teu restaurant es mereix més que", headlineAccent: "una carta de paper i trucades perdudes.", sub: "Comandes directes, canvis instantanis i reserves 24/7. Configurada en 2 minuts." },
      { headline: "Un codi QR.", headlineAccent: "Zero comissions. Adéu paper.", sub: "Carta QR, comandes online i reserves — tot al mateix lloc. 14 dies gratis, sense targeta." },
      { headline: "Rep comandes directes.", headlineAccent: "Salta't la comissió.", sub: "Els teus clients escanegen, demanen i paguen — directe a tu, sense la part de Glovo. Llesta en 2 minuts." },
      { headline: "Més comandes. Més reserves.", headlineAccent: "Sense paper, sense apps.", sub: "Carta QR + reserves + web multilingüe en automàtic. 14 dies de prova gratis." },
      { headline: "Els turistes no entenen la carta?", headlineAccent: "Arreglat en 2 minuts.", sub: "L'IA tradueix tota la teva carta a 35 idiomes. A més, comandes QR i reserves incloses." },
      { headline: "De carta de paper a codi QR,", headlineAccent: "abans que es refredi el cafè.", sub: "Carta QR, comandes directes i reserves 24/7. Llesta en 2 minuts — sense targeta." },
      { headline: "Carta QR refrescantment senzilla.", headlineAccent: "Discretament potent.", sub: "Comandes directes, traducció IA, reserves i web — tot d'un toc al mòbil." },
    ],
    painBullets: ["Sense impressions — canvia preus a l'instant", "Zero comissions — comandes directes a tu", "Sense trucades perdudes — reserves 24/7", "35 idiomes — no perdis ni un turista"],
    rating: "4,9 · més de 500 restaurants en 30+ països",
  },
  features: {
    heading: "Tot el que cal.", headingAccent: "Res que no.",
    sub: "Fet per a restaurants. Usat a taula.",
    items: [
      { Icon: ScanLine, title: "Queda't el 100% de cada comanda", desc: "Els clients escanegen, demanen i paguen — directe a tu. Sense apps a descarregar, sense el 30% per delivery. Cada comanda arriba en temps real amb el número de taula al panell.", tag: "Comandes directes" },
      { Icon: Languages, title: "Ven als turistes en la seva llengua", desc: "Un toc tradueix tota la carta a 35 idiomes. L'IA pesca el context culinari — els clients demanen més quan entenen el plat.", tag: "Traducció IA" },
      { Icon: CalendarCheck, title: "No perdis reserves mentre cuines", desc: "Els clients reserven 24/7, sense trucades. Confirmació automàtica o manual, recordatoris per email — menys no-shows, zero estrès.", tag: "Reserves" },
      { Icon: Palette, title: "Inoblidable en 1 segon", desc: "Posa un vídeo de la cuina o una foto bonica de fons de la carta. Els clients deixen de fer scroll. La teva marca queda.", tag: "Disseny personalitzat" },
      { Icon: Smartphone, title: "Canvia en segons, no en dies", desc: "Canvia preus, fotos, afegeix el plat del dia — des del mòbil, entre taules. En directe per als clients a l'instant. Mai més imprimir.", tag: "Editor de carta" },
      { Icon: ChefHat, title: "Serveix més ràpid cada torn", desc: "Les comandes arriben a la pantalla de la cuina en el moment que el client confirma. Zero paper, zero crits, zero comandes perdudes — menys errors, servei més ràpid, més coberts per nit.", tag: "Aviat" },
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
    heading: "En menys de 2 minuts",
    sub: "Quatre passos curts. Sense instal·lacions, sense configuració tècnica.",
    steps: [
      { n: "1", t: "Registra't", d: "Email o Google. Sense targeta. Fet en 10 segons." },
      { n: "2", t: "Posa el nom del restaurant", d: "Només escriu el nom. Apareix a dalt de la carta." },
      { n: "3", t: "Afegeix el teu primer plat", d: "Categoria, nom, preu, foto. Ja està." },
      { n: "4", t: "Tria una portada i imprimeix el QR", d: "Tria fons. Agafa el QR. Enganxa'l a les taules." },
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
  finalCta: { heading: "Llesta en 2 minuts.", headingAccent: "Gratis 14 dies.", sub: "Sense targeta. Cancel·la quan vulguis. Uneix-te a 500+ restaurants ja a IQ Rest." },
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
