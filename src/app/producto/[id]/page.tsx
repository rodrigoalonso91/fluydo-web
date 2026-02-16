import { getProduct } from '@/utils/server';
import { getAssetUrl } from '@/utils/shared';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Each, Else, If, Then } from 'syntax-sugar';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params;
	const product = await getProduct(id);

	if (!product) return notFound();

	const formatter = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS'
	});

	const formattedPrice = formatter.format(product.price);
	const mainImage = product.images?.[0];
	const secondaryImages = product.images?.slice(1) ?? [];

	return (
		<section className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/60">
			<div className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
				<div className="mb-6 text-sm text-gray-500">
					<nav className="flex flex-wrap items-center gap-1">
						<Link href="/" className="hover:text-gray-800">
							Inicio
						</Link>
						<span>/</span>
						<a href="/catalogo" className="hover:text-gray-800">
							Catálogo
						</a>
						<span>/</span>
						<span className="font-medium text-gray-800">{product?.name ?? 'Producto'}</span>
					</nav>
				</div>

				<If condition={!!product}>
					<Then>
						<section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
							<div className="space-y-4">
								<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
									<div className="absolute left-6 top-6 z-10 flex flex-col gap-2">
										<Each
											of={product.tags ?? []}
											setAsKey={tag => tag}
											renderAs={tag => (
												<span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
													{tag}
												</span>
											)}
										/>
										<span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 shadow-md ring-1 ring-indigo-100">
											SKU {product!.sku}
										</span>
									</div>
									<If condition={Boolean(mainImage)}>
										<Then>
											<Image
												width={200}
												height={200}
												src={getAssetUrl(mainImage!)}
												alt={`Imagen principal ${product?.name}`}
												className="h-full w-full max-h-[540px] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
											/>
										</Then>
										<Else>
											<span className="flex h-full min-h-[420px] items-center justify-center bg-slate-100 text-sm text-slate-500">
												Sin imagen disponible
											</span>
										</Else>
									</If>
								</div>
							</div>

							<div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
								<header className="space-y-2 border-b border-slate-200 pb-4">
									<h1 className="text-3xl font-bold leading-tight text-slate-900">{product!.name}</h1>
									<p className="text-sm text-slate-500">{product!.description}</p>
								</header>

								<section className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
									<div className="flex items-center gap-3">
										<span className="text-3xl font-extrabold text-slate-900">{formattedPrice} ARS</span>
										<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
											En stock
										</span>
									</div>
								</section>

								<div className="flex justify-center lg:px-52">
									<button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Añadir al carrito
									</button>
								</div>
							</div>
						</section>
					</Then>
					<Else>
						<div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
							<p className="text-lg font-semibold text-slate-800">Producto no encontrado</p>
							<p className="mt-2 text-sm text-slate-500">
								El artículo que buscás no está disponible o fue retirado del catálogo.
							</p>
							<a
								href="/catalogo"
								className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-700"
							>
								Volver al catálogo
							</a>
						</div>
					</Else>
				</If>
			</div>
		</section>
	);
}
