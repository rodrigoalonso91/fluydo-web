import type { CategoryEntity } from "./categories.type";

export interface ProductsCategoriesJunctionEntity {
  id: string;
  products_id: string;
  categories_id: CategoryEntity;
}