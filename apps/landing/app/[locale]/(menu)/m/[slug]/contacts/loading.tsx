import { Loader2 } from "lucide-react";

export default function ContactsLoading() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
