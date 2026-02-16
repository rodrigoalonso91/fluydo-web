import type { Category } from "./categories.type";
import type { Color, ColorEntity } from "./color.type";
import type { ProductsCategoriesJunctionEntity } from "./products-categories-junction.type";

export interface ProductEntity {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  name: string;
  price: number;
  description: string;
  images: Record<string, any>[] | null;
  colors: Array<{ colors_id: ColorEntity }> | null;
  sku: string;
  tags: string[];
  categories: ProductsCategoriesJunctionEntity[] | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: Color[];
  sku: string;
  tags: string[];
  categories: Category[];
}
