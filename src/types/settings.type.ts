import type { Product } from "./product.type";
import type { SettingsProductJunctionEntity } from "./settings-product-junction.type";

export interface SettingEntity {
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
  carrousel_products: SettingsProductJunctionEntity[];
}

export interface Settings {
  businessTitle: string;
  businessPresentation: string;
  aboutUs: string;
  businessAddress: string;
  businessTimeOpen: string;
  phone: string;
  email: string;
  logoId: string;
  carrouselProducts: Product[];
}