import type { Settings } from "@/types";
import { BackofficeService } from "../services";

export async function getSettings(): Promise<Settings> {
  const settings = await BackofficeService.getSettings({
    fields: [
      "*",
      "carrousel_products.products_id.*",
      "carrousel_products.products_id.images.directus_files_id.*",
    ] as any
  });
  if (!settings) return emptySettings;

  console.log(settings.carrousel_products);

  return {
    businessTitle: settings.business_title,
    businessPresentation: settings.business_presentation,
    aboutUs: settings.about_us,
    businessAddress: settings.business_address,
    businessTimeOpen: settings.business_time_open,
    phone: settings.phone,
    email: settings?.email,
    logoId: settings?.logo,
    carrouselProducts: [],
  };
}

const emptySettings: Settings = {
  businessTitle: "",
  businessPresentation: "",
  aboutUs: "",
  businessAddress: "",
  businessTimeOpen: "",
  phone: "",
  email: "",
  logoId: "",
  carrouselProducts: []
};
  