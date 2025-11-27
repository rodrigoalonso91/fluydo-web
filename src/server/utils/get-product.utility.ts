import type { Product } from "@/types";
import { BackofficeService } from "../services";

export async function getProduct(id: string): Promise<Product | null> {
  const products = await BackofficeService.getProducts({
    filter: {
      id: {
        _eq: id
      },
      status: {
        _eq: "published"
      }
    },
    fields: [
      "*",
      "images.*",
      "colors.colors_id.*",
    ] as any,
    limit: 1
  });

  if (!products || products.length === 0) return null;

  const product = products[0];

  const colors = product.colors
    ?.map((color) => {
      if (color.colors_id.status !== "published") return null;

      return {
        id: color.colors_id.id,
        name: color.colors_id.name,
        code: color.colors_id.code
      };
    })
    .filter((color) => color !== null);

  return {
    ...product,
    colors: colors || []
  };
}
