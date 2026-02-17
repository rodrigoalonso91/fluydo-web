import type { SettingEntity, Settings } from '@/types';
import type { QueryFields } from '@directus/sdk';
import { normalizeProduct } from './get-product.utility';
import { BackofficeService, type DirectusSchema } from './backoffice.service';

export async function getSettings(): Promise<Settings> {
	const settings = await BackofficeService.getSettings({
		fields: [
			'*',
			'carrousel_products.products_id.colors.colors_id.*',
			'carrousel_products.products_id.*',
			'carrousel_products.products_id.images.*'
		] as QueryFields<DirectusSchema, SettingEntity>
	});
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
		carrouselProducts: settings.carrousel_products?.flatMap(product => normalizeProduct(product.products_id)) ?? []
	};
}

const emptySettings: Settings = {
	businessTitle: '',
	businessPresentation: '',
	aboutUs: '',
	businessAddress: '',
	businessTimeOpen: '',
	phone: '',
	email: '',
	logoId: '',
	carrouselProducts: []
};
