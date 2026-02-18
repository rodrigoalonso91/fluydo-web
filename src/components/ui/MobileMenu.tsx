'use client';

import { Button } from '@/components/ui/button';
import type { CategoryNode, MenuGroup } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { Each, If, Then } from 'syntax-sugar';

interface MobileMenuProps {
	menuGroups: MenuGroup[];
}

export function MobileMenu({ menuGroups }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

	const toggleGroup = (name: string) => {
		setExpandedGroup(prev => (prev === name ? null : name));
		setExpandedCategory(null);
	};

	const toggleCategory = (id: string) => {
		setExpandedCategory(prev => (prev === id ? null : id));
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Menu"
				aria-expanded={isOpen}
				variant="ghost"
				size="icon"
				className="md:hidden"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<If condition={isOpen}>
						<Then>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</Then>
					</If>
					<If condition={!isOpen}>
						<Then>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</Then>
					</If>
				</svg>
			</Button>
			<If condition={isOpen}>
				<Then>
					<nav className="md:hidden px-4 pb-4 space-y-1">
						<Each
							of={menuGroups}
							setAsKey={group => group.name}
							renderAs={group => (
								<div>
									<Button
										onClick={() => toggleGroup(group.name)}
										variant="ghost"
										className="w-full flex justify-between items-center text-primary font-medium hover:text-amber-500"
										aria-expanded={expandedGroup === group.name}
									>
										<span>{group.name}</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={`h-4 w-4 transition-transform duration-200 ${expandedGroup === group.name ? 'rotate-180' : ''}`}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
										</svg>
									</Button>
									<If condition={expandedGroup === group.name}>
										<Then>
											<div className="ml-4 space-y-0.5">
												<Each
													of={group.categories}
													setAsKey={cat => cat.id}
													renderAs={cat => (
														<MobileCategoryItem
															category={cat}
															expandedCategory={expandedCategory}
															onToggle={toggleCategory}
															onNavigate={() => setIsOpen(false)}
														/>
													)}
												/>
											</div>
										</Then>
									</If>
								</div>
							)}
						/>
						<Link
							href="/#quienes-somos"
							onClick={() => setIsOpen(false)}
							className="block px-3 py-2 text-primary hover:text-amber-500 font-medium transition-colors duration-200"
						>
							QUIENES SOMOS
						</Link>
					</nav>
				</Then>
			</If>
		</>
	);
}

function MobileCategoryItem({
	category,
	expandedCategory,
	onToggle,
	onNavigate
}: {
	category: CategoryNode;
	expandedCategory: string | null;
	onToggle: (id: string) => void;
	onNavigate: () => void;
}) {
	const hasChildren = category.children && category.children.length > 0;

	return (
		<div>
			<div className="flex items-center">
				<Link
					href={`/catalogo?categoria=${category.slug}`}
					onClick={onNavigate}
					className="flex-1 px-3 py-1.5 text-sm text-gray-700 hover:text-amber-500 transition-colors duration-200"
				>
					{category.label}
				</Link>
				<If condition={!!hasChildren}>
					<Then>
						<Button
							onClick={() => onToggle(category.id)}
							variant="ghost"
							size="icon-xs"
							aria-expanded={expandedCategory === category.id}
							aria-label={`Expandir ${category.label}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`h-3 w-3 transition-transform duration-200 ${expandedCategory === category.id ? 'rotate-180' : ''}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
							</svg>
						</Button>
					</Then>
				</If>
			</div>
			<If condition={!!hasChildren && expandedCategory === category.id}>
				<Then>
					<div className="ml-4 space-y-0.5">
						<Each
							of={category.children ?? []}
							setAsKey={child => child.id}
							renderAs={child => (
								<Link
									href={`/catalogo?categoria=${child.slug}`}
									onClick={onNavigate}
									className="block px-3 py-1 text-xs text-gray-500 hover:text-amber-500 transition-colors duration-200"
								>
									{child.label}
								</Link>
							)}
						/>
					</div>
				</Then>
			</If>
		</div>
	);
}
