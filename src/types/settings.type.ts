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
}