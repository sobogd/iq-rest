import type { HelpDoc } from "../types";

// PT help guide. Section ids shared across locales.
export const pt: HelpDoc = {
  metaTitle: "Como usar o IQ Rest — guia passo a passo",
  metaDescription:
    "Guia completo do IQ Rest: registo, menu, pedidos, reservas, ecrã de cozinha e definições — para restaurantes.",
  h1: "Ajuda",
  intro: "Um guia detalhado do IQ Rest — do registo às definições mais finas.",
  banner: {
    title: "É mais simples do que parece",
    sub: "Um guia passo a passo: do registo às definições mais finas — qualquer pessoa consegue.",
    cta: "Como usar",
  },
  tipLabel: "Dica",
  noteLabel: "Importante",
  sections: [
    {
      id: "start",
      title: "1. Começar",
      blocks: [
        { type: "h3", text: "O que é este sistema" },
        {
          type: "p",
          text: "O IQ Rest é um serviço para restaurantes: cria um menu online com código QR, recebe pedidos e reservas de mesa diretamente do telemóvel dos clientes, enquanto na cozinha e nos empregados funcionam tablets-terminal. Tudo é gerido a partir de um único painel de administração (o dashboard).",
        },
        { type: "h3", text: "Registo e início de sessão" },
        { type: "p", text: "Pode entrar de três formas — escolha qualquer uma no ecrã de acesso:" },
        {
          type: "list",
          items: [
            "Com Google — clique em “Continuar com Google” e escolha a conta.",
            "Com Apple — clique em “Continuar com Apple”.",
            "Por email — clique em “Continuar com email”, introduza o endereço e enviamos um código de 6 dígitos. Introduza-o no ecrã seguinte. Não é preciso palavra-passe.",
          ],
        },
        {
          type: "note",
          text: "Por email recebe apenas um código de acesso de uso único — sem spam, sem newsletters.",
        },
        { type: "h3", text: "Criar o restaurante (onboarding)" },
        {
          type: "p",
          text: "No primeiro acesso, o sistema guia-o por uma configuração rápida. Depois é criado automaticamente um restaurante com um menu de exemplo que substituirá mais tarde pelo seu.",
        },
        {
          type: "steps",
          items: [
            "Indique o nome do restaurante.",
            "Escolha o tipo de cozinha (determina o modelo de menu inicial).",
            "Pronto: entra no dashboard com um menu de exemplo já preenchido.",
          ],
        },
        {
          type: "note",
          text: "A moeda é detetada automaticamente pela sua região — não precisa de a escolher no início. Poderá alterá-la mais tarde em Definições → Região.",
        },
        { type: "h3", text: "Visão geral do dashboard" },
        {
          type: "p",
          text: "A navegação entre secções: no computador é uma barra superior, no telemóvel uma barra inferior. Secções: Menu, Pedidos, Reservas, Cozinha, Análises e Definições.",
        },
        {
          type: "list",
          items: [
            "Junto ao nome do restaurante, na barra superior, há um pequeno indicador de ligação: um ponto verde significa que os pedidos sincronizam em tempo real.",
            "Na página “Menu”, no topo, está o botão “Pré-visualizar” — abre o seu menu como o cliente o vê.",
            "Aí mesmo o botão “Partilhar” — mostra o código QR e o link do menu (pode copiar o link, transferir o QR ou abrir o menu).",
          ],
        },
        {
          type: "tip",
          text: "Carregue em “Pré-visualizar” após cada alteração ao menu — vê de imediato como aparece ao cliente.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "A secção “Menu” é o coração do sistema. Aqui monta a estrutura: categorias → pratos → opções. Abra-a a partir da navegação.",
        },
        { type: "h3", text: "Categorias e subcategorias" },
        {
          type: "steps",
          items: [
            "Carregue em “Adicionar categoria” e introduza um nome (por exemplo “Entradas”).",
            "Para editar uma categoria — passe o cursor por cima e carregue em “Editar categoria”.",
            "A ordem das categorias muda-se com os botões “Cima” / “Baixo” — o cliente vê-as exatamente nessa ordem.",
            "Pode criar um “Grupo” (com “Adicionar grupo”) — uma categoria-secção que contém outras categorias.",
          ],
        },
        { type: "h3", text: "Adicionar pratos" },
        {
          type: "steps",
          items: [
            "Expanda uma categoria (seta à esquerda) e carregue em “Adicionar prato”.",
            "Preencha o nome, o preço e a descrição.",
            "Adicione uma foto: “Adicionar foto” — carregue a sua, ou clique em “Gerar” e descreva o prato por palavras para a IA criar a imagem.",
            "Guarde. O prato aparece na categoria.",
          ],
        },
        {
          type: "tip",
          text: "A foto pode ser gerada por IA: indique o ângulo, a iluminação ou o fundo (por exemplo “Pizza Margherita numa tábua de madeira, vista de cima”).",
        },
        { type: "h3", text: "Opções e variantes (modificadores)" },
        {
          type: "p",
          text: "As opções são escolhas dentro de um prato: tamanho, ponto de cozedura, ingredientes extra. Cada opção tem variantes, e a uma variante pode adicionar-se um acréscimo de preço (por exemplo “+1.50 cada”).",
        },
        {
          type: "list",
          items: [
            "Exemplo: uma opção “Tamanho” com variantes “Pequena / Grande (+2.00)”.",
            "Exemplo: uma opção “Extra” com várias variantes em que o cliente escolhe uma ou várias.",
          ],
        },
        { type: "h3", text: "Alergénios e dietas" },
        {
          type: "p",
          text: "Num prato pode marcar alergénios (glúten, frutos secos, etc.) e etiquetas dietéticas (vegetariano, vegano). O cliente vê-os como ícones no menu público.",
        },
        { type: "h3", text: "Visibilidade dos pratos" },
        {
          type: "p",
          text: "O botão “Ocultar prato” / “Mostrar prato” retira temporariamente um item do menu público sem o eliminar — útil quando um prato se esgota.",
        },
        { type: "h3", text: "Carregar um menu em papel (digitalização)" },
        {
          type: "p",
          text: "Se já tem um menu em foto ou PDF — não o escreva à mão. Use a digitalização:",
        },
        {
          type: "steps",
          items: [
            "Carregue no banner “Carregar menu” (ou “Carregue o seu menu em papel”).",
            "Adicione até 5 ficheiros (foto/digitalização, até 20 MB cada) e carregue em “Digitalizar”.",
            "Aguarde até um minuto — a IA reconhece categorias e pratos.",
            "Reveja o reconhecido, marque os itens que quer e carregue em “Continuar”.",
            "Escolha: substituir o menu atual ou adicionar os novos itens ao existente.",
          ],
        },
        {
          type: "note",
          text: "Os exemplos do modelo inicial são removidos ao guardar o menu digitalizado — é normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Mesas e códigos QR",
      blocks: [
        {
          type: "p",
          text: "As mesas servem para associar pedidos e reservas a lugares específicos e imprimir códigos QR pessoais. Secção: Definições → Mesas.",
        },
        { type: "h3", text: "Criar mesas" },
        {
          type: "steps",
          items: [
            "Abra Definições → Mesas e carregue em “Adicionar mesa”.",
            "Indique o número da mesa, os lugares e (opcional) um nome — por exemplo “Janela”, “Bar”, “Esplanada”.",
            "Adicione uma foto da mesa — os clientes veem-na e percebem exatamente onde está a sua mesa.",
            "Defina uma cor da mesa — com essa cor a mesa é destacada na cozinha e na secção “Pedidos”, para o pessoal a encontrar depressa.",
            "Se quiser, adicione uma breve descrição.",
            "Guarde.",
          ],
        },
        {
          type: "note",
          text: "A foto da mesa é para os clientes (referência “onde está a minha mesa”). A cor é para o pessoal (uma marca visual rápida da mesa na cozinha e nos pedidos).",
        },
        { type: "h3", text: "Código QR da mesa" },
        {
          type: "p",
          text: "Cada mesa tem o seu próprio código QR. O cliente digitaliza-o com o telemóvel e entra logo no menu dessa mesa — o pedido é associado automaticamente à mesa correta.",
        },
        {
          type: "steps",
          items: [
            "Carregue em “Mostrar código QR” na mesa que precisa.",
            "Carregue em “Transferir QR” para guardar a imagem.",
            "Imprima-o e coloque-o na mesa (num suporte, no menu, num autocolante).",
          ],
        },
        {
          type: "tip",
          text: "O “Link da mesa” é o mesmo link do QR mas em texto. Pode enviá-lo ao cliente por mensagem.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Pedidos",
      blocks: [
        { type: "h3", text: "Como o cliente faz o pedido" },
        {
          type: "p",
          text: "O cliente digitaliza o QR na mesa → abre-se o menu → escolhe pratos, opções e quantidade → faz o pedido. O pedido aparece de imediato no seu dashboard e no terminal de cozinha/empregado.",
        },
        {
          type: "note",
          text: "Para os clientes poderem pedir, em Definições → Pedidos deve estar ativado “Aceitar pedidos”. Se estiver desativado, o cliente vê o menu mas não há botão de pedido.",
        },
        { type: "h3", text: "Gerir pedidos no dashboard" },
        {
          type: "p",
          text: "A secção “Pedidos” mostra a planta da sala. As mesas ocupadas estão destacadas e mostram o número de pedidos ativos. Toque numa mesa para abrir os seus pedidos.",
        },
        {
          type: "steps",
          items: [
            "Toque numa mesa → “Iniciar pedido” (ou abra um existente).",
            "“Adicionar item” → escolha categoria → prato → opções → se necessário indique quantidade e notas (por exemplo “sem cebola”).",
            "Carregue em “Adicionar” — o item entra no pedido.",
          ],
        },
        { type: "h3", text: "Estados dos itens" },
        {
          type: "p",
          text: "Cada item tem um estado: Pendente → A preparar → Pronto → Servido. Toque num item para mudar o estado. Os estados sincronizam com a cozinha em tempo real.",
        },
        { type: "h3", text: "Descontos, divisão, mudar de mesa" },
        {
          type: "list",
          items: [
            "Desconto: “Adicionar desconto” — percentagem ou valor fixo, sobre todo o pedido ou sobre um item, com motivo.",
            "Dividir pedido: “Dividir pedido” — escolha os itens que vão para uma nova conta separada.",
            "Mudar de mesa: “Mudar de mesa” — mova o pedido para outra mesa.",
            "Duplicar item: adicione rapidamente outro igual.",
          ],
        },
        { type: "h3", text: "Fechar um pedido" },
        {
          type: "steps",
          items: [
            "Quando todos os itens estiverem servidos, carregue em “Fechar pedido”.",
            "Escolha um método de pagamento (se houver métodos configurados).",
            "O pedido fecha e sai da lista de ativos.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cozinha (KDS)",
      blocks: [
        {
          type: "p",
          text: "O ecrã de cozinha (KDS) é um ecrã em tablet para os cozinheiros. Os novos pedidos chegam em tempo real e o cozinheiro marca os pratos como prontos.",
        },
        { type: "h3", text: "O que o ecrã mostra" },
        {
          type: "list",
          items: [
            "Cartões de pedido com itens, opções e o tempo “no passe”.",
            "Indicação por cores do estado: o que está a ser preparado, o que está pronto.",
            "Um sinal sonoro quando chega um novo pedido.",
          ],
        },
        { type: "h3", text: "Como se usa" },
        {
          type: "steps",
          items: [
            "Toque num item para o passar ao estado seguinte (A preparar → Pronto).",
            "Ative o som com o botão “Ativar som” — assim os novos pedidos vêm com aviso sonoro.",
            "Com o zoom ajusta o tamanho dos cartões ao tablet.",
            "Com os filtros pode mostrar só as categorias que precisa (por exemplo só a linha quente).",
          ],
        },
        {
          type: "note",
          text: "Se o tablet perder a internet aparece o aviso “Sem ligação”. Ligue o Wi-Fi e os pedidos voltam a chegar.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservas",
      blocks: [
        {
          type: "p",
          text: "Os clientes podem reservar mesa através do seu menu, e você gere as reservas na secção “Reservas” (vista “Mês” / “Dia”).",
        },
        { type: "h3", text: "Configurar as reservas" },
        { type: "p", text: "Primeiro ative e configure as reservas: Definições → Reservas." },
        {
          type: "steps",
          items: [
            "Ative “Ativar reservas”.",
            "Escolha o modo de confirmação: “Automático” (as reservas confirmam-se sozinhas) ou “Manual” (confirma cada uma).",
            "Defina a “Duração da reserva” — quanto tempo a mesa fica reservada para o cliente.",
            "Preencha o “Horário semanal”: para cada dia — aberto/fechado, horário e, se necessário, a pausa de almoço.",
          ],
        },
        {
          type: "note",
          text: "Para aceitar reservas são precisas mesas. Se não existirem, o sistema pede para as adicionar primeiro.",
        },
        { type: "h3", text: "Gerir as reservas" },
        {
          type: "list",
          items: [
            "As novas reservas à espera de decisão estão no bloco “A aguardar confirmação”.",
            "Botões “Confirmar” / “Recusar” — para cada reserva.",
            "“Concluir” — marca que o cliente chegou e a reserva está concluída.",
            "Alterne entre “Mês” e “Dia”, navegue o período com “Anterior” / “Seguinte”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Dispositivos (tablets)",
      blocks: [
        {
          type: "p",
          text: "Os terminais de cozinha, empregado e reservas são tablets separados que se ligam à sua conta com um código. Secção: Definições → Dispositivos.",
        },
        {
          type: "note",
          text: "Os dispositivos estão disponíveis num plano pago ou durante um período de teste ativo.",
        },
        { type: "h3", text: "Ligar um tablet (emparelhamento)" },
        {
          type: "steps",
          items: [
            "No dashboard: Definições → Dispositivos → “Adicionar dispositivo”.",
            "Indique um nome (por exemplo “Cozinha — linha quente”) e um tipo: Cozinha, Empregado ou Reservas.",
            "Carregue em “Gerar código” — aparece um código de 6 dígitos (válido 2 minutos).",
            "No tablet abra o ecrã de ligação e introduza este código.",
            "O tablet liga-se e começa logo a funcionar na função escolhida.",
          ],
        },
        { type: "tip", text: "Se o código expirou — carregue em “Novo código” e introduza o novo." },
        { type: "h3", text: "Gerir dispositivos" },
        {
          type: "list",
          items: [
            "Estados: Online / Offline / A aguardar ligação / Revogado.",
            "“Revogar” — desliga o tablet (por exemplo se for perdido). Para voltar a entrar é preciso um novo código.",
            "“Eliminar” — remove o dispositivo da lista permanentemente.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Análises",
      blocks: [
        {
          type: "p",
          text: "A secção “Análises” mostra os números-chave do estabelecimento: receita, número de pedidos e a sua repartição (por exemplo por método de pagamento e por hora). Use-a para perceber o que vende melhor e quando.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Definições",
      blocks: [
        {
          type: "p",
          text: "A secção “Definições” abre como um conjunto de cartões-secção. No topo está o seletor do restaurante ativo (se tiver mais do que um). Por baixo — cada cartão por ordem.",
        },
        { type: "h3", text: "Site" },
        {
          type: "list",
          items: [
            "URL do menu público — o endereço único do seu menu (pode definir o seu slug curto e copiar o link).",
            "O nome (título) do estabelecimento no site público.",
            "Cor de destaque — a cor principal dos botões e destaques do menu.",
            "Fundo — uma imagem ou vídeo na página inicial; carregue o seu ou gere um fundo com IA a partir de uma descrição.",
            "Esquema do menu — como os pratos são mostrados ao cliente.",
          ],
        },
        { type: "h3", text: "Contactos e morada" },
        {
          type: "p",
          text: "Telefone, Instagram, WhatsApp e um marcador no mapa — tudo mostrado ao cliente na página de contactos do seu menu.",
        },
        { type: "h3", text: "Região" },
        { type: "p", text: "Moeda (usada em todos os preços) e fuso horário do estabelecimento." },
        { type: "h3", text: "Mesas" },
        { type: "p", text: "Planta da sala, lugares e códigos QR das mesas — em detalhe na secção 3." },
        { type: "h3", text: "Dispositivos" },
        {
          type: "p",
          text: "Ligação de tablets para o ecrã de cozinha e os terminais de empregado — em detalhe na secção 7.",
        },
        { type: "h3", text: "Pedidos" },
        {
          type: "list",
          items: [
            "“Aceitar pedidos” — o interruptor principal para receber pedidos.",
            "“Modo de pedidos” — Interno e/ou WhatsApp.",
            "“Campos obrigatórios” — que dados o cliente tem de fornecer (Nome, Telefone, Morada).",
            "“Métodos de pagamento” — para integrar o sistema de pagamento do restaurante contacte o suporte.",
          ],
        },
        { type: "h3", text: "Reservas" },
        {
          type: "p",
          text: "Ativação das reservas, confirmação automática ou manual, duração e horário — em detalhe na secção 6.",
        },
        { type: "h3", text: "Idiomas" },
        {
          type: "steps",
          items: [
            "Abra Definições → Idiomas.",
            "Escolha os idiomas para os quais o menu público é traduzido (toque para adicionar/remover).",
            "Defina o idioma predefinido.",
            "Os textos traduzem-se manualmente ou com o botão “Traduzir com IA” — o sistema traduz os nomes e descrições dos pratos para os idiomas escolhidos.",
          ],
        },
        { type: "h3", text: "Pagamento" },
        { type: "p", text: "Plano de subscrição, estado do período de teste e gestão de pagamentos." },
        {
          type: "list",
          items: [
            "Faturação mensal ou anual (a anual é mais barata).",
            "“Subscrever” / “Mudar” — escolha ou mude de plano.",
            "“Gerir” — mude o método de pagamento ou cancele a subscrição.",
          ],
        },
        {
          type: "note",
          text: "O pagamento é em EUR. Para pagar noutra moeda, contacte o suporte.",
        },
        { type: "h3", text: "Suporte" },
        {
          type: "p",
          text: "Um chat integrado com a nossa equipa em tempo real. Escreva uma mensagem — respondemos aqui mesmo.",
        },
        { type: "h3", text: "Mudar e adicionar restaurantes" },
        {
          type: "p",
          text: "Se tiver vários estabelecimentos, o seletor de restaurante está no topo da secção “Definições”.",
        },
        {
          type: "steps",
          items: [
            "Abra o seletor de restaurantes no topo de “Definições”.",
            "“Adicionar restaurante” → introduza um nome.",
            "Escolha “Duplicar o menu e as definições atuais” (início rápido) ou “Começar do zero” (um restaurante vazio).",
            "Crie-o — e alterne entre restaurantes a qualquer momento aqui mesmo.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. O menu público para os clientes",
      blocks: [
        {
          type: "p",
          text: "O menu público é o que o cliente vê depois de digitalizar o QR. É montado automaticamente a partir do seu menu, da sua marca e dos seus contactos.",
        },
        {
          type: "list",
          items: [
            "O endereço do menu define-se em Definições → Região (“Link do menu”).",
            "O código QR geral e o link do menu obtêm-se com o botão “Partilhar” na página “Menu”.",
            "Cada mesa tem o seu QR separado (Definições → Mesas) que leva ao menu dessa mesa em concreto.",
            "O aspeto (fundo, cor de destaque, esquema) configura-se na secção “Site”.",
            "O botão “Pré-visualizar” abre o menu como o cliente o vê.",
          ],
        },
        {
          type: "tip",
          text: "Após qualquer alteração ao menu/definições carregue em “Pré-visualizar” para verificar como aparece ao cliente.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Perguntas frequentes e detalhes",
      blocks: [
        { type: "h3", text: "O cliente não consegue fazer um pedido" },
        {
          type: "p",
          text: "Verifique Definições → Pedidos → “Aceitar pedidos” (deve estar ativo) e que está selecionado pelo menos um modo de pedido.",
        },
        { type: "h3", text: "Não chegam reservas" },
        {
          type: "p",
          text: "Confirme que as reservas estão ativas em Definições → Reservas, que há mesas adicionadas e que o dia não está marcado como “Fechado” no horário.",
        },
        { type: "h3", text: "O tablet não se liga" },
        {
          type: "p",
          text: "O código é válido 2 minutos. Se expirou — gere um novo em Definições → Dispositivos. Se o dispositivo foi revogado — crie um novo código.",
        },
        { type: "h3", text: "Um prato esgotou" },
        {
          type: "p",
          text: "Não o elimine — carregue em “Ocultar prato”. Desaparece do menu público e recupera-o com “Mostrar prato”.",
        },
        { type: "h3", text: "Precisa de dispositivos/terminais mas não os tem" },
        {
          type: "p",
          text: "A secção “Dispositivos” está disponível num plano pago ou durante um período de teste ativo. Verifique Definições → Pagamento.",
        },
        { type: "h3", text: "Ainda tem dúvidas" },
        {
          type: "p",
          text: "Escreva-nos em Definições → Suporte — é um chat integrado com a nossa equipa.",
        },
      ],
    },
  ],
};
