import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface HeroCreateButtonProps {
  children: React.ReactNode;
}

export function HeroCreateButton({ children }: HeroCreateButtonProps) {
  return (
    <Button
      asChild
      className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
    >
      <Link href="/dashboard">{children}</Link>
    </Button>
  );
}
