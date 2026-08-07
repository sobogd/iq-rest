// Trial-ending reminder — admin-triggered, sent ~1 day before the trial
// expires. Name-less by design (many owners never set a restaurant title). No
// price in copy — pricing differs per user; the CTA button (label {cta}, URL
// injected by MailService) sends them to the billing page where their own
// price is shown. Tone: helpful heads-up, not pushy.

interface T {
  subject: string;
  body: string;
  cta: string;
  help: string;
}

export const TRIAL_ENDING: Record<string, T> = {
  ar: {
    subject: "تجربتك في IQ Rest تنتهي غدًا",
    body: "تذكير سريع: تجربتك المجانية في IQ Rest تنتهي غدًا. بعد ذلك، لن تكون قائمة QR متاحة لضيوفك حتى تختار خطة.",
    cta: "اختر خطة",
    help: "اختيار خطة لا يستغرق سوى لحظات. إذا كان لديك أي سؤال، فقط رد على هذا البريد.",
  },
  bg: {
    subject: "Пробният период на IQ Rest изтича утре",
    body: "Малко напомняне: безплатният ти пробен период в IQ Rest изтича утре. След това QR менюто ти няма да е достъпно за гостите, докато не избереш план.",
    cta: "Избери план",
    help: "Изборът на план отнема само момент. Ако имаш въпроси, просто отговори на този имейл.",
  },
  ca: {
    subject: "La teva prova d'IQ Rest acaba demà",
    body: "Petit recordatori: la teva prova gratuïta d'IQ Rest acaba demà. Després, el menú QR no estarà disponible per als clients fins que triïs un pla.",
    cta: "Triar un pla",
    help: "Triar un pla només és qüestió d'un moment. Si tens cap pregunta, només cal que responguis a aquest correu.",
  },
  cs: {
    subject: "Vaše zkušební období IQ Rest končí zítra",
    body: "Krátká připomínka: vaše bezplatné zkušební období IQ Rest končí zítra. Poté nebude QR menu dostupné pro vaše hosty, dokud nezvolíte tarif.",
    cta: "Vybrat tarif",
    help: "Výběr tarifu zabere jen chvilku. Pokud máte otázku, stačí odpovědět na tento e-mail.",
  },
  da: {
    subject: "Din IQ Rest-prøveperiode slutter i morgen",
    body: "En hurtig påmindelse: din gratis prøveperiode i IQ Rest slutter i morgen. Derefter vil QR-menuen ikke være tilgængelig for dine gæster, før du vælger en plan.",
    cta: "Vælg en plan",
    help: "Det tager kun et øjeblik at vælge en plan. Har du spørgsmål, så svar bare på denne e-mail.",
  },
  de: {
    subject: "Deine IQ Rest-Testphase endet morgen",
    body: "Kurze Erinnerung: Deine kostenlose Testphase bei IQ Rest endet morgen. Danach ist dein QR-Menü für deine Gäste nicht mehr verfügbar, bis du einen Tarif wählst.",
    cta: "Tarif wählen",
    help: "Einen Tarif zu wählen dauert nur einen Moment. Bei Fragen einfach auf diese E-Mail antworten.",
  },
  el: {
    subject: "Η δοκιμαστική περίοδος του IQ Rest λήγει αύριο",
    body: "Σύντομη υπενθύμιση: η δωρεάν δοκιμαστική περίοδος στο IQ Rest λήγει αύριο. Στη συνέχεια, το QR μενού σου δεν θα είναι διαθέσιμο στους πελάτες μέχρι να επιλέξεις πακέτο.",
    cta: "Επιλογή πακέτου",
    help: "Η επιλογή πακέτου παίρνει μόνο μια στιγμή. Αν έχεις απορίες, απλώς απάντησε σε αυτό το email.",
  },
  en: {
    subject: "Your IQ Rest trial ends tomorrow",
    body: "Quick heads-up: your IQ Rest free trial ends tomorrow. After that, your QR menu won't be available to your guests until you pick a plan.",
    cta: "Choose a plan",
    help: "Picking a plan only takes a moment. If you have any questions, just reply to this email.",
  },
  es: {
    subject: "Tu prueba de IQ Rest termina mañana",
    body: "Recordatorio rápido: tu prueba gratuita de IQ Rest termina mañana. Después, tu menú QR no estará disponible para tus clientes hasta que elijas un plan.",
    cta: "Elegir un plan",
    help: "Elegir un plan solo lleva un momento. Si tienes alguna pregunta, solo responde a este correo.",
  },
  et: {
    subject: "Sinu IQ Resti prooviperiood lõpeb homme",
    body: "Lühike meeldetuletus: sinu tasuta prooviperiood IQ Restis lõpeb homme. Pärast seda ei ole QR-menüü külalistele saadaval, kuni valid paketi.",
    cta: "Vali pakett",
    help: "Paketi valimine võtab vaid hetke. Kui sul on küsimusi, lihtsalt vasta sellele e-kirjale.",
  },
  fa: {
    subject: "دوره آزمایشی IQ Rest شما فردا تمام می‌شود",
    body: "یادآوری سریع: دوره آزمایشی رایگان شما در IQ Rest فردا به پایان می‌رسد. پس از آن، تا زمانی که پلنی انتخاب نکنید، منوی QR شما برای مهمانان در دسترس نخواهد بود.",
    cta: "انتخاب پلن",
    help: "انتخاب پلن فقط چند لحظه طول می‌کشد. اگر سوالی دارید، کافی است به این ایمیل پاسخ دهید.",
  },
  fi: {
    subject: "IQ Rest -kokeilujaksosi päättyy huomenna",
    body: "Pieni muistutus: ilmainen IQ Rest -kokeilujaksosi päättyy huomenna. Sen jälkeen QR-ruokalistasi ei ole vieraidesi saatavilla, ennen kuin valitset paketin.",
    cta: "Valitse paketti",
    help: "Paketin valitseminen vie vain hetken. Jos sinulla on kysyttävää, vastaa vain tähän sähköpostiin.",
  },
  fr: {
    subject: "Votre essai IQ Rest se termine demain",
    body: "Petit rappel : votre essai gratuit d'IQ Rest se termine demain. Après cela, votre menu QR ne sera plus accessible à vos clients tant que vous n'aurez pas choisi un forfait.",
    cta: "Choisir un forfait",
    help: "Choisir un forfait ne prend qu'un instant. Pour toute question, répondez simplement à cet e-mail.",
  },
  ga: {
    subject: "Críochnóidh do thriail IQ Rest amárach",
    body: "Meabhrúchán tapa: críochnóidh do thriail saor in aisce IQ Rest amárach. Ina dhiaidh sin, ní bheidh do roghchlár QR ar fáil do d'aíonna go dtí go roghnóidh tú plean.",
    cta: "Roghnaigh plean",
    help: "Ní thógann sé ach nóiméad plean a roghnú. Má tá ceist agat, freagair an ríomhphost seo.",
  },
  hr: {
    subject: "Tvoje IQ Rest probno razdoblje istječe sutra",
    body: "Brzi podsjetnik: tvoje besplatno probno razdoblje u IQ Restu istječe sutra. Nakon toga QR jelovnik neće biti dostupan gostima dok ne odabereš plan.",
    cta: "Odaberi plan",
    help: "Odabir plana traje samo trenutak. Ako imaš pitanja, samo odgovori na ovaj email.",
  },
  hu: {
    subject: "Az IQ Rest próbaidőszakod holnap lejár",
    body: "Gyors emlékeztető: az IQ Rest ingyenes próbaidőszakod holnap lejár. Ezután a QR menü nem lesz elérhető a vendégeid számára, amíg nem választasz csomagot.",
    cta: "Csomag választása",
    help: "A csomagválasztás csak egy pillanat. Ha kérdésed van, csak válaszolj erre az e-mailre.",
  },
  is: {
    subject: "IQ Rest prufutímabilið þitt rennur út á morgun",
    body: "Stutt áminning: ókeypis prufutímabilið þitt í IQ Rest rennur út á morgun. Eftir það verður QR matseðillinn ekki tiltækur fyrir gesti þína fyrr en þú velur áskrift.",
    cta: "Velja áskrift",
    help: "Það tekur aðeins augnablik að velja áskrift. Ef þú hefur spurningar, svaraðu bara þessum tölvupósti.",
  },
  it: {
    subject: "La tua prova di IQ Rest finisce domani",
    body: "Promemoria veloce: la tua prova gratuita di IQ Rest finisce domani. Dopo, il menu QR non sarà più disponibile per i tuoi clienti finché non scegli un piano.",
    cta: "Scegli un piano",
    help: "Scegliere un piano richiede solo un attimo. Se hai domande, basta rispondere a questa email.",
  },
  ja: {
    subject: "IQ Rest の無料トライアルが明日終了します",
    body: "簡単なお知らせです：IQ Rest の無料トライアルが明日終了します。その後はプランを選ぶまで、QR メニューはお客様にご覧いただけなくなります。",
    cta: "プランを選ぶ",
    help: "プランの選択はすぐに完了します。ご質問があれば、このメールに返信してください。",
  },
  ko: {
    subject: "IQ Rest 무료 체험이 내일 종료됩니다",
    body: "간단한 알림입니다: IQ Rest 무료 체험이 내일 종료됩니다. 이후에는 요금제를 선택하기 전까지 QR 메뉴를 손님들에게 제공할 수 없습니다.",
    cta: "요금제 선택",
    help: "요금제 선택은 잠깐이면 됩니다. 궁금한 점은 이 이메일에 회신해 주세요.",
  },
  lt: {
    subject: "Jūsų IQ Rest bandomasis laikotarpis baigiasi rytoj",
    body: "Trumpas priminimas: nemokamas IQ Rest bandomasis laikotarpis baigiasi rytoj. Po to QR meniu nebus prieinamas svečiams, kol nepasirinksite plano.",
    cta: "Pasirinkti planą",
    help: "Plano pasirinkimas užtrunka vos akimirką. Jei turite klausimų, tiesiog atsakykite į šį laišką.",
  },
  lv: {
    subject: "Jūsu IQ Rest izmēģinājuma periods beidzas rīt",
    body: "Īss atgādinājums: jūsu bezmaksas IQ Rest izmēģinājuma periods beidzas rīt. Pēc tam QR ēdienkarte nebūs pieejama viesiem, kamēr neizvēlēsieties plānu.",
    cta: "Izvēlēties plānu",
    help: "Plāna izvēle aizņem tikai mirkli. Ja ir jautājumi, vienkārši atbildiet uz šo e-pastu.",
  },
  nl: {
    subject: "Je IQ Rest-proefperiode eindigt morgen",
    body: "Korte herinnering: je gratis IQ Rest-proefperiode eindigt morgen. Daarna is je QR-menu niet meer beschikbaar voor je gasten totdat je een abonnement kiest.",
    cta: "Kies een abonnement",
    help: "Een abonnement kiezen kost maar een momentje. Heb je vragen, beantwoord dan gewoon deze e-mail.",
  },
  no: {
    subject: "Din IQ Rest-prøveperiode slutter i morgen",
    body: "Liten påminnelse: din gratis prøveperiode i IQ Rest slutter i morgen. Etter det vil ikke QR-menyen være tilgjengelig for gjestene før du velger en plan.",
    cta: "Velg en plan",
    help: "Det tar bare et øyeblikk å velge en plan. Har du spørsmål, svar gjerne på denne e-posten.",
  },
  pl: {
    subject: "Twój okres próbny IQ Rest kończy się jutro",
    body: "Szybkie przypomnienie: Twój darmowy okres próbny w IQ Rest kończy się jutro. Potem menu QR nie będzie dostępne dla gości, dopóki nie wybierzesz planu.",
    cta: "Wybierz plan",
    help: "Wybór planu zajmuje tylko chwilę. Jeśli masz pytania, po prostu odpowiedz na ten e-mail.",
  },
  pt: {
    subject: "A tua experiência IQ Rest termina amanhã",
    body: "Um lembrete rápido: a tua experiência gratuita no IQ Rest termina amanhã. Depois disso, o menu QR não estará disponível para os clientes até escolheres um plano.",
    cta: "Escolher um plano",
    help: "Escolher um plano leva apenas um momento. Se tiveres dúvidas, basta responder a este email.",
  },
  ro: {
    subject: "Perioada de probă IQ Rest se încheie mâine",
    body: "O scurtă reamintire: perioada gratuită de probă IQ Rest se încheie mâine. După aceea, meniul QR nu va fi disponibil pentru clienți până când alegi un plan.",
    cta: "Alege un plan",
    help: "Alegerea unui plan durează doar o clipă. Dacă ai întrebări, răspunde la acest e-mail.",
  },
  ru: {
    subject: "Пробный период IQ Rest заканчивается завтра",
    body: "Небольшое напоминание: ваш бесплатный пробный период в IQ Rest заканчивается завтра. После этого QR-меню будет недоступно гостям, пока вы не выберете тариф.",
    cta: "Выбрать тариф",
    help: "Выбор тарифа займёт всего минуту. Если есть вопросы, просто ответьте на это письмо.",
  },
  sk: {
    subject: "Vaše skúšobné obdobie IQ Rest končí zajtra",
    body: "Krátka pripomienka: vaše bezplatné skúšobné obdobie IQ Rest končí zajtra. Potom nebude QR menu dostupné hosťom, kým nezvolíte plán.",
    cta: "Vybrať plán",
    help: "Výber plánu zaberie len chvíľu. Ak máte otázku, stačí odpovedať na tento e-mail.",
  },
  sl: {
    subject: "Tvoje preizkusno obdobje IQ Rest se konča jutri",
    body: "Hiter opomnik: tvoje brezplačno preizkusno obdobje v IQ Restu se konča jutri. Nato QR meni gostom ne bo več na voljo, dokler ne izbereš naročnine.",
    cta: "Izberi naročnino",
    help: "Izbira naročnine vzame le trenutek. Če imaš vprašanja, samo odgovori na to e-pošto.",
  },
  sr: {
    subject: "Tvoj IQ Rest probni period ističe sutra",
    body: "Kratak podsetnik: tvoj besplatni probni period u IQ Rest-u ističe sutra. Posle toga QR meni neće biti dostupan gostima dok ne odabereš plan.",
    cta: "Izaberi plan",
    help: "Odabir plana traje samo trenutak. Ako imaš pitanja, samo odgovori na ovaj imejl.",
  },
  sv: {
    subject: "Din IQ Rest-provperiod tar slut imorgon",
    body: "Liten påminnelse: din gratis provperiod i IQ Rest tar slut imorgon. Därefter är QR-menyn inte tillgänglig för dina gäster förrän du väljer en plan.",
    cta: "Välj en plan",
    help: "Att välja en plan tar bara ett ögonblick. Har du frågor, svara bara på det här mejlet.",
  },
  tr: {
    subject: "IQ Rest deneme süreniz yarın sona eriyor",
    body: "Kısa bir hatırlatma: IQ Rest ücretsiz deneme süreniz yarın sona eriyor. Sonrasında bir plan seçene kadar QR menünüz misafirleriniz için kullanılamayacak.",
    cta: "Plan seç",
    help: "Plan seçmek yalnızca bir dakikanızı alır. Sorunuz varsa bu e-postayı yanıtlamanız yeterli.",
  },
  uk: {
    subject: "Пробний період IQ Rest завершується завтра",
    body: "Невелике нагадування: ваш безкоштовний пробний період в IQ Rest завершується завтра. Після цього QR-меню буде недоступне гостям, поки ви не оберете тариф.",
    cta: "Обрати тариф",
    help: "Вибір тарифу займе лише хвилину. Якщо є питання, просто дайте відповідь на цей лист.",
  },
  zh: {
    subject: "您的 IQ Rest 免费试用明天到期",
    body: "简短提醒：您在 IQ Rest 的免费试用明天到期。之后，在您选择套餐之前，您的二维码菜单将无法向客人展示。",
    cta: "选择套餐",
    help: "选择套餐只需片刻。如果有任何问题，只需回复这封邮件即可。",
  },
};

const RTL = new Set(["ar", "fa"]);
export function isRtl(locale: string): boolean {
  return RTL.has(locale);
}

export function pickTrialEnding(locale: string): T {
  return TRIAL_ENDING[locale] || TRIAL_ENDING.en;
}
