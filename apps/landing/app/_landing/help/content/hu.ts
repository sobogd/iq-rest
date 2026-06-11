import type { HelpDoc } from "../types";

// HU help guide.
export const hu: HelpDoc = {
  metaTitle: "Az IQ Rest használata — lépésről lépésre útmutató",
  metaDescription:
    "Teljes IQ Rest útmutató: regisztráció, menü, rendelések, foglalások, konyhai kijelző és beállítások — éttermeknek.",
  h1: "Súgó",
  intro: "Részletes útmutató az IQ Resthez — a regisztrációtól a finomabb beállításokig.",
  banner: {
    title: "Egyszerűbb, mint amilyennek látszik",
    sub: "Lépésről lépésre útmutató: a regisztrációtól a finomabb beállításokig — bárki megcsinálja.",
    cta: "Hogyan működik",
  },
  tipLabel: "Tipp",
  noteLabel: "Fontos",
  sections: [
    {
      id: "start",
      title: "1. Kezdő lépések",
      blocks: [
        { type: "h3", text: "Mi ez a rendszer" },
        {
          type: "p",
          text: "Az IQ Rest éttermeknek szóló szolgáltatás: online menüt készítesz QR-kóddal, rendeléseket és asztalfoglalásokat fogadsz közvetlenül a vendégek telefonjáról, a konyhában és a pincéreknél pedig tablet-terminálok működnek. Mindent egyetlen adminisztrációs panelről (irányítópult) kezelsz.",
        },
        { type: "h3", text: "Regisztráció és bejelentkezés" },
        { type: "p", text: "Háromféleképpen léphetsz be — válassz a bejelentkezési képernyőn:" },
        {
          type: "list",
          items: [
            "Google-lel — kattints a „Folytatás Google-lel” gombra, és válaszd ki a fiókot.",
            "Apple-lel — kattints a „Folytatás Apple-lel” gombra.",
            "E-maillel — kattints a „Folytatás e-maillel” gombra, add meg a címed, és küldünk egy 6 jegyű kódot. Add meg a következő képernyőn. Jelszó nem kell.",
          ],
        },
        {
          type: "note",
          text: "E-mailben csak egyszer használatos bejelentkezési kódot kapsz — nincs spam, nincs hírlevél.",
        },
        { type: "h3", text: "Étterem létrehozása (bevezetés)" },
        {
          type: "p",
          text: "Az első bejelentkezéskor a rendszer végigvezet egy gyors beállításon. Ezután automatikusan létrejön egy étterem egy minta menü-sablonnal, amelyet később a sajátoddal cserélsz le.",
        },
        {
          type: "steps",
          items: [
            "Add meg az étterem nevét.",
            "Válaszd ki a konyha típusát (ez határozza meg a kezdő menü-sablont).",
            "Kész: az irányítópultra kerülsz egy már kitöltött minta menüvel.",
          ],
        },
        {
          type: "note",
          text: "A pénznemet a rendszer automatikusan a régiód alapján ismeri fel — az elején nem kell kiválasztanod. Később a Beállítások → Régió alatt módosíthatod.",
        },
        { type: "h3", text: "Az irányítópult áttekintése" },
        {
          type: "p",
          text: "Navigáció a szakaszok között: számítógépen felső sáv, telefonon alsó sáv. Szakaszok: Menü, Rendelések, Foglalások, Konyha, Elemzések és Beállítások.",
        },
        {
          type: "list",
          items: [
            "Az étterem neve mellett a felső sávban egy kis kapcsolat-jelző van: a zöld pont azt jelenti, hogy a rendelések valós időben szinkronizálódnak.",
            "A „Menü” oldalon felül van az „Előnézet” gomb — megnyitja a menüt úgy, ahogy a vendég látja.",
            "Mellette a „Megosztás” gomb — megmutatja a QR-kódot és a menü linkjét (link másolása, QR letöltése vagy a menü megnyitása).",
          ],
        },
        {
          type: "tip",
          text: "Minden menümódosítás után nyomd meg az „Előnézet” gombot — azonnal látod, hogyan néz ki a vendégnek.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menü",
      blocks: [
        {
          type: "p",
          text: "A „Menü” szakasz a rendszer szíve. Itt építed fel a szerkezetet: kategóriák → ételek → opciók. Nyisd meg a navigációból.",
        },
        { type: "h3", text: "Kategóriák és alkategóriák" },
        {
          type: "steps",
          items: [
            "Kattints a „Kategória hozzáadása” gombra, és adj meg egy nevet (például „Előételek”).",
            "Kategória szerkesztéséhez — vidd fölé a kurzort, és kattints a „Kategória szerkesztése” gombra.",
            "A kategóriák sorrendjét a „Fel” / „Le” gombokkal módosítod — pontosan ebben a sorrendben látja a vendég.",
            "Létrehozhatsz egy „Csoportot” (a „Csoport hozzáadása” gombbal) — egy szakasz-kategóriát, amely más kategóriákat tartalmaz.",
          ],
        },
        { type: "h3", text: "Ételek hozzáadása" },
        {
          type: "steps",
          items: [
            "Bontsd ki a kategóriát (nyíl balra), és kattints az „Étel hozzáadása” gombra.",
            "Töltsd ki a nevet, az árat és a leírást.",
            "Adj hozzá fotót: „Fotó hozzáadása” — tölts fel sajátot, vagy kattints a „Generálás” gombra, és írd le az ételt szavakkal, hogy az MI képet készítsen.",
            "Mentsd el. Az étel megjelenik a kategóriában.",
          ],
        },
        {
          type: "tip",
          text: "A fotó MI-vel generálható: add meg a szöget, a megvilágítást vagy a hátteret (például „Margherita pizza fa deszkán, felülnézet”).",
        },
        { type: "h3", text: "Opciók és változatok (módosítók)" },
        {
          type: "p",
          text: "Az opciók az ételen belüli választások: méret, átsütöttség, extra hozzávalók. Minden opciónak vannak változatai, és egy változathoz felár adható (például „+1.50 darabonként”).",
        },
        {
          type: "list",
          items: [
            "Példa: egy „Méret” opció a „Kicsi / Nagy (+2.00)” változatokkal.",
            "Példa: egy „Extra” opció több változattal, amelyből a vendég egyet vagy többet választ.",
          ],
        },
        { type: "h3", text: "Allergének és diéták" },
        {
          type: "p",
          text: "Egy ételnél megjelölheted az allergéneket (glutén, diófélék stb.) és a diétás címkéket (vegetáriánus, vegán). A vendég ikonokként látja őket a nyilvános menüben.",
        },
        { type: "h3", text: "Ételek láthatósága" },
        {
          type: "p",
          text: "Az „Étel elrejtése” / „Étel megjelenítése” gomb ideiglenesen eltávolít egy tételt a nyilvános menüből anélkül, hogy törölné — hasznos, ha egy étel elfogyott.",
        },
        { type: "h3", text: "Papíralapú menü feltöltése (szkennelés)" },
        {
          type: "p",
          text: "Ha már van menüd fotóként vagy PDF-ként — ne kézzel vidd be. Használd a szkennelést:",
        },
        {
          type: "steps",
          items: [
            "Kattints a „Menü feltöltése” bannerre (vagy „Töltsd fel a papíralapú menüd”).",
            "Adj hozzá legfeljebb 5 fájlt (fotó/szken, egyenként legfeljebb 20 MB), és kattints a „Szkennelés” gombra.",
            "Várj akár egy percet — az MI felismeri a kategóriákat és az ételeket.",
            "Ellenőrizd a felismertet, jelöld be a kívánt tételeket, és kattints a „Folytatás” gombra.",
            "Válassz: a jelenlegi menü cseréje vagy az új tételek hozzáadása a meglévőhöz.",
          ],
        },
        {
          type: "note",
          text: "A kezdő sablon példái a szkennelt menü mentésekor eltávolításra kerülnek — ez normális.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Asztalok és QR-kódok",
      blocks: [
        {
          type: "p",
          text: "Az asztalok a rendelések és foglalások konkrét helyekhez kötésére és személyes QR-kódok nyomtatására szolgálnak. Szakasz: Beállítások → Asztalok.",
        },
        { type: "h3", text: "Asztalok létrehozása" },
        {
          type: "steps",
          items: [
            "Nyisd meg a Beállítások → Asztalok menüt, és kattints az „Asztal hozzáadása” gombra.",
            "Add meg az asztal számát, a férőhelyek számát és (opcionálisan) egy nevet — például „Ablak”, „Bár”, „Terasz”.",
            "Adj hozzá egy asztalfotót — a vendégek látják, és pontosan értik, hol van az asztaluk.",
            "Állíts be asztalszínt — ezzel a színnel az asztal kiemelt a konyhában és a „Rendelések” szakaszban, hogy a személyzet gyorsan megtalálja.",
            "Ha szeretnéd, adj hozzá rövid leírást.",
            "Mentsd el.",
          ],
        },
        {
          type: "note",
          text: "Az asztalfotó a vendégeknek szól (eligazodás „hol az asztalom”). A szín a személyzetnek (gyors vizuális jelölés a konyhában és a rendeléseknél).",
        },
        { type: "h3", text: "Az asztal QR-kódja" },
        {
          type: "p",
          text: "Minden asztalnak saját QR-kódja van. A vendég beszkenneli a telefonjával, és egyenesen az adott asztal menüjébe kerül — a rendelés automatikusan a megfelelő asztalhoz kötődik.",
        },
        {
          type: "steps",
          items: [
            "Kattints a „QR-kód megjelenítése” gombra a kívánt asztalnál.",
            "Kattints a „QR letöltése” gombra a kép mentéséhez.",
            "Nyomtasd ki, és helyezd az asztalra (állványra, a menübe, matricára).",
          ],
        },
        {
          type: "tip",
          text: "Az „Asztal linkje” ugyanaz a link, mint a QR-ben, csak szövegként. Elküldheted a vendégnek üzenetben.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Rendelések",
      blocks: [
        { type: "h3", text: "Hogyan rendel a vendég" },
        {
          type: "p",
          text: "A vendég beszkenneli az asztalon lévő QR-t → megnyílik a menü → ételeket, opciókat és mennyiséget választ → leadja a rendelést. A rendelés azonnal megjelenik az irányítópultodon és a konyha-/pincérterminálon.",
        },
        {
          type: "note",
          text: "Hogy a vendégek rendelhessenek, a Beállítások → Rendelések alatt be kell kapcsolni a „Rendelések fogadása” opciót. Ha ki van kapcsolva, a vendég látja a menüt, de nincs rendelés gomb.",
        },
        { type: "h3", text: "Rendelések kezelése az irányítópulton" },
        {
          type: "p",
          text: "A „Rendelések” szakasz a terem alaprajzát mutatja. A foglalt asztalok kiemeltek, és mutatják az aktív rendelések számát. Koppints egy asztalra a rendeléseinek megnyitásához.",
        },
        {
          type: "steps",
          items: [
            "Koppints egy asztalra → „Rendelés indítása” (vagy nyiss meg egy meglévőt).",
            "„Tétel hozzáadása” → válassz kategóriát → ételt → opciókat → szükség esetén add meg a mennyiséget és a megjegyzéseket (például „hagyma nélkül”).",
            "Kattints a „Hozzáadás” gombra — a tétel a rendelésbe kerül.",
          ],
        },
        { type: "h3", text: "Tételek állapotai" },
        {
          type: "p",
          text: "Minden tételnek van állapota: Várakozik → Készül → Kész → Felszolgálva. Koppints egy tételre az állapot váltásához. Az állapotok valós időben szinkronizálódnak a konyhával.",
        },
        { type: "h3", text: "Kedvezmények, felosztás, asztalcsere" },
        {
          type: "list",
          items: [
            "Kedvezmény: „Kedvezmény hozzáadása” — százalék vagy fix összeg, az egész rendelésre vagy egy tételre, indoklással.",
            "Rendelés felosztása: „Rendelés felosztása” — válaszd ki a tételeket, amelyek új, külön számlára kerülnek.",
            "Asztalcsere: „Asztal cseréje” — helyezd át a rendelést másik asztalra.",
            "Tétel duplikálása: gyorsan adj hozzá még egy ugyanolyat.",
          ],
        },
        { type: "h3", text: "Rendelés lezárása" },
        {
          type: "steps",
          items: [
            "Ha minden tétel felszolgálva, kattints a „Rendelés lezárása” gombra.",
            "Válassz fizetési módot (ha vannak beállítva).",
            "A rendelés lezárul, és kikerül az aktívak közül.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Konyha (KDS)",
      blocks: [
        {
          type: "p",
          text: "A konyhai kijelző (KDS) egy tableten lévő képernyő a szakácsoknak. Az új rendelések valós időben érkeznek rá, és a szakács késznek jelöli az ételeket.",
        },
        { type: "h3", text: "Mit mutat a kijelző" },
        {
          type: "list",
          items: [
            "Rendeléskártyák tételekkel, opciókkal és a „kiadópulton” töltött idővel.",
            "Színes állapotjelzés: mi készül, mi kész.",
            "Hangjelzés új rendelés érkezésekor.",
          ],
        },
        { type: "h3", text: "Hogyan kell használni" },
        {
          type: "steps",
          items: [
            "Koppints egy tételre, hogy a következő állapotba vidd (Készül → Kész).",
            "Kapcsold be a hangot a „Hang bekapcsolása” gombbal — ekkor az új rendelések hangjelzéssel érkeznek.",
            "A nagyítással igazítsd a kártyák méretét a tablethez.",
            "Szűrőkkel csak a szükséges kategóriákat jelenítheted meg (például csak a meleg vonalat).",
          ],
        },
        {
          type: "note",
          text: "Ha a tablet elveszíti az internetet, megjelenik a „Nincs kapcsolat” figyelmeztetés. Csatlakoztasd a Wi-Fi-t, és a rendelések újra érkezni kezdenek.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Foglalások",
      blocks: [
        {
          type: "p",
          text: "A vendégek a menüdön keresztül foglalhatnak asztalt, te pedig a „Foglalások” szakaszban kezeled a foglalásokat („Hónap” / „Nap” nézet).",
        },
        { type: "h3", text: "Foglalások beállítása" },
        { type: "p", text: "Először kapcsold be és állítsd be a foglalásokat: Beállítások → Foglalások." },
        {
          type: "steps",
          items: [
            "Kapcsold be a „Foglalások engedélyezése” opciót.",
            "Válaszd ki a megerősítési módot: „Automatikus” (a foglalások maguktól megerősödnek) vagy „Kézi” (mindegyiket te erősíted meg).",
            "Állítsd be a „Foglalás időtartamát” — meddig tartja fenn az asztalt a vendégnek.",
            "Töltsd ki a „Heti beosztást”: minden napra — nyitva/zárva, nyitvatartás és szükség esetén ebédszünet.",
          ],
        },
        {
          type: "note",
          text: "A foglalások fogadásához asztalok kellenek. Ha nincsenek, a rendszer kéri, hogy előbb adj hozzá asztalokat.",
        },
        { type: "h3", text: "Foglalások kezelése" },
        {
          type: "list",
          items: [
            "A döntésre váró új foglalások a „Megerősítésre vár” blokkban gyűlnek össze.",
            "„Megerősítés” / „Elutasítás” gombok — minden foglaláshoz.",
            "„Befejezés” — jelzi, hogy a vendég megérkezett és a foglalás teljesült.",
            "Válts a „Hónap” és „Nap” között, lapozz az időszakban a „Vissza” / „Előre” gombokkal.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Eszközök (tabletek)",
      blocks: [
        {
          type: "p",
          text: "A konyhai, pincér- és foglalási terminálok különálló tabletek, amelyek kóddal csatlakoznak a fiókodhoz. Szakasz: Beállítások → Eszközök.",
        },
        {
          type: "note",
          text: "Az eszközök fizetős csomaggal vagy aktív próbaidőszak alatt érhetők el.",
        },
        { type: "h3", text: "Tablet csatlakoztatása (párosítás)" },
        {
          type: "steps",
          items: [
            "Az irányítópulton: Beállítások → Eszközök → „Eszköz hozzáadása”.",
            "Adj meg egy nevet (például „Konyha — meleg vonal”) és egy típust: Konyha, Pincér vagy Foglalások.",
            "Kattints a „Kód generálása” gombra — megjelenik egy 6 jegyű kód (2 percig érvényes).",
            "A tableten nyisd meg a csatlakozási képernyőt, és add meg ezt a kódot.",
            "A tablet csatlakozik, és azonnal a kiválasztott szerepben kezd dolgozni.",
          ],
        },
        { type: "tip", text: "Ha a kód lejárt — egyszerűen kattints az „Új kód” gombra, és add meg a frisset." },
        { type: "h3", text: "Eszközök kezelése" },
        {
          type: "list",
          items: [
            "Állapotok: Online / Offline / Csatlakozásra vár / Visszavonva.",
            "„Visszavonás” — lekapcsolja a tabletet (például ha elveszett). Az újbóli bejelentkezéshez új kód kell.",
            "„Törlés” — véglegesen eltávolítja az eszközt a listáról.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Elemzések",
      blocks: [
        {
          type: "p",
          text: "Az „Elemzések” szakasz a hely kulcsszámait mutatja: bevétel, rendelések száma és azok megoszlása (például fizetési mód és időpont szerint). Használd, hogy megértsd, mi és mikor fogy a legjobban.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Beállítások",
      blocks: [
        {
          type: "p",
          text: "A „Beállítások” szakasz szakasz-kártyák halmazaként nyílik meg. Felül az aktív étterem váltója (ha többed van). Alatta — minden kártya sorban.",
        },
        { type: "h3", text: "Webhely" },
        {
          type: "list",
          items: [
            "A nyilvános menü URL-je — a menüd egyedi címe (megadhatsz saját rövid sluget és másolhatod a linket).",
            "A hely neve (címe) a nyilvános webhelyen.",
            "Kiemelőszín — a gombok és kiemelések fő színe a menüben.",
            "Háttér — kép vagy videó a kezdőoldalon; tölts fel sajátot, vagy generálj hátteret MI-vel egy leírásból.",
            "Menü elrendezése — hogyan jelennek meg az ételek a vendégnek.",
          ],
        },
        { type: "h3", text: "Kapcsolatok és cím" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp és egy térképjelölő — minden megjelenik a vendégnek a menüd kapcsolati oldalán.",
        },
        { type: "h3", text: "Régió" },
        { type: "p", text: "Pénznem (minden árhoz használt) és a hely időzónája." },
        { type: "h3", text: "Asztalok" },
        { type: "p", text: "Teremalaprajz, férőhelyek és az asztalok QR-kódjai — részletesen a 3. szakaszban." },
        { type: "h3", text: "Eszközök" },
        {
          type: "p",
          text: "Tabletek csatlakoztatása a konyhai kijelzőhöz és a pincérterminálokhoz — részletesen a 7. szakaszban.",
        },
        { type: "h3", text: "Rendelések" },
        {
          type: "list",
          items: [
            "„Rendelések fogadása” — a rendelésfogadás fő kapcsolója.",
            "„Rendelési mód” — Belső és/vagy WhatsApp.",
            "„Kötelező mezők” — milyen adatokat kell megadnia a vendégnek (Név, Telefon, Cím).",
            "„Fizetési módok” — az étterem fizetési rendszerének integrálásához fordulj a támogatáshoz.",
          ],
        },
        { type: "h3", text: "Foglalások" },
        {
          type: "p",
          text: "Foglalások bekapcsolása, automatikus vagy kézi megerősítés, időtartam és nyitvatartás — részletesen a 6. szakaszban.",
        },
        { type: "h3", text: "Nyelvek" },
        {
          type: "steps",
          items: [
            "Nyisd meg a Beállítások → Nyelvek menüt.",
            "Válaszd ki a nyelveket, amelyekre a nyilvános menü lefordul (koppintással adsz hozzá/távolítasz el).",
            "Állítsd be az alapértelmezett nyelvet.",
            "A szövegek kézzel vagy a „Fordítás MI-vel” gombbal fordíthatók — a rendszer lefordítja az ételek neveit és leírásait a kiválasztott nyelvekre.",
          ],
        },
        { type: "h3", text: "Fizetés" },
        { type: "p", text: "Előfizetési csomag, a próbaidőszak állapota és a fizetések kezelése." },
        {
          type: "list",
          items: [
            "Havi vagy éves számlázás (az éves olcsóbb).",
            "„Előfizetés” / „Váltás” — válassz vagy válts csomagot.",
            "„Kezelés” — módosítsd a fizetési módot vagy mondd le az előfizetést.",
          ],
        },
        {
          type: "note",
          text: "A fizetés EUR-ban történik. Más pénznemben való fizetéshez fordulj a támogatáshoz.",
        },
        { type: "h3", text: "Támogatás" },
        {
          type: "p",
          text: "Beépített csevegés a csapatunkkal valós időben. Írj egy üzenetet — itt válaszolunk.",
        },
        { type: "h3", text: "Éttermek váltása és hozzáadása" },
        {
          type: "p",
          text: "Ha több helyed van, az étterem váltója a „Beállítások” szakasz tetején található.",
        },
        {
          type: "steps",
          items: [
            "Nyisd meg az étterem váltóját a „Beállítások” tetején.",
            "„Étterem hozzáadása” → adj meg egy nevet.",
            "Válaszd a „Jelenlegi menü és beállítások másolása” (gyors indulás) vagy a „Kezdés a nulláról” (üres étterem) lehetőséget.",
            "Hozd létre — és bármikor válts az éttermek között itt.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. A nyilvános menü a vendégeknek",
      blocks: [
        {
          type: "p",
          text: "A nyilvános menü az, amit a vendég a QR beszkennelése után lát. Automatikusan összeáll a menüdből, a márkázásodból és a kapcsolataidból.",
        },
        {
          type: "list",
          items: [
            "A menü címét a Beállítások → Régió alatt állítod be („Menü linkje”).",
            "Az általános QR-kódot és a menü linkjét a „Menü” oldalon a „Megosztás” gombbal kapod meg.",
            "Minden asztalnak saját külön QR-je van (Beállítások → Asztalok), amely pontosan annak az asztalnak a menüjébe vezet.",
            "A megjelenés (háttér, kiemelőszín, elrendezés) a „Webhely” szakaszban állítható be.",
            "Az „Előnézet” gomb úgy nyitja meg a menüt, ahogy a vendég látja.",
          ],
        },
        {
          type: "tip",
          text: "Bármely menü-/beállításmódosítás után nyomd meg az „Előnézet” gombot, hogy ellenőrizd, hogyan néz ki a vendégnek.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Gyakori kérdések és részletek",
      blocks: [
        { type: "h3", text: "A vendég nem tud rendelni" },
        {
          type: "p",
          text: "Ellenőrizd a Beállítások → Rendelések → „Rendelések fogadása” opciót (bekapcsolva kell lennie), és hogy legalább egy rendelési mód ki van választva.",
        },
        { type: "h3", text: "Nem érkeznek foglalások" },
        {
          type: "p",
          text: "Győződj meg róla, hogy a foglalások be vannak kapcsolva a Beállítások → Foglalások alatt, vannak hozzáadott asztalok, és a nap nincs „Zárva”-ként megjelölve a beosztásban.",
        },
        { type: "h3", text: "A tablet nem csatlakozik" },
        {
          type: "p",
          text: "A kód 2 percig érvényes. Ha lejárt — generálj újat a Beállítások → Eszközök alatt. Ha az eszközt visszavonták — hozz létre új kódot.",
        },
        { type: "h3", text: "Egy étel elfogyott" },
        {
          type: "p",
          text: "Ne töröld — kattints az „Étel elrejtése” gombra. Eltűnik a nyilvános menüből, és az „Étel megjelenítése” gombbal hozod vissza.",
        },
        { type: "h3", text: "Eszközökre/terminálokra van szükséged, de nincsenek" },
        {
          type: "p",
          text: "Az „Eszközök” szakasz fizetős csomaggal vagy aktív próbaidőszak alatt érhető el. Ellenőrizd a Beállítások → Fizetés menüt.",
        },
        { type: "h3", text: "További kérdéseid vannak" },
        {
          type: "p",
          text: "Írj nekünk a Beállítások → Támogatás alatt — ez egy beépített csevegés a csapatunkkal.",
        },
      ],
    },
  ],
};
