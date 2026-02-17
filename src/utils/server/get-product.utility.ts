import type { Product, ProductEntity } from '@/types';
import type { QueryFields } from '@directus/sdk';
import { BackofficeService, type DirectusSchema } from './backoffice.service';
import { normalizeCategory } from './get-categories.utility';

export async function getProduct(id: string): Promise<Product | null> {
	const products = await BackofficeService.getProducts({
		filter: {
			id: {
				_eq: id
			},
			status: {
				_eq: 'published'
			}
		},
		fields: ['*', 'images.*', 'colors.colors_id.*'] as QueryFields<DirectusSchema, ProductEntity>,
		limit: 1
	});

	if (!products || products.length === 0) return null;
	return normalizeProduct(products[0]);
}

export function normalizeProduct(product: ProductEntity): Product {
	return {
		id: product.id,
		name: product.name,
		price: product.price,
		description: product.description,
		sku: product.sku,
		tags: product.tags,
		images: normalizeProductImages(product),
		colors: normalizeProductColors(product),
		categories: normalizeProductCategories(product)
	};
}

export function normalizeProductCategories(product: ProductEntity) {
	if (!product.categories) return [];
	return product.categories.filter(cat => cat.categories_id).map(cat => normalizeCategory(cat.categories_id));
}

export function normalizeProductImages(product: ProductEntity) {
	if (!product.images) return [];
	const images = product.images.slice().map(img => img.directus_files_id) ?? [];
	return images;
}

export function normalizeProductColors(product: ProductEntity) {
	const colors = product.colors
		?.map(color => {
			if (color.colors_id.status !== 'published') return null;
			return {
				id: color.colors_id.id,
				name: color.colors_id.name,
				code: color.colors_id.code
			};
		})
		.filter(color => color !== null);
	return colors ?? [];
}
