import type { HelpDoc } from "../types";

// HR help guide.
export const hr: HelpDoc = {
  metaTitle: "Kako koristiti IQ Rest — vodič korak po korak",
  metaDescription:
    "Potpuni vodič za IQ Rest: registracija, jelovnik, narudžbe, rezervacije, kuhinjski zaslon i postavke — za restorane.",
  h1: "Pomoć",
  intro: "Detaljan vodič za IQ Rest — od registracije do finih postavki.",
  banner: {
    title: "Jednostavnije je nego što izgleda",
    sub: "Vodič korak po korak: od registracije do finih postavki — svatko to može.",
    cta: "Kako funkcionira",
  },
  tipLabel: "Savjet",
  noteLabel: "Važno",
  sections: [
    {
      id: "start",
      title: "1. Početak",
      blocks: [
        { type: "h3", text: "Što je ovaj sustav" },
        {
          type: "p",
          text: "IQ Rest je usluga za restorane: izrađujete online jelovnik s QR kodom, primate narudžbe i rezervacije stolova izravno s gostiju telefona, dok u kuhinji i kod konobara rade tableti-terminali. Sve se upravlja iz jedne administratorske ploče (nadzorne ploče).",
        },
        { type: "h3", text: "Registracija i prijava" },
        { type: "p", text: "Prijaviti se možete na tri načina — odaberite bilo koji na zaslonu za prijavu:" },
        {
          type: "list",
          items: [
            "Putem Googlea — kliknite „Nastavi s Googleom“ i odaberite račun.",
            "Putem Applea — kliknite „Nastavi s Appleom“.",
            "E-poštom — kliknite „Nastavi e-poštom“, unesite adresu, a mi šaljemo 6-znamenkasti kôd. Unesite ga na sljedećem zaslonu. Lozinka nije potrebna.",
          ],
        },
        {
          type: "note",
          text: "E-poštom dobivate samo jednokratni kôd za prijavu — bez neželjene pošte, bez biltena.",
        },
        { type: "h3", text: "Izrada restorana (uvođenje)" },
        {
          type: "p",
          text: "Pri prvoj prijavi sustav vas vodi kroz brzu postavu. Zatim se automatski izrađuje restoran s primjernim predloškom jelovnika koji kasnije zamijenite svojim.",
        },
        {
          type: "steps",
          items: [
            "Unesite naziv restorana.",
            "Odaberite vrstu kuhinje (određuje početni predložak jelovnika).",
            "Gotovo: dolazite u nadzornu ploču s već ispunjenim primjernim jelovnikom.",
          ],
        },
        {
          type: "note",
          text: "Valuta se automatski prepoznaje prema vašoj regiji — na početku je ne morate birati. Kasnije je promijenite u Postavke → Regija.",
        },
        { type: "h3", text: "Pregled nadzorne ploče" },
        {
          type: "p",
          text: "Navigacija među odjeljcima: na računalu gornja traka, na telefonu donja traka. Odjeljci: Jelovnik, Narudžbe, Rezervacije, Kuhinja, Analitika i Postavke.",
        },
        {
          type: "list",
          items: [
            "Pokraj naziva restorana u gornjoj traci je mali pokazatelj veze: zelena točka znači da se narudžbe sinkroniziraju u stvarnom vremenu.",
            "Na stranici „Jelovnik“ gore je gumb „Pregled“ — otvara vaš jelovnik onako kako ga vidi gost.",
            "Tu pokraj gumb „Podijeli“ — prikazuje QR kôd i poveznicu na jelovnik (kopiraj poveznicu, preuzmi QR ili otvori jelovnik).",
          ],
        },
        {
          type: "tip",
          text: "Pritisnite „Pregled“ nakon svake promjene jelovnika — odmah vidite kako izgleda gostu.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Jelovnik",
      blocks: [
        {
          type: "p",
          text: "Odjeljak „Jelovnik“ srce je sustava. Ovdje gradite strukturu: kategorije → jela → opcije. Otvorite ga iz navigacije.",
        },
        { type: "h3", text: "Kategorije i potkategorije" },
        {
          type: "steps",
          items: [
            "Kliknite „Dodaj kategoriju“ i unesite naziv (na primjer „Predjela“).",
            "Za uređivanje kategorije — prijeđite na nju i kliknite „Uredi kategoriju“.",
            "Redoslijed kategorija mijenjate gumbima „Gore“ / „Dolje“ — točno tim redoslijedom ih gost vidi.",
            "Možete izraditi „Grupu“ (preko „Dodaj grupu“) — kategoriju-odjeljak koja sadrži druge kategorije.",
          ],
        },
        { type: "h3", text: "Dodavanje jela" },
        {
          type: "steps",
          items: [
            "Proširite kategoriju (strelica lijevo) i kliknite „Dodaj jelo“.",
            "Ispunite naziv, cijenu i opis.",
            "Dodajte fotografiju: „Dodaj fotografiju“ — učitajte svoju ili kliknite „Generiraj“ i opišite jelo riječima da UI izradi sliku.",
            "Spremite. Jelo se pojavljuje u kategoriji.",
          ],
        },
        {
          type: "tip",
          text: "Fotografiju može generirati UI: navedite kut, osvjetljenje ili pozadinu (na primjer „Pizza Margherita na drvenoj dasci, pogled odozgo“).",
        },
        { type: "h3", text: "Opcije i varijante (modifikatori)" },
        {
          type: "p",
          text: "Opcije su izbori unutar jela: veličina, pečenost, dodatni sastojci. Svaka opcija ima varijante, a varijanti se može dodati nadoplata (na primjer „+1.50 po komadu“).",
        },
        {
          type: "list",
          items: [
            "Primjer: opcija „Veličina“ s varijantama „Mala / Velika (+2.00)“.",
            "Primjer: opcija „Dodatak“ s više varijanti od kojih gost bira jednu ili više.",
          ],
        },
        { type: "h3", text: "Alergeni i dijete" },
        {
          type: "p",
          text: "Na jelu možete označiti alergene (gluten, orašasti plodovi itd.) i prehrambene oznake (vegetarijansko, vegansko). Gost ih vidi kao ikone u javnom jelovniku.",
        },
        { type: "h3", text: "Vidljivost jela" },
        {
          type: "p",
          text: "Gumb „Sakrij jelo“ / „Prikaži jelo“ privremeno uklanja stavku iz javnog jelovnika bez brisanja — korisno kad jela ponestane.",
        },
        { type: "h3", text: "Učitavanje papirnatog jelovnika (skeniranje)" },
        {
          type: "p",
          text: "Ako već imate jelovnik kao fotografiju ili PDF — nemojte ga unositi ručno. Upotrijebite skeniranje:",
        },
        {
          type: "steps",
          items: [
            "Kliknite natpis „Učitaj jelovnik“ (ili „Učitajte svoj papirnati jelovnik“).",
            "Dodajte do 5 datoteka (fotografija/sken, svaka do 20 MB) i kliknite „Skeniraj“.",
            "Pričekajte do minute — UI prepoznaje kategorije i jela.",
            "Provjerite prepoznato, označite željene stavke i kliknite „Nastavi“.",
            "Odaberite: zamijeni trenutni jelovnik ili dodaj nove stavke postojećem.",
          ],
        },
        {
          type: "note",
          text: "Primjeri iz početnog predloška uklanjaju se pri spremanju skeniranog jelovnika — to je normalno.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Stolovi i QR kodovi",
      blocks: [
        {
          type: "p",
          text: "Stolovi služe za povezivanje narudžbi i rezervacija s određenim mjestima te za ispis osobnih QR kodova. Odjeljak: Postavke → Stolovi.",
        },
        { type: "h3", text: "Izrada stolova" },
        {
          type: "steps",
          items: [
            "Otvorite Postavke → Stolovi i kliknite „Dodaj stol“.",
            "Navedite broj stola, broj mjesta i (neobavezno) naziv — na primjer „Prozor“, „Šank“, „Terasa“.",
            "Dodajte fotografiju stola — gosti je vide i razumiju gdje je točno njihov stol.",
            "Postavite boju stola — tom bojom stol je istaknut u kuhinji i u odjeljku „Narudžbe“ da ga osoblje brzo pronađe.",
            "Po želji dodajte kratak opis.",
            "Spremite.",
          ],
        },
        {
          type: "note",
          text: "Fotografija stola je za goste (orijentacija „gdje je moj stol“). Boja je za osoblje (brza vizualna oznaka stola u kuhinji i narudžbama).",
        },
        { type: "h3", text: "QR kôd stola" },
        {
          type: "p",
          text: "Svaki stol ima svoj QR kôd. Gost ga skenira telefonom i dolazi izravno u jelovnik tog stola — narudžba se automatski povezuje s pravim stolom.",
        },
        {
          type: "steps",
          items: [
            "Kliknite „Prikaži QR kôd“ na željenom stolu.",
            "Kliknite „Preuzmi QR“ da spremite sliku.",
            "Ispišite ga i postavite na stol (na stalak, u jelovnik, na naljepnicu).",
          ],
        },
        {
          type: "tip",
          text: "„Poveznica stola“ ista je poveznica kao u QR-u, ali kao tekst. Možete je gostu poslati u poruci.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Narudžbe",
      blocks: [
        { type: "h3", text: "Kako gost naručuje" },
        {
          type: "p",
          text: "Gost skenira QR na stolu → otvara se jelovnik → bira jela, opcije i količinu → predaje narudžbu. Narudžba se odmah pojavljuje u vašoj nadzornoj ploči i na terminalu kuhinje/konobara.",
        },
        {
          type: "note",
          text: "Da bi gosti mogli naručivati, u Postavke → Narudžbe mora biti uključeno „Primaj narudžbe“. Ako je isključeno, gost vidi jelovnik, ali gumba za narudžbu nema.",
        },
        { type: "h3", text: "Rad s narudžbama u nadzornoj ploči" },
        {
          type: "p",
          text: "Odjeljak „Narudžbe“ prikazuje tlocrt. Zauzeti stolovi su istaknuti i prikazuju broj aktivnih narudžbi. Dodirnite stol da otvorite njegove narudžbe.",
        },
        {
          type: "steps",
          items: [
            "Dodirnite stol → „Započni narudžbu“ (ili otvorite postojeću).",
            "„Dodaj stavku“ → odaberite kategoriju → jelo → opcije → po potrebi navedite količinu i napomene (na primjer „bez luka“).",
            "Kliknite „Dodaj“ — stavka ulazi u narudžbu.",
          ],
        },
        { type: "h3", text: "Statusi stavki" },
        {
          type: "p",
          text: "Svaka stavka ima status: Na čekanju → Priprema se → Spremno → Posluženo. Dodirnite stavku da promijenite status. Statusi se sinkroniziraju s kuhinjom u stvarnom vremenu.",
        },
        { type: "h3", text: "Popusti, podjela, promjena stola" },
        {
          type: "list",
          items: [
            "Popust: „Dodaj popust“ — postotak ili fiksni iznos, na cijelu narudžbu ili jednu stavku, s razlogom.",
            "Podijeli narudžbu: „Podijeli narudžbu“ — odaberite stavke koje idu na novi zaseban račun.",
            "Promijeni stol: „Promijeni stol“ — premjestite narudžbu na drugi stol.",
            "Dupliciraj stavku: brzo dodajte još jednu istu.",
          ],
        },
        { type: "h3", text: "Završetak narudžbe" },
        {
          type: "steps",
          items: [
            "Kad su sve stavke poslužene, kliknite „Završi narudžbu“.",
            "Odaberite način plaćanja (ako su načini postavljeni).",
            "Narudžba se zatvara i napušta aktivne.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kuhinja (KDS)",
      blocks: [
        {
          type: "p",
          text: "Kuhinjski zaslon (KDS) zaslon je na tabletu za kuhare. Nove narudžbe dolaze na njega u stvarnom vremenu, a kuhar označava jela kao spremna.",
        },
        { type: "h3", text: "Što zaslon prikazuje" },
        {
          type: "list",
          items: [
            "Kartice narudžbi sa stavkama, opcijama i vremenom „na izdaji“.",
            "Bojom označen status: što se priprema, što je spremno.",
            "Zvučni signal pri dolasku nove narudžbe.",
          ],
        },
        { type: "h3", text: "Kako se koristi" },
        {
          type: "steps",
          items: [
            "Dodirnite stavku da je pomaknete u sljedeći status (Priprema se → Spremno).",
            "Uključite zvuk gumbom „Uključi zvuk“ — tada nove narudžbe dolaze sa zvučnim signalom.",
            "Zumom prilagodite veličinu kartica tabletu.",
            "Filtrima možete prikazati samo potrebne kategorije (na primjer samo toplu liniju).",
          ],
        },
        {
          type: "note",
          text: "Ako tablet izgubi internet, pojavljuje se upozorenje „Nema veze“. Spojite Wi-Fi i narudžbe će opet dolaziti.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervacije",
      blocks: [
        {
          type: "p",
          text: "Gosti mogu rezervirati stol putem vašeg jelovnika, a vi upravljate rezervacijama u odjeljku „Rezervacije“ (prikaz „Mjesec“ / „Dan“).",
        },
        { type: "h3", text: "Postavljanje rezervacija" },
        { type: "p", text: "Prvo uključite i postavite rezervacije: Postavke → Rezervacije." },
        {
          type: "steps",
          items: [
            "Uključite „Omogući rezervacije“.",
            "Odaberite način potvrde: „Automatski“ (rezervacije se same potvrđuju) ili „Ručno“ (svaku potvrđujete vi).",
            "Postavite „Trajanje rezervacije“ — koliko se dugo stol drži za gosta.",
            "Ispunite „Tjedni raspored“: za svaki dan — otvoreno/zatvoreno, radno vrijeme i po potrebi pauza za ručak.",
          ],
        },
        {
          type: "note",
          text: "Za primanje rezervacija potrebni su stolovi. Ako ih nema, sustav traži da ih prvo dodate.",
        },
        { type: "h3", text: "Rad s rezervacijama" },
        {
          type: "list",
          items: [
            "Nove rezervacije koje čekaju odluku skupljene su u bloku „Čekaju potvrdu“.",
            "Gumbi „Potvrdi“ / „Odbij“ — za svaku rezervaciju.",
            "„Završi“ — označava da je gost došao i rezervacija je obavljena.",
            "Prebacujte se između „Mjesec“ i „Dan“, listajte razdoblje gumbima „Natrag“ / „Naprijed“.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Uređaji (tableti)",
      blocks: [
        {
          type: "p",
          text: "Terminali kuhinje, konobara i rezervacija zasebni su tableti koji se s vašim računom povezuju kodom. Odjeljak: Postavke → Uređaji.",
        },
        {
          type: "note",
          text: "Uređaji su dostupni na plaćenom paketu ili tijekom aktivnog probnog razdoblja.",
        },
        { type: "h3", text: "Povezivanje tableta (uparivanje)" },
        {
          type: "steps",
          items: [
            "U nadzornoj ploči: Postavke → Uređaji → „Dodaj uređaj“.",
            "Navedite naziv (na primjer „Kuhinja — topla linija“) i vrstu: Kuhinja, Konobar ili Rezervacije.",
            "Kliknite „Generiraj kôd“ — pojavljuje se 6-znamenkasti kôd (vrijedi 2 minute).",
            "Na tabletu otvorite zaslon za povezivanje i unesite taj kôd.",
            "Tablet se povezuje i odmah počinje raditi u odabranoj ulozi.",
          ],
        },
        { type: "tip", text: "Ako je kôd istekao — samo kliknite „Novi kôd“ i unesite svježi." },
        { type: "h3", text: "Upravljanje uređajima" },
        {
          type: "list",
          items: [
            "Statusi: Na mreži / Izvan mreže / Čeka povezivanje / Opozvano.",
            "„Opozovi“ — odspaja tablet (na primjer ako je izgubljen). Za ponovnu prijavu potreban je novi kôd.",
            "„Izbriši“ — trajno uklanja uređaj s popisa.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analitika",
      blocks: [
        {
          type: "p",
          text: "Odjeljak „Analitika“ prikazuje ključne brojke lokala: prihod, broj narudžbi i njihovu raščlambu (na primjer po načinu plaćanja i vremenu). Koristite je da razumijete što se i kada najbolje prodaje.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Postavke",
      blocks: [
        {
          type: "p",
          text: "Odjeljak „Postavke“ otvara se kao skup kartica-odjeljaka. Na vrhu je preklopnik aktivnog restorana (ako ih imate više). Ispod — svaka kartica redom.",
        },
        { type: "h3", text: "Web-mjesto" },
        {
          type: "list",
          items: [
            "URL javnog jelovnika — jedinstvena adresa vašeg jelovnika (možete postaviti vlastiti kratki slug i kopirati poveznicu).",
            "Naziv (naslov) lokala na javnom web-mjestu.",
            "Boja naglaska — glavna boja gumba i isticanja u jelovniku.",
            "Pozadina — slika ili videozapis na početnoj stranici; učitajte svoju ili generirajte pozadinu pomoću UI iz opisa.",
            "Izgled jelovnika — kako se jela prikazuju gostu.",
          ],
        },
        { type: "h3", text: "Kontakti i adresa" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp i oznaka na karti — sve se gostu prikazuje na stranici s kontaktima vašeg jelovnika.",
        },
        { type: "h3", text: "Regija" },
        { type: "p", text: "Valuta (koristi se za sve cijene) i vremenska zona lokala." },
        { type: "h3", text: "Stolovi" },
        { type: "p", text: "Tlocrt, mjesta i QR kodovi stolova — detaljno u odjeljku 3." },
        { type: "h3", text: "Uređaji" },
        {
          type: "p",
          text: "Povezivanje tableta za kuhinjski zaslon i konobarske terminale — detaljno u odjeljku 7.",
        },
        { type: "h3", text: "Narudžbe" },
        {
          type: "list",
          items: [
            "„Primaj narudžbe“ — glavni prekidač za primanje narudžbi.",
            "„Način narudžbi“ — Interni i/ili WhatsApp.",
            "„Obavezna polja“ — koje podatke gost mora navesti (Ime, Telefon, Adresa).",
            "„Načini plaćanja“ — za integraciju platnog sustava restorana obratite se podršci.",
          ],
        },
        { type: "h3", text: "Rezervacije" },
        {
          type: "p",
          text: "Uključivanje rezervacija, automatska ili ručna potvrda, trajanje i radno vrijeme — detaljno u odjeljku 6.",
        },
        { type: "h3", text: "Jezici" },
        {
          type: "steps",
          items: [
            "Otvorite Postavke → Jezici.",
            "Odaberite jezike na koje se prevodi javni jelovnik (dodirnite za dodavanje/uklanjanje).",
            "Postavite zadani jezik.",
            "Tekstovi se prevode ručno ili gumbom „Prevedi pomoću UI“ — sustav prevodi nazive i opise jela na odabrane jezike.",
          ],
        },
        { type: "h3", text: "Plaćanje" },
        { type: "p", text: "Pretplatni paket, status probnog razdoblja i upravljanje plaćanjima." },
        {
          type: "list",
          items: [
            "Mjesečno ili godišnje obračunavanje (godišnje je jeftinije).",
            "„Pretplati se“ / „Promijeni“ — odaberite ili promijenite paket.",
            "„Upravljaj“ — promijenite način plaćanja ili otkažite pretplatu.",
          ],
        },
        {
          type: "note",
          text: "Plaćanje je u EUR. Za plaćanje u drugoj valuti obratite se podršci.",
        },
        { type: "h3", text: "Podrška" },
        {
          type: "p",
          text: "Ugrađeni razgovor s našim timom u stvarnom vremenu. Napišite poruku — odgovaramo upravo ovdje.",
        },
        { type: "h3", text: "Promjena i dodavanje restorana" },
        {
          type: "p",
          text: "Ako imate više lokala, preklopnik restorana je na vrhu odjeljka „Postavke“.",
        },
        {
          type: "steps",
          items: [
            "Otvorite preklopnik restorana na vrhu „Postavki“.",
            "„Dodaj restoran“ → unesite naziv.",
            "Odaberite „Dupliciraj trenutni jelovnik i postavke“ (brzi početak) ili „Počni od nule“ (prazan restoran).",
            "Izradite ga — i prebacujte se među restoranima bilo kada upravo ovdje.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Javni jelovnik za goste",
      blocks: [
        {
          type: "p",
          text: "Javni jelovnik je ono što gost vidi nakon skeniranja QR-a. Sastavlja se automatski iz vašeg jelovnika, brendinga i kontakata.",
        },
        {
          type: "list",
          items: [
            "Adresa jelovnika postavlja se u Postavke → Regija („Poveznica jelovnika“).",
            "Opći QR kôd i poveznicu jelovnika dobivate gumbom „Podijeli“ na stranici „Jelovnik“.",
            "Svaki stol ima svoj zaseban QR (Postavke → Stolovi) koji vodi u jelovnik baš tog stola.",
            "Izgled (pozadina, boja naglaska, raspored) postavlja se u odjeljku „Web-mjesto“.",
            "Gumb „Pregled“ otvara jelovnik onako kako ga vidi gost.",
          ],
        },
        {
          type: "tip",
          text: "Nakon svake promjene jelovnika/postavki pritisnite „Pregled“ da provjerite kako izgleda gostu.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Česta pitanja i pojedinosti",
      blocks: [
        { type: "h3", text: "Gost ne može predati narudžbu" },
        {
          type: "p",
          text: "Provjerite Postavke → Narudžbe → „Primaj narudžbe“ (mora biti uključeno) i da je odabran barem jedan način narudžbi.",
        },
        { type: "h3", text: "Ne dolaze rezervacije" },
        {
          type: "p",
          text: "Provjerite jesu li rezervacije uključene u Postavke → Rezervacije, jesu li dodani stolovi i da dan u rasporedu nije označen kao „Zatvoreno“.",
        },
        { type: "h3", text: "Tablet se ne povezuje" },
        {
          type: "p",
          text: "Kôd vrijedi 2 minute. Ako je istekao — generirajte novi u Postavke → Uređaji. Ako je uređaj opozvan — izradite novi kôd.",
        },
        { type: "h3", text: "Jela je ponestalo" },
        {
          type: "p",
          text: "Nemojte ga brisati — kliknite „Sakrij jelo“. Nestaje iz javnog jelovnika, a vraćate ga gumbom „Prikaži jelo“.",
        },
        { type: "h3", text: "Trebate uređaje/terminale, a nemate ih" },
        {
          type: "p",
          text: "Odjeljak „Uređaji“ dostupan je na plaćenom paketu ili tijekom aktivnog probnog razdoblja. Provjerite Postavke → Plaćanje.",
        },
        { type: "h3", text: "Imate još pitanja" },
        {
          type: "p",
          text: "Pišite nam u Postavke → Podrška — to je ugrađeni razgovor s našim timom.",
        },
      ],
    },
  ],
};
