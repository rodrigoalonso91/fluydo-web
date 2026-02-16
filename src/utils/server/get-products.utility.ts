import { Product } from '@/types';
import { BackofficeService } from './backoffice.service';
import { normalizeProduct } from './get-product.utility';

export async function getProducts(): Promise<Product[]> {
	const products = await BackofficeService.getProducts({
		filter: {
			status: {
				_eq: 'published'
			}
		},
		fields: ['*', 'images.*', 'colors.colors_id.*', 'categories.*', 'categories.categories_id.*'] as any
	});
	if (!products) return [];

	return products.map(product => normalizeProduct(product));
}
