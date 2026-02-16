import Link from 'next/link';
import { ComponentProps } from 'react';

export function SecondaryLinkButton({ href, children, ...props }: ComponentProps<typeof Link>) {
	return (
		<Link
			href={href}
			{...props}
			className="bg-primary text-secondary font-medium py-3 px-6 rounded-lg transition-colors shadow-md"
		>
			{children}
		</Link>
	);
}
