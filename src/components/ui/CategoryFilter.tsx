'use client';
import { Button } from '@/components/ui/button';
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
						<Button
							type="button"
							variant="secondary"
							size="sm"
							data-category-id={category.id}
							onClick={() => onSelectCategory?.(category)}
							className="category-filter-button rounded-full"
						>
							{category.name}
						</Button>
					)}
				/>
			</div>
		</div>
	);
}
