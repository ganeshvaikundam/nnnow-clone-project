import data from "@/data/products.json";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  image: string;
  image2: string;
  was: string | null;
  price: string;
  off: string | null;
  category: "men" | "women" | "footwear";
};

export const products = data as Product[];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const byCategory = (cat: string) =>
  cat === "all" ? products : products.filter((p) => p.category === cat);

export const formatPrice = (v: string | null) => {
  if (!v) return "";
  const n = parseFloat(v.split("-")[0]);
  return `₹ ${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};
