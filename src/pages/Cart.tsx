import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, remove, setQty, subtotal } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-foreground/30" />
          <h2 className="mt-4 text-2xl font-bold">Your bag is empty</h2>
          <p className="text-foreground/60 mt-2">Add some style to get started.</p>
          <Link to="/" className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 font-bold">CONTINUE SHOPPING</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">My Bag ({items.length})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.product.id + it.size} className="flex gap-4 border border-border p-4 bg-card">
                <Link to={`/p/${it.product.id}`} className="w-24 h-32 bg-muted shrink-0">
                  <img src={it.product.image} alt={it.product.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm uppercase">{it.product.brand}</p>
                  <p className="text-sm text-foreground/70 truncate">{it.product.title}</p>
                  <p className="text-xs text-foreground/60 mt-2">Size: <span className="font-semibold text-foreground">{it.size}</span></p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center border border-border">
                      <button onClick={() => setQty(it.product.id, it.size, it.qty - 1)} className="w-8 h-8 hover:bg-secondary">−</button>
                      <span className="w-8 text-center text-sm">{it.qty}</span>
                      <button onClick={() => setQty(it.product.id, it.size, it.qty + 1)} className="w-8 h-8 hover:bg-secondary">+</button>
                    </div>
                    <button onClick={() => remove(it.product.id, it.size)} className="text-foreground/60 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(it.product.price)}</p>
                  {it.product.was && <p className="text-xs text-foreground/40 line-through">{formatPrice(it.product.was)}</p>}
                </div>
              </div>
            ))}
          </div>

          <aside className="border border-border p-5 h-max bg-card">
            <h3 className="font-bold tracking-wider text-sm mb-4">PRICE DETAILS</h3>
            <div className="space-y-2 text-sm">
              <Row label={`Subtotal (${items.length} items)`} value={`₹ ${subtotal.toLocaleString("en-IN")}`} />
              <Row label="Shipping" value={shipping === 0 ? "FREE" : `₹ ${shipping}`} success={shipping === 0} />
              <div className="border-t border-border my-3" />
              <Row label="Total" value={`₹ ${total.toLocaleString("en-IN")}`} bold />
            </div>
            <button className="mt-5 w-full h-12 bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90">
              PROCEED TO CHECKOUT
            </button>
            <p className="mt-3 text-xs text-foreground/60 text-center">Apply coupon NEW15 at checkout</p>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Row = ({ label, value, bold, success }: { label: string; value: string; bold?: boolean; success?: boolean }) => (
  <div className={`flex items-center justify-between ${bold ? "font-bold text-base" : ""}`}>
    <span className="text-foreground/70">{label}</span>
    <span className={success ? "text-success font-semibold" : ""}>{value}</span>
  </div>
);

export default Cart;
