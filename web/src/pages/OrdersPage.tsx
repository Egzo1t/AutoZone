import { useState, useEffect } from "react";
import { fetchOrders } from "../api/orders";
import type { Order } from "@/types/orders";
import { Skeleton } from "../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Unable to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-8 text-center text-red-500">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage your orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold">No orders yet</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your orders will appear here once they are created.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {orders.length} {orders.length === 1 ? "order" : "orders"} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Order
                      </p>
                      <CardTitle className="text-sm font-semibold truncate">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </CardTitle>
                    </div>

                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {order.orderItems.length}{" "}
                      {order.orderItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground pt-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {item.product?.name ?? "Product unavailable"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Qty: {item.quantity} × €{item.unitPrice.toFixed(2)}
                          </p>
                        </div>

                        <p className="font-medium whitespace-nowrap">
                          €{(item.quantity * item.unitPrice).toFixed(2)}
                        </p>
                      </div>
                    ))}

                    {order.orderItems.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No items in this order.
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total amount
                    </span>
                    <span className="text-lg font-bold">
                      €{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
