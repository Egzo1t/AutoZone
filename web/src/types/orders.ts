export interface Order {
  id: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
    id: string;
    quantity: number;
    unitPrice: number;
    product: {
      id: string;
      name: string;
      sku: string,
      category: string;
    } | null;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemInput[];
}
