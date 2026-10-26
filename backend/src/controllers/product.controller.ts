import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service.js';
import { products } from '../db/schema/products.js';
import { HttpError } from '../utils/httpError.js';

const service = new ProductService();

type CreateProductBody = typeof products.$inferInsert;
type UpdateProductBody = Partial<CreateProductBody>;

type IdParam = {
  id: string;
};

type CategoryQuery = {
  category: string;
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
      throw new HttpError('Product not found', 404);
    }

    return reply.send(product);
  }

  async update(
    req: FastifyRequest<{ Params: IdParam; Body: UpdateProductBody }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;

    const product = await service.updateProduct(id, req.body);

    if (!product) {
      throw new HttpError('Product not found', 404);
    }

    return reply.send(product);
  }

  async delete(req: FastifyRequest<{ Params: IdParam }>, reply: FastifyReply) {
    const { id } = req.params;

    const product = await service.getProductById(id);

    if (!product) {
      throw new HttpError('Product not found', 404);
    }

    await service.deleteProduct(id);

    return reply.code(204).send();
  }

  async filterByCategory(req: FastifyRequest<{ Querystring: CategoryQuery }>, reply: FastifyReply) {
    const { category } = req.query;

    const products = await service.filterProductsByCategory(category);

    if (products.length === 0) {
      throw new HttpError('No products found for this category', 404);
    }

    return reply.send(products);
  }
}
