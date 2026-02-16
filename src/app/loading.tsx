export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary via-gray-900 to-primary">
			<div className="text-center">
				{/* Animated spinner */}
				<div className="relative mx-auto mb-8 h-24 w-24">
					{/* Outer ring */}
					<div className="absolute inset-0 rounded-full border-4 border-secondary/20"></div>

					{/* Spinning arc */}
					<div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-secondary border-r-secondary"></div>

					{/* Inner pulsing circle */}
					<div className="absolute inset-2 animate-pulse rounded-full bg-secondary/10"></div>
				</div>

				{/* Loading text */}
				<div className="space-y-3">
					<h2 className="text-2xl font-bold text-secondary">Cargando</h2>
					<div className="flex justify-center gap-1">
						<span className="h-2 w-2 animate-bounce rounded-full bg-secondary [animation-delay:-0.3s]"></span>
						<span className="h-2 w-2 animate-bounce rounded-full bg-secondary [animation-delay:-0.15s]"></span>
						<span className="h-2 w-2 animate-bounce rounded-full bg-secondary"></span>
					</div>
				</div>
			</div>
		</div>
	);
}
