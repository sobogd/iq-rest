import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Système de réservation pour restaurant — Réservations 24/7, sans appels",
    description:
      "Acceptez les réservations de table 24/7 depuis votre menu QR et votre site web. Widget de réservation white-label, rappels par email, moins de no-shows. 14 jours d'essai gratuit.",
    canonical: "https://iq-rest.com/fr/reservations",
    ogLocale: "fr_FR",
    ogTitle: "Réservations restaurant — Système de réservation de table 24/7",
    ogDescription:
      "Arrêtez de manquer des réservations pendant que vous cuisinez. Les clients réservent 24/7 depuis votre menu QR, reçoivent des rappels par email, et vous réduisez les no-shows. 14 jours d'essai gratuit.",
  },

  hero: {
    title: "Arrêtez de manquer des réservations pendant que vous cuisinez.",
    subtitle:
      "Acceptez les réservations de table 24/7 — directement depuis votre menu QR, votre site web et Instagram. Les clients choisissent date, heure et nombre de couverts, vous confirmez en un tap, les rappels par email partent automatiquement. Moins d'appels, moins de no-shows, plus de couverts par soirée.",
    trustLine: "500+ restaurants dans 30+ pays",
  },

  seo: {
    description:
      "Un système complet de réservation restaurant intégré à votre menu QR. Les clients réservent une table depuis votre menu, votre site web, votre lien bio Instagram ou un bouton Google Maps — à tout moment, jour et nuit. Vous voyez les nouvelles réservations en temps réel, confirmez ou refusez en un tap, et le système envoie des rappels par email qui réduisent drastiquement les no-shows. Pas de coupe OpenTable, pas de commission par couvert, pas de contrat.",
    fullDescription:
      "Les réservations téléphoniques meurent. Les touristes ne téléphonent pas (indicatif différent, barrière linguistique), les millennials ne téléphonent pas (génération text-first), et vous perdez la moitié des réservations en plein service quand personne ne décroche. Les réservations IQ Rest vivent là où vos clients sont déjà : sur votre menu, dans le navigateur de leur téléphone, sur votre lien bio Instagram.\n\nLe flux de réservation tient sur deux écrans — choisir date et nombre de couverts, laisser un nom et un téléphone, ajouter optionnellement une note (« anniversaire », « allergie : noix », « chaise haute s'il vous plaît »). Vous recevez la réservation instantanément avec une confirmation/refus en un tap. Les clients confirmés reçoivent un rappel automatique par email 24 h avant, ce qui à lui seul réduit les no-shows d'environ 30 %. Vous pouvez aussi définir un nombre max de couverts par créneau, des dates blackout et quelles tables sont réservables vs walk-in seulement.\n\nContrairement à OpenTable ou TheFork, il n'y a pas de commission par couvert, pas d'appli séparée à télécharger et pas de tiers entre vous et le client. La réservation est à vous, les données sont à vous, et le système fait partie de votre abonnement — pas une taxe par réservation.",
    benefitsHeading: "Pourquoi les restaurants abandonnent OpenTable pour les réservations IQ Rest",
    benefits: [
      "Réservations 24/7 depuis menu QR, site web, Instagram, bouton Google Maps",
      "Pas de commission par couvert — abonnement forfaitaire, gardez 100 % du chiffre",
      "Rappels email automatiques réduisent les no-shows d'environ 30 % en moyenne",
      "Confirmation / refus en un tap depuis votre téléphone, pas de salle d'attente",
      "Max couverts par créneau, dates blackout, règles de réservation par table",
      "Demandes spéciales (allergies, anniversaires) capturées proprement à chaque réservation",
    ],
  },

  pricing: {
    heading: "Une seule formule.",
    headingAccent: "Réservations illimitées.",
    sub: "Réservations, menu QR, commande en ligne et traduction IA — tout en un prix forfaitaire. Pas de frais par couvert, pas de commission, pas de contrat.",
  },

  faq: {
    sub: "Tout ce que les restaurateurs demandent sur les réservations en ligne. Pas votre question ? Écrivez-nous sur WhatsApp — de vrais humains répondent.",
    items: [
      {
        q: "Prenez-vous une commission par réservation comme OpenTable ou TheFork ?",
        a: "Zéro. Les réservations font partie de votre abonnement mensuel forfaitaire — réservez 10 couverts par jour ou 1 000, le prix est identique. Pas de frais par couvert, pas de taxe par réservation, pas de coupe sur votre chiffre. Comparé aux 1–2,50 € par couvert d'OpenTable, un restaurant de 50 couverts par jour économise 1 500–3 750 € par mois.",
      },
      {
        q: "Comment les clients réservent-ils — doivent-ils télécharger une appli ?",
        a: "Pas d'appli. Ils scannent votre QR ou cliquent sur votre lien de réservation — date, heure, nombre de couverts, nom, téléphone, note optionnelle. Terminé. Tout le flux dure moins de 30 secondes et fonctionne dans n'importe quel navigateur. Vous pouvez aussi intégrer le formulaire de réservation directement sur votre site web ou partager une URL de réservation propre sur Instagram.",
      },
      {
        q: "Puis-je confirmer les réservations manuellement ou se confirment-elles automatiquement ?",
        a: "Les deux modes — votre choix par créneau ou par jour. Confirmation automatique si vous avez confiance en votre disponibilité et voulez paraître réactif 24/7. Confirmation manuelle si vous voulez filtrer les réservations (week-ends chargés, événements spéciaux). Vous recevez la réservation instantanément et confirmez en un tap depuis votre téléphone.",
      },
      {
        q: "Comment le système gère-t-il les no-shows ?",
        a: "Les rappels email automatiques partent 24 h et (optionnellement) 2 h avant la réservation — ça seul réduit les no-shows d'environ 30 % par rapport aux appels ou systèmes sans rappel. Vous pouvez aussi exiger un numéro de téléphone, marquer les clients comme « no-show » dans le tableau de bord, et avec le temps le système signale les récidivistes.",
      },
      {
        q: "Puis-je limiter le nombre de couverts par soir ?",
        a: "Oui. Définissez un max de couverts par créneau, un max de couverts par jour et des dates blackout (fermetures, événements privés). Vous pouvez même marquer certaines tables comme « réservables » vs « walk-in seulement », pour que vos meilleures places près de la fenêtre restent libres pour la sérendipité. Touristes et locaux réservent depuis le même système sans jamais piétiner votre plan de salle.",
      },
    ],
  },

  finalCta: {
    heading: "Des réservations pendant que vous cuisinez.",
    headingAccent: "Des rappels pour qu'ils viennent.",
    sub: "Acceptez les réservations 24/7 depuis votre menu QR, votre site web et Instagram. 14 jours d'essai gratuit, sans carte, sans commission par couvert.",
  },
};
