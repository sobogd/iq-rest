import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Muudatuste logi — IQ Rest värskendused ja uued funktsioonid",
    description:
      "Iga IQ Rest väljalase ühes kohas. Uued funktsioonid, AI parendused ja tootelennutused restoranide QR menüüde, online tellimuste ja broneeringute jaoks.",
  },
  pageTitle: "Muudatuste logi",
  pageSubtitle:
    "Iga värskendus, mille välja anname, et muuta teie restorani QR menüü, online tellimused ja broneeringud sujuvamaks. Uusimad esimesena.",
  readMore: "Loe rohkem",
  backToList: "Tagasi muudatuste logisse",
  publishedOn: "Avaldatud",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI roafotod restorani QR menüüsse | IQ Rest",
        description:
          "Genereeri stiililiselt järjepidevad roafotod kogu QR menüü jaoks ühe klõpsuga. Pole stockfotosid, pole fotograafi, pole redigeerimist.",
      },
      title: "AI-genereeritud roafotod kogu teie QR menüü jaoks",
      subtitle:
        "Lõpetage stockgaleriide otsimine ja fotosessioonide planeerimine. IQ Rest genereerib nüüd täieliku komplekti suupäraseid roafotosid ühes järjepidevas stiilis — otse teie roanimedest.",
      intro:
        "Iga roa pildistamine menüüs on kallis, aeglane ja harva järjepidev. Stockfotokogud jätavad lünki ja stiil ei sobi kunagi täpselt teie brändiga. IQ Rest sulgeb selle lünga sisseehitatud AI roafotograafiaga: kirjuta roa nimi, saa kõrgkvaliteediline foto, mis sobib ülejäänud menüü välimusega. Iga pilt genereeritakse spetsiaalselt teile, suurus sobib nii QR menüüle kui ka prinditavatele formaatidele.",
      sections: [
        {
          title: "Üks fotostiil kogu menüüs",
          body: "Kui külalised sirvivad menüüd, siis sobimatud stiilid lõhuvad kogemuse — üks ere, üks tume, üks ülevalt, üks küljelt. IQ Rest genereerib iga foto ühes brändijärjepidevas stiilis: sama valgustusenurk, sama taldrikukeel, sama tausta meeleolu. Tulemus tundub nagu päris fotosessioon, ainult et iga roog renderdati hetkel, kui menüüsse lisasite. Uute roogade lisamisel säilib stiil automaatselt.",
        },
        {
          title: "Roa nimest taldrikuni sekunditega",
          body: "Pole midagi briifida. Lisate roa — näiteks „Trühvel-tagliatelle metsaseentega“ — ja IQ Rest loob foto kulisside taga. Pilt laaditakse menüüsse, optimeeritakse WebP-na ja on valmis kuvamiseks enne, kui jõuate järgmise roa lisada. Kui foto ei vasta täpselt sellele, mida silmas pidasid, regenereeri see ühe puudutusega. Iga restoran saab alustamiseks tasuta AI generatsioone, taskukohase täiendusega kui soovid fotosid kogu 80-roalise menüü jaoks.",
        },
        {
          title: "Optimeeritud mobiilile ja SEO-le",
          body: "Iga genereeritud pilt on kodeeritud kompresseeritud WebP-na 80% kvaliteediga, seejärel serveeritud Hetzneri CDN-ist Nürnbergis nutika subsamplinguga. Lehed jäävad 4G-l kiireks, ilma luustiketa, ilma paigutuse nihketa. Fotod on ka Google Imagesi indeksitavad — külalised, kes otsivad teie roogade nimesid pildi järgi, leiavad teie menüü otse.",
        },
      ],
      benefitsTitle: "Miks AI roafotod loevad",
      benefits: [
        "Pole stockfoto tellimusi ega fotograafi tasusid",
        "Brändijärjepidev stiil iga roa jaoks menüüs",
        "Uued road saavad sobiva foto automaatselt",
        "Kompresseeritud WebP — kiire mobiilil, pole paigutuse hüppeid",
        "Tasuta generatsioonid igas plaanis kaasas",
        "Regenereeri iga foto ühe puudutusega kuni see on täiuslik",
      ],
      conclusionTitle: "Foto iga roa jaoks, ilma tootmiseta",
      conclusionBody:
        "Restoranid, mis sisaldavad fotosid, müüvad rohkem kõrge marginaaliga roogi — see pole oletus, see on tuntud sissetuleku mehaanika. Põhjus, miks enamus menüüsid pole fotosid, on tootmiskulu. IQ Rest eemaldab selle kulu täielikult. Iga roog, mille lisad, saab kauni, brändiga joondatud foto enne kui seadistuse lõpetad. Paari see QR tellimisega ja vaata kuidas upselli määrad tõusevad ilma kaamera tõstmiseta.",
      ctaText: "Genereeri AI fotod iga roa jaoks oma menüüs — tasuta proovi ajal.",
      ctaButton: "Proovi tasuta",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "AI restorani kaane taustagenerator | IQ Rest",
        description:
          "Genereeri automaatselt kaunis restorani kaanepilt QR menüü jaoks sekunditega. Sobib teie köögi, meeleolu ja brändiga — pole stockfotosid.",
      },
      title: "AI-genereeritud restorani kaane taust",
      subtitle:
        "Teie QR menüü avaneb õige meeleoluga juba enne kui külalised kerivad. IQ Rest genereerib nüüd kohandatud kaane tausta, mis sobib teie köögi ja atmosfääriga — automaatselt.",
      intro:
        "Esmamulje on oluline, eriti kui külalised skannivad QR-koodi laual. Üldine kaanepilt õõnestab kõike, mida olete kulutanud sisekujundusele. IQ Rest genereerib nüüd ainulaadse, atmosfäärilise kaanepildi iga restorani jaoks — põhinedes köögil, mille valite registreerumisel. Itaalia trattoria, jaapani izakaya, hispaania tapas-baar — igaüks saab kaane, mis tundub õige.",
      sections: [
        {
          title: "Kohandatud teie köögile ja meeleolule",
          body: "Kui täidate registreerumisviisardi, võtab IQ Rest valitud köögi ja genereerib kaane, mis sobib. Itaalia saab sooja trattoria valgustuse ja pasta pehme fookusega. Jaapani saab puhtad jooned ja tasakaalustatud kompositsiooni. Mehhiko saab elavad värvid ja tänavatoidu energia. Sobivus on automaatne, kuid võite kaant igal ajal regenereerida oma loomingulise suunaga, kui soovite midagi spetsiifilist.",
        },
        {
          title: "Optimeeritud QR menüü hero sektsioonidele",
          body: "Kaanepildid genereeritakse täpse kuvasuhtega, mida kasutab QR menüü hero sektsioon — teravad igal telefonil, ilma ebamugava kärpimiseta. Need on kodeeritud WebP-na, serveeritakse kiiresti ja lazy-laetud nii, et ülejäänud menüü maaliks esimesena. Kaas seab tooni, seejärel kaob, kui külalised hakkavad roogi sirvima.",
        },
        {
          title: "Brändi järjepidevus karbist välja",
          body: "Kaanepildi stiil paaritatakse automaatselt menüü jaoks genereeritud AI roafotodega — sama valguskeel, sama värvipalett, sama meeleolu. Külalised tajuvad teie restorani kui sidusat ja professionaalselt kujundatud, isegi kui seadistasite kogu asja viie minutiga oma telefonist.",
        },
      ],
      benefitsTitle: "Miks AI kaas ületab stocki",
      benefits: [
        "Ainulaadne teie restoranile — pole stockfoto, mida iga teine koht kasutab",
        "Sobib köögiga, mille valisite registreerumisel",
        "Sama visuaalne keel kui teie AI-genereeritud roafotod",
        "Õige suurusega QR menüü hero jaoks — pole käsitsi kärpimist",
        "Kompresseeritud WebP kiireks mobiilseks laadimiseks",
        "Regenereeri igal ajal ühe puudutusega",
      ],
      conclusionTitle: "Kaas, mis ütleb „Me teame, mida teeme“",
      conclusionBody:
        "Kui külaline skannib teie QR-koodi, on esimene asi, mida nad näevad, teie kaas. Lihvitud, atmosfääriline pilt annab märku kvaliteedist enne, kui nad loevad ühtegi roa nime. IQ Restiga on see lihvimine automaatne — genereeritud tasuta registreerumise ajal ja regenereeritav alati, kui meelt muudate. Pole stockgaleriisid, pole disainitööd, lihtsalt kaas, mis sobib.",
      ctaText: "Hangi kohandatud AI kaas oma QR menüüle vähem kui minutiga.",
      ctaButton: "Alusta tasuta proovi",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "3-sammuline registreerumisviisard restorani QR menüüle | IQ Rest",
        description:
          "Vali köök, restorani nimi, e-mail — ja IQ Rest ehitab teie QR menüü. Kiirim registreerumine QR menüü tööstuses.",
      },
      title: "3-sammuline registreerumisviisard: E-mailist töötava QR menüüni vähem kui minutiga",
      subtitle:
        "Vali oma köök. Kirjuta restorani nimi. Kinnita e-mail. Valmis — teie QR menüü on valmis, näidisroogadega ja AI-genereeritud fotodega.",
      intro:
        "Restoraniomanikel pole aega 10-ekraanise registreerumisvormi jaoks. Niisiis lõikasime selle kolmeks. Vali köök, mis sobib teie kohaga. Kirjuta oma restorani nimi. Kinnita oma e-mail. Selleks ajaks, kui esimest korda sisse logite, on teie QR menüü juba täidetud köögile sobivate näidisroogadega ja sobiva AI fotograafiaga. Saate külalist teenindada 60 sekundi jooksul registreerumise alustamisest.",
      sections: [
        {
          title: "Samm 1 — Köögi valik",
          body: "Vali laiast köökide loetelust: itaalia, hispaania, jaapani, mehhiko, prantsuse, vahemere, india, ameerika, kohvik, baar, pizzeria ja rohkem. Valik juhib iga vaikeväärtust viisardis: näidisroad, AI kaane stiil, vaikevaluuta ja algkategooriate struktuur. Sa ei konfigureeri midagi — sa valid alguspunkti.",
        },
        {
          title: "Samm 2 — Restorani nimi",
          body: "Kirjuta nimi, nagu külalised seda näevad. Kasutame seda kõikjal: QR menüü hero, lehe pealkiri, SEO slug, sotsiaalse jagamise eelvaade. Pole eraldi brändinime vs kuvanime otsust — üks väli, üks tõe allikas. Saab vahele jätta, kui soovid otsust edasi lükata; täidame kohatäite, mille saad hiljem ümber nimetada.",
        },
        {
          title: "Samm 3 — E-mail või Google'i sisselogimine",
          body: "Kinnita e-maili + ühekordse koodiga või puuduta „Logi sisse Google'iga“ koheseks konto loomiseks. Pole parooli, mida meeles pidada. Hetkel kui kinnitad, käivitab viisard menüü külvi kulisside taga — kategooriad luuakse, näidisroad sisestatakse, AI fotod genereeritakse, restorani kaas on valmis. Maandud otse töölauale töötava menüüga.",
        },
      ],
      benefitsTitle: "Miks 3-sammuline registreerumine ületab vormi",
      benefits: [
        "Vähem kui 60 sekundit landingult töötavale QR menüüle",
        "Null otsust, mida hiljem ei saa muuta — ainult vaikeväärtused alustamiseks",
        "Näidisroad eelnevalt täidetud köögi järgi — kohene sisu redigeerimiseks",
        "AI fotod ja kaanepilt valmis selleks ajaks, kui sisse logid",
        "Google'i sisselogimise valik — pole parooli, mida hallata",
        "Anonüümne edenemine salvestatud, kui viisardi keskel lahkud",
      ],
      conclusionTitle: "Kiireim QR menüü seadistamine, punkt",
      conclusionBody:
        "Enamus QR menüü teenuseid laseb sul täita kümneid välju enne kui näed midagi kasulikku. IQ Rest pöörab selle ümber — anname sulle kõigepealt töötava menüü, seejärel laseme kohandada. Viisard eemaldab iga barjääri uudishimu ja kasutatava toote vahel. Restoranid, kes lõpetavad registreerumise vähem kui 60 sekundiga, on dramaatiliselt tõenäolisemad oma menüüd tegelikult avaldama, esimese tellimuse võtma ja tellijaks jääma.",
      ctaText: "Käivita 3-sammuline viisard nüüd — sinu menüü on live 60 sekundiga.",
      ctaButton: "Alusta tasuta proovi",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI-genereeritud näidismenüü registreerumisel | IQ Rest",
        description:
          "Vahele tühi olek. IQ Rest genereerib automaatselt algse QR menüü teie köögi põhjal — kategooriad, road, hinnad ja fotod.",
      },
      title: "AI-ehitatud näidismenüü kohe pärast registreerumist",
      subtitle:
        "Pole enam tühja töölaua põrnitsemist. IQ Rest külvab teie konto köögile sobivate kategooriate, roogade ja AI fotodega, et saaksite redigeerida, mitte alustada nullist.",
      intro:
        "Iga uue tööriista raskeim osa on tühi olek. Uued restoraniomanikud istuvad maha, näevad tühja menüüd ja sulgevad tabi. IQ Rest parandab selle, populeerides teie menüü hetkel, kui registreerute. Vali itaalia — saa antipasti, pasta, pizza, magustoit. Vali jaapani — saa sushi, ramen, donburi, sake. Igas kategoorias on 6 kuni 10 algroogi koos AI-genereeritud fotodega järjepidevas stiilis. Sinu töö muutub hindade redigeerimiseks ja nimede kohandamiseks, mitte nullist ehitamiseks.",
      sections: [
        {
          title: "Köögi-teadlikud kategooriad ja road",
          body: "Külv ei viska lihtsalt juhuslikke roogi. See kasutab köögi, mille valisite registreerumisviisardis, et tõmmata kureeritud kategooriate komplekt, mis on mõttekas teie restoranistiili jaoks. Pizzeria saab „Pizza Classica“, „Pizza Speciale“, „Antipasti“, „Bevande“. Prantsuse bistroo saab „Entrées“, „Plats principaux“, „Fromages“, „Desserts“. Algsisu sobib konventsiooniga, mida sööjad selle köögi puhul ootavad.",
        },
        {
          title: "Fotod ja hinnad karbist välja",
          body: "Iga algroog tuleb AI-genereeritud fotoga järjepidevas stiilis ja mõistliku vaikehinnaga teie kohalikus valuutas (automaatselt geolokaliseeritud). Hinnad on kohatäited — muudate neid — kuid teevad menüü kohe päriselt välja nägemaks, et saate QR menüüd eelvaadata ja tunda, kuidas lõpptulemus välja näeb. See on kriitiline partneritele näitamiseks, tagasiside saamiseks või lihtsalt otsustamiseks „jah, see on tööriist, mida tahame kasutada“.",
        },
        {
          title: "Redigeeri, ära alusta nullist",
          body: "Kui külvatud, kannab iga roog isExample lippu. Kohe kui redigeerid roogi — muudad selle nime, hinda või kirjeldust — lipp langeb maha. Ülejäänud näidisroad paistavad visuaalselt välja, et tead, mis on veel kohatäide sisu. See eraldus teeb selgeks, mis on tehtud ja mis veel on, muutes tühja oleku probleemi produktiivseks redigeerimisvooks.",
        },
      ],
      benefitsTitle: "Miks ehitatud menüü võidab",
      benefits: [
        "Null tühja olekut — ava töölaud ja näe töötavat menüüd",
        "Kategooriad ja road sobivad valitud köögiga",
        "AI fotod iga algroa jaoks ühtses stiilis",
        "Kohalik valuuta automaatselt tuvastatud, vaikehinnad paigas",
        "Näidislipp tuhmub redigeerimisel — selge edenemise märk",
        "Näita huvigruppidele päris välja nägev menüü minutitega",
      ],
      conclusionTitle: "Vahele tühi leht",
      conclusionBody:
        "Menüü nullist ehitamine on hirmutav. Selle redigeerimine on lihtne. IQ Rest annab sulle täieliku algmenüü hetkel, kui registreerud, seejärel laseb sul seda kohandada nii, et see vastaks päris pakkumisele. Tulemus: rohkem restorane lõpetab seadistuse, rohkem menüüsid läheb tegelikult live'i, rohkem külalisi skannib QR-koode, mis viivad päris, redigeeritud, tootmise menüüdele.",
      ctaText: "Registreeru ja saa täielikult ehitatud algmenüü oma köögis.",
      ctaButton: "Ehita minu menüü",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktiivne menüütuur esmakasutajatele | IQ Rest",
        description:
          "7-sammuline interaktiivne juhend juhib uued restoraniomanikud läbi QR menüü töölaua — pole dokumente, pole videosid, ainult kätega.",
      },
      title: "7-sammuline interaktiivne menüütuur esmakülastusel",
      subtitle:
        "Me ei sunni sind dokumentatsiooni lugema. Esimesel korral, kui menüü avad, juhib IQ Rest sind selle kaudu — lisa kategooria, lisa roog, redigeeri, sorteeri, eelvaata, jaga, kõik seitsme puudutusega.",
      intro:
        "Enamus SaaS tooteid matavad onboardingu abikeskusesse, mida keegi ei loe. IQ Rest võtab vastupidise lähenemise: esimesel korral, kui uus kasutaja menüülehele maandub, valgustab interaktiivne tuur iga võtmetegevuse järjekorras. Lisa kategooria. Lisa oma esimene roog. Redigeeri seda. Lülita nähtavus. Korralda ümber. Eelvaata live menüüd. Jaga külalisega. Seitsmenda sammu lõpuks oled kasutanud iga funktsiooni, mida 95% ajast vajad.",
      sections: [
        {
          title: "Tootes, mitte teadmistebaasis",
          body: "Iga tuuri samm valgustab tegeliku UI elemendi sinu ekraanil. Mull selgitab, mida element teeb ja miks see oluline on. Pole ekraanitõmmiseid — ekraanitõmmis ON sinu töölaud. Kui puudutad, õpid tehes, mitte lugemisega. Jäta vahele igal ajal; tuur püsib seansside vahel kuni selle lõpetad või lõplikult tagasi lükkad.",
        },
        {
          title: "Disainitud päris töövoo ümber",
          body: "Seitse sammu pole funktsioonide tühjendus — need kaardistuvad töövoogu, mida uus restoran tegelikult sooritab. Lisa kategooriad esimesena (joogid, põhiroad, magustoidud), seejärel road, seejärel viimistle iga roog, seejärel korralda järjekord, milles need ilmuvad, seejärel eelvaata, et veenduda, et see näeb õige välja, seejärel jaga QR kaudu. Lõpuks oled lõpetanud silmuse tühjast menüüst kuni QR-koodini trükitud lauakaardil.",
        },
        {
          title: "Lokaliseeritud 35 keelde",
          body: "Tuuri tekst on tõlgitud igas keeles, mida IQ Rest toetab — sama nagu ülejäänud töölaud. Hispaania keelt rääkivad omanikud saavad hispaania mullid, saksa omanikud saavad saksa, katalaani omanikud saavad katalaani. Mitte miski tuuris ei eelda inglise keele oskust.",
        },
      ],
      benefitsTitle: "Miks tootes tuur ületab abikeskust",
      benefits: [
        "Õpi tehes, mitte dokumente lugedes",
        "7 sammu katavad ~95% töövoost",
        "Lükka tagasi igal ajal — ei blokeeri kunagi töölauda",
        "Püsib seansside vahel kuni lõpetatud või vahele jäetud",
        "Lokaliseeritud 35 keelde — pole inglise keelt vaja",
        "Pole videosid laadida — kohene, omake UI ülekate",
      ],
      conclusionTitle: "Segasest enesekindlaks seitsme sammuga",
      conclusionBody:
        "Iga toote raskeim hetk on esimesed 30 sekundit. Kasutaja avab töölaua, vaatab ringi ja kas saab aru või kaob. IQ Resti interaktiivne tuur eemaldab selle riski — minutiga teab iga uus kasutaja, kus rooga lisada, kuidas eelvaadata, kuidas jagada. Tuuri lõpetamine korreleerub tugevalt eduka menüü avaldamisega. Me ei õpeta lihtsalt toodet — toome menüü live'i.",
      ctaText: "Registreeru ja lase end juhatada esimesest QR menüüst seitsme puudutusega.",
      ctaButton: "Alusta tasuta proovi",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Riigipõhised landingulehed restorani QR menüüle | IQ Rest",
        description:
          "Külastajad Hispaaniast näevad landingulehte, mis on kohandatud hispaania restoranidele. Prantsusmaa näeb prantsuse keelt. 35 riiki, 35 konversiooniks häälestatud lehte.",
      },
      title: "Kohandatud landinguleht igas keeles",
      subtitle:
        "Külastajad ei saa enam automaatselt tõlgitud lehte. Igal 35 toetatud keelel on oma landinguleht, kirjutatud selle turu jaoks.",
      intro:
        "Automaatselt tõlgitud landingulehed konverteerivad halvasti. Grammatika on vale, kultuurilised viited on valed ja kohalikud maksetingimused tunduvad imporditud. IQ Rest saadab nüüd ainulaadse landingulehe iga 35 toetatud keele jaoks — kirjutatud turule, mitte lihtsalt tõlgitud. Hispaania külastajad saavad lehe restaurantes y cafeterías kohta. Prantsuse külastajad saavad cafés et bistrots. Saksa külastajad saavad Restaurants und Imbisse. Iga leht juhib väärtuspakkumisega, mis sellele publikule kõige rohkem oluline on.",
      sections: [
        {
          title: "Üks leht keele kohta, mitte automaatne tõlge",
          body: "Iga landing elab /<locale> juures iseseisva Next.js marsruudina. Tekstid on TypeScript objektides — versioonitud, tüüp-kontrollitud, sõltumatult juurutavad. Saame A/B testida hispaania hero variandi ilma saksa puudutamata. Saame lokaliseerida hinna kõne brasiilia reali jaoks ilma euro turge mõjutamata. Tulemus on kiirem iteratsioon landingidel, mis tegelikku konversiooni juhivad.",
        },
        {
          title: "Geolokatsioon suunab külastajaid automaatselt",
          body: "Esimesel korral, kui külastaja iq-rest.com lehele maandub, loeb meie nginx geo moodul nende riigikoodi ja suunab õigele /<locale>. Hispaania IP-d maanduvad /es. Saksa /de. Brasiilia /pt. Suuname isegi katalaani keelt rääkivaid Hispaania osi /ca asemel /es. Külastajad ei näe kunagi „vali keel“ modali — nad näevad oma keelt vaikimisi.",
        },
        {
          title: "Brändiülesed hreflang ja kanoonilised sildid",
          body: "Kõik 35 landingut viitavad üksteisele hreflang siltide kaudu, et Google indekseeriks õige iga päringu jaoks. Kanoonilised URL-id viitavad keele-URL-ile, mitte üldisele juurele. Seadistus järgib Google'i rahvusvahelisi SEO juhiseid täpselt, et iga landing võistleks oma keeles ilma teisi kannibaliseerimata.",
        },
      ],
      benefitsTitle: "Miks riigipõhised landingud konverteerivad paremini",
      benefits: [
        "Omakeelne sõnastus igas turus — pole automaatne tõlge",
        "Geo-suunamine teenindab õige lehe automaatselt",
        "Hreflang ja kanoonilised sildid järgivad Google'i juhiseid",
        "Katalaani külastajad Kataloonias näevad katalaani, mitte kastiilia",
        "Valuuta, hinnastamine ja CTA-d lokaliseeritud iga turu jaoks",
        "Sõltumatu A/B testimine keele kohta ilma ristisaastumiseta",
      ],
      conclusionTitle: "35 keelt, 35 esiväravat",
      conclusionBody:
        "Kui hispaania restoraniomanik maandub poolikule tõlgitud inglise lehele USA stiilis hinnastamisega, kaob ta. Kui maandub lehel, mis räägib temaga hispaania keeles, euro hindadega ja hispaania viidetega, konverteerib. IQ Rest teeb nüüd teist asja igas turus, mida teenindame — 35 landingut, 35 konversiooniks häälestatud esiväravat, kõik automaatselt geo-suunatud.",
      ctaText: "Proovi IQ Rest oma keeles — landing kohandatud sinu turule.",
      ctaButton: "Ava minu keel",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Google'iga sisselogimine restorani QR menüü töölauale | IQ Rest",
        description:
          "Vahele paroolid ja e-maili koodid. Puuduta „Logi sisse Google'iga“, et pääseda restorani QR menüü töölauale sekundiga.",
      },
      title: "Google'iga sisselogimine — Ühe puudutusega juurdepääs QR menüüle",
      subtitle:
        "Vahele OTP e-mailid ja unustatud paroolid. Puuduta „Jätka Google'iga“ ja oled töölaual sees vähem kui sekundiga.",
      intro:
        "E-mail + ühekordne kood autentimine on turvaline kuid aeglane. Kirjuta oma e-mail, oota koodi, lülitu postkasti, kopeeri kood, kleebi, esita. See on parimal juhul 30-sekundine voog. IQ Rest pakub nüüd Google'iga sisselogimist alternatiivina: puuduta üht nuppu, vali oma Google'i konto, oled sees. Pole parooli, mida unustada, pole postkasti edasi-tagasi käike, pole hõõrdumist.",
      sections: [
        {
          title: "Native Google OAuth, mitte ümbersuunamissilmus",
          body: "Kasutame Google'i ametlikku Identity Services SDK-d One Tap UI-ga toetatud brauserites. Voog toimub natiivses popupis, mitte ümbersuunamisena Google'i domeeni ja tagasi. Kogu asi võtab umbes sekundi pärast esimest puudutust. Kontrollime Google ID tokeni serveripoolselt Google'i avalike võtmete vastu, nii et voog on krüptograafiliselt turvaline otsast otsani.",
        },
        {
          title: "Sama konto, ükskõik milline meetod",
          body: "Kui registreerusid e-mail-OTP-ga ja hiljem valid Google'i, lingime kontod e-maili järgi. Saad meetodite vahel iga sisselogimisel vahetada. Pole „eraldi Google'i kontot“, mida hallata, ega kaota oma menüüd erineva sisselogimisega. Edastame ka sinu töölaua keele Google'i sisselogimisel, et e-mailid sinu kontole läheksid õiges keeles esimesest päevast.",
        },
        {
          title: "Mobile-First — Töötab iOS Safari ja Android Chrome'is",
          body: "Google'i ametlik SDK on olnud mobiilis ajalooliselt habras. Disainisime selle ümber, asetades päris Google'i nupu meie UI peale, selle asemel et käivitada programmilisi klikke (mida iOS Safari nüüd blokeerib). Tulemus: nupp töötab igas kaasaegses telefonibrauseris, ilma installimiseta, ilma rakenduste poeta.",
        },
      ],
      benefitsTitle: "Miks Google'iga sisselogimine ületab e-mail OTP-d",
      benefits: [
        "Üks puudutus sisselogimiseks — pole e-maili edasi-tagasi käiku",
        "Pole parooli, mida meeles pidada või lähtestada",
        "Sama konto, kasutad sa e-maili või Google'it",
        "Krüptograafiliselt kontrollitud serveripoolselt Google ID tokeni kaudu",
        "Töötab usaldusväärselt iOS Safari ja Android Chrome'is",
        "Keel edastatud, et e-mailid jääksid sinu keelde",
      ],
      conclusionTitle: "Kiireim viis tagasi töölauale",
      conclusionBody:
        "Restoraniomanikud kontrollivad oma menüüd kümneid kordi nädalas — teeninduste vahel, pärast trükitööd, hindade kohandamisel. Iga sisselogimisel säästetud sekund liitub. Google'iga sisselogimine muudab 30-sekundise OTP voo ühe sekundi puudutuseks. E-mail-OTP jääb saadavaks omanikele, kes seda eelistavad, kuid enamus kasutajaid valib Google'i pärast selle ühe korra proovimist.",
      ctaText: "Vahele parool — logi sisse Google'iga ühe puudutusega.",
      ctaButton: "Ava töölaud",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Mitmekeelsed e-maili teavitused 35 keeles | IQ Rest",
        description:
          "Proovi meeldetuletused, toe vastused, tellimuse e-mailid — iga teavitus, mille IQ Rest saadab, saabub teie töölaua keeles.",
      },
      title: "Mitmekeelsed e-maili teavitused kõigis 35 keeles",
      subtitle:
        "Iga e-mail, mille IQ Rest saadab — toe vastused, proovi meeldetuletused, tellimuse kviitungid — saabub keeles, mille olete oma töölaual seadnud. Sealhulgas paremalt vasakule paigutused.",
      intro:
        "E-mail vales keeles on parimal juhul hõõrdumine, halvimal juhul kustutamine. IQ Rest saadab nüüd iga tehingulise e-maili keeles, mille olete oma töölaual seadnud, kõigis 35 toetatud keeles. Tervitus e-mailid, proovi aeguvad meeldetuletused, tellimuse kinnitused, toe vastused — kõik saabuvad teie keeles, õige grammatikaga ja kultuuriliselt sobiva sõnastusega. Paremalt vasakule keeled nagu araabia ja pärsia saavad õigesti peegeldatud paigutused.",
      sections: [
        {
          title: "preferredLocale rändab koos sinu kontoga",
          body: "Igal kasutajal on preferredLocale väli seadistatud esimesel sisselogimisel. Kas registreerisid e-mail-OTP, Google'i või viisardi kaudu, sinu keel jäädvustatakse ja püsib. Iga backend töö, mis e-maili väljastab — Stripe webhookid, toe vastuse teavitused, planeeritud cron tööd — tõmbab kasutaja preferredLocale ja kasutab seda õige malli valimiseks. Vaheta keel töölaual ja järgmine e-mail peegeldab muutust.",
        },
        {
          title: "RTL mallid araabia ja pärsia jaoks",
          body: "Paremalt vasakule paigutused pole lihtsalt tõlge — kogu visuaalne hierarhia keerleb. Saadame spetsiaalsed RTL mallid araabia ja pärsia jaoks: navigatsioon voolab paremalt vasakule, numbrid araabia-india keeles, kus see sobib, brändi logo paigutatud õigesti. Tulemus on e-mail, mis tundub omake RTL lugejatele, mitte tõlgitud LTR mall katkise joondumisega.",
        },
        {
          title: "Tõlgitud restoranitööstuse ekspertide poolt",
          body: "Üldised tõlketeenused toodavad sõna-sõnalt, kuid jäiku tõlkeid. Tõlkisime iga malli, kasutades köögi ja külalislahkuse terminoloogiat, mis kõlab loomulikult restoranioperaatoritele igas turus. „Trial“ saab „período de prueba“ hispaania keeles (mitte „juicio“). „Reservation“ saab „Reservierung“ saksa keeles (mitte „Reservation“). Detailsuse tase liitub — restoranid märkavad, kui tööriist räägib nende keelt õigesti.",
        },
      ],
      benefitsTitle: "Miks mitmekeelsed e-mailid loevad",
      benefits: [
        "Kõik tehingulised e-mailid sinu töölaua keeles",
        "preferredLocale püsib sisselogimiste vahel",
        "RTL paigutused araabia ja pärsia jaoks",
        "Külalislahkusele sobiv terminoloogia keele kohta",
        "Keele vahetamine uuendab tulevased e-mailid kohe",
        "35 keelt sealhulgas katalaani, sloveeni, eesti, läti",
      ],
      conclusionTitle: "E-mailid, mis räägivad sinu keelt",
      conclusionBody:
        "Suhtlus, mis maandub vales keeles, on suhtlus, mis ei tööta. IQ Rest saadab iga e-maili keeles, mida tegelikult kasutad, paigutuse ja terminoloogiaga, mis sobib. Kõlab väike, kuni sa pole hispaania restoraniomanik, kes saab inglise-ainsa proovi aegumise hoiatuse ja jätab selle vahele. Nüüd ei.",
      ctaText: "Registreeru ja saa oma töölaud pluss iga e-mail oma keeles.",
      ctaButton: "Alusta tasuta proovi",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-omake tunne mobiilsele restorani töölauale | IQ Rest",
        description:
          "Alumine sakk-navigatsioon, turvatsooni käsitlemine, suumimata sisendid — IQ Rest mobiilne töölaud tundub iPhone'is omake rakendusena.",
      },
      title: "iOS-omake tunne sinu telefonis",
      subtitle:
        "Alumine sakk-navigatsioon, täielik turvatsooni teadlikkus, vormi sisendid ilma suumita ja koheste lehe üleminekutega. Oma QR menüü haldamine telefonis tundub nüüd nagu omake iOS rakenduse kasutamine.",
      intro:
        "Enamus SaaS restorani töölaudu on mobiilis desktop-esimesed järelmõtted. IQ Rest on vastupidine — disainitud omanikele, kes oma menüüd telefonist teeninduste vahel haldavad. Mobiilne töölaud kasutab nüüd alumist sakk-navigatsiooni, austab iPhone'i turvatsooni insette, hoiab ära iOS vormisisendi suumi ja kasutab peaaegu koheseid SPA üleminekuid. See näeb välja ja tundub nagu omake rakendus, ainult et pole rakendust, mida installida.",
      sections: [
        {
          title: "Alumine sakk-navigatsioon, mitte hamburger",
          body: "Hamburgerimenüüd mobiilis on aeglased — puuduta avamiseks, puuduta elementi, oota lehte. Asendasime töölaua külgriba alumise sakkriba telefonis: Menüü, Tellimused, Broneeringud, Seaded. Üks pöialda-sõbralik puudutus, kohene navigatsioon. Aktiivne sakk kasutab sinu brändi rõhuvärvi, et praegune asukoht oleks alati ilmselge.",
        },
        {
          title: "Turvatsooni insetid ja Home indikaator",
          body: "Kaasaegsetel iPhone'idel on Home indikaator allosas ja sälk ülaosas. Veebirakendused, mis seda ignoreerivad, lõpetavad oma UI indikaatori peale ülekattega või sälgu taga peidetud. Kasutame env(safe-area-inset-*) kõikjal — alumine nav istub Home indikaatori kohal, sisu polster arvestab dynamic islandiga. Tulemus tundub seadme jaoks disainituna, mitte töölaua brauserist kohandatuna.",
        },
        {
          title: "Suumimata sisendid ja kohene vormi esitamine",
          body: "iOS Safari suumib vormid sisendi fondisuurusega alla 16px. Tõstsime iga sisendi 16px-ni ja konfigureerisime vaatevälja maximum-scale=1, et puudutused ei käivitaks suumi-ja-hüpet, mis lõhub iga teise veebitöölaua. Vormi esitamised on serveritegevused optimistliku UI-ga — muutus ilmub kohe, võrk kinnitab taustal.",
        },
      ],
      benefitsTitle: "Miks omake tunne loeb mobiilis",
      benefits: [
        "Alumine sakk-nav — ühe puudutusega juurdepääs igasse sektsiooni",
        "Turvatsooni teadlik — pole ülekattumist Home indikaatori või sälguga",
        "16px sisendid — pole iOS suumi-ja-hüpet vormi puudutustel",
        "Aktiivne sakk kasutab sinu brändi rõhuvärvi",
        "SPA üleminekud — pole täielikku lehe uuesti laadimist sektsioonide vahel",
        "Pole rakendust, mida installida — töötab Safari ja Chrome'is",
      ],
      conclusionTitle: "Veebitöölaud, mis tundub nagu rakendus",
      conclusionBody:
        "Joon veebi ja omake vahel on enamasti detailidele tähelepanu küsimus. IQ Resti mobiilne töölaud maksab seda tähelepanu — alumine nav, turvatsoon, pole suumi, kohesed üleminekud — ja tulemus on midagi, mida vannutaksid, et see ehitati Swiftiga. Välja arvatud see, et see töötab ka Androidis ja pole midagi installida või rakenduste poe kaudu uuendada.",
      ctaText: "Ava IQ Rest oma telefonis ja tunne erinevust.",
      ctaButton: "Proovi tasuta 14 päeva",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "GDPR küpsiste nõusoleku banner restorani veebilehele | IQ Rest",
        description:
          "Seaduslik nõusoleku banner, AEPD-ga joondatud, ilma kolmandate osapoolte skriptideta. Küpsisteta analüütika käivitub isegi enne nõusolekut.",
      },
      title: "GDPR-vastav küpsiste nõusoleku banner",
      subtitle:
        "Eridisainiga ehitatud nõusoleku banner ilma kolmanda osapoole CMP-ta, ilma skripti sildita Cookiebotist või OneTrustist. Joondatud AEPD ja ePrivacy juhistega, küpsisteta analüütikaga, mis käivitub enne nõusolekut.",
      intro:
        "Iga ELi kommertsveebileht vajab küpsiste nõusoleku bannerit. Enamus kasutavad kolmanda osapoole CMP-sid, mis tirivad raskeid skripte ja aeglustavad lehte. IQ Rest ehitas oma kerge AEPD-joondatud nõusoleku banneri, mis on lehe paketi osa — pole täiendavaid DNS otsinguid, pole kolmanda osapoole jälgimist. Külastajad näevad selget Nõustu / Keeldu valikut, mõlema nupuga ühtlaselt stiilitud (tume muster „keeldu“ peitmiseks on paljudes ELi riikides ebaseaduslik — me ei tee seda).",
      sections: [
        {
          title: "AEPD ja ePrivacy joondatud",
          body: "Hispaania AEPD ja laiem ePrivacy direktiiv nõuavad Nõustu ja Keeldu nuppe võrdse silmapaistvusega. Paljud CMP-d pakuvad tumedat mustri vaikimisi „hiiglaslik nõustu, väike keeldu“. Keeldume sellest mustrist — mõlemad nupud on sama suurusega, sama stiiliga, ainult erinevate värvidega. Külastajad, kes keelduvad, jälgitakse ainult küpsisteta agregeeritud loendurite kaudu; me ei salvesta kunagi identifikaatorit nende seadmesse, nii et pärast keeldumist ei jää esimese osapoole küpsist.",
        },
        {
          title: "Pole kolmanda osapoole skripte",
          body: "Enamus nõusoleku bannereid laadivad Cookiebot, OneTrust või sarnaseid CDN-ist. See lisab 50-100KB JavaScripti, lisa DNS otsingu ja kolmanda osapoole andmejagamise suhte avaldamiseks teie privaatsuspoliitikas. IQ Resti banner on landinguslehe paketi osa — pole välistaotlusi, pole kolmanda osapoole andmejagamist, kiirem lehe laadimine.",
        },
        {
          title: "Privaatsus, Küpsised ja Tingimused modaalides",
          body: "Klõpsamine „Privaatsuspoliitika“, „Küpsiste poliitika“ või „Tingimused“ banneril avab modaali — pole lehe navigeerimist, pole landingu kerimispositsiooni kaotust. Täielik juriidiline tekst on seal, keritav, õigete pealkirjadega. Pärast lugemist sulge modaal ja vali Nõustu või Keeldu. Voog on kasutaja jaoks ilma hõõrdumiseta ja võimaldab vältida lisalehe hüppeid, mis kahjustaksid landingulehe konversiooni.",
        },
      ],
      benefitsTitle: "Miks meie banner ületab kolmanda osapoole CMP-sid",
      benefits: [
        "AEPD ja ePrivacy joondatud — Nõustu/Keeldu võrdse silmapaistvusega",
        "Pole kolmanda osapoole skripte, pole täiendavaid DNS otsinguid",
        "Privaatsus/Küpsised/Tingimused modaalides — pole lehe hüppeid",
        "Küpsisteta analüütika käivitub isegi enne nõusolekut — ei kaota kunagi andmeid",
        "Esimese osapoole küpsis eemaldatud Keeldumisel",
        "Kerge — landingu paketi osa",
      ],
      conclusionTitle: "Vastavus ilma konversiooni tirimist",
      conclusionBody:
        "Küpsise nõusolek on ELis mitte-läbiräägitav, kuid see ei pea sinu lehte aeglustama või konversiooni kahjustama. IQ Resti banner on kiire, õiglane ja täielikult vastavuses. Külastajad, kes Nõustuvad, lubavad seansipõhise analüütika; külastajad, kes Keelduvad, registreeruvad endiselt meie anonüümsetes agregeeritud loendurites, et teaksime, mis landingul juhtub, ilma neid kunagi tuvastamata.",
      ctaText: "Vaata nõusoleku voogu tegevuses — ava IQ Rest värskes brauseris.",
      ctaButton: "Külasta landingut",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privaatsus ja Tingimused modaalides — pole lehe hüppeid | IQ Rest",
        description:
          "Privaatsuspoliitika, Teenuse tingimused ja Küpsiste poliitika avanevad nüüd modaalides landingul — pole kerimise kaotust, pole lisanavigatsiooni.",
      },
      title: "Privaatsus, Tingimused ja Küpsiste poliitika modaalides — pole lehe hüppeid",
      subtitle:
        "Klõpsa ükskõik millisele juriidilisele lingile landingul või auth lehel ja poliitika avaneb puhtas modaalis. Pole navigatsiooni, pole kerimispositsiooni kaotust, pole konversioonivoo lõhkumist.",
      intro:
        "Iseseisvad /privacy, /terms ja /cookies lehed olid standardmuster — ja standardviga. Külastajad klõpsasid lingile, kaotasid oma koha landingul, lugesid poliitikat, seejärel unustasid tagasi tulla. Konversioon langes. IQ Rest avab nüüd kõik kolm juriidilist dokumenti lehesisestes modaalides: sama kerimispositsioon säilitatud, sama landingu kogemus katkematu, täielik juriidiline vastavus säilinud.",
      sections: [
        {
          title: "Üks Modal komponent, kolm dokumenti",
          body: "Kasutame ühte Modal komponenti dokumendi tüübi lülitiga. Ava see küpsise bannerist, auth lehelt, jaluselt — sama komponent, sama kerimise lukustamine, sama escape sulgemine. Juriidiline tekst elab jagatud TypeScript konstantides, et klausli värskendamine korra propageeruks igale kohale, kus poliitika kuvatakse. Pole dubleerimist, pole lahknemist.",
        },
        {
          title: "Modaali pinu — ava üks teise seest",
          body: "Kui loed Küpsiste poliitikat ja tahad lülituda Privaatsuspoliitikale, avab modaali sees olev link järgmise modaali peal — mitte ümbersuunamisena. Pinu käsitleb tagasinavigeerimist õigesti, escape sulgeb ülemise modaali, väljaspool klõpsamine vabandab graatsiliselt. Interaktsioon on see, mida kasutajad omake rakenduselt ootavad.",
        },
        {
          title: "Kõik 35 keelt — sama ühe allika tekst",
          body: "Juriidiline tekst ise on inglise keeles (meie juriidilise üksuse keel, autónomo Hispaanias registreeritud), kuid modaali kroom — pealkirjad, sulgemisnupp, lingi sildid — on täielikult lokaliseeritud kõigis 35 keeles. Külastajad hispaania, saksa, poola või korea keeles näevad lokaliseeritud modaali, mis avab inglise juriidilise teksti, täpselt nagu meie vastavusepõhimõte nõuab.",
        },
      ],
      benefitsTitle: "Miks modaalid ületavad iseseisvaid juriidilisi lehti",
      benefits: [
        "Pole kerimise kaotust — külastajad jäävad landingule",
        "Kõrgem konversioon — vähem tahtmatut hülgamist",
        "Üks komponent, kolm dokumenti — pole dubleerimist",
        "Modaali pinu — ava üks teise seest puhtalt",
        "Lokaliseeritud kroom 35 keeles",
        "Täielik juriidiline vastavus säilinud",
      ],
      conclusionTitle: "Juriidiline ilma hõõrdumiseta",
      conclusionBody:
        "Juristid soovivad, et poliitika oleks loetav. Turundajad soovivad, et külastaja konverteeriks. Modaalid teevad mõlemad rõõmsaks: poliitika on ühe puudutuse kaugusel, täielikult loetav, ilma mõjuta landingu voole. IQ Resti vastavusasend jääb tugevaks ilma iseseisvate juriidiliste lehtede konversioonitirimiseta.",
      ctaText: "Proovi uut voogu — ava küpsiste banner ja puuduta ükskõik millist poliitika linki.",
      ctaButton: "Külasta landingut",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Automaatne katalaani keel Kataloonia külastajatele | IQ Rest",
        description:
          "Külastajad Barcelonast, Tarragonast, Lleidast ja Gironast näevad IQ Rest automaatselt katalaani keeles, mitte kastiilia hispaania keeles.",
      },
      title: "Automaatne katalaani tuvastamine Kataloonia külastajatele",
      subtitle:
        "Külastajad Barcelonast, Tarragonast, Lleidast ja Gironast maanduvad vaikimisi IQ Resti katalaani versioonil. Ülejäänud Hispaania saab endiselt kastiilia hispaania keele.",
      intro:
        "Kataloonial on tugev keeleline identiteet — miljonid katalaanid kasutavad katalaani keelt esimese keelena, eraldatuna kastiilia hispaania keelest. IQ Rest austab nüüd seda eristust geo tasemel: külastajad, kelle IP geolokaliseerub katalaani provintsi, saavad /ca landingulehe automaatselt. Kastiilia hispaania jääb vaikimisi ülejäänud Hispaaniale. Külastajad saavad keelt vahetada igal ajal jaluse keelemodaali kaudu.",
      sections: [
        {
          title: "Geo-tuvastamine servas",
          body: "Loeme külastaja riigi ja piirkonna meie nginx geo moodulist iga taotluse korral. Kui riik on Hispaania ja piirkond vastab Barcelonale, Tarragonale, Lleidale või Gironale (või sisaldab piirkonnanimes „Catalonia“ / „Catalunya“), suuname nad /ca-le. Vastasel juhul järgib külastaja standardset riik-keel suunamist ja maandub sobivale keele lehele.",
        },
        {
          title: "Keele küpsis tühistab geo",
          body: "Kui valid keele käsitsi keelelüliti kaudu, püsib sinu valik küpsises, mis tühistab tulevaste külastuste geo. Katalaani keelt rääkiv külastaja, kes eelistab IQ Restit inglise keeles lugeda, ei suunata pidevalt /ca-le — tema selge valik võidab alati. Geo on vaikeväärtus, mitte piirang.",
        },
        {
          title: "Täielik katalaani tõlge, mitte automaatne tõlge",
          body: "/ca landinguleht pole automaatselt hispaania keelest tõlgitud — iga sõna on professionaalselt tõlgitud katalaani keelt rääkivate restoranitööstuse copywriterite poolt. Külalislahkuse terminoloogia, maksetingimused, kultuurilised viited kõik vastavad sellele, kuidas katalaani restoraniomanik tegelikult räägib. Leht loetakse, nagu oleks see kirjutatud turule, sest see oligi.",
        },
      ],
      benefitsTitle: "Miks automaatne katalaani loeb",
      benefits: [
        "Külastajad Barcelonast/Tarragonast/Lleidast/Gironast näevad katalaani automaatselt",
        "Ülejäänud Hispaania saab endiselt kastiilia hispaania — pole liigset suunamist",
        "Käsitsi keelevalik püsib küpsise kaudu",
        "Täielik professionaalne tõlge, mitte masintõlge",
        "Geo-tuvastamine toimub servas — pole kliendipoolset värelust",
        "Sama konversiooniks häälestatud landing nagu iga teine keel",
      ],
      conclusionTitle: "Keelelise identiteedi austamine",
      conclusionBody:
        "Kataloonia külastajate vaikimisi kastiilia hispaania keelele on tehniliselt väike asi, kuid poliitiliselt ja kultuuriliselt suur asi. IQ Resti geo-suunamine kohtleb nüüd katalaani keelt esmaklassilise keelena Kataloonia külastajatele. Tulemus: kõrgemini konverteeruv landing katalaani keelt rääkivatele restoraniomanikele, kes tunnevad end austatuna esimesest sekundist, kui meie veebilehte näevad.",
      ctaText: "Külasta IQ Restit Katalooniast ja näe lehte oma keeles.",
      ctaButton: "Ava katalaani landing",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Proovi aegunud modaal — QR menüü jääb avalikuks | IQ Rest",
        description:
          "Kui sinu proov lõpeb, ei kao sinu menüü. Külalised saavad endiselt skannida ja vaadata; sa näed töölaual uuendamise modaali.",
      },
      title: "Proov aegunud? Sinu QR menüü jääb külalistele live",
      subtitle:
        "Proovi aegumine ei tapa enam sinu avalikku menüüd. Külalised saavad endiselt skannida ja vaadata; ainult sinu töölaud kutsub sind uuendama. Pole üllatuslikku katkestust teeninduse keskel.",
      intro:
        "Vana proovi aegumise käitumine oli karm: kui sinu 14 päeva lõppesid, läks sinu avalik QR menüü külalistele tumedaks. Kui juhtusid teeninduse keskel olema, oli see katastroof. Muutsime selle. Nüüd näitab proovi aegumine sulle töölaual modaali, mis kutsub uuendama, kuid sinu avalik menüü jätkab külaliste teenindamist normaalselt. Uuendad, kui oled valmis, mitte siis, kui külaline lehvitab telefoni laual oleva QR-koodi peal.",
      sections: [
        {
          title: "Avalik menüü jääb live",
          body: "14-päevane proov lõpeb külalise vaatenurgast vaikselt. QR menüü, online tellimine, broneeringud — kõik jätkab tööd. Omanik näeb uuendamise modaali järgmisel töölaua sisselogimisel. See lahutamine tähendab, et proovi aegumine ei saa kunagi teenindust katkestada või sind klientide ees häbistada.",
        },
        {
          title: "Modaal töölaual, mitte kõva ümbersuunamine",
          body: "Varem suunas proovi aegumine töölaua arvelduse lehele. See lõhkus sügavad lingid ja segas kasutajaid, kes tõugati keset ülesannet. Nüüd näitame puhast modaali: „Sinu proov on lõppenud. Vali plaan, et jätkata täiustatud funktsioonide kasutamist.“ Modaali saab tagasi lükata; saad jätkata töölaual navigeerimist, kuid uued tegevused, mis nõuavad tasulist plaani, näitavad reasiseseid upselli viipasid.",
        },
        {
          title: "Eelvaade alati saadaval",
          body: "Isegi aegunud proovis saad endiselt oma QR menüüd töölaualt eelvaadata. Me ei lukusta sind selle nägemisest, mida külalised näevad. Redigeeri menüüd, eelvaata tulemust — ainult avaldamisega seotud tegevused vihjavad uuendamisele. See hoiab töölaua produktiivsena isegi otsuse keskel, et ei kaotaks juurdepääsu plaanide võrdlemisel.",
        },
      ],
      benefitsTitle: "Miks pehme aegumine ületab kõva katkestuse",
      benefits: [
        "Avalik QR menüü jääb külalistele live",
        "Pole üllatuslikku katkestust teeninduse keskel",
        "Modaal töölaual sundliku arvelduse ümbersuunamise asemel",
        "Eelvaade alati saadaval olenemata plaani olekust",
        "Reasisene upselli vihjed asendavad järsku blokeerimist",
        "Omanik uuendab oma graafiku järgi",
      ],
      conclusionTitle: "Austage restorani tööaega",
      conclusionBody:
        "Restoranid töötavad kitsaste marginaalide ja veel kitsamate graafikute peal. QR menüü, mis kukub maha, sest tasuta proov aegus, on hullem kui proovi piir ise — kahjustab usaldust. Pehme aegumine hoiab tuled külaliste jaoks põlema, ajades omaniku endiselt tasulise plaani poole. Konversioonid jäävad kõrgeks; katkestus langeb nullini.",
      ctaText: "Alusta 14-päevast proovi teadmisega, et sinu menüü jääb live, mis ka ei juhtuks.",
      ctaButton: "Alusta tasuta proovi",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Selgem menüü redaktori terminoloogia | IQ Rest",
        description:
          "Nimetasime „Item“ ümber „Dish“-iks töölaual. Restoraniomanikud ei tohiks pidada peast üldist SaaS terminoloogiat tõlkima.",
      },
      title: "Item → Dish: Selgem terminoloogia redaktoris",
      subtitle:
        "Asendasime üldise „Item“ sildi „Dish“-iga igal töölaua pinnal. Väike muudatus, suur selguse tõus restoraniomanikele, kes ei räägi SaaS-i.",
      intro:
        "Tarkvara inimesed ütlevad „item“. Restorani inimesed ütlevad „dish“ (roog). Mittekokkulangevus oli väike, kuid pidev — iga kord, kui näitasime „Add Item“, pidi omanik selle peast „Add Dish“-ks tõlkima. Nimetasime kõik ümber: nupud, sildid, edusõnumid, veaolekud, lehe pealkirjad. Töölaud räägib nüüd sama keelt nagu inimesed, kes seda kasutavad.",
      sections: [
        {
          title: "Kus ümbernimetamine kehtib",
          body: "Iga kasutajale suunatud pind: „Add Item“ sai „Add Dish“. Sakk „Items“ menüüs sai „Dishes“. „Item Settings“ said „Dish Settings“. Edusõnumid („Item created“) said („Dish created“). Vormi valideerimise vead, leivapuru, töölaua pealkirjad — kõik uuendatud. Andmebaasi sisemine veerg on endiselt „item“ taas-ühilduvuse jaoks, kuid ükski kasutaja ei näe seda kunagi.",
        },
        {
          title: "Tõlgitud kõigis 35 keeles",
          body: "Igal keelel on oma õige sõna „dish“ jaoks, mis erineb „item“-ist. Hispaania „plato“, prantsuse „plat“, saksa „Gericht“, itaalia „piatto“, katalaani „plat“, jaapani „料理“. Uuendasime tõlke võtme igas keeles ja kontrollisime, et tulemus loeks loomulikult igas keeles. Pole masintõlget; emakeelena rääkijad vaatasid igaüht üle.",
        },
        {
          title: "Vaikekategooria automaatselt ka loodud",
          body: "Kui olime redaktoris, lõime ka automaatselt vaikekategooria nimega „Menu“ esimesel töölaua külastusel. Vana käitumine: omanikud maandusid tühjale menüüle, pidid klõpsama „Add Category“ enne kui said roogi lisada, andsid sageli alla. Uus käitumine: Menu kategooria eksisteerib, puudutad „Add Dish“, redigeerid kohe. Üks barjäär eemaldatud.",
        },
      ],
      benefitsTitle: "Miks terminoloogia loeb",
      benefits: [
        "„Dish“ vastab sellele, kuidas restoraniomanikud tegelikult räägivad",
        "Uuendatud igal töölaua pinnal — nupud, sildid, edusõnumid",
        "Tõlgitud kõigis 35 keeles emakeelena rääkijate poolt",
        "Vaikekategooria automaatselt loodud — pole tühja menüüd alustamiseks",
        "Kiirem registreerumisest esimese roa lisamiseni",
        "Vähem mentaalset tõlget = madalam hülgamine onboardingul",
      ],
      conclusionTitle: "Räägi kasutaja keelt",
      conclusionBody:
        "Üldine SaaS terminoloogia („item“, „entity“, „object“) on insenerile sobiv. Restoraniomanikud vajavad sõnu, mis vastavad sellele, mida nad tööl ütlevad. IQ Rest räägib nüüd sama keelt nagu inimesed, kes seda kasutavad — igas nupus, sildil ja teavituses — ja konversiooniandmed peegeldavad muutust juba.",
      ctaText: "Registreeru ja lisa oma esimene roog vähem kui minutiga.",
      ctaButton: "Ehita minu menüü",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Automaatne vaikekategooria restorani menüü onboardingul | IQ Rest",
        description:
          "Esmakasutajad ei seisa enam silmitsi tühja menüüga. IQ Rest loob automaatselt vaikekategooria, et saaksid kohe esimese roa lisada.",
      },
      title: "Automaatne vaikekategooria — Vahele tühja menüü",
      subtitle:
        "Esmakasutajad maanduvad menüüle ühe vaikekategooriaga juba loodud. Puuduta „Add Dish“ ja alusta redigeerimist. Pole enam „loo kategooria esmalt“ barjääri.",
      intro:
        "Vana onboarding nõudis kasutajatelt kategooria loomist enne roa lisamist. Tühjad menüüd on hirmutavad — paljud uued kasutajad andsid sel hetkel alla. IQ Rest loob nüüd automaatselt vaikekategooria „Menu“ esimesel korral kui töölaua avad, et esimene tegevus, mille teed, oleks roa lisamine, mitte hierarhia konfigureerimine. Kiirem, sujuvam, rohkem menüüsid tegelikult ehitatud.",
      sections: [
        {
          title: "Vaikekategooria loodud sisselogimisel",
          body: "Esimesel korral kui logid värskele töölauale sisse, kontrollib IQ Rest, kas sul on kategooriaid. Kui ei, loob ühe nimega „Menu“ (tõlgitud sinu keelde). Kategooria on kohe valmis roogi vastu võtma. Saad selle igal ajal ümber nimetada või lisada rohkem kategooriaid — kuid sa ei pea seda enne oma esimese roa lisamist tegema.",
        },
        {
          title: "Ümber nimetatud sobima sinu köögiga, kui kasutad viisardit",
          body: "Kui kasutasid 3-sammulist registreerumisviisardit, genereerib külv selle asemel köögile sobivaid kategooriaid — „Pizza“, „Pasta“, „Antipasti“ itaalia jaoks; „Sushi“, „Ramen“, „Sake“ jaapani jaoks. Automaatne vaikekategooria „Menu“ rakendub ainult kasutajatele, kes jätsid viisardi vahele või registreerusid Google'i kaudu otse.",
        },
        {
          title: "Taas-ühilduv olemasolevate menüüdega",
          body: "Kui sul juba on kategooriaid — varasemast kasutusest, imporditud andmetest, külvist — vaikeväärtust ei looda. Sekkume ainult siis, kui menüü on tõeliselt tühi. Olemasolevad kasutajad ei näe oma menüü struktuuris muutust.",
        },
      ],
      benefitsTitle: "Miks automaatne vaikeväärtus kiirendab onboardingut",
      benefits: [
        "Pole „loo kategooria esmalt“ barjääri uutele kasutajatele",
        "Puuduta „Add Dish“ kui esimest tegevust, mitte teist",
        "Kategooria nimetatud sinu keeles, mitte vaikimisi inglise",
        "Viisardi voog külvab endiselt köögile sobivaid kategooriaid",
        "Olemasolevad menüüd puutumata",
        "Kiirem sisselogimisest esimese roa lisamiseni",
      ],
      conclusionTitle: "Eemalda tühi olek",
      conclusionBody:
        "Tühjad olekud on koht, kus uued kasutajad hülgavad. Iga barjäär kasutaja ja nende esimese produktiivse tegevuse vahel maksab sulle konversioone. Vaikekategooria automaatne loomine eemaldab sellise barjääri. See on väike muudatus mõõdetava mõjuga sellele, kui kiiresti uued restoranid jõuavad avaldatava menüüni.",
      ctaText: "Registreeru ja alusta kohe roogade lisamist.",
      ctaButton: "Ehita minu menüü",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Vahele restorani nime samm onboardingul | IQ Rest",
        description:
          "Loobusime „restorani nime“ sammust onboardingul. Sea see hiljem seadetes — või otse menüü hero'st, mida niikuinii redigeerid.",
      },
      title: "Vahele restorani nime samm onboardingul",
      subtitle:
        "Sa ei pea sisestama oma restorani nime, et alustada menüü ehitamist. Loobusime sellest onboardingu sammust — sea nimi hiljem töölaualt või live menüü hero kaudu.",
      intro:
        "Onboardingu vood, mis nõuavad infot ette, tunduvad nagu vormi täitmine. Vana IQ Rest onboarding küsis restorani nime esimesel sammul. Uued kasutajad polnud sageli otsustanud täpset õigekirja, brändivariandi või kirjavahemärke — nii nad jäid kinni juba enne töölaua nägemist. Eemaldasime sammu. Registreeru, maandud töölaual, sea nimi, kui valmis oled. Menüü töötab endiselt hästi ilma selleta.",
      sections: [
        {
          title: "Mis juhtub, kui vahele jätad",
          body: "Kui vahele jätad nime sammu, saab restoran kohatäite („Your Restaurant“), mis on avalikus menüüs vaikimisi peidetud. Külalised, kes su QR-koodi skannivad, näevad menüüd ilma nimeta hero's — mis on ausalt öeldes paljudele kiirteenindusele sobivate kohtadele hea. Kohe kui seadetes nime määrad, ilmub see hero's, lehe pealkirjas, SEO slug'is ja sotsiaalsetes jagamistes.",
        },
        {
          title: "Sea see kõikjalt",
          body: "Nime väli on redigeeritav seadetest, menüü hero'st (puuduta reasisene redigeerimine) ja avaliku eelvaate ekraanilt. Kolm erinevat pinda, üks aluseväli. Tegime lihtsaks otsuse edasi lükkamise ja triviaalseks pühendumiseks, kui valmis oled.",
        },
        {
          title: "Pole SEO trahvi vaikimisi väärtuse eest",
          body: "Kasutame slug'i („your-restaurant“) lehe pealkirja ja SEO meta tagide tagavarana, kuni päris nime määrad. Otsingumootorid ei karista sind — nad lihtsalt näevad üldist pealkirja. Hetkel kui päris nime määrad, uuendub iga meta tag ja Google indekseerib uuesti tundide jooksul.",
        },
      ],
      benefitsTitle: "Miks vahele jätmine kiirendab onboardingut",
      benefits: [
        "Pole otsustamise survet vales hetkes",
        "Maandud töölaual kiiremini",
        "Sea nimi, kui inspiratsioon tuleb — või kui juriidiline üksus on registreeritud",
        "Reasisene redigeerimine menüü hero'st",
        "Avalik menüü töötab hästi ilma seatud nimeta",
        "Pole SEO trahvi kohatäite kasutamise eest",
      ],
      conclusionTitle: "Vähem otsuseid, rohkem tehtud",
      conclusionBody:
        "Iga vormi väli onboardingul on kasutaja jaoks võimalus hüljata. Restorani nime välja eemaldamisega eemaldasime ühe sellise võimaluse. Uued kasutajad maanduvad nüüd töölaual töötava menüüga ja vabadusega oma restorani nimetada (või mitte nimetada) oma graafiku järgi. Konversiooni tõus oli kohene.",
      ctaText: "Registreeru sekunditega — pole restorani nime vaja.",
      ctaButton: "Alusta tasuta proovi",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Proovi restorani QR menüüd enne registreerumist — anonüümselt | IQ Rest",
        description:
          "Ehita näidismenüü enne konto loomist. Salvesta oma edenemine e-mailile, kui tahad seda säilitada. Pole pühendumist, pole hõõrdumist.",
      },
      title: "Proovi QR menüüd enne registreerumist",
      subtitle:
        "Ehita näidismenüü, vaata kuidas su QR-kood välja näeb, eelvaata live kogemust — kõik enne konto loomist. Salvesta edenemine e-maili lingi kaudu, kui valmis oled.",
      intro:
        "Enamus QR menüü teenuseid nõuab, et lood konto enne kui saad midagi teha. See on vale järjekord. Uued restoraniomanikud tahavad esmalt toodet tunda — näha kuidas roog välja näeb, kuidas QR skannimise voog tundub — ja alles siis pühenduda registreerumisele. IQ Rest laseb sul nüüd ehitada täielik näidismenüü anonüümselt. Kui tahad seda säilitada, salvestame su e-mailile. Hõõrdumiseta, pühendumiseta.",
      sections: [
        {
          title: "Anonüümne seanss salvestab su töö",
          body: "Anonüümne seansi ID luuakse esimesel külastusel ja salvestatakse küpsises. Iga kategooria, mille lisad, iga roog, mille lood, iga foto, mille üles laadid, on selle seansiga seotud. Saad lehelt lahkuda, tagasi tulla ja su menüü on endiselt seal. Hoiame seanssi 7 päeva — küllaldane aeg toote hindamiseks ilma surveta.",
        },
        {
          title: "Salvesta edenemine e-maili lingi kaudu",
          body: "Kui otsustad, et tahad menüüd säilitada, klõpsa „Save Progress“. Sisesta oma e-mail. Saadame sulle maagilise lingi, mis klõpsamisel teisendab anonüümse seansi päris kontoks, mis on su e-mailiga seotud. Kogu su töö kantakse automaatselt üle — pole uuesti sisestamist, pole kaotatud edenemist, pole „uppsi, kustus“. Konversioon tasuvaks kliendiks toimub sinu tingimustel.",
        },
        {
          title: "Vähendab registreerumise ärevust nullini",
          body: "Lubades kasutajatel proovida enne registreerumist, pöörame tüüpilise SaaS mustri ümber. Külastajad ei pea otsustama, kas IQ Rest on nende e-maili väärt — nad näevad ise. Restoranid, kes proovivad anonüümselt ja siis registreeruvad, konverteerivad kõrgemalt kui restoranid, kes on sunnitud esmalt registreeruma, sest nad on juba menüüsse investeerinud ja ei taha seda kaotada.",
        },
      ],
      benefitsTitle: "Miks anonüümne onboarding võidab",
      benefits: [
        "Ehita päris menüü ilma kontot loomata",
        "Anonüümne seanss püsib 7 päeva",
        "Salvesta edenemine e-mailile, kui otsustad pühenduda",
        "Pole uuesti sisestamist — töö kantakse päris kontosse üle",
        "Hõõrdumiseta toote hindamine",
        "Kõrgem üldine registreerumise konversioon",
      ],
      conclusionTitle: "Lase tootel end ise müüa",
      conclusionBody:
        "Parim viis veenda restoraniomanikku, et IQ Rest on neile sobiv, on lasta neil seda kasutada. Anonüümne onboarding muudab uudishimuliku külastaja kaasahaaratud kasutajaks ilma midagi vastutasuks küsimata. Hetkeks kui e-maili küsid, on kasutaja juba aega oma menüüsse investeerinud — selle salvestamine ei maksa neile midagi ja nad säilitavad selle, mille ehitasid.",
      ctaText: "Proovi IQ Resti nüüd — pole kontot vaja.",
      ctaButton: "Proovi tasuta",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Salvesta restorani menüü edenemine e-maili lingi kaudu | IQ Rest",
        description:
          "Ehitasid näidismenüü anonüümselt? Salvesta see e-mailile ja saadame sulle maagilise lingi konto omandamiseks.",
      },
      title: "Salvesta oma menüü edenemine e-maili lingi kaudu",
      subtitle:
        "Ehitasid menüü anonüümselt ja tahad seda säilitada? Sisesta oma e-mail. Saadame maagilise lingi, mis muudab su anonüümse töö päris kontoks ühe puudutusega.",
      intro:
        "Kui oled veetnud viis minutit näidismenüü ehitamisel ilma kontota, ei taha sa seda kaotada. IQ Resti „Save Progress“ funktsioon teisendab su anonüümse seansi päris kontoks maagilise lingi kaudu. Sisesta oma e-mail, klõpsa lingile postkastis, su menüü on püsivalt su kontoga seotud. Pole parooli, pole registreerumisvormi, pole andmete uuesti sisestamist.",
      sections: [
        {
          title: "Maagilise lingi voog — pole parooli",
          body: "Saadame ühekordse lingi su e-mailile. Klõpsa sellele 10 minuti jooksul ja oled sisse logitud uude kontosse, mis sisaldab anonüümselt ehitatud menüüd. Pole parooli valida, pole turvaküsimusi, pole e-maili kontrollimise sammu — lingi klõpsamine ON kontroll. Seejärel väljastame seansi küpsise ja oled töölaual sees, kogu su töö säilitatud.",
        },
        {
          title: "Konflikti käsitlemine olemasolevate kontode jaoks",
          body: "Kui sisestatud e-mailil on juba konto, ei kirjuta üle. Saadame lingi, klõpsad ja küsime, kas anonüümne menüü olemasolevasse kontosse liita või see ära visata. Enamus kasutajaid valib liitmise — su olemasolevad road jäävad alles, anonüümsest redigeerimisest pärit uued lisatakse. Selge, turvaline, prognoositav.",
        },
        {
          title: "Määraga piiratud ja spämi-vastupidav",
          body: "Piirame save-progress päringud IP ja e-maili kohta määraga, et vältida väärkasutust. Link aegub 10 minutiga ja on ühekordseks kasutuseks. Kui keegi teine üritab su anonüümset seanssi omandada, vajavad nad ligipääsu su postkasti — sama turvamudel nagu igal kaasaegsel maagilise lingi auth voo.",
        },
      ],
      benefitsTitle: "Miks maagilise lingi salvestamine võidab",
      benefits: [
        "Pole parooli valida, meeles pidada või lähtestada",
        "Anonüümne töö kantakse puutumatult su päris kontosse",
        "Olemasolevad kontod: vali liita või visata",
        "Määraga piiratud ja ajaliselt piiratud — turvaline disainilt",
        "Üks puudutus pühendumiseks — pole registreerumisvormi",
        "E-mail ise toimib kontrollimissammuna",
      ],
      conclusionTitle: "Konversioon ilma hõõrdumiseta",
      conclusionBody:
        "Hetk, kui kasutaja tahab anonüümsest tuvastatuks teisendada, on hetk, kui ta kõige tõenäolisemalt pikast registreerumisvormist hülgab. Maagilised lingid voltivad selle vormi ühte e-maili väljasse pluss postkasti klõps. Kasutaja kulutab 30 sekundit ja lõpetab päris, püsiva kontoga, mis sisaldab kõike, mida ta ehitas. See on madalaima hõõrdumisega konversioonivoog QR menüü tööstuses.",
      ctaText: "Ehita menüü anonüümselt, siis salvesta e-maili kaudu, kui valmis oled.",
      ctaButton: "Proovi tasuta",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Ühe klõpsuga Stripe checkout naasvatele kasutajatele | IQ Rest",
        description:
          "Juba sisse logitud? Klõpsa hinnastamises plaanile ja mine otse Stripe checkout'i. Pole konto info uuesti sisestamist, pole lisaekraane.",
      },
      title: "Ühe klõpsuga Stripe checkout naasvatele kasutajatele",
      subtitle:
        "Sisse logitud kasutaja klõpsab plaanile? Otse Stripe checkout'i, pole lisakinnitusekraani. Kaks klõpsu hinnastamise lehelt aktiivse tellimuseni.",
      intro:
        "Naasvad kasutajad, kellel on juba IQ Rest konto, ei peaks uuendamisel midagi uuesti kinnitama. Eemaldasime iga vahepealse ekraani „klõpsa plaanile hinnastamises“ ja „maandud Stripe checkout'is“ vahel. Kaks klõpsu kokku: vali plaan, sisesta kaardi andmed. Tellimus on aktiivne enne kui kohvi lõpetad.",
      sections: [
        {
          title: "Tuvasta sisselogitud olek hinnastamises",
          body: "Meie hinnastamise leht kontrollib autenditud seansi küpsist laadimisel. Kui oled sisse logitud, plaani nupud jätavad „registreeru esmalt“ ümbersõidu vahele ja lähevad otse /api/stripe/checkout'i, mis loob Stripe Checkout Session'i ja tagastab URL ümbersuunamiseks. Kui pole sisse logitud, viivad nupud sind standardse registreerumisvoo läbi esmalt — pole käitumusliku muutust uutele kasutajatele.",
        },
        {
          title: "UI keel edastatud Stripe'i",
          body: "Su töölaua keel edastatakse Stripe Checkout'i locale parameetri kaudu, et checkout leht renderdaks su keeles. Hispaania kasutajad näevad Stripe'i hispaania keeles; saksa kasutajad näevad Stripe'i saksa keeles. Checkout voog tundub sujuvana, sest see ei katkesta kunagi keele järjepidevust su töölaualt.",
        },
        {
          title: "Tagastus URL maandab sind tagasi töölauale",
          body: "Pärast edukat makset suunab Stripe tagastus URL-ile, mille seame töölaua juurele su keeles (nt /es/dashboard). Webhook uuendab su tellimuse oleku serveripoolselt enne saabumist, nii et töölaud, millele maandud, peegeldab juba uut plaani — pole „ootel“ olekut, pole uuendamata sisu välku.",
        },
      ],
      benefitsTitle: "Miks ühe klõpsu checkout konverteerib",
      benefits: [
        "Kaks klõpsu hinnastamisest aktiivse tellimuseni",
        "Pole „kinnita oma konto“ vahepealset sisse logitud kasutajatele",
        "Stripe checkout näidatud su töölaua keeles",
        "Tagastus URL maandab sind uuendatud töölauale",
        "Webhook uuendab plaani enne saabumist — pole värisemist",
        "Uued kasutajad saavad endiselt standardse registreerumine → uuendamine voo",
      ],
      conclusionTitle: "Tee lihtne tee triviaalselt lihtsaks",
      conclusionBody:
        "Kasutaja, kes on juba veendunud, ei vaja rohkem veenmist — vajab vähem klõpse. Ühe klõpsu checkout eemaldab iga ekraani kavatsuse ja makse vahel naasvate kasutajate jaoks. Tulemus: kõrgem trial-tasuvaks konversioon, vähem hüljatud uuendusi, kiirem sissetulekute tunnustamine tellimuse laienemiseks.",
      ctaText: "Juba kasutaja? Vali oma plaan ja uuenda kahe klõpsuga.",
      ctaButton: "Vaata hindu",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Töölaua UI ümberdisain: Kaardid, Navigatsioon ja Vormid | IQ Rest",
        description:
          "IQ Rest töölaud ümber disainitud järjepidevate kaardi komponentidega, püsiva külgriba navigatsiooniga aktiivse lehe esiletõstmisega ja täiustatud vormi tegevustega.",
      },
      title: "Töölaua UI ümberdisain: Järjepidevad kaardid, navigatsioon ja vormi tegevused",
      subtitle:
        "Lihvitud töölaud ühtse kaardi stiiliga, püsiva külgriba navigatsiooniga, rõhuvärviga aktiivsete olekutega ja alumiste salvesta/kustuta tegevustega igal vormi lehel.",
      intro:
        "IQ Rest on läbinud põhjaliku töölaua UI ümberdisaini. Iga leht kasutab nüüd järjepidevat kaardi stiili ühtsete piiri raadiustega, püsivat külgriba navigatsiooni rõhuvärviga aktiivsete olekutega ja täiustatud vormi lehti alumiste salvesta ja kustuta tegevustega. Tulemus on puhtam, lihvitum kogemus restorani digitaalse QR menüü haldamiseks.",
      sections: [
        {
          title: "Järjepidev kaardi disain kõigil lehtedel",
          body: "Iga töölaua leht kasutab nüüd ühtset DashboardCard komponenti järjepidevate ümarate piiridega, peenete taustavärvidega ja valikuliste sektsiooni pealkirjadega. Analüütika, arveldus, seaded, kontaktid, broneeringute seaded ja kõik vormi lehed jagavad sama visuaalset keelt. Vihjesildid popover tooltippidega asendavad reasisese kirjelduse teksti, hoides liidese puhtana, pakkudes endiselt abivajalikku konteksti.",
        },
        {
          title: "Püsiv külgriba navigatsioon aktiivsete olekutega",
          body: "Töölaua ekraanidel on püsiv külgriba navigatsioon nüüd nähtav igal lehel. Aktiivne leht on esile tõstetud rõhuvärvi taustaga, tehes kohe selgeks, kus oled. Alamlehed nagu kategooriad, üksused ja tellimused tõstavad õigesti esile vanema Menu üksuse. Külgriba sisaldab kiirjuurdepääsu Menüüle, Print QR, Broneeringud, Analüütika, Seaded, Kontaktid, Arveldus ja Tugi — kõik ilma praegust vaadet lahkumata.",
        },
        {
          title: "Täiustatud vormi lehed alumiste tegevustega",
          body: "Kõik vormi lehed — kategooriad, üksused, lauad, disain, seaded, kontaktid ja broneeringute seaded — sisaldavad nüüd duplitseeritud salvestamise nuppu allosas rõhuvärvis. Kustutamise nupud ilmuvad vasakul küljel summutatud stiiliga. See tähendab, et sa ei pea enam ülespoole kerima oma muudatuste salvestamiseks. Logi välja nupp on liigutatud külgribast disaini lehe allossa, hoides navigatsiooni keskendatuna olulistele tegevustele.",
        },
      ],
      benefitsTitle: "UI ümberdisaini eelised",
      benefits: [
        "Ühtne kaardi stiil järjepidevate piiride ja taustadega kõigil lehtedel",
        "Püsiv külgriba navigatsioon töölaual rõhuvärviga aktiivsete olekutega",
        "Alumised salvestamise nupud kõigil vormidel — pole vaja üles kerida salvestamiseks",
        "Kustutamise ja salvestamise tegevused selgelt eraldatud — kustuta vasakul, salvesta paremal",
        "Sektsiooni pealkirjad vormi kaartidel parema visuaalse korralduse jaoks",
        "Puhtam analüütika leht DashboardCard ümbritsejatega ja täiustatud seadme statistika paigutusega",
      ],
      conclusionTitle: "Lihvitum töölaua kogemus",
      conclusionBody:
        "See UI ümberdisain toob visuaalse järjepidevuse ja täiustatud kasutatavuse iga IQ Rest töölaua nurka. Olgu sa redigeerimas menüü üksusi, kontrollimas analüütikat või haldamas broneeringuid, liides tundub sidus ja intuitiivne. Koos püsiva külgriba navigatsiooniga on restorani digitaalse QR menüü haldamine kiirem ja meeldivam kui kunagi varem.",
      ctaText: "Koge ümber disainitud töölauda",
      ctaButton: "Ava töölaud",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("AI Menu Scanner — Loo digitaalne QR menüü ühe fotoga"),
    "redesigned-dashboard-qr-menu-management": stub("Ümber disainitud töölaud QR menüü haldamiseks"),
    "reservation-emails-analytics-digital-qr-menu": stub("Broneeringute e-mailid ja analüütika sinu digitaalse QR menüü jaoks"),
    "multi-currency-geo-pricing-qr-menu": stub("Mitme valuuta geo-hinnastamine sinu QR menüüle"),
    "support-qr-menu-restaurant-cafe": stub("Rakendusesisene tugi sinu QR menüüle"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Detailne analüütika sinu QR menüü veebilehele"),
    "instant-qr-menu-restaurant-website-generator": stub("Kohene QR menüü ja restorani veebilehe generaator"),
    "subscription-plans-qr-menu-restaurant-website": stub("Tellimuse plaanid sinu QR menüüle"),
    "public-restaurant-qr-menu-website": stub("Avalik restorani QR menüü veebileht"),
    "add-items-restaurant-qr-menu-website": stub("Lisa üksusi oma QR menüüsse sekunditega"),
    "qr-menu-restaurant-categories": stub("Kategooriad sinu restorani QR menüüle"),
    "easy-qr-menu-cafe-control-panel": stub("Lihtne QR menüü kohviku juhtpaneel"),
    "faq-page-organization": stub("KKK lehe korraldus"),
    "free-restaurant-website-improvements": stub("Tasuta restorani veebilehe parendused"),
    "user-authentication-interface": stub("Kasutaja autentimise liides"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Eelised",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Proovi IQ Restit",
    ctaButton: "Alusta tasuta proovi",
  };
}
