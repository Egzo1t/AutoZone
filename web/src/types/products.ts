export type ProductCategory =
  | "all"
  | "cleaning"
  | "exterior_parts"
  | "interior_accessories"
  | "lighting"
  | "performance_parts"
  | "car_accessories_general";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stockQuantity: number;
  category: ProductCategory;
}
