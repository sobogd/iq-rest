import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
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
      eyebrow: "35 langues IA",
      heading: "35 langues que chacun lit",
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
      icon: MonitorSmartphone,
      eyebrow: "Tout appareil",
      heading: "Gérez-le sur tout appareil",
      body: "Le panneau tourne dans le navigateur — modifiez menu, prix et photos où que vous soyez. Rien à installer.",
      bullets: [
        "Tourne dans tout navigateur",
        "Téléphone, tablette ou PC",
        "Rien à installer",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Zéro commission",
      heading: "Zéro commission, sans extras",
      body: "Un abonnement transparent. Nous ne prenons rien sur vos ventes et ne cachons aucun frais — tout reste au restaurant.",
      bullets: [
        "Zéro pour cent sur commandes",
        "Aucun extra caché",
        "Un prix unique",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Domaine propre",
      heading: "Le menu sur votre domaine",
      body: "Nous relions votre domaine avec SSL — les clients voient le menu à l'adresse du restaurant. On aide au DNS en 10 minutes.",
      bullets: [
        "Votre domaine avec SSL",
        "menu.votrerestaurant.fr",
        "On aide au DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Votre design",
      heading: "Design souple à votre image",
      body: "Plusieurs mises en page et styles prêts — choisissez la couverture, les couleurs et la présentation qui collent à votre lieu.",
      bullets: [
        "Plusieurs mises en page",
        "Votre couverture et couleurs",
        "Restyle en quelques clics",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contacts",
      heading: "Contacts et réseaux au menu",
      body: "Une page avec carte, téléphone et liens vers Instagram et WhatsApp — les clients vous trouvent en un seul tap.",
      bullets: [
        "Carte, téléphone et adresse",
        "Instagram et WhatsApp",
        "Vous joindre en un tap",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Commandes WhatsApp",
      heading: "Recevez les commandes sur WhatsApp",
      body: "Les clients montent un panier et envoient la commande droit sur votre WhatsApp — sans autre app, dans le chat qu'ils utilisent déjà.",
      bullets: [
        "Commande vers votre WhatsApp",
        "Sans autre app",
        "Le chat habituel",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Réservations",
      heading: "Réserver une table sans appels",
      body: "Les clients réservent depuis le menu ou un lien, vous voyez le calendrier par table et confirmez en auto ou à la main.",
      bullets: [
        "Réservation 24/7, sans appels",
        "Calendrier par table",
        "Confirmation auto ou manuelle",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "On dirait un site, pas un PDF",
      body: "Vidéo en fond sur l'écran d'accueil, votre concept décrit et une page contact à part avec carte et réseaux.",
      bullets: [
        "Vidéo sur l'écran d'accueil",
        "Concept et plats décrits",
        "Page contact à part",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Deux téléphones sur une table de café : écran d'accueil du menu avec arrière-plan vidéo et page contact avec carte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Commandes · optionnel",
      heading: "Commandes direct depuis le menu",
      body: "Les clients montent un panier et envoient la commande — elle arrive en salle, sur WhatsApp ou l'écran de cuisine. Optionnel.",
      bullets: [
        "Panier et envoi en un tap",
        "Salle, WhatsApp ou cuisine",
        "Activez-le dans les réglages",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Deux téléphones sur une table : panier avec commande et confirmation d'envoi" },
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
