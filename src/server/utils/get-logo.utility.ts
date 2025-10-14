import { BackofficeService } from "../services";

export async function getLogo(): Promise<string> {
  const response = await BackofficeService.getSettings({ fields: ['logo'] });
  return response?.logo ?? "";
}