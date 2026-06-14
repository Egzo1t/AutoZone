import { db } from '../db/index.js';
import { products } from '../db/schema/products.js';
import { eq } from 'drizzle-orm';

export class ProductRepository {
    async create(data: typeof products.$inferInsert) {
        return await db.insert(products).values(data).returning();
    }

    async findAll() {
        return await db.select().from(products);
    }

    async findById(id: string) {
        return await db.select().from(products).where(eq(products.id, id));
    }

    async update(id: string, data: Partial<typeof products.$inferInsert>) {
        const [updatedProduct] = await db.update(products).set(data).where(eq(products.id, id)).returning();
        return updatedProduct;
    }

    async delete(id: string) {
        await db.delete(products).where(eq(products.id, id)).returning();
    }
}