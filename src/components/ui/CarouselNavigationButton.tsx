import { ComponentProps } from 'react';

interface Props {
	direction: 'left' | 'right';
}

export function CarouselNavigationButton({ direction, onClick }: ComponentProps<'button'> & Props) {
	const isLeft = direction === 'left';

	return (
		<button
			onClick={onClick}
			className={`absolute ${isLeft ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors`}
			aria-label={isLeft ? 'Previous slide' : 'Next slide'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d={isLeft ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'}
				/>
			</svg>
		</button>
	);
}
