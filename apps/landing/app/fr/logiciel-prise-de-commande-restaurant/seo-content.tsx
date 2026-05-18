import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "QR par table, scan-pour-commander, aucune app à installer",
  "Commandes en temps réel sur la tablette cuisine ou manager",
  "Ou routées vers le WhatsApp du restaurant — votre choix",
  "Modificateurs, variantes et allergènes remontent sur le ticket",
  "Commentaire libre du client sur chaque commande",
  "Numérotation quotidienne pour la cuisine",
  "Checkout multilingue en 35 langues, détecté par le téléphone client",
  "Zéro commission par commande — abonnement mensuel fixe",
];

const HOW_STEPS = [
  {
    title: "Activez la prise de commande sur le restaurant",
    desc: "Ouvrez les paramètres du restaurant, activez l'interrupteur Commandes activées et choisissez les champs client (nom, téléphone, adresse) à collecter.",
  },
  {
    title: "Choisissez le canal de livraison",
    desc: "Le mode interne envoie les nouvelles commandes à l'onglet Cuisine du tableau de bord. Le mode WhatsApp les formate en message vers le WhatsApp de l'établissement. Ou les deux en parallèle.",
  },
  {
    title: "Imprimez et placez les QR",
    desc: "Téléchargez le QR (un par table ou un pour tout l'établissement) en PDF ou PNG et collez-le sur les tables. Les clients scannent avec leur appareil photo natif — pas d'app store, pas de friction.",
  },
  {
    title: "Tenez le service",
    desc: "Les commandes apparaissent dans l'onglet Cuisine avec numéro de table, plats, variantes, allergènes, commentaire et numéro du jour. Vous passez de nouveau → en cours → terminé. Le navigateur client se met à jour en temps réel.",
  },
];

const COMPARISON_ROWS = [
  ["Commission par commande", "20–30 %", "0 %", "0 % (6,90€/mois fixe)"],
  ["Destination commande", "App de l'agrégateur", "Votre caisse", "Tablette cuisine ou WhatsApp"],
  ["Numéro de table sur ticket", "Non", "Manuel", "Oui, automatique"],
  ["Modificateurs / variantes", "Limités", "Oui", "Oui, avec allergènes"],
  ["Checkout multilingue", "Langue de leur app", "Non", "35 langues, automatique"],
  ["Matériel requis", "Tablette de l'agrégateur", "Terminal TPV", "Toute tablette avec navigateur"],
  ["Temps de mise en place", "Appel d'onboarding", "Jours–semaines", "5 minutes"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">
            En détail
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">
            Ce qu'est vraiment un logiciel de prise de commande{" "}
            <span className="text-muted-foreground">pour restaurant</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">
            Pas un marketplace. Pas un agrégateur de livraison. Une ligne
            directe du téléphone du client assis à votre table à votre
            tablette cuisine — ou votre WhatsApp.
          </p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              Un <strong>logiciel de prise de commande pour restaurant</strong>
              {" "}au sens IQ Rest est le logiciel qui permet au client assis à
              l'une de vos tables d'ouvrir le menu sur son téléphone, monter
              un panier et envoyer la commande à votre cuisine — sans passer
              par Uber Eats, Deliveroo, Just Eat ou tout autre marketplace.
              Le client ne quitte jamais votre menu QR, vous ne payez aucune
              commission par commande, et le ticket arrive avec le vrai
              numéro de table.
            </p>
            <p>
              IQ Rest est bâti autour de deux canaux de livraison. Par
              défaut, <em>mode interne</em>, chaque nouvelle commande arrive
              à l'onglet Cuisine du tableau de bord sur la tablette, le
              téléphone ou l'ordinateur que vous gardez au pass — il affiche
              le numéro de table, les plats avec leurs variantes et
              allergènes, le commentaire libre du client et un numéro de
              commande du jour pour la cuisine. L'alternative,{" "}
              <em>mode WhatsApp</em>, formate la même commande en message et
              l'envoie au WhatsApp du restaurant — utile quand vous avez une
              petite équipe, quand l'ordre est principalement à emporter ou
              quand le manager n'est pas sur place. Les deux modes peuvent
              fonctionner en parallèle.
            </p>
          </div>
        </div>
      </Section>

      <Section noContainer dataSection="seo-benefits">
        <div className="w-full">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">
            Ce que vous obtenez vraiment
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
            Comment fonctionne le flux de commande IQ Rest
          </h3>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">
            Quatre interrupteurs dans le tableau de bord et vous êtes live.
            Pas d'installateur, pas de matériel TPV, pas de projet
            d'intégration.
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
            Agrégateur, TPV classique ou logiciel de prise de commande
          </h3>
          <div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold py-3 pr-3 text-foreground">
                    Caractéristique
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    Agrégateur livraison
                  </th>
                  <th className="text-left font-semibold py-3 pr-3 text-muted-foreground">
                    TPV classique
                  </th>
                  <th className="text-left font-semibold py-3 text-primary">
                    Commandes IQ Rest
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
            Un logiciel de prise de commande que le restaurant possède
            vraiment se rembourse dès le premier week-end — chaque euro qu'un
            client dépense chez vous reste chez vous, et le ticket au pass
            affiche toujours le vrai numéro de table.
          </p>
        </div>
      </Section>
    </>
  );
}
