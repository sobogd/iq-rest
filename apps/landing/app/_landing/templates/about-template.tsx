import Image from "next/image";
import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { PageTracker } from "../components/page-tracker";
import { LinkForward } from "../components/link-forward";
import { getHelpBanner } from "../help/registry";
import { NARROW, PAGE } from "../components/shell";
import type { LandingTexts } from "../types";
import { getIcon, type IconKey } from "../lib/icons";

// About page. Same construction as the v2 home: one 1000px column, plain
// sections separated by a single gap, everything inside outline cards.
// It exists for trust rather than traffic — Stripe and the EU ad platforms
// expect a visible operator identity, and until now the only place carrying it
// was the privacy policy.
const WHATSAPP_NUMBER = "998948663743";

export type AboutContact = {
  icon: IconKey;
  title: string;
  /** Displayed value; `href` turns it into a link, `wa` builds the WhatsApp one. */
  value: string;
  href?: string;
  wa?: boolean;
  note?: string;
};

export type AboutCopy = {
  heading: string;
  /** Second half of the headline, painted with the brand gradient like the
   *  home hero's. */
  headingAccent?: string;
  story: {
    /** Paragraphs of the story; `{count}` is replaced with the live number. */
    paragraphs: string[];
    photo?: { src: string; alt: string };
    sign?: string;
  };
  /** Hard numbers under the story — the antidote to "is this a one-man shop
   *  that disappears next month?". */
  facts: { value: string; label: string }[];
  contacts: AboutContact[];
  waPrefill: string;
  legal: {
    rows: { label: string; value: string }[];
    note?: string;
  };
};

export function AboutTemplate({
  locale,
  texts,
  copy,
  count,
  aboutHref,
  page = "about",
}: {
  locale: string;
  texts: LandingTexts;
  copy: AboutCopy;
  /** Live restaurant count, substituted for "{count}". */
  count: number;
  /** This page's own URL — keeps the nav item present and highlightable. */
  aboutHref?: string;
  page?: string;
}) {
  const helpBanner = getHelpBanner(locale);
  const countLabel = count.toLocaleString(locale);
  const withCount = (s: string) => s.replace("{count}", countLabel);
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.waPrefill)}`;

  return (
    <main className={PAGE}>
      <PageTracker page={page} />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        featureLinks={texts.footer.featureLinks}
        helpHref={helpBanner?.href}
        aboutHref={aboutHref}
        containerClass={NARROW}
        compact
        navLayout="grouped"
      />

      {/* Same card as the home hero: copy on the left, the warm tinted panel on
          the right — only there it carries device mockups and here the numbers
          that answer "how real is this company". */}
      <section data-section="about_intro" className="w-full">
        <div className={NARROW}>
          <div className="overflow-hidden rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[11fr_9fr]">
            <div className="order-2 lg:order-1 flex flex-col justify-center gap-4 p-5 sm:p-6">
              <h1 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.05]">
                {copy.heading}{" "}
                {copy.headingAccent ? (
                  <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                    {copy.headingAccent}
                  </span>
                ) : null}
              </h1>
              {copy.story.paragraphs.map((p) => (
                <p key={p} className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                  {withCount(p)}
                </p>
              ))}

              {/* Photo and signature close the story — a face does more for
                  trust than any "about us" boilerplate. Same split as the home
                  page's founder block: name on one line, role under it. */}
              {copy.story.sign ? (
                (() => {
                  const parts = copy.story.sign.split("·").map((x) => x.trim());
                  const name = parts[0] ?? copy.story.sign;
                  const role = parts.slice(1).join(" · ");
                  return (
                    <div className="flex items-center gap-3">
                      {copy.story.photo ? (
                        <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={copy.story.photo.src}
                            alt={copy.story.photo.alt}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-col">
                        <p className="text-base font-medium text-foreground/90">{name}</p>
                        {role ? <p className="text-sm text-muted-foreground">{role}</p> : null}
                      </div>
                    </div>
                  );
                })()
              ) : null}
            </div>

            <div className="order-1 lg:order-2 flex flex-col justify-center gap-6 p-6 sm:p-8 bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]">
              {copy.facts.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <p className="text-3xl sm:text-4xl font-medium tracking-tight leading-none">
                    {withCount(f.value)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground/80 leading-relaxed">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-section="about_contacts" className="w-full">
        <div className={NARROW}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {copy.contacts.map((c) => {
              const href = c.wa ? wa : c.href;
              const Icon = getIcon(c.icon);
              return (
                <div
                  key={c.title}
                  className="flex flex-col gap-2 rounded-2xl border border-border p-5 sm:p-6"
                >
                  <Icon className="h-7 w-7 mb-1 text-primary" strokeWidth={1.75} />
                  <p className="font-semibold text-base">{c.title}</p>
                  {href ? (
                    <LinkForward
                      href={href}
                      trackName={`About: ${c.title}`}
                      className="text-sm text-primary hover:opacity-70 transition-opacity break-words"
                    >
                      {c.value}
                    </LinkForward>
                  ) : (
                    /* Same accent as the linked values — the three cards read
                       as one row. */
                    <p className="text-sm text-primary">{c.value}</p>
                  )}
                  {c.note ? (
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{c.note}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section data-section="about_legal" className="w-full">
        <div className={NARROW}>
          <div className="rounded-2xl border border-border p-5 sm:p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {copy.legal.rows.map((r) => (
                <div key={r.label} className="flex flex-col">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground/70">
                    {r.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{r.value}</dd>
                </div>
              ))}
            </dl>
            {copy.legal.note ? (
              <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed">
                {copy.legal.note}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <footer data-section="about_footer" className="w-full">
        <div className={NARROW}>
          <LandingFooter
            texts={texts.footer}
            headerTexts={texts.header}
            locale={locale}
            helpHref={helpBanner?.href}
            aboutHref={aboutHref}
          />
        </div>
      </footer>
    </main>
  );
}
