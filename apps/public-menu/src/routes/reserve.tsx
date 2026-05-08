import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reserve")({ component: () => <Stub label="reserve" /> });

function Stub({ label }: { label: string }) {
  return (
    <div className="p-8 text-sm">
      <Link to="/" className="text-blue-600 underline">← back</Link>
      <p className="mt-4">{label} page — coming next stage.</p>
    </div>
  );
}
