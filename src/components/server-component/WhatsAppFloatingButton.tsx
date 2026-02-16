import Link from 'next/link';

interface Props {
	phone: string;
}

export function WhatsappFloatingButton({ phone }: Props) {
	const whatsappUrl = `https://wa.me/${phone}`;
	return (
		<Link
			href={whatsappUrl}
			className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Abrir WhatsApp"
		>
			<svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor">
				<path d="M16.07 6.02c-5.51 0-9.98 4.47-9.98 9.98 0 1.76.46 3.48 1.33 5.01L6 26l5.13-1.35a9.96 9.96 0 0 0 4.94 1.3h.01c5.51 0 9.98-4.47 9.98-9.98 0-2.65-1.03-5.14-2.91-7.02a9.93 9.93 0 0 0-7.08-2.93zm0 18.1h-.01a8.07 8.07 0 0 1-4.1-1.12l-.29-.17-3.04.8.81-2.96-.19-.3a8.08 8.08 0 1 1 6.82 3.75zm4.42-6.07c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01s.86 2.33.98 2.49c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
			</svg>
		</Link>
	);
}
