import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "fr",
  htmlDir: "ltr",

  meta: {
    title: 'Menu QR pour restaurants — Commandes directes sans commission | IQ Rest',
    description:
      'Plateforme tout-en-un pour restaurants : menu numérique, commandes QR, réservation de tables et écran de cuisine. Démarrage en 5 minutes. 14 jours gratuits, sans carte.',
    canonical: "https://iq-rest.com/fr",
    ogLocale: 'fr_FR',
    ogTitle: 'Menu QR pour restaurants — Commandes directes sans commission',
    ogDescription:
      'Menu numérique, commandes QR, réservation de tables et traduction IA. Démarrage en 5 minutes. 14 jours gratuits.',
  },

  ctaText: 'Créer le menu digital',
  homeCtaText: 'Créez votre plateforme',
  demoText: 'Voir la démo',
  microcopy: '14 jours gratuits · Sans carte · Annulation à tout moment',

  header: {
    navFeatures: 'Fonctionnalités',
    navHow: 'Comment ça marche',
    navPricing: 'Tarifs',
    navFaq: 'FAQ',
    signIn: 'Connexion',
    cta: 'Créer le menu',
  },

  hero: {
    verticals: ['Restaurants', 'Cafés', 'Bars', 'Hôtels', 'Pizzerias'],
    headline: 'Menu numérique pour restaurants. En ligne en 5 minutes.',
    sub: 'Menu numérique pour votre restaurant en 5 minutes. Tout inclus : éditeur sans code, reconnaissance IA du menu, codes QR pour les tables et commandes directes sans commission.',
    dynamicHeadlines: ['0 % de commission.', '35 langues IA.', 'Commandes en ligne.', 'Réservations 24/7.', 'Design premium.'],
    painBullets: [
      '0 % de commission : chaque commande va directement à votre restaurant.',
      'Traduction IA en 35 langues — les touristes comprennent le menu et commandent davantage.',
      'Réservation 24/7 : les clients réservent eux-mêmes, sans appels en heure de pointe.',
      'Tarification flexible : les mises à jour du menu sont en ligne en quelques secondes.',
    ],
    rating: 'Plus de 500 restaurants dans plus de 30 pays',
  },

  features: {
    heading: "Tout ce qu'il faut.",
    headingAccent: 'Rien de superflu.',
    sub: 'Conçu pour les restaurants. Utilisé chaque jour à table, en cuisine et en salle.',
    items: [
      { Icon: Monitor, title: 'Menu numérique', desc: "Menu dans le navigateur avec photos, prix, allergènes et descriptions. Mise à jour en temps réel depuis votre téléphone. Les clients voient le menu dans leur langue ; le restaurant économise sur l'impression.", tag: 'Menu numérique', href: "/fr/menu-digital-restaurants" },
      { Icon: Receipt, title: 'Prise de commande : client et serveur', desc: 'Un code QR à table pour le client, ou le serveur prend la commande depuis son téléphone — les deux vont directement en cuisine ou sur WhatsApp. Sans commission, avec numéro de table sur chaque ticket.', tag: 'Commandes', href: "/fr/systeme-commandes-restaurant" },
      { Icon: CalendarCheck, title: 'Réservation de tables 24/7', desc: 'Les clients réservent eux-mêmes via le site ou le menu QR pendant que vous êtes occupé en salle. Calendrier par table, confirmations et rappels automatiques. Aucun client manqué.', tag: 'Réservation', href: "/fr/reservation-tables" },
      { Icon: ChefHat, title: 'Écran de cuisine (KDS)', desc: "Les tickets papier ne sont plus nécessaires. Les commandes de la salle arrivent directement sur l'écran du chef — colonnes « en préparation / prêt / servi », allergènes et notes en couleur. Sur tablette ou téléphone.", tag: 'KDS', href: "/fr/ecran-cuisine" },
    ],
  },

  founder: {
    eyebrow: 'Conçu par des restaurateurs',
    quoteStart:
      "Ma femme et moi tenions notre propre café et nous savons par expérience comment se déroule vraiment une journée de restaurant — prise de commande, réservations, salle et cuisine. Nous voulions un outil unique : moderne, facile à lancer et clair d'un coup d'œil —",
    quoteAccent: "c'est ainsi que nous avons commencé à construire la plateforme que nous développons pour d'autres restaurateurs.",
    sign: 'Bogdan Sokolov · fondateur, ancien propriétaire de café',
    photoAlt: 'Bogdan Sokolov, fondateur de IQ Rest',
  },

  how: {
    heading: 'En ligne en 5 minutes',
    sub: 'Quatre étapes courtes. Sans installation, sans configuration technique.',
    steps: [
      { n: "1", t: 'Type et nom', d: "Choisissez le type d'établissement et entrez le nom." },
      { n: "2", t: 'Enregistrer', d: 'Entrez votre e-mail ou connectez-vous avec Google.' },
      { n: "3", t: 'Menu', d: 'Ajoutez les articles manuellement ou téléchargez un menu imprimé pour la reconnaissance IA.' },
      { n: "4", t: 'Terminé', d: 'Partagez un lien ou un code QR et commencez à prendre des commandes.' },
    ],
  },

  pricing: {
    badge: 'Sans commission · Sans contrat',
    heading: 'Un seul plan.',
    headingAccent: 'Tout inclus.',
    sub: 'Menu QR, prise de commande, traduction IA, site du restaurant et réservation. Un seul tarif mensuel transparent.',
    monthlyLabel: 'Mensuel',
    yearlyLabel: 'Annuel',
    saveBadge: 'Économisez 25 %',
    perMonth: 'par mois',
    billedAnnually: 'Facturé annuellement : {total}',
    youSave: 'Vous économisez {amount}',
    trust: { secure: 'Paiement sécurisé Stripe', noCommitment: 'Sans engagement', quick: 'Actif en quelques minutes', restaurants: '500+ restaurants' },
  },

  faq: {
    eyebrow: 'Des questions ?',
    heading: 'Questions',
    headingAccent: 'fréquentes.',
    sub: "Ce que les restaurateurs demandent avant de s'inscrire. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp — de vraies personnes répondent, pas un bot.",
    whatsappCta: 'Demander sur WhatsApp',
    whatsappPrefill: "Bonjour, j'ai une question sur IQ Rest",
    items: [
      { q: "Que comprend l'essai et que se passe-t-il après ?", a: "Accès complet à toutes les fonctionnalités pendant 14 jours, sans carte. Au bout de 14 jours, le compte est mis en pause si aucun moyen de paiement n'est ajouté — nous ne facturons jamais automatiquement. Vous pouvez ajouter un paiement plus tard et reprendre là où vous vous êtes arrêté. Annulation en un clic à tout moment." },
      { q: 'Prenez-vous une commission sur les commandes ?', a: "Non. Chaque commande depuis le menu QR va directement au restaurant — aucun pourcentage de notre côté, aucune commission d'agrégateur. Un seul tarif mensuel fixe et rien d'autre." },
      { q: "Les clients ont-ils besoin d'une app, faut-il des compétences techniques ?", a: "Les clients n'ont pas besoin d'app — ils pointent l'appareil photo de leur téléphone sur le code QR et le menu s'ouvre dans le navigateur. Les restaurants n'ont pas besoin de compétences techniques non plus : le panneau d'administration fonctionne dans n'importe quel navigateur moderne sur téléphone, tablette ou ordinateur portable. Toutes les actions se font par clic et glisser-déposer, sans code." },
      { q: 'À quelle vitesse les prix changent-ils et les nouveaux plats apparaissent-ils ?', a: "Instantanément. Modifiez un prix depuis votre téléphone — les clients le voient en quelques secondes. Un nouveau plat prend quelques touches : nom, prix, photo. Pas de réimpression, pas d'attente d'un designer." },
      { q: 'Combien de langues sont prises en charge ?', a: "35 langues avec traduction IA intégrée. Une touche et tout le menu est traduit ; l'IA comprend le contexte culinaire — les noms et descriptions sonnent naturels dans n'importe quelle langue. Les touristes commandent avec plus de confiance quand ils comprennent vraiment le menu." },
    ],
  },

  finalCta: {
    heading: 'En ligne en 5 minutes.',
    headingAccent: '14 jours gratuits.',
    sub: 'Sans carte, annulation à tout moment. Rejoignez 500+ restaurants qui utilisent déjà IQ Rest.',
  },

  scan: {
    heading: 'Vous avez un menu papier ou un PDF ?',
    headingAccent: "L'IA le numérise en 60 secondes.",
    sub: "Téléchargez une photo ou un document — l'IA reconnaît automatiquement les catégories, les plats et les prix.",
    cta: 'Scanner le menu →',
  },

  pricingHero: {
    chips: ['Sans commission', 'Sans contrat', '14 jours gratuits'],
    heading: 'Tarifs.',
    headingAccent: 'Pas de frais cachés.',
    sub: "Un seul tarif mensuel transparent. Aucun pourcentage sur les commandes ni commission d'agrégateur. Annulez l'abonnement à tout moment.",
    popularBadge: 'Populaire',
    perMonthSuffix: '/mois',
    whenAnnualTemplate: 'facturé annuellement · {total} € par an',
    orMonthlyTemplate: 'ou {price} €/mois',
    savingsTemplate: 'économisez {amount} € par an',
    plans: {
      basic: {
        name: "Basic",
        tagline: 'Menu, commandes QR et traduction IA. En ligne en 5 minutes.',
        features: [
          'Menu QR pour chaque table',
          'Menu numérique avec photos et allergènes',
          'Traduction IA en 35 langues',
          'Commandes depuis le menu (optionnel)',
          'Génération IA de photos de plats',
          "Gestion depuis n'importe quel téléphone ou tablette",
        ],
      },
      pro: {
        name: "Pro",
        tagline: 'Contrôle complet du restaurant : écran de cuisine et réservations.',
        features: [
          'Tout dans Basic',
          'Écran de cuisine (KDS)',
          'Réservation de tables en ligne 24/7',
          'Support WhatsApp prioritaire',
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/fr/menu-digital-restaurants", label: 'Menu numérique' },
      { href: "/fr/systeme-commandes-restaurant", label: 'Commandes' },
      { href: "/fr/reservation-tables", label: 'Réservation' },
      { href: "/fr/ecran-cuisine", label: 'Écran de cuisine' },
    ],
    navLinks: [
      { href: "/fr/tarifs", label: 'Tarifs' },
      { href: "#faq", label: 'FAQ' },
      { href: "/fr/languages", label: 'Changer de langue' },
    ],
    copyrightTemplate: '© {year} IQ Rest. Tous droits réservés.',
  },
};
