import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /fr/logiciel-prise-de-commande-restaurant targets the broad-match
// French keyword "logiciel prise de commande restaurant" (170/mo, LOW
// competition idx 16). NOT a delivery-aggregator competitor: the order
// goes from the guest's QR menu to your kitchen tablet or to your
// restaurant's WhatsApp number. Online card payment is opt-in custom
// integration, not enabled by default.
export const TEXTS: LandingTexts = {
  htmlLang: "fr",
  htmlDir: "ltr",

  meta: {
    title: "Logiciel de Prise de Commande Restaurant — QR & WhatsApp | IQ Rest",
    description:
      "Logiciel de prise de commande pour restaurant : le client scanne le QR, commande, l'ordre arrive direct sur votre tablette de cuisine ou votre WhatsApp. Sans commission, numéro de table inclus. 14 jours gratuits.",
    canonical: "https://iq-rest.com/fr/logiciel-prise-de-commande-restaurant",
    ogLocale: "fr_FR",
    ogTitle: "Logiciel de Prise de Commande Restaurant — Direct en Cuisine",
    ogDescription:
      "Le client scanne le QR à table, monte la commande, elle arrive sur votre tablette ou votre WhatsApp — sans agrégateur, sans commission, numéro de table sur chaque ticket.",
  },

  ctaText: "Activer mes commandes",
  demoText: "Voir une démo live",
  microcopy: "À partir de 6,90€/mois · 14 jours gratuits · Annulez à tout moment",

  header: {
    navFeatures: "Fonctionnalités",
    navHow: "Comment ça marche",
    navPricing: "Tarifs",
    navFaq: "FAQ",
    signIn: "Connexion",
    cta: "Essai gratuit",
  },

  hero: {
    verticals: ["Restaurants", "Cafés", "Bistrots", "Pizzerias", "Bars", "Brasseries"],
    headline: "Logiciel de Prise de Commande Restaurant.",
    sub: "Le client scanne le QR de sa table, monte la commande sur son téléphone et le ticket arrive direct sur votre tablette de cuisine ou votre WhatsApp. Sans agrégateur, sans commission, numéro de table sur chaque ticket.",
    dynamicHeadlines: [
      "Commande à table.",
      "Direct sur la tablette cuisine.",
      "Ou direct sur WhatsApp.",
      "Zéro commission.",
      "Numéro de table inclus.",
    ],
    painBullets: [
      "Logiciel de prise de commande que le restaurant possède réellement — sans intermédiaire, sans commission.",
      "Les commandes arrivent sur votre tablette de cuisine ou de manager avec numéro de table, modificateurs, allergènes et notes.",
      "Ou envoyées directement au WhatsApp du restaurant — parfait pour la vente à emporter et les petites équipes.",
      "QR par table (ou un unique pour tout l'établissement) généré automatiquement.",
    ],
    rating: "+500 restaurants dans 30 pays",
  },

  features: {
    heading: "Un logiciel de prise de commande",
    headingAccent: "pensé pour la table.",
    sub: "Fonctionnalité réelle, pas un clone d'agrégateur de livraison.",
    items: [
      {
        Icon: QrCode,
        title: "Menu QR avec panier à chaque table",
        desc: "Le client scanne le QR de la table, parcourt le menu dans sa langue, ajoute des plats avec modificateurs, laisse une note pour la cuisine et envoie. Aucune application à installer.",
        tag: "Commande QR",
      },
      {
        Icon: ChefHat,
        title: "Commandes sur votre tablette cuisine",
        desc: "Chaque nouvelle commande apparaît dans l'onglet Cuisine du tableau de bord — sur la tablette que vous gardez au pass — avec numéro de table, plats, variantes, allergènes et le commentaire du client. Passez de en cours à terminé d'un tap.",
        tag: "Vue cuisine",
      },
      {
        Icon: MessageCircle,
        title: "Ou envoyez sur WhatsApp",
        desc: "Passez le restaurant en mode WhatsApp (ou les deux en même temps) et chaque commande arrive au WhatsApp de l'établissement sous forme de message formaté — idéal pour la vente à emporter, les petites équipes ou quand le manager est ailleurs.",
        tag: "Mode WhatsApp",
      },
      {
        Icon: Settings2,
        title: "Modificateurs, variantes et allergènes",
        desc: "Chaque plat porte ses groupes de variantes (taille, cuisson, ajouts) avec différence de prix, tags d'allergènes et description libre. Le panier respecte tout, donc le ticket sur votre tablette n'est jamais ambigu.",
        tag: "Vrai panier",
      },
      {
        Icon: Languages,
        title: "Checkout multilingue",
        desc: "Tout le flux de commande — panier, modificateurs, commentaire, confirmation — est traduit en 35 langues et s'adapte automatiquement à la langue du téléphone du client. Les touristes commandent en confiance.",
        tag: "35 langues",
      },
      {
        Icon: BarChart3,
        title: "Numérotation quotidienne et journal",
        desc: "Chaque commande reçoit un numéro du jour pour la cuisine, atterrit dans un journal avec totaux et horodatages, alimente l'analytique. Les annulations sont soft-deleted pour garder les rapports propres.",
        tag: "Journal des commandes",
      },
    ],
  },

  founder: {
    eyebrow: "Construit par un patron de café, pas par une startup de livraison",
    quoteStart:
      "Avec ma femme nous avons ouvert un café et passé des semaines à chercher un moyen de prendre les commandes en salle qui ne donnait pas 30% à un agrégateur ni n'exigeait un TPV à 1500€. Tout ce qu'on essayait était lourd, cher ou manquait l'essentiel —",
    quoteAccent: "alors nous avons construit le logiciel de commande que nous aurions aimé avoir.",
    sign: "Bogdan Sokolov · fondateur, ex-patron de café",
    photoAlt: "Bogdan, fondateur de IQ Rest",
  },

  how: {
    heading: "Activez votre logiciel de commande",
    headingAccent: "en 4 étapes",
    sub: "Aucune installation, aucun intégrateur, aucun appel à l'informatique. Juste votre téléphone et 5 minutes.",
    steps: [
      { n: "1", t: "Créez le restaurant", d: "Connexion par email ou Google — 30 secondes." },
      { n: "2", t: "Ajoutez le menu", d: "Glisser-déposer, ou scan IA d'un menu papier." },
      { n: "3", t: "Choisissez le canal", d: "Tablette cuisine, WhatsApp, ou les deux." },
      { n: "4", t: "Imprimez les QR", d: "Un QR par table — les clients commandent immédiatement." },
    ],
  },

  pricing: {
    badge: "Commandes illimitées · Zéro commission",
    heading: "Un seul plan.",
    headingAccent: "Pas de frais par commande.",
    sub: "Commandes en ligne, menu QR, mode WhatsApp, checkout multilingue et analytique — tout dans un seul abonnement. Pas de pourcentage par transaction.",
    monthlyLabel: "Mensuel",
    yearlyLabel: "Annuel",
    saveBadge: "Économisez 25%",
    perMonth: "par mois",
    billedAnnually: "Facturé annuellement {total}",
    youSave: "Vous économisez {amount}",
    trust: {
      secure: "Abonnement facturé par Stripe",
      noCommitment: "Sans engagement",
      quick: "Actif en quelques minutes",
      restaurants: "+500 restaurants",
    },
  },

  faq: {
    eyebrow: "Logiciel de commande — questions fréquentes",
    heading: "À propos du logiciel",
    headingAccent: "de commande.",
    sub: "Ce que les restaurateurs demandent avant d'activer les commandes en ligne avec IQ Rest. Pas votre question ? Écrivez-nous sur WhatsApp — de vraies personnes répondent.",
    whatsappCta: "Demander sur WhatsApp",
    whatsappPrefill: "Bonjour, j'ai une question sur les commandes IQ Rest",
    items: [
      {
        q: "Est-ce une plateforme de livraison comme Uber Eats ou Deliveroo ?",
        a: "Non, c'est tout l'intérêt. IQ Rest est le canal de commande propre au restaurant — le client commande depuis votre QR, la commande arrive sur votre tablette ou WhatsApp, vous la servez. Pas de marketplace, pas de catalogue d'agrégateur, et nous ne prenons jamais de pourcentage sur l'addition.",
      },
      {
        q: "Où les commandes apparaissent-elles exactement ?",
        a: "Dans l'onglet Cuisine du tableau de bord IQ Rest, sur n'importe quelle tablette ou téléphone que vous gardez au pass ou au bar. Chaque commande affiche le numéro de table, les plats avec variantes et allergènes, le commentaire du client et le numéro de commande du jour. Vous la déplacez de nouveau → en cours → terminé d'un tap.",
      },
      {
        q: "Puis-je recevoir les commandes sur WhatsApp à la place ?",
        a: "Oui. Chaque restaurant a trois modes : interne (tablette cuisine uniquement), WhatsApp (la commande arrive en message formaté sur le WhatsApp de l'établissement) ou les deux à la fois. Le mode est un seul interrupteur dans le tableau de bord — changez quand vous voulez.",
      },
      {
        q: "Que contient une commande — juste les plats ?",
        a: "Plats avec leurs variantes et ajouts (avec différence de prix incluse), allergènes, numéro de table, commentaire libre du client et — si vous activez les champs — nom, téléphone et adresse du client. Suffisant pour gérer un emporter ou rappeler la table pour un allergène.",
      },
      {
        q: "Les clients peuvent-ils payer en ligne depuis le menu ?",
        a: "Pas par défaut. IQ Rest est pensé pour le paiement à table — le client commande, vous apportez l'addition, il paie comme d'habitude. Si vous avez besoin du paiement carte en ligne (typique pour la vente à emporter), une intégration Stripe Connect est possible sur demande ; écrivez-nous sur WhatsApp.",
      },
      {
        q: "Faut-il une tablette spéciale, une imprimante ou du matériel TPV ?",
        a: "Non. N'importe quelle tablette, ordinateur portable ou téléphone avec navigateur fonctionne — ouvrez le tableau de bord, connectez-vous, laissez l'onglet Cuisine ouvert. Si vous avez déjà un TPV, IQ Rest coexiste avec ; il ne remplace pas votre caisse.",
      },
      {
        q: "Comment le client sait-il que la commande est arrivée ?",
        a: "Il voit une confirmation dans le navigateur avec le numéro de commande du jour. L'onglet Cuisine se met à jour en temps réel — quand vous marquez en cours ou terminé, le client voit le statut sans recharger.",
      },
      {
        q: "Puis-je désactiver les commandes sur un établissement et garder le menu ?",
        a: "Oui. Chaque restaurant a un interrupteur Commandes activées. Désactivez-le et le menu fonctionne toujours — on peut parcourir, filtrer les allergènes, changer de langue — mais le panier disparaît. Utile pour les établissements qui veulent juste le menu QR sans le flux de commandes.",
      },
      {
        q: "Que se passe-t-il après les 14 jours gratuits ?",
        a: "Si vous n'ajoutez pas de moyen de paiement, le compte se met en pause — nous ne débitons jamais automatiquement. Menu, commandes et paramètres restent enregistrés ; ajoutez les données quand vous voulez pour réactiver. Annulez en un clic, sans engagement.",
      },
    ],
  },

  finalCta: {
    heading: "Activez votre logiciel de commande.",
    headingAccent: "Live en 5 minutes.",
    sub: "14 jours gratuits, sans carte. Annulez à tout moment. Rejoignez 500+ restaurants qui pilotent leurs commandes avec IQ Rest.",
  },

  scan: {
    heading: "De la carte papier au logiciel de commande",
    headingAccent: "en 60 secondes",
    sub: "Téléchargez une photo de votre carte papier — l'IA extrait catégories, plats et prix directement dans l'éditeur. Le panier et le QR sont à un clic.",
    cta: "Scanner ma carte →",
  },

  footer: {
    featureLinks: [
      { href: "/fr/ai-translation", label: "Traduction IA" },
      { href: "/fr/reservations", label: "Réservations" },
      { href: "/fr/mobile-management", label: "Gestion mobile" },
      { href: "/fr/easy-menu", label: "Éditeur de menu" },
      { href: "/fr/custom-design", label: "Fonds vidéo et photo" },
      { href: "/fr/color-scheme", label: "Couleurs de marque" },
      { href: "/fr/multilingual", label: "Menu multilingue" },
      { href: "/fr/ai-images", label: "Optimisation photo IA" },
      { href: "/fr/analytics", label: "Analytique" },
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
