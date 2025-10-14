import type { BuyCondition } from "@/types";
import { BackofficeService } from "../services";

export async function getBuyConditions(): Promise<BuyCondition[]> {
  const response = await BackofficeService.getBuyConditions({
    filter: {
      status: {
        _eq: "published"
      }
    },
    sort: ["sort"],
    fields: ["id", "title", "description"]
  });
  return response ?? [];
}