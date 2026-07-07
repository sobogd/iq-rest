import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "menu-digital-restaurants",
  trackPrefix: "l_fr_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Menu numérique pour restaurants | IQ Rest",
    description:
      "Menu numérique pour restaurants : carte en ligne avec photos, allergènes, traduction IA et mises à jour des prix en direct. 14 jours gratuits, sans carte.",
    canonical: "https://iq-rest.com/fr/menu-digital-restaurants",
    ogLocale: "fr_FR",
    ogTitle: "Menu numérique pour restaurants",
    ogDescription:
      "Version en ligne de votre carte papier — photos, allergènes, traduction IA, mises à jour en temps réel.",
    brandLine: "IQ Rest — Menu numérique pour restaurants",
  },

  hero: {
    headline: "Un menu digital\nqui a tout",
    cta: "Créer le menu digital",
    sub: "Photos, allergènes et traduction en 35 langues. Plus commandes, WhatsApp et réservation de table — le tout dans un seul IQ Rest.",
  },

  scan: {
    heading: "Vous avez un menu papier ou un PDF ?",
    headingAccent: "L'IA le numérise en 60 secondes.",
    sub: "Téléchargez une photo ou un document — l'IA reconnaît automatiquement les catégories, les plats et les prix.",
    cta: "Scanner le menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Traduction IA",
      heading: "Menu en 35 langues",
      body: "Un QR, 35 langues. L'IA traduit avec le contexte culinaire, chaque plat sonne juste. Les touristes commandent sans hésiter.",
      bullets: [
        "35 langues dans votre offre",
        "IA culinaire, pas Google",
        "Langue changée en un tap",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Deux clients lisent le même menu numérique dans des langues différentes sur leurs propres téléphones" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergènes",
      heading: "Allergènes et régimes par plat",
      body: "Marquez gluten, lactose, fruits à coque, végan et sans gluten. Les clients filtrent le menu selon leur régime et commandent sereinement.",
      bullets: [
        "14 catégories d'allergènes",
        "Tags végan et sans gluten",
        "Filtrage par régime",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Un client filtre le menu par allergènes sur son téléphone tandis que le propriétaire modifie la liste des allergènes sur une tablette" },
    },
    {
      icon: Palette,
      eyebrow: "Design & marque",
      heading: "Menu premium sur votre domaine",
      body: "Écran d'accueil vidéo, votre design et une page contact avec carte et réseaux — sur votre domaine, pas un PDF.",
      bullets: [
        "Vidéo et design premium",
        "Votre domaine avec SSL",
        "Contacts, carte et réseaux",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Deux téléphones sur une table de café : écran d'accueil du menu avec arrière-plan vidéo et page contact avec carte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Commandes",
      heading: "Commandes en ligne, zéro commission",
      body: "Les clients commandent depuis le menu ou droit sur votre WhatsApp — ça arrive en salle ou en cuisine, avec 0% pris sur les ventes.",
      bullets: [
        "Depuis le menu ou WhatsApp",
        "En salle ou en cuisine, 0%",
        "Activez-le dans les réglages",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Deux téléphones sur une table : panier avec commande et confirmation d'envoi" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Réservations",
      heading: "Réservation de table, 24/7",
      body: "Les clients réservent une table eux-mêmes via le menu ou un lien, vous voyez le calendrier par table et confirmez en auto ou à la main.",
      bullets: [
        "Les clients réservent seuls",
        "Calendrier par table",
        "Confirmation auto ou manuelle",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gestion",
      heading: "Gérez-le où que vous soyez",
      body: "Le panneau tourne dans tout navigateur — téléphone, tablette ou PC. Rien à installer, un menu basique est en ligne en minutes.",
      bullets: [
        "Tout appareil, tout navigateur",
        "Rien à installer",
        "En ligne en minutes",
      ],
    },
  ],

  faq: {
    sub: "Ce que les restaurateurs demandent sur le menu numérique dans IQ Rest. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
    items: [
      { q: "Faut-il des compétences techniques ou de l'expérience CMS ?", a: "Non, aucune compétence particulière n'est requise. Toutes les actions dans le panneau d'admin se font par clic et glisser-déposer — sans code. Ajouter un article au menu prend quelques secondes : nom, prix, photo. La configuration complète d'un menu prend généralement 30 minutes à une heure." },
      { q: "Qu'est-ce que le menu numérique IQ Rest ?", a: "IQ Rest est une plateforme cloud pour restaurants. Le menu numérique est la version en ligne de votre carte, accessible aux clients via un code QR ou un lien direct : photos des plats, prix, allergènes, traduction IA en 35 langues, mises à jour en temps réel. Le menu est hébergé sur nos serveurs ; vous n'avez ni à installer ni à maintenir de logiciel — il suffit d'ouvrir un navigateur." },
      { q: "Les clients ont-ils besoin d'une app ou de matériel particulier ?", a: "Non. Les clients pointent l'appareil photo de leur téléphone sur le code QR et le menu s'ouvre dans le navigateur. Le panneau d'admin du restaurant fonctionne aussi dans n'importe quel navigateur moderne — téléphone, tablette ou ordinateur portable. Les codes QR s'impriment sur n'importe quelle imprimante de bureau." },
      { q: "Puis-je héberger le menu sur mon propre domaine ?", a: "Oui. Nous prenons en charge un domaine personnalisé avec certificat SSL — les clients voient le menu à l'adresse de votre restaurant (par exemple menu.votrerestaurant.fr). Nous aidons à configurer le DNS ; cela prend généralement 5 à 10 minutes." },
      { q: "Puis-je gérer plusieurs restaurants depuis un seul compte ?", a: "Oui, sur demande. Un compte peut héberger plusieurs restaurants : chaque établissement avec son propre menu, design, codes QR et statistiques. Écrivez-nous sur WhatsApp et nous activerons le mode multi-restaurants pour votre groupe." },
      { q: "À quel point est-il difficile de configurer le menu de zéro ?", a: "La configuration comporte trois étapes : (1) créer les catégories ; (2) ajouter les articles avec noms, prix et photos ; (3) imprimer les codes QR pour les tables. Si vous avez déjà un menu papier ou un PDF, téléchargez-le — l'IA reconnaîtra les catégories, les noms et les prix et remplira les cartes automatiquement. Un menu basique peut être en ligne en 5 minutes ; le temps total de configuration dépend du nombre d'articles." },
      { q: "Quel type de support proposez-vous ?", a: "Nous sommes disponibles sur WhatsApp pendant les heures d'ouverture et répondons rapidement par e-mail. Nous aidons à la configuration initiale, à la configuration du domaine, au design du menu et à toute situation non standard. Si vous avez besoin d'une démo ou d'un accompagnement au lancement — écrivez-nous." },
    ],
  },
};
