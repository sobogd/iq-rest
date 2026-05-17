import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fr, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /fr page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Dès 6,90 €/mois · 14 jours gratuits · Annulation à tout moment",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Menu digital pour restaurants",
    sub: "500+ restaurants dans 30+ pays servent plus de tables, vendent plus aux touristes et suppriment les commissions de livraison. En ligne en 5 minutes — 14 jours gratuits.",
    verticals: ["Commandes en ligne", "Réservations", "Traduction IA", "Scanner de menu", "Allergènes", "Design premium", "Analytics"],
    dynamicHeadlines: [],
    headlinePrefix: "Menu digital pour ",
    accentWord: "restaurants",
    accentWordRotation: ["restaurants", "cafés", "bars", "pizzerias", "bistros", "brasseries"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Ma femme et moi avons ouvert un café et passé des semaines à chercher un menu digital pour restaurants qui gère aussi la commande à table et les réservations, sans être lourd ou moche —",
    quoteAccent: "alors nous avons construit le menu digital que nous voulions nous-mêmes.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "Qu'est-ce qu'un menu digital pour restaurants ?",
        a: "Un menu digital pour restaurants est la version en ligne de votre carte papier : le client scanne un QR code à table avec son téléphone et accède instantanément aux plats, photos, allergènes et prix dans le navigateur — sans application. Avec IQ Rest, le menu digital inclut aussi la commande directe à table, les réservations 24/7 et la traduction IA en 35 langues — tout est modifiable en temps réel depuis le téléphone.",
      },
      {
        q: "Combien coûte un menu digital pour restaurants ?",
        a: "6,90 €/mois, tout inclus (remise sur le plan annuel). Éditeur complet, QR codes illimités, commande directe sans commission, traduction IA en 35 langues, réservations et analytics. 14 jours d'essai gratuit, sans carte.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu digital pour restaurants.",
    headingAccent: "Prêt en 5 minutes.",
    sub: "14 jours gratuits. Pas de carte. Rejoignez 500+ restaurants qui utilisent leur menu digital avec IQ Rest.",
  },

  meta: {
    title: "Menu Digital pour Restaurants — Prêt en 5 Min | IQ Rest",
    description: "Menu digital pour restaurants : QR code imprimable, commandes directes sans commission, traduction IA en 35 langues. 5 minutes, 14 jours gratuits.",
    canonical: "https://iq-rest.com/fr/lp/menu-digital-pour-restaurants",
    ogLocale: "fr_FR",
    ogTitle: "Menu Digital pour Restaurants — Prêt en 5 Minutes",
    ogDescription: "Menu digital pour restaurants avec QR code, commandes directes et 35 langues IA. En ligne en 5 minutes — 14 jours gratuits.",
  },
};
