import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Registre de canvis — Actualitzacions i noves funcions d'IQ Rest",
    description:
      "Cada llançament d'IQ Rest en un sol lloc. Noves funcions, millores d'IA i llançaments de producte per a menús QR de restaurants, comandes en línia i reserves.",
  },
  pageTitle: "Registre de canvis",
  pageSubtitle:
    "Cada actualització que publiquem per fer més fluid el menú QR del teu restaurant, les comandes en línia i les reserves. El més nou primer.",
  readMore: "Llegir més",
  backToList: "Tornar al registre",
  publishedOn: "Publicat el",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Fotos de plats per IA per a menú QR de restaurant | IQ Rest",
        description:
          "Genera fotos de plats estilísticament coherents per a tot el teu menú QR amb un sol clic. Sense fotos d'estoc, sense fotògraf, sense edició.",
      },
      title: "Fotos de plats generades per IA per a tot el teu menú QR",
      subtitle:
        "Deixa de buscar a galeries d'estoc i de programar sessions de fotos. IQ Rest ara genera un conjunt complet de fotos de plats apetitosos en un estil únic i coherent — directament dels noms dels teus plats.",
      intro:
        "Fotografiar cada plat del menú és car, lent i poques vegades coherent. Les biblioteques de fotos d'estoc deixen buits i l'estil mai encaixa del tot amb la teva marca. IQ Rest tanca aquest buit amb fotografia de plats integrada per IA: escriu un nom de plat, obtens una foto d'alta qualitat que coincideix amb la resta del teu menú. Cada imatge es genera específicament per a tu, dimensionada tant per al menú QR com per a formats imprimibles.",
      sections: [
        {
          title: "Un estil de foto per a tot el menú",
          body: "Quan els clients exploren un menú, els estils descoordinats trenquen l'experiència — un brillant, un fosc, un vist des de dalt, un de costat. IQ Rest genera cada foto en un estil únic coherent amb la marca: la mateixa direcció d'il·luminació, el mateix llenguatge de plats, el mateix ambient de fons. El resultat sembla una sessió de fotos real, excepte que cada plat es renderitza en el moment d'afegir-lo al menú. Quan afegeixes nous plats, l'estil es preserva automàticament.",
        },
        {
          title: "Del nom del plat al plat en segons",
          body: "No cal explicar res. Afegeixes un plat — diguem, 'Tagliatelle de tòfona amb bolets silvestres' — i IQ Rest crea la foto entre bambolines. La imatge es puja al teu menú, s'optimitza com a WebP i està a punt per mostrar-se abans que acabis d'afegir el següent plat. Si una foto no encaixa amb el que tenies al cap, regenera-la amb un toc. Cada restaurant rep generacions d'IA gratuïtes per començar, amb recàrregues assequibles si vols fotos per a un menú sencer de 80 plats.",
        },
        {
          title: "Optimitzat per a mòbil i SEO",
          body: "Cada imatge generada es codifica com a WebP comprimit al 80% de qualitat, després es serveix des d'un CDN de Hetzner a Nuremberg amb submostreig intel·ligent. Les pàgines es mantenen ràpides en 4G, sense esquelets, sense desplaçament de disseny. Les fotos també són indexables per Google Images — els clients que cerquen els noms dels teus plats per imatge poden trobar el teu menú directament.",
        },
      ],
      benefitsTitle: "Per què importen les fotos de plats per IA",
      benefits: [
        "Sense subscripcions a fotos d'estoc ni honoraris de fotògraf",
        "Estil coherent amb la marca per a cada plat del menú",
        "Els plats nous reben una foto coincident automàticament",
        "WebP comprimit — ràpid en mòbil, sense salts de disseny",
        "Generacions gratuïtes incloses amb cada pla",
        "Regenera qualsevol foto amb un toc fins que sigui perfecta",
      ],
      conclusionTitle: "Una foto per a cada plat, sense la producció",
      conclusionBody:
        "Els restaurants que inclouen fotos venen més plats d'alt marge — no és una conjectura, és mecànica d'ingressos ben coneguda. La raó per la qual la majoria de menús no tenen fotos és el cost de producció. IQ Rest elimina aquest cost completament. Cada plat que afegeixes rep una foto bonica i alineada amb la marca abans que acabis la configuració. Combina-ho amb comandes per QR i mira com pugen les taxes d'upsell sense aixecar una càmera.",
      ctaText: "Genera fotos d'IA per a cada plat del teu menú — gratis durant la teva prova.",
      ctaButton: "Prova-ho gratis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Generador de fons de portada de restaurant per IA | IQ Rest",
        description:
          "Genera automàticament una imatge de portada bonica per al teu menú QR en segons. Coincideix amb la teva cuina, ambient i marca — sense fotos d'estoc.",
      },
      title: "Fons de portada de restaurant generat per IA",
      subtitle:
        "El teu menú QR s'obre amb la vibra correcta fins i tot abans que els clients facin scroll. IQ Rest ara genera un fons de portada personalitzat que coincideix amb la teva cuina i atmosfera — automàticament.",
      intro:
        "Les primeres impressions importen, especialment quan els clients escanegen un codi QR a la taula. Una imatge de portada genèrica soscava tot el que has gastat en disseny d'interiors. IQ Rest ara genera una imatge de portada única i atmosfèrica per a cada restaurant — basada en la cuina que tries durant el registre. Trattoria italiana, izakaya japonesa, bar de tapes espanyol — cadascun rep una portada que sembla adequada.",
      sections: [
        {
          title: "Adaptat a la teva cuina i ambient",
          body: "Quan completes el assistent de registre, IQ Rest pren la cuina que has seleccionat i genera una portada que encaixa. La italiana rep il·luminació càlida de trattoria i pasta en enfocament suau. La japonesa rep línies netes i composició equilibrada. La mexicana rep colors vibrants i energia de menjar de carrer. La coincidència és automàtica, però pots regenerar la portada en qualsevol moment, amb la teva pròpia direcció creativa si vols quelcom específic.",
        },
        {
          title: "Optimitzat per a seccions hero del menú QR",
          body: "Les imatges de portada es generen exactament en la relació d'aspecte utilitzada per la secció hero del menú QR — nítides en cada telèfon, sense retalls incòmodes. Es codifiquen com a WebP, es serveixen ràpidament i es carreguen mandrosament perquè la resta del menú es pinti primer. La portada estableix el to, després desapareix quan els clients comencen a explorar plats.",
        },
        {
          title: "Coherència de marca de fàbrica",
          body: "L'estil de la imatge de portada s'aparella automàticament amb les fotos de plats d'IA generades per al teu menú — el mateix llenguatge d'il·luminació, la mateixa paleta de colors, el mateix ambient. Els clients perceben el teu restaurant com a cohesionat i dissenyat professionalment, fins i tot si has muntat tot en cinc minuts des del teu telèfon.",
        },
      ],
      benefitsTitle: "Per què una portada d'IA supera l'estoc",
      benefits: [
        "Única per al teu restaurant — no una foto d'estoc que cada altre lloc fa servir",
        "Coincident amb la cuina que vas seleccionar al registre",
        "Mateix llenguatge visual que les teves fotos de plats generades per IA",
        "Dimensionada correctament per al hero del menú QR — sense retall manual",
        "WebP comprimit per a càrrega mòbil ràpida",
        "Regenera en qualsevol moment amb un toc",
      ],
      conclusionTitle: "Una portada que diu 'sabem el que fem'",
      conclusionBody:
        "Quan un client escaneja el teu codi QR, el primer que veu és la teva portada. Una imatge polida i atmosfèrica senyala qualitat abans que llegeixin un sol nom de plat. Amb IQ Rest, aquest poliment és automàtic — generat de franc durant el registre, i regenerable sempre que canviïs d'opinió. Sense galeries d'estoc, sense feina de disseny, només una portada que encaixa.",
      ctaText: "Aconsegueix una portada d'IA personalitzada per al teu menú QR en menys d'un minut.",
      ctaButton: "Comença la prova gratuïta",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Assistent de registre en 3 passos per a menú QR | IQ Rest",
        description:
          "Tria cuina, nom del restaurant, correu — i IQ Rest construeix el teu menú QR. El registre més ràpid de la indústria de menús QR.",
      },
      title: "Assistent de registre en 3 passos: De correu a menú QR funcional en menys d'un minut",
      subtitle:
        "Tria la teva cuina. Escriu el nom del restaurant. Confirma el teu correu. Fet — el teu menú QR està a punt, amb plats d'exemple i fotos generades per IA.",
      intro:
        "Els propietaris de restaurants no tenen temps per a un formulari de registre de 10 pantalles. Per això el vam reduir a tres. Tria la cuina que coincideixi amb el teu local. Escriu el nom del teu restaurant. Confirma el teu correu. Per quan iniciïs sessió per primera vegada, el teu menú QR ja està poblat amb plats d'exemple apropiats per a la cuina i fotografia d'IA coincident. Pots servir un client en 60 segons des del començament del registre.",
      sections: [
        {
          title: "Pas 1 — Selecció de cuina",
          body: "Tria d'una àmplia llista de cuines: italiana, espanyola, japonesa, mexicana, francesa, mediterrània, índia, americana, cafè, bar, pizzeria i més. L'elecció condueix tots els valors per defecte de l'assistent: plats d'exemple, estil de portada d'IA, divisa per defecte i estructura inicial de categories. No estàs configurant res — estàs triant un punt de partida.",
        },
        {
          title: "Pas 2 — Nom del restaurant",
          body: "Escriu el nom tal com el veuran els clients. L'usem a tot arreu: el hero del menú QR, el títol de la pàgina, el slug SEO, la previsualització de compartició social. No hi ha cap decisió separada de marca vs nom de visualització — un camp, una font de veritat. Es pot ometre si vols ajornar la decisió; omplirem un marcador de posició que pots renomenar més tard.",
        },
        {
          title: "Pas 3 — Correu o inici de sessió amb Google",
          body: "Confirma amb correu + codi únic, o toca 'Inicia sessió amb Google' per a creació instantània de compte. Sense contrasenya per recordar. En el moment que confirmes, l'assistent executa el sembrador del menú entre bambolines — categories creades, plats d'exemple inserits, fotos d'IA generades, portada del restaurant a punt. Aterres directament al tauler amb un menú funcional.",
        },
      ],
      benefitsTitle: "Per què un registre en 3 passos supera un formulari",
      benefits: [
        "Menys de 60 segons des de la pàgina d'aterratge fins a un menú QR funcional",
        "Zero decisions que no puguis canviar més tard — només valors per defecte per començar",
        "Plats d'exemple pre-poblats per cuina — contingut instantani per editar",
        "Fotos d'IA i imatge de portada a punt per quan iniciïs sessió",
        "Opció d'inici de sessió amb Google — sense contrasenya per gestionar",
        "Progrés anònim guardat si surts a mig assistent",
      ],
      conclusionTitle: "La configuració de menú QR més ràpida, punt",
      conclusionBody:
        "La majoria de serveis de menús QR et fan omplir desenes de camps abans que vegis res útil. IQ Rest inverteix això — et donem un menú funcional primer, després et permetem personalitzar. L'assistent elimina cada barrera entre la curiositat i un producte usable. Els restaurants que acaben el registre en menys de 60 segons són dramàticament més propensos a publicar realment el seu menú, prendre la seva primera comanda i mantenir la subscripció.",
      ctaText: "Comença l'assistent de 3 passos ara — el teu menú estarà actiu en 60 segons.",
      ctaButton: "Comença la prova gratuïta",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Menú d'exemple generat per IA al registre | IQ Rest",
        description:
          "Salta l'estat buit. IQ Rest genera automàticament un menú QR inicial basat en la teva cuina — categories, plats, preus i fotos.",
      },
      title: "Menú d'exemple construït per IA just després del registre",
      subtitle:
        "Prou de mirar un tauler buit. IQ Rest sembra el teu compte amb categories, plats i fotos d'IA apropiats per a la cuina perquè puguis editar, no començar de zero.",
      intro:
        "La part més difícil de qualsevol eina nova és l'estat buit. Els nous propietaris de restaurants s'asseuen, veuen un menú en blanc i tanquen la pestanya. IQ Rest soluciona això poblant el teu menú en el moment que et registres. Tria italiana — obtens antipasti, pasta, pizza, postre. Tria japonesa — obtens sushi, ramen, donburi, sake. Cada categoria té de 6 a 10 plats inicials amb fotos generades per IA en un estil coherent. La teva feina es converteix en editar preus i ajustar noms, no construir des de zero.",
      sections: [
        {
          title: "Categories i plats conscients de la cuina",
          body: "El sembrador no llança plats aleatoris. Utilitza la cuina que has triat a l'assistent de registre per extreure un conjunt seleccionat de categories que tenen sentit per al teu estil de restaurant. Una pizzeria rep 'Pizza Classica', 'Pizza Speciale', 'Antipasti', 'Bevande'. Un bistró francès rep 'Entrées', 'Plats principaux', 'Fromages', 'Desserts'. El contingut inicial coincideix amb la convenció que els comensals esperen per a aquesta cuina.",
        },
        {
          title: "Fotos i preus de fàbrica",
          body: "Cada plat inicial ve amb una foto generada per IA en un estil coherent i un preu per defecte raonable denominat en la teva moneda local (detectada automàticament per geolocalització). Els preus són marcadors de posició — els canviaràs — però fan que el menú sembli real immediatament, perquè puguis previsualitzar el menú QR i sentir com serà el resultat final. Això és crític per mostrar a socis, obtenir feedback o simplement decidir 'sí, aquesta és l'eina que volem fer servir'.",
        },
        {
          title: "Edita, no comencis de zero",
          body: "Un cop sembrat, cada plat porta un flag isExample. Tan aviat com edites un plat — canvies el seu nom, preu o descripció — el flag desapareix. Els plats d'exemple restants destaquen visualment perquè sàpigues què encara és contingut de marcador de posició. Aquesta separació fa òbvia la diferència entre el que està fet i el que encara falta, convertint el problema de l'estat buit en un flux d'edició productiu.",
        },
      ],
      benefitsTitle: "Per què guanya un menú pre-construït",
      benefits: [
        "Zero estat buit — obre el tauler i veu un menú funcional",
        "Categories i plats coincidents amb la cuina que vas triar",
        "Fotos d'IA per a cada plat inicial en un estil unificat",
        "Moneda local detectada automàticament, preus per defecte al seu lloc",
        "El flag d'exemple s'esvaeix mentre edites — senyal de progrés clar",
        "Mostra als interessats un menú d'aspecte real en pocs minuts",
      ],
      conclusionTitle: "Salta la pàgina en blanc",
      conclusionBody:
        "Construir un menú des de zero és intimidador. Editar-ne un és fàcil. IQ Rest et dóna un menú inicial complet en el moment que et registres, després et deixa ajustar-lo perquè coincideixi amb la teva oferta real. El resultat: més restaurants acaben la configuració, més menús realment es publiquen, més clients escanegen codis QR que porten a menús reals, editats i de producció.",
      ctaText: "Registra't i obtén un menú inicial completament construït en la teva cuina.",
      ctaButton: "Construeix el meu menú",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Tour interactiu del menú per a usuaris primerencs | IQ Rest",
        description:
          "Una guia interactiva de 7 passos guia els nous propietaris de restaurants pel tauler del menú QR — sense documents, sense vídeos, només pràctica.",
      },
      title: "Tour interactiu del menú de 7 passos a la primera visita",
      subtitle:
        "No et fem llegir documentació. La primera vegada que obres el menú, IQ Rest et guia a través d'ell — afegir categoria, afegir plat, editar, ordenar, previsualitzar, compartir, tot en set tocs.",
      intro:
        "La majoria de productes SaaS amaguen l'onboarding en un centre d'ajuda que ningú llegeix. IQ Rest pren l'enfocament oposat: la primera vegada que un usuari nou aterra a la pàgina del menú, un tour interactiu il·lumina cada acció clau en seqüència. Afegir una categoria. Afegir el teu primer plat. Editar-lo. Canviar la visibilitat. Reordenar. Previsualitzar el menú en directe. Compartir amb un client. Al pas set, has fet servir cada característica que necessitaràs el 95% del temps.",
      sections: [
        {
          title: "Dins el producte, no en una base de coneixement",
          body: "Cada pas del tour il·lumina l'element UI real a la teva pantalla. Una bombolla explica què fa l'element i per què importa. No hi ha captures de pantalla — la captura ÉS el teu tauler. Mentre toques, aprens fent, no llegint. Salta en qualsevol moment; el tour persisteix entre sessions fins que el completis o el descartis permanentment.",
        },
        {
          title: "Dissenyat al voltant del flux de treball real",
          body: "Els set passos no són un abocament de característiques — mapen al flux de treball que un nou restaurant realment realitza. Afegir categories primer (begudes, plats principals, postres), després plats, després refinar cada plat, després organitzar l'ordre en què apareixen, després previsualitzar per assegurar-se que es veu bé, després compartir via QR. Al final, has completat el bucle des de menú buit fins a codi QR en una targeta de taula impresa.",
        },
        {
          title: "Localitzat en 35 idiomes",
          body: "El text del tour està traduït a cada idioma que IQ Rest admet — el mateix que la resta del tauler. Els propietaris de parla espanyola reben bombolles espanyoles, els alemanys reben alemany, els catalans reben català. Res al tour pressuposa coneixement d'anglès.",
        },
      ],
      benefitsTitle: "Per què un tour dins el producte supera un centre d'ajuda",
      benefits: [
        "Aprèn fent, no llegint documents",
        "7 passos cobreixen ~95% del flux de treball",
        "Descarta en qualsevol moment — mai bloqueja el tauler",
        "Persisteix entre sessions fins a completar o ometre",
        "Localitzat en 35 idiomes — no cal anglès",
        "Sense vídeos per carregar — superposició UI nativa instantània",
      ],
      conclusionTitle: "De confós a confiat en set passos",
      conclusionBody:
        "El moment més difícil de qualsevol producte són els primers 30 segons. L'usuari obre el tauler, mira al voltant i o ho entén o se'n va. El tour interactiu d'IQ Rest elimina aquest risc — en un minut, cada usuari nou sap on afegir un plat, com previsualitzar, com compartir. La finalització del tour es correlaciona fortament amb la publicació exitosa del menú. No només estem ensenyant el producte — estem fent que el menú surti.",
      ctaText: "Registra't i fes-te guiar pel teu primer menú QR en set tocs.",
      ctaButton: "Comença la prova gratuïta",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Pàgines d'aterratge específiques per país per a menú QR | IQ Rest",
        description:
          "Els visitants d'Espanya veuen una pàgina d'aterratge adaptada als restaurants espanyols. França veu francès. 35 països, 35 pàgines ajustades a la conversió.",
      },
      title: "Pàgina d'aterratge personalitzada en cada idioma",
      subtitle:
        "Els visitants ja no reben una pàgina traduïda automàticament. Cada un dels 35 idiomes admesos té la seva pròpia pàgina d'aterratge, escrita per a aquell mercat.",
      intro:
        "Les pàgines d'aterratge traduïdes automàticament converteixen malament. La gramàtica està malament, les referències culturals estan malament i els termes locals de pagament se senten importats. IQ Rest ara envia una pàgina d'aterratge única per a cada un dels 35 idiomes admesos — escrita per al mercat, no només traduïda. Els visitants espanyols reben una pàgina sobre restaurantes y cafeterías. Els visitants francesos reben cafés et bistrots. Els visitants alemanys reben Restaurants und Imbisse. Cada pàgina lidera amb la proposta de valor que més importa a aquella audiència.",
      sections: [
        {
          title: "Una pàgina per idioma, no traducció automàtica",
          body: "Cada aterratge viu a /<locale> com a ruta autònoma de Next.js. Els textos estan en objectes TypeScript — versionats, comprovats per tipus, desplegables independentment. Podem fer A/B test d'una variant hero en espanyol sense tocar l'alemanya. Podem localitzar una crida de preu per al real brasiler sense afectar els mercats de l'euro. El resultat és iteració més ràpida en els aterratges que generen conversió real.",
        },
        {
          title: "La geolocalització redirigeix els visitants automàticament",
          body: "La primera vegada que un visitant aterra a iq-rest.com, el nostre mòdul geo de nginx llegeix el seu codi de país i redirigeix al /<locale> correcte. Les IPs espanyoles aterren a /es. Les alemanyes aterren a /de. El Brasil aterra a /pt. Fins i tot enrutem les parts de parla catalana d'Espanya a /ca en lloc de /es. Els visitants mai veuen un modal 'tria el teu idioma' — veuen el seu idioma per defecte.",
        },
        {
          title: "Etiquetes hreflang i canonical per a tota la marca",
          body: "Els 35 aterratges es referencien entre si via etiquetes hreflang perquè Google indexi el correcte per a cada consulta. Les URLs canòniques apunten a la URL per locale, no a una arrel genèrica. La configuració segueix exactament les directrius SEO internacionals de Google, perquè cada aterratge competeixi en el seu propi idioma sense canibalitzar els altres.",
        },
      ],
      benefitsTitle: "Per què els aterratges per país converteixen millor",
      benefits: [
        "Frase nativa en cada mercat — no traducció automàtica",
        "L'enrutament geo serveix la pàgina correcta automàticament",
        "Etiquetes hreflang i canonical segueixen les directrius de Google",
        "Els visitants catalans a Catalunya veuen català, no castellà",
        "Moneda, preus i CTAs localitzats per mercat",
        "Tests A/B independents per locale sense contaminació creuada",
      ],
      conclusionTitle: "35 idiomes, 35 portes davanteres",
      conclusionBody:
        "Si un propietari de restaurant espanyol aterra en una pàgina anglesa mig traduïda amb preus a l'estil dels EUA, marxa. Si aterra en una pàgina que li parla en espanyol, amb preus en euros i referències espanyoles, converteix. IQ Rest ara fa la segona cosa en cada mercat que servim — 35 aterratges, 35 portes davanteres ajustades a la conversió, totes geo-enrutades automàticament.",
      ctaText: "Prova IQ Rest en el teu idioma — aterratge adaptat al teu mercat.",
      ctaButton: "Obre el meu idioma",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Inicia sessió amb Google per al tauler de menú QR | IQ Rest",
        description:
          "Salta contrasenyes i codis de correu. Toca 'Inicia sessió amb Google' per accedir al tauler del menú QR del teu restaurant en un segon.",
      },
      title: "Inicia sessió amb Google — Accés en un toc al teu menú QR",
      subtitle:
        "Salta correus OTP i contrasenyes oblidades. Toca 'Continua amb Google' i ets dins del tauler en menys d'un segon.",
      intro:
        "L'autenticació amb correu + codi únic és segura però lenta. Escriu el teu correu, espera el codi, canvia a la safata d'entrada, copia el codi, enganxa, envia. És un flux de 30 segons en el millor cas. IQ Rest ara ofereix Inicia sessió amb Google com a alternativa: toca un botó, tria el teu compte de Google, ets dins. Sense contrasenya per oblidar, sense viatge a la safata d'entrada, sense fricció.",
      sections: [
        {
          title: "OAuth de Google natiu, no un bucle de redireccions",
          body: "Utilitzem el SDK oficial de Google Identity Services amb la UI One Tap als navegadors compatibles. El flux passa en un popup natiu, no una redirecció al domini de Google i tornada. Tot triga un segon després del primer toc. Verifiquem el token ID de Google al servidor contra les claus públiques de Google, així que el flux és criptogràficament segur d'extrem a extrem.",
        },
        {
          title: "Mateix compte, qualsevol mètode",
          body: "Si t'has registrat amb correu-OTP i més tard tries Google, enllacem els comptes per correu. Pots canviar entre mètodes a cada inici de sessió. No hi ha cap 'compte de Google separat' a gestionar, i no perds el teu menú per iniciar sessió de manera diferent. També enviem el locale del teu tauler durant l'inici de sessió amb Google perquè els correus al teu compte vagin en l'idioma correcte des del primer dia.",
        },
        {
          title: "Mòbil-Primer — Funciona a iOS Safari i Android Chrome",
          body: "El SDK oficial de Google ha estat històricament fràgil al mòbil. Vam dissenyar al voltant d'això superposant un botó de Google real sobre la nostra UI en lloc de disparar clics programàtics (que iOS Safari ara bloqueja). El resultat: el botó funciona a cada navegador modern de telèfon, sense instal·lació, sense botiga d'aplicacions.",
        },
      ],
      benefitsTitle: "Per què iniciar sessió amb Google supera correu OTP",
      benefits: [
        "Un toc per iniciar sessió — sense viatge per correu",
        "Sense contrasenya per recordar o restablir",
        "Mateix compte tant si fas servir correu com Google",
        "Verificat criptogràficament al servidor via token ID de Google",
        "Funciona de manera fiable a iOS Safari i Android Chrome",
        "Locale enviat perquè els correus es mantinguin en el teu idioma",
      ],
      conclusionTitle: "La manera més ràpida de tornar al teu tauler",
      conclusionBody:
        "Els propietaris de restaurants comproven els seus menús desenes de vegades a la setmana — entre serveis, després d'una impressió, en ajustar preus. Cada segon estalviat en l'inici de sessió s'acumula. Iniciar sessió amb Google converteix un flux OTP de 30 segons en un toc d'un segon. Correu-OTP es manté disponible per a propietaris que el prefereixin, però la majoria d'usuaris triaran Google després de provar-ho una vegada.",
      ctaText: "Salta la contrasenya — inicia sessió amb Google en un toc.",
      ctaButton: "Obre el tauler",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Notificacions de correu multilingües en 35 idiomes | IQ Rest",
        description:
          "Recordatoris de prova, respostes de suport, correus de subscripció — cada notificació que envia IQ Rest arriba en l'idioma del teu tauler.",
      },
      title: "Notificacions de correu multilingües en els 35 idiomes",
      subtitle:
        "Cada correu que IQ Rest envia — respostes de suport, recordatoris de prova, rebuts de subscripció — arriba en l'idioma que has establert al teu tauler. Inclosos els disposicions de dreta a esquerra.",
      intro:
        "Un correu en l'idioma equivocat és fricció en el millor cas, eliminació en el pitjor. IQ Rest ara envia cada correu transaccional en l'idioma que has establert al teu tauler, en tots els 35 locales admesos. Correus de benvinguda, recordatoris de prova caducant, confirmacions de subscripció, respostes de suport — tot arriba en el teu idioma, amb gramàtica adequada i frase culturalment apropiada. Idiomes de dreta a esquerra com l'àrab i el persa reben disposicions correctament reflectides.",
      sections: [
        {
          title: "preferredLocale viatja amb el teu compte",
          body: "Cada usuari té un camp preferredLocale establert la primera vegada que inicia sessió. Tant si t'has registrat via correu-OTP, Google o l'assistent, el teu locale es captura i persisteix. Cada feina backend que emet un correu — webhooks de Stripe, notificacions de resposta de suport, tasques cron programades — extreu el preferredLocale de l'usuari i l'utilitza per triar la plantilla correcta. Canvia locale al tauler i el següent correu reflecteix el canvi.",
        },
        {
          title: "Plantilles RTL per a àrab i persa",
          body: "Les disposicions de dreta a esquerra no són només traducció — tota la jerarquia visual gira. Enviem plantilles RTL dedicades per a àrab i persa: la navegació flueix de dreta a esquerra, números en àrab-índic on és apropiat, logo de marca posicionat correctament. El resultat és un correu que se sent natiu per als lectors RTL, no una plantilla LTR traduïda amb alineació trencada.",
        },
        {
          title: "Traduït per experts en la indústria de restaurants",
          body: "Els serveis de traducció genèrics produeixen traduccions literals però rígides. Vam traduir cada plantilla utilitzant terminologia de cuina i hostaleria que sona natural per a operadors de restaurants en cada mercat. 'Trial' es converteix en 'período de prueba' en espanyol (no 'juicio'). 'Reservation' es converteix en 'Reservierung' en alemany (no 'Reservation'). El nivell de detall s'acumula — els restaurants noten quan una eina parla el seu idioma correctament.",
        },
      ],
      benefitsTitle: "Per què importen els correus multilingües",
      benefits: [
        "Tots els correus transaccionals en l'idioma del teu tauler",
        "preferredLocale persisteix entre inicis de sessió",
        "Disposicions RTL per a àrab i persa",
        "Terminologia adequada per a hostaleria per idioma",
        "Canviar locale actualitza els correus futurs immediatament",
        "35 idiomes inclosos català, eslovè, estonià, letó",
      ],
      conclusionTitle: "Correus que parlen el teu idioma",
      conclusionBody:
        "Comunicació que aterra en l'idioma equivocat és comunicació que no funciona. IQ Rest envia cada correu en l'idioma que realment uses, amb la disposició i terminologia que encaixa. Sona petit fins que ets un propietari de restaurant espanyol rebent una alerta de caducitat de prova només en anglès i la passes per alt. Ara no.",
      ctaText: "Registra't i obtén el teu tauler més cada correu en el teu idioma.",
      ctaButton: "Comença la prova gratuïta",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Tauler mòbil de restaurant amb sensació nativa iOS | IQ Rest",
        description:
          "Navegació de pestanyes inferior, gestió d'àrea segura, entrades sense zoom — el tauler mòbil d'IQ Rest se sent com una aplicació nativa a iPhone.",
      },
      title: "Sensació nativa iOS al teu telèfon",
      subtitle:
        "Navegació de pestanyes inferior, consciència total d'àrea segura, entrades de formulari sense zoom i transicions de pàgina instantànies. Gestionar el teu menú QR en un telèfon ara se sent com utilitzar una app iOS nativa.",
      intro:
        "La majoria de taulers SaaS de restaurants són pensaments posteriors d'escriptori-primer al mòbil. IQ Rest és el contrari — dissenyat per a propietaris que gestionen el seu menú des del telèfon entre serveis. El tauler mòbil ara utilitza navegació de pestanyes inferior, respecta els insets d'àrea segura de l'iPhone, prevé el zoom d'entrada de formulari iOS i utilitza transicions SPA gairebé instantànies. Sembla i se sent com una app nativa, excepte que no hi ha cap app per instal·lar.",
      sections: [
        {
          title: "Navegació de pestanyes inferior, no un hamburguesa",
          body: "Els menús hamburguesa al mòbil són lents — toca per obrir, toca l'element, espera la pàgina. Vam reemplaçar la barra lateral d'escriptori amb una barra de pestanyes inferior als telèfons: Menú, Comandes, Reserves, Configuració. Un toc amigable amb el polze, navegació instantània. La pestanya activa utilitza el color d'accent de la teva marca perquè la ubicació actual sigui sempre òbvia.",
        },
        {
          title: "Insets d'àrea segura i indicador d'inici",
          body: "Els iPhones moderns tenen un indicador d'inici a la part inferior i una osca a la part superior. Les apps web que ignoren això acaben amb la seva UI superposada amb l'indicador o amagada darrere de l'osca. Utilitzem env(safe-area-inset-*) a tot arreu — la nav inferior se situa per sobre de l'indicador d'inici, el padding del contingut té en compte la dynamic island. El resultat se sent dissenyat per al dispositiu, no adaptat d'un navegador d'escriptori.",
        },
        {
          title: "Entrades sense zoom i enviament de formulari instantani",
          body: "iOS Safari amplia formularis amb mida de font d'entrada per sota de 16px. Vam pujar cada entrada a 16px i vam configurar el viewport amb maximum-scale=1, perquè els tocs no disparin el zoom-i-salt que trenca cada altre tauler web. Els enviaments de formulari són accions de servidor amb UI optimista — el canvi apareix immediatament, la xarxa confirma en segon pla.",
        },
      ],
      benefitsTitle: "Per què la sensació nativa importa al mòbil",
      benefits: [
        "Nav de pestanyes inferior — accés en un toc a cada secció",
        "Conscient d'àrea segura — sense superposició amb indicador d'inici o osca",
        "Entrades de 16px — sense zoom-i-salt iOS en tocs de formulari",
        "La pestanya activa utilitza el color d'accent de la teva marca",
        "Transicions SPA — sense recàrregues de pàgina completes entre seccions",
        "Sense app per instal·lar — funciona a Safari i Chrome",
      ],
      conclusionTitle: "Un tauler web que se sent com una app",
      conclusionBody:
        "La línia entre web i natiu és majoritàriament una qüestió d'atenció al detall. El tauler mòbil d'IQ Rest paga aquesta atenció — nav inferior, àrea segura, sense zoom, transicions instantànies — i el resultat és quelcom que juraries que es va construir amb Swift. Excepte que també funciona a Android, i no hi ha res per instal·lar o actualitzar a través d'una botiga d'aplicacions.",
      ctaText: "Obre IQ Rest al teu telèfon i sent la diferència.",
      ctaButton: "Prova gratis 14 dies",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Bàner de consentiment de cookies GDPR per a web de restaurant | IQ Rest",
        description:
          "Bàner de consentiment legal, alineat amb AEPD, sense scripts de tercers. L'analítica sense cookies dispara fins i tot abans del consentiment.",
      },
      title: "Bàner de consentiment de cookies conforme amb GDPR",
      subtitle:
        "Bàner de consentiment construït a mida sense CMP de tercers, sense etiqueta script de Cookiebot o OneTrust. Alineat amb les directrius d'AEPD i ePrivacy, amb analítica sense cookies que dispara abans del consentiment.",
      intro:
        "Cada lloc web comercial a la UE necessita un bàner de consentiment de cookies. La majoria fan servir CMPs de tercers que arrosseguen scripts pesats i alenteixen la pàgina. IQ Rest va construir el seu propi bàner de consentiment lleuger i alineat amb AEPD que és part del bundle de la pàgina — sense cerques DNS extra, sense seguiment de tercers. Els visitants veuen una elecció clara Acceptar / Rebutjar, amb ambdós botons estilitzats per igual (el patró fosc d'amagar 'rebutjar' és il·legal a molts països de la UE — no ho fem).",
      sections: [
        {
          title: "Alineat amb AEPD i ePrivacy",
          body: "L'AEPD espanyola i la directiva ePrivacy més àmplia requereixen botons Acceptar i Rebutjar amb la mateixa prominència. Molts CMPs ofereixen un patró fosc per defecte 'gegant accepta, petit rebutja'. Rebutgem aquest patró — ambdós botons són de la mateixa mida, el mateix estil, només colors diferents. Els visitants que rebutgen són rastrejats només via comptadors agregats sense cookies; mai emmagatzemem un identificador al seu dispositiu, així que no queda cap cookie de primera part després d'un rebuig.",
        },
        {
          title: "Sense scripts de tercers",
          body: "La majoria de bàners de consentiment carreguen Cookiebot, OneTrust o similars des d'un CDN. Això afegeix 50-100KB de JavaScript, una cerca DNS extra i una relació de compartició de dades amb tercer per divulgar a la teva política de privacitat. El bàner d'IQ Rest és part del bundle de la pàgina d'aterratge — sense peticions externes, sense compartició de dades amb tercer, càrrega de pàgina més ràpida.",
        },
        {
          title: "Privacitat, Cookies i Termes en modals",
          body: "Fer clic a 'Política de Privacitat', 'Política de Cookies' o 'Termes' al bàner obre un modal — sense navegació de pàgina, sense perdre la posició de scroll a l'aterratge. El text legal complet és allà, amb scroll, amb capçaleres adequades. Després de llegir, tanca el modal i tria Acceptar o Rebutjar. El flux és sense fricció per a l'usuari i ens permet evitar salts de pàgina extra que perjudicarien la conversió de l'aterratge.",
        },
      ],
      benefitsTitle: "Per què el nostre bàner supera els CMPs de tercers",
      benefits: [
        "Alineat amb AEPD i ePrivacy — Acceptar/Rebutjar de la mateixa prominència",
        "Sense scripts de tercers, sense cerques DNS extra",
        "Privacitat/Cookies/Termes en modals — sense salts de pàgina",
        "Analítica sense cookies dispara fins i tot abans del consentiment — mai perds dades",
        "Cookie de primera part eliminada al Rebutjar",
        "Lleuger — part del bundle de l'aterratge",
      ],
      conclusionTitle: "Conformitat sense arrossegament de conversió",
      conclusionBody:
        "El consentiment de cookies és innegociable a la UE però no ha d'alentir la teva pàgina ni perjudicar la teva conversió. El bàner d'IQ Rest és ràpid, just i totalment conforme. Els visitants que Accepten activen analítica per sessió; els visitants que Rebutgen encara es registren als nostres comptadors agregats anònims perquè sapiguem què passa a l'aterratge sense identificar-los mai.",
      ctaText: "Veu el flux de consentiment en acció — obre IQ Rest en un navegador nou.",
      ctaButton: "Visita aterratge",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacitat i Termes en modals — sense salts de pàgina | IQ Rest",
        description:
          "Política de Privacitat, Termes de Servei i Política de Cookies ara s'obren en modals a l'aterratge — sense perdre el teu scroll, sense navegació extra.",
      },
      title: "Privacitat, Termes i Política de Cookies en modals — sense salts de pàgina",
      subtitle:
        "Fes clic a qualsevol enllaç legal a l'aterratge o pàgina d'auth i la política s'obre en un modal net. Sense navegació, sense perdre la posició de scroll, sense trencar el flux de conversió.",
      intro:
        "Les pàgines independents /privacy, /terms i /cookies eren el patró estàndard — i l'error estàndard. Els visitants feien clic a l'enllaç, perdien el seu lloc a l'aterratge, llegien la política, després s'oblidaven de tornar. La conversió baixava. IQ Rest ara obre els tres documents legals com a modals dins la pàgina: mateixa posició de scroll preservada, mateixa experiència d'aterratge ininterrompuda, conformitat legal completa mantinguda.",
      sections: [
        {
          title: "Un component Modal, tres documents",
          body: "Utilitzem un sol component Modal amb un switch al tipus de document. Obre'l des del bàner de cookies, la pàgina d'auth, el footer — mateix component, mateix bloqueig de scroll, mateix tancament en escape. El text legal viu en constants TypeScript compartides perquè actualitzar una clàusula una vegada es propagui a cada lloc on es mostra la política. Sense duplicació, sense desviació.",
        },
        {
          title: "Pila de modals — obre un des de dins d'un altre",
          body: "Si estàs llegint la Política de Cookies i vols canviar a la Política de Privacitat, l'enllaç dins el modal obre el següent modal a sobre — no com a redirecció. La pila gestiona la navegació enrere correctament, escape tanca el modal superior, fer clic fora descarta amb gràcia. La interacció és el que els usuaris esperen d'una app nativa.",
        },
        {
          title: "Tots els 35 locales — mateix text de font única",
          body: "El text legal en si és en anglès (l'idioma de la nostra entitat legal, autònom registrat a Espanya), però el chrome del modal — títols, botó de tancar, etiquetes d'enllaços — està totalment localitzat als 35 idiomes. Els visitants en espanyol, alemany, polonès o coreà veuen un modal localitzat que obre text legal en anglès, exactament com ho requereix el nostre enfocament de conformitat.",
        },
      ],
      benefitsTitle: "Per què els modals superen les pàgines legals independents",
      benefits: [
        "Sense pèrdua de scroll — els visitants es queden a l'aterratge",
        "Conversió més alta — menys rebots no intencionats",
        "Un component, tres documents — sense duplicació",
        "Pila de modals — obre un des de dins d'un altre netament",
        "Chrome localitzat en 35 idiomes",
        "Conformitat legal completa preservada",
      ],
      conclusionTitle: "Legal sense fricció",
      conclusionBody:
        "Els advocats volen que la política sigui llegible. Els marketers volen que el visitant converteixi. Els modals fan els dos feliços: la política està a un toc, totalment llegible, sense impacte al flux de l'aterratge. La postura de conformitat d'IQ Rest es manté forta sense l'arrossegament de conversió de les pàgines legals independents.",
      ctaText: "Prova el nou flux — obre el bàner de cookies i toca qualsevol enllaç de política.",
      ctaButton: "Visita aterratge",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Català automàtic per a visitants de Catalunya | IQ Rest",
        description:
          "Els visitants de Barcelona, Tarragona, Lleida i Girona veuen automàticament IQ Rest en català en lloc de castellà.",
      },
      title: "Detecció automàtica de català per a visitants de Catalunya",
      subtitle:
        "Els visitants de Barcelona, Tarragona, Lleida i Girona aterren a la versió catalana d'IQ Rest per defecte. La resta d'Espanya encara rep castellà.",
      intro:
        "Catalunya té una identitat lingüística forta — milions de catalans utilitzen el català com a primer idioma, distint del castellà. IQ Rest ara respecta aquesta distinció a nivell geogràfic: els visitants la IP dels quals geolocalitza a una província catalana reben la pàgina d'aterratge /ca automàticament. El castellà segueix sent el predeterminat per a la resta d'Espanya. Els visitants poden canviar d'idioma en qualsevol moment via el modal d'idioma al footer.",
      sections: [
        {
          title: "Geo-detecció a la vora",
          body: "Llegim el país i la regió del visitant del nostre mòdul geo de nginx en cada petició. Si el país és Espanya i la regió coincideix amb Barcelona, Tarragona, Lleida o Girona (o conté 'Catalonia' / 'Catalunya' al nom de la regió), els redirigim a /ca. Altrament, el visitant segueix l'enrutament estàndard de país-a-locale i aterra a la pàgina d'idioma adequada.",
        },
        {
          title: "La cookie de locale anul·la la geo",
          body: "Un cop tries un idioma manualment via el commutador d'idioma, la teva elecció persisteix en una cookie que anul·la la geo per a futures visites. Un visitant catalanoparlant que prefereix llegir IQ Rest en anglès no continuarà sent redirigit a /ca — la seva elecció explícita sempre guanya. La geo és un predeterminat, no una restricció.",
        },
        {
          title: "Traducció completa al català, no traducció automàtica",
          body: "La pàgina d'aterratge /ca no està traduïda automàticament del castellà — cada paraula està professionalment traduïda per redactors catalanoparlants de la indústria de restaurants. Terminologia d'hostaleria, termes de pagament, referències culturals tots coincideixen amb com parla realment un propietari de restaurant català. La pàgina es llegeix com si hagués estat escrita per al mercat, perquè ho va ser.",
        },
      ],
      benefitsTitle: "Per què el català automàtic importa",
      benefits: [
        "Visitants de Barcelona/Tarragona/Lleida/Girona veuen català automàticament",
        "La resta d'Espanya encara rep castellà — sense sobre-enrutament",
        "L'elecció manual d'idioma persisteix via cookie",
        "Traducció professional completa, no traducció automàtica",
        "La geo-detecció passa a la vora — sense parpelleig al client",
        "Mateix aterratge ajustat a la conversió que cada altre locale",
      ],
      conclusionTitle: "Respectant la identitat lingüística",
      conclusionBody:
        "Predeterminar visitants catalans al castellà és una cosa petita tècnicament però una cosa gran políticament i culturalment. L'enrutament geo d'IQ Rest ara tracta el català com a llengua de primera classe per als visitants de Catalunya. El resultat: un aterratge de major conversió per a propietaris de restaurants catalanoparlants, que se senten respectats des del primer segon que veuen el nostre lloc web.",
      ctaText: "Visita IQ Rest des de Catalunya i veu la pàgina en el teu idioma.",
      ctaButton: "Obre aterratge català",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal de prova caducada — el menú QR es manté públic | IQ Rest",
        description:
          "Quan la teva prova acaba, el teu menú no desapareix. Els clients encara poden escanejar i veure; veus un modal d'actualització al tauler.",
      },
      title: "Prova caducada? El teu menú QR es manté actiu per als clients",
      subtitle:
        "La caducitat de la prova ja no mata el teu menú públic. Els clients encara poden escanejar i veure; només el tauler t'avisa per actualitzar. Sense temps d'inactivitat sorpresa enmig del servei.",
      intro:
        "L'antic comportament de caducitat de prova era dur: quan els teus 14 dies acabaven, el teu menú QR públic s'apagava per als clients. Si per casualitat estaves a meitat del servei, era un desastre. Ho vam canviar. Ara, la caducitat de la prova et mostra un modal dins el tauler suggerint actualització, però el teu menú públic continua servint clients normalment. Actualitzes quan estàs a punt, no quan un client està fent senyals amb un telèfon al codi QR de la taula.",
      sections: [
        {
          title: "El menú públic es manté actiu",
          body: "La prova de 14 dies acaba silenciosament des de la perspectiva del client. El menú QR, comandes en línia, reserves — tot continua funcionant. El propietari veu el modal d'actualització al següent inici de sessió al tauler. Aquest desacoblament significa que la caducitat de la prova mai pot trencar un servei o avergonyir-te davant els clients.",
        },
        {
          title: "Modal al tauler, no una redirecció dura",
          body: "Anteriorment, la caducitat de prova redirigia el tauler a una pàgina de facturació. Això trencava enllaços profunds i confonia usuaris que eren rebotats enmig de tasques. Ara mostrem un modal net: 'La teva prova ha acabat. Tria un pla per continuar usant les funcions avançades.' El modal es pot descartar; pots continuar navegant pel tauler, però noves accions que requereixen un pla pagat mostren suggeriments d'upsell en línia.",
        },
        {
          title: "Previsualització sempre disponible",
          body: "Fins i tot amb la prova caducada, encara pots previsualitzar el teu menú QR des del tauler. No et bloquegem per veure el que veuen els clients. Edita el menú, previsualitza el resultat — només les accions relacionades amb la publicació suggereixen actualització. Això manté el tauler productiu fins i tot enmig de la decisió, perquè no perdis l'accés mentre compares plans.",
        },
      ],
      benefitsTitle: "Per què una caducitat suau supera un tall dur",
      benefits: [
        "El menú QR públic es manté actiu per als clients",
        "Sense temps d'inactivitat sorpresa enmig del servei",
        "Modal al tauler en lloc de redirecció forçada a facturació",
        "Previsualització sempre disponible independentment de l'estat del pla",
        "Suggeriments d'upsell en línia substitueixen blocs abruptes",
        "El propietari actualitza segons el seu propi calendari",
      ],
      conclusionTitle: "Respecta les hores d'operació del restaurant",
      conclusionBody:
        "Els restaurants funcionen amb marges ajustats i calendaris més ajustats. Un menú QR caient perquè una prova gratuïta ha caducat és pitjor que el límit de prova en si — danya la confiança. La caducitat suau manté els llums encesos per als clients mentre encara empeny el propietari cap a un pla pagat. Les conversions es mantenen altes; el temps d'inactivitat baixa a zero.",
      ctaText: "Comença la teva prova de 14 dies sabent que el teu menú es manté actiu passi el que passi.",
      ctaButton: "Comença la prova gratuïta",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Terminologia d'editor de menú més clara | IQ Rest",
        description:
          "Vam renomenar 'Item' a 'Dish' a tot el tauler. Els propietaris de restaurants no haurien de traduir terminologia SaaS genèrica al cap.",
      },
      title: "Item → Dish: Terminologia més clara a l'editor",
      subtitle:
        "Vam reemplaçar l'etiqueta genèrica 'Item' amb 'Dish' a cada superfície del tauler. Petit canvi, gran augment de claredat per a propietaris de restaurants que no parlen SaaS.",
      intro:
        "La gent del software diu 'item'. La gent dels restaurants diu 'dish'. La discordança era petita però constant — cada cop que mostràvem 'Add Item', el propietari havia de traduir-ho al cap a 'Add Dish'. Vam renomenar tot: botons, etiquetes, missatges d'èxit, estats d'error, títols de pàgina. El tauler ara parla el mateix idioma que la gent que l'utilitza.",
      sections: [
        {
          title: "On s'aplica el renombrament",
          body: "Cada superfície orientada a l'usuari: 'Add Item' va esdevenir 'Add Dish'. La pestanya 'Items' al menú va esdevenir 'Dishes'. 'Item Settings' van esdevenir 'Dish Settings'. Tostades d'èxit ('Item created') van esdevenir ('Dish created'). Errors de validació de formulari, breadcrumbs, capçaleres del tauler — tots actualitzats. La columna interna de la base de dades encara s'anomena 'item' per compatibilitat enrere, però cap usuari ho veu mai.",
        },
        {
          title: "Traduït en tots els 35 idiomes",
          body: "Cada idioma té la seva paraula correcta per a 'dish' que és distinta de 'item'. Espanyol 'plato', francès 'plat', alemany 'Gericht', italià 'piatto', català 'plat', japonès '料理'. Vam actualitzar la clau de traducció en cada locale i vam verificar que el resultat es llegeix de forma natural en cada idioma. Sense traducció automàtica; parlants nadius van revisar cadascun.",
        },
        {
          title: "Categoria per defecte també creada automàticament",
          body: "Mentre estàvem a l'editor, també vam crear automàticament una categoria per defecte anomenada 'Menu' a la primera visita al tauler. Comportament antic: els propietaris aterraven en un menú buit, havien de fer clic a 'Add Category' abans de poder afegir un plat, sovint es rendien. Comportament nou: una categoria Menu existeix, toques 'Add Dish', estàs editant immediatament. Una barrera eliminada.",
        },
      ],
      benefitsTitle: "Per què la terminologia importa",
      benefits: [
        "'Dish' coincideix amb com parlen realment els propietaris de restaurants",
        "Actualitzat a cada superfície del tauler — botons, etiquetes, tostades",
        "Traduït als 35 idiomes per revisors nadius",
        "Categoria per defecte creada automàticament — sense menú buit per començar",
        "Més ràpid des del registre fins al primer plat afegit",
        "Menys traducció mental = menor rebot a l'onboarding",
      ],
      conclusionTitle: "Parla l'idioma de l'usuari",
      conclusionBody:
        "La terminologia SaaS genèrica ('item', 'entity', 'object') està bé per a enginyers. Els propietaris de restaurants necessiten paraules que coincideixin amb el que diuen al treball. IQ Rest ara parla el mateix idioma que la gent que l'usa — a cada botó, etiqueta i notificació — i les dades de conversió ja reflecteixen el canvi.",
      ctaText: "Registra't i afegeix el teu primer plat en menys d'un minut.",
      ctaButton: "Construeix el meu menú",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Categoria per defecte automàtica per a onboarding de menú | IQ Rest",
        description:
          "Els usuaris primerencs ja no s'enfronten a un menú buit. IQ Rest crea automàticament una categoria per defecte perquè puguis afegir el teu primer plat immediatament.",
      },
      title: "Categoria per defecte automàtica — Salta el menú buit",
      subtitle:
        "Els usuaris primerencs aterren en un menú amb una categoria per defecte ja creada. Toca 'Add Dish' i comença a editar. Sense més barrera de 'crea categoria primer'.",
      intro:
        "L'antic onboarding requeria que els usuaris creessin una categoria abans de poder afegir un plat. Els menús buits són intimidants — molts usuaris nous es rendien en aquest punt. IQ Rest ara crea automàticament una categoria 'Menu' per defecte la primera vegada que obres el tauler, perquè la primera acció que fas sigui afegir un plat, no configurar una jerarquia. Més ràpid, més fluid, més menús realment construïts.",
      sections: [
        {
          title: "Categoria per defecte creada a l'inici de sessió",
          body: "La primera vegada que inicies sessió en un tauler nou, IQ Rest comprova si tens cap categoria. Si no, crea una anomenada 'Menu' (traduïda al teu locale). La categoria està immediatament a punt per rebre plats. Pots renomenar-la o afegir més categories en qualsevol moment — però no has de fer-ho abans d'afegir el teu primer plat.",
        },
        {
          title: "Renomenat per coincidir amb la teva cuina quan utilitzes l'assistent",
          body: "Si has usat l'assistent de registre de 3 passos, el sembrador genera categories adequades a la cuina en lloc — 'Pizza', 'Pasta', 'Antipasti' per a italià; 'Sushi', 'Ramen', 'Sake' per a japonès. La categoria 'Menu' per defecte automàtica només s'activa per a usuaris que han omès l'assistent o s'han registrat via Google directament.",
        },
        {
          title: "Compatible enrere amb menús existents",
          body: "Si ja tens categories — d'ús passat, de dades importades, del sembrador — la per defecte no es crea. Només intervenim quan el menú està genuïnament buit. Els usuaris existents no veuen cap canvi a la seva estructura de menú.",
        },
      ],
      benefitsTitle: "Per què el per defecte automàtic accelera l'onboarding",
      benefits: [
        "Sense barrera 'crea categoria primer' per a usuaris nous",
        "Toca 'Add Dish' com a primera acció, no segona",
        "Categoria nomenada al teu locale, no anglès per defecte",
        "El flux d'assistent encara sembra categories adequades a la cuina",
        "Menús existents intactes",
        "Més ràpid des d'inici de sessió fins al primer plat afegit",
      ],
      conclusionTitle: "Elimina l'estat buit",
      conclusionBody:
        "Els estats buits són on els usuaris nous reboten. Cada barrera entre l'usuari i la seva primera acció productiva et costa conversions. Crear automàticament una categoria per defecte elimina una d'aquestes barreres. És un canvi petit amb impacte mesurable en quina rapidesa els nous restaurants arriben a un menú publicable.",
      ctaText: "Registra't i comença a afegir plats immediatament.",
      ctaButton: "Construeix el meu menú",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Salta el pas del nom del restaurant a l'onboarding | IQ Rest",
        description:
          "Vam treure el pas 'nom del restaurant' de l'onboarding. Estableix-lo més tard a configuració — o directament des del hero del menú que editaràs igualment.",
      },
      title: "Salta el pas del nom del restaurant a l'onboarding",
      subtitle:
        "No necessites escriure el nom del teu restaurant per començar a construir un menú. Vam treure aquest pas d'onboarding — estableix el nom més tard des del tauler, o via el hero del menú en directe.",
      intro:
        "Els fluxos d'onboarding que demanen informació per endavant se senten com omplir formularis. L'antic onboarding d'IQ Rest demanava un nom de restaurant al primer pas. Els usuaris nous sovint no havien decidit l'ortografia exacta, la variant de marca o la puntuació — així que es quedaven encallats abans de veure el tauler. Vam eliminar el pas. Registra't, aterra al tauler, estableix el nom quan estiguis a punt. El menú encara funciona bé sense ell.",
      sections: [
        {
          title: "Què passa quan saltes",
          body: "Si saltes el pas del nom, el restaurant rep un marcador de posició ('Your Restaurant') que està amagat per defecte al menú públic. Els clients escanejant el teu QR veuen el menú sense un nom al hero — que sincerament està bé per a molts llocs de servei ràpid. Tan aviat com estableixes el nom a configuració, apareix al hero, el títol de la pàgina, el slug SEO i comparticions socials.",
        },
        {
          title: "Estableix-lo des de qualsevol lloc",
          body: "El camp del nom és editable des de configuració, des del hero del menú (toca per editar en línia), i des de la pantalla de previsualització pública. Tres superfícies diferents, un camp subjacent. Vam fer fàcil ajornar la decisió i trivialment fàcil comprometre's quan estàs a punt.",
        },
        {
          title: "Sense penalització SEO per defecte",
          body: "Utilitzem el slug ('your-restaurant') com a fallback per al títol de la pàgina i etiquetes meta SEO fins que estableixis un nom real. Els motors de cerca no et penalitzen — només veuen un títol genèric. En el moment que estableixes un nom real, cada etiqueta meta s'actualitza i Google torna a explorar en qüestió d'hores.",
        },
      ],
      benefitsTitle: "Per què saltar accelera l'onboarding",
      benefits: [
        "Sense pressió de decisió en el moment equivocat",
        "Aterra al tauler més ràpidament",
        "Estableix el nom quan colpeja la inspiració — o quan l'entitat legal està registrada",
        "Edició en línia des del hero del menú",
        "El menú públic funciona bé sense nom establert",
        "Sense penalització SEO per usar el marcador",
      ],
      conclusionTitle: "Menys decisions, més fet",
      conclusionBody:
        "Cada camp de formulari a l'onboarding és una oportunitat perquè l'usuari reboti. Eliminant el camp del nom del restaurant, vam eliminar una d'aquestes oportunitats. Els usuaris nous ara aterren al tauler amb un menú funcional i la llibertat de nomenar (o no nomenar) el seu restaurant segons el seu propi calendari. L'augment de conversió va ser immediat.",
      ctaText: "Registra't en segons — sense necessitat de nom de restaurant.",
      ctaButton: "Comença la prova gratuïta",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Prova menú QR de restaurant abans de registrar-te — anònim | IQ Rest",
        description:
          "Construeix un menú d'exemple abans de crear un compte. Guarda el teu progrés a correu quan vulguis conservar-lo. Sense compromís, sense fricció.",
      },
      title: "Prova un menú QR abans de registrar-te",
      subtitle:
        "Construeix un menú d'exemple, veu com es veu el teu codi QR, previsualitza l'experiència en directe — tot abans de crear un compte. Guarda el teu progrés via enllaç de correu quan estiguis a punt.",
      intro:
        "La majoria de serveis de menús QR exigeixen que creïs un compte abans de poder fer res. Aquest és l'ordre equivocat. Els nous propietaris de restaurants volen sentir el producte primer — veure com es veu un plat, com se sent el flux d'escanejar QR — i només llavors comprometre's a registrar-se. IQ Rest ara et permet construir un menú d'exemple complet anònimament. Quan vulguis conservar-lo, el guardem al teu correu. Sense fricció, sense compromís.",
      sections: [
        {
          title: "La sessió anònima emmagatzema la teva feina",
          body: "Un ID de sessió anònim es crea a la teva primera visita i s'emmagatzema en una cookie. Cada categoria que afegeixes, cada plat que crees, cada foto que puges està associada amb aquesta sessió. Pots deixar la pàgina, tornar i el teu menú encara hi és. Persistim la sessió durant 7 dies — temps suficient per avaluar el producte sense pressió.",
        },
        {
          title: "Guarda progrés via enllaç de correu",
          body: "Quan decideixes que vols conservar el menú, fes clic a 'Save Progress'. Escriu el teu correu. T'enviem un enllaç màgic que, quan es fa clic, converteix la sessió anònima en un compte real associat amb el teu correu. Tota la teva feina es transfereix automàticament — sense reentrada, sense progrés perdut, sense 'oh no, s'ha esborrat'. La conversió a client pagat passa segons els teus termes.",
        },
        {
          title: "Redueix l'ansietat de registre a zero",
          body: "Permetent als usuaris provar abans de registrar-se, invertim el patró típic SaaS. Els visitants no necessiten decidir si IQ Rest val el seu correu — poden veure-ho per si mateixos. Els restaurants que proven anònimament i després es registren converteixen més que els restaurants forçats a registrar-se primer, perquè ja han invertit en el menú i no volen perdre'l.",
        },
      ],
      benefitsTitle: "Per què l'onboarding anònim guanya",
      benefits: [
        "Construeix un menú real sense crear un compte",
        "La sessió anònima persisteix 7 dies",
        "Guarda progrés a correu quan decideixes comprometre't",
        "Sense reentrada — la feina es transfereix al teu compte real",
        "Avaluació de producte sense fricció",
        "Conversió de registre global més alta",
      ],
      conclusionTitle: "Deixa que el producte es vengui sol",
      conclusionBody:
        "La millor manera de convèncer un propietari de restaurant que IQ Rest és adequat per a ells és deixar-los usar-lo. L'onboarding anònim converteix un visitant curiós en un usuari compromès sense demanar res a canvi. Per quan demanes un correu, l'usuari ja ha invertit temps al seu menú — guardar-lo no els costa res, i conserven el que han construït.",
      ctaText: "Prova IQ Rest ara — sense compte necessari.",
      ctaButton: "Prova-ho gratis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Guarda progrés del menú del restaurant via enllaç de correu | IQ Rest",
        description:
          "Has construït un menú d'exemple anònimament? Guarda'l al teu correu i t'enviarem un enllaç màgic per reclamar el compte.",
      },
      title: "Guarda el progrés del teu menú via enllaç de correu",
      subtitle:
        "Has construït un menú anònimament i vols conservar-lo? Escriu el teu correu. Enviem un enllaç màgic que converteix la teva feina anònima en un compte real en un toc.",
      intro:
        "Quan has passat cinc minuts construint un menú d'exemple sense un compte, no vols perdre'l. La funció 'Save Progress' d'IQ Rest converteix la teva sessió anònima en un compte real via un enllaç màgic. Escriu el teu correu, fes clic a l'enllaç a la teva safata d'entrada, el teu menú està permanentment associat amb el teu compte. Sense contrasenya, sense formulari de registre, sense reentrada de cap dada.",
      sections: [
        {
          title: "Flux d'enllaç màgic — sense contrasenya",
          body: "Enviem un enllaç únic al teu correu. Fes clic en 10 minuts i estàs registrat en un compte nou que conté el menú que has construït anònimament. Sense contrasenya per triar, sense preguntes de seguretat, sense pas de verificació de correu — el clic de l'enllaç ÉS la verificació. Després emetem una cookie de sessió i estàs dins del tauler amb tota la teva feina preservada.",
        },
        {
          title: "Gestió de conflictes per a comptes existents",
          body: "Si el correu que has escrit ja té un compte, no el sobreescrivim. Enviem l'enllaç, fas clic, i preguntem si fusionar el menú anònim al teu compte existent o descartar-lo. La majoria d'usuaris trien fusionar — els teus plats existents es queden, els nous de l'edició anònima s'afegeixen. Clar, segur, predictible.",
        },
        {
          title: "Limitat per taxa i resistent al spam",
          body: "Limitem la taxa de peticions de save-progress per IP i per correu per prevenir abús. L'enllaç caduca en 10 minuts i és d'un sol ús. Si algú més intenta reclamar la teva sessió anònima, necessita accés a la teva safata d'entrada — mateix model de seguretat que cada flux d'auth d'enllaç màgic modern.",
        },
      ],
      benefitsTitle: "Per què guardar amb enllaç màgic guanya",
      benefits: [
        "Sense contrasenya per triar, recordar o restablir",
        "La feina anònima es transfereix intacta al teu compte real",
        "Comptes existents: tria fusionar o descartar",
        "Limitat per taxa i acotat per temps — segur per disseny",
        "Un toc per comprometre — sense formulari de registre",
        "El correu en si actua com a pas de verificació",
      ],
      conclusionTitle: "Conversió sense fricció",
      conclusionBody:
        "El moment en què un usuari vol convertir d'anònim a identificat és el moment en què és més probable que reboti en un formulari de registre llarg. Els enllaços màgics col·lapsen aquest formulari en un sol camp de correu més un clic a la safata d'entrada. L'usuari passa 30 segons i acaba amb un compte real, persistit que conté tot el que ha construït. És el flux de conversió amb menys fricció a la indústria de menús QR.",
      ctaText: "Construeix un menú anònimament, després guarda'l via correu quan estiguis a punt.",
      ctaButton: "Prova-ho gratis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout Stripe d'un clic per a usuaris recurrents | IQ Rest",
        description:
          "Ja registrat? Fes clic a un pla a preus i ves directament al checkout de Stripe. Sense reentrada d'informació de compte, sense pantalles extra.",
      },
      title: "Checkout Stripe d'un clic per a usuaris recurrents",
      subtitle:
        "Usuari registrat fa clic a un pla? Directe al checkout de Stripe, sense pantalla de confirmació extra. Dos clics des de pàgina de preus fins a subscripció activa.",
      intro:
        "Els usuaris recurrents que ja tenen un compte d'IQ Rest no haurien d'haver de re-confirmar res en actualitzar. Vam eliminar cada pantalla intermèdia entre 'fes clic al pla a preus' i 'aterra al checkout de Stripe'. Dos clics en total: tria el pla, introdueix detalls de targeta. La subscripció és activa abans que acabis el teu cafè.",
      sections: [
        {
          title: "Detecta l'estat registrat a preus",
          body: "La nostra pàgina de preus comprova una cookie de sessió autenticada en càrrega. Si estàs registrat, els botons del pla salten el desviament 'registra't primer' i van directament a /api/stripe/checkout, que crea una Stripe Checkout Session i retorna la URL per redirecció. Si no estàs registrat, els botons et porten pel flux de registre estàndard primer — sense canvi de comportament per a usuaris nous.",
        },
        {
          title: "Locale UI enviat a Stripe",
          body: "El locale del teu tauler s'envia a Stripe Checkout via el paràmetre locale, perquè la pàgina de checkout es renderitzi al teu idioma. Els usuaris espanyols veuen Stripe en espanyol; els alemanys veuen Stripe en alemany. El flux de checkout se sent sense costures perquè mai trenca la continuïtat lingüística des del teu tauler.",
        },
        {
          title: "URL de retorn t'aterra de tornada al tauler",
          body: "Després del pagament exitós, Stripe redirigeix a una URL de retorn que establim a l'arrel del tauler al teu locale (e.g. /es/dashboard). El webhook actualitza el teu estat de subscripció al servidor abans que arribis, així el tauler on aterres ja reflecteix el nou pla — sense estat 'pendent', sense flash de contingut no actualitzat.",
        },
      ],
      benefitsTitle: "Per què el checkout d'un clic converteix",
      benefits: [
        "Dos clics des de preus fins a subscripció activa",
        "Sense intersticial 'confirma el teu compte' per a usuaris registrats",
        "Checkout de Stripe es mostra en l'idioma del teu tauler",
        "URL de retorn t'aterra al tauler actualitzat",
        "Webhook actualitza pla abans que arribis — sense parpelleig",
        "Els usuaris nous encara reben el flux estàndard registre → actualització",
      ],
      conclusionTitle: "Fes el camí fàcil trivialment fàcil",
      conclusionBody:
        "L'usuari que ja està convençut no necessita més convenciment — necessita menys clics. El checkout d'un clic elimina cada pantalla entre intent i pagament per a usuaris recurrents. El resultat: conversió de prova-a-pagat més alta, menys actualitzacions abandonades, reconeixement de ingressos més ràpid per a expansió de subscripció.",
      ctaText: "Ja ets usuari? Tria el teu pla i actualitza en dos clics.",
      ctaButton: "Veu preus",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Redisseny d'UI del tauler: Targetes, Navegació i Formularis | IQ Rest",
        description:
          "Tauler d'IQ Rest redissenyat amb components de targeta consistents, navegació de barra lateral persistent amb destacat de pàgina activa i accions de formulari millorades.",
      },
      title: "Redisseny d'UI del tauler: Targetes consistents, navegació i accions de formulari",
      subtitle:
        "Un tauler polit amb estil de targeta unificat, navegació de barra lateral persistent, estats actius amb color d'accent i accions inferiors de guardar/eliminar a cada pàgina de formulari.",
      intro:
        "IQ Rest ha experimentat un redisseny complet d'UI del tauler. Cada pàgina ara utilitza estil de targeta consistent amb radis de vora unificats, una navegació de barra lateral persistent amb estats actius amb color d'accent i pàgines de formulari millorades amb accions inferiors de guardar i eliminar. El resultat és una experiència més neta i polida per gestionar el menú QR digital del teu restaurant.",
      sections: [
        {
          title: "Disseny de targeta consistent a totes les pàgines",
          body: "Cada pàgina del tauler ara utilitza un component DashboardCard unificat amb vores arrodonides consistents, colors de fons subtils i capçaleres de secció opcionals. Analítica, facturació, configuració, contactes, configuració de reserves i totes les pàgines de formulari comparteixen el mateix llenguatge visual. Etiquetes de pista amb tooltips popover reemplacen el text de descripció en línia, mantenint la interfície neta mentre encara proporcionen context útil quan es necessita.",
        },
        {
          title: "Navegació de barra lateral persistent amb estats actius",
          body: "A pantalles d'escriptori, una navegació de barra lateral persistent ara és visible a cada pàgina. La pàgina activa està destacada amb un fons de color d'accent, fent immediatament clar on estàs. Subpàgines com categories, ítems i comandes destaquen correctament l'element pare Menú. La barra lateral inclou accés ràpid a Menú, Imprimir QR, Reserves, Analítica, Configuració, Contactes, Facturació i Suport — tot sense deixar la vista actual.",
        },
        {
          title: "Pàgines de formulari millorades amb accions inferiors",
          body: "Totes les pàgines de formulari — categories, ítems, taules, disseny, configuració, contactes i configuració de reserves — ara presenten un botó duplicat de guardar a la part inferior amb color d'accent. Els botons d'eliminar apareixen al costat esquerre amb un estil esmorteït. Això significa que ja no necessites desplaçar-te de tornada amunt per guardar els teus canvis. El botó de tancar sessió s'ha mogut de la barra lateral a la part inferior de la pàgina de disseny, mantenint la navegació enfocada en accions essencials.",
        },
      ],
      benefitsTitle: "Beneficis del redisseny d'UI",
      benefits: [
        "Estil de targeta unificat amb vores i fons consistents a totes les pàgines",
        "Navegació de barra lateral persistent a escriptori amb estats actius amb color d'accent",
        "Botons inferiors de guardar a tots els formularis — sense necessitat de desplaçar-te amunt per guardar",
        "Accions d'eliminar i guardar clarament separades — eliminar esquerra, guardar dreta",
        "Capçaleres de secció a targetes de formulari per a millor organització visual",
        "Pàgina d'analítica més neta amb embolcalls DashboardCard i disposició d'estadístiques de dispositiu millorada",
      ],
      conclusionTitle: "Una experiència de tauler més polida",
      conclusionBody:
        "Aquest redisseny d'UI porta consistència visual i usabilitat millorada a cada racó del tauler d'IQ Rest. Tant si estàs editant ítems del menú, comprovant analítica o gestionant reserves, la interfície se sent cohesionada i intuïtiva. Combinada amb la navegació de barra lateral persistent, gestionar el menú QR digital del teu restaurant és més ràpid i agradable que mai.",
      ctaText: "Experimenta el tauler redissenyat",
      ctaButton: "Obre el tauler",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Escàner de menú IA — Crea un menú QR digital en una foto"),
    "redesigned-dashboard-qr-menu-management": stub("Tauler redissenyat per a gestió de menú QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Correus de reserves i analítica per al teu menú QR digital"),
    "multi-currency-geo-pricing-qr-menu": stub("Geo-preus multi-moneda per al teu menú QR"),
    "support-qr-menu-restaurant-cafe": stub("Suport dins l'app per al teu menú QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Analítica detallada per al teu lloc web de menú QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Generador instantani de menú QR i lloc web de restaurant"),
    "subscription-plans-qr-menu-restaurant-website": stub("Plans de subscripció per al teu menú QR"),
    "public-restaurant-qr-menu-website": stub("Lloc web públic de menú QR de restaurant"),
    "add-items-restaurant-qr-menu-website": stub("Afegeix ítems al teu menú QR en segons"),
    "qr-menu-restaurant-categories": stub("Categories per al menú QR del restaurant"),
    "easy-qr-menu-cafe-control-panel": stub("Tauler de control fàcil de menú QR de cafè"),
    "faq-page-organization": stub("Organització de pàgina FAQ"),
    "free-restaurant-website-improvements": stub("Millores gratuïtes del lloc web del restaurant"),
    "user-authentication-interface": stub("Interfície d'autenticació d'usuari"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Beneficis",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Prova IQ Rest",
    ctaButton: "Comença la prova gratuïta",
  };
}
