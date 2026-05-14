import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Commande en ligne via menu QR — Commandes restaurant zéro commission",
    description:
      "Prenez des commandes directes depuis votre menu QR. Zéro commission, pas de coupe Uber Eats / Glovo. Les clients scannent, commandent, paient — directement chez vous. 14 jours d'essai gratuit.",
    canonical: "https://iq-rest.com/fr/online-orders",
    ogLocale: "fr_FR",
    ogTitle: "Commande en ligne sans commission — Commandes directes depuis votre menu QR",
    ogDescription:
      "Remplacez 30 % de commission des applis de livraison par des commandes directes. Les clients scannent votre QR, commandent, paient — chaque centime va dans votre poche. 14 jours d'essai gratuit, sans carte.",
  },

  hero: {
    title: "Commandes directes. Zéro commission. Direct en cuisine.",
    subtitle:
      "Arrêtez de payer 30 % à Uber Eats, Glovo et Wolt. Avec IQ Rest, vos clients scannent le QR, construisent leur commande sur leur téléphone et le ticket arrive dans votre cuisine — chaque centime reste chez vous.",
    trustLine: "500+ restaurants dans 30+ pays",
  },

  seo: {
    description:
      "Transformez votre menu QR en système complet de commande en ligne sans céder 30 % aux applis de livraison. Les clients scannent votre QR code, parcourent le menu dans leur langue, construisent un panier, envoient la commande — et vous la recevez avec le numéro de table, instantanément. Pas de téléchargement d'appli, pas de commission, pas de tiers entre vous et votre client.",
    fullDescription:
      "La plupart des restaurants perdent de l'argent avant même que la nourriture quitte la cuisine — Uber Eats prend 30 %, Glovo prend 30 %, Wolt prend 30 %. La commande en ligne via IQ Rest fonctionne complètement différemment. La commande va directement du téléphone du client à votre tableau de bord, et toute la marge est pour vous.\n\nL'UX de commande est conçue spécifiquement pour l'usage en restaurant : les clients choisissent une table, parcourent votre menu, ajoutent des articles au panier, laissent un commentaire pour la cuisine et soumettent. Vous voyez les nouvelles commandes en temps réel sur votre téléphone ou écran de cuisine, avec le numéro de table, les articles, les modifications et les notes. Marquez les plats comme prêts, la table voit le statut — et vous épargnez aux serveurs des dizaines de trajets par service.\n\nÇa marche aussi pour la vente à emporter et le pickup : les clients scannent le sticker QR près de votre porte, passent commande et paient — vous n'avez pas besoin d'une appli de commande séparée, d'un site séparé ou d'un projet d'intégration Stripe.",
    benefitsHeading: "Pourquoi la commande directe via IQ Rest bat les applis de livraison",
    benefits: [
      "Zéro commission sur chaque commande — gardez 100 % du chiffre",
      "Les commandes arrivent dans votre tableau de bord avec le numéro de table en temps réel",
      "Pas d'appli pour les clients — ils scannent votre QR et commandent dans le navigateur",
      "Modifications, commentaires, notes diététiques — tout capturé proprement",
      "Fonctionne pour la salle, la vente à emporter et le pickup — un menu, trois flux",
      "Suggestions d'upsell intégrées qui augmentent le panier moyen",
    ],
  },

  pricing: {
    heading: "Une seule formule.",
    headingAccent: "Zéro commission.",
    sub: "Commande directe, menu QR, site web restaurant et réservations — tout est inclus. Pas de frais par commande, pas de projet d'intégration Stripe.",
  },

  faq: {
    sub: "Tout ce que les restaurateurs demandent sur la commande en ligne. Pas votre question ? Écrivez-nous sur WhatsApp — de vrais humains répondent.",
    items: [
      {
        q: "Prenez-vous une commission sur les commandes ?",
        a: "Zéro. Chaque commande de votre menu QR va directement chez vous — pas de coupe pour nous, pas de frais Glovo / Uber Eats. Un seul abonnement mensuel forfaitaire, c'est tout. Le calcul est simple : si vous faites 5 000 €/mois sur les applis de livraison, vous perdez 1 500 €. Passez à la commande directe et ces 1 500 € restent dans votre poche.",
      },
      {
        q: "Comment les clients passent-ils commande — ont-ils besoin d'une appli ?",
        a: "Pas d'appli. Les clients scannent votre QR code avec l'appareil photo de leur téléphone, le menu s'ouvre dans le navigateur, ils choisissent la table, parcourent, ajoutent au panier et soumettent. Tout le flux se fait en deux taps après le scan. Pas de recherche App Store, pas d'inscription, pas de friction.",
      },
      {
        q: "Comment je reçois les commandes en cuisine ?",
        a: "Les commandes apparaissent instantanément dans votre tableau de bord, avec le numéro de table, les articles, les modifications et toute note. Visualisez-les sur votre téléphone, sur une tablette à la passe ou sur un écran de cuisine. Marquez les articles comme prêts et la table voit le statut — moins d'appels « ma commande arrive ? », plus de rotation.",
      },
      {
        q: "Les clients peuvent-ils payer via le menu QR, ou seulement à table ?",
        a: "Les deux. Ils peuvent soumettre et payer en espèces ou par carte à table de manière classique, ou payer en ligne via Stripe directement dans le menu. Vous décidez ce qui est activé. Le paiement en ligne est sécurisé par Stripe — IQ Rest ne détient jamais l'argent, il va directement sur votre compte Stripe.",
      },
      {
        q: "Ça marche pour la vente à emporter et le pickup, pas seulement en salle ?",
        a: "Oui. Collez un sticker QR à votre entrée pour la vente à emporter ou partagez le lien de votre menu sur Instagram et WhatsApp. Les clients choisissent « pickup », commandent, paient — vous préparez, ils récupèrent. Même système, trois flux de commande différents : salle, vente à emporter, pickup.",
      },
    ],
  },

  finalCta: {
    heading: "Arrêtez de nourrir les applis de livraison.",
    headingAccent: "Commencez à garder 100 %.",
    sub: "Remplacez vos 30 % de commission par un forfait mensuel. 14 jours d'essai gratuit. Sans carte. Annulation à tout moment.",
  },
};
