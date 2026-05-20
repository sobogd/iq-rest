import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fr",
  slug: "reservation-tables",
  trackPrefix: "l_fr_bookings",

  meta: {
    title: "Réservation de tables 24/7 pour restaurants | IQ Rest",
    description:
      "Réservation de tables 24/7 pour restaurants : les clients réservent eux-mêmes via le menu QR ou le site. Calendrier par table, confirmations et rappels automatiques. Aucun client manqué. 14 jours gratuits.",
    canonical: "https://iq-rest.com/fr/reservation-tables",
    ogLocale: "fr_FR",
    ogTitle: "Réservation de tables 24/7 — les clients réservent eux-mêmes",
    ogDescription:
      "Les clients réservent des tables via le menu QR ou le site. Calendrier, confirmations automatiques, rappels. Aucun client manqué.",
    brandLine: "IQ Rest — Réservation de tables pour restaurants",
  },

  hero: {
    headline: "Réservation de tables 24/7 — les clients réservent eux-mêmes.",
    sub: "Les clients réservent des tables via le menu QR ou un lien direct. Calendrier par table, confirmations et rappels automatiques. Aucun client manqué et pas d'appels en heure de pointe.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Une hôtesse gère les réservations depuis une tablette à l'entrée du restaurant",
  },

  scan: {
    heading: "Lancez la réservation de tables",
    headingAccent: "en 5 minutes.",
    sub: "Activez le calendrier, ajoutez les tables avec photos et capacité — les clients commencent à réserver le jour même.",
    cta: "Activer la réservation",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formulaire de réservation",
      heading: "Les clients réservent eux-mêmes — par date, heure et nombre de personnes.",
      body: "Le client ouvre le menu QR ou un lien direct, choisit la date, l'heure et le nombre de personnes — et voit immédiatement les tables disponibles, chacune avec une photo, une description (terrasse, près de la fenêtre, banquette près du bar) et la capacité. La confirmation est envoyée automatiquement par e-mail et WhatsApp.",
      bullets: [
        "Choix d'une table par photo, description et capacité.",
        "Confirmation automatique et rappel une heure avant la visite.",
        "Champs minimaux dans le formulaire : nom, téléphone, nombre de personnes.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Un client réserve une table de restaurant depuis un téléphone : date, heure, nombre de personnes et sélection de table" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendrier des réservations",
      heading: "Calendrier par jour et par table — tout en un coup d'œil.",
      body: "Le panneau d'admin affiche un calendrier des réservations ventilé par table, jour, semaine et mois. Créneaux libres, tables occupées, réservations confirmées et non confirmées sur un seul écran. Fonctionne sur tablette en salle et sur ordinateur portable au bureau.",
      bullets: [
        "Vues jour, semaine et mois.",
        "Ventilation par table : qui, quand, combien de personnes.",
        "Déplacer, annuler ou confirmer une réservation en un tap depuis le téléphone.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendrier des réservations dans le panneau d'admin IQ Rest sur deux tablettes : Gantt quotidien par tables et vue mensuelle" },
    },
  ],

  faq: {
    sub: "Ce que les restaurateurs demandent sur la réservation de tables dans IQ Rest. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
    items: [
      { q: "Puis-je choisir quels jours et heures sont disponibles pour la réservation ?", a: "Oui. Le panneau d'admin permet de définir les horaires d'ouverture et les jours de la semaine disponibles — le système ne montrera pas les créneaux indisponibles aux clients. Vous pouvez fermer une date spécifique (événement d'entreprise, privatisation) ou désactiver temporairement tout le calendrier." },
      { q: "Puis-je télécharger une photo pour chaque table ?", a: "Oui. Chaque table peut avoir une photo, une description (terrasse, près de la fenêtre, banquette près du bar) et une capacité. Le client voit la table exacte qu'il réserve et fait un choix éclairé — cela réduit les attentes non satisfaites." },
      { q: "Puis-je désactiver la réservation à des dates précises ?", a: "Oui. Le calendrier permet de fermer des dates précises (jours fériés, événements privés, rénovation) ou des jours entiers de la semaine. À ces dates, les clients voient un message « réservation temporairement indisponible »." },
      { q: "Puis-je personnaliser les champs collectés auprès du client ?", a: "Oui. Le jeu par défaut : nom, téléphone, e-mail, nombre de personnes. Vous pouvez ajouter des champs personnalisés (occasion, allergies, demandes particulières) ou supprimer ceux qui ne sont pas nécessaires pour garder le formulaire aussi court que possible." },
      { q: "Puis-je limiter le nombre de personnes par table ?", a: "Oui. Chaque table a un paramètre « capacité » — le système ne laissera pas une table de 2 être réservée pour 6. Sur les tables plus grandes, vous pouvez définir un minimum pour que les petits groupes ne prennent pas la « table de huit » aux groupes plus importants." },
      { q: "À quel point la configuration de la réservation est-elle difficile ?", a: "Cela prend très peu de temps. Trois étapes : (1) ajouter les tables avec noms, photos et capacité, (2) activer le mode réservation dans les paramètres, (3) partager le lien ou le code QR avec les clients. Lancement complet en 5 à 10 minutes." },
      { q: "Puis-je utiliser le système de réservation sur mon propre domaine ?", a: "Oui. Nous prenons en charge un domaine personnalisé avec certificat SSL : les clients réservent à l'adresse de votre restaurant (par exemple reservation.votrerestaurant.fr). Nous aidons à configurer le DNS ; le processus prend 5 à 10 minutes." },
      { q: "Puis-je configurer une confirmation automatique ou manuelle ?", a: "Oui, le mode se règle dans les paramètres. En confirmation automatique, le client reçoit une confirmation immédiatement après l'envoi du formulaire et la réservation est considérée comme acceptée. En confirmation manuelle, la demande arrive dans le panneau d'admin avec le statut « en attente de confirmation » — le manager la revoit et confirme ou refuse. Le mode manuel est utile en cas de nombre limité de tables ou de politiques clients strictes." },
      { q: "Prenez-vous une commission sur les réservations ?", a: "Non. La réservation de tables est entièrement incluse dans le plan Pro — aucun pourcentage sur les clients, aucun frais par créneau, aucune commission d'agrégateur. Un tarif mensuel fixe et un nombre illimité de réservations." },
    ],
  },
};
