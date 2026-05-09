import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { bootstrapSessionFromUrl } from "./lib/forward-search";
import "./index.css";

// Seed sessionStorage from the URL before React mounts. Inside the SPA we
// then read table + preview straight from sessionStorage — no per-Link
// search-param forwarding required.
bootstrapSessionFromUrl();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Bootloader (defined inline in index.html) is removed by RootLayout once
// real content is ready to paint — keeping it visible across mount + fetch.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
