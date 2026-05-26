import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "menu-qr-code-restaurant",
  trackPrefix: "l_fr_qr",

  meta: {
    title: "Menu QR code pour restaurants | IQ Rest",
    description:
      "Menu QR code pour restaurants : le client scanne le QR de la table, ouvre la carte dans le navigateur et commande dans sa langue. 14 jours gratuits, sans carte.",
    canonical: "https://iq-rest.com/fr/menu-qr-code-restaurant",
    ogLocale: "fr_FR",
    ogTitle: "Menu QR code pour restaurants",
    ogDescription:
      "QR sur la table, carte sur le mobile — photos, allergènes, 35 langues et mises à jour en temps réel.",
    brandLine: "IQ Rest — Menu QR code pour restaurants",
  },

  hero: {
    headline: "Menu QR code pour restaurants.",
    cta: "Créer le menu QR",
    sub: "Le client pointe l'appareil photo sur le QR code de la table et la carte s'ouvre aussitôt dans le navigateur du mobile : photos des plats, allergènes, prix toujours à jour et traduction automatique en 35 langues. Sans application à télécharger, sans réimprimer la carte à chaque changement de prix.",
  },

  scan: {
    heading: "Vous avez déjà une carte papier ou PDF ?",
    headingAccent: "L'IA la transforme en menu QR code en 60 secondes.",
    sub: "Téléversez une photo de la carte ou le PDF — l'IA extrait les catégories, les plats et les prix et les relie immédiatement au menu QR code.",
    cta: "Créer le menu QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Un QR, 35 langues",
      heading: "Un seul QR code, la carte en 35 langues.",
      body: "Le client scanne le QR et choisit sa langue : la traduction est gérée par une IA au sens culinaire, pas par un traducteur générique. Fini les cartes distinctes pour les touristes et les feuilles volantes sur la table.",
      bullets: [
        "Une seule impression du QR couvre 35 langues, incluses dans l'abonnement.",
        "L'IA comprend le langage culinaire — les noms des plats sonnent naturels dans chaque langue.",
        "Le client change de langue dans la carte, sans rescanner le QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Deux clients scannent le même QR code de table et lisent la carte dans des langues différentes" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergènes dans le QR",
      heading: "Allergènes et étiquettes diététiques dans le menu QR.",
      body: "Chaque plat de la carte reliée au QR peut porter des étiquettes gluten, lactose, fruits à coque, fruits de mer, options vegan et sans gluten. Le client filtre depuis son mobile les plats compatibles avec ses restrictions, sans avoir à demander au personnel.",
      bullets: [
        "14 catégories d'allergènes au niveau du plat.",
        "Étiquettes vegan, végétarien et sans gluten en un clic dans le panneau.",
        "Le client filtre le menu QR selon ses restrictions.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Un client filtre le menu QR par allergènes sur son mobile pendant que le propriétaire modifie la liste depuis une tablette" },
    },
    {
      icon: Palette,
      eyebrow: "Plus qu'un simple QR",
      heading: "Une carte QR soignée comme le site du restaurant.",
      body: "Après avoir scanné le code, le client ne tombe pas sur un PDF plat : il voit un écran d'accueil avec vidéo ou photo en vedette, la description du lieu et une page de contact avec carte, numéros de téléphone et réseaux sociaux. Le QR devient la porte d'entrée du restaurant en ligne.",
      bullets: [
        "Vidéo de fond ou photo en vedette sur l'écran d'accueil du menu QR.",
        "De la place pour raconter le concept du lieu et de chaque catégorie.",
        "Page de contact intégrée : carte, téléphone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Deux mobiles sur une table : écran d'accueil du menu QR avec vidéo de fond et page de contact avec carte" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Commander depuis le QR · en option",
      heading: "Depuis le QR code, le client peut aussi commander.",
      body: "Au-delà de consulter la carte, le menu QR peut devenir un canal de commande : le client ajoute les plats au panier et envoie la demande. La commande parvient au serveur en salle, sur WhatsApp ou sur l'écran de cuisine. La fonction s'active ou se désactive dans les réglages selon les besoins.",
      bullets: [
        "Panier, commentaires et envoi de la commande directement depuis le scan du QR.",
        "La commande arrive instantanément en salle, sur WhatsApp ou sur l'écran de cuisine.",
        "Fonction activable par horaires, par salles ou par restaurants précis.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Deux mobiles sur une table : un panier créé depuis le menu QR et une confirmation de commande envoyée" },
    },
  ],

  faq: {
    sub: "Ce que les restaurateurs demandent sur le menu QR code d'IQ Rest. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
    items: [
      { q: "Comment fonctionne le menu QR code d'IQ Rest ?", a: "Chaque table porte un QR code imprimé. Le client le scanne avec l'appareil photo du mobile et le navigateur ouvre la carte du restaurant — photos, descriptions, allergènes et prix à jour. Aucune application à télécharger, ni pour le client ni pour le personnel." },
      { q: "Faut-il des compétences techniques pour créer la carte QR ?", a: "Non. Le panneau fonctionne par clics et glisser-déposer, sans code ni configurations compliquées. Ajouter un plat prend quelques secondes : nom, prix, photo. La configuration initiale prend en général de 30 minutes à une heure ; si vous avez déjà un PDF du menu, l'IA le convertit automatiquement." },
      { q: "Les clients doivent-ils installer une appli pour lire le QR ?", a: "Non. L'appareil photo natif de l'iPhone et d'Android reconnaît le QR code en quelques secondes et ouvre la carte directement dans le navigateur. Le panneau d'administration fonctionne aussi depuis tout navigateur moderne — mobile, tablette ou ordinateur portable." },
      { q: "Comment imprime-t-on les QR codes pour les tables ?", a: "Les QR codes sont générés automatiquement dans le panneau (un par table ou un seul pour tout l'établissement) et se téléchargent en PDF prêts à imprimer. Il suffit d'une imprimante de bureau et d'un support : chevalet, autocollant ou sous-verre." },
      { q: "Puis-je utiliser mon propre domaine pour le menu QR ?", a: "Oui. Nous prenons en charge un domaine du restaurant avec certificat SSL (par exemple carte.votrerestaurant.fr) : quand le client scanne le QR, il voit l'adresse de votre restaurant au lieu d'un sous-domaine générique. La configuration DNS prend 5 à 10 minutes et nous vous accompagnons." },
      { q: "Puis-je gérer les QR de plusieurs restaurants depuis un seul compte ?", a: "Oui, sur demande. Un compte peut regrouper plusieurs établissements, chacun avec ses propres QR codes, sa carte, son design et ses statistiques. Écrivez-nous sur WhatsApp et nous activons le mode multi-restaurant." },
      { q: "Est-ce compliqué de lancer le menu QR de zéro ?", a: "Trois étapes : (1) créez les catégories ; (2) ajoutez les plats avec nom, prix et photo ; (3) imprimez les QR et placez-les sur les tables. Si vous avez déjà une carte papier ou un PDF, téléversez-le — l'IA reconnaît les catégories et les prix et remplit les fiches. Une carte de base peut être en ligne en 5 minutes." },
    ],
  },
};
