import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div className={cn("p-6 max-w-lg md:mx-auto", className)}>
      {children}
    </div>
  );
}
