import type {
	CategoryEntity,
	ColorEntity,
	ProductEntity,
	ProductsCategoriesJunctionEntity,
	PurchaseConditionEntity,
	SettingEntity,
	SettingsProductJunctionEntity
} from '@/types';
import { createDirectus, isDirectusError, readItem, readItems, rest, staticToken, type Query } from '@directus/sdk';

const backofficeToken = process.env.DIRECTUS_ADMIN_APIKEY;
const backofficeUrl = process.env.DIRECTUS_BO_URL;
const settingsId = process.env.DIRECTUS_SETTINGS_ID ?? '';

if (!backofficeToken || !backofficeUrl) {
	throw new Error('DIRECTUS_ADMIN_APIKEY or DIRECTUS_BO_URL is not defined');
}

export interface DirectusSchema {
	settings: SettingEntity[];
	settings_products: SettingsProductJunctionEntity[];
	purchase_conditions: PurchaseConditionEntity[];
	products: ProductEntity[];
	categories: CategoryEntity[];
	products_categories: ProductsCategoriesJunctionEntity[];
	colors: ColorEntity[];
}

const client = createDirectus<DirectusSchema>(backofficeUrl).with(rest()).with(staticToken(backofficeToken));

export class BackofficeService {
	static async getSettings(query?: Query<DirectusSchema, SettingEntity>) {
		try {
			const settings = await client.request(readItem('settings', settingsId, query));
			return settings;
		} catch (error) {
			if (isDirectusError(error)) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}
	}

	static async getPurchaseConditions(query?: Query<DirectusSchema, PurchaseConditionEntity>) {
		try {
			const purchaseConditions = await client.request(readItems('purchase_conditions', query));
			return purchaseConditions;
		} catch (error) {
			if (isDirectusError(error)) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}
	}

	static async getProducts(query?: Query<DirectusSchema, ProductEntity>) {
		try {
			const products = await client.request(readItems('products', query));
			return products;
		} catch (error) {
			if (isDirectusError(error)) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}
	}

	static async getCategories(query?: Query<DirectusSchema, CategoryEntity>) {
		try {
			const categories = await client.request(readItems('categories', query));
			return categories;
		} catch (error) {
			if (isDirectusError(error)) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}
	}
}
