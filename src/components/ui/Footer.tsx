import type { Settings } from '@/types';

interface Props {
	settings?: Settings;
}

export function Footer({ settings }: Props) {
	return (
		<footer className="bg-secondary text-primary py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">DONDE ENCONTRARNOS</h3>
						<p>
							Te esperamos en nuestro showroom ubicado en {settings?.businessAddress}. Recuerda registrarte previo a la visita.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">HORARIO DE ATENCIÓN</h3>
						<p>{settings?.businessTimeOpen}</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">ESCRIBINOS UN EMAIL/LLAMANOS</h3>
						<p>{settings?.email}</p>
						<p>{settings?.phone}</p>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-700 text-center">
					<p className="text-gray-400">© {new Date().getFullYear()} Fluydo S.A. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
