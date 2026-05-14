import { Check } from "lucide-react";
import { Breadcrumb } from "@/app/_landing/components/breadcrumb";

const BENEFITS = [
  "Lista en 5 minutos, no en semanas",
  "Coste fijo 6,90€/mes, sin presupuestos",
  "Modificaciones instantáneas, sin técnicos externos",
  "Importación IA desde la carta en papel o PDF",
  "Código QR generado e imprimible en un clic",
  "Traducción automática a 35 idiomas",
  "Independencia total de la agencia o el diseñador",
  "Fotos, alérgenos, variantes, precios flexibles",
];

const CREATE_STEPS = [
  {
    title: "Regístrate y elige el tipo de local",
    desc: "30 segundos: nombre del restaurante, email o acceso con Google. El editor está listo.",
  },
  {
    title: "Importa o crea la carta",
    desc: "Sube una foto de la carta en papel: la IA la digitaliza en 60 segundos. O añade los platos uno a uno con drag-and-drop.",
  },
  {
    title: "Personaliza fotos, colores e idiomas",
    desc: "Sube fotos de los platos, elige los colores de la marca y activa la traducción automática a los idiomas de tus clientes.",
  },
  {
    title: "Publica e imprime el código QR",
    desc: "Descarga el código QR en PDF o PNG, imprímelo para las mesas. Los clientes escanean, piden directamente, recibes todo en el panel.",
  },
];

const COMPARISON_ROWS = [
  ["Tiempo de creación", "2-6 semanas", "1-3 días", "5 minutos"],
  ["Coste inicial", "700-2.500€", "Gratis con límites", "0€ (14 días gratis)"],
  ["Coste recurrente", "Mantenimiento por horas", "10-30€/mes", "6,90€/mes"],
  ["Competencias técnicas", "Ninguna (delegas)", "Plantilla editable", "Ninguna"],
  ["Modificar la carta", "Dependes de la agencia", "Sí, pero manual", "Instantáneo, desde el móvil"],
  ["Código QR imprimible", "A petición, coste extra", "Hay que generarlo aparte", "Incluido, automático"],
  ["Traducción 35 idiomas", "Presupuesto aparte", "No / manual", "Incluida, con IA"],
  ["Pedidos integrados", "Desarrollo extra", "Plugin aparte", "Incluidos, cero comisiones"],
];

export function SeoContent() {
  return (
    <section data-section="seo-content" className="scroll-mt-16 pt-4 sm:pt-6 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          className="mb-6 justify-center lg:justify-start flex"
          items={[
            { label: "IQ Rest", href: "/es" },
            { label: "Carta Digital para Restaurantes" },
          ]}
        />
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          En profundidad
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {"Cómo crear una carta digital "}
          <span className="text-muted-foreground">para tu restaurante</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
          Editor móvil, importación IA desde el papel, código QR automático
          — todo en 5 minutos, sin agencias.
        </p>

        <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed mb-20">
          <p>
            <strong>Crear una carta digital</strong> para un restaurante hoy
            no significa contactar con una agencia, recibir un presupuesto de
            1.500€ y esperar cuatro semanas. Significa abrir el panel desde
            el móvil, importar la carta en papel existente (la IA la
            digitaliza en un minuto) y recibir el código QR imprimible para
            las mesas antes del siguiente servicio.
          </p>
          <p>
            El mismo proceso vale para <strong>crear el QR de la carta</strong>:
            no es una operación aparte. Cuando creas la carta digital, la
            plataforma genera automáticamente el código QR único, listo para
            descargar en PDF o PNG de alta resolución. Lo imprimes, lo pegas
            en las mesas y listo. El hostelero nunca tiene que abrir un
            programa de diseño.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Ventajas de crear la carta digital tú mismo
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
            Los 4 pasos para crear la carta digital (y el código QR)
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center lg:text-start">
            El mismo flujo permite crear tanto la carta digital como el QR
            de la carta del restaurante. Tiempo total: menos de 5 minutos
            desde el móvil.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {CREATE_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4"
              >
                <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base sm:text-lg font-semibold tracking-tight mb-1">
                    {s.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center lg:text-start">
            Crear con agencia, plantilla genérica o IQ Rest: qué cambia
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Característica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Agencia
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Plantilla genérica
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    IQ Rest editor
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
            Crear la carta digital con un editor especializado para
            restaurantes cuesta menos que una agencia, es más rápido que una
            plantilla genérica (que además no gestiona pedidos ni código QR)
            y deja al hostelero completamente autónomo.
          </p>
        </div>
      </div>
    </section>
  );
}
