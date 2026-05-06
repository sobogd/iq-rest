import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "fr",
  htmlDir: "ltr",

  meta: {
    title: "Carte QR pour Restaurants — Commandes Directes, Zéro Commission | IQ Rest",
    description:
      "Fini les cartes papier et les commissions des apps de livraison. Carte QR, commandes directes, réservations & site multilingue. 14 jours gratuits, sans carte bancaire.",
    canonical: "https://iq-rest.com/fr",
    ogLocale: "fr_FR",
    ogTitle: "Carte QR pour Restaurants — Commandes Directes, Zéro Commission",
    ogDescription:
      "Carte QR, commandes directes, réservations et traduction IA. Prêt en 2 minutes. 14 jours gratuits — sans carte.",
  },

  ctaText: "Essai gratuit", ctaSite: "Créer mon site",
  demoText: "Voir la démo",
  microcopy: "14 jours gratuits · Sans carte · Annulez quand vous voulez",

  header: {
    navFeatures: "Fonctionnalités",
    navHow: "Comment ça marche",
    navPricing: "Tarifs",
    navFaq: "FAQ",
    signIn: "Connexion",
    cta: "Essai gratuit",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hôtels", "Pizzerias"],
    qr: { headline: "Menu QR en 5 minutes.", sub: "Commandes directes, réservations et 35 langues. Sans commission ni développeur." },
    web: { headline: "Site restaurant en 5 minutes.", sub: "Commandes directes, réservations et 35 langues. Sans commission ni développeur." },
    dynamicHeadlines: ["0% commission.", "35 langues (IA).", "Commandes en ligne.", "Réservations 24/7.", "Design premium."],
    painBullets: ["0% commission : Toutes les commandes vous parviennent directement.", "Traduction IA : 35 langues pour booster le ticket moyen des touristes.", "Réservations 24/7 : Salle comble sans appels incessants.", "Prix flexibles : Mettez à jour votre carte en quelques secondes."],
    rating: "4,9 · plus de 500 restaurants dans 30+ pays",
  },

  features: {
    heading: "Tout ce qu'il faut.",
    headingAccent: "Rien d'inutile.",
    sub: "Conçu pour la restauration. Pensé pour la table.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Commande à table",
        desc: "Les commandes arrivent instantanément sur WhatsApp ou votre panel avec le numéro de table. Service plus fluide.",
        tag: "Commandes directes",
      },
      {
        Icon: Languages,
        title: "Traducteur IA (35 langues)",
        desc: "Notre IA comprend la gastronomie. Les touristes commandent 20% de plus quand ils comprennent la carte.",
        tag: "Traduction IA",
      },
      {
        Icon: CalendarCheck,
        title: "Réservation de tables",
        desc: "Le système prend les réservations pendant que vous êtes en cuisine. Plus aucun client perdu.",
        tag: "Réservations",
      },
      {
        Icon: Palette,
        title: "Design moderne",
        desc: "Arrière-plans vidéo et photos gourmandes. Votre menu est premium et donne faim dès le premier clic.",
        tag: "Design sur mesure",
      },
      {
        Icon: Smartphone,
        title: "Éditeur rapide",
        desc: "Gérez vos prix et vos ruptures de stock depuis votre mobile. Changements immédiats pour les clients.",
        tag: "Éditeur de carte",
      },
      {
        Icon: ChefHat,
        title: "Bientôt : Écran de cuisine",
        desc: "Oubliez les bons papier. Les commandes de la salle vont direct sur l'écran du chef.",
        tag: "Bientôt disponible",
      },
    
    ],
  },

  founder: {
    eyebrow: "Conçu par un restaurateur",
    quoteStart:
      "Ma femme et moi avons ouvert un café et passé des semaines à chercher un système qui gère les commandes en ligne, les réservations et qui ait l'air moderne. Tout ce qu'on a essayé était lourd, moche ou il manquait la moitié des fonctionnalités —",
    quoteAccent: "alors on a construit celui qu'on aurait voulu avoir.",
    sign: "Bogdan Sokolov · fondateur, ancien gérant de café",
    photoAlt: "Bogdan, fondateur d'IQ Rest",
  },

  how: {
    heading: "Prêt en moins de 2 minutes",
    sub: "Quatre étapes courtes. Aucune installation, aucune config technique.",
    steps: [
      { n: "1", t: "Inscrivez-vous", d: "E-mail ou Google. Sans carte. Fait en 10 secondes." },
      { n: "2", t: "Nommez votre restaurant", d: "Tapez juste le nom. Il s'affiche en haut de la carte." },
      { n: "3", t: "Ajoutez un premier plat", d: "Catégorie, nom, prix, photo. C'est tout." },
      { n: "4", t: "Choisissez un fond et imprimez le QR", d: "Choisissez un fond. Récupérez votre QR. Collez-le sur les tables." },
    ],
  },

  pricing: {
    badge: "Sans commission · Sans engagement",
    heading: "Un seul plan.",
    headingAccent: "Tout est inclus.",
    sub: "Carte QR, commandes, traduction IA, site du restaurant et réservations. Un prix simple.",
    monthlyLabel: "Mensuel",
    yearlyLabel: "Annuel",
    saveBadge: "Économisez 25%",
    perMonth: "par mois",
    billedAnnually: "Facturation annuelle {total}",
    youSave: "Vous économisez {amount}",
    trust: {
      secure: "Paiement sécurisé via Stripe",
      noCommitment: "Sans engagement",
      quick: "Actif en quelques minutes",
      restaurants: "500+ restaurants",
    },
  },

  faq: {
    eyebrow: "Des questions ?",
    heading: "Questions",
    headingAccent: "fréquentes.",
    sub: "Ce que les restaurateurs demandent avant de s'inscrire. Vous ne trouvez pas la vôtre ? Écrivez sur WhatsApp — de vraies personnes répondent.",
    whatsappCta: "Demander sur WhatsApp",
    whatsappPrefill: "Bonjour, j'ai une question sur IQ Rest",
    items: [
      {
        q: "Que comprend l'essai gratuit, et après ?",
        a: "14 jours, accès complet, sans carte. Au bout de 14 jours, votre compte se met simplement en pause si vous n'ajoutez pas de moyen de paiement — on ne vous prélève jamais automatiquement. Ajoutez vos coordonnées plus tard pour réactiver. Annulez en un clic à tout moment.",
      },
      {
        q: "Prenez-vous une commission sur les commandes ?",
        a: "Zéro. Chaque commande de votre carte QR vous revient — pas de part pour nous, pas de frais Uber Eats / Deliveroo. Un seul prix mensuel, c'est tout.",
      },
      {
        q: "Mes clients ont besoin d'une appli ? J'ai besoin de compétences techniques ?",
        a: "Zéro appli pour les clients — ils scannent le QR avec l'appareil photo, la carte s'ouvre dans le navigateur. Zéro technique pour vous — tout le tableau de bord fonctionne au téléphone, toucher, glisser, c'est tout.",
      },
      {
        q: "À quelle vitesse je modifie les prix ou ajoute un plat ?",
        a: "Instantanément. Modifiez un prix au téléphone, les clients le voient en quelques secondes. Nouveau plat ? Toucher, écrire, photo, fini — pas de réimpression, pas d'attente du graphiste.",
      },
      {
        q: "Combien de langues sont supportées ?",
        a: "35 langues avec traduction IA intégrée. Un toucher traduit toute la carte, et l'IA comprend le contexte culinaire — les noms et descriptions sonnent naturels dans chaque langue. Les touristes commandent plus quand ils comprennent vraiment.",
      },
    ],
  },

  finalCta: {
    heading: "Prêt en 2 minutes.",
    headingAccent: "Gratuit pendant 14 jours.",
    sub: "Sans carte. Annulez quand vous voulez. Rejoignez 500+ restaurants déjà sur IQ Rest.",
  },

  scan: {
    heading: "Carte papier ou PDF ?",
    headingAccent: "L'IA la numérise en 60 secondes.",
    sub: "Téléversez — l'IA extrait catégories, plats et prix.",
    cta: "Scanner ma carte →",
  },
  footer: {
    featureLinks: [
      { href: "/fr/online-orders", label: "Commandes en ligne" },
      { href: "/fr/ai-translation", label: "Traduction IA" },
      { href: "/fr/reservations", label: "Réservations" },
      { href: "/fr/mobile-management", label: "Gestion mobile" },
      { href: "/fr/easy-menu", label: "Éditeur de carte" },
      { href: "/fr/custom-design", label: "Fonds vidéo et photo" },
      { href: "/fr/color-scheme", label: "Couleurs de marque" },
      { href: "/fr/multilingual", label: "Site multilingue" },
      { href: "/fr/ai-images", label: "Optimisation photos IA" },
      { href: "/fr/analytics", label: "Statistiques" },
      { href: "/fr/instant-setup", label: "Configuration instantanée" },
      { href: "/fr/personal-support", label: "Support personnel" },
    ],
    navLinks: [
      { href: "#pricing", label: "Tarifs" },
      { href: "#faq", label: "Questions" },
      { href: "/fr/changelog", label: "Nouveautés" },
      { href: "/fr/languages", label: "Changer de langue" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tous droits réservés.",
  },
};
