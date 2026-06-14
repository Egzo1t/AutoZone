import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service.js';
import { products } from '../db/schema/products.js';

const service = new ProductService();

type CreateProductBody = typeof products.$inferInsert;
type UpdateProductBody = Partial<CreateProductBody>;

type IdParam = {
  id: string;
};

export class ProductController {
  async create(req: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) {
    const product = await service.createProduct(req.body);
    return reply.code(201).send(product);
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const products = await service.getAllProducts();
    return reply.send(products);
  }

  async getById(req: FastifyRequest<{ Params: IdParam }>, reply: FastifyReply) {
    const { id } = req.params;

    const product = await service.getProductById(id);

    if (!product) {
      return reply.code(404).send({ message: 'Product not found' });
    }

    return reply.send(product);
  }

  async update(
    req: FastifyRequest<{ Params: IdParam; Body: UpdateProductBody }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;

    const product = await service.updateProduct(id, req.body);

    return reply.send(product);
  }

  async delete(req: FastifyRequest<{ Params: IdParam }>, reply: FastifyReply) {
    const { id } = req.params;

    await service.deleteProduct(id);

    return reply.code(204).send();
  }
}
