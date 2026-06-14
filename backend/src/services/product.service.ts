import { ProductRepository } from '../repositories/product.repository.js';
import { products } from '../db/schema/products.js';

const productRepository = new ProductRepository();

type CreateProductInput = typeof products.$inferInsert;

type updateProductInput = Partial<CreateProductInput>;

export class ProductService {
  async createProduct(data: CreateProductInput) {
    return await productRepository.create(data);
  }

  async getAllProducts() {
    return await productRepository.findAll();
  }

  async getProductById(id: string) {
    return await productRepository.findById(id);
  }

  async updateProduct(id: string, data: updateProductInput) {
    return await productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    await productRepository.delete(id);
  }
}
