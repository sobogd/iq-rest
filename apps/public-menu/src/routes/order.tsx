import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order")({ component: Page });

function Page() {
  return (
    <div className="p-8 text-sm">
      <Link to="/menu" className="text-blue-600 underline">← back to menu</Link>
      <p className="mt-4">order page — coming next stage.</p>
    </div>
  );
}
