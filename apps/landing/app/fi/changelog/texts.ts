import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Muutosloki — IQ Rest -päivitykset ja uudet ominaisuudet",
    description:
      "Jokainen IQ Rest -julkaisu yhdessä paikassa. Uusia ominaisuuksia, AI-parannuksia ja tuotelanseerauksia ravintoloiden QR-ruokalistoihin, online-tilauksiin ja varauksiin.",
  },
  pageTitle: "Muutosloki",
  pageSubtitle:
    "Jokainen julkaisemamme päivitys, joka tekee ravintolasi QR-ruokalistasta, online-tilauksista ja varauksista sujuvampia. Uusin ensin.",
  readMore: "Lue lisää",
  backToList: "Takaisin muutoslokiin",
  publishedOn: "Julkaistu",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "AI-ruokakuvia ravintolan QR-ruokalistalle | IQ Rest",
        description:
          "Generoi tyyliltään yhtenäiset ruokakuvat koko QR-ruokalistallesi yhdellä klikkauksella. Ei stock-kuvia, ei valokuvaajaa, ei muokkausta.",
      },
      title: "AI-generoidut ruokakuvat koko QR-ruokalistallesi",
      subtitle:
        "Lopeta stock-gallerioiden selaaminen ja kuvaussessioiden aikatauluttaminen. IQ Rest generoi nyt täydellisen sarjan herkullisia ruokakuvia yhtenäisessä tyylissä — suoraan ruokiesi nimistä.",
      intro:
        "Jokaisen ruokalistan ruoan kuvaaminen on kallista, hidasta ja harvoin yhtenäistä. Stock-kuvakirjastot jättävät aukkoja eikä tyyli koskaan täysin sovi brändiisi. IQ Rest sulkee tämän aukon sisäänrakennetulla AI-ruokavalokuvauksella: kirjoita ruoan nimi, saat korkealaatuisen kuvan, joka sopii muuhun ruokalistasi ulkoasuun. Jokainen kuva generoidaan erityisesti sinulle, mitoitettu sekä QR-ruokalistalle että tulostettaviin formaatteihin.",
      sections: [
        {
          title: "Yksi kuvatyyli koko ruokalistalla",
          body: "Kun vieraat selaavat ruokalistaa, yhteensopimattomat tyylit rikkovat kokemuksen — yksi kirkas, yksi synkkä, yksi ylhäältä, yksi sivulta. IQ Rest generoi jokaisen kuvan yhdessä brändi-yhtenäisessä tyylissä: sama valaistuksen suunta, sama lautaskieli, sama taustan tunnelma. Tulos tuntuu oikealta kuvaussessiolta, paitsi että jokainen ruoka renderöitiin sillä hetkellä, kun lisäsit sen ruokalistalle. Kun lisäät uusia ruokia, tyyli säilyy automaattisesti.",
        },
        {
          title: "Ruoan nimestä lautaselle sekunneissa",
          body: "Mitään ei tarvitse briiffata. Lisäät ruoan — vaikka „Tryffeli-tagliatelle metsäsienillä“ — ja IQ Rest luo kuvan kulissien takana. Kuva ladataan ruokalistallesi, optimoidaan WebP-muotoon ja on valmis näytettäväksi ennen kuin lopetat seuraavan ruoan lisäämisen. Jos kuva ei aivan vastaa mielikuvaasi, generoi se uudelleen yhdellä napautuksella. Jokainen ravintola saa ilmaisia AI-generaatioita aloittamiseen, edullisilla täydennyksillä jos haluat kuvia koko 80 ruoan ruokalistalle.",
        },
        {
          title: "Optimoitu mobiilille ja SEO:lle",
          body: "Jokainen generoitu kuva koodataan pakattuna WebP:nä 80% laadulla, sitten tarjoillaan Hetznerin CDN:ltä Nürnbergistä älykkäällä subsamplingilla. Sivut pysyvät nopeina 4G:llä, ei luurankoja, ei layout-hyppyjä. Kuvat ovat myös Google Imagesin indeksoitavissa — vieraat, jotka etsivät ruokiesi nimiä kuvalla, voivat löytää ruokalistasi suoraan.",
        },
      ],
      benefitsTitle: "Miksi AI-ruokakuvat ovat tärkeitä",
      benefits: [
        "Ei stock-kuvatilauksia eikä valokuvaajan palkkioita",
        "Brändi-yhtenäinen tyyli jokaiselle ruokalistan ruoalle",
        "Uudet ruoat saavat sopivan kuvan automaattisesti",
        "Pakattu WebP — nopea mobiilissa, ei layout-hyppyjä",
        "Ilmaiset generaatiot sisältyvät jokaiseen suunnitelmaan",
        "Generoi mikä tahansa kuva uudelleen yhdellä napautuksella, kunnes se on täydellinen",
      ],
      conclusionTitle: "Kuva jokaiselle ruoalle, ilman tuotantoa",
      conclusionBody:
        "Ravintolat, joilla on kuvia, myyvät enemmän korkean katteen ruokia — tämä ei ole arvaus, se on tunnettua tulomekaniikkaa. Syy, miksi useimmilla ruokalistoilla ei ole kuvia, on tuotantokustannukset. IQ Rest poistaa tämän kustannuksen kokonaan. Jokainen lisäämäsi ruoka saa kauniin, brändiin sopivan kuvan ennen kuin lopetat asennuksen. Yhdistä se QR-tilausten kanssa ja katso, kuinka lisämyynnin määrät nousevat ilman kameran nostamista.",
      ctaText: "Generoi AI-kuvat jokaiselle ruokalistan ruoalle — ilmaiseksi kokeilun aikana.",
      ctaButton: "Kokeile ilmaiseksi",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "AI-ravintolan kansitaustan generaattori | IQ Rest",
        description:
          "Generoi automaattisesti kaunis ravintolan kansikuva QR-ruokalistallesi sekunneissa. Sopii keittiöösi, tunnelmaasi ja brändiisi — ei stock-kuvia.",
      },
      title: "AI-generoitu ravintolan kansitausta",
      subtitle:
        "QR-ruokalistasi avautuu oikealla tunnelmalla ennen kuin vieraat edes selaavat. IQ Rest generoi nyt mukautetun kansitaustan, joka sopii keittiöösi ja tunnelmaasi — automaattisesti.",
      intro:
        "Ensivaikutelmilla on merkitystä, erityisesti kun vieraat skannaavat QR-koodin pöydässä. Yleinen kansikuva heikentää kaiken sen, mitä olet käyttänyt sisustussuunnitteluun. IQ Rest generoi nyt ainutlaatuisen, tunnelmallisen kansikuvan jokaiselle ravintolalle — perustuen rekisteröitymisessä valitsemaasi keittiöön. Italialainen trattoria, japanilainen izakaya, espanjalainen tapas-baari — jokainen saa kannen, joka tuntuu oikealta.",
      sections: [
        {
          title: "Räätälöity keittiöösi ja tunnelmaasi",
          body: "Kun täytät rekisteröitymisvelhon, IQ Rest ottaa valitsemasi keittiön ja generoi siihen sopivan kannen. Italialainen saa lämpimän trattoria-valaistuksen ja pastaa pehmeässä tarkennuksessa. Japanilainen saa puhtaat linjat ja tasapainoisen sommittelun. Meksikolainen saa eloisat värit ja katuruoan energiaa. Sovitus on automaattinen, mutta voit generoida kannen uudelleen milloin tahansa omalla luovalla suunnallasi, jos haluat jotain erityistä.",
        },
        {
          title: "Optimoitu QR-ruokalistan hero-osioille",
          body: "Kansikuvat generoidaan tarkalla kuvasuhteella, jota QR-ruokalistan hero-osio käyttää — terävinä jokaisessa puhelimessa, ilman kömpelöä rajausta. Ne koodataan WebP:nä, tarjoillaan nopeasti ja ladataan laiskasti, jotta loput ruokalistasta maalautuu ensin. Kansi asettaa sävyn ja katoaa sitten, kun vieraat alkavat selata ruokia.",
        },
        {
          title: "Brändi-yhtenäisyys laatikosta",
          body: "Kansikuvan tyyli yhdistetään automaattisesti AI-ruokakuviin, jotka on generoitu ruokalistallesi — sama valaistuskieli, sama väripaletti, sama tunnelma. Vieraat näkevät ravintolasi yhtenäisenä ja ammattimaisesti suunniteltuna, vaikka olisitkin pystyttänyt koko jutun viidessä minuutissa puhelimellasi.",
        },
      ],
      benefitsTitle: "Miksi AI-kansi voittaa stockin",
      benefits: [
        "Ainutlaatuinen ravintolallesi — ei stock-kuva, jota jokainen muu paikka käyttää",
        "Sopii rekisteröitymisessä valitsemaasi keittiöön",
        "Sama visuaalinen kieli kuin AI-generoiduilla ruokakuvilla",
        "Mitoitettu oikein QR-ruokalistan herolle — ei manuaalista rajausta",
        "Pakattu WebP nopealle mobiililataukselle",
        "Generoi uudelleen milloin tahansa yhdellä napautuksella",
      ],
      conclusionTitle: "Kansi, joka sanoo „Tiedämme mitä teemme“",
      conclusionBody:
        "Kun vieras skannaa QR-koodisi, ensimmäinen asia, jonka hän näkee, on kantesi. Kiillotettu, tunnelmallinen kuva viestii laadusta ennen kuin he lukevat ainoatakaan ruoan nimeä. IQ Restin kanssa tämä kiillotus on automaattista — generoitu ilmaiseksi rekisteröitymisen aikana ja regeneroitavissa milloin tahansa muutat mielesi. Ei stock-gallerioita, ei suunnittelutyötä, vain kansi joka sopii.",
      ctaText: "Hanki mukautettu AI-kansi QR-ruokalistallesi alle minuutissa.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "3-vaiheinen rekisteröitymisvelho ravintolan QR-ruokalistalle | IQ Rest",
        description:
          "Valitse keittiö, ravintolan nimi, sähköposti — ja IQ Rest rakentaa QR-ruokalistasi. Nopein rekisteröityminen QR-ruokalistateollisuudessa.",
      },
      title: "3-vaiheinen rekisteröitymisvelho: Sähköpostista toimivaan QR-ruokalistaan alle minuutissa",
      subtitle:
        "Valitse keittiösi. Kirjoita ravintolasi nimi. Vahvista sähköpostisi. Valmis — QR-ruokalistasi on valmis, esimerkkiruokien ja AI-generoitujen kuvien kanssa.",
      intro:
        "Ravintoloiden omistajilla ei ole aikaa 10-näytön rekisteröitymislomakkeelle. Joten leikkasimme sen kolmeen. Valitse keittiö, joka sopii paikkaasi. Kirjoita ravintolasi nimi. Vahvista sähköpostisi. Siihen mennessä, kun kirjaudut sisään ensimmäistä kertaa, QR-ruokalistasi on jo täytetty keittiöön sopivilla esimerkkiruokilla ja vastaavalla AI-valokuvauksella. Voit palvella vieraan 60 sekunnissa rekisteröitymisen aloittamisesta.",
      sections: [
        {
          title: "Vaihe 1 — Keittiön valinta",
          body: "Valitse laajasta luettelosta keittiöistä: italialainen, espanjalainen, japanilainen, meksikolainen, ranskalainen, välimeren, intialainen, amerikkalainen, kahvila, baari, pizzeria ja muita. Valinta ohjaa jokaista oletusarvoa velhossa: esimerkkiruoat, AI-kannen tyyli, oletusvaluutta ja aloituskategoriarakenne. Et konfiguroi mitään — valitset lähtöpisteen.",
        },
        {
          title: "Vaihe 2 — Ravintolan nimi",
          body: "Kirjoita nimi sellaisena kuin vieraat sen näkevät. Käytämme sitä kaikkialla: QR-ruokalistan hero, sivun otsikko, SEO-slug, sosiaalisen jakamisen esikatselu. Ei ole erillistä päätöstä brändinimen vs näyttönimen välillä — yksi kenttä, yksi totuuden lähde. Ohitettavissa, jos haluat lykätä päätöstä; täytämme paikkamerkin, jonka voit nimetä uudelleen myöhemmin.",
        },
        {
          title: "Vaihe 3 — Sähköposti tai Google-kirjautuminen",
          body: "Vahvista sähköpostilla + kertakoodilla tai napauta „Kirjaudu Googlella“ tilin välittömään luomiseen. Ei salasanaa muistettavaksi. Sillä hetkellä kun vahvistat, velho ajaa ruokalistan kylvön kulissien takana — kategoriat luodaan, esimerkkiruoat lisätään, AI-kuvat generoidaan, ravintolan kansi on valmis. Laskeudut suoraan kojelautaan toimivan ruokalistan kanssa.",
        },
      ],
      benefitsTitle: "Miksi 3-vaiheinen rekisteröityminen voittaa lomakkeen",
      benefits: [
        "Alle 60 sekuntia laskeutumissivulta toimivaan QR-ruokalistaan",
        "Nolla päätöstä, joita et voi muuttaa myöhemmin — vain oletusarvoja aloittamiseen",
        "Esimerkkiruoat esitäytetty keittiön mukaan — välitön sisältö muokattavaksi",
        "AI-kuvat ja kansikuva valmiit siihen mennessä, kun kirjaudut sisään",
        "Google-kirjautumisvaihtoehto — ei salasanaa hallittavaksi",
        "Anonyymi edistyminen tallennettu, jos poistut velhon keskellä",
      ],
      conclusionTitle: "Nopein QR-ruokalistan asennus, piste",
      conclusionBody:
        "Useimmat QR-ruokalistapalvelut pakottavat sinut täyttämään kymmeniä kenttiä ennen kuin näet mitään hyödyllistä. IQ Rest kääntää tämän — annamme sinulle toimivan ruokalistan ensin, sitten annamme sinun mukauttaa. Velho poistaa jokaisen esteen uteliaisuuden ja käytettävän tuotteen välillä. Ravintolat, jotka suorittavat rekisteröitymisen alle 60 sekunnissa, ovat dramaattisesti todennäköisempiä julkaisemaan ruokalistansa todella, ottamaan ensimmäisen tilauksensa ja pysymään tilaajina.",
      ctaText: "Käynnistä 3-vaiheinen velho nyt — ruokalistasi on live 60 sekunnissa.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "AI-generoitu esimerkkiruokalista rekisteröitymisessä | IQ Rest",
        description:
          "Ohita tyhjä tila. IQ Rest generoi automaattisesti aloitus QR-ruokalistan keittiösi perusteella — kategoriat, ruoat, hinnat ja kuvat.",
      },
      title: "AI-rakennettu esimerkkiruokalista heti rekisteröitymisen jälkeen",
      subtitle:
        "Ei enää tyhjään kojelautaan tuijottamista. IQ Rest kylvää tilisi keittiöön sopivilla kategorioilla, ruoilla ja AI-kuvilla, jotta voit muokata, ei aloittaa nollasta.",
      intro:
        "Vaikein osa mitä tahansa uutta työkalua on tyhjä tila. Uudet ravintoloiden omistajat istuvat alas, näkevät tyhjän ruokalistan ja sulkevat välilehden. IQ Rest korjaa tämän täyttämällä ruokalistasi sillä hetkellä, kun rekisteröidyt. Valitse italialainen — saat antipasti, pasta, pizza, jälkiruoka. Valitse japanilainen — saat sushi, ramen, donburi, sake. Jokaisessa kategoriassa on 6–10 aloitusruokaa AI-generoiduilla kuvilla yhtenäisessä tyylissä. Työsi muuttuu hintojen muokkaamiseksi ja nimien säätämiseksi, ei nollasta rakentamiseksi.",
      sections: [
        {
          title: "Keittiötietoiset kategoriat ja ruoat",
          body: "Kylväjä ei vain heittele satunnaisia ruokia. Se käyttää keittiötä, jonka valitsit rekisteröitymisvelhossa, vetääkseen kuratoidun joukon kategorioita, jotka ovat järkeviä ravintolatyyliisi. Pizzeria saa „Pizza Classica“, „Pizza Speciale“, „Antipasti“, „Bevande“. Ranskalainen bistro saa „Entrées“, „Plats principaux“, „Fromages“, „Desserts“. Aloitussisältö vastaa konventiota, jota ruokailijat odottavat siltä keittiöltä.",
        },
        {
          title: "Kuvat ja hinnat laatikosta",
          body: "Jokainen aloitusruoka tulee AI-generoidulla kuvalla yhtenäisessä tyylissä ja järkevällä oletushinnalla paikallisessa valuutassasi (automaattisesti tunnistettu sijainnin mukaan). Hinnat ovat paikkamerkkejä — muutat niitä — mutta ne tekevät ruokalistasta välittömästi todellisen näköisen, jotta voit esikatsella QR-ruokalistaa ja tuntea, miltä lopputulos näyttää. Tämä on kriittistä kumppaneille esittelyssä, palautteen saamisessa tai vain päättämisessä „kyllä, tämä on työkalu jota haluamme käyttää“.",
        },
        {
          title: "Muokkaa, älä aloita nollasta",
          body: "Kun kylvetty, jokainen ruoka kantaa isExample-lippua. Heti kun muokkaat ruokaa — muutat sen nimeä, hintaa tai kuvausta — lippu tippuu. Jäljellä olevat esimerkkiruoat erottuvat visuaalisesti, jotta tiedät mikä on vielä paikkamerkkisisältöä. Tämä erottelu tekee selväksi mikä on tehty ja mikä on vielä jäljellä, muuttaen tyhjän tilan ongelman tuottavaksi muokkausvirraksi.",
        },
      ],
      benefitsTitle: "Miksi esivalmistettu ruokalista voittaa",
      benefits: [
        "Nolla tyhjää tilaa — avaa kojelauta ja näe toimiva ruokalista",
        "Kategoriat ja ruoat vastaavat valitsemaasi keittiötä",
        "AI-kuvat jokaiselle aloitusruoalle yhtenäisessä tyylissä",
        "Paikallinen valuutta automaattisesti tunnistettu, oletushinnat paikoillaan",
        "Esimerkkilippu hiipuu kun muokkaat — selkeä edistymissignaali",
        "Näytä sidosryhmille todellisen näköinen ruokalista minuuteissa",
      ],
      conclusionTitle: "Ohita tyhjä sivu",
      conclusionBody:
        "Ruokalistan rakentaminen nollasta on pelottavaa. Sen muokkaaminen on helppoa. IQ Rest antaa sinulle täydellisen aloitusruokalistan sillä hetkellä, kun rekisteröidyt, sitten antaa sinun säätää sitä vastaamaan todellista tarjontaasi. Tulos: useammat ravintolat suorittavat asennuksen, useammat ruokalistat menevät todella liveen, useammat vieraat skannaavat QR-koodeja, jotka johtavat todellisiin, muokattuihin, tuotantoruokalistoihin.",
      ctaText: "Rekisteröidy ja saa täysin rakennettu aloitusruokalista keittiössäsi.",
      ctaButton: "Rakenna ruokalistani",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktiivinen ruokalistakierros ensikäyttäjille | IQ Rest",
        description:
          "7-vaiheinen interaktiivinen opas vie uudet ravintoloiden omistajat QR-ruokalistan kojelaudan läpi — ei dokumentteja, ei videoita, vain käytännön työtä.",
      },
      title: "7-vaiheinen interaktiivinen ruokalistakierros ensikäynnillä",
      subtitle:
        "Emme pakota sinua lukemaan dokumentaatiota. Ensimmäisellä kerralla, kun avaat ruokalistan, IQ Rest ohjaa sinut sen läpi — lisää kategoria, lisää ruoka, muokkaa, lajittele, esikatsele, jaa, kaikki seitsemällä napautuksella.",
      intro:
        "Useimmat SaaS-tuotteet hautaavat onboardingin tukikeskukseen, jota kukaan ei lue. IQ Rest ottaa päinvastaisen lähestymistavan: ensimmäisellä kerralla, kun uusi käyttäjä laskeutuu ruokalistasivulle, interaktiivinen kierros valaisee jokaisen avaintoiminnan järjestyksessä. Lisää kategoria. Lisää ensimmäinen ruokasi. Muokkaa sitä. Vaihda näkyvyys. Järjestä uudelleen. Esikatsele live-ruokalistaa. Jaa vieraan kanssa. Vaiheeseen seitsemän mennessä olet käyttänyt jokaista ominaisuutta, jota tarvitset 95 % ajasta.",
      sections: [
        {
          title: "Tuotteessa, ei tietopankissa",
          body: "Jokainen kierroksen vaihe valaisee todellisen UI-elementin näytölläsi. Kupla selittää mitä elementti tekee ja miksi sillä on merkitystä. Ei kuvakaappauksia — kuvakaappaus ON kojelautasi. Kun napautat, opit tekemällä, et lukemalla. Ohita milloin tahansa; kierros säilyy istuntojen välillä, kunnes suoritat sen tai hylkäät sen pysyvästi.",
        },
        {
          title: "Suunniteltu todellisen työnkulun ympärille",
          body: "Seitsemän vaihetta eivät ole ominaisuuksien dumppaus — ne kartoittuvat työnkulkuun, jonka uusi ravintola todella suorittaa. Lisää kategoriat ensin (juomat, pääruoat, jälkiruoat), sitten ruoat, sitten viimeistele jokainen ruoka, sitten järjestä järjestys, jossa ne näkyvät, sitten esikatsele varmistaaksesi että se näyttää oikealta, sitten jaa QR:n kautta. Loppuun mennessä olet suorittanut silmukan tyhjästä ruokalistasta QR-koodiin painetussa pöytäkortissa.",
        },
        {
          title: "Lokalisoitu 35 kielelle",
          body: "Kierroksen teksti on käännetty jokaiselle kielelle, jota IQ Rest tukee — sama kuin loput kojelaudasta. Espanjankieliset omistajat saavat espanjalaiset kuplat, saksalaiset omistajat saavat saksaa, katalonialaiset omistajat saavat katalaania. Mikään kierroksessa ei oleta englannin lukutaitoa.",
        },
      ],
      benefitsTitle: "Miksi tuotekierros voittaa tukikeskuksen",
      benefits: [
        "Opi tekemällä, ei dokumentteja lukemalla",
        "7 vaihetta kattaa ~95 % työnkulusta",
        "Hylkää milloin tahansa — ei koskaan estä kojelautaa",
        "Säilyy istuntojen välillä, kunnes suoritettu tai ohitettu",
        "Lokalisoitu 35 kielelle — englantia ei tarvita",
        "Ei videoita ladattavaksi — välitön, natiivi UI-päällys",
      ],
      conclusionTitle: "Hämmentyneestä itsevarmaksi seitsemässä vaiheessa",
      conclusionBody:
        "Vaikein hetki missä tahansa tuotteessa on ensimmäiset 30 sekuntia. Käyttäjä avaa kojelaudan, katsoo ympärilleen ja joko ymmärtää sen tai poistuu. IQ Restin interaktiivinen kierros poistaa tämän riskin — minuutissa jokainen uusi käyttäjä tietää, mihin lisätä ruoka, miten esikatsella, miten jakaa. Kierroksen suorittaminen korreloi vahvasti onnistuneen ruokalistan julkaisun kanssa. Emme vain opeta tuotetta — saamme ruokalistan liveen.",
      ctaText: "Rekisteröidy ja anna ohjata sinut ensimmäisen QR-ruokalistasi läpi seitsemällä napautuksella.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Maakohtaiset laskeutumissivut ravintolan QR-ruokalistalle | IQ Rest",
        description:
          "Espanjasta tulevat vierailijat näkevät espanjalaisille ravintoloille räätälöidyn laskeutumissivun. Ranska näkee ranskaa. 35 maata, 35 konversioon viritettyä sivua.",
      },
      title: "Mukautettu laskeutumissivu jokaisella kielellä",
      subtitle:
        "Vierailijat eivät enää saa automaattisesti käännettyä sivua. Jokaisella 35 tuetulla kielellä on oma laskeutumissivunsa, kirjoitettu sille markkinalle.",
      intro:
        "Automaattisesti käännetyt laskeutumissivut konvertoivat huonosti. Kielioppi on väärin, kulttuuriviittaukset ovat väärin ja paikalliset maksuehdot tuntuvat tuoduilta. IQ Rest toimittaa nyt ainutlaatuisen laskeutumissivun jokaiselle 35 tuetulle kielelle — kirjoitettu markkinalle, ei vain käännetty. Espanjalaiset vierailijat saavat sivun aiheesta restaurantes y cafeterías. Ranskalaiset vierailijat saavat cafés et bistrots. Saksalaiset vierailijat saavat Restaurants und Imbisse. Jokainen sivu johtaa arvolupauksella, joka on tärkein tälle yleisölle.",
      sections: [
        {
          title: "Yksi sivu kieltä kohden, ei automaattikäännös",
          body: "Jokainen laskeutuminen elää /<locale> osoitteessa itsenäisenä Next.js-reittinä. Tekstit ovat TypeScript-objekteissa — versioidut, tyyppitarkistetut, itsenäisesti käyttöönotettavissa. Voimme A/B-testata espanjalaista hero-varianttia koskematta saksaan. Voimme lokalisoida hintakutsun Brasilian realille vaikuttamatta euromarkkinoihin. Tulos on nopeampi iteraatio laskeutumisilla, jotka ajavat todellista konversiota.",
        },
        {
          title: "Geosijainti ohjaa vierailijat automaattisesti",
          body: "Ensimmäisellä kerralla, kun vierailija laskeutuu iq-rest.com -sivustolle, nginx geo-moduulimme lukee heidän maakoodinsa ja ohjaa oikeaan /<locale>. Espanjalaiset IP:t laskeutuvat /es. Saksalaiset /de. Brasilia /pt. Ohjaamme jopa Espanjan katalonia-puhuvat osat /ca eikä /es. Vierailijat eivät koskaan näe „valitse kielesi“ -modaalia — he näkevät kielensä oletuksena.",
        },
        {
          title: "Brändinlaajuiset hreflang ja kanoniset tagit",
          body: "Kaikki 35 laskeutumista viittaavat toisiinsa hreflang-tageilla, jotta Google indeksoi oikean jokaiselle kyselylle. Kanoniset URL-osoitteet osoittavat per-locale URL-osoitteeseen, ei yleiseen juuriosoitteeseen. Asetus seuraa Googlen kansainvälisiä SEO-ohjeita tarkasti, jotta jokainen laskeutuminen kilpailee omalla kielellään ilman muiden kannibalisointia.",
        },
      ],
      benefitsTitle: "Miksi maakohtaiset laskeutumiset konvertoivat paremmin",
      benefits: [
        "Natiivi sanamuoto jokaisella markkinalla — ei automaattikäännöstä",
        "Geo-reititys tarjoaa oikean sivun automaattisesti",
        "Hreflang ja kanoniset tagit seuraavat Googlen ohjeita",
        "Katalonialaiset vierailijat Kataloniassa näkevät katalaania, eivät kastilialaista",
        "Valuutta, hinnoittelu ja CTA:t lokalisoituina markkinaa kohden",
        "Itsenäinen A/B-testaus localea kohden ilman ristikontaminaatiota",
      ],
      conclusionTitle: "35 kieltä, 35 etuovea",
      conclusionBody:
        "Jos espanjalainen ravintolan omistaja laskeutuu puoliksi käännetylle englanninkieliselle sivulle USA-tyylisellä hinnoittelulla, hän poistuu. Jos he laskeutuvat sivulle, joka puhuu heille espanjaksi, eurohinnoilla ja espanjalaisilla viittauksilla, he konvertoivat. IQ Rest tekee nyt jälkimmäistä jokaisella markkinalla, jota palvelemme — 35 laskeutumista, 35 konversioon viritettyä etuovea, kaikki automaattisesti geo-reititettynä.",
      ctaText: "Kokeile IQ Restiä omalla kielelläsi — laskeutuminen räätälöity markkinallesi.",
      ctaButton: "Avaa kieleni",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Kirjaudu Googlella ravintolan QR-ruokalistan kojelautaan | IQ Rest",
        description:
          "Ohita salasanat ja sähköpostikoodit. Napauta „Kirjaudu Googlella“ päästäksesi ravintolasi QR-ruokalistan kojelautaan sekunnissa.",
      },
      title: "Kirjaudu Googlella — Yhden napautuksen pääsy QR-ruokalistallesi",
      subtitle:
        "Ohita OTP-sähköpostit ja unohdetut salasanat. Napauta „Jatka Googlella“ ja olet kojelaudan sisällä alle sekunnissa.",
      intro:
        "Sähköposti + kertakoodi -todennus on turvallinen mutta hidas. Kirjoita sähköpostisi, odota koodia, vaihda postilaatikkoosi, kopioi koodi, liitä, lähetä. Tämä on parhaimmillaan 30 sekunnin virta. IQ Rest tarjoaa nyt Kirjaudu Googlella -vaihtoehtona: napauta yhtä painiketta, valitse Google-tilisi, olet sisällä. Ei salasanaa unohdettavaksi, ei postilaatikon edestakaisin -käyntiä, ei kitkaa.",
      sections: [
        {
          title: "Natiivi Google OAuth, ei uudelleenohjaussilmukka",
          body: "Käytämme Googlen virallista Identity Services SDK:ta One Tap UI:lla tuetuissa selaimissa. Virta tapahtuu natiivissa popupissa, ei uudelleenohjauksena Googlen verkkotunnukseen ja takaisin. Koko juttu kestää noin sekunnin ensimmäisen napautuksen jälkeen. Vahvistamme Google ID -tokenin palvelinpuolella Googlen julkisia avaimia vastaan, joten virta on kryptografisesti turvallinen päästä päähän.",
        },
        {
          title: "Sama tili, kumpi tahansa menetelmä",
          body: "Jos rekisteröidyit sähköposti-OTP:lla ja valitset myöhemmin Googlen, linkitämme tilit sähköpostin perusteella. Voit vaihtaa menetelmien välillä jokaisessa kirjautumisessa. Ei „erillistä Google-tiliä“ hallittavaksi, etkä menetä ruokalistaasi kirjautumalla eri tavalla. Lähetämme myös kojelautasi localen Google-kirjautumisen aikana, jotta sähköpostit tilillesi menevät oikealla kielellä päivästä yksi.",
        },
        {
          title: "Mobile-First — Toimii iOS Safarissa ja Android Chromessa",
          body: "Googlen virallinen SDK on ollut historiallisesti hauras mobiilissa. Suunnittelimme sen ympärille asettamalla todellisen Google-painikkeen UI:mme päälle sen sijaan, että käynnistäisimme ohjelmallisia klikkauksia (jotka iOS Safari nyt estää). Tulos: painike toimii jokaisessa modernissa puhelinselaimessa, ei asennusta, ei sovelluskauppaa.",
        },
      ],
      benefitsTitle: "Miksi Google-kirjautuminen voittaa sähköposti-OTP:n",
      benefits: [
        "Yksi napautus kirjautumiseen — ei sähköpostin edestakaisin -käyntiä",
        "Ei salasanaa muistettavaksi tai nollattavaksi",
        "Sama tili, käytätpä sähköpostia tai Googlea",
        "Kryptografisesti vahvistettu palvelinpuolella Google ID -tokenin kautta",
        "Toimii luotettavasti iOS Safarissa ja Android Chromessa",
        "Locale lähetetty, jotta sähköpostit pysyvät kielelläsi",
      ],
      conclusionTitle: "Nopein tapa takaisin kojelautaasi",
      conclusionBody:
        "Ravintoloiden omistajat tarkistavat ruokalistojaan kymmeniä kertoja viikossa — palveluiden välillä, painotyön jälkeen, hintoja säätäessä. Jokainen kirjautumisessa säästetty sekunti kasautuu. Google-kirjautuminen muuttaa 30 sekunnin OTP-virran yhden sekunnin napautukseksi. Sähköposti-OTP pysyy saatavilla omistajille, jotka pitävät siitä, mutta useimmat käyttäjät valitsevat Googlen kokeiltuaan sitä kerran.",
      ctaText: "Ohita salasana — kirjaudu Googlella yhdellä napautuksella.",
      ctaButton: "Avaa kojelauta",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Monikieliset sähköposti-ilmoitukset 35 kielellä | IQ Rest",
        description:
          "Kokeilumuistutukset, tukivastaukset, tilaussähköpostit — jokainen ilmoitus, jonka IQ Rest lähettää, saapuu kojelautasi kielellä.",
      },
      title: "Monikieliset sähköposti-ilmoitukset kaikilla 35 kielellä",
      subtitle:
        "Jokainen sähköposti, jonka IQ Rest lähettää — tukivastaukset, kokeilumuistutukset, tilauskuitit — saapuu kielellä, jonka olet asettanut kojelaudassasi. Mukaan lukien oikealta vasemmalle -asettelut.",
      intro:
        "Sähköposti väärällä kielellä on parhaimmillaan kitkaa, pahimmillaan poistoa. IQ Rest lähettää nyt jokaisen tapahtumakohtaisen sähköpostin kielellä, jonka olet asettanut kojelaudassasi, kaikilla 35 tuetulla localella. Tervetuloa-sähköpostit, kokeilun päättymismuistutukset, tilausvahvistukset, tukivastaukset — kaikki saapuvat kielelläsi, oikealla kieliopilla ja kulttuurisesti sopivalla sanamuodolla. Oikealta vasemmalle -kielet kuten arabia ja persia saavat oikein peilatut asettelut.",
      sections: [
        {
          title: "preferredLocale matkustaa tilisi mukana",
          body: "Jokaisella käyttäjällä on preferredLocale-kenttä asetettu ensimmäisellä kirjautumisella. Riippumatta siitä, rekisteröidyitkö sähköposti-OTP:lla, Googlella vai velhon kautta, localesi on kaapattu ja säilytetty. Jokainen taustatyö, joka lähettää sähköpostia — Stripe-webhookit, tukivastausilmoitukset, ajastetut cron-tehtävät — vetää käyttäjän preferredLocalen ja käyttää sitä oikean mallin valintaan. Vaihda locale kojelaudassa ja seuraava sähköposti heijastaa muutosta.",
        },
        {
          title: "RTL-mallit arabialle ja persialle",
          body: "Oikealta vasemmalle -asettelut eivät ole vain käännös — koko visuaalinen hierarkia kääntyy. Toimitamme omistautuneet RTL-mallit arabialle ja persialle: navigointi virtaa oikealta vasemmalle, numerot arabialais-intialaisina silloin kun on sopivaa, brändilogo sijoitettu oikein. Tulos on sähköposti, joka tuntuu natiivilta RTL-lukijoille, ei käännetty LTR-malli rikkinäisellä kohdistuksella.",
        },
        {
          title: "Käännetty ravintolateollisuuden asiantuntijoiden toimesta",
          body: "Yleiset käännöspalvelut tuottavat kirjaimellisia mutta jäykkiä käännöksiä. Käänsimme jokaisen mallin käyttäen keittiö- ja ravintola-alan terminologiaa, joka kuulostaa luonnolliselta ravintolaoperaattoreille jokaisella markkinalla. „Trial“ tulee „período de prueba“ espanjaksi (ei „juicio“). „Reservation“ tulee „Reservierung“ saksaksi (ei „Reservation“). Yksityiskohtien taso kasautuu — ravintolat huomaavat, kun työkalu puhuu heidän kieltään oikein.",
        },
      ],
      benefitsTitle: "Miksi monikieliset sähköpostit ovat tärkeitä",
      benefits: [
        "Kaikki tapahtumakohtaiset sähköpostit kojelautasi kielellä",
        "preferredLocale säilyy kirjautumisten välillä",
        "RTL-asettelut arabialle ja persialle",
        "Ravintola-alalle sopiva terminologia kieltä kohden",
        "Localen vaihtaminen päivittää tulevat sähköpostit välittömästi",
        "35 kieltä mukaan lukien katalaani, sloveeni, viro, latvia",
      ],
      conclusionTitle: "Sähköpostit, jotka puhuvat kieltäsi",
      conclusionBody:
        "Viestintä, joka laskeutuu väärällä kielellä, on viestintää, joka ei toimi. IQ Rest lähettää jokaisen sähköpostin kielellä, jota todella käytät, asettelulla ja terminologialla, joka sopii. Kuulostaa pieneltä, kunnes olet espanjalainen ravintolan omistaja, joka saa englanninkielisen kokeilun päättymisilmoituksen ja missaa sen. Nyt et.",
      ctaText: "Rekisteröidy ja saa kojelautasi sekä jokainen sähköposti omalla kielelläsi.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "iOS-natiivi tunne mobiilille ravintolan kojelaudalle | IQ Rest",
        description:
          "Alapalkkivelileht-navigointi, turva-aluekäsittely, ei-zoom syötteet — IQ Restin mobiilikojelauta tuntuu natiivilta sovellukselta iPhonessa.",
      },
      title: "iOS-natiivi tunne puhelimellasi",
      subtitle:
        "Alapalkkivelileht-navigointi, täysi turva-alueen tietoisuus, lomakesyötteet ilman zoomia ja välittömät sivunsiirtymät. QR-ruokalistasi hallinta puhelimella tuntuu nyt natiivin iOS-sovelluksen käyttämiseltä.",
      intro:
        "Useimmat SaaS-ravintolakojelaudat ovat työpöytä-ensin -jälkiajatuksia mobiilissa. IQ Rest on päinvastainen — suunniteltu omistajille, jotka pyörittävät ruokalistaansa puhelimellaan palveluiden välillä. Mobiilikojelauta käyttää nyt alapalkkivelileht-navigointia, kunnioittaa iPhonen turva-alueen insetejä, estää iOS-lomakesyötteen zoomin ja käyttää lähes välittömiä SPA-siirtymiä. Se näyttää ja tuntuu natiivilta sovellukselta, paitsi että ei ole sovellusta asennettavaksi.",
      sections: [
        {
          title: "Alapalkkivelileht-navigointi, ei hampurilainen",
          body: "Hampurilaisvalikot mobiilissa ovat hitaita — napauta avataksesi, napauta kohdetta, odota sivua. Korvasimme työpöydän sivupalkin alapalkkivälilehtipalkilla puhelimissa: Ruokalista, Tilaukset, Varaukset, Asetukset. Yksi peukaloystävällinen napautus, välitön navigointi. Aktiivinen välilehti käyttää brändisi korostusvärisi, jotta nykyinen sijainti on aina ilmeinen.",
        },
        {
          title: "Turva-alueen insetit ja Home-osoitin",
          body: "Modernit iPhonet ovat Home-osoitin alaosassa ja loven yläosassa. Verkkosovellukset, jotka jättävät tämän huomiotta, päätyvät UI:n päällekkäin osoittimen kanssa tai piilossa loven takana. Käytämme env(safe-area-inset-*) kaikkialla — alanavigointi istuu Home-osoittimen yläpuolella, sisältötäyttö ottaa huomioon dynaamisen saaren. Tulos tuntuu suunnitellulta laitteelle, ei mukautetulta työpöytäselaimesta.",
        },
        {
          title: "Ei-zoom syötteet ja välitön lomakkeen lähetys",
          body: "iOS Safari zoomaa lomakkeita syötefonttikoolla alle 16px. Nostimme jokaisen syötteen 16px:iin ja konfiguroimme näkymäportin maximum-scale=1, joten napautukset eivät käynnistä zoom-ja-hyppää, joka rikkoo jokaisen muun verkkokojelaudan. Lomakelähetykset ovat palvelimen toimintoja optimistisella UI:lla — muutos näkyy välittömästi, verkko vahvistaa taustalla.",
        },
      ],
      benefitsTitle: "Miksi natiivilla tunteella on merkitystä mobiilissa",
      benefits: [
        "Alapalkkivelileht-nav — yhden napautuksen pääsy jokaiseen osioon",
        "Turva-alue-tietoinen — ei päällekkäisyyttä Home-osoittimen tai loven kanssa",
        "16px syötteet — ei iOS zoom-ja-hyppää lomakenapautuksissa",
        "Aktiivinen välilehti käyttää brändisi korostusvärisi",
        "SPA-siirtymät — ei täydellisiä sivun uudelleenlatauksia osioiden välillä",
        "Ei sovellusta asennettavaksi — toimii Safarissa ja Chromessa",
      ],
      conclusionTitle: "Verkkokojelauta, joka tuntuu sovellukselta",
      conclusionBody:
        "Raja verkon ja natiivin välillä on enimmäkseen kysymys huomiosta yksityiskohtiin. IQ Restin mobiilikojelauta maksaa tuon huomion — alanav, turva-alue, ei zoomia, välittömät siirtymät — ja tulos on jotain, jonka vannoisit rakennetun Swiftillä. Paitsi että se toimii myös Androidissa, eikä ole mitään asennettavaa tai päivitettävää sovelluskaupan kautta.",
      ctaText: "Avaa IQ Rest puhelimellasi ja tunne ero.",
      ctaButton: "Kokeile ilmaiseksi 14 päivää",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "GDPR-evästesuostumusbanneri ravintolan verkkosivustolle | IQ Rest",
        description:
          "Laillinen suostumusbanneri, AEPD-yhteensopiva, ilman kolmannen osapuolen skriptejä. Evästeetön analytiikka käynnistyy jopa ennen suostumusta.",
      },
      title: "GDPR-yhteensopiva evästesuostumusbanneri",
      subtitle:
        "Mukaan rakennettu suostumusbanneri ilman kolmannen osapuolen CMP:tä, ei skriptitagia Cookiebotista tai OneTrustista. Yhteensopiva AEPD- ja ePrivacy-ohjeiden kanssa, evästeettömällä analytiikalla joka käynnistyy ennen suostumusta.",
      intro:
        "Jokainen kaupallinen verkkosivusto EU:ssa tarvitsee evästesuostumusbannerin. Useimmat käyttävät kolmannen osapuolen CMP:itä, jotka raahaavat raskaita skriptejä ja hidastavat sivua. IQ Rest rakensi oman kevyen, AEPD-yhteensopivan suostumusbannerinsa, joka on osa sivun pakkausta — ei lisä-DNS-hakuja, ei kolmannen osapuolen seurantaa. Vierailijat näkevät selkeän Hyväksy / Hylkää -valinnan, molemmilla painikkeilla samalla tyylillä (pimeä malli „hylkää“:n piilottamisesta on laitonta monissa EU-maissa — me emme tee sitä).",
      sections: [
        {
          title: "AEPD- ja ePrivacy-yhteensopiva",
          body: "Espanjalainen AEPD ja laajempi ePrivacy-direktiivi vaativat Hyväksy- ja Hylkää-painikkeet samalla näkyvyydellä. Monet CMP:t tarjoavat pimeän mallin oletuksena „valtava hyväksy, pieni hylkää“. Hylkäämme tämän mallin — molemmat painikkeet ovat samankokoisia, samaa tyyliä, vain eri värisiä. Hylkäävät vierailijat seurataan vain evästeettömillä yhteenlaskettuilla laskureilla; emme koskaan tallenna tunnistetta heidän laitteelleen, joten hylkäyksen jälkeen ei jää ensimmäisen osapuolen evästettä.",
        },
        {
          title: "Ei kolmannen osapuolen skriptejä",
          body: "Useimmat suostumusbannerit lataavat Cookiebotin, OneTrustin tai vastaavan CDN:ltä. Tämä lisää 50-100KB JavaScriptiä, lisä-DNS-haun ja kolmannen osapuolen tiedonjakosuhteen paljastettavaksi tietosuojakäytännössäsi. IQ Restin banneri on osa laskeutumissivun pakkausta — ei ulkoisia pyyntöjä, ei kolmannen osapuolen tiedonjakoa, nopeampi sivun lataus.",
        },
        {
          title: "Tietosuoja, evästeet ja ehdot modaaleissa",
          body: "Klikkaaminen „Tietosuojakäytäntö“, „Evästekäytäntö“ tai „Ehdot“ bannerissa avaa modaalin — ei sivunavigointia, ei vieritysaseman menetystä laskeutumisella. Täysi laillinen teksti on siellä, vieritettävissä, oikeilla otsikoilla. Lukemisen jälkeen sulje modaali ja valitse Hyväksy tai Hylkää. Virta on käyttäjälle kitkaton ja antaa meidän välttää ylimääräisiä sivuhyppyjä, jotka vahingoittaisivat laskeutumissivun konversiota.",
        },
      ],
      benefitsTitle: "Miksi bannerimme voittaa kolmannen osapuolen CMP:t",
      benefits: [
        "AEPD- ja ePrivacy-yhteensopiva — Hyväksy/Hylkää samalla näkyvyydellä",
        "Ei kolmannen osapuolen skriptejä, ei lisä-DNS-hakuja",
        "Tietosuoja/Evästeet/Ehdot modaaleissa — ei sivuhyppyjä",
        "Evästeetön analytiikka käynnistyy jopa ennen suostumusta — ei koskaan menetä dataa",
        "Ensimmäisen osapuolen eväste poistettu Hylkäyksessä",
        "Kevyt — osa laskeutumispakkausta",
      ],
      conclusionTitle: "Vaatimustenmukaisuus ilman konversion vetoa",
      conclusionBody:
        "Evästesuostumus on neuvottelematon EU:ssa, mutta sen ei tarvitse hidastaa sivuasi tai vahingoittaa konversiotasi. IQ Restin banneri on nopea, reilu ja täysin yhteensopiva. Vierailijat, jotka Hyväksyvät, ottavat käyttöön per-istunto-analytiikan; vierailijat, jotka Hylkäävät, rekisteröityvät edelleen anonyymeihin yhteenlaskettuihin laskureihimme, jotta tiedämme mitä laskeutumisella tapahtuu, ilman että koskaan tunnistamme heitä.",
      ctaText: "Katso suostumusvirta toiminnassa — avaa IQ Rest tuoreessa selaimessa.",
      ctaButton: "Vieraile laskeutumisella",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Tietosuoja ja ehdot modaaleissa — ei sivuhyppyjä | IQ Rest",
        description:
          "Tietosuojakäytäntö, palveluehdot ja evästekäytäntö avautuvat nyt modaaleissa laskeutumisella — ei vierityksen menetystä, ei lisänavigointia.",
      },
      title: "Tietosuoja, ehdot ja evästekäytäntö modaaleissa — ei sivuhyppyjä",
      subtitle:
        "Klikkaa mitä tahansa laillista linkkiä laskeutumisella tai auth-sivulla ja käytäntö avautuu siistissä modaalissa. Ei navigointia, ei vieritysaseman menetystä, ei konversiovirran rikkoutumista.",
      intro:
        "Itsenäiset /privacy, /terms ja /cookies sivut olivat standardimalli — ja standardivirhe. Vierailijat klikkasivat linkkiä, menettivät paikkansa laskeutumisella, lukivat käytännön, sitten unohtivat palata. Konversio laski. IQ Rest avaa nyt kaikki kolme laillista asiakirjaa sivun sisäisinä modaaleina: sama vieritysasema säilytetty, sama laskeutumiskokemus keskeytymätön, täysi lainmukaisuus säilytetty.",
      sections: [
        {
          title: "Yksi Modal-komponentti, kolme asiakirjaa",
          body: "Käytämme yhtä Modal-komponenttia asiakirjatyypin vaihtimella. Avaa se evästebanneristä, auth-sivulta, alatunnisteesta — sama komponentti, sama vierityksen lukitus, sama sulkeminen escapella. Laillinen teksti elää jaetuissa TypeScript-vakioissa, joten lausekkeen päivitys kerran levittyy jokaiseen paikkaan, jossa käytäntö näytetään. Ei kahdennusta, ei poikkeamaa.",
        },
        {
          title: "Modaalipino — avaa yksi toisen sisältä",
          body: "Jos luet evästekäytäntöä ja haluat vaihtaa tietosuojakäytäntöön, modaalin sisällä oleva linkki avaa seuraavan modaalin päälle — ei uudelleenohjauksena. Pino käsittelee taaksenavigoinnin oikein, escape sulkee ylimmän modaalin, klikkaaminen ulkopuolelle hylkää armollisesti. Vuorovaikutus on sitä mitä käyttäjät odottavat natiivilta sovellukselta.",
        },
        {
          title: "Kaikki 35 localea — sama yhden lähteen teksti",
          body: "Laillinen teksti itsessään on englanniksi (juridisen kokonaisuutemme kieli, autónomo rekisteröity Espanjassa), mutta modaalin chrome — otsikot, sulkemispainike, linkkimerkinnät — on täysin lokalisoitu kaikille 35 kielelle. Vierailijat espanjaksi, saksaksi, puolaksi tai koreaksi näkevät lokalisoidun modaalin, joka avaa englanninkielisen laillisen tekstin, juuri kuten vaatimustenmukaisuuslähestymistapamme vaatii.",
        },
      ],
      benefitsTitle: "Miksi modaalit voittavat itsenäiset lailliset sivut",
      benefits: [
        "Ei vierityksen menetystä — vierailijat pysyvät laskeutumisella",
        "Korkeampi konversio — vähemmän tahattomia poistumisia",
        "Yksi komponentti, kolme asiakirjaa — ei kahdennusta",
        "Modaalipino — avaa yksi toisen sisältä siististi",
        "Lokalisoitu chrome 35 kielellä",
        "Täysi lainmukaisuus säilytetty",
      ],
      conclusionTitle: "Laillinen ilman kitkaa",
      conclusionBody:
        "Asianajajat haluavat käytännön olevan luettavissa. Markkinoijat haluavat vierailijan konvertoivan. Modaalit tekevät molemmat tyytyväisiksi: käytäntö on yhden napautuksen päässä, täysin luettavissa, ilman vaikutusta laskeutumisvirtaan. IQ Restin vaatimustenmukaisuusasema pysyy vahvana ilman itsenäisten laillisten sivujen konversiovetoa.",
      ctaText: "Kokeile uutta virtaa — avaa evästebanneri ja napauta mitä tahansa käytäntölinkkiä.",
      ctaButton: "Vieraile laskeutumisella",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Automaattinen katalaani Katalonian vierailijoille | IQ Rest",
        description:
          "Vierailijat Barcelonasta, Tarragonasta, Lleidasta ja Gironasta näkevät automaattisesti IQ Restin katalaaniksi kastiilialaisen espanjan sijaan.",
      },
      title: "Automaattinen katalaanin tunnistus Katalonian vierailijoille",
      subtitle:
        "Vierailijat Barcelonasta, Tarragonasta, Lleidasta ja Gironasta laskeutuvat oletuksena IQ Restin katalaani-versioon. Loput Espanjasta saavat edelleen kastiilialaista espanjaa.",
      intro:
        "Katalonialla on vahva kielellinen identiteetti — miljoonat katalaanit käyttävät katalaania ensimmäisenä kielenään, erillisenä kastiilialaisesta espanjasta. IQ Rest kunnioittaa nyt tätä eroa geo-tasolla: vierailijat, joiden IP geosijoittuu katalaani-maakuntaan, saavat /ca laskeutumissivun automaattisesti. Kastiilialainen espanja pysyy oletuksena loppu-Espanjalle. Vierailijat voivat vaihtaa kieltä milloin tahansa alatunnisteen kielimodaalin kautta.",
      sections: [
        {
          title: "Geo-tunnistus reunalla",
          body: "Luemme vierailijan maan ja alueen nginx geo-moduulistamme jokaisessa pyynnössä. Jos maa on Espanja ja alue vastaa Barcelonaa, Tarragonaa, Lleidaa tai Gironaa (tai sisältää „Catalonia“ / „Catalunya“ alueen nimessä), ohjaamme heidät /ca:lle. Muuten vierailija seuraa standardi maa-locale -reititystä ja laskeutuu sopivalle kielisivulle.",
        },
        {
          title: "Locale-eväste ohittaa geon",
          body: "Kun valitset kielen manuaalisesti kielenvaihtimen kautta, valintasi säilyy evästeessä, joka ohittaa geon tuleville vierailuille. Katalaaninkielinen vierailija, joka mieluummin lukee IQ Restiä englanniksi, ei jatka /ca:lle ohjaamista — heidän nimenomainen valintansa voittaa aina. Geo on oletus, ei rajoitus.",
        },
        {
          title: "Täysi katalaanikäännös, ei automaattikäännös",
          body: "/ca laskeutumissivu ei ole automaattisesti käännetty espanjasta — jokainen sana on ammattimaisesti käännetty katalaaninkielisten ravintolateollisuuden copywriterien toimesta. Ravintola-alan terminologia, maksuehdot, kulttuuriviittaukset kaikki vastaavat sitä, miten katalaanilainen ravintolan omistaja todella puhuu. Sivu lukee kuin se olisi kirjoitettu markkinalle, koska se oli.",
        },
      ],
      benefitsTitle: "Miksi automaattinen katalaani on tärkeä",
      benefits: [
        "Vierailijat Barcelonasta/Tarragonasta/Lleidasta/Gironasta näkevät katalaania automaattisesti",
        "Loput Espanjasta saavat edelleen kastiilialaista espanjaa — ei yli-reititystä",
        "Manuaalinen kielivalinta säilyy evästeen kautta",
        "Täysi ammattikäännös, ei konekäännös",
        "Geo-tunnistus tapahtuu reunalla — ei asiakaspuolen vilkkumista",
        "Sama konversioon viritetty laskeutuminen kuin jokainen muu locale",
      ],
      conclusionTitle: "Kielellisen identiteetin kunnioittaminen",
      conclusionBody:
        "Katalonialaisten vierailijoiden oletusasettaminen kastiilialaiseen espanjaan on teknisesti pieni asia mutta poliittisesti ja kulttuurisesti suuri asia. IQ Restin geo-reititys käsittelee nyt katalaania ensiluokkaisena kielenä Katalonian vierailijoille. Tulos: korkeampi-konvertoiva laskeutuminen katalaaninkielisille ravintoloiden omistajille, jotka tuntevat olonsa kunnioitetuiksi ensimmäisestä sekunnista, kun he näkevät verkkosivustomme.",
      ctaText: "Vieraile IQ Restissä Kataloniasta ja näe sivu kielelläsi.",
      ctaButton: "Avaa katalaani-laskeutuminen",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Kokeilu päättynyt -modaali — QR-ruokalista pysyy julkisena | IQ Rest",
        description:
          "Kun kokeilusi päättyy, ruokalistasi ei katoa. Vieraat voivat edelleen skannata ja katsella; näet päivitysmodaalin kojelaudassa.",
      },
      title: "Kokeilu päättynyt? QR-ruokalistasi pysyy livenä vieraille",
      subtitle:
        "Kokeilun päättyminen ei enää tapa julkista ruokalistaasi. Vieraat voivat edelleen skannata ja katsella; vain kojelautasi kehottaa sinua päivittämään. Ei yllätyskeskeytystä keskellä palvelua.",
      intro:
        "Vanha kokeilun päättymiskäyttäytyminen oli ankara: kun 14 päiväsi päättyivät, julkinen QR-ruokalistasi pimeni vieraille. Jos satuit olemaan keskellä palvelua, se oli katastrofi. Muutimme sen. Nyt kokeilun päättyminen näyttää sinulle modaalin kojelaudan sisällä kehottaen päivitykseen, mutta julkinen ruokalistasi jatkaa vieraiden palvelemista normaalisti. Päivität, kun olet valmis, ei silloin, kun vieras heiluttaa puhelinta pöydän QR-koodille.",
      sections: [
        {
          title: "Julkinen ruokalista pysyy livenä",
          body: "14 päivän kokeilu päättyy hiljaa vieraan näkökulmasta. QR-ruokalista, online-tilaaminen, varaukset — kaikki jatkavat toimintaa. Omistaja näkee päivitysmodaalin seuraavalla kojelautakirjautumisella. Tämä erottaminen tarkoittaa, että kokeilun päättyminen ei voi koskaan rikkoa palvelua tai nolata sinua asiakkaiden edessä.",
        },
        {
          title: "Modaali kojelaudassa, ei kova uudelleenohjaus",
          body: "Aiemmin kokeilun päättyminen ohjasi kojelaudan laskutussivulle. Tämä rikkoi syvälinkit ja hämmensi käyttäjiä, jotka heitettiin keskellä tehtävää. Nyt näytämme siistin modaalin: „Kokeilusi on päättynyt. Valitse suunnitelma jatkaaksesi edistyneiden ominaisuuksien käyttöä.“ Modaali voidaan hylätä; voit jatkaa kojelaudan navigointia, mutta uudet toiminnot, jotka vaativat maksullisen suunnitelman, näyttävät rivi-upsell-kehotteita.",
        },
        {
          title: "Esikatselu aina saatavilla",
          body: "Jopa kokeilun päättyessä voit edelleen esikatsella QR-ruokalistasi kojelaudasta. Emme lukitse sinua näkemästä mitä vieraat näkevät. Muokkaa ruokalistaa, esikatsele tulosta — vain julkaisuun liittyvät toiminnot vihjaavat päivitykseen. Tämä pitää kojelaudan tuottavana jopa keskellä päätöstä, jotta et menetä pääsyä suunnitelmia vertaillessasi.",
        },
      ],
      benefitsTitle: "Miksi pehmeä päättyminen voittaa kovan katkaisun",
      benefits: [
        "Julkinen QR-ruokalista pysyy livenä vieraille",
        "Ei yllätyskeskeytystä keskellä palvelua",
        "Modaali kojelaudassa pakotetun laskutusuudelleenohjauksen sijaan",
        "Esikatselu aina saatavilla suunnitelman tilasta riippumatta",
        "Rivi-upsell-vihjeet korvaavat äkilliset estot",
        "Omistaja päivittää oman aikataulunsa mukaan",
      ],
      conclusionTitle: "Kunnioita ravintolan toiminta-aikoja",
      conclusionBody:
        "Ravintolat toimivat tiukoilla marginaaleilla ja vielä tiukemmilla aikatauluilla. QR-ruokalista, joka kaatuu koska ilmainen kokeilu päättyi, on pahempi kuin itse kokeilun raja — se vahingoittaa luottamusta. Pehmeä päättyminen pitää valot päällä vieraille samalla kun edelleen työntää omistajaa kohti maksullista suunnitelmaa. Konversiot pysyvät korkeina; käyttökatkos putoaa nollaan.",
      ctaText: "Aloita 14 päivän kokeilusi tietäen, että ruokalistasi pysyy livenä mitä tahansa.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Dish: Selkeämpi ruokalistaeditorin terminologia | IQ Rest",
        description:
          "Nimesimme „Item“ uudelleen „Dish“:ksi koko kojelaudassa. Ravintoloiden omistajien ei pitäisi joutua kääntämään yleistä SaaS-terminologiaa päässään.",
      },
      title: "Item → Dish: Selkeämpi terminologia editorissa",
      subtitle:
        "Korvasimme yleisen „Item“-merkinnän „Dish“:llä jokaisella kojelaudan pinnalla. Pieni muutos, suuri selkeysparannus ravintoloiden omistajille, jotka eivät puhu SaaS:ia.",
      intro:
        "Ohjelmistoihmiset sanovat „item“. Ravintolaihmiset sanovat „dish“ (ruoka). Yhteensopimattomuus oli pieni mutta jatkuva — joka kerta kun näytimme „Add Item“, omistajan piti kääntää se päässään „Add Dish“:ksi. Nimesimme kaiken uudelleen: painikkeet, merkinnät, onnistumisviestit, virhetilat, sivuotsikot. Kojelauta puhuu nyt samaa kieltä kuin ihmiset, jotka käyttävät sitä.",
      sections: [
        {
          title: "Mihin nimeämisuudelleen pätee",
          body: "Jokainen käyttäjälle näkyvä pinta: „Add Item“ tuli „Add Dish“. „Items“-välilehti ruokalistassa tuli „Dishes“. „Item Settings“ tuli „Dish Settings“. Onnistumistostit („Item created“) tulivat („Dish created“). Lomakkeen validointivirheet, leivänmurut, kojelaudan otsikot — kaikki päivitetty. Sisäinen tietokantasarake on edelleen nimeltään „item“ taaksepäin yhteensopivuuden vuoksi, mutta yksikään käyttäjä ei näe sitä.",
        },
        {
          title: "Käännetty kaikilla 35 kielellä",
          body: "Jokaisella kielellä on oma oikea sanansa „dish“:lle, joka on erilainen kuin „item“. Espanjaksi „plato“, ranskaksi „plat“, saksaksi „Gericht“, italiaksi „piatto“, katalaaniksi „plat“, japaniksi „料理“. Päivitimme käännösavaimen jokaisessa localessa ja varmistimme, että tulos lukee luonnollisesti jokaisella kielellä. Ei konekäännöstä; äidinkielenpuhujat tarkastivat jokaisen.",
        },
        {
          title: "Oletuskategoria luodaan myös automaattisesti",
          body: "Kun olimme editorissa, loimme myös automaattisesti oletuskategorian nimeltä „Menu“ ensimmäisellä kojelautavierailulla. Vanha käyttäytyminen: omistajat laskeutuivat tyhjälle ruokalistalle, joutuivat klikkaamaan „Add Category“ ennen kuin pystyivät lisäämään ruokaa, antoivat usein periksi. Uusi käyttäytyminen: Menu-kategoria on olemassa, napautat „Add Dish“, muokkaat välittömästi. Yksi este poistettu.",
        },
      ],
      benefitsTitle: "Miksi terminologia on tärkeä",
      benefits: [
        "„Dish“ vastaa sitä, miten ravintoloiden omistajat todella puhuvat",
        "Päivitetty jokaiselle kojelaudan pinnalle — painikkeet, merkinnät, tostit",
        "Käännetty kaikille 35 kielelle äidinkielenpuhujien tarkistajien toimesta",
        "Oletuskategoria luotu automaattisesti — ei tyhjää ruokalistaa aloittamiseen",
        "Nopeampi rekisteröitymisestä ensimmäiseen lisättyyn ruokaan",
        "Vähemmän henkistä käännöstä = matalampi poistuminen onboardingissa",
      ],
      conclusionTitle: "Puhu käyttäjän kieltä",
      conclusionBody:
        "Yleinen SaaS-terminologia („item“, „entity“, „object“) on hyvä insinööreille. Ravintoloiden omistajat tarvitsevat sanoja, jotka vastaavat sitä mitä he sanovat työssä. IQ Rest puhuu nyt samaa kieltä kuin ihmiset, jotka käyttävät sitä — jokaisella painikkeella, merkinnällä ja ilmoituksella — ja konversiodata heijastaa muutosta jo.",
      ctaText: "Rekisteröidy ja lisää ensimmäinen ruokasi alle minuutissa.",
      ctaButton: "Rakenna ruokalistani",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Automaattinen oletuskategoria ravintolan ruokalistan onboardingiin | IQ Rest",
        description:
          "Ensikäyttäjät eivät enää kohtaa tyhjää ruokalistaa. IQ Rest luo automaattisesti oletuskategorian, jotta voit lisätä ensimmäisen ruokasi välittömästi.",
      },
      title: "Automaattinen oletuskategoria — Ohita tyhjä ruokalista",
      subtitle:
        "Ensikäyttäjät laskeutuvat ruokalistalle, jossa on jo yksi oletuskategoria luotu. Napauta „Add Dish“ ja aloita muokkaus. Ei enää „luo kategoria ensin“ -estettä.",
      intro:
        "Vanha onboarding vaati käyttäjien luovan kategorian ennen ruoan lisäämistä. Tyhjät ruokalistat ovat pelottavia — monet uudet käyttäjät antoivat periksi siinä vaiheessa. IQ Rest luo nyt automaattisesti oletuskategorian „Menu“ ensimmäisellä kerralla kun avaat kojelaudan, jotta ensimmäinen toimintosi on ruoan lisääminen, ei hierarkian konfigurointi. Nopeampi, sujuvampi, useampia ruokalistoja todella rakennettu.",
      sections: [
        {
          title: "Oletuskategoria luotu kirjautumisessa",
          body: "Ensimmäisellä kerralla, kun kirjaudut tuoreeseen kojelautaan, IQ Rest tarkistaa onko sinulla kategorioita. Jos ei, luo yhden nimeltä „Menu“ (käännetty localellesi). Kategoria on välittömästi valmis vastaanottamaan ruokia. Voit nimetä sen uudelleen tai lisätä lisää kategorioita milloin tahansa — mutta sinun ei tarvitse ennen ensimmäisen ruoan lisäämistä.",
        },
        {
          title: "Nimetty uudelleen vastaamaan keittiöäsi kun käytät velhoa",
          body: "Jos käytit 3-vaiheista rekisteröitymisvelhoa, kylväjä generoi sen sijaan keittiöön sopivat kategoriat — „Pizza“, „Pasta“, „Antipasti“ italialaiselle; „Sushi“, „Ramen“, „Sake“ japanilaiselle. Automaattinen oletuskategoria „Menu“ aktivoituu vain käyttäjille, jotka ohittivat velhon tai rekisteröityivät Googlen kautta suoraan.",
        },
        {
          title: "Taaksepäin yhteensopiva olemassa olevien ruokalistojen kanssa",
          body: "Jos sinulla on jo kategorioita — aikaisemmasta käytöstä, tuoduista tiedoista, kylväjästä — oletusta ei luoda. Puutumme vain silloin, kun ruokalista on aidosti tyhjä. Olemassa olevat käyttäjät eivät näe muutosta ruokalistarakenteessaan.",
        },
      ],
      benefitsTitle: "Miksi automaattinen oletus nopeuttaa onboardingia",
      benefits: [
        "Ei „luo kategoria ensin“ -estettä uusille käyttäjille",
        "Napauta „Add Dish“ ensimmäisenä toimintona, ei toisena",
        "Kategoria nimetty localellasi, ei oletuksena englanniksi",
        "Velhovirta kylvää edelleen keittiöön sopivat kategoriat",
        "Olemassa olevat ruokalistat koskemattomia",
        "Nopeampi kirjautumisesta ensimmäiseen lisättyyn ruokaan",
      ],
      conclusionTitle: "Poista tyhjä tila",
      conclusionBody:
        "Tyhjät tilat ovat paikkoja, joissa uudet käyttäjät poistuvat. Jokainen este käyttäjän ja heidän ensimmäisen tuottavan toimintonsa välillä maksaa sinulle konversioita. Oletuskategorian automaattinen luominen poistaa sellaisen esteen. Se on pieni muutos, jolla on mitattava vaikutus siihen, kuinka nopeasti uudet ravintolat pääsevät julkaistavaan ruokalistaan.",
      ctaText: "Rekisteröidy ja aloita ruokien lisääminen välittömästi.",
      ctaButton: "Rakenna ruokalistani",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Ohita ravintolan nimi -vaihe onboardingissa | IQ Rest",
        description:
          "Pudotimme „ravintolan nimi“ -vaiheen onboardingista. Aseta se myöhemmin asetuksissa — tai suoraan ruokalistan herosta, jota muokkaat joka tapauksessa.",
      },
      title: "Ohita ravintolan nimi -vaihe onboardingissa",
      subtitle:
        "Sinun ei tarvitse kirjoittaa ravintolasi nimeä aloittaaksesi ruokalistan rakentamisen. Pudotimme tuon onboarding-vaiheen — aseta nimi myöhemmin kojelaudasta tai live-ruokalistan heron kautta.",
      intro:
        "Onboarding-virrat, jotka vaativat tietoja etukäteen, tuntuvat lomakkeen täyttämiseltä. Vanha IQ Restin onboarding kysyi ravintolan nimeä ensimmäisessä vaiheessa. Uudet käyttäjät eivät usein olleet päättäneet tarkkaa kirjoitusasua, brändivarianttia tai välimerkkejä — joten he juuttuivat ennen kuin näkivät kojelaudan. Poistimme vaiheen. Rekisteröidy, laskeudu kojelautaan, aseta nimi kun olet valmis. Ruokalista toimii edelleen hyvin ilman sitä.",
      sections: [
        {
          title: "Mitä tapahtuu kun ohitat",
          body: "Jos ohitat nimivaiheen, ravintola saa paikkamerkin („Your Restaurant“), joka on oletuksena piilotettu julkisella ruokalistalla. Vieraat, jotka skannaavat QR-koodisi, näkevät ruokalistan ilman nimeä herossa — mikä on rehellisesti sanoen hyvä monille pikapalvelupaikoille. Heti kun asetat nimen asetuksissa, se ilmestyy heroon, sivun otsikkoon, SEO-slugiin ja sosiaalisiin jakoihin.",
        },
        {
          title: "Aseta se mistä tahansa",
          body: "Nimikenttä on muokattavissa asetuksista, ruokalistan herosta (napauta muokataksesi rivin sisällä) ja julkisesta esikatselunäytöstä. Kolme eri pintaa, yksi taustalla oleva kenttä. Teimme helpoksi lykätä päätöstä ja triviaalisen helpoksi sitoutua, kun olet valmis.",
        },
        {
          title: "Ei SEO-rangaistusta oletuksena",
          body: "Käytämme slugia („your-restaurant“) varauskoenana sivun otsikolle ja SEO meta-tageille, kunnes asetat oikean nimen. Hakukoneet eivät rankaise sinua — ne näkevät vain yleisen otsikon. Sillä hetkellä, kun asetat oikean nimen, jokainen meta-tagi päivittyy ja Google indeksoi uudelleen tunneissa.",
        },
      ],
      benefitsTitle: "Miksi ohittaminen nopeuttaa onboardingia",
      benefits: [
        "Ei päätöspainetta väärässä hetkessä",
        "Laskeudu kojelautaan nopeammin",
        "Aseta nimi kun inspiraatio iskee — tai kun juridinen kokonaisuus on rekisteröity",
        "Rivin sisäinen muokkaus ruokalistan herosta",
        "Julkinen ruokalista toimii hyvin ilman asetettua nimeä",
        "Ei SEO-rangaistusta paikkamerkin käytöstä",
      ],
      conclusionTitle: "Vähemmän päätöksiä, enemmän tehty",
      conclusionBody:
        "Jokainen lomakekenttä onboardingissa on käyttäjälle mahdollisuus poistua. Ravintolan nimi -kentän poistamalla poistimme yhden sellaisen mahdollisuuden. Uudet käyttäjät laskeutuvat nyt kojelautaan toimivan ruokalistan kanssa ja vapaudella nimetä (tai olla nimeämättä) ravintolansa omalla aikataulullaan. Konversion nousu oli välitön.",
      ctaText: "Rekisteröidy sekunneissa — ravintolan nimeä ei tarvita.",
      ctaButton: "Aloita ilmainen kokeilu",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Kokeile ravintolan QR-ruokalistaa ennen rekisteröitymistä — anonyymisti | IQ Rest",
        description:
          "Rakenna esimerkkiruokalista ennen tilin luomista. Tallenna edistymisesi sähköpostiin kun haluat säilyttää sen. Ei sitoumuksia, ei kitkaa.",
      },
      title: "Kokeile QR-ruokalistaa ennen rekisteröitymistä",
      subtitle:
        "Rakenna esimerkkiruokalista, näe miltä QR-koodisi näyttää, esikatsele live-kokemus — kaikki ennen tilin luomista. Tallenna edistymisesi sähköpostilinkin kautta kun olet valmis.",
      intro:
        "Useimmat QR-ruokalistapalvelut vaativat sinut luomaan tilin ennen kuin voit tehdä mitään. Tämä on väärä järjestys. Uudet ravintoloiden omistajat haluavat tuntea tuotteen ensin — nähdä miltä ruoka näyttää, miltä QR-skannausvirta tuntuu — ja vasta sitten sitoutua rekisteröitymiseen. IQ Rest antaa nyt rakentaa täydellisen esimerkkiruokalistan anonyymisti. Kun haluat säilyttää sen, tallennamme sen sähköpostiisi. Kitkaton, sitoumukseton.",
      sections: [
        {
          title: "Anonyymi istunto tallentaa työsi",
          body: "Anonyymi istuntotunnus luodaan ensimmäisellä vierailullasi ja tallennetaan evästeeseen. Jokainen lisäämäsi kategoria, jokainen luomasi ruoka, jokainen lataamasi kuva on yhdistetty tuohon istuntoon. Voit poistua sivulta, palata, ja ruokalistasi on edelleen siellä. Säilytämme istunnon 7 päivää — runsaasti aikaa tuotteen arviointiin ilman painetta.",
        },
        {
          title: "Tallenna edistyminen sähköpostilinkin kautta",
          body: "Kun päätät, että haluat säilyttää ruokalistan, klikkaa „Save Progress“. Kirjoita sähköpostisi. Lähetämme sinulle taikalinkin, joka klikattaessa muuntaa anonyymin istunnon todelliseksi tiliksi, joka on yhdistetty sähköpostiisi. Kaikki työsi siirtyy automaattisesti — ei uudelleensyöttöä, ei menetettyä edistymistä, ei „upsista, se poistui“. Konversio maksavaksi asiakkaaksi tapahtuu sinun ehdoillasi.",
        },
        {
          title: "Vähentää rekisteröitymisahdistusta nollaan",
          body: "Sallimalla käyttäjien kokeilla ennen rekisteröitymistä käännämme tyypillisen SaaS-mallin ympäri. Vierailijoiden ei tarvitse päättää onko IQ Rest heidän sähköpostinsa arvoinen — he voivat nähdä itse. Ravintolat, jotka kokeilevat anonyymisti ja sitten rekisteröityvät, konvertoivat korkeammin kuin ravintolat, jotka pakotetaan rekisteröitymään ensin, koska he ovat jo investoineet ruokalistaan eivätkä halua menettää sitä.",
        },
      ],
      benefitsTitle: "Miksi anonyymi onboarding voittaa",
      benefits: [
        "Rakenna todellinen ruokalista ilman tilin luomista",
        "Anonyymi istunto säilyy 7 päivää",
        "Tallenna edistyminen sähköpostiin kun päätät sitoutua",
        "Ei uudelleensyöttöä — työ siirtyy todelliseen tiliisi",
        "Kitkaton tuotteen arviointi",
        "Korkeampi kokonaisrekisteröitymiskonversio",
      ],
      conclusionTitle: "Anna tuotteen myydä itsensä",
      conclusionBody:
        "Paras tapa vakuuttaa ravintolan omistaja, että IQ Rest on heille oikea, on antaa heidän käyttää sitä. Anonyymi onboarding muuttaa uteliaan vierailijan sitoutuneeksi käyttäjäksi pyytämättä mitään vastineeksi. Siihen mennessä, kun pyydät sähköpostia, käyttäjä on jo investoinut aikaa ruokalistaansa — sen tallentaminen ei maksa heille mitään, ja he säilyttävät sen mitä rakensivat.",
      ctaText: "Kokeile IQ Restiä nyt — ei tiliä tarvita.",
      ctaButton: "Kokeile ilmaiseksi",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Tallenna ravintolan ruokalistan edistyminen sähköpostilinkin kautta | IQ Rest",
        description:
          "Rakensitko esimerkkiruokalistan anonyymisti? Tallenna se sähköpostiisi ja lähetämme sinulle taikalinkin tilin lunastamiseen.",
      },
      title: "Tallenna ruokalistasi edistyminen sähköpostilinkin kautta",
      subtitle:
        "Rakensitko ruokalistan anonyymisti ja haluat säilyttää sen? Kirjoita sähköpostisi. Lähetämme taikalinkin, joka muuntaa anonyymin työsi todelliseksi tiliksi yhdellä napautuksella.",
      intro:
        "Kun olet käyttänyt viisi minuuttia esimerkkiruokalistan rakentamiseen ilman tiliä, et halua menettää sitä. IQ Restin „Save Progress“ -ominaisuus muuntaa anonyymin istuntosi todelliseksi tiliksi taikalinkin kautta. Kirjoita sähköpostisi, klikkaa linkkiä postilaatikossasi, ruokalistasi on pysyvästi yhdistetty tiliisi. Ei salasanaa, ei rekisteröitymislomaketta, ei tietojen uudelleensyöttöä.",
      sections: [
        {
          title: "Taikalinkkivirta — ei salasanaa",
          body: "Lähetämme kertakäyttöisen linkin sähköpostiisi. Klikkaa sitä 10 minuutin sisällä ja olet kirjautunut uuteen tiliin, joka sisältää anonyymisti rakentamasi ruokalistan. Ei salasanaa valittavaksi, ei turvakysymyksiä, ei sähköpostinvarmistusvaihetta — linkin klikkaus ON varmistus. Sitten myönnämme istuntoevästeen ja olet kojelaudan sisällä kaikki työsi säilytettynä.",
        },
        {
          title: "Konfliktinhallinta olemassa oleville tileille",
          body: "Jos kirjoittamallasi sähköpostilla on jo tili, emme korvaa sitä. Lähetämme linkin, klikkaat ja kysymme, yhdistetäänkö anonyymi ruokalista olemassa olevaan tiliisi vai hylätäänkö se. Useimmat käyttäjät valitsevat yhdistämisen — olemassa olevat ruokasi pysyvät, uudet anonyymistä muokkauksesta lisätään. Selkeä, turvallinen, ennustettava.",
        },
        {
          title: "Nopeusrajoitettu ja roskapostinkestävä",
          body: "Rajoitamme save-progress-pyyntöjä per IP ja per sähköposti väärinkäytön estämiseksi. Linkki vanhenee 10 minuutissa ja on kertakäyttöinen. Jos joku muu yrittää lunastaa anonyymin istuntosi, hän tarvitsee pääsyn postilaatikkoosi — sama turvallisuusmalli kuin jokaisessa modernissa taikalinkki-auth-virrassa.",
        },
      ],
      benefitsTitle: "Miksi taikalinkkitallennus voittaa",
      benefits: [
        "Ei salasanaa valittavaksi, muistettavaksi tai nollattavaksi",
        "Anonyymi työ siirtyy ehjänä todelliseen tiliisi",
        "Olemassa olevat tilit: valitse yhdistää tai hylätä",
        "Nopeusrajoitettu ja aikarajattu — turvallinen suunnittelulla",
        "Yksi napautus sitoutumiseen — ei rekisteröitymislomaketta",
        "Sähköposti itse toimii varmistusvaiheena",
      ],
      conclusionTitle: "Konversio ilman kitkaa",
      conclusionBody:
        "Hetki, jolloin käyttäjä haluaa muuntaa anonyymistä tunnistetuksi, on hetki, jolloin hän on todennäköisimmin poistumassa pitkältä rekisteröitymislomakkeelta. Taikalinkit taittavat sen lomakkeen yhdeksi sähköpostikentäksi plus postilaatikkoklikkaukseksi. Käyttäjä käyttää 30 sekuntia ja päätyy todelliseen, säilytettyyn tiliin, joka sisältää kaiken mitä rakensi. Se on alhaisimman kitkan konversiovirta QR-ruokalistateollisuudessa.",
      ctaText: "Rakenna ruokalista anonyymisti, sitten tallenna se sähköpostin kautta kun olet valmis.",
      ctaButton: "Kokeile ilmaiseksi",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Yhden klikkauksen Stripe checkout palaaville käyttäjille | IQ Rest",
        description:
          "Jo kirjautunut sisään? Klikkaa hinnoittelussa olevaa suunnitelmaa ja mene suoraan Stripe checkoutiin. Ei tilitietojen uudelleensyöttöä, ei lisänäyttöjä.",
      },
      title: "Yhden klikkauksen Stripe checkout palaaville käyttäjille",
      subtitle:
        "Sisäänkirjautunut käyttäjä klikkaa suunnitelmaa? Suoraan Stripe checkoutiin, ei lisävahvistusnäyttöä. Kaksi klikkausta hinnoittelusivulta aktiiviseen tilaukseen.",
      intro:
        "Palaavilla käyttäjillä, joilla on jo IQ Rest -tili, ei pitäisi tarvitse vahvistaa mitään uudelleen päivittäessä. Poistimme jokaisen välinäytön „klikkaa suunnitelmaa hinnoittelussa“ ja „laskeudu Stripe checkoutiin“ välillä. Kaksi klikkausta yhteensä: valitse suunnitelma, syötä korttitiedot. Tilaus on aktiivinen ennen kuin lopetat kahvisi.",
      sections: [
        {
          title: "Tunnista sisäänkirjautunut tila hinnoittelussa",
          body: "Hinnoittelusivumme tarkistaa todennetun istuntoevästeen latauksessa. Jos olet sisäänkirjautunut, suunnitelmapainikkeet ohittavat „rekisteröidy ensin“ -kierroksen ja menevät suoraan /api/stripe/checkout, joka luo Stripe Checkout Session ja palauttaa URL:n uudelleenohjausta varten. Jos et ole sisäänkirjautunut, painikkeet vievät sinut standardi rekisteröitymisvirran läpi ensin — ei käyttäytymismuutosta uusille käyttäjille.",
        },
        {
          title: "UI-locale lähetetty Stripeen",
          body: "Kojelautasi locale lähetetään Stripe Checkoutiin locale-parametrin kautta, jotta checkout-sivu renderöidään kielelläsi. Espanjalaiset käyttäjät näkevät Stripen espanjaksi; saksalaiset käyttäjät näkevät Stripen saksaksi. Checkout-virta tuntuu saumattomalta, koska se ei koskaan riko kielen jatkuvuutta kojelaudastasi.",
        },
        {
          title: "Paluu-URL laskeuttaa sinut takaisin kojelautaan",
          body: "Onnistuneen maksun jälkeen Stripe ohjaa paluu-URL:ään, jonka asetamme kojelaudan juuriksi localellasi (esim. /es/dashboard). Webhook päivittää tilauksesi tilan palvelinpuolella ennen saapumistasi, joten kojelauta, johon laskeudut, heijastaa jo uutta suunnitelmaa — ei „odotettavissa“ -tilaa, ei ei-päivitetyn sisällön välähdystä.",
        },
      ],
      benefitsTitle: "Miksi yhden klikkauksen checkout konvertoi",
      benefits: [
        "Kaksi klikkausta hinnoittelusta aktiiviseen tilaukseen",
        "Ei „vahvista tilisi“ -välinäyttöä sisäänkirjautuneille käyttäjille",
        "Stripe checkout näytetään kojelautasi kielellä",
        "Paluu-URL laskeuttaa sinut päivitettyyn kojelautaan",
        "Webhook päivittää suunnitelman ennen saapumistasi — ei vilkkumista",
        "Uudet käyttäjät saavat edelleen standardin rekisteröityminen → päivitys -virran",
      ],
      conclusionTitle: "Tee helppo polku triviaalisen helpoksi",
      conclusionBody:
        "Käyttäjä, joka on jo vakuuttunut, ei tarvitse lisää vakuuttamista — tarvitsee vähemmän klikkauksia. Yhden klikkauksen checkout poistaa jokaisen näytön aikomuksen ja maksun välillä palaaville käyttäjille. Tulos: korkeampi kokeilusta-maksuun -konversio, vähemmän hylättyjä päivityksiä, nopeampi tulojen tunnistaminen tilauksen laajentamiselle.",
      ctaText: "Jo käyttäjä? Valitse suunnitelmasi ja päivitä kahdella klikkauksella.",
      ctaButton: "Katso hinnat",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Kojelaudan UI-uudelleensuunnittelu: Kortit, navigointi ja lomakkeet | IQ Rest",
        description:
          "IQ Restin kojelauta uudelleensuunniteltu yhtenäisillä korttikomponenteilla, pysyvällä sivupalkkinavigoinnilla aktiivisen sivun korostuksella ja parannetuilla lomaketoiminnoilla.",
      },
      title: "Kojelaudan UI-uudelleensuunnittelu: Yhtenäiset kortit, navigointi ja lomaketoiminnot",
      subtitle:
        "Hiottu kojelauta yhtenäisellä korttityylillä, pysyvällä sivupalkkinavigoinnilla, korostusvärillä aktiivisilla tiloilla ja alaosan tallenna/poista -toiminnoilla jokaisella lomakesivulla.",
      intro:
        "IQ Rest on käynyt läpi kattavan kojelaudan UI-uudelleensuunnittelun. Jokainen sivu käyttää nyt yhtenäistä korttityyliä yhtenäisillä reunasäteillä, pysyvää sivupalkkinavigointia korostusvärillä aktiivisilla tiloilla ja parannettuja lomakesivuja alaosan tallenna ja poista -toiminnoilla. Tulos on puhtaampi, hiotumpi kokemus ravintolasi digitaalisen QR-ruokalistan hallintaan.",
      sections: [
        {
          title: "Yhtenäinen korttisuunnittelu kaikilla sivuilla",
          body: "Jokainen kojelautasivu käyttää nyt yhtenäistä DashboardCard-komponenttia yhtenäisillä pyöristetyillä reunoilla, hienovaraisilla taustaväreillä ja valinnaisilla osioiden otsikoilla. Analytiikka, laskutus, asetukset, yhteystiedot, varausasetukset ja kaikki lomakesivut jakavat saman visuaalisen kielen. Vihjemerkinnät popover-tooltipeillä korvaavat rivin sisäisen kuvaustekstin, pitäen käyttöliittymän puhtaana ja tarjoten silti hyödyllistä kontekstia tarvittaessa.",
        },
        {
          title: "Pysyvä sivupalkkinavigointi aktiivisilla tiloilla",
          body: "Työpöytänäytöillä pysyvä sivupalkkinavigointi on nyt näkyvissä jokaisella sivulla. Aktiivinen sivu on korostettu korostusväritaustalla, tehden välittömästi selväksi missä olet. Alasivut kuten kategoriat, kohteet ja tilaukset korostavat oikein vanhempi Menu-kohdan. Sivupalkki sisältää nopean pääsyn Ruokalistaan, Print QR, Varaukset, Analytiikka, Asetukset, Yhteystiedot, Laskutus ja Tuki — kaikki ilman nykyisen näkymän jättämistä.",
        },
        {
          title: "Parannetut lomakesivut alaosan toiminnoilla",
          body: "Kaikilla lomakesivuilla — kategoriat, kohteet, pöydät, suunnittelu, asetukset, yhteystiedot ja varausasetukset — on nyt päällekkäinen tallennuspainike alaosassa korostusvärillä. Poistopainikkeet ilmestyvät vasemmalle puolelle vaimennetulla tyylillä. Tämä tarkoittaa, että sinun ei tarvitse enää vierittää takaisin ylös tallentaaksesi muutoksesi. Uloskirjautumispainike siirrettiin sivupalkista suunnittelusivun alaosaan, pitäen navigoinnin keskittyneenä olennaisiin toimintoihin.",
        },
      ],
      benefitsTitle: "UI-uudelleensuunnittelun edut",
      benefits: [
        "Yhtenäinen korttityyli yhtenäisillä reunoilla ja taustoilla kaikilla sivuilla",
        "Pysyvä sivupalkkinavigointi työpöydällä korostusvärillä aktiivisilla tiloilla",
        "Alaosan tallennuspainikkeet kaikilla lomakkeilla — ei tarvetta vierittää ylös tallentaaksesi",
        "Poista- ja tallenna-toiminnot selkeästi erotettu — poista vasen, tallenna oikea",
        "Osioiden otsikot lomakekorteilla parempaa visuaalista organisointia varten",
        "Puhtaampi analytiikkasivu DashboardCard-kääreillä ja parannetulla laitetilastojen asettelulla",
      ],
      conclusionTitle: "Hiotumpi kojelautakokemus",
      conclusionBody:
        "Tämä UI-uudelleensuunnittelu tuo visuaalista yhtenäisyyttä ja parannettua käytettävyyttä jokaiseen IQ Restin kojelaudan kulmaan. Olipa kyse ruokalistakohteiden muokkauksesta, analytiikan tarkistamisesta tai varausten hallinnasta, käyttöliittymä tuntuu yhtenäiseltä ja intuitiiviselta. Yhdistettynä pysyvään sivupalkkinavigointiin ravintolasi digitaalisen QR-ruokalistan hallinta on nopeampaa ja miellyttävämpää kuin koskaan.",
      ctaText: "Koe uudelleensuunniteltu kojelauta",
      ctaButton: "Avaa kojelauta",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("AI Menu Scanner — Luo digitaalinen QR-ruokalista yhdellä valokuvalla"),
    "redesigned-dashboard-qr-menu-management": stub("Uudelleensuunniteltu kojelauta QR-ruokalistan hallintaan"),
    "reservation-emails-analytics-digital-qr-menu": stub("Varaussähköpostit ja analytiikka digitaaliselle QR-ruokalistallesi"),
    "multi-currency-geo-pricing-qr-menu": stub("Monivaluuttainen geo-hinnoittelu QR-ruokalistallesi"),
    "support-qr-menu-restaurant-cafe": stub("Sovelluksen sisäinen tuki QR-ruokalistallesi"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Yksityiskohtainen analytiikka QR-ruokalistasivustollesi"),
    "instant-qr-menu-restaurant-website-generator": stub("Välitön QR-ruokalista- ja ravintolasivuston generaattori"),
    "subscription-plans-qr-menu-restaurant-website": stub("Tilaussuunnitelmat QR-ruokalistallesi"),
    "public-restaurant-qr-menu-website": stub("Julkinen ravintolan QR-ruokalistasivusto"),
    "add-items-restaurant-qr-menu-website": stub("Lisää kohteita QR-ruokalistaasi sekunneissa"),
    "qr-menu-restaurant-categories": stub("Kategoriat ravintolasi QR-ruokalistaan"),
    "easy-qr-menu-cafe-control-panel": stub("Helppo QR-ruokalistakahvilan ohjauspaneeli"),
    "faq-page-organization": stub("UKK-sivun organisointi"),
    "free-restaurant-website-improvements": stub("Ilmaiset ravintolasivuston parannukset"),
    "user-authentication-interface": stub("Käyttäjän todennusliittymä"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Edut",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Kokeile IQ Restiä",
    ctaButton: "Aloita ilmainen kokeilu",
  };
}
