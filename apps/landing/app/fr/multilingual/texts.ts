import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menu de restaurant multilingue — 35 langues, un tap pour changer",
    description:
      "Servez les clients internationaux dans leur langue. Menu de restaurant en 35 langues avec changement en un tap. Support RTL pour l'arabe et le persan. 14 jours d'essai gratuit.",
    canonical: "https://iq-rest.com/fr/multilingual",
    ogLocale: "fr_FR",
    ogTitle: "Site web restaurant multilingue avec menu — 35 langues intégrées",
    ogDescription:
      "Les touristes scannent, voient votre menu dans leur langue automatiquement. 35 langues, support RTL, détection auto depuis les paramètres du téléphone. 14 jours d'essai gratuit.",
  },

  hero: {
    title: "Votre menu parle la langue de chaque touriste.",
    subtitle:
      "Un menu de restaurant multilingue ne devrait pas être un projet. Avec IQ Rest, votre menu QR détecte automatiquement la langue du téléphone de chaque client et le sert dans l'une des 35 langues — y compris l'arabe et le persan avec un rendu de droite à gauche correct.",
    trustLine: "4.9 · 500+ restaurants dans 30+ pays",
  },

  seo: {
    description:
      "Construisez votre menu une fois, servez-le en 35 langues. IQ Rest détecte automatiquement la langue du téléphone de chaque client et rend le menu dans sa langue — pas de drapeau à toucher, pas de barrière linguistique, pas de moments gênants avec Google Translate. De l'espagnol et l'allemand au japonais, à l'arabe et au mandarin, vos clients voient votre restaurant tel qu'il était censé être vu.",
    fullDescription:
      "La plupart des menus « multilingues » sont des PDF de Google Translate cassé, imprimés une fois et jamais mis à jour. Le site web restaurant multilingue d'IQ Rest est de la vraie i18n : chaque langue a sa copie correctement traduite, son slug d'URL, ses meta tags pour l'indexation Google et son routing dans l'appli menu.\n\nQuand un touriste avec un iPhone en français scanne votre QR code, le menu s'ouvre automatiquement en français — pas de tap, pas de décision. Ils peuvent passer à n'importe quelle autre langue avec le sélecteur de langue en haut, mais la plupart n'en ont jamais besoin. La même chose s'applique aux étiquettes diététiques (« vegan » devient « vegano » / « vegetarisch » / « ヴィーガン » selon la langue), aux messages d'erreur, aux boutons « ajouter au panier », aux reçus. Chaque chaîne UI en 35 langues, pas seulement le contenu du menu.\n\nPour les langues RTL — arabe et persan — toute la mise en page se renverse correctement : le texte s'aligne à droite, les menus s'ouvrent depuis la droite, les prix apparaissent après le nom du plat comme attendu. Ce n'est pas un hack CSS, c'est un support RTL complet qui donne aux clients arabes et persans le sentiment d'être servis, pas adaptés après coup.",
    benefitsHeading: "Pourquoi un vrai menu multilingue bat une traduction PDF",
    benefits: [
      "35 langues avec une vraie traduction UI — pas seulement les éléments du menu",
      "Détection automatique de la langue du téléphone du client — aucun tap requis",
      "Sélecteur de langue manuel pour les clients qui préfèrent une autre langue",
      "Support RTL complet pour l'arabe et le persan — pas un hack CSS",
      "Chaque langue a sa propre URL — Google indexe 35 versions de votre site",
      "Modifiez la description d'un plat dans votre langue maternelle — les traductions suivent",
    ],
  },

  pricing: {
    heading: "Une seule formule.",
    headingAccent: "Les 35 langues incluses.",
    sub: "Menu multilingue, traduction IA, commande QR et réservations — tout dans un prix forfaitaire. Pas de frais par langue, pas d'extras pour le RTL.",
  },

  faq: {
    sub: "Tout ce que les restaurateurs demandent sur un menu multilingue. Pas votre question ? Écrivez-nous sur WhatsApp — de vrais humains répondent.",
    items: [
      {
        q: "Combien de langues le menu prend-il en charge ?",
        a: "35 langues : anglais, espagnol, allemand, français, italien, portugais, néerlandais, polonais, tchèque, slovaque, hongrois, roumain, bulgare, croate, serbe, slovène, grec, turc, russe, ukrainien, lituanien, letton, estonien, finnois, suédois, norvégien, danois, islandais, catalan, gaélique irlandais, arabe, persan, japonais, coréen et chinois. Les chaînes UI sont traduites professionnellement pour chacune.",
      },
      {
        q: "Comment les clients changent-ils de langue ?",
        a: "Deux moyens : automatique (le menu s'ouvre dans la langue de leur téléphone) et manuel (un sélecteur de langue en haut du menu). 80 % des touristes ne touchent jamais le sélecteur manuel — la détection auto fonctionne parce que leur téléphone connaît déjà leur langue.",
      },
      {
        q: "Prenez-vous en charge les langues de droite à gauche comme l'arabe et le persan ?",
        a: "Oui, avec une mise en page RTL complète. Tout le menu se renverse : le texte s'aligne à droite, les colonnes s'inversent, les tiroirs de navigation s'ouvrent du côté droit, les prix apparaissent après les noms de plats. C'est un vrai support RTL implémenté au niveau de la mise en page, pas seulement des astuces de direction CSS.",
      },
      {
        q: "Google indexera-t-il mon menu dans les 35 langues ?",
        a: "Oui. Chaque langue a son slug d'URL (ex. /es, /fr, /de), des balises hreflang correctes, des meta titres et descriptions localisés et des données structurées spécifiques à la langue. Google traite chaque langue comme une page séparée pour cette locale, ce qui signifie que les touristes qui cherchent votre restaurant dans leur langue ont plus de chances de vous trouver.",
      },
      {
        q: "Et si je ne veux pas les 35 langues — juste mes marchés principaux ?",
        a: "Choisissez quelles langues sont actives. Si vous êtes un restaurant de plage en Grèce qui sert surtout des touristes britanniques, allemands et italiens, activez seulement l'anglais, l'allemand et l'italien — les autres n'apparaissent pas dans le sélecteur de langue ou dans la détection auto. Vous pouvez toujours en activer plus plus tard à mesure que votre mix touristique change.",
      },
    ],
  },

  finalCta: {
    heading: "La langue du téléphone de chaque touriste.",
    headingAccent: "Déjà prise en charge.",
    sub: "Servez un menu multilingue en 35 langues, y compris l'arabe et le persan en RTL. 14 jours d'essai gratuit, sans carte, pas de frais par langue.",
  },
};
