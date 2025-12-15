import { Link } from "@/i18n/routing";

interface LanguageLinkProps {
  href: string;
  locale: string;
  className?: string;
  children: React.ReactNode;
}

export function LanguageLink({ href, locale, className, children }: LanguageLinkProps) {
  return (
    <Link href={href} locale={locale} className={className}>
      {children}
    </Link>
  );
}
