import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const NAV = [
  { label: "SALE", to: "/c/sale", accent: true },
  { label: "NEW ARRIVALS", to: "/c/new" },
  { label: "MEN", to: "/c/men" },
  { label: "WOMEN", to: "/c/women" },
  { label: "KIDS", to: "/c/kids" },
  { label: "FOOTWEAR", to: "/c/footwear" },
  { label: "BRANDS", to: "/c/brands" },
];

export const Header = () => {
  const { count } = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top utility bar */}
      <div className="bg-topbar text-[12px]">
        <div className="container flex items-center justify-between h-9">
          <div className="flex items-center gap-4 text-foreground/70">
            <Link to="#" className="hover:text-primary">📍 Store Locator</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-primary">📱 Get APP</Link>
          </div>
          <div className="hidden md:flex items-center gap-2 font-semibold text-primary">
            ✨ New users: Get EXTRA 15% OFF ✨
          </div>
          <div className="flex items-center gap-4 text-foreground/70">
            <Link to="#" className="hover:text-primary">📦 Track Order</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-primary">🏆 Loyalty</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container grid grid-cols-[1fr_auto_1fr] items-center gap-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            nav(`/c/all?q=${encodeURIComponent(q)}`);
          }}
          className="flex items-center gap-2 border-b border-foreground/30 pb-1.5 max-w-md"
        >
          <Search className="w-5 h-5 text-brand-magenta" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NNNOW"
            className="bg-transparent outline-none w-full text-sm placeholder:text-foreground/50"
          />
        </form>

        <Link to="/" className="flex flex-col items-center leading-none">
          <span className="text-[28px] font-extrabold tracking-tight">
            <span style={{ color: "hsl(var(--brand-cyan))" }}>N</span>
            <span style={{ color: "hsl(var(--primary))" }}>N</span>
            <span style={{ color: "hsl(var(--brand-magenta))" }}>N</span>
            <span style={{ color: "hsl(var(--brand-yellow))" }}>O</span>
            <span style={{ color: "hsl(var(--primary))" }}>W</span>
          </span>
          <span className="text-[10px] text-foreground/60 -mt-0.5 tracking-wider">
            by <span className="text-brand-magenta font-serif italic">Arvind</span>
          </span>
        </Link>

        <div className="flex items-center justify-end gap-5">
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="w-6 h-6 text-brand-magenta" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          <span className="text-foreground/30">|</span>
          <button className="flex items-center gap-1.5 text-sm hover:text-primary">
            <User className="w-5 h-5 text-brand-magenta" strokeWidth={1.6} />
            Login
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="border-t border-border">
        <div className="container flex items-center justify-center gap-10 h-12 overflow-x-auto scrollbar-hide">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className={`nav-link whitespace-nowrap ${n.accent ? "text-destructive" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
