import { RouterProvider, createRouter, parseSearchWith, stringifySearchWith } from "@tanstack/react-router";
import "./lib/i18n";
import { routeTree } from "./routeTree.gen";

// Default stringifier JSON-encodes values, so { table: "1" } becomes
// `?table=%221%22` (with literal quotes). Use identity functions to keep
// search params as plain strings — `?table=1` round-trips cleanly.
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  parseSearch: parseSearchWith((v) => v),
  stringifySearch: stringifySearchWith((v) => (v === null || v === undefined ? "" : String(v))),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
