import { products, Product } from "./products";

export type SearchResult =
  | { type: "product"; product: Product; label: string; sublabel: string; to: string }
  | { type: "brand"; label: string; to: string; count: number }
  | { type: "category"; label: string; to: string; count: number };

const CATEGORIES = ["men", "women", "footwear"] as const;

export const searchAll = (raw: string, limit = 8): SearchResult[] => {
  const q = raw.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Categories
  CATEGORIES.forEach((c) => {
    if (c.includes(q)) {
      results.push({
        type: "category",
        label: c.charAt(0).toUpperCase() + c.slice(1),
        to: `/c/${c}`,
        count: products.filter((p) => p.category === c).length,
      });
    }
  });

  // Brands (unique)
  const brandMap = new Map<string, number>();
  products.forEach((p) => brandMap.set(p.brand, (brandMap.get(p.brand) ?? 0) + 1));
  Array.from(brandMap.entries())
    .filter(([b]) => b.toLowerCase().includes(q))
    .slice(0, 4)
    .forEach(([b, count]) =>
      results.push({
        type: "brand",
        label: b,
        to: `/c/all?q=${encodeURIComponent(b)}`,
        count,
      }),
    );

  // Products
  const matched = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
  matched.slice(0, limit).forEach((p) =>
    results.push({
      type: "product",
      product: p,
      label: p.title,
      sublabel: p.brand,
      to: `/p/${p.id}`,
    }),
  );

  return results;
};

export const highlight = (text: string, q: string) => {
  const query = q.trim();
  if (!query) return [{ text, match: false }];
  const lower = text.toLowerCase();
  const lowerQ = query.toLowerCase();
  const parts: { text: string; match: boolean }[] = [];
  let i = 0;
  while (i < text.length) {
    const idx = lower.indexOf(lowerQ, i);
    if (idx === -1) {
      parts.push({ text: text.slice(i), match: false });
      break;
    }
    if (idx > i) parts.push({ text: text.slice(i, idx), match: false });
    parts.push({ text: text.slice(idx, idx + query.length), match: true });
    i = idx + query.length;
  }
  return parts;
};
