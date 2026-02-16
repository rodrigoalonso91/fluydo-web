import Link from 'next/link';
import { ComponentProps } from 'react';

export function PrimaryLinkButton({ href, children }: ComponentProps<typeof Link>) {
	return (
		<Link
			href={href}
			className="bg-secondary text-primary font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity text-center"
		>
			{children}
		</Link>
	);
}
