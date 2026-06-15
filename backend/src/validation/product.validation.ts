import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  stockQuantity: z.number().int().nonnegative({ message: 'Stock must be a non-negative integer' }),
  category: z.string().min(1, { message: 'Category is required' }),
});

export const updateProductSchema = createProductSchema.partial();