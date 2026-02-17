import type { Category, CategoryEntity } from '@/types';
import type { QueryFields } from '@directus/sdk';
import { BackofficeService, type DirectusSchema } from './backoffice.service';

export async function getCategories(): Promise<Category[]> {
	const categories = await BackofficeService.getCategories({
		filter: {
			status: {
				_eq: 'published'
			}
		},
		fields: ['*', 'parent.*', 'children.*'] as QueryFields<DirectusSchema, CategoryEntity>
	});
	if (!categories) return [];

	return categories.map(category => normalizeCategory(category));
}

export function normalizeCategory(category: CategoryEntity): Category {
	return {
		id: category.id,
		name: category.name,
		slug: category.slug,
		badgeText: category.badge_text,
		menuLabel: category.menu_label,
		menuGroup: category.menu_group,
		parent: category.parent
	};
}
