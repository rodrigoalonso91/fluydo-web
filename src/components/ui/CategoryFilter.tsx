'use client';
import { Category } from '@/types';
import { Each } from 'syntax-sugar';

interface Props {
	categories: Category[];
	onSelectCategory?: (category: Category) => void;
}

export function CategoryFilter({ categories, onSelectCategory }: Props) {
	return (
		<div id="category-filter" className="space-y-4">
			<h3 className="text-lg font-semibold text-white-800 border-b border-gray-200 pb-2">Categorías</h3>
			<div className="flex flex-wrap gap-2">
				<Each
					of={categories}
					setAsKey={c => c.id}
					renderAs={category => (
						<button
							type="button"
							data-category-id={category.id}
							onClick={() => onSelectCategory?.(category)}
							className="category-filter-button px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{category.name}
						</button>
					)}
				/>
			</div>
		</div>
	);
}
