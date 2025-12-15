interface MenuPageWrapperProps {
  slug: string;
  children: React.ReactNode;
}

export function MenuPageWrapper({ slug, children }: MenuPageWrapperProps) {
  return (
    <div className="h-dvh flex flex-col">
      {children}
    </div>
  );
}
