import { OrderRepository } from "../repositories/order.repository.js";

const repo = new OrderRepository();

export type CreateOrderInput = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export class OrderService {
  async createOrder(data: CreateOrderInput) {
    if (!data.items || data.items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    return repo.createOrder(data.items);
  }
}