import type { Product } from "@/types/products";

const BASE_URL = "http://localhost:3000";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return (await res.json()) as Product[];
}