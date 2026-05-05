import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product } from "@/lib/products";

export type CartItem = { product: Product; size: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, size: string) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("nnnow_cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("nnnow_cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product, size: string) => {
    setItems((it) => {
      const ex = it.find((i) => i.product.id === product.id && i.size === size);
      if (ex) return it.map((i) => (i === ex ? { ...i, qty: i.qty + 1 } : i));
      return [...it, { product, size, qty: 1 }];
    });
  };
  const remove = (id: string, size: string) =>
    setItems((it) => it.filter((i) => !(i.product.id === id && i.size === size)));
  const setQty = (id: string, size: string, qty: number) =>
    setItems((it) =>
      it.map((i) => (i.product.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const subtotal = useMemo(
    () =>
      items.reduce((s, i) => s + parseFloat(i.product.price.split("-")[0]) * i.qty, 0),
    [items]
  );
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, count, subtotal }}>{children}</Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};
