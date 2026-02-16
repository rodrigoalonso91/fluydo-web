import { getProducts } from '@/utils/server';
import Link from 'next/link';
import { Else, If, Then } from 'syntax-sugar';

export default async function CatalogoPage() {
	const products = await getProducts();

	const categories = Array.from(
		new Set(products.flatMap(product => product.categories).filter(category => category.status === 'published'))
	);

	return (
		<section className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
			<div className="mb-4 text-sm text-gray-500">
				<nav className="flex flex-wrap items-center gap-1">
					<Link href="/" className="hover:text-gray-800">
						Inicio
					</Link>
					<span>/</span>
					<span className="font-medium text-gray-800">Catálogo</span>
				</nav>
			</div>

			<header className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-end">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Productos</h1>
					<p className="mt-1 text-sm text-gray-500">
						<span id="product-count">{products.length}</span> productos encontrados
					</p>
				</div>

				{/* <OrderBySelect /> */}
			</header>

			<If condition={products.length === 0}>
				<Then>{/* <NoAvailableProducts /> */}</Then>
				<Else>
					<div slot="else" className="grid gap-8 lg:grid-cols-[260px,1fr]">
						<aside className="space-y-6">{/* <CategoryFilter categories={categories} /> */}</aside>

						<section className="space-y-4">
							<div id="product-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{products
									.filter(product => !!product)
									.map(product => (
										<Link
											key={product.id}
											className="contents product-item"
											href={`/product/${product.id}`}
											data-product-name={product.name}
											data-product-price={product.price}
											data-product-sku={product.sku}
											data-categories={product.categories.map(c => c.id).join(',')}
										>
											{/* <ProductCard product={product} /> */}
										</Link>
									))}
							</div>
						</section>
					</div>
				</Else>
			</If>
		</section>
	);
}
