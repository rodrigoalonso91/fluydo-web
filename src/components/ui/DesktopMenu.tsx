'use client';

import type { CategoryNode, MenuGroup } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { Each, If, RenderIf, Then } from 'syntax-sugar';

interface DesktopMenuProps {
	menuGroups: MenuGroup[];
}

export function DesktopMenu({ menuGroups }: DesktopMenuProps) {
	const [megaMenuOpen, setMegaMenuOpen] = useState(false);
	const hasMenuGroups = menuGroups.length > 0;

	const handleMouseLeave = () => {
		setMegaMenuOpen(false);
	};

	const handleMouseEnter = () => {
		if (!hasMenuGroups) return;
		setMegaMenuOpen(true);
	};

	return (
		<nav className="hidden md:flex space-x-6 text-secondary">
			<div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<Link
					href="/catalogo"
					className="hover:text-amber-500 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
					aria-haspopup={hasMenuGroups ? 'true' : undefined}
					aria-expanded={hasMenuGroups ? megaMenuOpen : undefined}
				>
					Catálogo
				</Link>
				<RenderIf condition={megaMenuOpen && hasMenuGroups}>
					<div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-6 px-8 z-50 min-w-[500px]">
						<div className="flex gap-10">
							<Each
								of={menuGroups}
								setAsKey={group => group.name}
								renderAs={group => (
									<div>
										<h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">{group.name}</h3>
										<ul className="space-y-1">
											<Each
												of={group.categories}
												setAsKey={cat => cat.id}
												renderAs={cat => <CategoryMenuItem category={cat} />}
											/>
										</ul>
									</div>
								)}
							/>
						</div>
					</div>
				</RenderIf>
				<Link
					href="/#quienes-somos"
					className="hover:text-amber-500 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
				>
					Sobre nosotros
				</Link>
			</div>
		</nav>
	);
}

function CategoryMenuItem({ category }: { category: CategoryNode }) {
	return (
		<li>
			<Link
				href={`/catalogo?categoria=${category.slug}`}
				className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-200 block py-0.5"
			>
				{category.label}
			</Link>
			<If condition={!!category.children && category.children.length > 0}>
				<Then>
					<ul className="ml-3 space-y-0.5">
						<Each
							of={category.children ?? []}
							setAsKey={child => child.id}
							renderAs={child => (
								<li>
									<Link
										href={`/catalogo?categoria=${child.slug}`}
										className="text-gray-400 hover:text-amber-500 text-xs transition-colors duration-200 block py-0.5"
									>
										{child.label}
									</Link>
								</li>
							)}
						/>
					</ul>
				</Then>
			</If>
		</li>
	);
}
