import type { Product, ProductEntity } from "@/types";
import { BackofficeService } from "../services";
import { normalizeProduct } from "./get-product.utility";

export async function getProducts(): Promise<Product[]> {
  const products = await BackofficeService.getProducts({
    filter: {
      status: {
        _eq: 'published'
      }
    },
    fields: [
      "*",
      "images.*",
      "colors.colors_id.*",
    ] as any
  });
  if (!products) return [];

  return products.map(product => normalizeProduct(product));
}
