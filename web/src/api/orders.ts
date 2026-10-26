import type { Order, CreateOrderRequest } from "@/types/orders";

const BASE_URL = "http://localhost:3000";

export async function createOrder(payload: CreateOrderRequest) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  const result = await fetch(`${BASE_URL}/orders`);

  if (!result.ok) {
    throw new Error("Failed to fetch orders");
  }

  return (await result.json()) as Order[];
}