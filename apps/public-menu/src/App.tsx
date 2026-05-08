import { useQuery } from "@tanstack/react-query";

interface MenuPayload {
  restaurant: {
    id: string;
    title: string;
    description: string | null;
    accentColor: string;
    currency: string;
    source: string | null;
    languages: string[];
    defaultLanguage: string;
  };
  categories: Array<{ id: string; name: string }>;
  items: Array<{ id: string; categoryId: string; name: string; price: number; imageUrl: string | null }>;
}

function resolveSlug(): string | null {
  const host = window.location.hostname;
  // Production: <slug>.iq-rest.com
  if (host.endsWith(".iq-rest.com")) {
    const sub = host.slice(0, -".iq-rest.com".length);
    if (sub && sub !== "www") return sub;
  }
  // Local dev: ?slug=xxx for testing
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

export function App() {
  const slug = resolveSlug();

  const { data, isLoading, error } = useQuery<MenuPayload>({
    enabled: !!slug,
    queryKey: ["menu", slug],
    queryFn: async () => {
      const res = await fetch(`/api/public/menu/${slug}`);
      if (!res.ok) throw new Error(`menu fetch failed (${res.status})`);
      return res.json();
    },
  });

  if (!slug) {
    return (
      <div style={{ padding: 32, fontFamily: "system-ui" }}>
        Public menu — pass <code>?slug=&lt;name&gt;</code> for local dev or open as <code>&lt;slug&gt;.iq-rest.com</code>.
      </div>
    );
  }
  if (isLoading) return <div style={{ padding: 32 }}>Loading…</div>;
  if (error || !data) return <div style={{ padding: 32 }}>Restaurant not found.</div>;

  const r = data.restaurant;
  return (
    <div style={{ minHeight: "100dvh", background: r.accentColor || "#000", color: "white", padding: 32 }}>
      <h1 style={{ margin: 0, fontSize: 48 }}>{r.title}</h1>
      {r.description ? <p style={{ marginTop: 8, fontSize: 16 }}>{r.description}</p> : null}
      <p style={{ marginTop: 24, opacity: 0.7 }}>{data.categories.length} categories · {data.items.length} items</p>
    </div>
  );
}
