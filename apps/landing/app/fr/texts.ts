import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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

  ctaText: "Commencer gratuitement →",
  demoText: "Voir la démo",
  microcopy: "14 jours gratuits · Sans carte · Annulez quand vous voulez",

  header: {
    navFeatures: "Fonctionnalités",
    navHow: "Comment ça marche",
    navPricing: "Tarifs",
    navFaq: "FAQ",
    signIn: "Connexion",
    cta: "Commencer gratuitement →",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bars", "Hôtels", "Pizzerias"],
    variants: [
      {
        headline: "Arrêtez de réimprimer des cartes.",
        headlineAccent: "Arrêtez de payer 30% aux apps de livraison.",
        sub: "Carte QR, commandes directes, réservations et site multilingue. Prêt en 2 minutes — sans carte bancaire.",
      },
      {
        headline: "Votre restaurant mérite mieux que",
        headlineAccent: "des cartes papier et des appels manqués.",
        sub: "Commandes directes, mises à jour instantanées et réservations 24/7. Configuré en 2 minutes.",
      },
      {
        headline: "Un code QR.",
        headlineAccent: "Zéro commission. Plus de cartes papier.",
        sub: "Carte QR, commandes en ligne et réservations — tout au même endroit. 14 jours gratuits, sans carte.",
      },
      {
        headline: "Recevez des commandes directes.",
        headlineAccent: "Sautez la commission.",
        sub: "Vos clients scannent, commandent et paient — directement chez vous, sans la part d'Uber Eats. Prêt en 2 minutes.",
      },
      {
        headline: "Plus de commandes. Plus de réservations.",
        headlineAccent: "Sans papier, sans applis.",
        sub: "Carte QR + réservations + site multilingue en pilote auto. 14 jours d'essai gratuit.",
      },
      {
        headline: "Les touristes ne lisent pas votre carte ?",
        headlineAccent: "Réglé en 2 minutes.",
        sub: "L'IA traduit toute votre carte en 35 langues. Plus les commandes QR et les réservations incluses.",
      },
      {
        headline: "De la carte papier au QR code,",
        headlineAccent: "avant que le café refroidisse.",
        sub: "Carte QR, commandes directes et réservations 24/7. Prêt en 2 minutes — sans carte.",
      },
      {
        headline: "Carte QR rafraîchissante de simplicité.",
        headlineAccent: "Discrètement puissante.",
        sub: "Commandes directes, traduction IA, réservations et site web — tout d'un toucher sur votre téléphone.",
      },
    ],
    painBullets: [
      "Plus d'impressions — changez les prix instantanément",
      "Zéro commission — les commandes vont directement à vous",
      "Plus d'appels manqués — réservations 24/7",
      "35 langues — ne perdez plus aucun touriste",
    ],
    rating: "4,9 · plus de 500 restaurants dans 30+ pays",
  },

  features: {
    heading: "Tout ce qu'il faut.",
    headingAccent: "Rien d'inutile.",
    sub: "Conçu pour la restauration. Pensé pour la table.",
    items: [
      {
        Icon: ScanLine,
        title: "Gardez 100% de chaque commande",
        desc: "Les clients scannent, commandent et paient — directement chez vous. Pas d'apps à télécharger, pas de 30% pour la livraison. Chaque commande arrive en temps réel dans le tableau de bord avec le numéro de table.",
      },
      {
        Icon: Languages,
        title: "Vendez aux touristes dans leur langue",
        desc: "Un toucher traduit toute votre carte en 35 langues. L'IA maîtrise le contexte culinaire — les clients commandent plus quand ils comprennent vraiment le plat.",
      },
      {
        Icon: CalendarCheck,
        title: "Plus de réservations manquées en cuisine",
        desc: "Vos clients réservent 24/7, sans appels. Confirmation auto ou manuelle, rappels par e-mail inclus — moins de no-shows, zéro stress.",
      },
      {
        Icon: Palette,
        title: "Inoubliable en 1 seconde",
        desc: "Mettez une vidéo de votre cuisine ou un cliché d'un plat star en fond de carte. Les clients arrêtent de scroller. Votre marque marque.",
      },
      {
        Icon: Smartphone,
        title: "Modifiez en secondes, pas en jours",
        desc: "Changez les prix, échangez les photos, ajoutez le plat du jour — depuis le téléphone, entre deux tables. En direct pour les clients à l'instant. Plus jamais de réimpression.",
      },
      {
        Icon: ListPlus,
        title: "Si vous savez envoyer un SMS, vous savez l'utiliser",
        desc: "Toucher pour ajouter un plat. Glisser pour réorganiser. Désactiver ce qui est en rupture. Pas de manuels, pas de tutos, pas de courbe d'apprentissage.",
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
        q: "Puis-je gérer plusieurs restaurants depuis un compte ?",
        a: "Oui. Le plan Pro permet plusieurs restaurants dans un seul compte — cartes séparées, QR séparés, stats séparées, une seule connexion. On bascule en deux tapes.",
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
