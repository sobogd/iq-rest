import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Gérez votre restaurant depuis votre téléphone — Tableau de bord mobile restaurant",
    description:
      "Ajoutez des plats, changez les prix, téléchargez des photos, voyez les commandes — tout depuis votre téléphone. Tout le tableau de bord IQ Rest est mobile-first. Pas d'ordinateur, jamais.",
    canonical: "https://iq-rest.com/fr/mobile-management",
    ogLocale: "fr_FR",
    ogTitle: "Gestion mobile restaurant — Pilotez votre menu depuis votre téléphone",
    ogDescription:
      "Mettez à jour les prix entre les tables. Téléchargez des photos depuis votre appareil photo. Voyez les commandes en direct au passe. Tout le tableau de bord IQ Rest tourne sur votre téléphone.",
  },

  hero: {
    title: "Pilotez votre restaurant depuis votre téléphone. Entre les tables.",
    subtitle:
      "Tout le tableau de bord IQ Rest est conçu mobile-first — ajoutez des plats, changez les photos, modifiez les prix et lisez les commandes en direct depuis le même téléphone dans la poche de votre tablier. Pas d'ordinateur portable, pas d'ordi de back-office, pas d'excuses.",
    trustLine: "500+ restaurants dans 30+ pays",
  },

  seo: {
    description:
      "Les restaurateurs ne sont pas assis à un bureau — ils sont derrière le bar, en cuisine, en salle. IQ Rest est conçu pour cette réalité. Chaque fonctionnalité du tableau de bord, de l'ajout de nouveaux plats à la visualisation des commandes en direct, a été pensée d'abord pour les pouces et les petits écrans. Si vous savez utiliser Instagram, vous pouvez piloter tout votre restaurant depuis IQ Rest sur votre téléphone.",
    fullDescription:
      "La plupart des logiciels de gestion de restaurant sont desktop-first avec une « version mobile » plaquée en afterthought — petits boutons, mises en page cassées, fonctionnalités cachées trois menus plus loin. IQ Rest a été conçu à l'inverse : chaque écran fonctionne parfaitement sur un téléphone, et la version desktop n'est que la même UI agrandie.\n\nCe que ça veut dire en pratique : prenez une photo du plat du jour avec l'appareil photo de votre téléphone et chargez-la directement dans le menu. Vous repérez une faute de frappe sur une description en débarrassant une table — corrigez-la sur place, le changement est en ligne en quelques secondes. Un chef qui s'en va ? Mettez le plat hors ligne depuis votre téléphone avant que le prochain client ne scanne votre QR. Nouveau plat de la cuisine ? Tap, tapez, photo, prix — les clients peuvent le commander 30 secondes plus tard.\n\nLa même logique s'applique aux commandes, réservations, analytics et traductions. La liste des commandes en direct se rafraîchit en temps réel. Les confirmations de réservation se font en un tap. Le chiffre du jour, les top plats et les heures de pointe tiennent sur un écran de téléphone. Vous n'avez plus jamais besoin d'aller au back-office pour gérer quoi que ce soit.",
    benefitsHeading: "Pourquoi la gestion mobile-first change tout",
    benefits: [
      "Accès complet au tableau de bord depuis n'importe quel smartphone ou tablette — pas d'appli à installer",
      "Téléchargez les photos de plats directement depuis l'appareil photo de votre téléphone en deux taps",
      "Mettez à jour prix, descriptions, horaires depuis n'importe où",
      "Drag-and-drop tactile pour catégories et ordre des plats",
      "Commandes en direct, réservations et analytics tiennent sur un écran de téléphone",
      "Tolérant hors ligne — finissez l'édition, ça se synchronise à la reconnexion",
    ],
  },

  pricing: {
    heading: "Une seule formule.",
    headingAccent: "Pilotez depuis votre téléphone.",
    sub: "Tableau de bord mobile-first plus menu QR, commande en ligne, traduction IA et réservations — tout dans un prix forfaitaire.",
  },

  faq: {
    sub: "Tout ce que les restaurateurs demandent sur la gestion mobile. Pas votre question ? Écrivez-nous sur WhatsApp — de vrais humains répondent.",
    items: [
      {
        q: "Dois-je installer une appli mobile ?",
        a: "Non. IQ Rest tourne dans le navigateur de votre téléphone — Safari, Chrome, celui que vous utilisez déjà. Vous pouvez l'ajouter à votre écran d'accueil pour un accès en un tap (ça ressemblera à une appli native), mais il n'y a rien à télécharger depuis l'App Store, pas de permissions à accorder, pas de mises à jour à surveiller.",
      },
      {
        q: "Puis-je vraiment télécharger les photos du menu directement depuis mon téléphone ?",
        a: "Oui — c'est le but. Tapez « ajouter une photo » sur un plat, l'appareil photo de votre téléphone s'ouvre, prenez ou choisissez dans la galerie, lancez l'upload. L'image se redimensionne automatiquement, s'optimise pour le web et est en ligne sur votre menu en quelques secondes. Pas de Lightroom, pas de transfert de fichiers vers un ordinateur, pas de SFTP.",
      },
      {
        q: "Ça marche sur tablettes et au pupitre d'accueil ?",
        a: "Oui. Le tableau de bord est optimisé pour téléphones, tablettes et ordinateurs de bureau — même UI, mêmes raccourcis, même vitesse. Beaucoup de restaurants font tourner un iPad au pupitre d'accueil pour les réservations, un téléphone dans la poche du chef pour les commandes et un portable au back-office pour la facturation — tout avec le même login.",
      },
      {
        q: "Et la mise à jour des prix pendant un service chargé ?",
        a: "Conçu pour. Tap sur un plat, modifier le prix, enregistrer — les clients voient le nouveau prix en quelques secondes sans rafraîchissement. Pas de republication, pas de reconstruction, pas de délai de synchro. Pareil pour marquer un plat comme « épuisé » (il devient gris instantanément sur le menu) ou ajouter un plat du jour entre deux coups de feu.",
      },
      {
        q: "Et si mon téléphone meurt en pleine édition ?",
        a: "Les modifications sont enregistrées par champ au fur et à mesure que vous tapez — si votre téléphone meurt ou si votre internet tombe, vous retrouverez vos changements à la reconnexion sur n'importe quel appareil. Pas de travail perdu.",
      },
    ],
  },

  finalCta: {
    heading: "Pilotez-le depuis la poche de votre tablier.",
    headingAccent: "Sautez le back-office.",
    sub: "Tout le tableau de bord tient sur votre téléphone. 14 jours d'essai gratuit, sans carte, sans appli à installer.",
  },
};
