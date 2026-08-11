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
    verticals: ["Restaurants","Cafés","Bars","Pizzerias"],
    title: "Votre restaurant, digital",
    titleAccent: "en 5 min.",
    sub: "Menu digital, écran de cuisine et réservations 24/7 — tout ce qu'il faut à votre restaurant, prêt en 5 minutes.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurants" },
      { icon: "cafe", label: "Cafés" },
      { icon: "bar", label: "Bars" },
      { icon: "pizza", label: "Pizzerias" },
    ],
    title: "Tout ce qu'il faut",
    titleAccent: "à votre restaurant !",
    sub: "Configurez vos processus en 10 minutes : lancez le menu en ligne, optimisez la cuisine et suivez l'occupation des tables.",
    primaryLabel: "Commencer gratuitement",
    demoLabel: "Voir la démo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablette avec l'écran cuisine : commandes par table en colonnes avec statuts" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablette avec le calendrier des réservations : vue mensuelle et réservations en attente de confirmation" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Téléphone avec la page d'accueil du site d'un restaurant : photo, réservations et menu en ligne" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Téléphone avec la fiche d'un plat : photo, prix et étiquettes d'allergènes" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Lancé en 10 minutes", sub: "Sans matériel coûteux ni longue configuration" },
    { Icon: MessagesSquare, title: "Support réactif", sub: "Nous répondons par chat en quelques heures" },
    { Icon: Globe, title: "Le choix de {count} établissements", sub: "Des restaurants et cafés de plus de 15 pays nous font confiance" },
    { Icon: Palette, title: "100 % à votre image", sub: "Design et interface adaptés au style de votre établissement" },
  ],

  menu: {
    heading: "Site web et menu digital",
    sub: {
      link: "Plus qu'un menu QR !",
      rest: " Obtenez un site complet avec design unique, page de contact et réservation de tables.",
    },
    moreLabel: "En savoir plus",
    mockupAlt: "Deux téléphones : la page d'accueil du site d'un restaurant et la page d'un plat",
    bullets: [
      { Icon: Languages, title: "Traduction automatique en 35 langues", sub: "Servez les clients étrangers sans barrière de langue — la traduction automatique s'occupe de tout" },
      { Icon: ClipboardList, title: "Commandes depuis la table", sub: "Simplifiez le service : recevez les commandes depuis la table, vite et sans serveur" },
      { Icon: WheatOff, title: "Allergènes et régimes", sub: "Indiquez allergènes et préférences (végan, épicé) pour un choix simple et sûr" },
    ],
  },

  reservations: {
    heading: "Réservation de tables",
    sub: {
      link: "Réservation intelligente !",
      rest: " Un système de réservation automatique qui surveille seul les tables libres et vos horaires.",
    },
    moreLabel: "En savoir plus",
    mockupAlt: "Tablette avec le calendrier des réservations : tables par jour et par créneau",
    bullets: [
      { Icon: CalendarCheck, title: "Plan des réservations clair", sub: "Une grille par jour et par table — les créneaux libres se voient d'un coup d'œil" },
      { Icon: SlidersHorizontal, title: "Réglages flexibles", sub: "Horaires, durée des créneaux, photos des tables et demandes des clients" },
      { Icon: Users, title: "Maîtrise du flux de clients", sub: "Choisissez votre mode de gestion des réservations et gardez le contrôle du flux" },
    ],
  },

  heroMicrocopy: "{count} restaurants · 14 jours gratuits · Sans carte",
  seeIncluded: "Voir ce qui est inclus",

  trust: [
    { kind: "num", value: 35, label: "Langues" },
    { kind: "text", value: "24/7", label: "Réservations" },
    { kind: "num", value: 5, suffix: " min", label: "Mise en place" },
    { kind: "count", label: "Restaurants" },
  ],

  bundle: {
    heading: "Tout ce qui fait tourner votre restaurant.",
    headingAccent: "Dans une seule app.",
    sub: "Menu, cuisine et réservations au même endroit — moderne, rapide et pensé pour le vrai quotidien d'un restaurant. Sans options payantes, sans facturation par fonction.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu digital", title: "Un menu qui fait vendre.", bullets: ["35 langues par IA","Design premium","Prix mis à jour en direct"], image: "/landing/feature-design.webp", imageAlt: "Deux téléphones sur une table de café : l'écran d'accueil du menu digital et la page contact avec une carte" },
    { Icon: ChefHat, tag: "Écran cuisine", title: "Cuisinez plus vite, sans rien rater.", bullets: ["En direct à l'écran","Notes & allergènes","Tablette ou téléphone"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablette sur le comptoir affichant l'écran cuisine avec les commandes par table" },
    { Icon: CalendarCheck, tag: "Réservations", title: "Réservations en pilote automatique.", bullets: ["Réservation en autonomie","Confirmation automatique","Calendrier par table"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Deux tablettes affichant le calendrier de réservations : vue du jour par table et vue mensuelle" },
    { Icon: Receipt, tag: "Commande à table", title: "Les commandes droit en cuisine.", bullets: ["Client ou serveur","Direct en cuisine","Activable à tout moment"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablette avec l'écran des commandes : liste des commandes et plan de salle avec tables colorées." },
  ],

  seeDetails: "Voir les détails",

  extras: {
    heading: "Et tout le reste inclus.",
    items: [
      { Icon: ScanLine, label: "L'IA numérise votre menu papier en 60 secondes" },
      { Icon: QrCode, label: "Un QR code unique pour chaque table" },
      { Icon: Smartphone, label: "Pas d'app pour les clients — s'ouvre dans le navigateur" },
      { Icon: Globe, label: "Votre propre domaine avec SSL" },
      { Icon: BarChart3, label: "Analyses des ventes : revenus, plats stars, heures" },
      { Icon: Palette, label: "Étiquettes allergènes et régimes filtrables" },
    ],
  },

  midCta: {
    heading: "Une app au lieu de cinq.",
    sub: "Fini de jongler entre des outils séparés pour le menu, la cuisine et les réservations — tout au même endroit, sur n'importe quel téléphone ou tablette, sans rien installer.",
  },

  platform: {
    hardwareTitle: "Travaillez avec votre propre matériel",
    hardwareSub: "Nous ne vous obligeons jamais à acheter du matériel chez nous. Utilisez les téléphones, tablettes et ordinateurs que vous avez déjà.",
    anywhereTitle: "Fonctionne partout",
    anywhereSub: "Mobile, tablette, ordinateur portable, PC. Android, iOS, Windows, Mac, Linux. Fonctionne dans tout navigateur moderne, sans installation.",
  },

  activities: {
    heading: "Un seul système,",
    headingAccent: "tout votre restaurant.",
    sub: "Un service plus rapide, une cuisine plus sereine, des coûts réduits et une expérience dont les clients se souviennent — le tout sur une seule plateforme.",
    groups: [
      {
        Icon: Smartphone,
        tag: "À table — clients",
        bullets: [
          "Menu QR en 35 langues",
          "Commander sans attendre le serveur",
          "Appeler le serveur ou demander l’addition",
          "Réserver une table 24h/24",
          "Un QR code unique pour chaque table",
          "Pas d'app pour les clients — s'ouvre dans le navigateur",
          "Étiquettes allergènes et régimes filtrables",
        ],
      },
      {
        Icon: ChefHat,
        tag: "En cuisine",
        bullets: [
          "Les commandes arrivent à l’écran instantanément",
          "Colonnes en préparation / prêt / servi",
          "Allergènes et notes mis en évidence",
          "Tablette ou téléphone — sans tickets papier",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Gestion",
        bullets: [
          "Modifications du menu et des prix en direct",
          "Traduction par IA en un clic",
          "Analyses des ventes et rapports",
          "Plusieurs restaurants sur un seul compte",
          "L'IA numérise votre menu papier en 60 secondes",
          "Votre propre domaine avec SSL",
        ],
      },
    ],
  },
};
