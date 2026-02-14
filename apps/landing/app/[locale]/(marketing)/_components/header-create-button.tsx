import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ReactNode } from "react";

interface HeaderCreateButtonProps {
  children: ReactNode;
}

export function HeaderCreateButton({ children }: HeaderCreateButtonProps) {
  return (
    <Button asChild>
      <Link href="/dashboard">{children}</Link>
    </Button>
  );
}
