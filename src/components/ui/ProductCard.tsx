import { Product } from '@/types';
import { getAssetUrl } from '@/utils/shared';
import Image from 'next/image';

interface Props {
	product: Product;
}

export function ProductCard({ product }: Props) {
	const discount = Math.round(((product.price - product.price) / product.price) * 100);

	return (
		<article
			data-product-id={product.id}
			data-categories={product.categories.map(cat => cat.id).join(',')}
			className="group relative flex flex-col w-full max-w-[380px] bg-white rounded-2xl cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden mx-auto sm:mx-0"
		>
			<div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
				{/* <RenderIf condition={!!product.badge}>
					<span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
						{product.badge} -{discount}%
					</span>
				</RenderIf> */}
				<Image
					width={200}
					height={200}
					src={getAssetUrl(product.images[0])}
					alt={`Imagen de ${product.name}`}
					className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
					loading="lazy"
				/>
			</div>

			<div className="flex flex-col grow p-6 gap-3">
				<div className="flex justify-between items-start gap-4">
					<h2 className="text-lg font-bold leading-snug text-gray-900">{product.name}</h2>
				</div>

				<p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{product.description}</p>

				<div className="flex items-center justify-end mt-3 pt-4 border-t border-gray-100">
					<div className="flex flex-col">
						<span className="text-xl font-extrabold text-gray-900">$ {product.price} ARS</span>
					</div>
				</div>
			</div>
		</article>
	);
}
