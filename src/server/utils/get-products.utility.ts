import type { Product } from "@/types";
import { BackofficeService } from "../services";

export async function getProducts(): Promise<Product[]> {
  const products = await BackofficeService.getProducts({
    filter: {
      status: {
        _eq: 'published'
      }
    },
    fields: [
      "id",
      "name",
      "price",
      "description",
      "images",
      "sku",
      "images.*",
      "colors.*"
    ] as any
  });
  if (!products) return [];

  const productsWithColors = products.map(product => {
    return {
      ...product,
      colors: product.colors?.map(color => ({
        id: color.id,
        name: color.name,
        code: color.code
      })) || []
    }
  });
  return productsWithColors;
}


  