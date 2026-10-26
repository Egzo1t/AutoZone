import { db } from '../db/index.js';
import { orders } from '../db/schema/orders.js';
import { orderItems } from '../db/schema/orderItems.js';
import { products } from '../db/schema/products.js';
import { eq, inArray } from 'drizzle-orm';

export class OrderRepository {
  async createOrder(items: { productId: string; quantity: number }[]) {
    return await db.transaction(async (tx) => {
      const productIds = items.map((i) => i.productId);

      const dbProducts = await tx
        .select()
        .from(products)
        .where(inArray(products.id, productIds))
        .for('update');

      let total = 0;

      for (const item of items) {
        const product = dbProducts.find((p) => p.id === item.productId);

        if (!product) {
          throw new Error('Product not found');
        }

        if (product.stockQuantity < item.quantity) {
          throw new Error('Insufficient stock');
        }

        total += Number(product.price) * item.quantity;
      }

      const [order] = await tx.insert(orders).values({ totalAmount: total.toString() }).returning();

      for (const item of items) {
        const product = dbProducts.find((p) => p.id === item.productId)!;

        await tx.insert(orderItems).values({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });

        await tx
          .update(products)
          .set({
            stockQuantity: product.stockQuantity - item.quantity,
          })
          .where(eq(products.id, product.id));
      }

      return order;
    });
  }

  async getAllOrders() {
    const ordersWithItems = await db
      .select({
        orderId: orders.id,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,

        orderItemId: orderItems.id,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,

        productId: products.id,
        productName: products.name,
        productSku: products.sku,
        productCategory: products.category,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id));

    const ordersMap = new Map();

    for (const row of ordersWithItems) {
      if (!ordersMap.has(row.orderId)) {
        ordersMap.set(row.orderId, {
          id: row.orderId,
          totalAmount: Number(row.totalAmount),
          createdAt: row.createdAt,
          orderItems: [],
        });
      }

      if (row.orderItemId) {
        ordersMap.get(row.orderId).orderItems.push({
          id: row.orderItemId,
          quantity: row.quantity,
          unitPrice: Number(row.unitPrice),
          product: row.productId
            ? {
                id: row.productId,
                name: row.productName,
                sku: row.productSku,
                category: row.productCategory,
              }
            : null,
        });
      }
    }
    return Array.from(ordersMap.values());
  }
}
