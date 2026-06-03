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
    verticals: ["Restaurants","Cafés","Bars","Pizzerias"],
    title: "Votre restaurant,",
    titleAccent: "100% digital en 5 minutes.",
    sub: "La plateforme complète pour gérer un restaurant moderne — élégante, tout au même endroit, sans compétences techniques.",
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
    { Icon: Receipt, tag: "Commande à table", title: "Les commandes droit en cuisine.", bullets: ["Client ou serveur","Direct en cuisine","Activable à tout moment"], image: "/landing/feature-orders.webp", imageAlt: "Un serveur prend une commande à table sur son téléphone, elle arrive sur l'écran cuisine" },
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

  how: {
    heading: "Prêt en 5 minutes",
    sub: "Quatre étapes. Sans installation, sans configuration technique, sans carte.",
    steps: [
      { n: "1", t: "Type & nom", d: "Type d'établissement et nom — c'est toute l'inscription." },
      { n: "2", t: "Connexion", d: "E-mail ou Google. Sans carte." },
      { n: "3", t: "Ajoutez le menu", d: "Saisissez-le ou laissez l'IA scanner votre menu papier." },
      { n: "4", t: "C'est en ligne", d: "Menu, cuisine et réservations — prêts." },
    ],
  },
};
