import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, headerRight, children, className }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-muted/50 overflow-hidden [&_input]:bg-muted/50 [&_input]:rounded-md [&_button[role=switch]]:rounded-md [&_button[role=switch]_span]:rounded-md [&_label.flex]:rounded-md [&_label.flex]:bg-muted/50 [&_button[role=combobox]]:!bg-muted/50 [&_button[role=combobox]]:!rounded-md",
        className
      )}
    >
      {title && (
        <div className="px-4 py-3.5 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h2>
          {headerRight}
        </div>
      )}
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  );
}
