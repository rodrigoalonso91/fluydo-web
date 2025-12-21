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

export function toProducts(products: ProductEntity[]) {
  return products.map(product => {

    const colors = product.colors?.map(color => {
      if (color.colors_id.status !== 'published') return null;
      return {
        id: color.colors_id.id,
        name: color.colors_id.name,
        code: color.colors_id.code
      }
    }).filter(color => color !== null)

    return {
      ...product,
      colors: colors || []
    }
  });
}