import type { ProductEntity } from "./product.type";

export interface SettingsProductJunctionEntity {
  id: string;
  products_id: ProductEntity;
  settings_id: string;
}