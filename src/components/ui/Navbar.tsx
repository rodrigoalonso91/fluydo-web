import { getMenuCategories } from '@/utils/server';
import Link from 'next/link';
import { Logo } from '../server-component/Logo';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

export async function Navbar() {
	const menuGroups = await getMenuCategories();

	return (
		<header className="bg-primary shadow-sm">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center text-primary">
				<nav>
					<Link href="/" className="text-2xl font-bold flex items-center gap-0.5">
						<Logo />
					</Link>
				</nav>
				<DesktopMenu menuGroups={menuGroups} />
				<MobileMenu menuGroups={menuGroups} />
			</div>
		</header>
	);
}
