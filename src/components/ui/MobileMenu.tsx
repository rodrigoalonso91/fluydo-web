import Link from 'next/link';

export function MobileMenu() {
	return (
		<div className="md:hidden">
			<nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
				<Link
					href="/#quienes-somos"
					className="block px-3 py-2 text-primary hover:text-amber-500 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
				>
					QUIENES SOMOS
				</Link>
			</nav>
		</div>
	);
}
