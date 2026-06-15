import { FastifyRequest, FastifyReply } from "fastify";
import { OrderService } from "../services/order.service.js";

const service = new OrderService();

export class OrderController {
  async create(
    req: FastifyRequest<{ Body: { items: { productId: string; quantity: number }[] } }>,
    reply: FastifyReply
  ) {
    const order = await service.createOrder(req.body);
    return reply.code(201).send(order);
  }
}