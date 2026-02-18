import type { Settings } from '@/types';
import { Logo } from '../server-component/Logo';

interface Props {
	settings?: Settings;
}

export function Footer({ settings }: Props) {
	return (
		<footer className="bg-gray-900 text-gray-500 py-16 border-t border-gray-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
			<div className="container mx-auto px-4">
				<div className="mb-12 flex justify-center opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
					<Logo />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
					<div className="flex flex-col items-center md:items-start space-y-4">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Ubicación</h3>
						<div className="flex flex-col items-center md:items-start gap-3 text-gray-500 group cursor-default font-semibold">
							<p className="leading-relaxed text-sm md:text-base max-w-xs">
								Showroom en <span>{settings?.businessAddress}</span>.
								<br />
								<span className="italic text-xs">Recuerda registrarte previo a la visita.</span>
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center md:items-start space-y-4">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Horarios</h3>
						<div className="flex flex-col items-center md:items-start gap-3 group cursor-default">
							<p className="font-semibold text-gray-500 text-sm md:text-base">{settings?.businessTimeOpen}</p>
						</div>
					</div>
					<div className="flex flex-col items-center md:items-start space-y-4 text-gray-500">
						<h3 className="text-sm font-bold uppercase tracking-widest mb-2">Contacto</h3>
						<div className="space-y-4">
							<div className="flex flex-col md:flex-row items-center gap-3 group cursor-pointer hover:text-gray-500 transition-colors">
								<p className="text-sm">{settings?.email}</p>
							</div>
							<div className="flex flex-col md:flex-row items-center gap-3 group cursor-pointer hover:text-gray-500 transition-colors">
								<p className="text-sm">{settings?.phone}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-16 pt-8 border-t border-gray-300/50 text-center flex flex-col gap-4 text-gray-400">
					<div className="text-sm space-y-1 font-medium">
						<p>
							Desarrollado por <span className="font-bold">Rodrigo Alonso</span>
						</p>
						<div className="flex justify-center gap-4 text-xs opacity-90">
							<a
								href="https://wa.me/5491171349980"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-white transition-colors"
							>
								+54 9 11 7134-9980
							</a>
							<span>|</span>
							<p>rodrigoalonso.dev@gmail.com</p>
						</div>
					</div>
					<p className="text-xs mt-2">© {new Date().getFullYear()} Fluydo S.A. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
