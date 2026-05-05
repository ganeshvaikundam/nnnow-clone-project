import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/lib/products";
import { useState } from "react";

export const ProductCard = ({ product }: { product: Product }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={`/p/${product.id}`}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={hover ? product.image2 : product.image}
          alt={`${product.brand} ${product.title}`}
          loading="lazy"
          className="product-card-img group-hover:scale-[1.02] transition-transform duration-500"
        />
        {product.off && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {product.off}% OFF
          </span>
        )}
        <button
          aria-label="Wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 w-8 h-8 grid place-items-center bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="pt-3 px-1 pb-1">
        <p className="text-[13px] font-bold uppercase tracking-wide truncate">{product.brand}</p>
        <p className="text-[13px] text-foreground/70 truncate">{product.title}</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.was && (
            <span className="text-xs text-foreground/40 line-through">{formatPrice(product.was)}</span>
          )}
          {product.off && (
            <span className="text-xs text-success font-semibold">({product.off}% Off)</span>
          )}
        </div>
      </div>
    </Link>
  );
};
