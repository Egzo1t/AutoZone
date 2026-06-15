import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/order.controller.js";

const controller = new OrderController();

export async function orderRoutes(app: FastifyInstance) {
  app.post("/orders", controller.create.bind(controller));
}