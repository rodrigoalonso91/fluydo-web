import { createDirectus, isDirectusError, readItem, rest, staticToken, type Query } from "@directus/sdk";
import { getSecret } from "astro:env/server";

const backofficeToken = getSecret("DIRECTUS_ADMIN_APIKEY");
const backofficeUrl = getSecret("DIRECTUS_BO_URL");
const settingsId = getSecret("DIRECTUS_SETTINGS_ID") ?? '';

if (!backofficeToken || !backofficeUrl) {
  throw new Error("DIRECTUS_ADMIN_APIKEY or DIRECTUS_BO_URL is not defined");
}

interface DirectusSchema {
  settings: SettingEntity[]
}

interface SettingEntity {
  id: string;
  business_title: string;
  business_presentation: string;
  about_us: string;
  user_updated: string;
  date_updated: string;
  business_address: string;
  business_time_open: string;
  phone: string;
  email: string;
  logo: string;
}

const client = createDirectus<DirectusSchema>(backofficeUrl).with(rest()).with(staticToken(backofficeToken));

export class BackofficeService {
  static async getSettings(query?: Query<DirectusSchema, SettingEntity>) {
    try {
      const settings = await client.request(readItem("settings", settingsId, query));
      return settings;
    }
    catch (error) {
      if (isDirectusError(error)) {
        console.error(error.message);
      }
      else {
        console.error(error);
      }
    }
  }
}
