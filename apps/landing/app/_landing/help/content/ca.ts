import type { HelpDoc } from "../types";

// CA help guide.
export const ca: HelpDoc = {
  metaTitle: "Com utilitzar IQ Rest — guia pas a pas",
  metaDescription:
    "Guia completa d'IQ Rest: registre, menú, comandes, reserves, pantalla de cuina i configuració — per a restaurants.",
  h1: "Ajuda",
  intro: "Una guia detallada d'IQ Rest — des del registre fins als ajustos més fins.",
  banner: {
    title: "És més senzill del que sembla",
    sub: "Una guia pas a pas: des del registre fins als ajustos més fins — qualsevol ho pot fer.",
    cta: "Com s'utilitza",
  },
  tipLabel: "Consell",
  noteLabel: "Important",
  sections: [
    {
      id: "start",
      title: "1. Primers passos",
      blocks: [
        { type: "h3", text: "Què és aquest sistema" },
        {
          type: "p",
          text: "IQ Rest és un servei per a restaurants: crees un menú en línia amb codi QR, reps comandes i reserves de taula directament des dels mòbils dels clients, mentre que a la cuina i als cambrers funcionen tauletes-terminal. Tot es gestiona des d'un únic panell d'administració (tauler).",
        },
        { type: "h3", text: "Registre i inici de sessió" },
        { type: "p", text: "Pots entrar de tres maneres — tria'n qualsevol a la pantalla d'inici de sessió:" },
        {
          type: "list",
          items: [
            "Amb Google — fes clic a «Continua amb Google» i tria el compte.",
            "Amb Apple — fes clic a «Continua amb Apple».",
            "Per correu — fes clic a «Continua amb correu», introdueix l'adreça i t'enviarem un codi de 6 dígits. Introdueix-lo a la pantalla següent. No cal contrasenya.",
          ],
        },
        {
          type: "note",
          text: "Per correu només reps un codi d'accés d'un sol ús — sense correu brossa ni butlletins.",
        },
        { type: "h3", text: "Creació del restaurant (incorporació)" },
        {
          type: "p",
          text: "En el primer inici de sessió, el sistema et guia per una configuració ràpida. Després es crea automàticament un restaurant amb una plantilla de menú d'exemple que més tard substitueixes per la teva.",
        },
        {
          type: "steps",
          items: [
            "Indica el nom del restaurant.",
            "Tria el tipus de cuina (determina la plantilla de menú inicial).",
            "Fet: arribes al tauler amb un menú d'exemple ja emplenat.",
          ],
        },
        {
          type: "note",
          text: "La moneda es detecta automàticament segons la teva regió — no cal triar-la al principi. La pots canviar més tard a Configuració → Regió.",
        },
        { type: "h3", text: "Visió general del tauler" },
        {
          type: "p",
          text: "Navegació entre seccions: a l'ordinador una barra superior, al telèfon una barra inferior. Seccions: Menú, Comandes, Reserves, Cuina, Analítica i Configuració.",
        },
        {
          type: "list",
          items: [
            "Al costat del nom del restaurant a la barra superior hi ha un petit indicador de connexió: un punt verd significa que les comandes se sincronitzen en temps real.",
            "A la pàgina «Menú» a dalt hi ha el botó «Vista prèvia» — obre el teu menú tal com el veu el client.",
            "Al costat el botó «Comparteix» — mostra el codi QR i l'enllaç al menú (copiar l'enllaç, descarregar el QR o obrir el menú).",
          ],
        },
        {
          type: "tip",
          text: "Prem «Vista prèvia» després de cada canvi del menú — veus a l'instant com queda per al client.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menú",
      blocks: [
        {
          type: "p",
          text: "La secció «Menú» és el cor del sistema. Aquí construeixes l'estructura: categories → plats → opcions. Obre-la des de la navegació.",
        },
        { type: "h3", text: "Categories i subcategories" },
        {
          type: "steps",
          items: [
            "Fes clic a «Afegeix categoria» i introdueix un nom (per exemple «Entrants»).",
            "Per editar una categoria — passa-hi el cursor i fes clic a «Edita categoria».",
            "L'ordre de les categories es canvia amb els botons «Amunt» / «Avall» — exactament en aquest ordre les veu el client.",
            "Pots crear un «Grup» (amb «Afegeix grup») — una categoria-secció que conté altres categories.",
          ],
        },
        { type: "h3", text: "Afegir plats" },
        {
          type: "steps",
          items: [
            "Desplega una categoria (fletxa a l'esquerra) i fes clic a «Afegeix plat».",
            "Omple el nom, el preu i la descripció.",
            "Afegeix una foto: «Afegeix foto» — puja la teva o fes clic a «Genera» i descriu el plat amb paraules perquè la IA creï la imatge.",
            "Desa. El plat apareix a la categoria.",
          ],
        },
        {
          type: "tip",
          text: "La foto es pot generar amb IA: indica l'angle, la il·luminació o el fons (per exemple «Pizza Margherita sobre una taula de fusta, vista des de dalt»).",
        },
        { type: "h3", text: "Opcions i variants (modificadors)" },
        {
          type: "p",
          text: "Les opcions són tries dins d'un plat: mida, punt de cocció, ingredients extra. Cada opció té variants, i a una variant s'hi pot afegir un recàrrec (per exemple «+1.50 cadascuna»).",
        },
        {
          type: "list",
          items: [
            "Exemple: una opció «Mida» amb les variants «Petita / Gran (+2.00)».",
            "Exemple: una opció «Extra» amb diverses variants de les quals el client en tria una o més.",
          ],
        },
        { type: "h3", text: "Al·lèrgens i dietes" },
        {
          type: "p",
          text: "A un plat pots marcar al·lèrgens (gluten, fruits secs, etc.) i etiquetes dietètiques (vegetarià, vegà). El client els veu com a icones al menú públic.",
        },
        { type: "h3", text: "Visibilitat dels plats" },
        {
          type: "p",
          text: "El botó «Amaga plat» / «Mostra plat» retira temporalment un element del menú públic sense eliminar-lo — útil quan un plat s'ha acabat.",
        },
        { type: "h3", text: "Pujar un menú en paper (escaneig)" },
        {
          type: "p",
          text: "Si ja tens un menú com a foto o PDF — no l'introdueixis a mà. Fes servir l'escaneig:",
        },
        {
          type: "steps",
          items: [
            "Fes clic al bàner «Puja menú» (o «Puja el teu menú en paper»).",
            "Afegeix fins a 5 fitxers (foto/escaneig, fins a 20 MB cadascun) i fes clic a «Escaneja».",
            "Espera fins a un minut — la IA reconeix categories i plats.",
            "Revisa el reconegut, marca els elements desitjats i fes clic a «Continua».",
            "Tria: substituir el menú actual o afegir els nous elements a l'existent.",
          ],
        },
        {
          type: "note",
          text: "Els exemples de la plantilla inicial s'eliminen en desar el menú escanejat — és normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Taules i codis QR",
      blocks: [
        {
          type: "p",
          text: "Les taules serveixen per vincular comandes i reserves a llocs concrets i imprimir codis QR personals. Secció: Configuració → Taules.",
        },
        { type: "h3", text: "Crear taules" },
        {
          type: "steps",
          items: [
            "Obre Configuració → Taules i fes clic a «Afegeix taula».",
            "Indica el número de taula, les places i (opcionalment) un nom — per exemple «Finestra», «Bar», «Terrassa».",
            "Afegeix una foto de la taula — els clients la veuen i entenen exactament on és la seva taula.",
            "Estableix un color de taula — amb aquest color la taula es destaca a la cuina i a la secció «Comandes», perquè el personal la trobi ràpid.",
            "Si vols, afegeix una breu descripció.",
            "Desa.",
          ],
        },
        {
          type: "note",
          text: "La foto de la taula és per als clients (referència «on és la meva taula»). El color és per al personal (una marca visual ràpida de la taula a la cuina i a les comandes).",
        },
        { type: "h3", text: "Codi QR de la taula" },
        {
          type: "p",
          text: "Cada taula té el seu propi codi QR. El client l'escaneja amb el mòbil i arriba directament al menú d'aquesta taula — la comanda es vincula automàticament a la taula correcta.",
        },
        {
          type: "steps",
          items: [
            "Fes clic a «Mostra codi QR» a la taula desitjada.",
            "Fes clic a «Descarrega QR» per desar la imatge.",
            "Imprimeix-lo i col·loca'l a la taula (en un suport, al menú, en un adhesiu).",
          ],
        },
        {
          type: "tip",
          text: "L'«Enllaç de la taula» és el mateix enllaç que el QR però com a text. El pots enviar al client per missatge.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Comandes",
      blocks: [
        { type: "h3", text: "Com fa la comanda el client" },
        {
          type: "p",
          text: "El client escaneja el QR de la taula → s'obre el menú → tria plats, opcions i quantitat → fa la comanda. La comanda apareix a l'instant al teu tauler i al terminal de cuina/cambrer.",
        },
        {
          type: "note",
          text: "Perquè els clients puguin fer comandes, a Configuració → Comandes ha d'estar activat «Accepta comandes». Si està desactivat, el client veu el menú però no hi ha botó de comanda.",
        },
        { type: "h3", text: "Gestionar comandes al tauler" },
        {
          type: "p",
          text: "La secció «Comandes» mostra el plànol de la sala. Les taules ocupades estan destacades i mostren el nombre de comandes actives. Toca una taula per obrir-ne les comandes.",
        },
        {
          type: "steps",
          items: [
            "Toca una taula → «Inicia comanda» (o obre'n una existent).",
            "«Afegeix element» → tria categoria → plat → opcions → si cal indica quantitat i notes (per exemple «sense ceba»).",
            "Fes clic a «Afegeix» — l'element entra a la comanda.",
          ],
        },
        { type: "h3", text: "Estats dels elements" },
        {
          type: "p",
          text: "Cada element té un estat: Pendent → Cuinant → Llest → Servit. Toca un element per canviar-ne l'estat. Els estats se sincronitzen amb la cuina en temps real.",
        },
        { type: "h3", text: "Descomptes, divisió, canvi de taula" },
        {
          type: "list",
          items: [
            "Descompte: «Afegeix descompte» — percentatge o import fix, a tota la comanda o a un element, amb motiu.",
            "Divideix comanda: «Divideix comanda» — tria els elements que aniran a un compte nou separat.",
            "Canvia taula: «Canvia taula» — mou la comanda a una altra taula.",
            "Duplica element: afegeix-ne ràpidament un altre d'igual.",
          ],
        },
        { type: "h3", text: "Tancar una comanda" },
        {
          type: "steps",
          items: [
            "Quan tots els elements estiguin servits, fes clic a «Tanca comanda».",
            "Tria un mètode de pagament (si n'hi ha de configurats).",
            "La comanda es tanca i surt de les actives.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cuina (KDS)",
      blocks: [
        {
          type: "p",
          text: "La pantalla de cuina (KDS) és una pantalla en tauleta per als cuiners. Les comandes noves hi arriben en temps real i el cuiner marca els plats com a llestos.",
        },
        { type: "h3", text: "Què mostra la pantalla" },
        {
          type: "list",
          items: [
            "Targetes de comanda amb elements, opcions i el temps «al pas».",
            "Indicació per colors de l'estat: què es cuina, què està llest.",
            "Un senyal sonor en arribar una comanda nova.",
          ],
        },
        { type: "h3", text: "Com s'utilitza" },
        {
          type: "steps",
          items: [
            "Toca un element per passar-lo a l'estat següent (Cuinant → Llest).",
            "Activa el so amb el botó «Activa el so» — llavors les comandes noves arriben amb senyal sonor.",
            "Amb el zoom ajusta la mida de les targetes a la tauleta.",
            "Amb els filtres pots mostrar només les categories que necessites (per exemple només la línia calenta).",
          ],
        },
        {
          type: "note",
          text: "Si la tauleta perd internet, apareix l'avís «Sense connexió». Connecta el Wi-Fi i les comandes tornaran a arribar.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reserves",
      blocks: [
        {
          type: "p",
          text: "Els clients poden reservar taula a través del teu menú, i tu gestiones les reserves a la secció «Reserves» (vista «Mes» / «Dia»).",
        },
        { type: "h3", text: "Configurar les reserves" },
        { type: "p", text: "Primer activa i configura les reserves: Configuració → Reserves." },
        {
          type: "steps",
          items: [
            "Activa «Activa les reserves».",
            "Tria el mode de confirmació: «Automàtic» (les reserves es confirmen soles) o «Manual» (cadascuna la confirmes tu).",
            "Estableix la «Durada de la reserva» — quant de temps es manté la taula per al client.",
            "Omple l'«Horari setmanal»: per a cada dia — obert/tancat, horari i si cal la pausa del migdia.",
          ],
        },
        {
          type: "note",
          text: "Per acceptar reserves calen taules. Si no n'hi ha, el sistema demanarà afegir-ne primer.",
        },
        { type: "h3", text: "Gestionar les reserves" },
        {
          type: "list",
          items: [
            "Les reserves noves que esperen decisió estan agrupades al bloc «Esperant confirmació».",
            "Botons «Confirma» / «Rebutja» — per a cada reserva.",
            "«Finalitza» — marca que el client ha arribat i la reserva s'ha complert.",
            "Canvia entre «Mes» i «Dia», navega pel període amb «Enrere» / «Endavant».",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Dispositius (tauletes)",
      blocks: [
        {
          type: "p",
          text: "Els terminals de cuina, cambrer i reserves són tauletes separades que es connecten al teu compte amb un codi. Secció: Configuració → Dispositius.",
        },
        {
          type: "note",
          text: "Els dispositius estan disponibles amb un pla de pagament o durant una prova activa.",
        },
        { type: "h3", text: "Connectar una tauleta (aparellament)" },
        {
          type: "steps",
          items: [
            "Al tauler: Configuració → Dispositius → «Afegeix dispositiu».",
            "Indica un nom (per exemple «Cuina — línia calenta») i un tipus: Cuina, Cambrer o Reserves.",
            "Fes clic a «Genera codi» — apareix un codi de 6 dígits (vàlid 2 minuts).",
            "A la tauleta obre la pantalla de connexió i introdueix aquest codi.",
            "La tauleta es connecta i comença a treballar de seguida en el rol triat.",
          ],
        },
        { type: "tip", text: "Si el codi ha caducat — fes clic a «Codi nou» i introdueix el nou." },
        { type: "h3", text: "Gestionar dispositius" },
        {
          type: "list",
          items: [
            "Estats: En línia / Sense connexió / Esperant connexió / Revocat.",
            "«Revoca» — desconnecta la tauleta (per exemple si es perd). Per tornar a entrar cal un codi nou.",
            "«Elimina» — treu el dispositiu de la llista permanentment.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analítica",
      blocks: [
        {
          type: "p",
          text: "La secció «Analítica» mostra les xifres clau del local: ingressos, nombre de comandes i el seu desglossament (per exemple per mètode de pagament i per hora). Fes-la servir per entendre què es ven millor i quan.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Configuració",
      blocks: [
        {
          type: "p",
          text: "La secció «Configuració» s'obre com un conjunt de targetes-secció. A dalt hi ha el selector del restaurant actiu (si en tens més d'un). A sota — cada targeta per ordre.",
        },
        { type: "h3", text: "Lloc web" },
        {
          type: "list",
          items: [
            "URL del menú públic — l'adreça única del teu menú (pots establir el teu slug curt i copiar l'enllaç).",
            "El nom (títol) del local al lloc públic.",
            "Color d'accent — el color principal de botons i ressaltats del menú.",
            "Fons — una imatge o un vídeo a la portada; puja el teu o genera un fons amb IA a partir d'una descripció.",
            "Disposició del menú — com es mostren els plats al client.",
          ],
        },
        { type: "h3", text: "Contactes i adreça" },
        {
          type: "p",
          text: "Telèfon, Instagram, WhatsApp i un marcador al mapa — tot es mostra al client a la pàgina de contactes del teu menú.",
        },
        { type: "h3", text: "Regió" },
        { type: "p", text: "Moneda (usada per a tots els preus) i fus horari del local." },
        { type: "h3", text: "Taules" },
        { type: "p", text: "Plànol de la sala, places i codis QR de les taules — en detall a la secció 3." },
        { type: "h3", text: "Dispositius" },
        {
          type: "p",
          text: "Connexió de tauletes per a la pantalla de cuina i els terminals de cambrers — en detall a la secció 7.",
        },
        { type: "h3", text: "Comandes" },
        {
          type: "list",
          items: [
            "«Accepta comandes» — l'interruptor principal per rebre comandes.",
            "«Mode de comandes» — Intern i/o WhatsApp.",
            "«Camps obligatoris» — quines dades ha de proporcionar el client (Nom, Telèfon, Adreça).",
            "«Mètodes de pagament» — per integrar el sistema de pagament del restaurant contacta amb el suport.",
          ],
        },
        { type: "h3", text: "Reserves" },
        {
          type: "p",
          text: "Activació de reserves, confirmació automàtica o manual, durada i horari — en detall a la secció 6.",
        },
        { type: "h3", text: "Idiomes" },
        {
          type: "steps",
          items: [
            "Obre Configuració → Idiomes.",
            "Tria els idiomes als quals es tradueix el menú públic (toca per afegir/treure).",
            "Estableix l'idioma per defecte.",
            "Els textos es tradueixen manualment o amb el botó «Tradueix amb IA» — el sistema tradueix els noms i descripcions dels plats als idiomes triats.",
          ],
        },
        { type: "h3", text: "Pagament" },
        { type: "p", text: "Pla de subscripció, estat de la prova i gestió de pagaments." },
        {
          type: "list",
          items: [
            "Facturació mensual o anual (l'anual és més barata).",
            "«Subscriu-te» / «Canvia» — tria o canvia de pla.",
            "«Gestiona» — canvia el mètode de pagament o cancel·la la subscripció.",
          ],
        },
        {
          type: "note",
          text: "El pagament és en EUR. Per pagar en una altra moneda contacta amb el suport.",
        },
        { type: "h3", text: "Suport" },
        {
          type: "p",
          text: "Un xat integrat amb el nostre equip en temps real. Escriu un missatge — responem aquí mateix.",
        },
        { type: "h3", text: "Canviar i afegir restaurants" },
        {
          type: "p",
          text: "Si tens diversos locals, el selector de restaurant és a la part superior de la secció «Configuració».",
        },
        {
          type: "steps",
          items: [
            "Obre el selector de restaurants a la part superior de «Configuració».",
            "«Afegeix restaurant» → introdueix un nom.",
            "Tria «Duplica el menú i la configuració actuals» (inici ràpid) o «Comença de zero» (un restaurant buit).",
            "Crea'l — i canvia entre restaurants en qualsevol moment aquí mateix.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. El menú públic per als clients",
      blocks: [
        {
          type: "p",
          text: "El menú públic és el que veu el client després d'escanejar el QR. Es compon automàticament a partir del teu menú, la teva marca i els teus contactes.",
        },
        {
          type: "list",
          items: [
            "L'adreça del menú s'estableix a Configuració → Regió («Enllaç del menú»).",
            "El codi QR general i l'enllaç del menú s'obtenen amb el botó «Comparteix» a la pàgina «Menú».",
            "Cada taula té el seu propi QR separat (Configuració → Taules) que porta al menú d'aquella taula concreta.",
            "L'aspecte (fons, color d'accent, disposició) es configura a la secció «Lloc web».",
            "El botó «Vista prèvia» obre el menú tal com el veu el client.",
          ],
        },
        {
          type: "tip",
          text: "Després de qualsevol canvi del menú/configuració, prem «Vista prèvia» per comprovar com queda per al client.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Preguntes freqüents i detalls",
      blocks: [
        { type: "h3", text: "El client no pot fer una comanda" },
        {
          type: "p",
          text: "Comprova Configuració → Comandes → «Accepta comandes» (ha d'estar activat) i que hi hagi seleccionat almenys un mode de comandes.",
        },
        { type: "h3", text: "No arriben reserves" },
        {
          type: "p",
          text: "Assegura't que les reserves estiguin activades a Configuració → Reserves, que hi hagi taules afegides i que el dia no estigui marcat com a «Tancat» a l'horari.",
        },
        { type: "h3", text: "La tauleta no es connecta" },
        {
          type: "p",
          text: "El codi és vàlid 2 minuts. Si ha caducat — genera'n un de nou a Configuració → Dispositius. Si el dispositiu s'ha revocat — crea un codi nou.",
        },
        { type: "h3", text: "Un plat s'ha acabat" },
        {
          type: "p",
          text: "No l'eliminis — prem «Amaga plat». Desapareix del menú públic, i el recuperes amb «Mostra plat».",
        },
        { type: "h3", text: "Necessites dispositius/terminals però no en tens" },
        {
          type: "p",
          text: "La secció «Dispositius» està disponible amb un pla de pagament o durant una prova activa. Comprova Configuració → Pagament.",
        },
        { type: "h3", text: "Encara tens preguntes" },
        {
          type: "p",
          text: "Escriu-nos a Configuració → Suport — és un xat integrat amb el nostre equip.",
        },
      ],
    },
  ],
};
