import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "menu-digital-restaurants",
  trackPrefix: "l_fr_digital",

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
    headline: "Menu numérique pour restaurants.",
    sub: "Version en ligne de votre carte papier avec photos, allergènes, descriptions et mises à jour des prix en direct. Les clients voient le menu dans leur propre langue ; le restaurant économise sur l'impression.",
    imageSrc: "/landing/hero-digital-menu.webp",
    imageAlt: "Two phones on a wooden restaurant table showing a digital menu with dish photos and prices",
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
      heading: "35 langues IA — chaque client lit le menu dans la sienne.",
      body: "Un seul code QR, 35 langues. L'IA gère le contexte culinaire — les noms et descriptions des plats sonnent naturels. Les touristes commandent avec plus de confiance et le ticket moyen augmente sans qu'un serveur doive traduire chaque plat.",
      bullets: [
        "35 langues incluses dans l'abonnement, sans surcoût.",
        "IA consciente du contexte culinaire, pas un simple Google Translate.",
        "Le client change de langue en un seul tap dans le menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Deux clients lisent le même menu numérique dans des langues différentes sur leurs propres téléphones" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergènes",
      heading: "Étiquettes d'allergènes et de régimes.",
      body: "Marquez les plats pour le gluten, le lactose, les fruits à coque, les fruits de mer, les options véganes et sans gluten. Les clients filtrent le menu selon leurs besoins alimentaires et commandent avec plus de confiance.",
      bullets: [
        "14 catégories d'allergènes standard sur chaque plat.",
        "Étiquettes végan, végétarien et sans gluten en un seul clic.",
        "Les clients filtrent le menu selon leurs contraintes alimentaires.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Un client filtre le menu par allergènes sur son téléphone tandis que le propriétaire modifie la liste des allergènes sur une tablette" },
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Design premium avec arrière-plan vidéo et page contact.",
      body: "Une vidéo ou une photo sur l'écran d'accueil, description du restaurant, page contact dédiée avec carte, numéros de téléphone et profils sociaux. Le menu numérique ressemble à un site web complet de restaurant, pas à un PDF derrière un code QR.",
      bullets: [
        "Arrière-plan vidéo ou grande photo sur l'écran d'accueil.",
        "Descriptions du restaurant et des catégories — racontez l'histoire du concept.",
        "Page contact : carte, téléphone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Deux téléphones sur une table de café : écran d'accueil du menu avec arrière-plan vidéo et page contact avec carte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Commandes depuis le menu · optionnel",
      heading: "Les clients passent commande directement depuis le menu.",
      body: "Les clients constituent un panier dans le menu QR et envoient la commande — elle arrive chez le serveur en salle ou sur la tablette de cuisine. La fonctionnalité peut être activée ou désactivée dans les paramètres à tout moment.",
      bullets: [
        "Panier, commentaires et envoi de commande en un seul tap.",
        "La commande arrive instantanément dans le panneau d'admin, sur WhatsApp ou sur l'écran de cuisine.",
        "Fonctionnalité activable dans les paramètres.",
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
