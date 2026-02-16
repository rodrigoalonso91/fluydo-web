import Link from 'next/link';

export default function NotFound() {
	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4 text-center">
				<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
				<h2 className="text-2xl font-medium text-gray-700 mb-8">Página no encontrada</h2>
				<p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
				<Link
					href="/"
					className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
				>
					Volver al inicio
				</Link>
			</div>
		</section>
	);
}
