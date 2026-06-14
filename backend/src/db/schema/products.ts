import { pgTable, uuid, varchar, integer, numeric } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    sku: varchar('sku', { length: 100 }).notNull().unique(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    stockQuantity: integer('stock_quantity').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
})