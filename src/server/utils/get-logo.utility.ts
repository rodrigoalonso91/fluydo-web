import { BackofficeService } from "../services";

export async function getLogo(): Promise<string> {
  const response = await BackofficeService.getSettings({ fields: ['logo'] });
  
  if (!response?.logo) {
    return "";
  }
  
  // Use local proxy to avoid mixed-content issues (HTTPS site loading HTTP images)
  return `/api/image/${response.logo}`;
}