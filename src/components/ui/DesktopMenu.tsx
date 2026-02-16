import Link from 'next/link';
import { Each } from 'syntax-sugar';
import { Logo } from '../server-component/Logo';

const links = [
	{ href: '/catalogo', label: 'CATALOGO' },
	{ href: '/#quienes-somos', label: 'QUIENES SOMOS' }
];

export function DesktopMenu() {
	return (
		<div className="container mx-auto px-4 py-2 flex justify-between items-center text-primary">
			<nav>
				<Link href="/" className="text-2xl font-bold flex items-center gap-0.5">
					<Logo />
				</Link>
			</nav>
			<nav className="hidden md:flex space-x-6 text-secondary">
				<Each
					of={links}
					setAsKey={link => link.label}
					renderAs={link => (
						<Link
							href={link.href}
							className="hover:text-amber-500 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
						>
							{link.label}
						</Link>
					)}
				/>
			</nav>
			<button className="md:hidden " aria-label="Menu">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	);
}
