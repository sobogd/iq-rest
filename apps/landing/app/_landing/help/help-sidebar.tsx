import { HelpNavTracker } from "./help-nav-tracker";

// In-page navigation (table of contents). Lives inside the help card's tinted
// left column, whose wrapper is already sticky — so no positioning of its own.
// Server component — the markup is fully static, so it renders straight to
// HTML with no hydration. Click analytics live in the tiny <HelpNavTracker>
// island, which attaches one delegated listener rather than a per-anchor
// handler.
export function HelpSidebar({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav data-help-nav className="w-full mt-2">
      <HelpNavTracker />
      <ul className="space-y-1 -mx-3">
        {items.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block py-1.5 px-3 text-[14px] text-muted-foreground hover:text-foreground rounded-md hover:bg-background/60 transition-colors"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
