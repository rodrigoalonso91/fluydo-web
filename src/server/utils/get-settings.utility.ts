import { BackofficeService } from "../services";

export async function getSettings(): Promise<Settings> {
  const settings = await BackofficeService.getSettings();
  if (!settings) return emptySettings;

  return {
    businessTitle: settings.business_title,
    businessPresentation: settings.business_presentation,
    aboutUs: settings.about_us,
    businessAddress: settings.business_address,
    businessTimeOpen: settings.business_time_open,
    phone: settings.phone,
    email: settings?.email,
    logoId: settings?.logo,
  };
}

interface Settings {
  businessTitle: string;
  businessPresentation: string;
  aboutUs: string;
  businessAddress: string;
  businessTimeOpen: string;
  phone: string;
  email: string;
  logoId: string;
}

const emptySettings: Settings = {
  businessTitle: "",
  businessPresentation: "",
  aboutUs: "",
  businessAddress: "",
  businessTimeOpen: "",
  phone: "",
  email: "",
  logoId: ""
};
  