import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/language")({ component: Page });

function Page() {
  return (
    <div className="p-8 text-sm">
      <Link to="/" className="text-blue-600 underline">← back</Link>
      <p className="mt-4">language page — coming next stage.</p>
    </div>
  );
}
