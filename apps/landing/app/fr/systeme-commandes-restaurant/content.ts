import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "systeme-commandes-restaurant",
  trackPrefix: "l_fr_orders",

  meta: {
    title: "Système de commandes pour restaurant — client et serveur | IQ Rest",
    description:
      "Commandes restaurant depuis un téléphone ou une tablette : plan de salle, partage d'addition, statuts, options et notes. Les clients commandent à table ; le serveur prend les commandes depuis n'importe quel appareil. 14 jours gratuits.",
    canonical: "https://iq-rest.com/fr/systeme-commandes-restaurant",
    ogLocale: "fr_FR",
    ogTitle: "Système de commandes pour restaurant — client et serveur",
    ogDescription:
      "Client à table ou serveur sur le téléphone — la commande arrive instantanément en cuisine. Plan de salle, partage d'addition, statuts, options et notes.",
    brandLine: "IQ Rest — Système de commandes pour restaurant",
  },

  hero: {
    headline: "Prise de commande : client et serveur — directement en cuisine.",
    sub: "Les clients commandent via le menu QR à table ou le serveur prend la commande depuis un téléphone ou une tablette — la commande arrive sur l'écran de cuisine en quelques secondes. Plan de salle avec tables codées par couleur, partage d'addition, options flexibles et commentaires. Pas de carnets, pas d'allers-retours au bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Un serveur prend une commande à table depuis un smartphone — la commande arrive sur l'écran de cuisine",
  },

  scan: {
    heading: "Configurez le système de commandes",
    headingAccent: "en 5 minutes.",
    sub: "Téléchargez un menu papier ou un PDF — l'IA reconnaît les plats, les prix et les catégories. Branchez une tablette en salle et commencez à prendre les commandes aux tables.",
    cta: "Scanner le menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liste et plan de salle",
      heading: "Liste des commandes à côté du plan de salle.",
      body: "Toutes les commandes actives à droite : statut, total, heure, nombre d'articles. À gauche — le plan de salle : tables colorées selon le statut — libre, occupée, à surveiller. Tapez une table pour ouvrir ou créer une commande ; tapez une carte pour ouvrir la vue détaillée. Pas de saut d'écran.",
      bullets: [
        "Plan de salle : tables codées par couleur selon le statut.",
        "Liste des commandes à côté — total, heure, nombre d'articles.",
        "Tapez une table pour ouvrir ou créer une commande.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablette à la station serveur : liste des commandes et plan de salle avec tables codées par couleur" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Carte de commande",
      heading: "Carte de commande : statuts, dupliquer, supprimer — un seul tap.",
      body: "Chaque article a son propre statut (En attente / En préparation / Prêt / Servi) — cuisine et serveur voient la même image en temps réel. Taper sur le point ouvre le menu d'actions : changer le statut, dupliquer l'article avec les mêmes modificateurs et options, supprimer. Tout à l'intérieur de la carte.",
      bullets: [
        "Statut par article : En attente / En préparation / Prêt / Servi.",
        "Dupliquer un article en un tap avec les mêmes options.",
        "Supprimer un article directement depuis la carte.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablette avec la carte détail de la commande : statuts des articles, actions dupliquer et supprimer" },
    },
    {
      icon: Receipt,
      eyebrow: "Partage d'addition",
      heading: "Partagez l'addition quand les clients paient séparément.",
      body: "Les clients ont décidé de partager — cochez les articles qui passent sur un nouveau ticket ; le reste reste sur l'actuel. Le système affiche instantanément les deux totaux. Un tap sur « Partager la commande » et vous avez deux commandes indépendantes avec les bons totaux, toujours liées à leurs tables.",
      bullets: [
        "Choisissez les articles à partager avec des cases à cocher.",
        "Les deux totaux s'affichent instantanément.",
        "Un tap et la commande est partagée sans calcul manuel.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablette sur une table de restaurant : modal de partage d'addition entre clients" },
    },
    {
      icon: Smartphone,
      eyebrow: "Ajout mobile",
      heading: "Ajoutez des articles depuis un téléphone — en trois actions.",
      body: "Le serveur n'est pas lié à un appareil : ouvre les commandes sur son téléphone et ajoute un article en trois étapes — catégorie, plat, options (taille, cuisson, sauce ou ingrédient supplémentaire). Le prix est recalculé automatiquement. La note pour la cuisine arrive à la dernière étape.",
      bullets: [
        "Trois étapes : catégorie → plat → options.",
        "Options (taille, suppléments, extras) tarifées en un clic.",
        "Champ de note à l'étape finale.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Quatre téléphones avec les étapes pour ajouter un article à la commande : catégorie, plat, taille, commentaire" },
    },
  ],

  faq: {
    sub: "Ce que les restaurateurs demandent sur la prise de commande dans IQ Rest. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
    items: [
      { q: "Plusieurs serveurs peuvent-ils travailler en même temps depuis différents appareils ?", a: "Oui. Chaque serveur se connecte au compte partagé du restaurant depuis son propre téléphone ou sa tablette — tout le monde voit les mêmes tables, commandes et statuts en temps réel. Les modifications d'un serveur apparaissent instantanément pour les autres, sans conflit ni verrou." },
      { q: "Les serveurs peuvent-ils utiliser leurs appareils personnels (BYOD) ?", a: "Oui. C'est une application web dans le navigateur — rien à installer. Le serveur ouvre un lien, se connecte au compte du restaurant depuis son iPhone, Android ou tablette personnelle et commence à travailler. À la fin du service, il se déconnecte." },
      { q: "Peut-on ajouter des options obligatoires aux plats (taille, cuisson, etc.) ?", a: "Oui. Chaque plat peut avoir n'importe quel nombre de groupes d'options — obligatoires (par exemple « Taille » : Petit / Moyen / Grand) et facultatives (« Cuisson » : saignant / à point / bien cuit). Les options peuvent changer le prix (+1,00 €). Si un groupe est obligatoire, le système ne laissera pas le client ou le serveur ajouter le plat sans choisir." },
      { q: "Les clients peuvent-ils ajouter des notes ou des extras à un plat (pain, sauce) ?", a: "Oui. La dernière étape d'ajout comporte un champ de note libre (« sans oignons », « bien cuit », « allergique aux fruits à coque »). Les extras sont des modificateurs séparés avec prix (« + sauce BBQ +1,50 € », « + Pain +2,00 € »). Les notes s'affichent sur l'écran de cuisine, mises en évidence en couleur." },
      { q: "Y a-t-il une statistique des commandes ?", a: "Oui. La section analytique montre : chiffre d'affaires par jour et par heure, ticket moyen, plats phares, conversion client → commande, vitesse de service (temps d'En attente à Servi). Cela aide à planifier les services, les achats et à repérer les plats peu performants." },
      { q: "Peut-on partager les commandes ou les déplacer entre tables ?", a: "Oui, les deux scénarios sont pris en charge. Pour partager — cochez les articles qui passent sur un nouveau ticket (pour les clients qui paient séparément). Pour déplacer — ouvrez la carte de commande, choisissez une nouvelle table ; toute la commande s'y déplace. Pas de calcul manuel, pas de sortie du panneau." },
    ],
  },
};
