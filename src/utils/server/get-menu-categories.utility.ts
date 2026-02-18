import type { CategoryEntity, CategoryNode, MenuGroup } from '@/types';
import type { QueryFields } from '@directus/sdk';
import { BackofficeService, type DirectusSchema } from './backoffice.service';

export async function getMenuCategories(): Promise<MenuGroup[]> {
	const categories = await BackofficeService.getCategories({
		filter: {
			status: { _eq: 'published' },
			menu_group: { _nnull: true },
			parent: { _null: true }
		},
		fields: ['*', 'children.*'] as QueryFields<DirectusSchema, CategoryEntity>,
		sort: ['sort']
	});

	if (!categories) return [];

	const groupsMap = new Map<string, CategoryNode[]>();

	for (const category of categories) {
		const group = category.menu_group!;
		if (!groupsMap.has(group)) {
			groupsMap.set(group, []);
		}
		groupsMap.get(group)!.push(normalizeCategoryNode(category));
	}

	return Array.from(groupsMap.entries()).map(([name, cats]) => ({
		name,
		categories: cats
	}));
}

function normalizeCategoryNode(category: CategoryEntity): CategoryNode {
	const node: CategoryNode = {
		id: category.id,
		label: category.menu_label || category.name,
		slug: category.slug
	};

	const publishedChildren = category.children?.filter(c => c.status === 'published');
	if (publishedChildren && publishedChildren.length > 0) {
		node.children = publishedChildren
			.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
			.map(child => normalizeCategoryNode(child));
	}

	return node;
}
