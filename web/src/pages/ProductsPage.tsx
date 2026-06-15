import { useEffect, useState } from "react";
import type { Product } from "@/types/products";
import { fetchProducts } from "../api/products";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  const categories = [
    "all",
    "cleaning",
    "exterior_parts",
    "interior_accessories",
    "lighting",
    "performance_parts",
    "car_accessories_general",
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredProducts = products.filter((product) =>
    selectedCategory === "all" ? true : product.category === selectedCategory,
  );

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <Button onClick={() => navigate("/orders/new")}>Create Order</Button>
      </div>
      <div className="mb-6">
        <select
          className="border rounded-md p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{product.name}</span>
                <Badge variant="secondary">{product.category}</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>

              <div className="flex justify-between">
                <span className="font-medium">
                  €{Number(product.price).toFixed(2)}
                </span>

                <span
                  className={`text-sm ${
                    product.stockQuantity > 10
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  Stock: {product.stockQuantity}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
