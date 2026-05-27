import type { HelpDoc } from "../types";

// IS help guide.
export const is: HelpDoc = {
  metaTitle: "Hvernig á að nota IQ Rest — skref-fyrir-skref leiðarvísir",
  metaDescription:
    "Heildarleiðarvísir um IQ Rest: skráning, matseðill, pantanir, borðabókanir, eldhússkjár og stillingar — fyrir veitingastaði.",
  h1: "Hjálp",
  intro: "Ítarlegur leiðarvísir um IQ Rest — frá skráningu að fínni stillingum.",
  banner: {
    title: "Það er einfaldara en það lítur út fyrir",
    sub: "Skref-fyrir-skref leiðarvísir: frá skráningu að fínni stillingum — allir ráða við það.",
    cta: "Hvernig á að nota",
  },
  tipLabel: "Ábending",
  noteLabel: "Mikilvægt",
  sections: [
    {
      id: "start",
      title: "1. Byrjun",
      blocks: [
        { type: "h3", text: "Hvað er þetta kerfi" },
        {
          type: "p",
          text: "IQ Rest er þjónusta fyrir veitingastaði: þú býrð til netmatseðil með QR-kóða, tekur við pöntunum og borðabókunum beint úr símum gesta, en í eldhúsi og hjá þjónum keyra spjaldtölvur-skjáir. Öllu er stýrt frá einu stjórnborði (mælaborði).",
        },
        { type: "h3", text: "Skráning og innskráning" },
        { type: "p", text: "Hægt er að skrá sig inn á þrjá vegu — veldu hvaða sem er á innskráningarskjánum:" },
        {
          type: "list",
          items: [
            "Með Google — smelltu á „Halda áfram með Google“ og veldu reikning.",
            "Með Apple — smelltu á „Halda áfram með Apple“.",
            "Með tölvupósti — smelltu á „Halda áfram með tölvupósti“, sláðu inn netfangið og við sendum 6 stafa kóða. Sláðu hann inn á næsta skjá. Ekkert lykilorð þarf.",
          ],
        },
        {
          type: "note",
          text: "Með tölvupósti færðu aðeins einnota innskráningarkóða — engin ruslpóstur, engin fréttabréf.",
        },
        { type: "h3", text: "Stofnun veitingastaðar (uppsetning)" },
        {
          type: "p",
          text: "Við fyrstu innskráningu leiðir kerfið þig í gegnum hraða uppsetningu. Síðan er sjálfkrafa búinn til veitingastaður með sýnishorni af matseðilssniðmáti sem þú skiptir síðar út fyrir þitt eigið.",
        },
        {
          type: "steps",
          items: [
            "Sláðu inn nafn veitingastaðarins.",
            "Veldu tegund eldhúss (hún ákvarðar upphafssniðmát matseðils).",
            "Búið: þú lendir á mælaborðinu með þegar útfylltan sýnishornsmatseðil.",
          ],
        },
        {
          type: "note",
          text: "Gjaldmiðillinn greinist sjálfkrafa eftir svæði þínu — ekki þarf að velja hann í upphafi. Þú breytir honum síðar í Stillingar → Svæði.",
        },
        { type: "h3", text: "Yfirlit yfir mælaborðið" },
        {
          type: "p",
          text: "Flakk milli hluta: á tölvu efri stika, í síma neðri stika. Hlutar: Matseðill, Pantanir, Bókanir, Eldhús, Greiningar og Stillingar.",
        },
        {
          type: "list",
          items: [
            "Við hlið nafns veitingastaðarins í efri stikunni er lítill tengivísir: grænn punktur þýðir að pantanir samstillast í rauntíma.",
            "Á síðunni „Matseðill“ efst er hnappurinn „Forskoðun“ — opnar matseðilinn eins og gesturinn sér hann.",
            "Við hliðina hnappurinn „Deila“ — sýnir QR-kóðann og hlekkinn á matseðilinn (afrita hlekk, hlaða niður QR eða opna matseðil).",
          ],
        },
        {
          type: "tip",
          text: "Ýttu á „Forskoðun“ eftir hverja breytingu á matseðlinum — þú sérð strax hvernig hann lítur út fyrir gestinn.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Matseðill",
      blocks: [
        {
          type: "p",
          text: "Hlutinn „Matseðill“ er hjarta kerfisins. Hér byggir þú upp uppbygginguna: flokkar → réttir → valkostir. Opnaðu hann úr flakkinu.",
        },
        { type: "h3", text: "Flokkar og undirflokkar" },
        {
          type: "steps",
          items: [
            "Smelltu á „Bæta við flokki“ og sláðu inn nafn (til dæmis „Forréttir“).",
            "Til að breyta flokki — farðu yfir hann og smelltu á „Breyta flokki“.",
            "Röð flokka breytist með hnöppunum „Upp“ / „Niður“ — nákvæmlega í þeirri röð sér gesturinn þá.",
            "Þú getur búið til „Hóp“ (með „Bæta við hópi“) — hlutaflokk sem inniheldur aðra flokka.",
          ],
        },
        { type: "h3", text: "Bæta við réttum" },
        {
          type: "steps",
          items: [
            "Opnaðu flokk (ör til vinstri) og smelltu á „Bæta við rétti“.",
            "Fylltu út nafn, verð og lýsingu.",
            "Bættu við mynd: „Bæta við mynd“ — hladdu upp þinni eigin eða smelltu á „Búa til“ og lýstu réttinum með orðum svo gervigreindin búi til mynd.",
            "Vistaðu. Rétturinn birtist í flokknum.",
          ],
        },
        {
          type: "tip",
          text: "Hægt er að búa til mynd með gervigreind: tilgreindu sjónarhorn, lýsingu eða bakgrunn (til dæmis „Pizza Margherita á tréfjöl, séð að ofan“).",
        },
        { type: "h3", text: "Valkostir og afbrigði (breytur)" },
        {
          type: "p",
          text: "Valkostir eru val innan réttar: stærð, eldunarstig, aukahráefni. Hver valkostur hefur afbrigði og við afbrigði má bæta álagi (til dæmis „+1.50 hvert“).",
        },
        {
          type: "list",
          items: [
            "Dæmi: valkostur „Stærð“ með afbrigðunum „Lítil / Stór (+2.00)“.",
            "Dæmi: valkostur „Auka“ með nokkrum afbrigðum þar sem gesturinn velur eitt eða fleiri.",
          ],
        },
        { type: "h3", text: "Ofnæmisvaldar og mataræði" },
        {
          type: "p",
          text: "Á rétti má merkja ofnæmisvalda (glúten, hnetur o.s.frv.) og mataræðismerki (grænmetisfæði, vegan). Gesturinn sér þau sem tákn á opinbera matseðlinum.",
        },
        { type: "h3", text: "Sýnileiki rétta" },
        {
          type: "p",
          text: "Hnappurinn „Fela rétt“ / „Sýna rétt“ fjarlægir tímabundið atriði af opinbera matseðlinum án þess að eyða því — hentugt þegar réttur er búinn.",
        },
        { type: "h3", text: "Hlaða upp pappírsmatseðli (skönnun)" },
        {
          type: "p",
          text: "Ef þú átt þegar matseðil sem mynd eða PDF — ekki slá hann inn handvirkt. Notaðu skönnun:",
        },
        {
          type: "steps",
          items: [
            "Smelltu á borðann „Hlaða upp matseðli“ (eða „Hladdu upp pappírsmatseðlinum þínum“).",
            "Bættu við allt að 5 skrám (mynd/skönnun, hver allt að 20 MB) og smelltu á „Skanna“.",
            "Bíddu í allt að mínútu — gervigreindin þekkir flokka og rétti.",
            "Athugaðu það sem var þekkt, merktu við viðkomandi atriði og smelltu á „Halda áfram“.",
            "Veldu: skipta út núverandi matseðli eða bæta nýju atriðunum við þann sem fyrir er.",
          ],
        },
        {
          type: "note",
          text: "Dæmin úr upphafssniðmátinu eru fjarlægð þegar skannaði matseðillinn er vistaður — það er eðlilegt.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Borð og QR-kóðar",
      blocks: [
        {
          type: "p",
          text: "Borð eru notuð til að tengja pantanir og bókanir við ákveðna staði og prenta persónulega QR-kóða. Hluti: Stillingar → Borð.",
        },
        { type: "h3", text: "Stofna borð" },
        {
          type: "steps",
          items: [
            "Opnaðu Stillingar → Borð og smelltu á „Bæta við borði“.",
            "Tilgreindu borðnúmer, fjölda sæta og (valfrjálst) nafn — til dæmis „Gluggi“, „Bar“, „Verönd“.",
            "Bættu við borðmynd — gestir sjá hana og skilja nákvæmlega hvar borðið þeirra er.",
            "Stilltu lit borðsins — með þeim lit er borðið auðkennt í eldhúsi og í hlutanum „Pantanir“ svo starfsfólk finni það fljótt.",
            "Ef þú vilt, bættu við stuttri lýsingu.",
            "Vistaðu.",
          ],
        },
        {
          type: "note",
          text: "Borðmyndin er fyrir gesti (viðmiðun „hvar er borðið mitt“). Liturinn er fyrir starfsfólk (fljót sjónræn merking borðsins í eldhúsi og pöntunum).",
        },
        { type: "h3", text: "QR-kóði borðsins" },
        {
          type: "p",
          text: "Hvert borð hefur sinn eigin QR-kóða. Gesturinn skannar hann með símanum og lendir beint á matseðli þess borðs — pöntunin tengist sjálfkrafa réttu borði.",
        },
        {
          type: "steps",
          items: [
            "Smelltu á „Sýna QR-kóða“ við viðkomandi borð.",
            "Smelltu á „Hlaða niður QR“ til að vista myndina.",
            "Prentaðu hann og settu á borðið (á standi, í matseðil, á límmiða).",
          ],
        },
        {
          type: "tip",
          text: "„Borðhlekkurinn“ er sami hlekkur og QR en sem texti. Þú getur sent hann gestinum í skilaboðum.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Pantanir",
      blocks: [
        { type: "h3", text: "Hvernig gesturinn pantar" },
        {
          type: "p",
          text: "Gesturinn skannar QR á borðinu → matseðillinn opnast → velur rétti, valkosti og magn → leggur inn pöntunina. Pöntunin birtist strax á mælaborðinu þínu og á eldhús-/þjónaskjánum.",
        },
        {
          type: "note",
          text: "Til að gestir geti pantað þarf „Taka við pöntunum“ að vera kveikt í Stillingar → Pantanir. Sé það slökkt sér gesturinn matseðilinn en enginn pöntunarhnappur er til staðar.",
        },
        { type: "h3", text: "Vinna með pantanir á mælaborðinu" },
        {
          type: "p",
          text: "Hlutinn „Pantanir“ sýnir salarteikningu. Upptekin borð eru auðkennd og sýna fjölda virkra pantana. Ýttu á borð til að opna pantanir þess.",
        },
        {
          type: "steps",
          items: [
            "Ýttu á borð → „Hefja pöntun“ (eða opnaðu fyrirliggjandi).",
            "„Bæta við atriði“ → veldu flokk → rétt → valkosti → tilgreindu magn og athugasemdir ef þarf (til dæmis „án lauks“).",
            "Smelltu á „Bæta við“ — atriðið fer í pöntunina.",
          ],
        },
        { type: "h3", text: "Stöður atriða" },
        {
          type: "p",
          text: "Hvert atriði hefur stöðu: Í bið → Í eldun → Tilbúið → Borið fram. Ýttu á atriði til að skipta um stöðu. Stöðurnar samstillast við eldhúsið í rauntíma.",
        },
        { type: "h3", text: "Afslættir, skipting, breyta borði" },
        {
          type: "list",
          items: [
            "Afsláttur: „Bæta við afslætti“ — prósenta eða föst upphæð, á alla pöntunina eða eitt atriði, með ástæðu.",
            "Skipta pöntun: „Skipta pöntun“ — veldu atriðin sem fara á nýjan aðskilinn reikning.",
            "Breyta borði: „Breyta borði“ — færðu pöntunina á annað borð.",
            "Afrita atriði: bættu fljótt við öðru eins.",
          ],
        },
        { type: "h3", text: "Ljúka pöntun" },
        {
          type: "steps",
          items: [
            "Þegar öll atriði eru borin fram, smelltu á „Ljúka pöntun“.",
            "Veldu greiðslumáta (ef greiðslumátar eru stilltir).",
            "Pöntunin lokast og fer úr þeim virku.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Eldhús (KDS)",
      blocks: [
        {
          type: "p",
          text: "Eldhússkjárinn (KDS) er skjár á spjaldtölvu fyrir kokkana. Nýjar pantanir berast á hann í rauntíma og kokkurinn merkir rétti sem tilbúna.",
        },
        { type: "h3", text: "Hvað skjárinn sýnir" },
        {
          type: "list",
          items: [
            "Pöntunarspjöld með atriðum, valkostum og tímanum „á afgreiðslu“.",
            "Litamerking stöðu: hvað er í eldun, hvað er tilbúið.",
            "Hljóðmerki þegar ný pöntun berst.",
          ],
        },
        { type: "h3", text: "Hvernig á að nota" },
        {
          type: "steps",
          items: [
            "Ýttu á atriði til að færa það í næstu stöðu (Í eldun → Tilbúið).",
            "Kveiktu á hljóði með hnappnum „Kveikja á hljóði“ — þá berast nýjar pantanir með hljóðmerki.",
            "Með aðdrætti stillir þú stærð spjaldanna að spjaldtölvunni.",
            "Með síum má sýna aðeins flokkana sem þú þarft (til dæmis aðeins heitu línuna).",
          ],
        },
        {
          type: "note",
          text: "Ef spjaldtölvan missir nettenginguna birtist viðvörunin „Engin tenging“. Tengdu Wi-Fi og pantanir fara aftur að berast.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Bókanir",
      blocks: [
        {
          type: "p",
          text: "Gestir geta bókað borð í gegnum matseðilinn þinn og þú stýrir bókunum í hlutanum „Bókanir“ (sýn „Mánuður“ / „Dagur“).",
        },
        { type: "h3", text: "Setja upp bókanir" },
        { type: "p", text: "Kveiktu fyrst á og stilltu bókanir: Stillingar → Bókanir." },
        {
          type: "steps",
          items: [
            "Kveiktu á „Virkja bókanir“.",
            "Veldu staðfestingarham: „Sjálfvirkt“ (bókanir staðfestast sjálfar) eða „Handvirkt“ (þú staðfestir hverja).",
            "Stilltu „Lengd bókunar“ — hve lengi borðið er frátekið fyrir gestinn.",
            "Fylltu út „Vikuáætlun“: fyrir hvern dag — opið/lokað, opnunartíma og hádegishlé ef þarf.",
          ],
        },
        {
          type: "note",
          text: "Til að taka við bókunum þarf borð. Ef engin eru biður kerfið þig fyrst að bæta við borðum.",
        },
        { type: "h3", text: "Vinna með bókanir" },
        {
          type: "list",
          items: [
            "Nýjar bókanir sem bíða ákvörðunar eru saman í blokkinni „Bíða staðfestingar“.",
            "Hnapparnir „Staðfesta“ / „Hafna“ — fyrir hverja bókun.",
            "„Ljúka“ — merkir að gesturinn kom og bókuninni er lokið.",
            "Skiptu á milli „Mánuður“ og „Dagur“, flettu um tímabilið með „Til baka“ / „Áfram“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Tæki (spjaldtölvur)",
      blocks: [
        {
          type: "p",
          text: "Eldhús-, þjóna- og bókanaskjáirnir eru aðskildar spjaldtölvur sem tengjast reikningnum þínum með kóða. Hluti: Stillingar → Tæki.",
        },
        {
          type: "note",
          text: "Tæki eru í boði með greiddri áskrift eða á virku prófunartímabili.",
        },
        { type: "h3", text: "Tengja spjaldtölvu (pörun)" },
        {
          type: "steps",
          items: [
            "Á mælaborðinu: Stillingar → Tæki → „Bæta við tæki“.",
            "Tilgreindu nafn (til dæmis „Eldhús — heita línan“) og tegund: Eldhús, Þjónn eða Bókanir.",
            "Smelltu á „Búa til kóða“ — 6 stafa kóði birtist (gildir í 2 mínútur).",
            "Á spjaldtölvunni opnaðu tengiskjáinn og sláðu inn þennan kóða.",
            "Spjaldtölvan tengist og byrjar strax að vinna í völdu hlutverki.",
          ],
        },
        { type: "tip", text: "Ef kóðinn er útrunninn — smelltu bara á „Nýr kóði“ og sláðu inn þann nýja." },
        { type: "h3", text: "Stjórna tækjum" },
        {
          type: "list",
          items: [
            "Stöður: Nettengt / Ótengt / Bíður tengingar / Afturkallað.",
            "„Afturkalla“ — aftengir spjaldtölvuna (til dæmis ef hún tapast). Til að skrá sig inn aftur þarf nýjan kóða.",
            "„Eyða“ — fjarlægir tækið af listanum varanlega.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Greiningar",
      blocks: [
        {
          type: "p",
          text: "Hlutinn „Greiningar“ sýnir lykiltölur staðarins: tekjur, fjölda pantana og sundurliðun þeirra (til dæmis eftir greiðslumáta og tíma). Notaðu hann til að skilja hvað og hvenær selst best.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Stillingar",
      blocks: [
        {
          type: "p",
          text: "Hlutinn „Stillingar“ opnast sem safn hlutaspjalda. Efst er rofi fyrir virka veitingastaðinn (ef þú átt fleiri en einn). Fyrir neðan — hvert spjald í röð.",
        },
        { type: "h3", text: "Vefsíða" },
        {
          type: "list",
          items: [
            "Slóð opinbera matseðilsins — einstök slóð matseðilsins þíns (þú getur stillt þína eigin stuttu slug og afritað hlekkinn).",
            "Nafn (titill) staðarins á opinberu vefsíðunni.",
            "Áherslulitur — aðallitur hnappa og áherslna í matseðlinum.",
            "Bakgrunnur — mynd eða myndband á forsíðu; hladdu upp þínu eigin eða búðu til bakgrunn með gervigreind út frá lýsingu.",
            "Útlit matseðils — hvernig réttir eru sýndir gestinum.",
          ],
        },
        { type: "h3", text: "Tengiliðir og heimilisfang" },
        {
          type: "p",
          text: "Sími, Instagram, WhatsApp og merki á korti — allt er sýnt gestinum á tengiliðasíðu matseðilsins þíns.",
        },
        { type: "h3", text: "Svæði" },
        { type: "p", text: "Gjaldmiðill (notaður fyrir öll verð) og tímabelti staðarins." },
        { type: "h3", text: "Borð" },
        { type: "p", text: "Salarteikning, sæti og QR-kóðar borða — ítarlega í hluta 3." },
        { type: "h3", text: "Tæki" },
        {
          type: "p",
          text: "Tenging spjaldtölva fyrir eldhússkjáinn og þjónaskjáina — ítarlega í hluta 7.",
        },
        { type: "h3", text: "Pantanir" },
        {
          type: "list",
          items: [
            "„Taka við pöntunum“ — aðalrofinn fyrir móttöku pantana.",
            "„Pöntunarhamur“ — Innri og/eða WhatsApp.",
            "„Skyldureitir“ — hvaða upplýsingar gesturinn þarf að gefa upp (Nafn, Sími, Heimilisfang).",
            "„Greiðslumátar“ — til að samþætta greiðslukerfi veitingastaðarins hafðu samband við þjónustuver.",
          ],
        },
        { type: "h3", text: "Bókanir" },
        {
          type: "p",
          text: "Virkja bókanir, sjálfvirk eða handvirk staðfesting, lengd og opnunartími — ítarlega í hluta 6.",
        },
        { type: "h3", text: "Tungumál" },
        {
          type: "steps",
          items: [
            "Opnaðu Stillingar → Tungumál.",
            "Veldu tungumálin sem opinberi matseðillinn er þýddur á (ýttu til að bæta við/fjarlægja).",
            "Stilltu sjálfgefið tungumál.",
            "Textar eru þýddir handvirkt eða með hnappnum „Þýða með gervigreind“ — kerfið þýðir nöfn og lýsingar rétta á valin tungumál.",
          ],
        },
        { type: "h3", text: "Greiðsla" },
        { type: "p", text: "Áskriftaráætlun, staða prófunartímabils og umsjón greiðslna." },
        {
          type: "list",
          items: [
            "Mánaðarleg eða árleg innheimta (árleg er ódýrari).",
            "„Gerast áskrifandi“ / „Skipta“ — veldu eða skiptu um áætlun.",
            "„Stjórna“ — breyttu greiðslumáta eða segðu upp áskrift.",
          ],
        },
        {
          type: "note",
          text: "Greiðsla fer fram í EUR. Til að greiða í öðrum gjaldmiðli hafðu samband við þjónustuver.",
        },
        { type: "h3", text: "Þjónustuver" },
        {
          type: "p",
          text: "Innbyggt spjall við teymið okkar í rauntíma. Skrifaðu skilaboð — við svörum hér strax.",
        },
        { type: "h3", text: "Skipta um og bæta við veitingastöðum" },
        {
          type: "p",
          text: "Ef þú átt marga staði er veitingastaðarofinn efst í hlutanum „Stillingar“.",
        },
        {
          type: "steps",
          items: [
            "Opnaðu veitingastaðarofann efst í „Stillingar“.",
            "„Bæta við veitingastað“ → sláðu inn nafn.",
            "Veldu „Afrita núverandi matseðil og stillingar“ (fljót byrjun) eða „Byrja frá grunni“ (tómur veitingastaður).",
            "Stofnaðu hann — og skiptu milli veitingastaða hvenær sem er hér.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Opinberi matseðillinn fyrir gesti",
      blocks: [
        {
          type: "p",
          text: "Opinberi matseðillinn er það sem gesturinn sér eftir að hafa skannað QR. Hann er settur saman sjálfkrafa úr matseðlinum þínum, vörumerkinu og tengiliðunum.",
        },
        {
          type: "list",
          items: [
            "Slóð matseðilsins er stillt í Stillingar → Svæði („Hlekkur matseðils“).",
            "Almenna QR-kóðann og hlekk matseðilsins færðu með hnappnum „Deila“ á síðunni „Matseðill“.",
            "Hvert borð hefur sinn eigin aðskilda QR (Stillingar → Borð) sem leiðir á matseðil einmitt þess borðs.",
            "Útlitið (bakgrunnur, áherslulitur, útlit) er stillt í hlutanum „Vefsíða“.",
            "Hnappurinn „Forskoðun“ opnar matseðilinn eins og gesturinn sér hann.",
          ],
        },
        {
          type: "tip",
          text: "Eftir hverja breytingu á matseðli/stillingum ýttu á „Forskoðun“ til að athuga hvernig hann lítur út fyrir gestinn.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Algengar spurningar og smáatriði",
      blocks: [
        { type: "h3", text: "Gesturinn getur ekki lagt inn pöntun" },
        {
          type: "p",
          text: "Athugaðu Stillingar → Pantanir → „Taka við pöntunum“ (verður að vera kveikt) og að minnst einn pöntunarhamur sé valinn.",
        },
        { type: "h3", text: "Engar bókanir berast" },
        {
          type: "p",
          text: "Gakktu úr skugga um að bókanir séu kveiktar í Stillingar → Bókanir, að borð séu til staðar og að dagurinn sé ekki merktur „Lokað“ í áætluninni.",
        },
        { type: "h3", text: "Spjaldtölvan tengist ekki" },
        {
          type: "p",
          text: "Kóðinn gildir í 2 mínútur. Ef hann er útrunninn — búðu til nýjan í Stillingar → Tæki. Ef tækið var afturkallað — búðu til nýjan kóða.",
        },
        { type: "h3", text: "Réttur er búinn" },
        {
          type: "p",
          text: "Ekki eyða honum — smelltu á „Fela rétt“. Hann hverfur af opinbera matseðlinum og þú nærð honum aftur með „Sýna rétt“.",
        },
        { type: "h3", text: "Þú þarft tæki/skjái en átt þau ekki" },
        {
          type: "p",
          text: "Hlutinn „Tæki“ er í boði með greiddri áskrift eða á virku prófunartímabili. Athugaðu Stillingar → Greiðsla.",
        },
        { type: "h3", text: "Þú átt enn spurningar" },
        {
          type: "p",
          text: "Skrifaðu okkur í Stillingar → Þjónustuver — það er innbyggt spjall við teymið okkar.",
        },
      ],
    },
  ],
};
