import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Changelog — Atualizações e novas funcionalidades do IQ Rest",
    description:
      "Cada lançamento do IQ Rest num só lugar. Novas funcionalidades, melhorias de IA e lançamentos de produto para menus QR, encomendas online e reservas.",
  },
  pageTitle: "Changelog",
  pageSubtitle:
    "Cada atualização que lançamos para tornar o teu menu QR, encomendas online e reservas mais fluidos. Mais recentes primeiro.",
  readMore: "Ler mais",
  backToList: "Voltar ao changelog",
  publishedOn: "Publicado em",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Fotos de pratos com IA para menu QR | IQ Rest",
        description:
          "Gera fotos de pratos com estilo coerente para todo o teu menu QR num clique. Sem bancos de imagens, sem fotógrafo, sem retoque.",
      },
      title: "Fotos de pratos geradas por IA para todo o teu menu QR",
      subtitle:
        "Para de procurar em galerias de stock e de marcar sessões fotográficas. O IQ Rest gera agora um conjunto completo de fotos de pratos apetitosas, num estilo único e coerente — diretamente a partir dos nomes do teu menu.",
      intro:
        "Fotografar cada prato do menu é caro, lento e raramente consistente. As bibliotecas de stock deixam buracos e o estilo nunca encaixa totalmente na tua marca. O IQ Rest fecha essa lacuna com fotografia de pratos por IA integrada: escreves o nome do prato, obténs uma foto de alta qualidade que combina com o resto do menu.",
      sections: [
        {
          title: "Um único estilo de fotografia em todo o menu",
          body: "Quando um cliente desliza pelo menu, os estilos discordantes quebram a experiência. O IQ Rest gera todas as fotos num único estilo coerente com a marca: mesma direção de luz, mesma linguagem de prato, mesma atmosfera de fundo. Parece uma sessão fotográfica real.",
        },
        {
          title: "Do nome do prato ao prato em segundos",
          body: "Não há nada para explicar. Adicionas um prato e o IQ Rest cria a foto em segundo plano, otimizada como WebP. Se uma foto não é o que tinhas em mente, regeneras com um toque. Cada restaurante recebe gerações de IA grátis para começar.",
        },
        {
          title: "Otimizadas para mobile e SEO",
          body: "Cada imagem é codificada como WebP comprimido a 80%, servida de uma CDN Hetzner em Nuremberga. As páginas mantêm-se rápidas no 4G, sem saltos de layout. As fotos também são indexáveis pelo Google Imagens.",
        },
      ],
      benefitsTitle: "Por que importam as fotos de pratos com IA",
      benefits: [
        "Sem subscrições a bancos de imagens nem honorários de fotógrafo",
        "Estilo coerente com a marca em todos os pratos",
        "Pratos novos recebem automaticamente uma foto coordenada",
        "WebP comprimido — rápido em mobile, sem saltos de layout",
        "Gerações grátis incluídas em cada plano",
        "Regenera qualquer foto com um toque até estar perfeita",
      ],
      conclusionTitle: "Uma foto para cada prato, sem a produção",
      conclusionBody:
        "Restaurantes que incluem fotos vendem mais pratos de margem alta — é mecânica conhecida de receita. A razão pela qual a maioria dos menus não tem fotos é o custo de produção. O IQ Rest elimina esse custo por completo.",
      ctaText: "Gera fotos com IA para cada prato do teu menu — grátis durante a tua experiência.",
      ctaButton: "Experimenta grátis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Gerador de fundo de capa de restaurante por IA | IQ Rest",
        description:
          "Gera automaticamente uma bonita imagem de capa para o teu menu QR em segundos. Adaptada à tua cozinha, ambiente e marca.",
      },
      title: "Fundo de capa do restaurante gerado por IA",
      subtitle:
        "O teu menu QR transmite o ambiente certo antes mesmo de o cliente deslizar. O IQ Rest gera agora uma imagem de capa personalizada que combina com a tua cozinha — automaticamente.",
      intro:
        "As primeiras impressões contam, especialmente quando o cliente faz scan do QR à mesa. Uma imagem de capa genérica desfaz tudo o que investiste no interior. O IQ Rest gera agora uma imagem de capa única e atmosférica para cada restaurante — baseada na cozinha que escolheste no registo.",
      sections: [
        {
          title: "Adaptada à tua cozinha e ambiente",
          body: "Quando completas o assistente de registo, o IQ Rest pega na cozinha selecionada e gera uma capa coerente. Italiana recebe luz quente de trattoria. Japonesa recebe linhas limpas. Mexicana recebe cores vibrantes. Podes regenerar a capa quando quiseres.",
        },
        {
          title: "Otimizada para hero do menu QR",
          body: "Imagens geradas no rácio exato usado pela hero do menu QR — nítidas em qualquer telemóvel, sem cortes incómodos. Codificadas em WebP, lazy-loaded para o resto do menu pintar primeiro.",
        },
        {
          title: "Coerência de marca de origem",
          body: "O estilo da capa é automaticamente emparelhado com as fotos de pratos geradas por IA — mesma linguagem de luz, mesma paleta, mesma atmosfera. Os clientes percecionam o teu restaurante como coeso e profissional.",
        },
      ],
      benefitsTitle: "Por que uma capa por IA bate o stock",
      benefits: [
        "Única para o teu restaurante — não uma foto de stock que toda a gente usa",
        "Combinada com a cozinha que selecionaste",
        "Mesma linguagem visual das fotos de pratos por IA",
        "Tamanho correto para a hero do menu QR",
        "WebP comprimido para carregamento rápido em mobile",
        "Regenera quando quiseres com um toque",
      ],
      conclusionTitle: "Uma capa que diz «sabemos o que fazemos»",
      conclusionBody:
        "Quando um cliente faz scan do teu QR, a primeira coisa que vê é a tua capa. Uma imagem polida e atmosférica sinaliza qualidade antes de ler o primeiro nome de prato. Com o IQ Rest, esse polimento é automático.",
      ctaText: "Obtém uma capa por IA personalizada para o teu menu QR em menos de um minuto.",
      ctaButton: "Começar experiência grátis",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Assistente de registo em 3 passos para menu QR | IQ Rest",
        description:
          "Escolhe cozinha, nome do restaurante, email — e o IQ Rest constrói o teu menu QR. O registo mais rápido do setor.",
      },
      title: "Assistente em 3 passos: do email a um menu QR funcional em menos de um minuto",
      subtitle:
        "Escolhe a cozinha. Escreve o nome do restaurante. Confirma o email. Pronto — o teu menu QR está pronto, com pratos de exemplo e fotos geradas por IA.",
      intro:
        "Donos de restaurantes não têm tempo para um formulário de registo de 10 ecrãs. Por isso reduzimos a três. Escolhe a cozinha. Escreve o nome. Confirma o email. Quando entras pela primeira vez, o menu QR já está populado com pratos de exemplo adequados à cozinha e fotografia IA coerente.",
      sections: [
        {
          title: "Passo 1 — Seleção da cozinha",
          body: "Escolhe de uma lista ampla: italiana, espanhola, japonesa, mexicana, francesa, mediterrânica, indiana, americana, café, bar, pizzaria. A escolha pilota cada predefinição: pratos de exemplo, estilo de capa IA, moeda padrão, estrutura inicial de categorias.",
        },
        {
          title: "Passo 2 — Nome do restaurante",
          body: "Escreve o nome como os clientes verão. Usamo-lo em todo o lado: hero do menu QR, título da página, slug SEO, antevisão social. Saltável se quiseres adiar a decisão.",
        },
        {
          title: "Passo 3 — Email ou login com Google",
          body: "Confirma com email + código único, ou toca «Entrar com Google» para criação de conta instantânea. Sem palavra-passe. No momento em que confirmas, o assistente lança o seeder em segundo plano.",
        },
      ],
      benefitsTitle: "Por que um registo em 3 passos bate um formulário",
      benefits: [
        "Menos de 60 segundos da landing ao menu QR funcional",
        "Zero decisões irreversíveis — só padrões de partida",
        "Pratos de exemplo precarregados por cozinha",
        "Fotos IA e capa prontas quando entras",
        "Opção Google sign-in",
        "Progresso anónimo guardado se abandonares a meio",
      ],
      conclusionTitle: "O registo de menu QR mais rápido, ponto",
      conclusionBody:
        "A maioria dos serviços de menu QR faz-te preencher dezenas de campos antes de veres algo útil. O IQ Rest inverte — primeiro damos um menu funcional, depois personalizas.",
      ctaText: "Inicia agora o assistente de 3 passos — o teu menu estará online em 60 segundos.",
      ctaButton: "Começar experiência grátis",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Menu de exemplo gerado por IA no registo | IQ Rest",
        description:
          "Salta o estado vazio. O IQ Rest gera automaticamente um menu QR inicial com base na tua cozinha — categorias, pratos, preços e fotos.",
      },
      title: "Menu de exemplo construído por IA logo após o registo",
      subtitle:
        "Sem mais olhares para um painel vazio. O IQ Rest semeia a tua conta com categorias, pratos e fotos IA adequadas à cozinha.",
      intro:
        "A parte mais difícil de qualquer ferramenta nova é o estado vazio. O IQ Rest resolve populando o menu no momento do registo. Italiana — antipasti, pasta, pizza, sobremesa. Japonesa — sushi, ramen, donburi, sake. Cada categoria tem 6-10 pratos iniciais com fotos IA em estilo coerente.",
      sections: [
        {
          title: "Categorias e pratos conscientes da cozinha",
          body: "O seeder usa a cozinha que escolheste no assistente para tirar um conjunto curado de categorias que fazem sentido. Pizzaria recebe «Pizza Classica», «Antipasti», «Bevande». Bistrô francês recebe «Entrées», «Plats principaux», «Fromages», «Desserts».",
        },
        {
          title: "Fotos e preços de origem",
          body: "Cada prato inicial vem com foto IA em estilo coerente e preço predefinido razoável na tua moeda local. Os preços são placeholders mas fazem o menu parecer real desde já.",
        },
        {
          title: "Edita, não comeces do zero",
          body: "Cada prato carrega uma flag isExample. Assim que editas um prato, a flag cai. Os pratos de exemplo restantes distinguem-se visualmente.",
        },
      ],
      benefitsTitle: "Por que um menu pré-carregado vence",
      benefits: [
        "Zero estado vazio — abres o painel e vês um menu funcional",
        "Categorias e pratos coerentes com a cozinha",
        "Fotos IA para cada prato inicial em estilo unificado",
        "Moeda local autodetetada, preços padrão definidos",
        "Flag de exemplo desvanece à medida que editas",
        "Mostra a stakeholders um menu de aspeto real em minutos",
      ],
      conclusionTitle: "Salta a página em branco",
      conclusionBody:
        "Construir um menu do zero intimida. Editar um é fácil. O IQ Rest dá-te um menu inicial completo no registo e depois deixa-te ajustá-lo à oferta real.",
      ctaText: "Regista-te e obtém um menu inicial completo na tua cozinha.",
      ctaButton: "Construir o meu menu",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Tour interativo do menu para novos utilizadores | IQ Rest",
        description:
          "Um guia interativo de 7 passos acompanha os novos donos pelo painel do menu QR — sem documentação, sem vídeos, só prático.",
      },
      title: "Tour interativo do menu em 7 passos na primeira visita",
      subtitle:
        "Não te fazemos ler documentação. Na primeira vez que abres o menu, o IQ Rest acompanha-te — adicionar categoria, adicionar prato, editar, ordenar, antever, partilhar, em sete toques.",
      intro:
        "A maioria dos produtos SaaS enterra o onboarding num centro de ajuda que ninguém lê. O IQ Rest faz o oposto: na primeira vez que aterras na página do menu, um tour interativo destaca cada ação chave em sequência.",
      sections: [
        {
          title: "Dentro do produto, não numa base de conhecimento",
          body: "Cada passo destaca o elemento UI real no teu ecrã. Uma bolha explica o que faz e porque importa. Não há capturas — a captura É o teu painel.",
        },
        {
          title: "Desenhado em torno do workflow real",
          body: "Os sete passos correspondem ao workflow que um novo restaurante realmente executa. Primeiro categorias, depois pratos, depois refinar, depois ordenar, depois antever, depois partilhar via QR.",
        },
        {
          title: "Localizado em 35 idiomas",
          body: "O texto do tour está traduzido em todos os idiomas que o IQ Rest suporta. Donos lusófonos recebem bolhas em português, alemães em alemão, catalães em catalão.",
        },
      ],
      benefitsTitle: "Por que um tour in-product bate um centro de ajuda",
      benefits: [
        "Aprende fazendo, não lendo documentação",
        "7 passos cobrem ~95% do workflow",
        "Descartável a qualquer momento",
        "Persiste entre sessões até completado ou saltado",
        "Localizado em 35 idiomas",
        "Sem vídeos para carregar",
      ],
      conclusionTitle: "De confuso a confiante em sete passos",
      conclusionBody:
        "O momento mais duro em qualquer produto são os primeiros 30 segundos. O tour interativo do IQ Rest remove esse risco — em menos de um minuto, cada novo utilizador sabe onde adicionar um prato.",
      ctaText: "Regista-te e deixa-te acompanhar pelo teu primeiro menu QR em sete toques.",
      ctaButton: "Começar experiência grátis",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Páginas de aterragem por país para menu QR | IQ Rest",
        description:
          "Visitantes do Brasil veem uma landing pensada para restaurantes brasileiros. Portugal vê a sua. 35 países, 35 páginas otimizadas.",
      },
      title: "Página de aterragem à medida em cada idioma",
      subtitle:
        "Visitantes já não recebem uma página traduzida automaticamente. Cada um dos 35 idiomas suportados tem a sua landing, escrita para esse mercado.",
      intro:
        "Landings traduzidas por máquina convertem mal. A gramática claudica, as referências culturais falham. O IQ Rest envia agora uma landing única para cada um dos 35 idiomas — escrita para o mercado, não apenas traduzida.",
      sections: [
        {
          title: "Uma página por idioma, sem auto-tradução",
          body: "Cada landing vive sob /<locale> como rota Next.js independente. Os textos estão em objetos TypeScript — versionados, type-checked, deployáveis separadamente.",
        },
        {
          title: "Geolocalização encaminha visitantes automaticamente",
          body: "Na primeira visita a iq-rest.com, o nosso módulo geo nginx lê o código do país e redireciona para o /<locale> certo. IPs portuguesas aterram em /pt. IPs alemãs em /de.",
        },
        {
          title: "Tags hreflang e canónicas em toda a marca",
          body: "Todas as 35 landings se referenciam mutuamente via tags hreflang para que o Google indexe a correta para cada consulta.",
        },
      ],
      benefitsTitle: "Por que landings por país convertem melhor",
      benefits: [
        "Frases nativas em cada mercado",
        "Geo-routing serve a página certa automaticamente",
        "hreflang e canónicas seguem diretrizes Google",
        "Visitantes catalães na Catalunha veem catalão",
        "Moeda, preços e CTAs localizados por mercado",
        "A/B testing independente por idioma",
      ],
      conclusionTitle: "35 idiomas, 35 portas de entrada",
      conclusionBody:
        "Se um dono de restaurante português aterrar numa página meio traduzida em inglês com preços em estilo americano, foge. Se aterrar numa página que lhe fala em português, com preços em euros, converte.",
      ctaText: "Experimenta o IQ Rest na tua língua — landing à medida do teu mercado.",
      ctaButton: "Abrir o meu idioma",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Entrar com Google no painel de menu QR | IQ Rest",
        description:
          "Salta palavras-passe e códigos por email. Toca «Entrar com Google» para aceder ao painel em menos de um segundo.",
      },
      title: "Entrar com Google — acesso de um toque ao teu menu QR",
      subtitle:
        "Salta os emails OTP e palavras-passe esquecidas. Toca «Continuar com Google» e estás no painel em menos de um segundo.",
      intro:
        "A autenticação email + código único é segura mas lenta. O IQ Rest oferece agora Entrar com Google: tocas um botão, escolhes a conta Google, estás dentro. Sem palavra-passe para esquecer.",
      sections: [
        {
          title: "OAuth Google nativo, sem loop de redirects",
          body: "Usamos o SDK oficial Google Identity Services com a UI One Tap. O fluxo acontece num popup nativo. Verificamos o ID token Google no servidor contra as chaves públicas Google.",
        },
        {
          title: "Mesma conta, qualquer método",
          body: "Se te registaste com email-OTP e depois escolhes Google, ligamos as contas por email. Podes alternar entre métodos a cada login.",
        },
        {
          title: "Mobile-first — funciona em iOS Safari e Android Chrome",
          body: "Sobrepomos um botão Google real sobre a nossa UI em vez de despoletar cliques programáticos. O botão funciona em qualquer browser móvel moderno.",
        },
      ],
      benefitsTitle: "Por que Google sign-in bate email OTP",
      benefits: [
        "Um toque para entrar",
        "Sem palavra-passe para lembrar ou repor",
        "Mesma conta uses email ou Google",
        "Verificado criptograficamente no servidor",
        "Funciona de forma fiável em iOS Safari e Android Chrome",
        "Idioma reencaminhado para os emails",
      ],
      conclusionTitle: "A forma mais rápida de voltar ao teu painel",
      conclusionBody:
        "Donos de restaurantes verificam os menus dezenas de vezes por semana. Google sign-in transforma um fluxo OTP de 30 segundos num toque de um segundo.",
      ctaText: "Salta a palavra-passe — entra com Google num toque.",
      ctaButton: "Abrir painel",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Notificações por email multilíngues em 35 idiomas | IQ Rest",
        description:
          "Lembretes de experiência, respostas do suporte, emails de subscrição — cada notificação do IQ Rest chega no idioma do teu painel.",
      },
      title: "Notificações por email multilíngues em todos os 35 idiomas",
      subtitle:
        "Cada email enviado pelo IQ Rest chega no idioma definido no teu painel. Inclui layouts da direita para a esquerda.",
      intro:
        "Um email no idioma errado é fricção no melhor caso, eliminação no pior. O IQ Rest envia agora cada email transacional no idioma definido, em todos os 35 idiomas suportados. Idiomas RTL como árabe e persa recebem layouts corretamente espelhados.",
      sections: [
        {
          title: "preferredLocale viaja com a tua conta",
          body: "Cada utilizador tem um campo preferredLocale definido no primeiro login. Cada job backend que emite um email puxa o preferredLocale e usa-o para escolher o template correto.",
        },
        {
          title: "Templates RTL para árabe e persa",
          body: "Layouts da direita para a esquerda não são só tradução — toda a hierarquia visual inverte. Enviamos templates RTL dedicados.",
        },
        {
          title: "Traduzidos por especialistas do setor",
          body: "Traduzimos cada template com terminologia de cozinha e hotelaria que soa natural aos operadores em cada mercado.",
        },
      ],
      benefitsTitle: "Por que importam os emails multilíngues",
      benefits: [
        "Todos os emails transacionais no idioma do painel",
        "preferredLocale persiste entre logins",
        "Layouts RTL para árabe e persa",
        "Terminologia hoteleira apropriada por idioma",
        "Mudar idioma atualiza emails futuros imediatamente",
        "35 idiomas incluindo catalão, esloveno, estónio, letão",
      ],
      conclusionTitle: "Emails que falam a tua língua",
      conclusionBody:
        "Comunicação que chega no idioma errado é comunicação que não funciona. O IQ Rest envia cada email no idioma que realmente usas.",
      ctaText: "Regista-te e recebe o painel e cada email no teu idioma.",
      ctaButton: "Começar experiência grátis",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Painel de restaurante mobile com sensação iOS nativa | IQ Rest",
        description:
          "Navegação por separadores em baixo, gestão de safe-area, inputs sem zoom — o painel mobile do IQ Rest sente-se como uma app nativa em iPhone.",
      },
      title: "Sensação iOS nativa no teu telemóvel",
      subtitle:
        "Navegação por separadores em baixo, suporte completo de safe-area, campos de formulário sem zoom e transições de página instantâneas.",
      intro:
        "A maioria dos painéis SaaS para restaurantes são adaptações desktop-first em mobile. O IQ Rest é o oposto — desenhado para donos que gerem o menu pelo telemóvel entre serviços.",
      sections: [
        {
          title: "Separadores em baixo, sem hamburger",
          body: "Substituímos a sidebar desktop por uma barra de separadores em baixo nos telemóveis: Menu, Encomendas, Reservas, Definições. Um toque acessível ao polegar.",
        },
        {
          title: "Safe-area insets e indicador home",
          body: "Usamos env(safe-area-inset-*) em todo o lado — a barra inferior fica acima do indicador home, o padding do conteúdo tem em conta a dynamic island.",
        },
        {
          title: "Inputs sem zoom e envio instantâneo",
          body: "Subimos cada input para 16px e configuramos o viewport com maximum-scale=1, para que os toques não despoletem o zoom-and-jump que parte os outros painéis web.",
        },
      ],
      benefitsTitle: "Por que a sensação nativa importa em mobile",
      benefits: [
        "Separadores em baixo — acesso de um toque a cada secção",
        "Consciente de safe-area",
        "Inputs de 16px — sem zoom-and-jump iOS",
        "Separador ativo usa a cor de acento da marca",
        "Transições SPA — sem reloads completos",
        "Sem app para instalar",
      ],
      conclusionTitle: "Um painel web que se sente como uma app",
      conclusionBody:
        "A linha entre web e nativo é sobretudo questão de atenção ao detalhe. O painel mobile do IQ Rest paga essa atenção e o resultado é algo que jurarias construído em Swift.",
      ctaText: "Abre o IQ Rest no teu telemóvel e sente a diferença.",
      ctaButton: "Experimentar grátis 14 dias",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Banner de consentimento de cookies RGPD para site de restaurante | IQ Rest",
        description:
          "Banner de consentimento legal, alinhado AEPD, sem scripts de terceiros. Analytics sem cookies dispara mesmo antes do consentimento.",
      },
      title: "Banner de consentimento de cookies conforme RGPD",
      subtitle:
        "Banner construído à medida sem CMP de terceiros, sem tag script de Cookiebot ou OneTrust. Alinhado AEPD e ePrivacy.",
      intro:
        "Cada site comercial na UE precisa de um banner de consentimento. A maioria usa CMPs de terceiros que arrastam scripts pesados. O IQ Rest construiu o seu, leve, parte do bundle da página. Os visitantes veem uma escolha clara Aceitar/Rejeitar.",
      sections: [
        {
          title: "Alinhado AEPD e ePrivacy",
          body: "A AEPD espanhola e a diretiva ePrivacy exigem botões Aceitar e Rejeitar com a mesma proeminência. Recusamos o dark pattern «aceitar enorme, rejeitar minúsculo».",
        },
        {
          title: "Sem scripts de terceiros",
          body: "Sem Cookiebot, sem OneTrust. O banner é parte do bundle da landing — sem pedidos externos, sem partilha de dados com terceiros, carregamento mais rápido.",
        },
        {
          title: "Privacidade, cookies e termos em modais",
          body: "Clicar num link legal abre um modal — sem navegação, sem perda da posição de scroll. O texto legal completo está lá.",
        },
      ],
      benefitsTitle: "Por que o nosso banner bate os CMPs de terceiros",
      benefits: [
        "Alinhado AEPD e ePrivacy",
        "Sem scripts de terceiros",
        "Privacidade/Cookies/Termos em modais",
        "Analytics sem cookies dispara antes do consentimento",
        "Cookie de primeira parte removido ao Rejeitar",
        "Leve — parte do bundle da landing",
      ],
      conclusionTitle: "Conformidade sem peso de conversão",
      conclusionBody:
        "O consentimento de cookies não é negociável na UE mas não tem de atrasar a tua página. O banner do IQ Rest é rápido, justo e plenamente conforme.",
      ctaText: "Vê o fluxo de consentimento em ação — abre o IQ Rest num browser limpo.",
      ctaButton: "Visitar landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacidade e termos em modais — sem saltos de página | IQ Rest",
        description:
          "Política de Privacidade, Termos e Política de Cookies abrem agora em modais na landing — sem perda de scroll, sem navegação extra.",
      },
      title: "Privacidade, termos e política de cookies em modais",
      subtitle:
        "Clica em qualquer link legal e a política abre num modal limpo. Sem navegação, sem perda da posição de scroll.",
      intro:
        "Páginas /privacy, /terms e /cookies autónomas eram o padrão — e o erro padrão. Os visitantes clicavam, perdiam o lugar, liam e esqueciam-se de voltar. O IQ Rest abre agora os três documentos como modais in-page.",
      sections: [
        {
          title: "Um componente Modal, três documentos",
          body: "Abre-o do banner cookies, da página de auth, do footer — mesmo componente, mesmo bloqueio de scroll. O texto legal vive em constantes TypeScript partilhadas.",
        },
        {
          title: "Pilha de modais",
          body: "Se estás a ler a Política de Cookies e queres mudar para a Privacidade, o link dentro do modal abre o próximo modal por cima. Escape fecha o modal de topo.",
        },
        {
          title: "Todos os 35 idiomas — mesmo texto único",
          body: "O texto legal está em inglês (idioma da nossa entidade legal, autónomo registado em Espanha), mas a chrome do modal está totalmente localizada nos 35 idiomas.",
        },
      ],
      benefitsTitle: "Por que modais batem páginas legais autónomas",
      benefits: [
        "Sem perda de scroll",
        "Conversão mais alta",
        "Componente único, três documentos",
        "Pilha de modais",
        "Chrome localizada em 35 idiomas",
        "Conformidade legal completa preservada",
      ],
      conclusionTitle: "Legal sem fricção",
      conclusionBody:
        "Os advogados querem que a política seja legível. Os marketers querem que o visitante converta. Os modais agradam a ambos.",
      ctaText: "Experimenta o novo fluxo — abre o banner cookies e toca num link de política.",
      ctaButton: "Visitar landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Catalão automático para visitantes da Catalunha | IQ Rest",
        description:
          "Visitantes de Barcelona, Tarragona, Lleida e Girona veem automaticamente o IQ Rest em catalão em vez de castelhano.",
      },
      title: "Deteção automática de catalão para visitantes da Catalunha",
      subtitle:
        "Visitantes de Barcelona, Tarragona, Lleida e Girona aterram por defeito na versão catalã do IQ Rest. O resto de Espanha continua a receber castelhano.",
      intro:
        "A Catalunha tem uma identidade linguística forte. O IQ Rest respeita agora essa distinção a nível geo: visitantes cujo IP é geolocalizado numa província catalã recebem a landing /ca automaticamente.",
      sections: [
        {
          title: "Geo-deteção no edge",
          body: "Lemos o país e a região do visitante do nosso módulo geo nginx em cada pedido. Se o país é Espanha e a região coincide com Barcelona, Tarragona, Lleida ou Girona, redirecionamos para /ca.",
        },
        {
          title: "Cookie de idioma sobrescreve o geo",
          body: "Quando escolhes um idioma manualmente, a escolha persiste num cookie que sobrescreve o geo para visitas futuras. A escolha explícita ganha sempre.",
        },
        {
          title: "Tradução catalã completa, não auto-traduzida",
          body: "A landing /ca não é auto-traduzida do espanhol — cada palavra é traduzida profissionalmente por copywriters catalanofalantes do setor da restauração.",
        },
      ],
      benefitsTitle: "Por que importa o auto-catalão",
      benefits: [
        "Visitantes de Barcelona/Tarragona/Lleida/Girona veem catalão automaticamente",
        "Resto de Espanha continua a receber castelhano",
        "Escolha manual de idioma persiste via cookie",
        "Tradução profissional completa",
        "Geo-deteção no edge — sem flicker",
        "Mesma landing otimizada que qualquer outro idioma",
      ],
      conclusionTitle: "Respeito pela identidade linguística",
      conclusionBody:
        "Pôr por defeito visitantes catalães em castelhano é uma pequena coisa tecnicamente mas grande política e culturalmente. O geo-routing do IQ Rest trata agora o catalão como idioma de primeira classe.",
      ctaText: "Visita o IQ Rest da Catalunha e vê a página no teu idioma.",
      ctaButton: "Abrir landing catalã",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal de experiência expirada — o menu QR mantém-se público | IQ Rest",
        description:
          "Quando a tua experiência termina, o menu não desaparece. Os clientes podem continuar a digitalizar; tu vês um modal de upgrade no painel.",
      },
      title: "Experiência expirada? O teu menu QR mantém-se online para os clientes",
      subtitle:
        "O fim da experiência já não desliga o teu menu público. Os clientes podem continuar a digitalizar; só o painel te convida a fazer upgrade.",
      intro:
        "O comportamento antigo do fim da experiência era duro: quando os teus 14 dias terminavam, o menu QR público apagava-se. Mudámos. Agora, o fim da experiência mostra um modal dentro do painel, mas o menu público continua a servir os clientes normalmente.",
      sections: [
        {
          title: "Menu público mantém-se online",
          body: "A experiência de 14 dias termina silenciosamente do ponto de vista do cliente. O menu QR, encomendas online, reservas — tudo continua a funcionar.",
        },
        {
          title: "Modal no painel, não redirect duro",
          body: "Mostramos um modal limpo: «A tua experiência terminou. Escolhe um plano para continuar a usar funcionalidades avançadas». O modal pode ser fechado.",
        },
        {
          title: "Antevisão sempre disponível",
          body: "Mesmo com a experiência expirada, podes continuar a antever o teu menu QR do painel. Não te bloqueamos de ver o que os clientes veem.",
        },
      ],
      benefitsTitle: "Por que uma expiração suave bate um corte duro",
      benefits: [
        "Menu QR público mantém-se online para os clientes",
        "Sem downtime surpresa a meio do serviço",
        "Modal no painel em vez de redirect forçado",
        "Antevisão sempre disponível",
        "Pistas de upsell inline",
        "Dono faz upgrade no seu próprio horário",
      ],
      conclusionTitle: "Respeita as horas de operação do restaurante",
      conclusionBody:
        "Restaurantes operam em margens apertadas e horários ainda mais apertados. Uma expiração suave mantém as luzes acesas para os clientes enquanto continua a empurrar o dono para um plano pago.",
      ctaText: "Inicia a tua experiência de 14 dias sabendo que o menu se mantém online.",
      ctaButton: "Começar experiência grátis",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Prato: terminologia mais clara do editor | IQ Rest",
        description:
          "Renomeámos «Item» para «Prato» em todo o painel. Donos de restaurantes não deviam traduzir terminologia SaaS na cabeça.",
      },
      title: "Item → Prato: terminologia mais clara em todo o editor",
      subtitle:
        "Substituímos a etiqueta genérica «Item» por «Prato» em cada superfície do painel.",
      intro:
        "As pessoas do software dizem «item». As pessoas do restaurante dizem «prato». Renomeámos tudo: botões, etiquetas, mensagens de sucesso, estados de erro, títulos de página.",
      sections: [
        {
          title: "Onde se aplica o renomear",
          body: "Cada superfície utilizador: «Add Item» tornou-se «Adicionar prato». «Items» tornou-se «Pratos». Toasts, breadcrumbs, cabeçalhos — todos atualizados. A coluna interna da base de dados ainda se chama «item» por retro-compatibilidade.",
        },
        {
          title: "Traduzido em todos os 35 idiomas",
          body: "Espanhol «plato», francês «plat», alemão «Gericht», italiano «piatto», catalão «plat», japonês «料理». Sem tradução máquina; revisores nativos verificaram cada um.",
        },
        {
          title: "Categoria por defeito auto-criada também",
          body: "Auto-criamos uma categoria por defeito chamada «Menu» na primeira visita. Comportamento antigo: menu vazio, tinhas de clicar «Adicionar categoria» antes. Novo: categoria existe, tocas «Adicionar prato».",
        },
      ],
      benefitsTitle: "Por que importa a terminologia",
      benefits: [
        "«Prato» corresponde a como falam os donos",
        "Atualizado em cada superfície do painel",
        "Traduzido em todos os 35 idiomas por revisores nativos",
        "Categoria por defeito auto-criada",
        "Mais rápido do registo ao primeiro prato adicionado",
        "Menos tradução mental = menor bounce no onboarding",
      ],
      conclusionTitle: "Fala a língua do utilizador",
      conclusionBody:
        "Terminologia SaaS genérica está bem para engenheiros. Donos de restaurantes precisam de palavras que correspondam ao que dizem no trabalho.",
      ctaText: "Regista-te e adiciona o teu primeiro prato em menos de um minuto.",
      ctaButton: "Construir o meu menu",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Categoria por defeito automática para onboarding | IQ Rest",
        description:
          "Novos utilizadores já não enfrentam um menu vazio. O IQ Rest auto-cria uma categoria por defeito.",
      },
      title: "Categoria por defeito automática — salta o menu vazio",
      subtitle:
        "Novos utilizadores aterram num menu com uma categoria por defeito já criada. Toca «Adicionar prato» e começa a editar.",
      intro:
        "O onboarding antigo exigia criar uma categoria antes de poderes adicionar um prato. O IQ Rest auto-cria agora uma categoria por defeito «Menu» na primeira vez que abres o painel.",
      sections: [
        {
          title: "Categoria por defeito criada no login",
          body: "Na primeira vez que entras num painel novo, o IQ Rest verifica se tens categorias. Se não, cria uma chamada «Menu» (traduzida no teu idioma).",
        },
        {
          title: "Renomeada para corresponder à cozinha com o assistente",
          body: "Se usaste o assistente de 3 passos, o seeder gera categorias adequadas à cozinha em vez disso.",
        },
        {
          title: "Retrocompatível com menus existentes",
          body: "Se já tens categorias, a por defeito não é criada. Só intervimos quando o menu está genuinamente vazio.",
        },
      ],
      benefitsTitle: "Por que o auto-defeito acelera o onboarding",
      benefits: [
        "Sem barreira «cria primeiro a categoria»",
        "Toca «Adicionar prato» como primeira ação",
        "Categoria nomeada no teu idioma",
        "Fluxo do assistente continua a semear categorias adequadas",
        "Menus existentes intocados",
        "Mais rápido do login ao primeiro prato adicionado",
      ],
      conclusionTitle: "Elimina o estado vazio",
      conclusionBody:
        "Estados vazios são onde os novos utilizadores ressaltam. Auto-criar uma categoria por defeito remove uma dessas barreiras.",
      ctaText: "Regista-te e começa a adicionar pratos imediatamente.",
      ctaButton: "Construir o meu menu",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Salta o passo nome do restaurante no onboarding | IQ Rest",
        description:
          "Eliminámos o passo «nome do restaurante». Define-o depois nas definições — ou direto da hero do menu.",
      },
      title: "Salta o passo nome do restaurante no onboarding",
      subtitle:
        "Não precisas de escrever o nome do restaurante para começar a construir um menu. Define o nome depois pelo painel.",
      intro:
        "Fluxos de onboarding que exigem informação à partida sentem-se como preencher formulários. Os novos utilizadores muitas vezes não tinham decidido a ortografia exata. Removemos o passo.",
      sections: [
        {
          title: "O que acontece quando saltas",
          body: "Se saltas, o restaurante recebe um placeholder («O teu restaurante») oculto por defeito no menu público. Quando defines o nome nas definições, aparece em todo o lado.",
        },
        {
          title: "Define-o de qualquer lado",
          body: "O campo nome é editável das definições, da hero do menu (toca para editar inline) e do ecrã de antevisão pública.",
        },
        {
          title: "Sem penalização SEO por ficar no defeito",
          body: "Usamos o slug como fallback para o título de página e meta tags SEO. Os motores de busca não te penalizam.",
        },
      ],
      benefitsTitle: "Por que saltar acelera o onboarding",
      benefits: [
        "Sem pressão de decisão no momento errado",
        "Aterra no painel mais rápido",
        "Define o nome quando vier inspiração",
        "Edição inline da hero do menu",
        "Menu público funciona sem nome definido",
        "Sem penalização SEO por usar o placeholder",
      ],
      conclusionTitle: "Menos decisões, mais feito",
      conclusionBody:
        "Cada campo de formulário no onboarding é uma hipótese de o utilizador ressaltar. Removendo o campo nome, removemos uma dessas hipóteses.",
      ctaText: "Regista-te em segundos — sem nome de restaurante necessário.",
      ctaButton: "Começar experiência grátis",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Experimenta o menu QR antes do registo — Anónimo | IQ Rest",
        description:
          "Constrói um menu de exemplo antes de criar conta. Guarda o teu progresso por email quando quiseres mantê-lo.",
      },
      title: "Experimenta um menu QR antes de te registares",
      subtitle:
        "Constrói um menu de exemplo, vê como fica o teu QR, antevê a experiência live — tudo antes de criar conta.",
      intro:
        "A maioria dos serviços de menu QR exige que crises uma conta antes de poderes fazer qualquer coisa. É a ordem errada. O IQ Rest deixa-te agora construir um menu de exemplo completo anonimamente. Quando quiseres mantê-lo, guardamo-lo por email.",
      sections: [
        {
          title: "Sessão anónima guarda o teu trabalho",
          body: "Um ID de sessão anónimo é criado na tua primeira visita e armazenado num cookie. Persistimos a sessão 7 dias.",
        },
        {
          title: "Guarda o progresso por link de email",
          body: "Quando decides que queres manter o menu, clica «Guardar progresso». Escreve o teu email. Enviamos um link mágico que converte a sessão anónima em conta real associada ao teu email.",
        },
        {
          title: "Reduz a zero a ansiedade do registo",
          body: "Os visitantes não precisam de decidir se o IQ Rest vale o seu email — podem ver por si próprios. Restaurantes que experimentam anonimamente convertem mais.",
        },
      ],
      benefitsTitle: "Por que o onboarding anónimo vence",
      benefits: [
        "Constrói um menu real sem criar conta",
        "Sessão anónima persiste 7 dias",
        "Guarda o progresso ao email quando decides comprometer-te",
        "Sem reentrada — trabalho transfere-se para a tua conta real",
        "Avaliação do produto sem fricção",
        "Maior conversão global de registo",
      ],
      conclusionTitle: "Deixa o produto vender-se a si próprio",
      conclusionBody:
        "A melhor forma de convencer um dono de restaurante de que o IQ Rest é certo para ele é deixá-lo usar. O onboarding anónimo transforma um visitante curioso num utilizador empenhado sem pedir nada em troca.",
      ctaText: "Experimenta o IQ Rest agora — sem conta necessária.",
      ctaButton: "Experimenta grátis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Guarda o progresso do menu por link de email | IQ Rest",
        description:
          "Construíste um menu de exemplo anonimamente? Guarda-o ao teu email e enviamos-te um link mágico.",
      },
      title: "Guarda o progresso do teu menu por link de email",
      subtitle:
        "Construíste um menu anonimamente e queres mantê-lo? Escreve o teu email. Enviamos um link mágico que converte o trabalho anónimo em conta real num toque.",
      intro:
        "A função «Guardar progresso» do IQ Rest converte a tua sessão anónima em conta real via link mágico. Escreve o email, clica o link na caixa de entrada, o teu menu fica permanentemente associado à conta.",
      sections: [
        {
          title: "Fluxo de link mágico — sem palavra-passe",
          body: "Enviamos um link único ao teu email. Clica em 10 minutos e estás autenticado numa nova conta que contém o menu construído anonimamente.",
        },
        {
          title: "Gestão de conflitos para contas existentes",
          body: "Se o email já tem conta, não a sobrescrevemos. Perguntamos se queres fundir o menu anónimo ou descartá-lo.",
        },
        {
          title: "Rate-limited e resistente a spam",
          body: "Limitamos os pedidos por IP e por email. O link expira em 10 minutos e é de uso único.",
        },
      ],
      benefitsTitle: "Por que o guardar via link mágico vence",
      benefits: [
        "Sem palavra-passe para escolher ou lembrar",
        "Trabalho anónimo transfere-se intacto",
        "Contas existentes: escolhes fundir ou descartar",
        "Rate-limited e com tempo limitado",
        "Um toque para te comprometeres",
        "O email serve como verificação",
      ],
      conclusionTitle: "Conversão sem fricção",
      conclusionBody:
        "Links mágicos colapsam um longo formulário de registo num único campo de email mais um clique na caixa. É o fluxo de conversão com menos fricção do setor.",
      ctaText: "Constrói um menu anonimamente, depois guarda-o por email quando estiveres pronto.",
      ctaButton: "Experimenta grátis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout Stripe num clique para utilizadores recorrentes | IQ Rest",
        description:
          "Já autenticado? Clica num plano em pricing e vai direto ao checkout Stripe. Sem reentrada de info, sem ecrãs extra.",
      },
      title: "Checkout Stripe num clique para utilizadores recorrentes",
      subtitle:
        "Utilizador autenticado clica um plano? Direto ao checkout Stripe. Dois cliques da página de pricing à subscrição ativa.",
      intro:
        "Utilizadores recorrentes que já têm conta IQ Rest não deviam ter de reconfirmar nada ao fazer upgrade. Removemos cada ecrã intermédio.",
      sections: [
        {
          title: "Detetar o estado autenticado em pricing",
          body: "A nossa página de pricing verifica um cookie de sessão autenticado no carregamento. Se estás autenticado, os botões de plano vão direto a /api/stripe/checkout.",
        },
        {
          title: "Idioma UI reencaminhado para Stripe",
          body: "O teu idioma do painel é reencaminhado via parâmetro locale, para que o checkout se renderize no teu idioma.",
        },
        {
          title: "Return URL leva-te de volta ao painel",
          body: "Stripe redireciona para a raiz do painel no teu idioma. O webhook atualiza o teu estado de subscrição no servidor antes de chegares.",
        },
      ],
      benefitsTitle: "Por que o checkout num clique converte",
      benefits: [
        "Dois cliques de pricing a subscrição ativa",
        "Sem intersticial para utilizadores autenticados",
        "Stripe checkout no idioma do painel",
        "Return URL leva-te ao painel atualizado",
        "Webhook atualiza o plano antes da chegada",
        "Novos utilizadores ainda têm o fluxo padrão",
      ],
      conclusionTitle: "Torna trivialmente fácil o caminho fácil",
      conclusionBody:
        "O utilizador já convencido não precisa de mais convicção — precisa de menos cliques.",
      ctaText: "Já és utilizador? Escolhe o teu plano e faz upgrade em dois cliques.",
      ctaButton: "Ver preços",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Redesign UI do painel: cartões, navegação, formulários | IQ Rest",
        description:
          "Painel IQ Rest redesenhado com componentes de cartão consistentes, navegação lateral persistente e ações de formulário melhoradas.",
      },
      title: "Redesign UI do painel: cartões consistentes, navegação e ações de formulário",
      subtitle:
        "Um painel polido com estilo de cartão unificado, navegação lateral persistente, estados ativos em cor de acento e ações guardar/eliminar em baixo em cada página de formulário.",
      intro:
        "O IQ Rest passou por um redesign UI completo do painel. Cada página agora usa estilo de cartão consistente com raios de borda unificados.",
      sections: [
        {
          title: "Design de cartão consistente em todas as páginas",
          body: "Cada página do painel usa agora um componente DashboardCard unificado com bordas arredondadas consistentes, cores de fundo discretas e cabeçalhos de secção opcionais.",
        },
        {
          title: "Navegação lateral persistente com estados ativos",
          body: "Em ecrãs desktop, uma navegação lateral persistente está agora visível em cada página. A página ativa é destacada com fundo em cor de acento.",
        },
        {
          title: "Páginas de formulário melhoradas com ações em baixo",
          body: "Todas as páginas de formulário apresentam agora um botão guardar duplicado em baixo em cor de acento. Botões eliminar aparecem do lado esquerdo.",
        },
      ],
      benefitsTitle: "Benefícios do redesign UI",
      benefits: [
        "Estilo de cartão unificado em todas as páginas",
        "Navegação lateral persistente em desktop",
        "Botões de guardar em baixo em todos os formulários",
        "Ações eliminar e guardar claramente separadas",
        "Cabeçalhos de secção em cartões de formulário",
        "Página de analytics mais limpa",
      ],
      conclusionTitle: "Uma experiência de painel mais polida",
      conclusionBody:
        "Este redesign UI traz consistência visual e usabilidade melhorada a cada canto do painel IQ Rest.",
      ctaText: "Experimenta o painel redesenhado",
      ctaButton: "Abrir painel",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Scanner de menu com IA — Cria um menu QR digital com uma foto"),
    "redesigned-dashboard-qr-menu-management": stub("Painel redesenhado para gestão de menu QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Emails de reservas e analytics para o teu menu QR digital"),
    "multi-currency-geo-pricing-qr-menu": stub("Preços multi-moeda geo para o teu menu QR"),
    "support-qr-menu-restaurant-cafe": stub("Suporte integrado para o teu menu QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Analytics detalhada para o teu site de menu QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Gerador instantâneo de menu QR e site de restaurante"),
    "subscription-plans-qr-menu-restaurant-website": stub("Planos de subscrição para o teu menu QR"),
    "public-restaurant-qr-menu-website": stub("Site público de menu QR de restaurante"),
    "add-items-restaurant-qr-menu-website": stub("Adiciona pratos ao teu menu QR em segundos"),
    "qr-menu-restaurant-categories": stub("Categorias para o teu menu QR de restaurante"),
    "easy-qr-menu-cafe-control-panel": stub("Painel de controlo fácil de menu QR para café"),
    "faq-page-organization": stub("Organização da página FAQ"),
    "free-restaurant-website-improvements": stub("Melhorias do site gratuito de restaurante"),
    "user-authentication-interface": stub("Interface de autenticação de utilizador"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Benefícios",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Experimenta o IQ Rest",
    ctaButton: "Começar experiência grátis",
  };
}
