import { useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { useMemo, useState } from "react";

const CAT_TITLES: Record<string, string> = {
  men: "Men's Wear",
  women: "Women's Wear",
  footwear: "Footwear",
  sale: "Sale",
  new: "New Arrivals",
  brands: "Brands",
  kids: "Kids' Wear",
  all: "All Products",
};

const FILTERS = ["Brand", "Size", "Color", "Price", "Fit", "Pattern", "Sleeve", "Material", "Occasion"];

const Category = () => {
  const { cat = "all" } = useParams();
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() || "";
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    let l = ["men", "women", "footwear"].includes(cat)
      ? products.filter((p) => p.category === cat)
      : products;
    if (q) l = l.filter((p) => (p.brand + " " + p.title).toLowerCase().includes(q));
    if (sort === "low") l = [...l].sort((a, b) => +a.price.split("-")[0] - +b.price.split("-")[0]);
    if (sort === "high") l = [...l].sort((a, b) => +b.price.split("-")[0] - +a.price.split("-")[0]);
    if (sort === "discount") l = [...l].sort((a, b) => +(b.off || 0) - +(a.off || 0));
    return l;
  }, [cat, q, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-3 text-xs text-foreground/60">
        <a href="/" className="hover:text-primary">Home</a> / <span className="text-foreground font-semibold">{CAT_TITLES[cat]}</span>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden md:block">
          <h3 className="font-bold text-sm tracking-wider mb-4">FILTER BY</h3>
          <div className="space-y-1">
            {FILTERS.map((f) => (
              <details key={f} className="border-b border-border py-3 group">
                <summary className="cursor-pointer text-sm font-semibold flex items-center justify-between">
                  {f}
                  <span className="text-foreground/40 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="pt-3 space-y-2 text-sm text-foreground/70">
                  {f === "Brand" && ["U.S. Polo Assn.", "Tommy Hilfiger", "Calvin Klein", "Arrow Sport", "Flying Machine"].map((b) => (
                    <label key={b} className="flex items-center gap-2"><input type="checkbox" /> {b}</label>
                  ))}
                  {f === "Size" && <div className="flex flex-wrap gap-2">{["S","M","L","XL","XXL"].map((s) => <span key={s} className="border border-border px-3 py-1 text-xs cursor-pointer hover:border-primary">{s}</span>)}</div>}
                  {f === "Price" && <input type="range" className="w-full" />}
                  {!["Brand","Size","Price"].includes(f) && <p className="text-xs">Loading…</p>}
                </div>
              </details>
            ))}
          </div>
        </aside>

        <main>
          <div className="flex items-end justify-between mb-5 border-b border-border pb-3">
            <div>
              <h1 className="text-2xl font-bold capitalize">{CAT_TITLES[cat]}</h1>
              <p className="text-xs text-foreground/60 mt-1">{list.length} products</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-foreground/60">SORT:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-border px-3 py-1.5 outline-none bg-background">
                <option value="popular">Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {list.length === 0 && <p className="py-20 text-center text-foreground/60">No products found.</p>}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
