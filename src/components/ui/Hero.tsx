'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Each } from 'syntax-sugar';
import { CarouselNavigationButton } from './CarouselNavigationButton';

interface Props {
	carrouselImages?: string[];
	businessTitle?: string;
	businessPresentation?: string;
}

const fallbackBusinessTitle = 'Fluydo S.A';
const fallbackBusinessPresentation = 'Empresa Argentina especializada en importación de marroquinería y accesorios de moda';

export default function Hero({ carrouselImages = [], businessTitle, businessPresentation }: Props) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const title = businessTitle || fallbackBusinessTitle;
	const presentation = businessPresentation || fallbackBusinessPresentation;
	const slideCount = carrouselImages.length;

	const nextSlide = useCallback(() => {
		setCurrentIndex(prev => (prev + 1) % slideCount);
	}, [slideCount]);

	const prevSlide = useCallback(() => {
		setCurrentIndex(prev => (prev - 1 + slideCount) % slideCount);
	}, [slideCount]);

	useEffect(() => {
		if (slideCount === 0 || isHovered) return;
		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	}, [slideCount, isHovered, nextSlide]);

	return (
		<section className="bg-primary text-secondary">
			<div className="container mx-auto p-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						{/* Text content */}
						<div className="text-center lg:text-left">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
							<p className="text-xl mb-8">{presentation}</p>
							<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
								<Link
									href="/catalogo"
									className="bg-secondary text-primary font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity text-center"
								>
									CATALOGO
								</Link>
							</div>
						</div>

						{/* Carousel */}
						{slideCount > 0 && (
							<div
								className="relative overflow-hidden rounded-lg shadow-xl"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<div
									className="flex transition-transform duration-500 ease-in-out"
									style={{ transform: `translateX(-${currentIndex * 100}%)` }}
								>
									<Each
										of={carrouselImages}
										setAsKey={img => img}
										renderAs={(img, index) => (
											<div className="min-w-full">
												<Image
													src={img}
													alt={`Producto Fluydo S.A ${index + 1}`}
													width={800}
													height={400}
													className="w-full h-[400px] object-cover"
													priority={index === 0}
												/>
											</div>
										)}
									/>
								</div>

								{/* Indicators */}
								<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
									<Each
										of={carrouselImages}
										setAsKey={img => img}
										renderAs={(_img, index) => (
											<button
												onClick={() => setCurrentIndex(index)}
												className={`w-3 h-3 rounded-full transition-colors ${
													index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'
												}`}
												aria-label={`Go to slide ${index + 1}`}
											/>
										)}
									/>
								</div>

								<CarouselNavigationButton direction="left" onClick={prevSlide} />
								<CarouselNavigationButton direction="right" onClick={nextSlide} />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
