import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { openNamedTab, tabName } from "@/lib/tabs";

const HERO_SLIDES = [
  {
    title: "UP TO 55% OFF",
    sub: "PRIME STAPLES: POLOS & SHIRTS",
    cta: "SHOP NOW",
    bg: "linear-gradient(120deg, #2563eb 0%, #1e40af 60%, #c5d3f0 100%)",
    img: products.find((p) => p.id === "9EH2W2Y5RB7")?.image2,
  },
];

const CATEGORY_TILES = [
  { label: "Men", to: "/c/men", img: products.find((p) => p.category === "men")?.image, color: "from-sky-200 to-sky-100" },
  { label: "Women", to: "/c/women", img: products.find((p) => p.category === "women")?.image, color: "from-rose-200 to-rose-100" },
  { label: "Footwear", to: "/c/footwear", img: products.find((p) => p.category === "footwear")?.image, color: "from-amber-200 to-amber-100" },
  { label: "Kids", to: "/c/men", img: products[3]?.image, color: "from-emerald-200 to-emerald-100" },
];

const Index = () => {
  const featured = products.slice(0, 8);
  const womens = products.filter((p) => p.category === "women").slice(0, 8);
  const shoes = products.filter((p) => p.category === "footwear").slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="container pt-4">
        <div
          className="relative overflow-hidden rounded-sm aspect-[16/6] flex items-center"
          style={{ background: HERO_SLIDES[0].bg }}
        >
          {HERO_SLIDES[0].img && (
            <img
              src={HERO_SLIDES[0].img}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
          )}
          <div className="relative z-10 ml-auto mr-12 md:mr-24 text-right text-white">
            <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight drop-shadow">
              {HERO_SLIDES[0].title}
            </h1>
            <p className="mt-2 md:text-xl font-semibold tracking-wider">{HERO_SLIDES[0].sub}</p>
            <Link
              to="/c/men"
              className="inline-block mt-5 bg-white text-foreground rounded-full px-7 py-2.5 text-sm font-bold hover:bg-foreground hover:text-background transition-colors"
            >
              {HERO_SLIDES[0].cta}
            </Link>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Promo bars */}
        <div className="mt-4 rounded-sm py-5 px-6 text-center font-extrabold text-2xl text-primary"
             style={{ background: "var(--gradient-promo)" }}>
          FLAT 15% OFF <span className="text-foreground/60 text-base">on your first purchase</span>{" "}
          <span className="ml-2 text-foreground">CODE: <span className="text-primary">NEW15</span></span>
        </div>

        <div className="mt-3 rounded-sm py-5 text-center font-extrabold text-xl text-white"
             style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(215 90% 60%))" }}>
          NEW COLLECTION ON SALE — EXTRA 20% OFF{" "}
          <span className="bg-white text-primary rounded-full px-3 py-1 text-xs ml-2">CODE: NSM20</span>
        </div>
      </section>

      {/* Category tiles */}
      <section className="container mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORY_TILES.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) {
                  e.preventDefault();
                  openNamedTab(c.to, tabName(c.to));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                openNamedTab(c.to, tabName(c.to));
              }}
              className="group block"
            >
              <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${c.color}`}>
                {c.img && (
                  <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-extrabold text-xl uppercase tracking-wider">
                  {c.label}
                </span>
                <button
                  type="button"
                  aria-label={`Open ${c.label} in new tab`}
                  title="Open in new tab"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openNamedTab(c.to, tabName(c.to));
                  }}
                  className="absolute top-2 right-2 w-8 h-8 grid place-items-center bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <Section title="BESTSELLERS · MEN" link="/c/men" items={featured} />
      <Section title="WOMEN'S EDIT" link="/c/women" items={womens} />
      <Section title="FOOTWEAR" link="/c/footwear" items={shoes} />

      {/* Brand strip */}
      <section className="container mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">SHOP BY BRAND</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {["U.S. POLO ASSN.", "TOMMY HILFIGER", "CALVIN KLEIN", "ARROW", "FLYING MACHINE", "AD"].map((b) => (
            <div key={b} className="aspect-[5/2] grid place-items-center bg-secondary border border-border rounded-sm font-bold text-xs md:text-sm text-center px-2">
              {b}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Section = ({ title, link, items }: { title: string; link: string; items: typeof products }) => (
  <section className="container mt-12">
    <div className="flex items-end justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-bold tracking-wide">{title}</h2>
      <Link to={link} className="text-sm font-semibold text-primary hover:underline">VIEW ALL →</Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default Index;
