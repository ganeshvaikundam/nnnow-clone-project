import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getProduct, formatPrice, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const Product = () => {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { add } = useCart();
  const nav = useNavigate();
  const [size, setSize] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container py-20 text-center">Product not found.</div>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.image2, product.image, product.image2];
  const handleAdd = () => {
    if (!size) return toast.error("Please select a size");
    add(product, size);
    toast.success("Added to bag");
  };
  const handleBuy = () => {
    if (!size) return toast.error("Please select a size");
    add(product, size);
    nav("/cart");
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-3 text-xs text-foreground/60">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to={`/c/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link> /{" "}
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 pb-10">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[3/4] border ${activeImg === i ? "border-primary" : "border-border"} bg-muted`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="aspect-[3/4] bg-muted overflow-hidden">
            <img src={images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xs font-bold tracking-widest text-foreground/60 uppercase">{product.brand}</h2>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.title}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.was && <span className="text-base text-foreground/40 line-through">{formatPrice(product.was)}</span>}
            {product.off && <span className="text-success font-semibold">({product.off}% Off)</span>}
          </div>
          <p className="text-xs text-foreground/60 mt-1">Inclusive of all taxes</p>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold tracking-wider">SELECT SIZE</span>
              <button className="text-xs text-primary font-semibold">SIZE GUIDE</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 grid place-items-center text-sm font-semibold border rounded-full transition-colors ${
                    size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 h-12 bg-foreground text-background font-bold tracking-wider hover:bg-foreground/90"
            >
              ADD TO BAG
            </button>
            <button
              onClick={handleBuy}
              className="flex-1 h-12 bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90"
            >
              BUY NOW
            </button>
            <button className="w-12 h-12 border border-border grid place-items-center hover:border-foreground" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="border border-border p-3">
              <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
              Free Delivery
            </div>
            <div className="border border-border p-3">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary" />
              30 Days Return
            </div>
            <div className="border border-border p-3">
              <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
              100% Authentic
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 space-y-4">
            <details open className="border-b border-border pb-3">
              <summary className="font-bold cursor-pointer text-sm tracking-wider">PRODUCT DETAILS</summary>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                {product.brand} brings you this {product.title.toLowerCase()} — crafted with premium fabric for everyday comfort. Pair with denim or chinos for an effortless look.
              </p>
            </details>
            <details className="border-b border-border pb-3">
              <summary className="font-bold cursor-pointer text-sm tracking-wider">DELIVERY & RETURNS</summary>
              <p className="text-sm text-foreground/70 mt-3">Free delivery on orders above ₹999. Easy 30-day returns.</p>
            </details>
          </div>
        </div>
      </div>

      <section className="container mt-8">
        <h2 className="text-xl font-bold mb-5">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
