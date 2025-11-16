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
  return products;
}


  