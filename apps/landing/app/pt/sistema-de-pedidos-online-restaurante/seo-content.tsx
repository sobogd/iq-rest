import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR por mesa, lê-e-pede, sem aplicação para instalar",
  "Pedidos em tempo real no tablet da cozinha ou do gerente",
  "Ou encaminhados ao WhatsApp do restaurante — escolhe tu",
  "Modificadores, variantes e alergénios chegam à comanda",
  "Comentário livre do cliente em cada pedido",
  "Numeração diária para a cozinha",
  "Checkout multilingue em 35 idiomas, detetado pelo telemóvel",
  "Zero comissão por pedido — subscrição mensal fixa",
];

const HOW_STEPS = [
  { title: "Ativa pedidos no restaurante", desc: "Abre as definições, ativa o interruptor Pedidos e escolhe que dados do cliente recolher (nome, telefone, morada)." },
  { title: "Escolhe o canal de entrega", desc: "Modo interno envia ao separador Cozinha. Modo WhatsApp envia mensagem ao WhatsApp do local. Ou ambos em paralelo." },
  { title: "Imprime e coloca os QR", desc: "Descarrega o QR (um por mesa ou um para o local) em PDF/PNG e cola nas mesas. Cliente lê com a câmara nativa." },
  { title: "Serve o serviço", desc: "Comandas aparecem com mesa, pratos, variantes, alergénios, comentário e número do dia. Move entre novo → em curso → concluído. Browser do cliente atualiza em tempo real." },
];

const COMPARISON_ROWS = [
  ["Comissão por pedido", "20–30%", "0%", "0% (6,90€/mês fixo)"],
  ["Destino do pedido", "App do agregador", "Tua caixa", "Teu tablet de cozinha ou WhatsApp"],
  ["Número da mesa", "Não", "Manual", "Sim, automático"],
  ["Modificadores / variantes", "Limitados", "Sim", "Sim, com alergénios"],
  ["Checkout multilingue", "Idioma da app", "Não", "35 idiomas, automático"],
  ["Hardware necessário", "Tablet do agregador", "Terminal POS", "Qualquer tablet com browser"],
  ["Tempo de configuração", "Chamada de onboarding", "Dias-semanas", "5 minutos"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">Em detalhe</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">
            O que é um sistema de pedidos online para restaurante{" "}
            <span className="text-muted-foreground">de verdade</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">
            Não um marketplace. Não um agregador de entregas. Uma linha direta
            do telemóvel do cliente sentado na tua mesa ao teu tablet de
            cozinha — ou ao teu WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Um <strong>sistema de pedidos online para restaurante</strong> no sentido IQ Rest é o software que permite ao cliente sentado numa das tuas mesas abrir o menu no telemóvel, montar um carrinho e enviar a comanda à tua cozinha — sem passar por Uber Eats, Glovo, Just Eat ou qualquer marketplace. O cliente nunca sai do teu menu QR, não pagas comissão por pedido, e a comanda chega com o número da mesa real.
            </p>
            <p>
              IQ Rest funciona com dois canais. Por defeito, <em>modo interno</em>: cada pedido novo chega ao separador Cozinha no tablet, telemóvel ou portátil ao pass — com mesa, pratos com variantes e alergénios, comentário do cliente e número do dia. A alternativa, <em>modo WhatsApp</em>, envia o mesmo pedido como mensagem ao WhatsApp do restaurante — útil para take-away, equipas pequenas ou quando o gerente está fora. Ambos podem estar ativos ao mesmo tempo.
            </p>
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-benefits">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">O que recebes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-how">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">Como funciona o fluxo de pedidos IQ Rest</h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">Quatro interruptores no painel e estás ao vivo. Sem instalador, sem hardware POS, sem projeto de integração.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-table">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">Agregador, POS clássico ou sistema de pedidos</h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">Característica</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">Agregador entregas</th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">POS clássico</th>
                  <th className="text-left font-semibold py-3 text-primary">Pedidos IQ Rest</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}>
                    <td className="py-3 pr-3 font-medium">{row[0]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-start">
            Um sistema de pedidos online que o restaurante controla paga-se no primeiro fim de semana — cada euro que o cliente gasta no local fica no local, e a comanda ao pass leva sempre o número da mesa real.
          </p>
        </div>
      </Section>
    </>
  );
}
