import { getProduct } from '@/utils/server';
import Image from 'next/image';
import Link from 'next/link';
import { Each, Else, If, Then } from 'syntax-sugar';

const backofficeUrl = process.env.DIRECTUS_BO_URL;

interface Props {
	params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
	const { id } = await params;
	const product = id ? await getProduct(id) : null;

	const formatter = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS'
	});

	const formattedPrice = product ? formatter.format(product.price) : '';
	const mainImage = product?.images?.[0];
	const secondaryImages = product?.images?.slice(1) ?? [];

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
											of={product!.tags}
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
												data-main-image
												src={`${backofficeUrl}/assets/${mainImage}`}
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

								{/* {product!.images.length > 1 && (
									<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
										{[mainImage, ...secondaryImages].filter(Boolean).map((image, index) => (
											<button
												type="button"
												data-thumb
												data-src={`/api/image/${image}`}
												aria-label={`Vista ${index + 1} de ${product!.name}`}
												className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
											>
												<span className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 opacity-0 transition group-hover:opacity-100" />
												<img
													src={`/api/image/${image}`}
													alt={`Miniatura ${index + 1} de ${product!.name}`}
													className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
												/>
											</button>
										))}
									</div>
								)} */}
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

								{/* <section className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">★</span>
                <div>
                  <p className="font-semibold text-slate-800">Experiencia premium garantizada</p>
                  <p className="text-xs text-slate-500">Materiales seleccionados, costuras reforzadas y controles de calidad estrictos.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">🚚</span>
                <div>
                  <p className="font-semibold text-slate-800">Envíos rápidos en todo el país</p>
                  <p className="text-xs text-slate-500">Despachamos en 24 hs hábiles con seguimiento en línea.</p>
                </div>
              </div>
            </section> */}
								{/* <div className="space-y-3">
									<p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Colores</p>
									{product!.colors.length > 0 ? (
										<div className="flex flex-wrap gap-3">
											{product!.colors.map(color => (
												<button
													type="button"
													className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
												>
													<span
														className="h-8 w-8 rounded-full border border-slate-200 ring-2 ring-transparent transition group-hover:ring-indigo-200"
														style={`background-color: ${color.code};`}
														aria-label={`Color ${color.name}`}
													/>
													<span className="text-sm font-medium text-slate-700">{color.name}</span>
												</button>
											))}
										</div>
									) : (
										<p className="text-sm text-slate-500">Próximamente más variantes de color.</p>
									)}
								</div> */}

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
