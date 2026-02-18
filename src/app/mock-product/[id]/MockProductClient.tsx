'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

/* ── Mock data ─────────────────────────────────────────────── */

const MOCK_IMAGES = [
	'https://picsum.photos/seed/fluydo-1/800/800',
	'https://picsum.photos/seed/fluydo-2/800/800',
	'https://picsum.photos/seed/fluydo-3/800/800',
	'https://picsum.photos/seed/fluydo-4/800/800',
	'https://picsum.photos/seed/fluydo-5/800/800',
	'https://picsum.photos/seed/fluydo-6/800/800'
];

const MOCK_COLORS = [
	{ id: '1', name: 'Negro', code: '#1a1a1a' },
	{ id: '2', name: 'Blanco', code: '#f5f5f5' },
	{ id: '3', name: 'Azul Marino', code: '#1e3a5f' },
	{ id: '4', name: 'Bordo', code: '#722f37' }
];

const MOCK_SIZES = [
	{ label: 'S', available: true },
	{ label: 'M', available: true },
	{ label: 'L', available: true },
	{ label: 'XL', available: true },
	{ label: 'XXL', available: false }
];

const MOCK_RELATED = [
	{ id: '1', name: 'Remera Oversize Basic', price: 8990, image: 'https://picsum.photos/seed/rel-1/400/400' },
	{ id: '2', name: 'Buzo Hoodie Urban', price: 18450, image: 'https://picsum.photos/seed/rel-2/400/400' },
	{ id: '3', name: 'Musculosa Sport Dry', price: 6320, image: 'https://picsum.photos/seed/rel-3/400/400' },
	{ id: '4', name: 'Campera Rompeviento', price: 24900, image: 'https://picsum.photos/seed/rel-4/400/400' }
];

const PRODUCT = {
	name: 'Musculosa Francia',
	sku: '2322',
	material: 'Microfibra elastizada',
	description:
		'Musculosa lisa de microfibra elastizada con terminación premium. Tela suave al tacto, ideal para uso diario o entrenamiento. Secado rápido y excelente calce.',
	modelNote: 'El talle utilizado por el modelo es M',
	price: 12660,
	tags: ['Nuevo', 'Temporada 2025']
};

/* ── Formatter ─────────────────────────────────────────────── */

const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

/* ── Component ─────────────────────────────────────────────── */

export default function MockProductClient() {
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].id);
	const [selectedSize, setSelectedSize] = useState('');
	const [quantity, setQuantity] = useState(1);

	const secondaryImages = MOCK_IMAGES.filter((_, i) => i !== selectedImage);

	return (
		<>
			{/* ── Main product grid ─────────────────────────── */}
			<div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
				{/* ── Gallery: main + secondary grid ────────── */}
				<div className="space-y-3">
					{/* Main image */}
					<div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
						<img
							src={MOCK_IMAGES[selectedImage]}
							alt={`${PRODUCT.name} - Vista ${selectedImage + 1}`}
							className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						/>
						{/* Arrows */}
						<Button
							onClick={() => setSelectedImage(i => (i === 0 ? MOCK_IMAGES.length - 1 : i - 1))}
							variant="ghost"
							size="icon"
							className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
							aria-label="Imagen anterior"
						>
							<svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
						</Button>
						<Button
							onClick={() => setSelectedImage(i => (i === MOCK_IMAGES.length - 1 ? 0 : i + 1))}
							variant="ghost"
							size="icon"
							className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-md backdrop-blur-sm hover:bg-white"
							aria-label="Imagen siguiente"
						>
							<svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</Button>
						{/* Image counter badge */}
						<span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
							{selectedImage + 1} / {MOCK_IMAGES.length}
						</span>
					</div>

					{/* Secondary images grid */}
					<div className="grid grid-cols-5 gap-2">
						{MOCK_IMAGES.map((img, idx) => (
							<Button
								key={idx}
								onClick={() => setSelectedImage(idx)}
								variant="ghost"
								className={`relative aspect-square h-auto overflow-hidden rounded-lg border-2 p-0 transition ${
									idx === selectedImage ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent hover:border-gray-300'
								}`}
							>
								<img src={img} alt={`Miniatura ${idx + 1}`} className="h-full w-full object-cover" />
								{idx === selectedImage && <div className="absolute inset-0 bg-indigo-600/10" />}
							</Button>
						))}
					</div>
				</div>

				{/* ── Product info ──────────────────────────── */}
				<div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
					{/* SKU & Name */}
					<div>
						<p className="mb-1 text-xs font-medium uppercase tracking-widest text-gray-400">Código {PRODUCT.sku}</p>
						<h1 className="text-3xl font-bold leading-tight text-gray-900">{PRODUCT.name}</h1>
					</div>

					{/* Material */}
					<p className="text-sm text-gray-500">
						Material: <span className="font-medium text-gray-700">{PRODUCT.material}</span>
					</p>

					{/* Description */}
					<p className="text-sm leading-relaxed text-gray-600">{PRODUCT.description}</p>

					{/* Model note */}
					<p className="text-xs italic text-gray-400">{PRODUCT.modelNote}</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-2">
						{PRODUCT.tags.map(tag => (
							<span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
								{tag}
							</span>
						))}
					</div>

					{/* Price */}
					<div className="rounded-xl bg-gray-50 px-5 py-4">
						<span className="text-3xl font-extrabold text-gray-900">{formatter.format(PRODUCT.price)}</span>
						<span className="ml-2 text-sm text-gray-500">(IVA incluido)</span>
					</div>

					{/* Color selector */}
					<div>
						<p className="mb-2 text-sm font-semibold text-gray-700">
							Color:{' '}
							<span className="font-normal text-gray-500">{MOCK_COLORS.find(c => c.id === selectedColor)?.name}</span>
						</p>
						<div className="flex gap-2">
							{MOCK_COLORS.map(color => (
								<Button
									key={color.id}
									onClick={() => setSelectedColor(color.id)}
									title={color.name}
									variant="outline"
									size="icon"
									className={`rounded-full border-2 transition ${
										selectedColor === color.id
											? 'border-indigo-600 ring-2 ring-indigo-200'
											: 'border-gray-300 hover:border-gray-500'
									}`}
									style={{ backgroundColor: color.code }}
								/>
							))}
						</div>
					</div>

					{/* Size selector */}
					<div>
						<div className="mb-2 flex items-center justify-between">
							<p className="text-sm font-semibold text-gray-700">Talle</p>
							<Button variant="link" size="sm" className="text-xs text-indigo-600">
								Guía de talles
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{MOCK_SIZES.map(size => (
								<Button
									key={size.label}
									onClick={() => size.available && setSelectedSize(size.label)}
									disabled={!size.available}
									variant={selectedSize === size.label ? 'default' : 'outline'}
									size="sm"
									className={`h-10 w-14 ${!size.available ? 'line-through' : ''} ${
										selectedSize === size.label ? 'border-indigo-600 bg-indigo-600' : ''
									}`}
								>
									{size.label}
								</Button>
							))}
						</div>
					</div>

					{/* Quantity & Add to cart */}
					<div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end">
						<div className="w-28">
							<label className="mb-1 block text-sm font-semibold text-gray-700">Cantidad</label>
							<div className="flex items-center rounded-lg border border-gray-300">
								<Button
									onClick={() => setQuantity(q => Math.max(1, q - 1))}
									variant="ghost"
									size="icon-sm"
									aria-label="Reducir cantidad"
								>
									−
								</Button>
								<span className="flex h-10 w-8 items-center justify-center text-sm font-semibold">{quantity}</span>
								<Button
									onClick={() => setQuantity(q => Math.min(99, q + 1))}
									variant="ghost"
									size="icon-sm"
									aria-label="Aumentar cantidad"
								>
									+
								</Button>
							</div>
						</div>

						<Button className="flex h-12 flex-1 gap-2 rounded-xl bg-indigo-600 text-sm font-bold uppercase tracking-wide shadow-lg shadow-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0">
							<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
								/>
							</svg>
							Agregar al carrito
						</Button>
					</div>

					{/* Dynamic total */}
					{quantity > 1 && (
						<p className="text-right text-sm text-gray-500">
							Total: <span className="font-semibold text-gray-800">{formatter.format(PRODUCT.price * quantity)}</span>
						</p>
					)}

					{/* Share */}
					<div className="flex items-center gap-3 border-t border-gray-200 pt-4">
						<span className="text-xs font-medium text-gray-500">Compartir:</span>
						<Button variant="ghost" size="icon-sm" className="rounded-full bg-green-500 text-white hover:bg-green-600" aria-label="WhatsApp">
							<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
							</svg>
						</Button>
						<Button variant="ghost" size="icon-sm" className="rounded-full bg-blue-600 text-white hover:bg-blue-700" aria-label="Facebook">
							<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</Button>
					</div>
				</div>
			</div>

			{/* ── Related products ──────────────────────────── */}
			<section className="mt-16 border-t border-gray-100 pt-10">
				<h2 className="mb-6 text-xl font-bold text-gray-900">Productos relacionados</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{MOCK_RELATED.map(rp => (
						<a
							key={rp.id}
							href={`/mock-product/${rp.id}`}
							className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
						>
							<div className="aspect-square overflow-hidden bg-gray-100">
								<img
									src={rp.image}
									alt={rp.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm font-semibold text-gray-900 line-clamp-1">{rp.name}</p>
								<p className="mt-1 text-sm font-bold text-indigo-600">{formatter.format(rp.price)}</p>
							</div>
						</a>
					))}
				</div>
			</section>
		</>
	);
}
