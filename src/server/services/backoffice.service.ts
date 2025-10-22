import type { PurchaseConditionEntity, SettingEntity } from "@/types";
import { createDirectus, isDirectusError, readItem, readItems, rest, staticToken, type Query } from "@directus/sdk";
import { getSecret } from "astro:env/server";

const backofficeToken = getSecret("DIRECTUS_ADMIN_APIKEY");
const backofficeUrl = getSecret("DIRECTUS_BO_URL");
const settingsId = getSecret("DIRECTUS_SETTINGS_ID") ?? '';

if (!backofficeToken || !backofficeUrl) {
  throw new Error("DIRECTUS_ADMIN_APIKEY or DIRECTUS_BO_URL is not defined");
}

interface DirectusSchema {
  settings: SettingEntity[];
  purchase_conditions: PurchaseConditionEntity[];
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

  static async getPurchaseConditions(query?: Query<DirectusSchema, PurchaseConditionEntity>) {
    try {
      const purchaseConditions = await client.request(readItems("purchase_conditions", query));
      return purchaseConditions;
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
