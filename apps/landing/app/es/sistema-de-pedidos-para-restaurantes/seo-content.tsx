import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR por mesa, escanea y pide, sin app que instalar",
  "Pedidos a la tableta de cocina o del responsable en tiempo real",
  "O enviados al WhatsApp del local — tú decides el canal",
  "Modificadores, variantes y alérgenos llegan al ticket",
  "Comentario libre del cliente en cada pedido",
  "Numeración diaria para la cocina",
  "Checkout multilingüe en 35 idiomas, según el móvil del cliente",
  "Cero comisión por pedido — suscripción fija mensual",
];

const HOW_STEPS = [
  {
    title: "Activa pedidos en el restaurante",
    desc: "Abre los ajustes del restaurante, activa el interruptor de Pedidos y elige qué datos del cliente (nombre, teléfono, dirección) quieres pedir.",
  },
  {
    title: "Elige el canal de entrega",
    desc: "El modo interno envía los pedidos a la pestaña Cocina del panel. El modo WhatsApp los manda como mensaje al WhatsApp del local. O usa los dos a la vez.",
  },
  {
    title: "Imprime y pega los QR",
    desc: "Descarga el QR (uno por mesa o uno único) en PDF o PNG y pégalo en las mesas. El cliente escanea con la cámara — sin app store, sin fricción.",
  },
  {
    title: "Sirve la mesa",
    desc: "Las comandas aparecen en la pestaña Cocina con número de mesa, platos, variantes, alérgenos, comentario y número del día. Las mueves de nuevo → en curso → completado. El navegador del cliente se actualiza en tiempo real.",
  },
];

const COMPARISON_ROWS = [
  ["Comisión por pedido", "20-30%", "0%", "0% (cuota fija 6,90€/mes)"],
  ["Destino del pedido", "App del agregador", "Tu propio TPV", "Tu tableta de cocina o WhatsApp"],
  ["Número de mesa en ticket", "No", "Manual", "Sí, automático"],
  ["Modificadores / variantes", "Limitados", "Sí", "Sí, con alérgenos"],
  ["Checkout multilingüe", "Idioma de la app", "No", "35 idiomas, automático"],
  ["Hardware necesario", "Tableta del agregador", "TPV", "Cualquier tableta con navegador"],
  ["Tiempo de configuración", "Llamada de onboarding", "Días-semanas", "5 minutos"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">
            En profundidad
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">
            Qué es un sistema de pedidos para restaurantes{" "}
            <span className="text-muted-foreground">de verdad</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">
            No un marketplace. No un agregador de delivery. Una línea directa
            del móvil del cliente sentado en tu mesa a tu tableta de cocina —
            o a tu WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Un <strong>sistema de pedidos para restaurantes</strong> tal
              como lo entiende IQ Rest es el software que permite al cliente
              sentado en tu mesa abrir la carta en el móvil, montar un carrito
              y enviar la comanda a tu cocina — sin pasar por Uber Eats, Glovo
              o cualquier otro marketplace. El cliente no sale de tu carta QR,
              tú no pagas comisión por pedido, y la comanda llega con el
              número de mesa real.
            </p>
            <p>
              IQ Rest se construye sobre dos canales de entrega. Por defecto,
              <em> modo interno</em>: cada pedido nuevo llega a la pestaña
              Cocina del panel en cualquier tableta, teléfono o portátil que
              tengas en el pase — con el número de mesa, los platos con sus
              variantes y alérgenos, el comentario libre del cliente y un
              número de pedido del día para la cocina. La alternativa, el
              <em>modo WhatsApp</em>, manda el mismo pedido como mensaje al
              WhatsApp del local — útil para equipos pequeños, take-away o
              cuando el responsable no está en el local. Los dos modos pueden
              estar activos a la vez.
            </p>
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-benefits">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Lo que realmente obtienes
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
      </Section>

      <Section noContainer dataSection="seo-how">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Cómo funciona el flujo de pedidos de IQ Rest
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">
            Cuatro interruptores en el panel y estás listo. Sin instalador,
            sin TPV nuevo, sin proyecto de integración.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
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
      </Section>

      <Section noContainer dataSection="seo-table">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Agregador, TPV clásico o sistema de pedidos para restaurantes
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Característica
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Agregador de delivery
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    TPV clásico
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Pedidos IQ Rest
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-6 text-start">
            Un sistema de pedidos para restaurantes que controla el propio
            local se paga solo el primer fin de semana — cada euro que el
            cliente gasta en tu local se queda en tu local, y el ticket del
            pase siempre lleva el número de mesa real.
          </p>
        </div>
      </Section>
    </>
  );
}
