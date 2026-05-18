import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fr, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /fr page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menu QR pour Restaurants. Prêt en 5 minutes.",
    sub: "Menu QR pour votre restaurant en 5 minutes. Tout inclus : éditeur mobile sans code, scan IA du menu, QR codes pour les tables et commandes directes sans commissions.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Ma femme et moi avons ouvert un café et passé des semaines à chercher un menu QR pour restaurants qui gère aussi commandes à table et réservations sans être moche ou compliqué —",
    quoteAccent: "alors nous avons construit le menu QR que nous voulions.",
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
        q: "Qu'est-ce qu'un menu QR pour restaurants ?",
        a: "Un menu QR pour restaurants est le code QR imprimable sur la table que les clients scannent avec l'appareil photo de leur téléphone pour ouvrir la carte dans le navigateur — sans app. Avec IQ Rest le menu QR inclut commandes à table, réservations 24/7 et traduction IA en 35 langues, tout mis à jour depuis le mobile.",
      },
      {
        q: "Combien coûte un menu QR pour restaurants ?",
        a: "6,90 €/mois, tout inclus. QR illimités pour chaque table, éditeur complet, commandes directes sans commission, traduction IA en 35 langues, réservations et analytics. 14 jours gratuits, sans carte.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu QR pour restaurants.",
    headingAccent: "Prêt en 5 minutes.",
    sub: "14 jours gratuits. Sans carte. Plus de 500 restaurants utilisent déjà leur menu QR sur IQ Rest.",
  },

  meta: {
    title: "Menu QR pour Restaurants — Prêt en 5 Min | IQ Rest",
    description: "Menu QR pour restaurants : QR code sur chaque table, commandes directes sans commission, traduction IA en 35 langues. En ligne en 5 minutes, 14 jours gratuits.",
    canonical: "https://iq-rest.com/fr/lp/menu-qr-pour-restaurants",
    ogLocale: "fr_FR",
    ogTitle: "Menu QR pour Restaurants — Prêt en 5 Minutes",
    ogDescription: "Menu QR avec commandes directes, 35 langues IA et réservations. En ligne en 5 minutes — 14 jours gratuits.",
  },
};
