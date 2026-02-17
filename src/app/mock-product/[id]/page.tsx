import Link from 'next/link';
import MockProductClient from './MockProductClient';

export default function MockProductPage() {
	return (
		<section className="min-h-screen bg-white">
			<div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
				<nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
					<Link href="/" className="transition hover:text-gray-700">
						Inicio
					</Link>
					<span>/</span>
					<Link href="/catalogo" className="transition hover:text-gray-700">
						Catálogo
					</Link>
					<span>/</span>
					<span className="font-medium text-gray-700">Musculosa Francia</span>
				</nav>

				<MockProductClient />
			</div>
		</section>
	);
}
