import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "ecran-cuisine",
  trackPrefix: "l_fr_kds",

  meta: {
    title: "Écran de cuisine (KDS) pour restaurants | IQ Rest",
    description:
      "Écran de cuisine (KDS) pour restaurants : les commandes de la salle et du menu QR arrivent instantanément sur l'écran du chef. Colonnes par table, statuts En attente / En préparation / Prêt / Servi, filtres par zone. Fonctionne sur tablette ou téléphone.",
    canonical: "https://iq-rest.com/fr/ecran-cuisine",
    ogLocale: "fr_FR",
    ogTitle: "Écran de cuisine (KDS) — commandes sur l'écran du chef",
    ogDescription:
      "Commandes de la salle sur l'écran du chef. Colonnes par table, statuts et minuteur. Un tap change le statut.",
    brandLine: "IQ Rest — Écran de cuisine",
  },

  hero: {
    headline: "Écran de cuisine : commandes directement sur l'écran du chef.",
    cta: "Configurer l’écran de cuisine",
    sub: "Les tickets papier ne sont plus nécessaires. Les commandes de la salle ou du menu QR arrivent instantanément sur l'écran de cuisine — avec notes, allergènes et minuteur. Un tap change le statut. Fonctionne sur une tablette au passe ou sur le smartphone dans la poche du chef.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cuisine professionnelle avec une tablette sur un support en laiton affichant l'écran de cuisine avec les commandes actives",
  },

  scan: {
    heading: "Configurez l'écran de cuisine",
    headingAccent: "en 5 minutes.",
    sub: "Téléchargez un menu papier ou un PDF — l'IA reconnaît les plats, les catégories et les allergènes. Branchez une tablette en cuisine et commencez à recevoir les commandes.",
    cta: "Scanner le menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Contrôles et filtres",
      heading: "Plusieurs écrans par zone : cuisine et bar.",
      body: "Placez des tablettes séparées au chaud, au bar ou à la pâtisserie — chaque écran ne montre que les plats qui lui correspondent. Les filtres par statut (En attente / En préparation / Prêt / Servi) et par catégorie suppriment le bruit : le chef ne voit que ce qui concerne son poste.",
      bullets: [
        "Plusieurs écrans KDS avec filtres par catégorie.",
        "Filtre de statut : afficher uniquement En préparation et Prêt.",
        "Chaque zone ne voit que son propre flux de commandes.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablette sur un support en laiton au passe de cuisine — KDS avec filtre de statut" },
    },
    {
      icon: Timer,
      eyebrow: "Cartes et minuteur",
      heading: "Un tap change le statut. Notes et allergènes en couleur.",
      body: "La carte du plat montre les options choisies (sans oignons, bien cuit), la note du client, les allergènes et un minuteur depuis l'envoi de la commande. Tapez la carte et le statut passe au suivant : En attente → En préparation → Prêt → Servi. La liste est triée par priorité automatiquement.",
      bullets: [
        "Tap sur la carte — changement de statut instantané.",
        "Options, notes et allergènes mis en évidence en couleur.",
        "Tri par priorité : les articles en attente depuis plus longtemps remontent en haut.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablette sur un support en laiton sur le comptoir du bar — KDS avec cartes de commande par table" },
    },
  ],

  faq: {
    sub: "Ce que les restaurateurs demandent sur l'écran de cuisine dans IQ Rest. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
    items: [
      { q: "Quels sont les statuts de plat en cuisine ?", a: "Quatre statuts avec différentes couleurs de carte : En attente (gris) — la commande est acceptée et attend ; En préparation (orange) — le plat est en cours ; Prêt (bleu) — prêt à servir ; Servi (vert) — remis au client. Taper sur la carte la fait passer au statut suivant, sans menu ni confirmation." },
      { q: "Puis-je faire fonctionner plusieurs écrans KDS dans différentes zones ?", a: "Oui. Une tablette au chaud, une autre au bar, une troisième à la pâtisserie — chacune avec son propre filtre de catégorie. Tous les écrans sont synchronisés en temps réel : un statut changé sur un écran se met à jour partout." },
      { q: "De quel matériel ai-je besoin pour faire tourner le KDS ?", a: "Le KDS est une application web qui tourne dans n'importe quel navigateur moderne. Grande cuisine — une tablette sur un support en laiton au passe ou une télévision au mur. Petit établissement — le smartphone du chef. Pas de matériel particulier, pas d'installation : ouvrez un lien et connectez-vous au compte." },
      { q: "D'où viennent les commandes sur l'écran de cuisine ?", a: "De toutes les sources : le client qui a commandé via le menu QR à table ; le serveur qui a pris la commande depuis son téléphone ; le client qui a passé commande depuis le site. Tous arrivent sur le KDS avec un libellé de source et le numéro de table. Aucun transfert manuel depuis un POS." },
      { q: "Qu'affiche une carte de commande ?", a: "Nom du plat, modificateurs sélectionnés (sans oignons, bien cuit, ajouter sauce), commentaire du client, allergènes mis en évidence, statut (En attente / En préparation / Prêt / Servi) et un minuteur indiquant depuis combien de temps le plat attend. Les cartes sont triées par priorité : plus l'attente est longue, plus la carte remonte dans la colonne." },
      { q: "Puis-je filtrer les cartes à l'écran ?", a: "Oui. Deux filtres : par statut (par exemple n'afficher que En attente et En préparation, masquer Servi) et par catégorie (uniquement les boissons au bar, uniquement les plats principaux en cuisine). Les paramètres sont enregistrés par appareil — chaque zone conserve son propre jeu." },
    ],
  },
};
