import type { Color, ColorEntity } from "./color.type";

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
  images: ProductImage[];
  colors: ColorEntity[];
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  colors: Color[];
  sku: string;
}

export interface ProductImage {
  id: number;
  products_id: string;
  directus_files_id: number;
}
