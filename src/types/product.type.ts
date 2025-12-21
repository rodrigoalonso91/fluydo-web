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
  images: Record<string, any>[];
  colors: Array<{ colors_id: ColorEntity }>;
  sku: string;
  tags: string[];
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
}
