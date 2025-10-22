import { BackofficeService } from "../services";
import { getSecret } from "astro:env/server";

export async function getLogo(): Promise<string> {
  const response = await BackofficeService.getSettings({ fields: ['logo'] });
  const backofficeUrl = getSecret("DIRECTUS_BO_URL");
  
  if (!response?.logo || !backofficeUrl) {
    return "";
  }
  
  return `${backofficeUrl}/assets/${response.logo}`;
}