import type { HelpDoc } from "../types";

// FR help guide.
export const fr: HelpDoc = {
  metaTitle: "Comment utiliser IQ Rest — guide pas à pas",
  metaDescription:
    "Guide complet d'IQ Rest : inscription, menu, commandes, réservations, écran de cuisine et réglages — pour restaurants.",
  h1: "Aide",
  intro: "Un guide détaillé d'IQ Rest — de l'inscription aux réglages les plus fins.",
  banner: {
    title: "C'est plus simple qu'il n'y paraît",
    sub: "Un guide pas à pas : de l'inscription aux réglages les plus fins — tout le monde y arrive.",
    cta: "Comment ça marche",
  },
  tipLabel: "Astuce",
  noteLabel: "Important",
  sections: [
    {
      id: "start",
      title: "1. Pour commencer",
      blocks: [
        { type: "h3", text: "Qu'est-ce que ce système" },
        {
          type: "p",
          text: "IQ Rest est un service pour restaurants : vous créez un menu en ligne avec QR code, recevez les commandes et les réservations de table directement depuis le téléphone des clients, tandis qu'en cuisine et chez les serveurs fonctionnent des tablettes-terminaux. Tout se gère depuis un seul panneau d'administration (le tableau de bord).",
        },
        { type: "h3", text: "Inscription et connexion" },
        { type: "p", text: "Vous pouvez vous connecter de trois façons — choisissez-en une sur l'écran de connexion :" },
        {
          type: "list",
          items: [
            "Avec Google — cliquez sur « Continuer avec Google » et choisissez le compte.",
            "Avec Apple — cliquez sur « Continuer avec Apple ».",
            "Par e-mail — cliquez sur « Continuer avec l'e-mail », saisissez l'adresse, et nous envoyons un code à 6 chiffres. Saisissez-le sur l'écran suivant. Aucun mot de passe nécessaire.",
          ],
        },
        {
          type: "note",
          text: "Par e-mail, vous recevez seulement un code de connexion à usage unique — pas de spam, pas de newsletters.",
        },
        { type: "h3", text: "Créer le restaurant (onboarding)" },
        {
          type: "p",
          text: "À la première connexion, le système vous guide dans une configuration rapide. Ensuite, un restaurant est créé automatiquement avec un menu d'exemple que vous remplacerez plus tard par le vôtre.",
        },
        {
          type: "steps",
          items: [
            "Indiquez le nom du restaurant.",
            "Choisissez le type de cuisine (il détermine le modèle de menu de départ).",
            "C'est fait : vous arrivez dans le tableau de bord avec un menu d'exemple déjà rempli.",
          ],
        },
        {
          type: "note",
          text: "La devise est détectée automatiquement selon votre région — pas besoin de la choisir au début. Vous pourrez la modifier plus tard dans Réglages → Région.",
        },
        { type: "h3", text: "Aperçu du tableau de bord" },
        {
          type: "p",
          text: "La navigation entre les sections : sur ordinateur c'est une barre en haut, sur téléphone une barre en bas. Sections : Menu, Commandes, Réservations, Cuisine, Analyses et Réglages.",
        },
        {
          type: "list",
          items: [
            "À côté du nom du restaurant, dans la barre du haut, se trouve un petit indicateur de connexion : un point vert signifie que les commandes se synchronisent en temps réel.",
            "Sur la page « Menu », en haut, il y a le bouton « Aperçu » — il ouvre votre menu tel que le client le voit.",
            "Juste à côté, le bouton « Partager » — il affiche le QR code et le lien du menu (copier le lien, télécharger le QR ou ouvrir le menu).",
          ],
        },
        {
          type: "tip",
          text: "Appuyez sur « Aperçu » après chaque modification du menu — vous voyez aussitôt ce que voit le client.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "La section « Menu » est le cœur du système. Vous y construisez la structure : catégories → plats → options. Ouvrez-la depuis la navigation.",
        },
        { type: "h3", text: "Catégories et sous-catégories" },
        {
          type: "steps",
          items: [
            "Appuyez sur « Ajouter une catégorie » et saisissez un nom (par exemple « Entrées »).",
            "Pour modifier une catégorie — survolez-la et appuyez sur « Modifier la catégorie ».",
            "L'ordre des catégories se change avec les boutons « Haut » / « Bas » — le client les verra exactement dans cet ordre.",
            "Vous pouvez créer un « Groupe » (via « Ajouter un groupe ») — une catégorie-section qui contient d'autres catégories.",
          ],
        },
        { type: "h3", text: "Ajouter des plats" },
        {
          type: "steps",
          items: [
            "Dépliez une catégorie (flèche à gauche) et appuyez sur « Ajouter un plat ».",
            "Remplissez le nom, le prix et la description.",
            "Ajoutez une photo : « Ajouter une photo » — téléversez la vôtre, ou appuyez sur « Générer » et décrivez le plat avec des mots pour que l'IA crée l'image.",
            "Enregistrez. Le plat apparaît dans la catégorie.",
          ],
        },
        {
          type: "tip",
          text: "La photo peut être générée par IA : indiquez l'angle, l'éclairage ou l'arrière-plan (par exemple « Pizza Margherita sur une planche en bois, vue de dessus »).",
        },
        { type: "h3", text: "Options et variantes (modificateurs)" },
        {
          type: "p",
          text: "Les options sont des choix au sein d'un plat : taille, cuisson, ingrédients supplémentaires. Chaque option a des variantes, et on peut ajouter un supplément de prix à une variante (par exemple « +1.50 chacune »).",
        },
        {
          type: "list",
          items: [
            "Exemple : une option « Taille » avec les variantes « Petite / Grande (+2.00) ».",
            "Exemple : une option « Extra » avec plusieurs variantes parmi lesquelles le client en choisit une ou plusieurs.",
          ],
        },
        { type: "h3", text: "Allergènes et régimes" },
        {
          type: "p",
          text: "Pour un plat, vous pouvez indiquer les allergènes (gluten, fruits à coque, etc.) et les étiquettes alimentaires (végétarien, végan). Le client les voit sous forme d'icônes dans le menu public.",
        },
        { type: "h3", text: "Visibilité des plats" },
        {
          type: "p",
          text: "Le bouton « Masquer le plat » / « Afficher le plat » retire temporairement un élément du menu public sans le supprimer — pratique quand un plat est épuisé.",
        },
        { type: "h3", text: "Téléverser un menu papier (scan)" },
        {
          type: "p",
          text: "Si vous avez déjà un menu en photo ou PDF — ne le saisissez pas à la main. Utilisez le scan :",
        },
        {
          type: "steps",
          items: [
            "Appuyez sur la bannière « Téléverser le menu » (ou « Téléversez votre menu papier »).",
            "Ajoutez jusqu'à 5 fichiers (photo/scan, 20 Mo max chacun) et appuyez sur « Scanner ».",
            "Patientez jusqu'à une minute — l'IA reconnaît les catégories et les plats.",
            "Vérifiez ce qui a été reconnu, cochez les éléments voulus et appuyez sur « Continuer ».",
            "Choisissez : remplacer le menu actuel ou ajouter les nouveaux éléments à l'existant.",
          ],
        },
        {
          type: "note",
          text: "Les exemples du modèle de départ sont supprimés lors de l'enregistrement du menu scanné — c'est normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Tables et QR codes",
      blocks: [
        {
          type: "p",
          text: "Les tables servent à associer commandes et réservations à des emplacements précis et à imprimer des QR codes personnels. Section : Réglages → Tables.",
        },
        { type: "h3", text: "Créer des tables" },
        {
          type: "steps",
          items: [
            "Ouvrez Réglages → Tables et appuyez sur « Ajouter une table ».",
            "Indiquez le numéro de table, les places et (facultatif) un nom — par exemple « Fenêtre », « Bar », « Terrasse ».",
            "Ajoutez une photo de la table — les clients la voient et comprennent exactement où se trouve leur table.",
            "Définissez une couleur de table — avec cette couleur, la table est mise en évidence en cuisine et dans la section « Commandes », pour que le personnel la trouve vite.",
            "Si vous le souhaitez, ajoutez une brève description.",
            "Enregistrez.",
          ],
        },
        {
          type: "note",
          text: "La photo de la table est pour les clients (repère « où est ma table »). La couleur est pour le personnel (un marqueur visuel rapide de la table en cuisine et dans les commandes).",
        },
        { type: "h3", text: "QR code de la table" },
        {
          type: "p",
          text: "Chaque table a son propre QR code. Le client le scanne avec son téléphone et arrive directement dans le menu de cette table — la commande est automatiquement associée à la bonne table.",
        },
        {
          type: "steps",
          items: [
            "Appuyez sur « Afficher le QR code » sur la table voulue.",
            "Appuyez sur « Télécharger le QR » pour enregistrer l'image.",
            "Imprimez-le et placez-le sur la table (sur un support, dans le menu, sur un autocollant).",
          ],
        },
        {
          type: "tip",
          text: "Le « Lien de la table » est le même lien que le QR mais en texte. Vous pouvez l'envoyer au client par messagerie.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Commandes",
      blocks: [
        { type: "h3", text: "Comment le client commande" },
        {
          type: "p",
          text: "Le client scanne le QR sur la table → le menu s'ouvre → il choisit plats, options et quantité → passe la commande. La commande apparaît aussitôt dans votre tableau de bord et sur le terminal cuisine/serveur.",
        },
        {
          type: "note",
          text: "Pour que les clients puissent commander, « Accepter les commandes » doit être activé dans Réglages → Commandes. Si c'est désactivé, le client voit le menu mais il n'y a pas de bouton de commande.",
        },
        { type: "h3", text: "Gérer les commandes dans le tableau de bord" },
        {
          type: "p",
          text: "La section « Commandes » affiche le plan de salle. Les tables occupées sont mises en évidence et indiquent le nombre de commandes actives. Touchez une table pour ouvrir ses commandes.",
        },
        {
          type: "steps",
          items: [
            "Touchez une table → « Démarrer la commande » (ou ouvrez-en une existante).",
            "« Ajouter un article » → choisissez catégorie → plat → options → si besoin, indiquez quantité et notes (par exemple « sans oignon »).",
            "Appuyez sur « Ajouter » — l'article entre dans la commande.",
          ],
        },
        { type: "h3", text: "Statuts des articles" },
        {
          type: "p",
          text: "Chaque article a un statut : En attente → En préparation → Prêt → Servi. Touchez un article pour changer son statut. Les statuts se synchronisent avec la cuisine en temps réel.",
        },
        { type: "h3", text: "Remises, division, changement de table" },
        {
          type: "list",
          items: [
            "Remise : « Ajouter une remise » — pourcentage ou montant fixe, sur toute la commande ou un article, avec un motif.",
            "Diviser la commande : « Diviser la commande » — choisissez les articles qui partent sur une nouvelle addition séparée.",
            "Changer de table : « Changer de table » — déplacez la commande vers une autre table.",
            "Dupliquer un article : ajoutez-en vite un autre identique.",
          ],
        },
        { type: "h3", text: "Clôturer une commande" },
        {
          type: "steps",
          items: [
            "Quand tous les articles sont servis, appuyez sur « Clôturer la commande ».",
            "Choisissez un mode de paiement (si des modes sont configurés).",
            "La commande se ferme et quitte la liste des actives.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cuisine (KDS)",
      blocks: [
        {
          type: "p",
          text: "L'écran de cuisine (KDS) est un écran sur tablette pour les cuisiniers. Les nouvelles commandes y arrivent en temps réel, et le cuisinier marque les plats comme prêts.",
        },
        { type: "h3", text: "Ce que l'écran affiche" },
        {
          type: "list",
          items: [
            "Des fiches de commande avec articles, options et le temps « au passe ».",
            "Une indication par couleurs du statut : ce qui est en préparation, ce qui est prêt.",
            "Un signal sonore à l'arrivée d'une nouvelle commande.",
          ],
        },
        { type: "h3", text: "Comment l'utiliser" },
        {
          type: "steps",
          items: [
            "Touchez un article pour le faire passer au statut suivant (En préparation → Prêt).",
            "Activez le son avec le bouton « Activer le son » — les nouvelles commandes auront alors une alerte sonore.",
            "Avec le zoom, ajustez la taille des fiches à la tablette.",
            "Avec les filtres, affichez seulement les catégories voulues (par exemple seulement la ligne chaude).",
          ],
        },
        {
          type: "note",
          text: "Si la tablette perd internet, l'avertissement « Pas de connexion » apparaît. Connectez le Wi-Fi et les commandes reviendront.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Réservations",
      blocks: [
        {
          type: "p",
          text: "Les clients peuvent réserver une table depuis votre menu, et vous gérez les réservations dans la section « Réservations » (vue « Mois » / « Jour »).",
        },
        { type: "h3", text: "Configurer les réservations" },
        { type: "p", text: "Activez et configurez d'abord les réservations : Réglages → Réservations." },
        {
          type: "steps",
          items: [
            "Activez « Activer les réservations ».",
            "Choisissez le mode de confirmation : « Automatique » (les réservations se confirment seules) ou « Manuel » (vous confirmez chacune).",
            "Définissez la « Durée de la réservation » — combien de temps la table est tenue pour le client.",
            "Remplissez l'« Horaire hebdomadaire » : pour chaque jour — ouvert/fermé, horaires et, si besoin, la pause déjeuner.",
          ],
        },
        {
          type: "note",
          text: "Pour accepter des réservations, il faut des tables. S'il n'y en a pas, le système vous demandera d'en ajouter d'abord.",
        },
        { type: "h3", text: "Gérer les réservations" },
        {
          type: "list",
          items: [
            "Les nouvelles réservations en attente de décision sont regroupées dans le bloc « En attente de confirmation ».",
            "Boutons « Confirmer » / « Refuser » — pour chaque réservation.",
            "« Terminer » — indique que le client est arrivé et la réservation est honorée.",
            "Basculez entre « Mois » et « Jour », parcourez la période avec « Précédent » / « Suivant ».",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Appareils (tablettes)",
      blocks: [
        {
          type: "p",
          text: "Les terminaux cuisine, serveur et réservations sont des tablettes séparées qui se connectent à votre compte avec un code. Section : Réglages → Appareils.",
        },
        {
          type: "note",
          text: "Les appareils sont disponibles avec une formule payante ou pendant un essai actif.",
        },
        { type: "h3", text: "Connecter une tablette (appairage)" },
        {
          type: "steps",
          items: [
            "Dans le tableau de bord : Réglages → Appareils → « Ajouter un appareil ».",
            "Indiquez un nom (par exemple « Cuisine — ligne chaude ») et un type : Cuisine, Serveur ou Réservations.",
            "Appuyez sur « Générer un code » — un code à 6 chiffres apparaît (valable 2 minutes).",
            "Sur la tablette, ouvrez l'écran de connexion et saisissez ce code.",
            "La tablette se connecte et commence aussitôt à fonctionner dans le rôle choisi.",
          ],
        },
        { type: "tip", text: "Si le code a expiré — appuyez simplement sur « Nouveau code » et saisissez le nouveau." },
        { type: "h3", text: "Gérer les appareils" },
        {
          type: "list",
          items: [
            "Statuts : En ligne / Hors ligne / En attente de connexion / Révoqué.",
            "« Révoquer » — déconnecte la tablette (par exemple si elle est perdue). Un nouveau code est nécessaire pour se reconnecter.",
            "« Supprimer » — retire l'appareil de la liste définitivement.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analyses",
      blocks: [
        {
          type: "p",
          text: "La section « Analyses » affiche les chiffres clés de l'établissement : chiffre d'affaires, nombre de commandes et leur répartition (par exemple par mode de paiement et par heure). Utilisez-la pour comprendre ce qui se vend le mieux et quand.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Réglages",
      blocks: [
        {
          type: "p",
          text: "La section « Réglages » s'ouvre sous forme d'un ensemble de cartes-sections. En haut se trouve le sélecteur du restaurant actif (si vous en avez plusieurs). En dessous — chaque carte dans l'ordre.",
        },
        { type: "h3", text: "Site" },
        {
          type: "list",
          items: [
            "URL du menu public — l'adresse unique de votre menu (vous pouvez définir votre propre slug court et copier le lien).",
            "Le nom (titre) de l'établissement sur le site public.",
            "Couleur d'accent — la couleur principale des boutons et des mises en évidence du menu.",
            "Arrière-plan — une image ou une vidéo sur l'accueil ; téléversez la vôtre ou générez un arrière-plan par IA à partir d'une description.",
            "Mise en page du menu — comment les plats sont présentés au client.",
          ],
        },
        { type: "h3", text: "Contacts et adresse" },
        {
          type: "p",
          text: "Téléphone, Instagram, WhatsApp et un repère sur la carte — tout est montré au client sur la page contacts de votre menu.",
        },
        { type: "h3", text: "Région" },
        { type: "p", text: "Devise (utilisée pour tous les prix) et fuseau horaire de l'établissement." },
        { type: "h3", text: "Tables" },
        { type: "p", text: "Plan de salle, places et QR codes des tables — en détail dans la section 3." },
        { type: "h3", text: "Appareils" },
        {
          type: "p",
          text: "Connexion des tablettes pour l'écran de cuisine et les terminaux serveurs — en détail dans la section 7.",
        },
        { type: "h3", text: "Commandes" },
        {
          type: "list",
          items: [
            "« Accepter les commandes » — l'interrupteur principal pour recevoir des commandes.",
            "« Mode de commande » — Interne et/ou WhatsApp.",
            "« Champs obligatoires » — quelles données le client doit fournir (Nom, Téléphone, Adresse).",
            "« Modes de paiement » — pour intégrer le système de paiement du restaurant, contactez le support.",
          ],
        },
        { type: "h3", text: "Réservations" },
        {
          type: "p",
          text: "Activation des réservations, confirmation automatique ou manuelle, durée et horaires — en détail dans la section 6.",
        },
        { type: "h3", text: "Langues" },
        {
          type: "steps",
          items: [
            "Ouvrez Réglages → Langues.",
            "Choisissez les langues dans lesquelles le menu public est traduit (touchez pour ajouter/retirer).",
            "Définissez la langue par défaut.",
            "Les textes se traduisent manuellement ou avec le bouton « Traduire avec l'IA » — le système traduit les noms et descriptions des plats dans les langues choisies.",
          ],
        },
        { type: "h3", text: "Paiement" },
        { type: "p", text: "Formule d'abonnement, statut de l'essai et gestion des paiements." },
        {
          type: "list",
          items: [
            "Facturation mensuelle ou annuelle (l'annuelle est moins chère).",
            "« S'abonner » / « Changer » — choisir ou changer de formule.",
            "« Gérer » — changer le mode de paiement ou annuler l'abonnement.",
          ],
        },
        {
          type: "note",
          text: "Le paiement se fait en EUR. Pour payer dans une autre devise, contactez le support.",
        },
        { type: "h3", text: "Support" },
        {
          type: "p",
          text: "Un chat intégré avec notre équipe en temps réel. Écrivez un message — nous répondons ici même.",
        },
        { type: "h3", text: "Changer et ajouter des restaurants" },
        {
          type: "p",
          text: "Si vous avez plusieurs établissements, le sélecteur de restaurant se trouve en haut de la section « Réglages ».",
        },
        {
          type: "steps",
          items: [
            "Ouvrez le sélecteur de restaurants en haut des « Réglages ».",
            "« Ajouter un restaurant » → saisissez un nom.",
            "Choisissez « Dupliquer le menu et les réglages actuels » (démarrage rapide) ou « Partir de zéro » (un restaurant vide).",
            "Créez-le — et basculez entre les restaurants à tout moment ici même.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Le menu public pour les clients",
      blocks: [
        {
          type: "p",
          text: "Le menu public est ce que voit le client après avoir scanné le QR. Il est assemblé automatiquement à partir de votre menu, de votre marque et de vos contacts.",
        },
        {
          type: "list",
          items: [
            "L'adresse du menu se définit dans Réglages → Région (« Lien du menu »).",
            "Le QR code général et le lien du menu s'obtiennent avec le bouton « Partager » sur la page « Menu ».",
            "Chaque table a son propre QR séparé (Réglages → Tables) qui mène au menu de cette table précise.",
            "L'apparence (arrière-plan, couleur d'accent, mise en page) se configure dans la section « Site ».",
            "Le bouton « Aperçu » ouvre le menu tel que le client le voit.",
          ],
        },
        {
          type: "tip",
          text: "Après toute modification du menu/des réglages, appuyez sur « Aperçu » pour vérifier ce que voit le client.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Questions fréquentes et détails",
      blocks: [
        { type: "h3", text: "Le client ne peut pas passer commande" },
        {
          type: "p",
          text: "Vérifiez Réglages → Commandes → « Accepter les commandes » (doit être activé) et qu'au moins un mode de commande est sélectionné.",
        },
        { type: "h3", text: "Les réservations n'arrivent pas" },
        {
          type: "p",
          text: "Assurez-vous que les réservations sont activées dans Réglages → Réservations, que des tables sont ajoutées et que le jour n'est pas marqué « Fermé » dans l'horaire.",
        },
        { type: "h3", text: "La tablette ne se connecte pas" },
        {
          type: "p",
          text: "Le code est valable 2 minutes. S'il a expiré — générez-en un nouveau dans Réglages → Appareils. Si l'appareil a été révoqué — créez un nouveau code.",
        },
        { type: "h3", text: "Un plat est épuisé" },
        {
          type: "p",
          text: "Ne le supprimez pas — appuyez sur « Masquer le plat ». Il disparaît du menu public, et vous le rétablissez avec « Afficher le plat ».",
        },
        { type: "h3", text: "Vous avez besoin d'appareils/terminaux mais n'en avez pas" },
        {
          type: "p",
          text: "La section « Appareils » est disponible avec une formule payante ou pendant un essai actif. Vérifiez Réglages → Paiement.",
        },
        { type: "h3", text: "D'autres questions" },
        {
          type: "p",
          text: "Écrivez-nous dans Réglages → Support — c'est un chat intégré avec notre équipe.",
        },
      ],
    },
  ],
};
