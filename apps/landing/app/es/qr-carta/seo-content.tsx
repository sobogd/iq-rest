import { Check } from "lucide-react";
import { Breadcrumb } from "@/app/_landing/components/breadcrumb";

const BENEFITS = [
  "Higiénico: ningún contacto entre mesas",
  "Sin reimpresiones cuando cambias un precio",
  "Fotos de alta resolución de los platos",
  "Filtros por alérgenos y preferencias",
  "Versión automática en el idioma del cliente",
  "Pedidos directos desde la mesa, sin llamar",
  "Analítica: platos más vistos y pedidos",
  "Actualizaciones instantáneas: stop-list, precios, novedades",
];

const PRINT_OPTIONS = [
  {
    title: "Expositor acrílico o de madera",
    desc: "Formato 8×12 cm con el QR plastificado dentro. Coste 2-4€ por mesa, lo encuentras en imprenta o en Amazon.",
  },
  {
    title: "Vinilo o pegatina",
    desc: "Aplicado sobre la mesa o en la luna de entrada (útil también para take-away). Resiste arañazos y detergentes.",
  },
  {
    title: "Impresión sobre la carta en papel",
    desc: "Si mantienes la carta en papel, añade el QR en el reverso. El cliente elige cómo pedir.",
  },
  {
    title: "Manteles personalizados",
    desc: "Código QR impreso en el mantel desechable. Visual, pero con coste recurrente de imprenta.",
  },
];

const COMPARISON_ROWS = [
  ["Coste inicial por mesa", "Bajo (papel)", "Alto (1-3€/tag)", "Bajo (papel)"],
  ["Compatibilidad con móviles", "Todos", "Solo recientes con NFC", "Todos"],
  ["Actualización del contenido", "No (reimprimir)", "Sí, pero reprogramar tag", "Sí, instantánea"],
  ["Fotos, filtros, idiomas", "No", "Depende", "Sí, completos"],
  ["Pedidos integrados", "No", "No", "Sí, con número de mesa"],
  ["Durabilidad", "Papel — limitada", "Tag físico — frágil", "Papel o vidrio — robusta"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6 justify-center lg:justify-start flex"
          items={[
            { label: "IQ Rest", href: "/es" },
            { label: "QR Carta para Restaurantes" },
          ]}
        />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          En profundidad
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"¿Qué es un QR carta "}
          <span className="text-muted-foreground">para restaurantes?</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          Un código escaneable desde la mesa que abre la carta en el navegador
          — sin app, sin PDF.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            Un <strong>código QR carta</strong> es un código gráfico impreso
            en la mesa (en papel plastificado, vinilo, expositor o pegatina)
            que, una vez escaneado con la cámara del móvil, abre directamente
            la carta del restaurante en el navegador del cliente. Sin apps
            que descargar, sin PDF que abrir: se escanea, se lee, se pide.
          </p>
          <p>
            Técnicamente el QR contiene una URL: la calidad de la carta
            depende enteramente de lo que haya detrás de esa URL. ¿Un PDF
            comprimido? ¿Un sitio móvil lento? ¿Una carta interactiva de
            verdad? La diferencia entre una <strong>carta con código QR</strong>
            mediocre y una profesional está justamente ahí — lo que el
            cliente ve después del escaneo.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Ventajas de la carta con QR frente a la carta en papel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b}
                className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-snug">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Cómo imprimir y aplicar el código QR a las mesas
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center lg:text-start">
            Desde el panel de IQ Rest descargas el código QR carta en PDF o
            PNG de alta resolución, vectorial y listo para imprenta. Las
            opciones más comunes entre los hosteleros españoles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {PRINT_OPTIONS.map((o) => (
              <div
                key={o.title}
                className="bg-muted/20 border border-border rounded-2xl p-5"
              >
                <div className="text-base sm:text-lg font-semibold tracking-tight mb-2">
                  {o.title}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center lg:text-start">
            El QR generado por IQ Rest no caduca y nunca cambia. Cambias
            precios, fotos, descripciones o añades platos — el QR impreso
            sigue siendo válido para siempre. Imprimes una vez, pagas una vez.
          </p>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Diferencia entre QR estático, NFC y QR carta completo
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Característica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    QR estático
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    NFC tag
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    QR carta completo
                  </th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={
                      i < COMPARISON_ROWS.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }
                  >
                    <td className="py-3 pr-3 font-medium">{row[0]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 text-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center lg:text-start">
            Un QR carta completo cuesta menos que el NFC, funciona en todos
            los móviles y da al hostelero todo lo que el QR estático no
            puede ofrecer: actualizaciones instantáneas, pedidos directos y
            analítica.
          </p>
        </div>
      </div>
    </section>
  );
}
