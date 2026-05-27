import type { HelpDoc } from "../types";

// GA help guide.
export const ga: HelpDoc = {
  metaTitle: "Conas IQ Rest a úsáid — treoir céim ar chéim",
  metaDescription:
    "Treoir iomlán IQ Rest: clárú, biachlár, orduithe, áirithintí, scáileán cistine agus socruithe — do bhialanna.",
  h1: "Cabhair",
  intro: "Treoir mhionsonraithe ar IQ Rest — ón gclárú go dtí na socruithe is míne.",
  banner: {
    title: "Tá sé níos simplí ná mar a fhéachann sé",
    sub: "Treoir céim ar chéim: ón gclárú go dtí na socruithe is míne — éireoidh le duine ar bith.",
    cta: "Conas é a úsáid",
  },
  tipLabel: "Leid",
  noteLabel: "Tábhachtach",
  sections: [
    {
      id: "start",
      title: "1. Ag tosú",
      blocks: [
        { type: "h3", text: "Cad é an córas seo" },
        {
          type: "p",
          text: "Is seirbhís do bhialanna é IQ Rest: cruthaíonn tú biachlár ar líne le cód QR, glacann tú orduithe agus áirithintí boird go díreach ó fhóin na n-aíonna, agus oibríonn teirminéil táibléid sa chistin agus ag na freastalaithe. Déantar gach rud a bhainistiú ó phainéal riaracháin amháin (an deais).",
        },
        { type: "h3", text: "Clárú agus logáil isteach" },
        { type: "p", text: "Is féidir logáil isteach ar thrí bhealach — roghnaigh ceann ar bith ar an scáileán logála isteach:" },
        {
          type: "list",
          items: [
            "Le Google — cliceáil “Lean ar aghaidh le Google” agus roghnaigh an cuntas.",
            "Le Apple — cliceáil “Lean ar aghaidh le Apple”.",
            "Trí ríomhphost — cliceáil “Lean ar aghaidh le ríomhphost”, cuir isteach an seoladh, agus seolfaimid cód 6 dhigit. Cuir isteach é ar an gcéad scáileán eile. Níl pasfhocal de dhíth.",
          ],
        },
        {
          type: "note",
          text: "Trí ríomhphost ní fhaigheann tú ach cód logála isteach aon-uaire — gan turscar, gan nuachtlitreacha.",
        },
        { type: "h3", text: "Bialann a chruthú (tús eolais)" },
        {
          type: "p",
          text: "Ar an gcéad logáil isteach, treoraíonn an córas tú trí shocrú tapa. Ina dhiaidh sin cruthaítear bialann go huathoibríoch le teimpléad samplach biachláir a chuirfidh tú do cheann féin ina áit níos déanaí.",
        },
        {
          type: "steps",
          items: [
            "Cuir isteach ainm na bialainne.",
            "Roghnaigh an cineál cistine (cinneann sé an teimpléad biachláir tosaigh).",
            "Déanta: sroicheann tú an deais le biachlár samplach líonta cheana.",
          ],
        },
        {
          type: "note",
          text: "Aimsítear an t-airgeadra go huathoibríoch de réir do réigiúin — ní gá é a roghnú ag an tús. Athróidh tú níos déanaí é in Socruithe → Réigiún.",
        },
        { type: "h3", text: "Forbhreathnú ar an deais" },
        {
          type: "p",
          text: "Nascleanúint idir na rannáin: ar ríomhaire barra uachtair, ar fhón barra íochtair. Rannáin: Biachlár, Orduithe, Áirithintí, Cistin, Anailísíocht agus Socruithe.",
        },
        {
          type: "list",
          items: [
            "In aice le hainm na bialainne sa bharra uachtair tá táscaire beag ceangail: ciallaíonn ponc glas go ndéantar orduithe a shioncronú i bhfíor-am.",
            "Ar an leathanach “Biachlár” thuas tá an cnaipe “Réamhamharc” — osclaíonn sé do bhiachlár mar a fheiceann an t-aoi é.",
            "In aice leis an gcnaipe “Comhroinn” — taispeánann sé an cód QR agus an nasc chuig an mbiachlár (cóipeáil an nasc, íoslódáil an QR nó oscail an biachlár).",
          ],
        },
        {
          type: "tip",
          text: "Brúigh “Réamhamharc” tar éis gach athraithe ar an mbiachlár — feiceann tú láithreach conas a fhéachann sé don aoi.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Biachlár",
      blocks: [
        {
          type: "p",
          text: "Is é an rannán “Biachlár” croí an chórais. Anseo a thógann tú an struchtúr: catagóirí → miasa → roghanna. Oscail é ón nascleanúint.",
        },
        { type: "h3", text: "Catagóirí agus fochatagóirí" },
        {
          type: "steps",
          items: [
            "Brúigh “Cuir catagóir leis” agus cuir isteach ainm (mar shampla “Cúrsaí tosaigh”).",
            "Chun catagóir a chur in eagar — bog os a cionn agus brúigh “Cuir catagóir in eagar”.",
            "Athraítear ord na gcatagóirí leis na cnaipí “Suas” / “Síos” — go díreach san ord sin a fheiceann an t-aoi iad.",
            "Is féidir “Grúpa” a chruthú (trí “Cuir grúpa leis”) — catagóir-rannán ina bhfuil catagóirí eile.",
          ],
        },
        { type: "h3", text: "Miasa a chur leis" },
        {
          type: "steps",
          items: [
            "Leathnaigh catagóir (saighead ar chlé) agus brúigh “Cuir mias leis”.",
            "Líon isteach an t-ainm, an praghas agus an cur síos.",
            "Cuir grianghraf leis: “Cuir grianghraf leis” — uaslódáil do cheann féin, nó brúigh “Gin” agus déan cur síos ar an mias le focail chun go gcruthóidh an IS íomhá.",
            "Sábháil. Taispeánann an mhias sa chatagóir.",
          ],
        },
        {
          type: "tip",
          text: "Is féidir grianghraf a ghiniúint le IS: luaigh an uillinn, an soilsiú nó an cúlra (mar shampla “Pizza Margherita ar chlár adhmaid, radharc ón mbarr”).",
        },
        { type: "h3", text: "Roghanna agus leaganacha (mionathraitheoirí)" },
        {
          type: "p",
          text: "Is roghanna laistigh de mhias iad na roghanna: méid, leibhéal cócaireachta, comhábhair bhreise. Tá leaganacha ag gach rogha, agus is féidir formhuirear a chur le leagan (mar shampla “+1.50 an ceann”).",
        },
        {
          type: "list",
          items: [
            "Sampla: rogha “Méid” leis na leaganacha “Beag / Mór (+2.00)”.",
            "Sampla: rogha “Breise” le roinnt leaganacha as a roghnaíonn an t-aoi ceann amháin nó níos mó.",
          ],
        },
        { type: "h3", text: "Ailléirgíní agus aistí bia" },
        {
          type: "p",
          text: "Ar mhias is féidir ailléirgíní (glútan, cnónna srl.) agus lipéid aiste bia (feoilséantach, veigeán) a mharcáil. Feiceann an t-aoi mar dheilbhíní sa bhiachlár poiblí iad.",
        },
        { type: "h3", text: "Infheictheacht miasa" },
        {
          type: "p",
          text: "Baineann an cnaipe “Folaigh mias” / “Taispeáin mias” mír go sealadach den bhiachlár poiblí gan í a scriosadh — áisiúil nuair a bhíonn mias rite amach.",
        },
        { type: "h3", text: "Biachlár páipéir a uaslódáil (scanadh)" },
        {
          type: "p",
          text: "Má tá biachlár agat cheana mar ghrianghraf nó PDF — ná cuir isteach de láimh é. Úsáid an scanadh:",
        },
        {
          type: "steps",
          items: [
            "Brúigh an meirge “Uaslódáil biachlár” (nó “Uaslódáil do bhiachlár páipéir”).",
            "Cuir suas le 5 chomhad leis (grianghraf/scan, suas le 20 MB an ceann) agus brúigh “Scan”.",
            "Fan suas le nóiméad — aithníonn an IS na catagóirí agus na miasa.",
            "Seiceáil an méid a aithníodh, marcáil na míreanna a theastaíonn agus brúigh “Lean ar aghaidh”.",
            "Roghnaigh: an biachlár reatha a athsholáthar nó na míreanna nua a chur leis an gceann atá ann.",
          ],
        },
        {
          type: "note",
          text: "Baintear samplaí an teimpléid tosaigh nuair a shábháiltear an biachlár scanta — tá sé sin gnách.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Boird agus cóid QR",
      blocks: [
        {
          type: "p",
          text: "Úsáidtear boird chun orduithe agus áirithintí a nascadh le háiteanna ar leith agus chun cóid QR phearsanta a phriontáil. Rannán: Socruithe → Boird.",
        },
        { type: "h3", text: "Boird a chruthú" },
        {
          type: "steps",
          items: [
            "Oscail Socruithe → Boird agus brúigh “Cuir bord leis”.",
            "Luaigh uimhir an bhoird, líon na suíochán agus (roghnach) ainm — mar shampla “Fuinneog”, “Beár”, “Léibheann”.",
            "Cuir grianghraf den bhord leis — feiceann na haíonna é agus tuigeann siad go beacht cá bhfuil a mbord.",
            "Socraigh dath an bhoird — leis an dath sin aibhsítear an bord sa chistin agus sa rannán “Orduithe”, ionas go n-aimsíonn an fhoireann go tapa é.",
            "Más mian leat, cuir cur síos gairid leis.",
            "Sábháil.",
          ],
        },
        {
          type: "note",
          text: "Tá grianghraf an bhoird do na haíonna (treoir “cá bhfuil mo bhord”). Tá an dath don fhoireann (marc amhairc tapa den bhord sa chistin agus sna horduithe).",
        },
        { type: "h3", text: "Cód QR an bhoird" },
        {
          type: "p",
          text: "Tá a chód QR féin ag gach bord. Scanann an t-aoi le fón é agus sroicheann sé biachlár an bhoird sin go díreach — nasctar an t-ordú go huathoibríoch leis an mbord ceart.",
        },
        {
          type: "steps",
          items: [
            "Brúigh “Taispeáin cód QR” ag an mbord atá uait.",
            "Brúigh “Íoslódáil QR” chun an íomhá a shábháil.",
            "Priontáil é agus cuir ar an mbord é (ar sheastán, sa bhiachlár, ar ghreamán).",
          ],
        },
        {
          type: "tip",
          text: "Is é an “Nasc boird” an nasc céanna leis an QR ach mar théacs. Is féidir é a sheoladh chuig an aoi i dteachtaireacht.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Orduithe",
      blocks: [
        { type: "h3", text: "Conas a dhéanann an t-aoi ordú" },
        {
          type: "p",
          text: "Scanann an t-aoi an QR ar an mbord → osclaíonn an biachlár → roghnaíonn sé miasa, roghanna agus cainníocht → cuireann an t-ordú isteach. Taispeánann an t-ordú láithreach ar do dheais agus ar theirminéal na cistine/an fhreastalaí.",
        },
        {
          type: "note",
          text: "Le go mbeidh aíonna in ann ordú a dhéanamh, ní mór “Glac le horduithe” a bheith ar siúl in Socruithe → Orduithe. Má tá sé múchta, feiceann an t-aoi an biachlár ach níl cnaipe orduithe ann.",
        },
        { type: "h3", text: "Orduithe a láimhseáil ar an deais" },
        {
          type: "p",
          text: "Taispeánann an rannán “Orduithe” plean an tseomra. Aibhsítear boird ghafa agus taispeánann siad líon na n-orduithe gníomhacha. Tapáil bord chun a chuid orduithe a oscailt.",
        },
        {
          type: "steps",
          items: [
            "Tapáil bord → “Tosaigh ordú” (nó oscail ceann atá ann).",
            "“Cuir mír leis” → roghnaigh catagóir → mias → roghanna → más gá luaigh cainníocht agus nótaí (mar shampla “gan oinniún”).",
            "Brúigh “Cuir leis” — téann an mhír isteach san ordú.",
          ],
        },
        { type: "h3", text: "Stádais na míreanna" },
        {
          type: "p",
          text: "Tá stádas ag gach mír: Ar feitheamh → Á chócaráil → Réidh → Curtha. Tapáil mír chun an stádas a athrú. Sioncronaítear na stádais leis an gcistin i bhfíor-am.",
        },
        { type: "h3", text: "Lascainí, roinnt, bord a athrú" },
        {
          type: "list",
          items: [
            "Lascaine: “Cuir lascaine leis” — céatadán nó méid socraithe, ar an ordú iomlán nó ar mhír amháin, le cúis.",
            "Roinn ordú: “Roinn ordú” — roghnaigh na míreanna a rachaidh ar bhille nua ar leith.",
            "Athraigh bord: “Athraigh bord” — bog an t-ordú go bord eile.",
            "Cóipeáil mír: cuir ceann eile mar é leis go tapa.",
          ],
        },
        { type: "h3", text: "Ordú a chríochnú" },
        {
          type: "steps",
          items: [
            "Nuair atá gach mír curtha, brúigh “Críochnaigh ordú”.",
            "Roghnaigh modh íocaíochta (má tá modhanna cumraithe).",
            "Dúntar an t-ordú agus fágann sé na cinn ghníomhacha.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cistin (KDS)",
      blocks: [
        {
          type: "p",
          text: "Is scáileán ar tháibléad do na cócairí é an scáileán cistine (KDS). Tagann orduithe nua air i bhfíor-am, agus marcálann an cócaire na miasa mar réidh.",
        },
        { type: "h3", text: "Cad a thaispeánann an scáileán" },
        {
          type: "list",
          items: [
            "Cártaí orduithe le míreanna, roghanna agus an t-am “ag an bpas”.",
            "Léiriú datha ar an stádas: cad atá á chócaráil, cad atá réidh.",
            "Comhartha fuaime nuair a thagann ordú nua.",
          ],
        },
        { type: "h3", text: "Conas é a úsáid" },
        {
          type: "steps",
          items: [
            "Tapáil mír chun í a bhogadh chuig an gcéad stádas eile (Á chócaráil → Réidh).",
            "Cuir an fhuaim ar siúl leis an gcnaipe “Cuir fuaim ar siúl” — ansin tagann orduithe nua le comhartha fuaime.",
            "Leis an zúmáil coigeartaigh méid na gcártaí don táibléad.",
            "Le scagairí is féidir ach na catagóirí a theastaíonn a thaispeáint (mar shampla an líne the amháin).",
          ],
        },
        {
          type: "note",
          text: "Má chailleann an táibléad an t-idirlíon, taispeántar an rabhadh “Gan ceangal”. Ceangail Wi-Fi agus tosóidh orduithe ag teacht arís.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Áirithintí",
      blocks: [
        {
          type: "p",
          text: "Is féidir le haíonna bord a chur in áirithe trí do bhiachlár, agus bainistíonn tusa na háirithintí sa rannán “Áirithintí” (radharc “Mí” / “Lá”).",
        },
        { type: "h3", text: "Áirithintí a shocrú" },
        { type: "p", text: "Cuir ar siúl agus cumraigh na háirithintí ar dtús: Socruithe → Áirithintí." },
        {
          type: "steps",
          items: [
            "Cuir “Cumasaigh áirithintí” ar siúl.",
            "Roghnaigh an modh deimhnithe: “Uathoibríoch” (deimhnítear na háirithintí iad féin) nó “De láimh” (deimhníonn tú gach ceann).",
            "Socraigh “Fad na háirithinte” — cá fhad a choinnítear an bord don aoi.",
            "Líon isteach an “Sceideal seachtainiúil”: do gach lá — oscailte/dúnta, uaireanta oibre agus más gá sos lóin.",
          ],
        },
        {
          type: "note",
          text: "Chun glacadh le háirithintí teastaíonn boird. Mura bhfuil ceann ar bith ann, iarrfaidh an córas ort boird a chur leis ar dtús.",
        },
        { type: "h3", text: "Áirithintí a láimhseáil" },
        {
          type: "list",
          items: [
            "Bailítear na háirithintí nua atá ag fanacht le cinneadh sa bhloc “Ag fanacht le deimhniú”.",
            "Cnaipí “Deimhnigh” / “Diúltaigh” — do gach áirithint.",
            "“Críochnaigh” — marcálann sé gur tháinig an t-aoi agus go bhfuil an áirithint comhlíonta.",
            "Athraigh idir “Mí” agus “Lá”, scrollaigh tríd an tréimhse leis na cnaipí “Siar” / “Ar aghaidh”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Gléasanna (táibléid)",
      blocks: [
        {
          type: "p",
          text: "Is táibléid ar leith iad teirminéil na cistine, an fhreastalaí agus na n-áirithintí a cheanglaíonn le do chuntas le cód. Rannán: Socruithe → Gléasanna.",
        },
        {
          type: "note",
          text: "Tá na gléasanna ar fáil le plean íoctha nó le linn trialach gníomhaí.",
        },
        { type: "h3", text: "Táibléad a cheangal (péireáil)" },
        {
          type: "steps",
          items: [
            "Ar an deais: Socruithe → Gléasanna → “Cuir gléas leis”.",
            "Luaigh ainm (mar shampla “Cistin — líne the”) agus cineál: Cistin, Freastalaí nó Áirithintí.",
            "Brúigh “Gin cód” — taispeánann cód 6 dhigit (bailí ar feadh 2 nóiméad).",
            "Ar an táibléad oscail an scáileán ceangail agus cuir isteach an cód seo.",
            "Ceanglaíonn an táibléad agus tosaíonn sé ag obair láithreach sa ról roghnaithe.",
          ],
        },
        { type: "tip", text: "Má tá an cód imithe in éag — brúigh “Cód nua” agus cuir isteach an ceann úr." },
        { type: "h3", text: "Gléasanna a bhainistiú" },
        {
          type: "list",
          items: [
            "Stádais: Ar líne / As líne / Ag fanacht le ceangal / Cúlghairthe.",
            "“Cúlghair” — dícheanglaíonn an táibléad (mar shampla má chailltear é). Chun logáil isteach arís teastaíonn cód nua.",
            "“Scrios” — baintear an gléas den liosta go buan.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Anailísíocht",
      blocks: [
        {
          type: "p",
          text: "Taispeánann an rannán “Anailísíocht” príomhuimhreacha an bhialainne: ioncam, líon na n-orduithe agus a miondealú (mar shampla de réir modh íocaíochta agus ama). Úsáid é chun a thuiscint cad a dhíoltar is fearr agus cathain.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Socruithe",
      blocks: [
        {
          type: "p",
          text: "Osclaíonn an rannán “Socruithe” mar shraith cártaí-rannán. Ag an mbarr tá an lasc don bhialann ghníomhach (má tá níos mó ná ceann amháin agat). Faoina bhun — gach cárta in ord.",
        },
        { type: "h3", text: "Suíomh Gréasáin" },
        {
          type: "list",
          items: [
            "URL an bhiachláir phoiblí — seoladh uathúil do bhiachláir (is féidir do slug gairid féin a shocrú agus an nasc a chóipeáil).",
            "Ainm (teideal) na bialainne ar an suíomh poiblí.",
            "Dath aibhsithe — príomhdhath na gcnaipí agus na n-aibhsithe sa bhiachlár.",
            "Cúlra — íomhá nó físeán ar an leathanach baile; uaslódáil do cheann féin nó gin cúlra le IS ó chur síos.",
            "Leagan amach an bhiachláir — conas a thaispeántar na miasa don aoi.",
          ],
        },
        { type: "h3", text: "Teagmhálacha agus seoladh" },
        {
          type: "p",
          text: "Fón, Instagram, WhatsApp agus marcóir ar an léarscáil — taispeántar gach rud don aoi ar leathanach teagmhálacha do bhiachláir.",
        },
        { type: "h3", text: "Réigiún" },
        { type: "p", text: "Airgeadra (úsáidte do gach praghas) agus crios ama na bialainne." },
        { type: "h3", text: "Boird" },
        { type: "p", text: "Plean an tseomra, suíocháin agus cóid QR na mbord — go mion i rannán 3." },
        { type: "h3", text: "Gléasanna" },
        {
          type: "p",
          text: "Táibléid a cheangal don scáileán cistine agus do theirminéil na bhfreastalaithe — go mion i rannán 7.",
        },
        { type: "h3", text: "Orduithe" },
        {
          type: "list",
          items: [
            "“Glac le horduithe” — an príomh-lasc chun orduithe a fháil.",
            "“Modh orduithe” — Inmheánach agus/nó WhatsApp.",
            "“Réimsí éigeantacha” — cén sonraí nach mór don aoi a sholáthar (Ainm, Fón, Seoladh).",
            "“Modhanna íocaíochta” — chun córas íocaíochta na bialainne a chomhtháthú téigh i dteagmháil leis an tacaíocht.",
          ],
        },
        { type: "h3", text: "Áirithintí" },
        {
          type: "p",
          text: "Áirithintí a chumasú, deimhniú uathoibríoch nó de láimh, fad agus uaireanta oibre — go mion i rannán 6.",
        },
        { type: "h3", text: "Teangacha" },
        {
          type: "steps",
          items: [
            "Oscail Socruithe → Teangacha.",
            "Roghnaigh na teangacha a n-aistrítear an biachlár poiblí chucu (tapáil chun cur leis/baint).",
            "Socraigh an teanga réamhshocraithe.",
            "Aistrítear na téacsanna de láimh nó leis an gcnaipe “Aistrigh le IS” — aistríonn an córas ainmneacha agus cur síos na miasa go dtí na teangacha roghnaithe.",
          ],
        },
        { type: "h3", text: "Íocaíocht" },
        { type: "p", text: "Plean síntiúis, stádas na trialach agus bainistiú íocaíochtaí." },
        {
          type: "list",
          items: [
            "Billeáil mhíosúil nó bhliantúil (níos saoire go bliantúil).",
            "“Liostáil” / “Athraigh” — roghnaigh nó athraigh plean.",
            "“Bainistigh” — athraigh an modh íocaíochta nó cealaigh an síntiús.",
          ],
        },
        {
          type: "note",
          text: "Déantar an íocaíocht in EUR. Chun íoc in airgeadra eile téigh i dteagmháil leis an tacaíocht.",
        },
        { type: "h3", text: "Tacaíocht" },
        {
          type: "p",
          text: "Comhrá ionsuite lenár bhfoireann i bhfíor-am. Scríobh teachtaireacht — freagróimid anseo díreach.",
        },
        { type: "h3", text: "Bialanna a athrú agus a chur leis" },
        {
          type: "p",
          text: "Má tá roinnt áiteanna agat, tá lasc na bialainne ag barr an rannáin “Socruithe”.",
        },
        {
          type: "steps",
          items: [
            "Oscail lasc na mbialann ag barr na “Socruithe”.",
            "“Cuir bialann leis” → cuir isteach ainm.",
            "Roghnaigh “Cóipeáil an biachlár agus na socruithe reatha” (tús tapa) nó “Tosaigh ó thús” (bialann fholamh).",
            "Cruthaigh í — agus athraigh idir bialanna am ar bith anseo.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. An biachlár poiblí do na haíonna",
      blocks: [
        {
          type: "p",
          text: "Is é an biachlár poiblí an rud a fheiceann an t-aoi tar éis an QR a scanadh. Cuirtear le chéile go huathoibríoch é ó do bhiachlár, do bhrandáil agus do theagmhálacha.",
        },
        {
          type: "list",
          items: [
            "Socraítear seoladh an bhiachláir in Socruithe → Réigiún (“Nasc an bhiachláir”).",
            "Faigheann tú an cód QR ginearálta agus nasc an bhiachláir leis an gcnaipe “Comhroinn” ar an leathanach “Biachlár”.",
            "Tá a QR ar leith féin ag gach bord (Socruithe → Boird) a thugann go biachlár an bhoird sin go díreach.",
            "Cumraítear an chuma (cúlra, dath aibhsithe, leagan amach) sa rannán “Suíomh Gréasáin”.",
            "Osclaíonn an cnaipe “Réamhamharc” an biachlár mar a fheiceann an t-aoi é.",
          ],
        },
        {
          type: "tip",
          text: "Tar éis aon athraithe ar an mbiachlár/socruithe brúigh “Réamhamharc” chun a sheiceáil conas a fhéachann sé don aoi.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Ceisteanna coitianta agus mionsonraí",
      blocks: [
        { type: "h3", text: "Ní féidir leis an aoi ordú a dhéanamh" },
        {
          type: "p",
          text: "Seiceáil Socruithe → Orduithe → “Glac le horduithe” (caithfidh sé a bheith ar siúl) agus go bhfuil modh orduithe amháin ar a laghad roghnaithe.",
        },
        { type: "h3", text: "Níl áirithintí ag teacht" },
        {
          type: "p",
          text: "Cinntigh go bhfuil áirithintí ar siúl in Socruithe → Áirithintí, go bhfuil boird curtha leis agus nach bhfuil an lá marcáilte mar “Dúnta” sa sceideal.",
        },
        { type: "h3", text: "Ní cheanglaíonn an táibléad" },
        {
          type: "p",
          text: "Bíonn an cód bailí ar feadh 2 nóiméad. Má tá sé imithe in éag — gin ceann nua in Socruithe → Gléasanna. Má cúlghaireadh an gléas — cruthaigh cód nua.",
        },
        { type: "h3", text: "Tá mias rite amach" },
        {
          type: "p",
          text: "Ná scrios é — brúigh “Folaigh mias”. Imíonn sé den bhiachlár poiblí, agus tugann tú ar ais é leis an gcnaipe “Taispeáin mias”.",
        },
        { type: "h3", text: "Teastaíonn gléasanna/teirminéil uait ach níl siad agat" },
        {
          type: "p",
          text: "Tá an rannán “Gléasanna” ar fáil le plean íoctha nó le linn trialach gníomhaí. Seiceáil Socruithe → Íocaíocht.",
        },
        { type: "h3", text: "Tá tuilleadh ceisteanna agat" },
        {
          type: "p",
          text: "Scríobh chugainn in Socruithe → Tacaíocht — comhrá ionsuite lenár bhfoireann atá ann.",
        },
      ],
    },
  ],
};
