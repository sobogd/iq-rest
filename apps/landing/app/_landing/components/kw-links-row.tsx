import { LinkForward } from "./link-forward";

interface KwLink {
  href: string;
  label: string;
}

interface KwLinksRowProps {
  heading: string;
  links: KwLink[];
}

/** In-content chip row linking to sibling keyword-targeted landings. Lives
 *  between FAQ and FinalCta, mirroring the placement on the main locale
 *  page. In-body links carry more internal-link weight than footer links,
 *  and showing the row on every sibling builds a small topical cluster
 *  Google reads as a coherent group of pages about the same intent. */
export function KwLinksRow({ heading, links }: KwLinksRowProps) {
  return (
    <section data-section="kw-links" className="bg-muted/20 pt-10 pb-16 !mt-0 sm:!-mt-10 sm:pt-0">
      <div className="container mx-auto px-4">
        <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center lg:text-start">
          {heading}
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
          {links.map((link) => (
            <LinkForward
              key={link.href}
              href={link.href}
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              {link.label} →
            </LinkForward>
          ))}
        </div>
      </div>
    </section>
  );
}
