import { useEffect, useState } from "react";
import type { Product } from "@/types/products";
import { fetchProducts } from "../api/products";
import { createOrder } from "../api/orders";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

type CartItem = {
  product: Product;
  quantity: number;
};

export default function CreateOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    load();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const submitOrder = async () => {
  setSubmitting(true);

  try {
    const response = await createOrder({
      items: cart.map((c) => ({
        productId: c.product.id,
        quantity: c.quantity,
      })),
    });

    navigate("/orders/confirmation", {
      state: {
        total,
        order: response,
      },
    });

    setCart([]);
  } catch {
    alert("Order failed!");
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <div className="space-y-3">
          {products.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span>{p.name}</span>
                    <span className="text-sm text-gray-500">
                      Price: €{p.price}
                    </span>
                  </div>

                  <Button
                    onClick={() => addToCart(p)}
                    disabled={p.stockQuantity === 0}
                  >
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        <div className="space-y-3">
          {cart.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="flex justify-between items-center">
                <span>{item.product.name}</span>

                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product.id, Number(e.target.value))
                  }
                  className="w-20"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-bold">Total: €{total.toFixed(2)}</p>

          <Button
            className="mt-2 w-full"
            onClick={submitOrder}
            disabled={cart.length === 0 || submitting}
          >
            {submitting ? "Creating..." : "Create Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
