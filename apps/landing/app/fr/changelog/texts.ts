// Hand-translated. Source-of-truth: app/en/changelog/texts.ts.
import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Journal des modifications — Mises à jour et nouveautés IQ Rest",
    description:
      "Chaque sortie d'IQ Rest au même endroit. Nouvelles fonctionnalités, améliorations IA et lancements produit pour les cartes QR, commandes en ligne et réservations de restaurants.",
  },
  pageTitle: "Journal des modifications",
  pageSubtitle:
    "Chaque mise à jour publiée pour rendre votre carte QR, vos commandes en ligne et vos réservations plus fluides. Les plus récentes en premier.",
  readMore: "Lire plus",
  backToList: "Retour au journal",
  publishedOn: "Publié le",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Photos de plats par IA pour carte QR | IQ Rest",
        description:
          "Générez des photos de plats au style cohérent pour toute votre carte QR en un clic. Pas de banques d'images, pas de photographe, pas de retouche.",
      },
      title: "Photos de plats générées par IA pour toute votre carte QR",
      subtitle:
        "Arrêtez de chercher dans les galeries de stock et de planifier des séances photo. IQ Rest génère désormais un set complet de photos de plats appétissantes, dans un style unique et cohérent — directement à partir des noms de votre carte.",
      intro:
        "Photographier chaque plat de votre carte coûte cher, prend du temps et reste rarement homogène. Les bibliothèques de stock laissent des trous et le style ne colle jamais vraiment à votre marque. IQ Rest comble ce manque avec la photographie de plats par IA intégrée : tapez un nom de plat, obtenez une photo de haute qualité qui s'accorde au reste de votre carte. Chaque image est générée spécifiquement pour vous, dimensionnée à la fois pour la carte QR et pour l'impression.",
      sections: [
        {
          title: "Un seul style photo sur toute la carte",
          body: "Quand un client fait défiler une carte, les styles disparates cassent l'expérience — l'un lumineux, l'autre sombre, l'un en plongée, l'autre de côté. IQ Rest génère chaque photo dans un style unique et cohérent avec votre marque : même direction de lumière, même langage d'assiette, même ambiance de fond. Le résultat ressemble à une vraie séance photo, sauf que chaque plat a été produit au moment où vous l'avez ajouté à la carte. À mesure que vous ajoutez de nouveaux plats, le style est conservé automatiquement.",
        },
        {
          title: "Du nom du plat à l'assiette en quelques secondes",
          body: "Rien à briefer. Vous ajoutez un plat — disons « Tagliatelles à la truffe et champignons sauvages » — et IQ Rest crée la photo en arrière-plan. L'image est uploadée sur votre carte, optimisée en WebP et prête à s'afficher avant que vous ayez fini d'ajouter le suivant. Si une photo ne correspond pas à ce que vous aviez en tête, regénérez-la d'un tap. Chaque restaurant reçoit des générations IA gratuites pour démarrer, avec des recharges abordables si vous voulez des photos pour une carte entière de 80 plats.",
        },
        {
          title: "Optimisées pour le mobile et le SEO",
          body: "Chaque image générée est encodée en WebP compressé à 80 % de qualité, puis servie depuis un CDN Hetzner à Nuremberg avec sous-échantillonnage intelligent. Les pages restent rapides en 4G, sans squelettes ni saut de mise en page. Les photos sont aussi indexables par Google Images — les clients qui recherchent vos plats par image peuvent retrouver votre carte directement.",
        },
      ],
      benefitsTitle: "Pourquoi les photos de plats par IA comptent",
      benefits: [
        "Pas d'abonnements aux banques d'images, pas d'honoraires de photographe",
        "Style cohérent avec votre marque sur tous les plats",
        "Les nouveaux plats reçoivent automatiquement une photo assortie",
        "WebP compressé — rapide en mobile, pas de saut de mise en page",
        "Générations gratuites incluses dans chaque plan",
        "Regénérez n'importe quelle photo d'un tap jusqu'à ce qu'elle soit parfaite",
      ],
      conclusionTitle: "Une photo pour chaque plat, sans la production",
      conclusionBody:
        "Les restaurants qui ajoutent des photos vendent plus de plats à forte marge — ce n'est pas une supposition, c'est une mécanique de revenu connue. La raison pour laquelle la plupart des cartes n'ont pas de photos, c'est le coût de production. IQ Rest élimine ce coût entièrement. Chaque plat ajouté reçoit une jolie photo alignée à votre marque avant la fin du paramétrage. Couplez-la aux commandes par QR et regardez les ventes additionnelles grimper sans toucher à un appareil photo.",
      ctaText: "Générez des photos IA pour chaque plat de votre carte — gratuit pendant votre essai.",
      ctaButton: "Essayez gratuitement",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Générateur de fond de couverture restaurant par IA | IQ Rest",
        description:
          "Générez automatiquement une belle image de couverture pour votre carte QR en quelques secondes. Adaptée à votre cuisine, ambiance et marque — sans banque d'images.",
      },
      title: "Fond de couverture de restaurant généré par IA",
      subtitle:
        "Votre carte QR transmet la bonne ambiance avant même que les clients fassent défiler. IQ Rest génère désormais une image de couverture personnalisée qui colle à votre cuisine et atmosphère — automatiquement.",
      intro:
        "La première impression compte, surtout quand un client scanne un QR à table. Une image de couverture générique annule tout ce que vous avez investi dans la décoration. IQ Rest génère désormais une image de couverture unique et atmosphérique pour chaque restaurant — basée sur la cuisine choisie à l'inscription. Trattoria italienne, izakaya japonais, bar à tapas espagnol — chacun reçoit une couverture qui colle.",
      sections: [
        {
          title: "Adaptée à votre cuisine et votre ambiance",
          body: "Quand vous terminez l'assistant d'inscription, IQ Rest prend la cuisine sélectionnée et génère une couverture en accord. L'italienne reçoit une lumière chaude de trattoria avec des pâtes en flou doux. La japonaise reçoit des lignes nettes et une composition équilibrée. La mexicaine reçoit des couleurs vives et l'énergie de la street food. La correspondance est automatique mais vous pouvez regénérer la couverture quand vous voulez, avec vos propres directions créatives si vous voulez quelque chose de spécifique.",
        },
        {
          title: "Optimisée pour les hero des cartes QR",
          body: "Les images de couverture sont générées au format exact utilisé par le hero de la carte QR — nettes sur tous les téléphones, pas de recadrage maladroit. Elles sont encodées en WebP, servies rapidement et chargées en lazy load pour que le reste de la carte s'affiche d'abord. La couverture pose le ton, puis disparaît à mesure que les clients commencent à parcourir les plats.",
        },
        {
          title: "Cohérence de marque dès le départ",
          body: "Le style de la couverture est automatiquement assorti aux photos de plats générées par IA pour votre carte — même langage de lumière, même palette de couleurs, même ambiance. Les clients perçoivent votre restaurant comme cohérent et conçu professionnellement, même si vous avez tout monté en cinq minutes depuis votre téléphone.",
        },
      ],
      benefitsTitle: "Pourquoi une couverture IA bat le stock",
      benefits: [
        "Unique à votre restaurant — pas une photo de stock que tout le monde utilise",
        "Adaptée à la cuisine choisie à l'inscription",
        "Même langage visuel que les photos de plats générées par IA",
        "Dimensionnée correctement pour le hero de la carte QR — pas de recadrage manuel",
        "WebP compressé pour un chargement rapide en mobile",
        "Regénérable d'un tap quand vous voulez",
      ],
      conclusionTitle: "Une couverture qui dit « on sait ce qu'on fait »",
      conclusionBody:
        "Quand un client scanne votre QR, la première chose qu'il voit, c'est votre couverture. Une image soignée et atmosphérique signale la qualité avant même la lecture du premier plat. Avec IQ Rest, ce soin est automatique — généré gratuitement à l'inscription, regénérable quand vous changez d'avis. Pas de galeries de stock, pas de travail de design, juste une couverture qui colle.",
      ctaText: "Obtenez une couverture IA personnalisée pour votre carte QR en moins d'une minute.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Assistant d'inscription en 3 étapes pour carte QR | IQ Rest",
        description:
          "Choisissez la cuisine, le nom du restaurant, l'email — et IQ Rest construit votre carte QR. L'inscription la plus rapide du secteur.",
      },
      title: "Assistant d'inscription en 3 étapes : de l'email à une carte QR fonctionnelle en moins d'une minute",
      subtitle:
        "Choisissez votre cuisine. Tapez le nom du restaurant. Confirmez votre email. Voilà — votre carte QR est prête, avec des plats d'exemple et des photos générées par IA.",
      intro:
        "Les restaurateurs n'ont pas le temps pour un formulaire d'inscription en 10 écrans. Alors on l'a réduit à trois. Choisissez la cuisine qui correspond à votre établissement. Tapez le nom du restaurant. Confirmez votre email. Le temps que vous vous connectiez pour la première fois, votre carte QR est déjà remplie de plats d'exemple adaptés à la cuisine et de photographie IA assortie. Vous pouvez servir un client en moins de 60 secondes après le début de l'inscription.",
      sections: [
        {
          title: "Étape 1 — Sélection de la cuisine",
          body: "Choisissez parmi une large liste de cuisines : italienne, espagnole, japonaise, mexicaine, française, méditerranéenne, indienne, américaine, café, bar, pizzeria et plus. Le choix pilote tous les défauts de l'assistant : plats d'exemple, style de couverture IA, devise par défaut et structure initiale des catégories. Vous ne configurez rien — vous choisissez un point de départ.",
        },
        {
          title: "Étape 2 — Nom du restaurant",
          body: "Tapez le nom tel que les clients le verront. On l'utilise partout : le hero de la carte QR, le titre de page, le slug SEO, l'aperçu de partage social. Pas de décision séparée entre nom de marque et nom d'affichage — un champ, une seule source de vérité. Sautable si vous voulez reporter la décision ; on remplit un placeholder que vous pouvez renommer plus tard.",
        },
        {
          title: "Étape 3 — Email ou connexion Google",
          body: "Confirmez avec email + code à usage unique, ou tapez « Se connecter avec Google » pour une création de compte instantanée. Pas de mot de passe à retenir. Au moment où vous confirmez, l'assistant lance le seeder de carte en arrière-plan — catégories créées, plats d'exemple insérés, photos IA générées, couverture restaurant prête. Vous atterrissez directement dans le tableau de bord avec une carte fonctionnelle.",
        },
      ],
      benefitsTitle: "Pourquoi une inscription 3 étapes bat un formulaire",
      benefits: [
        "Moins de 60 secondes de la landing page à une carte QR fonctionnelle",
        "Zéro décision irrévocable — juste des défauts d'où partir",
        "Plats d'exemple précompilés par cuisine — contenu instantané à éditer",
        "Photos IA et couverture prêtes au moment de la connexion",
        "Option Google sign-in — pas de mot de passe à gérer",
        "Progression anonyme sauvegardée si vous quittez en cours d'assistant",
      ],
      conclusionTitle: "L'inscription de carte QR la plus rapide, point",
      conclusionBody:
        "La plupart des services de carte QR vous font remplir des dizaines de champs avant de voir quoi que ce soit d'utile. IQ Rest inverse ça — on vous donne d'abord une carte fonctionnelle, puis on vous laisse personnaliser. L'assistant supprime toute barrière entre la curiosité et un produit utilisable. Les restaurants qui terminent l'inscription en moins de 60 secondes ont beaucoup plus de chances de publier réellement leur carte, prendre leur première commande et rester abonnés.",
      ctaText: "Démarrez l'assistant 3 étapes maintenant — votre carte sera en ligne en 60 secondes.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Carte d'exemple générée par IA à l'inscription | IQ Rest",
        description:
          "Sautez l'état vide. IQ Rest génère automatiquement une carte QR de démarrage selon votre cuisine — catégories, plats, prix et photos.",
      },
      title: "Carte d'exemple construite par IA juste après l'inscription",
      subtitle:
        "Plus de fixation devant un tableau de bord vide. IQ Rest sème votre compte avec catégories, plats et photos IA adaptés à votre cuisine pour que vous éditiez au lieu de partir de zéro.",
      intro:
        "Le plus dur dans tout nouvel outil, c'est l'état vide. Les nouveaux restaurateurs s'assoient, voient une carte vide et ferment l'onglet. IQ Rest corrige ça en peuplant votre carte au moment de l'inscription. Vous choisissez italienne — vous obtenez antipasti, pasta, pizza, dessert. Vous choisissez japonaise — vous obtenez sushi, ramen, donburi, saké. Chaque catégorie contient 6 à 10 plats de démarrage avec des photos générées par IA dans un style cohérent. Votre travail devient l'édition des prix et le réglage des noms, pas la construction depuis zéro.",
      sections: [
        {
          title: "Catégories et plats adaptés à la cuisine",
          body: "Le seeder ne déverse pas des plats au hasard. Il utilise la cuisine choisie dans l'assistant pour tirer un set curaté de catégories qui font sens pour votre type de restaurant. Une pizzeria reçoit « Pizza Classica », « Pizza Speciale », « Antipasti », « Bevande ». Un bistrot français reçoit « Entrées », « Plats principaux », « Fromages », « Desserts ». Le contenu de démarrage correspond à la convention que les clients attendent pour cette cuisine.",
        },
        {
          title: "Photos et prix dès le départ",
          body: "Chaque plat de démarrage arrive avec une photo générée par IA dans un style cohérent et un prix par défaut sensé en devise locale (auto-détectée par géolocalisation). Les prix sont des placeholders — vous les changerez — mais ils rendent la carte immédiatement crédible, donc vous pouvez prévisualiser la carte QR et sentir à quoi ressemblera le résultat final. C'est essentiel pour montrer à des partenaires, recueillir des retours ou simplement décider « oui, c'est l'outil qu'on veut ».",
        },
        {
          title: "Éditez, ne partez pas de zéro",
          body: "Une fois semés, tous les plats portent un drapeau isExample. Dès que vous éditez un plat — changez son nom, prix ou description — le drapeau disparaît. Les plats d'exemple restants se distinguent visuellement pour que vous sachiez ce qui est encore du contenu placeholder. Cette séparation rend évident ce qui est fait et ce qui reste à faire, transformant le problème de l'état vide en un flux d'édition productif.",
        },
      ],
      benefitsTitle: "Pourquoi une carte précompilée gagne",
      benefits: [
        "Zéro état vide — ouvrez le tableau de bord et voyez une carte fonctionnelle",
        "Catégories et plats correspondant à la cuisine choisie",
        "Photos IA pour chaque plat de démarrage dans un style unifié",
        "Devise locale auto-détectée, prix par défaut en place",
        "Le drapeau d'exemple s'efface à mesure que vous éditez — signal de progression clair",
        "Montrer à des parties prenantes une carte d'apparence réelle en quelques minutes",
      ],
      conclusionTitle: "Sautez la page blanche",
      conclusionBody:
        "Construire une carte de zéro intimide. En éditer une est facile. IQ Rest vous donne une carte de démarrage complète au moment de l'inscription, puis vous laisse l'ajuster pour correspondre à votre offre réelle. Résultat : plus de restaurants terminent le paramétrage, plus de cartes sont effectivement publiées, plus de clients scannent des QR qui mènent à des cartes réelles, éditées, en production.",
      ctaText: "Inscrivez-vous et obtenez une carte de démarrage complète dans votre cuisine.",
      ctaButton: "Construire ma carte",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Visite interactive de la carte pour les nouveaux | IQ Rest",
        description:
          "Un guide interactif en 7 étapes accompagne les nouveaux restaurateurs dans le tableau de bord de la carte QR — pas de doc, pas de vidéos, que du concret.",
      },
      title: "Visite interactive en 7 étapes à la première visite",
      subtitle:
        "On ne vous fait pas lire de documentation. La première fois que vous ouvrez la carte, IQ Rest vous accompagne — ajouter une catégorie, ajouter un plat, éditer, trier, prévisualiser, partager, en sept taps.",
      intro:
        "La plupart des produits SaaS enterrent l'onboarding dans un centre d'aide que personne ne lit. IQ Rest fait l'inverse : la première fois qu'un nouvel utilisateur atterrit sur la page de la carte, une visite interactive met en lumière chaque action clé dans l'ordre. Ajoutez une catégorie. Ajoutez votre premier plat. Éditez-le. Basculez la visibilité. Réorganisez. Prévisualisez la carte en direct. Partagez avec un client. À l'étape sept, vous avez utilisé toutes les fonctions dont vous aurez besoin 95 % du temps.",
      sections: [
        {
          title: "Dans le produit, pas dans une base de connaissances",
          body: "Chaque étape de la visite met en évidence l'élément réel de l'interface sur votre écran. Une bulle explique ce que fait l'élément et pourquoi il compte. Pas de captures d'écran — la capture EST votre tableau de bord. À mesure que vous avancez, vous apprenez en faisant, pas en lisant. Sautez à tout moment ; la visite persiste entre sessions jusqu'à ce que vous la terminiez ou la rejetiez définitivement.",
        },
        {
          title: "Conçue autour du vrai workflow",
          body: "Les sept étapes ne sont pas un déballage de fonctionnalités — elles correspondent au workflow qu'un nouveau restaurant accomplit réellement. D'abord les catégories (boissons, plats principaux, desserts), puis les plats, puis affiner chaque plat, puis organiser l'ordre d'apparition, puis prévisualiser pour s'assurer que ça rend bien, puis partager via QR. À la fin, vous avez bouclé le cycle de la carte vide au QR imprimé sur un chevalet de table.",
        },
        {
          title: "Localisée en 35 langues",
          body: "Le texte de la visite est traduit dans toutes les langues qu'IQ Rest supporte — comme le reste du tableau de bord. Les propriétaires hispanophones reçoivent des bulles en espagnol, les allemands en allemand, les catalans en catalan. Rien dans la visite ne suppose une connaissance de l'anglais.",
        },
      ],
      benefitsTitle: "Pourquoi une visite in-product bat un centre d'aide",
      benefits: [
        "Apprenez en faisant, pas en lisant la doc",
        "7 étapes couvrent ~95 % du workflow",
        "Rejetable à tout moment — ne bloque jamais le tableau de bord",
        "Persiste entre sessions jusqu'à complétion ou rejet",
        "Localisée en 35 langues — pas besoin d'anglais",
        "Pas de vidéos à charger — superposition instantanée sur l'UI native",
      ],
      conclusionTitle: "De confus à confiant en sept étapes",
      conclusionBody:
        "Le moment le plus difficile dans n'importe quel produit, ce sont les 30 premières secondes. L'utilisateur ouvre le tableau de bord, regarde autour de lui et soit comprend, soit part. La visite interactive d'IQ Rest élimine ce risque — en moins d'une minute, chaque nouvel utilisateur sait où ajouter un plat, comment prévisualiser, comment partager. La complétion de la visite est fortement corrélée à la publication réussie de la carte. On n'enseigne pas juste le produit — on met la carte en ligne.",
      ctaText: "Inscrivez-vous et laissez-vous guider à travers votre première carte QR en sept taps.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Pages d'atterrissage par pays pour carte QR de restaurant | IQ Rest",
        description:
          "Les visiteurs depuis la France voient une landing pensée pour les restaurants français. L'Espagne voit la sienne. 35 pays, 35 pages optimisées pour la conversion.",
      },
      title: "Page d'atterrissage sur mesure dans chaque langue",
      subtitle:
        "Les visiteurs ne reçoivent plus une page traduite automatiquement. Chacune des 35 langues supportées a sa propre landing, écrite pour ce marché.",
      intro:
        "Les landings traduites à la machine convertissent mal. La grammaire boite, les références culturelles tombent à côté et les conditions de paiement locales sentent l'import. IQ Rest livre désormais une landing unique pour chacune des 35 langues supportées — écrite pour le marché, pas seulement traduite. Les visiteurs français reçoivent une page sur les cafés et bistrots. Les espagnols sur les restaurantes y cafeterías. Les allemands sur les Restaurants und Imbisse. Chaque page met en avant la proposition de valeur qui compte le plus pour cette audience.",
      sections: [
        {
          title: "Une page par langue, pas de traduction automatique",
          body: "Chaque landing vit sous /<locale> en route Next.js indépendante. Les textes sont dans des objets TypeScript — versionnés, typés, déployables séparément. On peut tester en A/B une variante de hero en espagnol sans toucher à l'allemande. On peut localiser un appel sur le prix pour le real brésilien sans affecter les marchés euro. Résultat : itération plus rapide sur les landings qui pilotent vraiment la conversion.",
        },
        {
          title: "La géolocalisation route les visiteurs automatiquement",
          body: "À la première visite sur iq-rest.com, notre module geo nginx lit le code pays du visiteur et redirige vers le bon /<locale>. Les IP françaises atterrissent sur /fr. Les allemandes sur /de. Le Brésil sur /pt. On route même les zones catalanophones d'Espagne vers /ca au lieu de /es. Les visiteurs ne voient jamais de modal « choisissez votre langue » — ils voient leur langue par défaut.",
        },
        {
          title: "Balises hreflang et canoniques sur toute la marque",
          body: "Les 35 landings se référencent mutuellement via des balises hreflang pour que Google indexe la bonne pour chaque requête. Les URLs canoniques pointent vers l'URL par langue, pas vers une racine générique. La configuration suit exactement les directives SEO international de Google, donc chaque landing concourt dans sa langue sans cannibaliser les autres.",
        },
      ],
      benefitsTitle: "Pourquoi les landings par pays convertissent mieux",
      benefits: [
        "Phrasé natif sur chaque marché — pas auto-traduit",
        "Le geo-routing sert la bonne page automatiquement",
        "hreflang et canoniques suivent les directives Google",
        "Les visiteurs catalans en Catalogne voient le catalan, pas le castillan",
        "Devise, prix et CTA localisés par marché",
        "Tests A/B indépendants par langue sans contamination croisée",
      ],
      conclusionTitle: "35 langues, 35 portes d'entrée",
      conclusionBody:
        "Si un restaurateur français atterrit sur une page à moitié traduite en anglais avec des prix à l'américaine, il part. S'il atterrit sur une page qui lui parle en français, avec des prix en euros et des références françaises, il convertit. IQ Rest fait désormais la seconde chose sur chaque marché servi — 35 landings, 35 portes d'entrée optimisées pour la conversion, toutes geo-routées automatiquement.",
      ctaText: "Essayez IQ Rest dans votre langue — landing taillée pour votre marché.",
      ctaButton: "Ouvrir ma langue",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Se connecter avec Google au tableau de bord carte QR | IQ Rest",
        description:
          "Sautez les mots de passe et codes par email. Tapez « Se connecter avec Google » pour accéder à votre tableau de bord en moins d'une seconde.",
      },
      title: "Se connecter avec Google — accès en un tap à votre carte QR",
      subtitle:
        "Sautez les emails OTP et les mots de passe oubliés. Tapez « Continuer avec Google » et vous êtes dans le tableau de bord en moins d'une seconde.",
      intro:
        "L'authentification email + code à usage unique est sécurisée mais lente. Tapez l'email, attendez le code, basculez vers la boîte de réception, copiez le code, collez, soumettez. C'est un flux de 30 secondes au mieux. IQ Rest propose désormais Se connecter avec Google en alternative : tapez un bouton, choisissez votre compte Google, vous êtes dedans. Pas de mot de passe à oublier, pas d'aller-retour vers la boîte, pas de friction.",
      sections: [
        {
          title: "OAuth Google natif, pas une boucle de redirections",
          body: "On utilise le SDK officiel Google Identity Services avec l'UI One Tap sur les navigateurs compatibles. Le flux se passe dans une popup native, pas dans une redirection vers le domaine de Google et retour. L'ensemble prend environ une seconde après le premier tap. On vérifie le ID token Google côté serveur contre les clés publiques de Google, donc le flux est cryptographiquement sécurisé de bout en bout.",
        },
        {
          title: "Même compte, n'importe quelle méthode",
          body: "Si vous vous êtes inscrit avec email-OTP et choisissez ensuite Google, on lie les comptes par email. Vous pouvez basculer entre méthodes à chaque connexion. Pas de « compte Google séparé » à gérer et vous ne perdez pas votre carte en vous connectant différemment. On transmet aussi votre langue de tableau de bord pendant la connexion Google pour que les emails à votre compte arrivent dans la bonne langue dès le premier jour.",
        },
        {
          title: "Mobile-first — fonctionne sur iOS Safari et Android Chrome",
          body: "Le SDK officiel de Google a historiquement été fragile sur mobile. On l'a contourné en superposant un vrai bouton Google par-dessus notre UI plutôt que de déclencher des clics programmatiques (qu'iOS Safari bloque maintenant). Résultat : le bouton fonctionne sur tout navigateur mobile moderne, pas d'installation, pas d'app store.",
        },
      ],
      benefitsTitle: "Pourquoi Google sign-in bat l'email OTP",
      benefits: [
        "Un tap pour se connecter — pas d'aller-retour email",
        "Pas de mot de passe à retenir ou réinitialiser",
        "Même compte que vous utilisiez email ou Google",
        "Vérifié cryptographiquement côté serveur via le ID token Google",
        "Fonctionne de manière fiable sur iOS Safari et Android Chrome",
        "Langue transmise pour que les emails restent dans votre langue",
      ],
      conclusionTitle: "Le moyen le plus rapide de retourner dans votre tableau de bord",
      conclusionBody:
        "Les restaurateurs vérifient leurs cartes des dizaines de fois par semaine — entre les services, après une impression, en ajustant les prix. Chaque seconde épargnée à la connexion s'accumule. Google sign-in transforme un flux OTP de 30 secondes en un tap d'une seconde. L'email OTP reste disponible pour ceux qui le préfèrent, mais la plupart des utilisateurs choisiront Google après l'avoir essayé une fois.",
      ctaText: "Sautez le mot de passe — connectez-vous avec Google en un tap.",
      ctaButton: "Ouvrir le tableau de bord",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Notifications email multilingues en 35 langues | IQ Rest",
        description:
          "Rappels d'essai, réponses du support, emails d'abonnement — chaque notification d'IQ Rest arrive dans la langue de votre tableau de bord.",
      },
      title: "Notifications email multilingues dans toutes les 35 langues",
      subtitle:
        "Chaque email envoyé par IQ Rest — réponses du support, rappels d'essai, reçus d'abonnement — arrive dans la langue que vous avez définie dans votre tableau de bord. Y compris les mises en page de droite à gauche.",
      intro:
        "Un email dans la mauvaise langue, c'est de la friction au mieux, une suppression au pire. IQ Rest envoie désormais chaque email transactionnel dans la langue définie dans votre tableau de bord, à travers les 35 langues supportées. Emails de bienvenue, rappels d'expiration d'essai, confirmations d'abonnement, réponses du support — tout arrive dans votre langue, avec une grammaire correcte et un phrasé culturellement approprié. Les langues de droite à gauche comme l'arabe et le persan reçoivent des mises en page correctement inversées.",
      sections: [
        {
          title: "preferredLocale voyage avec votre compte",
          body: "Chaque utilisateur a un champ preferredLocale fixé à la première connexion. Que vous vous soyez inscrit via email-OTP, Google ou l'assistant, votre langue est capturée et persistée. Chaque tâche backend qui émet un email — webhooks Stripe, notifications de réponse du support, tâches cron planifiées — tire la preferredLocale de l'utilisateur et l'utilise pour choisir le bon template. Changez de langue dans le tableau de bord et le prochain email reflétera le changement.",
        },
        {
          title: "Templates RTL pour l'arabe et le persan",
          body: "Les mises en page de droite à gauche ne sont pas que de la traduction — toute la hiérarchie visuelle bascule. On livre des templates RTL dédiés pour l'arabe et le persan : la navigation va de droite à gauche, chiffres en arabo-indien quand approprié, logo de marque positionné correctement. Résultat : un email qui se sent natif pour les lecteurs RTL, pas un template LTR traduit avec un alignement cassé.",
        },
        {
          title: "Traduits par des experts du secteur de la restauration",
          body: "Les services de traduction génériques produisent des traductions littérales mais guindées. On a traduit chaque template avec une terminologie cuisine et hôtellerie qui sonne naturelle aux opérateurs de restaurants sur chaque marché. « Trial » devient « période d'essai » en français (pas « procès »). « Reservation » devient « Reservierung » en allemand (pas « Reservation »). Le niveau de détail s'accumule — les restaurants remarquent quand un outil parle correctement leur langue.",
        },
      ],
      benefitsTitle: "Pourquoi les emails multilingues comptent",
      benefits: [
        "Tous les emails transactionnels dans la langue de votre tableau de bord",
        "preferredLocale persiste entre les connexions",
        "Mises en page RTL pour l'arabe et le persan",
        "Terminologie hôtelière appropriée par langue",
        "Changer de langue met à jour les emails futurs immédiatement",
        "35 langues incluant catalan, slovène, estonien, letton",
      ],
      conclusionTitle: "Des emails qui parlent votre langue",
      conclusionBody:
        "La communication qui arrive dans la mauvaise langue, c'est de la communication qui ne fonctionne pas. IQ Rest envoie chaque email dans la langue que vous utilisez vraiment, avec la mise en page et la terminologie qui collent. Ça paraît petit jusqu'à ce que vous soyez un restaurateur français recevant une alerte d'expiration d'essai en anglais uniquement et que vous la ratiez. Plus maintenant.",
      ctaText: "Inscrivez-vous et recevez votre tableau de bord plus chaque email dans votre langue.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Tableau de bord restaurant mobile au feel iOS natif | IQ Rest",
        description:
          "Navigation par onglets en bas, gestion safe-area, formulaires sans zoom — le tableau de bord mobile d'IQ Rest se sent comme une app native sur iPhone.",
      },
      title: "Feel iOS natif sur votre téléphone",
      subtitle:
        "Navigation par onglets en bas, prise en compte complète de la safe-area, champs de formulaire sans zoom et transitions de page instantanées. Gérer votre carte QR au téléphone se sent maintenant comme utiliser une app iOS native.",
      intro:
        "La plupart des tableaux de bord SaaS pour restaurants sont des après-coup desktop-first sur mobile. IQ Rest est l'inverse — conçu pour les propriétaires qui pilotent leur carte au téléphone entre les services. Le tableau de bord mobile utilise désormais une navigation par onglets en bas, respecte les safe-area insets de l'iPhone, empêche le zoom des inputs iOS et utilise des transitions SPA quasi-instantanées. Ça ressemble et se sent comme une app native, sauf qu'il n'y a pas d'app à installer.",
      sections: [
        {
          title: "Onglets en bas, pas de hamburger",
          body: "Les menus hamburger sur mobile sont lents — taper pour ouvrir, taper l'élément, attendre la page. On a remplacé la sidebar desktop par une barre d'onglets en bas sur les téléphones : Carte, Commandes, Réservations, Réglages. Un tap accessible au pouce, navigation instantanée. L'onglet actif utilise la couleur d'accent de votre marque pour que l'emplacement actuel soit toujours évident.",
        },
        {
          title: "Safe-area insets et indicateur d'accueil",
          body: "Les iPhones modernes ont un indicateur d'accueil en bas et une encoche en haut. Les web apps qui ignorent ça finissent avec leur UI superposée à l'indicateur ou cachée derrière l'encoche. On utilise env(safe-area-inset-*) partout — la barre du bas se place au-dessus de l'indicateur, le padding du contenu prend en compte la dynamic island. Résultat : ça se sent conçu pour l'appareil, pas adapté d'un navigateur desktop.",
        },
        {
          title: "Inputs sans zoom et envoi instantané de formulaires",
          body: "iOS Safari zoome les formulaires avec une taille de police d'input inférieure à 16px. On a poussé chaque input à 16px et configuré le viewport avec maximum-scale=1, donc les taps ne déclenchent pas le zoom-and-jump qui casse tous les autres tableaux de bord web. Les soumissions de formulaire sont des actions serveur avec UI optimiste — le changement apparaît immédiatement, le réseau confirme en arrière-plan.",
        },
      ],
      benefitsTitle: "Pourquoi le feel natif compte sur mobile",
      benefits: [
        "Onglets en bas — accès en un tap à chaque section",
        "Conscient de la safe-area — pas de superposition avec l'indicateur d'accueil ou l'encoche",
        "Inputs 16px — pas de zoom-and-jump iOS au tap des formulaires",
        "Onglet actif utilisant la couleur d'accent de votre marque",
        "Transitions SPA — pas de rechargement complet entre sections",
        "Pas d'app à installer — fonctionne dans Safari et Chrome",
      ],
      conclusionTitle: "Un tableau de bord web qui se sent comme une app",
      conclusionBody:
        "La frontière entre web et natif est surtout une question d'attention au détail. Le tableau de bord mobile d'IQ Rest accorde cette attention — onglets en bas, safe-area, sans zoom, transitions instantanées — et le résultat, on jurerait que c'est construit en Swift. Sauf que ça marche aussi sur Android, et qu'il n'y a rien à installer ou mettre à jour via un app store.",
      ctaText: "Ouvrez IQ Rest sur votre téléphone et sentez la différence.",
      ctaButton: "Essayer gratuitement 14 jours",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Bannière de consentement RGPD pour site de restaurant | IQ Rest",
        description:
          "Bannière de consentement légale, alignée AEPD, sans scripts tiers. L'analytics sans cookies se déclenche même avant le consentement.",
      },
      title: "Bannière de consentement aux cookies conforme RGPD",
      subtitle:
        "Bannière construite sur mesure sans CMP tiers, sans balise script de Cookiebot ou OneTrust. Alignée avec les directives AEPD et ePrivacy, avec analytics sans cookies qui se déclenche avant le consentement.",
      intro:
        "Tout site commercial dans l'UE a besoin d'une bannière de consentement aux cookies. La plupart utilisent des CMPs tiers qui traînent des scripts lourds et ralentissent la page. IQ Rest a construit la sienne, légère, alignée AEPD, qui fait partie du bundle de la page — pas de DNS lookups supplémentaires, pas de tracking tiers. Les visiteurs voient un choix clair Accepter / Refuser, avec les deux boutons stylisés à égalité (le dark pattern de cacher « refuser » est illégal dans beaucoup de pays UE — on ne le fait pas).",
      sections: [
        {
          title: "Aligné AEPD et ePrivacy",
          body: "L'AEPD espagnole et la directive ePrivacy plus large exigent des boutons Accepter et Refuser de prominence égale. Beaucoup de CMPs offrent un dark pattern « énorme accepter, minuscule refuser » par défaut. On refuse ce pattern — les deux boutons ont la même taille, le même style, juste des couleurs différentes. Les visiteurs qui refusent sont suivis uniquement via des compteurs agrégés sans cookies ; on ne stocke jamais d'identifiant sur leur appareil, donc aucun cookie propriétaire ne reste après un refus.",
        },
        {
          title: "Pas de scripts tiers",
          body: "La plupart des bannières de consentement chargent Cookiebot, OneTrust ou similaires depuis un CDN. Ça ajoute 50-100KB de JavaScript, un DNS lookup supplémentaire et une relation de partage de données tierce à divulguer dans votre politique de confidentialité. La bannière d'IQ Rest fait partie du bundle de la landing page — pas de requêtes externes, pas de partage de données tiers, chargement de page plus rapide.",
        },
        {
          title: "Confidentialité, cookies et conditions en modals",
          body: "Cliquer « Politique de confidentialité », « Politique cookies » ou « Conditions » dans la bannière ouvre un modal — pas de navigation, pas de perte de votre position de défilement sur la landing. Le texte légal complet est là, scrollable, avec des en-têtes appropriés. Après lecture, fermez le modal et choisissez Accepter ou Refuser. Le flux est sans friction pour l'utilisateur et nous permet d'éviter des sauts de page supplémentaires qui nuiraient à la conversion.",
        },
      ],
      benefitsTitle: "Pourquoi notre bannière bat les CMPs tiers",
      benefits: [
        "Alignée AEPD et ePrivacy — Accepter/Refuser de prominence égale",
        "Pas de scripts tiers, pas de DNS lookups supplémentaires",
        "Confidentialité/Cookies/Conditions en modals — pas de sauts de page",
        "Analytics sans cookies se déclenche même avant le consentement — ne perdez jamais de données",
        "Cookie propriétaire supprimé au Refus",
        "Léger — partie du bundle de la landing",
      ],
      conclusionTitle: "Conformité sans frein de conversion",
      conclusionBody:
        "Le consentement aux cookies est non négociable dans l'UE mais ne doit pas ralentir votre page ni nuire à votre conversion. La bannière d'IQ Rest est rapide, juste et pleinement conforme. Les visiteurs qui Acceptent activent l'analytics par session ; les visiteurs qui Refusent s'enregistrent quand même dans nos compteurs anonymes agrégés, donc on sait ce qui se passe sur la landing sans jamais les identifier.",
      ctaText: "Voyez le flux de consentement en action — ouvrez IQ Rest dans un navigateur frais.",
      ctaButton: "Visiter la landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Confidentialité et conditions en modals — sans sauts de page | IQ Rest",
        description:
          "La politique de confidentialité, les conditions de service et la politique cookies s'ouvrent désormais en modals sur la landing — pas de perte de défilement, pas de navigation supplémentaire.",
      },
      title: "Confidentialité, conditions et politique cookies en modals — sans sauts de page",
      subtitle:
        "Cliquez n'importe quel lien légal sur la landing ou la page d'auth et la politique s'ouvre dans un modal propre. Pas de navigation, pas de perte de votre position de défilement, pas de cassure de votre flux de conversion.",
      intro:
        "Les pages /privacy, /terms et /cookies autonomes étaient le pattern standard — et l'erreur standard. Les visiteurs cliquaient le lien, perdaient leur place sur la landing, lisaient la politique, puis oubliaient de revenir. La conversion chutait. IQ Rest ouvre désormais les trois documents légaux comme modals in-page : même position de défilement préservée, même expérience landing ininterrompue, conformité légale complète maintenue.",
      sections: [
        {
          title: "Un composant Modal, trois documents",
          body: "On utilise un seul composant Modal avec un switch sur le type de document. Ouvrez-le depuis la bannière cookies, la page d'auth, le footer — même composant, même verrouillage de défilement, même fermeture par escape. Le texte légal vit dans des constantes TypeScript partagées donc mettre à jour une clause une fois se propage à chaque endroit où la politique est montrée. Pas de duplication, pas de dérive.",
        },
        {
          title: "Pile de modals — ouvrir un depuis l'intérieur d'un autre",
          body: "Si vous lisez la Politique cookies et voulez basculer vers la Politique de confidentialité, le lien à l'intérieur du modal ouvre le prochain modal par-dessus — pas comme une redirection. La pile gère la navigation arrière correctement, escape ferme le modal du dessus, cliquer à l'extérieur dégage gracieusement. L'interaction est ce que les utilisateurs attendent d'une app native.",
        },
        {
          title: "Les 35 langues — même texte source unique",
          body: "Le texte légal lui-même est en anglais (langue de notre entité légale, autónomo enregistré en Espagne), mais le chrome du modal — titres, bouton de fermeture, libellés de liens — est entièrement localisé dans les 35 langues. Les visiteurs en français, allemand, polonais ou coréen voient un modal localisé qui ouvre du texte légal anglais, exactement comme notre approche de conformité l'exige.",
        },
      ],
      benefitsTitle: "Pourquoi les modals battent les pages légales autonomes",
      benefits: [
        "Pas de perte de défilement — les visiteurs restent sur la landing",
        "Conversion plus haute — moins de bounces non intentionnels",
        "Composant unique, trois documents — pas de duplication",
        "Pile de modals — ouvrez l'un depuis l'intérieur de l'autre proprement",
        "Chrome localisé en 35 langues",
        "Conformité légale complète préservée",
      ],
      conclusionTitle: "Légal sans friction",
      conclusionBody:
        "Les avocats veulent que la politique soit lisible. Les marketeurs veulent que le visiteur convertisse. Les modals satisfont les deux : la politique est à un tap, pleinement lisible, sans impact sur le flux de la landing. La posture de conformité d'IQ Rest reste forte sans le frein de conversion des pages légales autonomes.",
      ctaText: "Essayez le nouveau flux — ouvrez la bannière cookies et tapez un lien de politique.",
      ctaButton: "Visiter la landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Catalan automatique pour les visiteurs de Catalogne | IQ Rest",
        description:
          "Les visiteurs depuis Barcelone, Tarragone, Lleida et Gérone voient automatiquement IQ Rest en catalan plutôt qu'en castillan.",
      },
      title: "Détection automatique du catalan pour les visiteurs de Catalogne",
      subtitle:
        "Les visiteurs depuis Barcelone, Tarragone, Lleida et Gérone atterrissent par défaut sur la version catalane d'IQ Rest. Le reste de l'Espagne reçoit toujours le castillan.",
      intro:
        "La Catalogne a une identité linguistique forte — des millions de Catalans utilisent le catalan comme première langue, distincte du castillan. IQ Rest respecte désormais cette distinction au niveau géo : les visiteurs dont l'IP est géolocalisée dans une province catalane reçoivent la landing /ca automatiquement. Le castillan reste le défaut pour le reste de l'Espagne. Les visiteurs peuvent changer de langue à tout moment via le modal de langues dans le footer.",
      sections: [
        {
          title: "Geo-détection au edge",
          body: "On lit le pays et la région du visiteur depuis notre module geo nginx à chaque requête. Si le pays est l'Espagne et la région correspond à Barcelone, Tarragone, Lleida ou Gérone (ou contient « Catalonia » / « Catalunya » dans le nom de la région), on redirige vers /ca. Sinon le visiteur suit le routing standard pays-vers-locale et atterrit sur la page de la langue appropriée.",
        },
        {
          title: "Le cookie de langue surcharge le geo",
          body: "Une fois que vous choisissez une langue manuellement via le sélecteur de langue, votre choix est persisté dans un cookie qui surcharge le geo pour les visites futures. Un visiteur catalanophone qui préfère lire IQ Rest en anglais ne sera pas redirigé sans cesse vers /ca — son choix explicite gagne toujours. Le geo est un défaut, pas une contrainte.",
        },
        {
          title: "Traduction catalane complète, pas auto-traduite",
          body: "La landing /ca n'est pas auto-traduite depuis l'espagnol — chaque mot est professionnellement traduit par des copywriters catalanophones du secteur de la restauration. Terminologie hôtelière, conditions de paiement, références culturelles correspondent toutes à la façon dont un restaurateur catalan parle réellement. La page se lit comme écrite pour le marché, parce qu'elle l'est.",
        },
      ],
      benefitsTitle: "Pourquoi l'auto-catalan compte",
      benefits: [
        "Les visiteurs depuis Barcelone/Tarragone/Lleida/Gérone voient le catalan automatiquement",
        "Le reste de l'Espagne reçoit toujours le castillan — pas de sur-routing",
        "Le choix manuel de langue persiste via cookie",
        "Traduction professionnelle complète, pas traduction machine",
        "Geo-détection au edge — pas de scintillement côté client",
        "Même landing optimisée pour la conversion que toute autre langue",
      ],
      conclusionTitle: "Respecter l'identité linguistique",
      conclusionBody:
        "Mettre par défaut les visiteurs catalans en castillan est une petite chose techniquement mais une grande chose politiquement et culturellement. Le geo-routing d'IQ Rest traite désormais le catalan comme une langue de premier rang pour les visiteurs de Catalogne. Résultat : une landing qui convertit mieux pour les restaurateurs catalanophones, qui se sentent respectés dès la première seconde où ils voient notre site.",
      ctaText: "Visitez IQ Rest depuis la Catalogne et voyez la page dans votre langue.",
      ctaButton: "Ouvrir la landing catalane",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal de fin d'essai — la carte QR reste publique | IQ Rest",
        description:
          "Quand votre essai se termine, votre carte ne disparaît pas. Les clients peuvent toujours scanner et voir ; vous voyez un modal d'upgrade dans le tableau de bord.",
      },
      title: "Essai expiré ? Votre carte QR reste en ligne pour les clients",
      subtitle:
        "L'expiration d'essai ne tue plus votre carte publique. Les clients peuvent toujours scanner et voir ; seul le tableau de bord vous invite à upgrader. Pas de coupure surprise au milieu du service.",
      intro:
        "Le vieux comportement d'expiration d'essai était dur : quand vos 14 jours se terminaient, votre carte QR publique s'éteignait pour les clients. Si ça tombait au milieu du service, c'était une catastrophe. On l'a changé. Maintenant, l'expiration d'essai vous montre un modal à l'intérieur du tableau de bord vous invitant à upgrader, mais votre carte publique continue à servir les clients normalement. Vous upgradez quand vous êtes prêt, pas quand un client agite son téléphone devant le QR sur la table.",
      sections: [
        {
          title: "La carte publique reste en ligne",
          body: "L'essai de 14 jours se termine silencieusement du point de vue du client. La carte QR, les commandes en ligne, les réservations — tout continue à fonctionner. Le propriétaire voit le modal d'upgrade à la prochaine connexion au tableau de bord. Cette dissociation signifie que l'expiration d'essai ne peut jamais casser un service ou vous embarrasser devant les clients.",
        },
        {
          title: "Modal dans le tableau de bord, pas une redirection dure",
          body: "Précédemment, l'expiration d'essai redirigeait le tableau de bord vers une page de facturation. Ça cassait les liens profonds et confondait les utilisateurs qui se faisaient bouncer en plein milieu d'une tâche. Maintenant on montre un modal propre : « Votre essai est terminé. Choisissez un plan pour continuer à utiliser les fonctionnalités avancées. » Le modal peut être rejeté ; vous pouvez continuer à naviguer dans le tableau de bord, mais les nouvelles actions qui nécessitent un plan payant montrent des incitations d'upsell inline.",
        },
        {
          title: "Aperçu toujours disponible",
          body: "Même avec l'essai expiré, vous pouvez toujours prévisualiser votre carte QR depuis le tableau de bord. On ne vous bloque pas pour voir ce que voient les clients. Éditez la carte, prévisualisez le résultat — seules les actions liées à la publication suggèrent un upgrade. Ça garde le tableau de bord productif même au milieu d'une décision, donc vous ne perdez pas l'accès en comparant les plans.",
        },
      ],
      benefitsTitle: "Pourquoi une expiration douce bat un cutoff dur",
      benefits: [
        "La carte QR publique reste en ligne pour les clients",
        "Pas de coupure surprise au milieu du service",
        "Modal dans le tableau de bord au lieu de redirection forcée vers la facturation",
        "Aperçu toujours disponible quel que soit l'état du plan",
        "Incitations d'upsell inline remplaçent les blocages abrupts",
        "Le propriétaire upgrade selon son propre planning",
      ],
      conclusionTitle: "Respecter les heures d'ouverture du restaurant",
      conclusionBody:
        "Les restaurants tournent sur des marges serrées et des plannings encore plus serrés. Une carte QR qui tombe parce qu'un essai gratuit a expiré, c'est pire que la limite d'essai elle-même — ça abîme la confiance. L'expiration douce garde les lumières allumées pour les clients tout en poussant quand même le propriétaire vers un plan payant. Les conversions restent hautes ; le downtime tombe à zéro.",
      ctaText: "Démarrez votre essai 14 jours en sachant que votre carte reste en ligne quoi qu'il arrive.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Plat : terminologie plus claire dans l'éditeur | IQ Rest",
        description:
          "On a renommé « Item » en « Plat » à travers le tableau de bord. Les restaurateurs ne devraient pas avoir à traduire la terminologie SaaS générique dans leur tête.",
      },
      title: "Item → Plat : terminologie plus claire dans tout l'éditeur",
      subtitle:
        "On a remplacé le label générique « Item » par « Plat » à travers chaque surface du tableau de bord. Petit changement, gros gain de clarté pour les restaurateurs qui ne parlent pas SaaS.",
      intro:
        "Les gens du logiciel disent « item ». Les gens du restaurant disent « plat ». Le décalage était petit mais constant — chaque fois qu'on montrait « Add Item », le propriétaire devait le traduire dans sa tête en « Ajouter un plat ». On a tout renommé : boutons, libellés, messages de succès, états d'erreur, titres de page. Le tableau de bord parle maintenant la même langue que les gens qui l'utilisent.",
      sections: [
        {
          title: "Où le renommage s'applique",
          body: "Chaque surface visible par l'utilisateur : « Add Item » est devenu « Ajouter un plat ». L'onglet « Items » dans la carte est devenu « Plats ». « Item Settings » est devenu « Réglages du plat ». Les toasts de succès (« Item créé ») sont devenus (« Plat créé »). Erreurs de validation de formulaire, breadcrumbs, en-têtes du tableau de bord — tous mis à jour. La colonne interne de la base de données s'appelle toujours « item » pour la rétrocompatibilité, mais aucun utilisateur ne le voit jamais.",
        },
        {
          title: "Traduit dans les 35 langues",
          body: "Chaque langue a son propre mot correct pour « plat » distinct de « item ». Espagnol « plato », français « plat », allemand « Gericht », italien « piatto », catalan « plat », japonais « 料理 ». On a mis à jour la clé de traduction dans chaque locale et vérifié que le résultat se lit naturellement dans chaque langue. Pas de traduction machine ; des locuteurs natifs ont relu chacune.",
        },
        {
          title: "Catégorie par défaut auto-créée aussi",
          body: "Pendant qu'on était dans l'éditeur, on a aussi auto-créé une catégorie par défaut appelée « Carte » à la première visite du tableau de bord. Ancien comportement : les propriétaires atterrissaient sur une carte vide, devaient cliquer « Ajouter une catégorie » avant de pouvoir ajouter un plat, abandonnaient souvent. Nouveau comportement : une catégorie Carte existe, vous tapez « Ajouter un plat », vous éditez immédiatement. Une barrière supprimée.",
        },
      ],
      benefitsTitle: "Pourquoi la terminologie compte",
      benefits: [
        "« Plat » correspond à la façon dont les restaurateurs parlent réellement",
        "Mis à jour à travers chaque surface du tableau de bord — boutons, libellés, toasts",
        "Traduit dans les 35 langues par des relecteurs natifs",
        "Catégorie par défaut auto-créée — pas de carte vide pour démarrer",
        "Plus rapide de l'inscription au premier plat ajouté",
        "Moins de traduction mentale = moins de bounce dans l'onboarding",
      ],
      conclusionTitle: "Parlez la langue de l'utilisateur",
      conclusionBody:
        "La terminologie SaaS générique (« item », « entity », « object ») c'est OK pour les ingénieurs. Les restaurateurs ont besoin de mots qui correspondent à ce qu'ils disent au travail. IQ Rest parle maintenant la même langue que les gens qui l'utilisent — à travers chaque bouton, libellé et notification — et les données de conversion reflètent déjà le changement.",
      ctaText: "Inscrivez-vous et ajoutez votre premier plat en moins d'une minute.",
      ctaButton: "Construire ma carte",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Catégorie par défaut auto pour onboarding de carte | IQ Rest",
        description:
          "Les nouveaux utilisateurs ne font plus face à une carte vide. IQ Rest auto-crée une catégorie par défaut pour que vous puissiez ajouter votre premier plat immédiatement.",
      },
      title: "Catégorie par défaut auto — sautez la carte vide",
      subtitle:
        "Les nouveaux utilisateurs atterrissent sur une carte avec une catégorie par défaut déjà créée. Tapez « Ajouter un plat » et commencez à éditer. Plus de barrière « créer la catégorie d'abord ».",
      intro:
        "L'ancien onboarding exigeait des utilisateurs qu'ils créent une catégorie avant de pouvoir ajouter un plat. Les cartes vides intimident — beaucoup de nouveaux utilisateurs abandonnaient à ce point. IQ Rest auto-crée maintenant une catégorie par défaut « Carte » la première fois que vous ouvrez le tableau de bord, donc la première action que vous prenez est d'ajouter un plat, pas de configurer une hiérarchie. Plus rapide, plus fluide, plus de cartes effectivement construites.",
      sections: [
        {
          title: "Catégorie par défaut créée à la connexion",
          body: "La première fois que vous vous connectez à un tableau de bord frais, IQ Rest vérifie si vous avez des catégories. Sinon, il en crée une appelée « Carte » (traduite dans votre langue). La catégorie est immédiatement prête à recevoir des plats. Vous pouvez la renommer ou ajouter d'autres catégories à tout moment — mais vous n'êtes pas obligé avant d'ajouter votre premier plat.",
        },
        {
          title: "Renommée selon votre cuisine quand vous utilisez l'assistant",
          body: "Si vous avez utilisé l'assistant d'inscription en 3 étapes, le seeder génère à la place des catégories adaptées à la cuisine — « Pizza », « Pasta », « Antipasti » pour l'italien ; « Sushi », « Ramen », « Sake » pour le japonais. La catégorie par défaut auto « Carte » n'entre en jeu que pour les utilisateurs qui ont sauté l'assistant ou se sont inscrits via Google directement.",
        },
        {
          title: "Rétrocompatible avec les cartes existantes",
          body: "Si vous avez déjà des catégories — d'une utilisation passée, de données importées, du seeder — la catégorie par défaut n'est pas créée. On n'intervient que quand la carte est véritablement vide. Les utilisateurs existants ne voient aucun changement à la structure de leur carte.",
        },
      ],
      benefitsTitle: "Pourquoi l'auto-défaut accélère l'onboarding",
      benefits: [
        "Pas de barrière « créer la catégorie d'abord » pour les nouveaux utilisateurs",
        "Tapez « Ajouter un plat » comme première action, pas comme deuxième",
        "Catégorie nommée dans votre langue, pas en anglais par défaut",
        "Le flux assistant continue à semer des catégories adaptées à la cuisine",
        "Cartes existantes intouchées",
        "Plus rapide de la connexion au premier plat ajouté",
      ],
      conclusionTitle: "Éliminez l'état vide",
      conclusionBody:
        "Les états vides sont l'endroit où les nouveaux utilisateurs bouncent. Chaque barrière entre l'utilisateur et sa première action productive vous coûte des conversions. Auto-créer une catégorie par défaut supprime une telle barrière. C'est un petit changement avec un impact mesurable sur la vitesse à laquelle les nouveaux restaurants arrivent à une carte publiable.",
      ctaText: "Inscrivez-vous et commencez à ajouter des plats immédiatement.",
      ctaButton: "Construire ma carte",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Sautez l'étape nom du restaurant dans l'onboarding | IQ Rest",
        description:
          "On a supprimé l'étape « nom du restaurant » de l'onboarding. Réglez-le plus tard dans les réglages — ou directement depuis le hero de la carte que vous éditerez de toute façon.",
      },
      title: "Sautez l'étape nom du restaurant dans l'onboarding",
      subtitle:
        "Vous n'avez pas besoin de taper votre nom de restaurant pour commencer à construire une carte. On a supprimé cette étape d'onboarding — réglez le nom plus tard depuis le tableau de bord, ou via le hero de la carte en direct.",
      intro:
        "Les flux d'onboarding qui exigent des informations en amont se sentent comme remplir des formulaires. L'ancien onboarding d'IQ Rest demandait un nom de restaurant à l'étape un. Les nouveaux utilisateurs n'avaient souvent pas décidé de l'orthographe exacte, de la variante de marque ou de la ponctuation — donc ils restaient bloqués avant même de voir le tableau de bord. On a supprimé l'étape. Inscrivez-vous, atterrissez dans le tableau de bord, réglez le nom quand vous êtes prêt. La carte fonctionne très bien sans.",
      sections: [
        {
          title: "Ce qui se passe quand vous sautez",
          body: "Si vous sautez l'étape du nom, le restaurant reçoit un placeholder (« Votre Restaurant ») masqué par défaut sur la carte publique. Les clients qui scannent votre QR voient la carte sans nom dans le hero — ce qui est honnêtement très bien pour beaucoup d'établissements de restauration rapide. Dès que vous réglez le nom dans les réglages, il apparaît dans le hero, le titre de page, le slug SEO et les partages sociaux.",
        },
        {
          title: "Réglez-le depuis n'importe où",
          body: "Le champ du nom est éditable depuis les réglages, depuis le hero de la carte (tap pour éditer inline) et depuis l'écran d'aperçu public. Trois surfaces différentes, un seul champ sous-jacent. On a rendu facile de reporter la décision et trivialement facile de s'engager quand vous êtes prêt.",
        },
        {
          title: "Pas de pénalité SEO pour le défaut",
          body: "On utilise le slug (« votre-restaurant ») comme fallback pour le titre de page et les meta tags SEO jusqu'à ce que vous régliez un vrai nom. Les moteurs de recherche ne vous pénalisent pas — ils voient juste un titre générique. Au moment où vous réglez un vrai nom, chaque meta tag se met à jour et Google re-crawl en quelques heures.",
        },
      ],
      benefitsTitle: "Pourquoi sauter accélère l'onboarding",
      benefits: [
        "Pas de pression de décision au mauvais moment",
        "Atterrissez dans le tableau de bord plus rapidement",
        "Réglez le nom quand l'inspiration vient — ou quand l'entité légale est enregistrée",
        "Édition inline depuis le hero de la carte",
        "La carte publique fonctionne sans nom réglé",
        "Pas de pénalité SEO pour utiliser le placeholder",
      ],
      conclusionTitle: "Moins de décisions, plus de fait",
      conclusionBody:
        "Chaque champ de formulaire dans l'onboarding est une chance pour l'utilisateur de bouncer. En supprimant le champ du nom du restaurant, on a supprimé une telle chance. Les nouveaux utilisateurs atterrissent maintenant dans le tableau de bord avec une carte fonctionnelle et la liberté de nommer (ou pas) leur restaurant selon leur propre planning. Le lift de conversion a été immédiat.",
      ctaText: "Inscrivez-vous en quelques secondes — pas de nom de restaurant requis.",
      ctaButton: "Démarrer l'essai gratuit",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Essayez la carte QR avant inscription — Anonyme | IQ Rest",
        description:
          "Construisez une carte d'exemple avant de créer un compte. Sauvegardez votre progression par email quand vous voulez la garder. Pas d'engagement, pas de friction.",
      },
      title: "Essayez une carte QR avant de vous inscrire",
      subtitle:
        "Construisez une carte d'exemple, voyez à quoi ressemble votre QR, prévisualisez l'expérience en direct — tout ça avant de créer un compte. Sauvegardez votre progression via lien email quand vous êtes prêt.",
      intro:
        "La plupart des services de carte QR exigent que vous créiez un compte avant de pouvoir faire quoi que ce soit. C'est le mauvais ordre. Les nouveaux restaurateurs veulent sentir le produit d'abord — voir à quoi ressemble un plat, ce que ça fait le flux de scan QR — et seulement ensuite s'engager à s'inscrire. IQ Rest vous laisse maintenant construire une carte d'exemple complète anonymement. Quand vous voulez la garder, on vous la sauvegarde par email. Sans friction, sans engagement.",
      sections: [
        {
          title: "Une session anonyme stocke votre travail",
          body: "Un ID de session anonyme est créé à votre première visite et stocké dans un cookie. Chaque catégorie que vous ajoutez, chaque plat que vous créez, chaque photo que vous uploadez est associée à cette session. Vous pouvez quitter la page, revenir, et votre carte est toujours là. On persiste la session 7 jours — largement le temps d'évaluer le produit sans pression.",
        },
        {
          title: "Sauvegardez la progression via lien email",
          body: "Quand vous décidez que vous voulez garder la carte, cliquez « Sauvegarder progression ». Tapez votre email. On vous envoie un lien magique qui, quand cliqué, convertit la session anonyme en un vrai compte associé à votre email. Tout votre travail se transfère automatiquement — pas de re-saisie, pas de progression perdue, pas de « oups c'est supprimé ». La conversion en client payant se passe selon vos termes.",
        },
        {
          title: "Réduit l'anxiété d'inscription à zéro",
          body: "En laissant les utilisateurs essayer avant de s'inscrire, on inverse le pattern SaaS typique. Les visiteurs n'ont pas besoin de décider si IQ Rest vaut leur email — ils peuvent voir par eux-mêmes. Les restaurants qui essaient anonymement puis s'inscrivent convertissent plus haut que les restaurants forcés à s'inscrire d'abord, parce qu'ils ont déjà investi dans la carte et ne veulent pas la perdre.",
        },
      ],
      benefitsTitle: "Pourquoi l'onboarding anonyme gagne",
      benefits: [
        "Construisez une vraie carte sans créer de compte",
        "La session anonyme persiste 7 jours",
        "Sauvegardez la progression à l'email quand vous décidez de vous engager",
        "Pas de re-saisie — le travail se transfère à votre vrai compte",
        "Évaluation du produit sans friction",
        "Conversion d'inscription globale plus haute",
      ],
      conclusionTitle: "Laissez le produit se vendre lui-même",
      conclusionBody:
        "La meilleure façon de convaincre un restaurateur qu'IQ Rest est ce qu'il lui faut, c'est de le laisser l'utiliser. L'onboarding anonyme transforme un visiteur curieux en utilisateur engagé sans rien demander en retour. Au moment où vous demandez l'email, l'utilisateur a déjà investi du temps dans sa carte — la sauvegarder ne lui coûte rien, et il garde ce qu'il a construit.",
      ctaText: "Essayez IQ Rest maintenant — pas de compte nécessaire.",
      ctaButton: "Essayez gratuitement",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Sauvegardez la progression de votre carte par lien email | IQ Rest",
        description:
          "Construit une carte d'exemple anonymement ? Sauvegardez-la à votre email et on vous envoie un lien magique pour réclamer le compte.",
      },
      title: "Sauvegardez la progression de votre carte par lien email",
      subtitle:
        "Construit une carte anonymement et voulez la garder ? Tapez votre email. On envoie un lien magique qui convertit votre travail anonyme en un vrai compte en un tap.",
      intro:
        "Quand vous avez passé cinq minutes à construire une carte d'exemple sans compte, vous ne voulez pas la perdre. La fonction « Sauvegarder progression » d'IQ Rest convertit votre session anonyme en un vrai compte via un lien magique. Tapez votre email, cliquez le lien dans votre boîte de réception, votre carte est associée de manière permanente à votre compte. Pas de mot de passe, pas de formulaire d'inscription, pas de re-saisie de données.",
      sections: [
        {
          title: "Flux de lien magique — pas de mot de passe",
          body: "On envoie un lien à usage unique à votre email. Cliquez dans les 10 minutes et vous êtes connecté à un nouveau compte qui contient la carte construite anonymement. Pas de mot de passe à choisir, pas de questions de sécurité, pas d'étape de vérification d'email — le clic du lien EST la vérification. On émet ensuite un cookie de session et vous êtes dans le tableau de bord avec tout votre travail préservé.",
        },
        {
          title: "Gestion de conflit pour comptes existants",
          body: "Si l'email que vous avez tapé a déjà un compte, on ne l'écrase pas. On envoie le lien, vous cliquez, et on demande s'il faut fusionner la carte anonyme dans votre compte existant ou la jeter. La plupart des utilisateurs choisissent fusionner — vos plats existants restent, les nouveaux de l'édition anonyme sont ajoutés. Clair, sûr, prévisible.",
        },
        {
          title: "Limité en taux et résistant au spam",
          body: "On limite les requêtes save-progress par IP et par email pour empêcher l'abus. Le lien expire en 10 minutes et est à usage unique. Si quelqu'un d'autre essaie de réclamer votre session anonyme, il a besoin d'accès à votre boîte de réception — le même modèle de sécurité que tout flux d'auth par lien magique moderne.",
        },
      ],
      benefitsTitle: "Pourquoi le sauvegarde par lien magique gagne",
      benefits: [
        "Pas de mot de passe à choisir, retenir ou réinitialiser",
        "Le travail anonyme se transfère intact à votre vrai compte",
        "Comptes existants : choisissez fusionner ou jeter",
        "Limité en taux et borné dans le temps — sécurisé par conception",
        "Un tap pour s'engager — pas de formulaire d'inscription",
        "L'email lui-même agit comme étape de vérification",
      ],
      conclusionTitle: "Conversion sans friction",
      conclusionBody:
        "Le moment où un utilisateur veut convertir d'anonyme à identifié est le moment où il est le plus susceptible de bouncer sur un long formulaire d'inscription. Les liens magiques effondrent ce formulaire en un seul champ email plus un clic dans la boîte. L'utilisateur passe 30 secondes et finit avec un compte réel et persistant qui contient tout ce qu'il a construit. C'est le flux de conversion à la friction la plus basse du secteur de la carte QR.",
      ctaText: "Construisez une carte anonymement, puis sauvegardez-la par email quand prêt.",
      ctaButton: "Essayez gratuitement",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout Stripe en un clic pour utilisateurs récurrents | IQ Rest",
        description:
          "Déjà connecté ? Cliquez un plan dans pricing et allez direct au checkout Stripe. Pas de re-saisie d'infos de compte, pas d'écrans supplémentaires.",
      },
      title: "Checkout Stripe en un clic pour utilisateurs récurrents",
      subtitle:
        "Utilisateur connecté clique un plan ? Direct au checkout Stripe, pas d'écran de confirmation supplémentaire. Deux clics de la page pricing à l'abonnement actif.",
      intro:
        "Les utilisateurs récurrents qui ont déjà un compte IQ Rest ne devraient pas avoir à reconfirmer quoi que ce soit en upgradant. On a supprimé chaque écran intermédiaire entre « cliquer un plan dans pricing » et « atterrir sur le checkout Stripe ». Deux clics au total : choisir le plan, entrer les détails de carte. L'abonnement est actif avant que vous finissiez votre café.",
      sections: [
        {
          title: "Détecter l'état connecté sur pricing",
          body: "Notre page pricing vérifie un cookie de session authentifié au chargement. Si vous êtes connecté, les boutons de plan sautent le détour « inscrivez-vous d'abord » et vont directement à /api/stripe/checkout, qui crée une Session Stripe Checkout et retourne l'URL pour redirection. Si vous n'êtes pas connecté, les boutons vous emmènent à travers le flux d'inscription standard d'abord — pas de changement de comportement pour les nouveaux utilisateurs.",
        },
        {
          title: "Langue UI transmise à Stripe",
          body: "Votre langue de tableau de bord est transmise à Stripe Checkout via le paramètre locale, donc la page de checkout s'affiche dans votre langue. Les utilisateurs français voient Stripe en français ; les allemands voient Stripe en allemand. Le flux de checkout se sent sans couture parce qu'il ne casse jamais la continuité linguistique de votre tableau de bord.",
        },
        {
          title: "Return URL vous ramène au tableau de bord",
          body: "Après un paiement réussi, Stripe redirige vers une URL de retour qu'on règle au tableau de bord racine dans votre langue (par ex. /fr/dashboard). Le webhook met à jour votre statut d'abonnement côté serveur avant votre arrivée, donc le tableau de bord sur lequel vous atterrissez reflète déjà le nouveau plan — pas d'état « en attente », pas de flash de contenu non upgradé.",
        },
      ],
      benefitsTitle: "Pourquoi le checkout en un clic convertit",
      benefits: [
        "Deux clics de pricing à abonnement actif",
        "Pas d'interstitiel « confirmez votre compte » pour utilisateurs connectés",
        "Checkout Stripe s'affiche dans la langue de votre tableau de bord",
        "Return URL vous fait atterrir dans le tableau de bord upgradé",
        "Webhook met à jour le plan avant votre arrivée — pas de scintillement",
        "Les nouveaux utilisateurs ont toujours le flux standard inscription → upgrade",
      ],
      conclusionTitle: "Rendez le chemin facile trivialement facile",
      conclusionBody:
        "L'utilisateur déjà convaincu n'a pas besoin de plus de conviction — il a besoin de moins de clics. Le checkout en un clic supprime chaque écran entre intention et paiement pour les utilisateurs récurrents. Résultat : conversion essai-vers-payant plus haute, moins d'upgrades abandonnés, reconnaissance de revenu plus rapide pour expansion d'abonnement.",
      ctaText: "Déjà utilisateur ? Choisissez votre plan et upgradez en deux clics.",
      ctaButton: "Voir les prix",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Refonte UI du tableau de bord : cartes, navigation, formulaires | IQ Rest",
        description:
          "Tableau de bord IQ Rest refondu avec composants de carte cohérents, navigation latérale persistante avec mise en évidence de page active, et actions de formulaire améliorées.",
      },
      title: "Refonte UI du tableau de bord : cartes cohérentes, navigation et actions de formulaire",
      subtitle:
        "Un tableau de bord soigné avec un style de carte unifié, une navigation latérale persistante, des états actifs en couleur d'accent, et des actions de sauvegarde/suppression en bas sur chaque page de formulaire.",
      intro:
        "IQ Rest a subi une refonte complète de l'UI du tableau de bord. Chaque page utilise maintenant un style de carte cohérent avec des rayons de bordure unifiés, une navigation latérale persistante avec des états actifs en couleur d'accent, et des pages de formulaire améliorées avec des actions de sauvegarde et suppression en bas. Le résultat est une expérience plus propre et plus soignée pour gérer la carte QR digitale de votre restaurant.",
      sections: [
        {
          title: "Design de carte cohérent à travers toutes les pages",
          body: "Chaque page du tableau de bord utilise maintenant un composant DashboardCard unifié avec des bordures arrondies cohérentes, des couleurs de fond subtiles et des en-têtes de section optionnels. Analytics, facturation, réglages, contacts, réglages de réservation, et toutes les pages de formulaire partagent le même langage visuel. Des libellés d'astuce avec des tooltips popover remplacent le texte de description inline, gardant l'interface propre tout en fournissant un contexte utile quand nécessaire.",
        },
        {
          title: "Navigation latérale persistante avec états actifs",
          body: "Sur les écrans desktop, une navigation latérale persistante est maintenant visible sur chaque page. La page active est mise en évidence avec un fond de couleur d'accent, rendant immédiatement clair où vous êtes. Les sous-pages comme catégories, plats et commandes mettent correctement en évidence l'élément parent Carte. La barre latérale inclut un accès rapide à Carte, Imprimer QR, Réservations, Analytics, Réglages, Contacts, Facturation et Support — tout sans quitter la vue actuelle.",
        },
        {
          title: "Pages de formulaire améliorées avec actions en bas",
          body: "Toutes les pages de formulaire — catégories, plats, tables, design, réglages, contacts et réglages de réservation — comportent maintenant un bouton de sauvegarde dupliqué en bas en couleur d'accent. Les boutons de suppression apparaissent sur le côté gauche avec un style atténué. Cela signifie que vous n'avez plus besoin de remonter pour sauvegarder vos changements. Le bouton de déconnexion a été déplacé de la barre latérale au bas de la page de design, gardant la navigation centrée sur les actions essentielles.",
        },
      ],
      benefitsTitle: "Bénéfices de la refonte UI",
      benefits: [
        "Style de carte unifié avec bordures et fonds cohérents à travers toutes les pages",
        "Navigation latérale persistante sur desktop avec états actifs en couleur d'accent",
        "Boutons de sauvegarde en bas sur tous les formulaires — pas besoin de remonter pour sauvegarder",
        "Actions de suppression et sauvegarde clairement séparées — supprimer à gauche, sauvegarder à droite",
        "En-têtes de section sur les cartes de formulaire pour une meilleure organisation visuelle",
        "Page analytics plus propre avec wrappers DashboardCard et meilleure mise en page des stats d'appareils",
      ],
      conclusionTitle: "Une expérience de tableau de bord plus soignée",
      conclusionBody:
        "Cette refonte UI apporte cohérence visuelle et utilisabilité améliorée à chaque coin du tableau de bord IQ Rest. Que vous éditiez des plats, vérifiiez l'analytics ou gériez des réservations, l'interface se sent cohérente et intuitive. Combinée avec la navigation latérale persistante, gérer la carte QR digitale de votre restaurant est plus rapide et plus agréable que jamais.",
      ctaText: "Découvrez le tableau de bord refondu",
      ctaButton: "Ouvrir le tableau de bord",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Scanner de carte par IA — Créez une carte QR digitale à partir d'une photo"),
    "redesigned-dashboard-qr-menu-management": stub("Tableau de bord refondu pour la gestion de carte QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Emails de réservation et analytics pour votre carte QR digitale"),
    "multi-currency-geo-pricing-qr-menu": stub("Tarification multi-devise géo pour votre carte QR"),
    "support-qr-menu-restaurant-cafe": stub("Support intégré pour votre carte QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Analytics détaillée pour votre site web de carte QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Générateur instantané de carte QR et site web de restaurant"),
    "subscription-plans-qr-menu-restaurant-website": stub("Plans d'abonnement pour votre carte QR"),
    "public-restaurant-qr-menu-website": stub("Site web public de carte QR de restaurant"),
    "add-items-restaurant-qr-menu-website": stub("Ajoutez des plats à votre carte QR en quelques secondes"),
    "qr-menu-restaurant-categories": stub("Catégories pour votre carte QR de restaurant"),
    "easy-qr-menu-cafe-control-panel": stub("Panneau de contrôle de carte QR facile pour café"),
    "faq-page-organization": stub("Organisation de la page FAQ"),
    "free-restaurant-website-improvements": stub("Améliorations du site web gratuit de restaurant"),
    "user-authentication-interface": stub("Interface d'authentification utilisateur"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Bénéfices",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Essayez IQ Rest",
    ctaButton: "Démarrer l'essai gratuit",
  };
}
