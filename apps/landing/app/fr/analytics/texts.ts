import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analytics du menu de restaurant — Scans QR, top plats, langues touristiques",
    description:
      "Voyez exactement comment les clients utilisent votre menu QR. Scans quotidiens, plats les plus consultés, préférences linguistiques, heures de pointe. Décisions data-driven pour votre restaurant.",
    canonical: "https://iq-rest.com/fr/analytics",
    ogLocale: "fr_FR",
    ogTitle: "Analytics restaurant — Suivez les scans de menu QR, plats et langues",
    ogDescription:
      "Sachez quels plats vos clients regardent vraiment, quand sont les heures de pointe et quelle nationalité de touriste est dans votre salle ce soir. 14 jours d'essai gratuit.",
  },

  hero: {
    title: "Arrêtez de deviner. Sachez ce que les clients font vraiment.",
    subtitle:
      "Voyez les analytics du menu de restaurant en temps réel — scans QR par heure, les plats sur lesquels les clients s'attardent, les langues que les touristes utilisent, le jour de semaine le plus lent — et utilisez ces données pour imprimer moins de menus, planifier plus malin, pousser les bons spéciaux.",
    trustLine: "500+ restaurants dans 30+ pays",
  },

  seo: {
    description:
      "Des analytics restaurant qui n'exigent pas une équipe data. IQ Rest suit chaque scan, vue, changement de langue et commande depuis votre menu QR, et fait remonter les patterns qui comptent : plats les plus vus, heures de pointe de scan, jour le plus chargé de la semaine, répartition linguistique de votre clientèle touristique. Prenez des décisions data-driven sans jamais ouvrir de tableur.",
    fullDescription:
      "La plupart des restaurants tournent à l'instinct — « on a l'impression que les mardis sont calmes », « je crois que les pâtes se vendent bien ». L'instinct est bon, les données sont mieux. IQ Rest suit chaque interaction avec votre menu QR pour que vous n'ayez pas à deviner : combien de fois votre QR a été scanné aujourd'hui, quels plats les clients ont regardé le plus longtemps, quels plats ils ont ajoutés au panier mais n'ont pas commandés, quelle langue les touristes ont utilisée.\n\nLe tableau de bord analytics fait remonter les réponses dans trois vues : aujourd'hui (scans en direct, commandes en cours, ce qui se commande maintenant), cette semaine (top 10 des plats, heures chargées, répartition linguistique, no-shows sur les réservations), et tendances (croissance mois sur mois, saisonnalité, patterns par jour). Vous pouvez creuser dans n'importe quel plat pour voir combien de fois il est vu vs commandé (un plat vu 200 fois mais commandé 5 fois a un problème de copy ou de photo), ou n'importe quelle langue pour voir quel mix touristique vous servez vraiment.\n\nL'objectif, ce sont les décisions, pas les dashboards : « mardi prochain est historiquement calme → lance une push notif happy hour », « les touristes italiens commandent des pâtes 3x plus que les locaux → mets les pâtes en premier quand langue=it », « ce plat a 90 % de taux de vue mais 5 % de taux de commande → améliore la photo ». De vrais changements, du vrai chiffre, sans MBA requis.",
    benefitsHeading: "Pourquoi les restaurants adorent les analytics IQ Rest plutôt que Google Analytics",
    benefits: [
      "Compteur de scans QR en direct — voyez votre soirée se remplir en temps réel",
      "Top plats vus et commandés — repérez ce qui marche et ce qui ne marche pas",
      "Répartition linguistique — sachez quels touristes sont dans votre salle",
      "Heures de pointe et patterns par jour — planifiez mieux, préparez mieux",
      "Conversion vue-vers-commande par plat — corrigez photos ratées et descriptions faibles",
      "Analytics de réservation — sources de booking, taux de no-show, mix de party-size",
    ],
  },

  pricing: {
    heading: "Une seule formule.",
    headingAccent: "Analytics complètes incluses.",
    sub: "Analytics restaurant, commande QR, traduction IA et réservations — tout dans un prix forfaitaire. Pas de tier premium pour les données, jamais.",
  },

  faq: {
    sub: "Tout ce que les restaurateurs demandent sur les analytics du menu. Pas votre question ? Écrivez-nous sur WhatsApp — de vrais humains répondent.",
    items: [
      {
        q: "Que puis-je vraiment voir dans le tableau de bord analytics ?",
        a: "Scans QR en direct (aujourd'hui, cette semaine, ce mois), plats les plus vus, plats les plus commandés, conversion vue-vers-commande par plat, répartition linguistique des clients, heures de pointe par jour de la semaine, valeur moyenne de commande, tables les plus chargées, taux de no-show des réservations et tendances dans le temps. Tout sur un dashboard, sans configuration nécessaire.",
      },
      {
        q: "Comment utiliser ça pour vraiment faire grimper le chiffre ?",
        a: "Trois patterns marchent pour la plupart des restaurants : (1) réordonner le menu pour que les plats les plus convertissants apparaissent en premier ; (2) corriger la photo ou la description sur les plats avec beaucoup de vues mais peu de commandes ; (3) pousser un happy-hour ou un spécial sur les jours/heures historiquement lents. On a vu des restaurants augmenter le chiffre des jours de semaine de 15–30 % rien qu'avec ces trois changements.",
      },
      {
        q: "C'est anonyme ou vous suivez les individus ?",
        a: "Anonyme et agrégé. On suit les vues de menu et les commandes par session, pas par utilisateur identifiable. Pas d'emails, pas de numéros de téléphone, pas d'adresses IP stockées sur le long terme. Le dashboard vous montre des patterns (« 200 scans le vendredi »), pas des personnes. Entièrement conforme au GDPR by design.",
      },
      {
        q: "Puis-je exporter les données ?",
        a: "Oui. Exportez n'importe quelle vue en CSV (top plats, scans quotidiens, répartition horaire, etc.) et ouvrez dans Excel ou Google Sheets. Utile pour partager avec investisseurs, comptables, ou pour combiner avec vos données POS.",
      },
      {
        q: "Ai-je besoin d'une configuration technique pour avoir les analytics ?",
        a: "Zéro. Les analytics sont activées par défaut dès que votre menu QR est en ligne — chaque scan, vue et commande est suivi automatiquement. Le dashboard fait partie de l'abonnement standard, pas un upsell, et vous verrez des données utiles dès votre premier jour de scans clients.",
      },
    ],
  },

  finalCta: {
    heading: "Arrêtez de deviner.",
    headingAccent: "Commencez à mesurer.",
    sub: "Analytics live de scans QR, top plats, heures de pointe, répartition linguistique des touristes. 14 jours d'essai gratuit, sans carte.",
  },
};
