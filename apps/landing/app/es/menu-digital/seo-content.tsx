import { Check } from "lucide-react";
import { Breadcrumb } from "@/app/_landing/components/breadcrumb";

const BENEFITS = [
  "Cero costes de imprenta y reimpresiones",
  "Actualización de precios en tiempo real",
  "Soporte a 35 idiomas con traducción IA",
  "Fotos de los platos y descripciones detalladas",
  "Pedidos directos sin comisiones",
  "Reservas de mesa integradas 24/7",
  "Gestión de alérgenos y variantes",
  "Analítica: platos más vistos y pedidos",
];

const COMPARISON_ROWS = [
  ["Actualización de precios", "Lenta (recargar archivo)", "Lenta", "En tiempo real"],
  ["Multilingüe", "No", "No", "35 idiomas con IA"],
  ["Pedidos directos", "No", "No", "Sí, sin comisiones"],
  ["Filtros de alérgenos", "No", "No", "Sí"],
  ["Analítica", "No", "No", "Platos más vistos y pedidos"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6 justify-center lg:justify-start flex"
          items={[
            { label: "IQ Rest", href: "/es" },
            { label: "Menú Digital para Restaurantes" },
          ]}
        />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          En profundidad
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"¿Qué es un menú digital "}
          <span className="text-muted-foreground">para restaurantes?</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          La versión online del menú en papel — más rápida, multilingüe y con
          pedidos integrados.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            Un <strong>menú digital para restaurantes</strong> es la versión
            online del menú en papel, accesible desde el móvil del cliente
            mediante un <strong>código QR</strong> impreso en la mesa o un
            enlace directo. El cliente apunta con la cámara, el menú digital se
            abre en el navegador y muestra los platos, fotos, precios,
            alérgenos y descripciones traducidos a su idioma. Ni apps que
            descargar, ni PDFs pesados.
          </p>
          <p>
            A diferencia de un PDF, el menú digital online se actualiza en
            tiempo real: cambias un precio, activas una stop-list o añades un
            plato desde el móvil y los clientes ven el cambio al instante.
            Para el restaurante eso significa cero reimpresiones, control
            total y — con la plataforma adecuada — también pedidos directos
            sin comisiones de delivery.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Ventajas del menú digital online
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
            Cómo funciona el menú digital del restaurante
          </h3>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              El hostelero crea el menú digital desde el panel: añade las
              categorías (entrantes, principales, postres, bebidas), introduce
              los platos con nombre, precio, foto y alérgenos y personaliza
              los colores de la marca. La plataforma genera automáticamente
              un código QR imprimible para cada mesa o uno único para todo
              el local.
            </p>
            <p>
              Cuando el cliente escanea el QR, el menú digital online se abre
              en el navegador, con la posibilidad de filtrar por alérgenos,
              ver las fotos en alta resolución, leer las descripciones en su
              idioma y añadir los platos al carrito. El pedido llega al
              restaurante por WhatsApp o al panel con el número de mesa,
              listo para preparar en cocina.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Diferencia entre menú digital, menú QR y menú PDF
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Característica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Menú PDF
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    QR estático
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Menú digital
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
            Un menú digital de verdad no es un PDF detrás de un código QR: es
            un sitio web inteligente, pensado para el restaurante, que reduce
            los costes operativos y aumenta el ticket medio — sobre todo con
            los turistas.
          </p>
        </div>
      </div>
    </section>
  );
}
