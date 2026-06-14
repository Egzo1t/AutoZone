import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product.controller.js";

const controller = new ProductController();

export async function productRoutes(app: FastifyInstance) {
  app.post("/products", controller.create.bind(controller));
  app.get("/products", controller.getAll.bind(controller));
  app.get("/products/:id", controller.getById.bind(controller));
  app.put("/products/:id", controller.update.bind(controller));
  app.delete("/products/:id", controller.delete.bind(controller));
}