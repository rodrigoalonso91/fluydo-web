import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ComponentProps } from 'react';

export function SecondaryLinkButton({ href, children, ...props }: ComponentProps<typeof Link>) {
	return (
		<Button asChild variant="default" size="lg" className="shadow-md">
			<Link href={href} {...props}>
				{children}
			</Link>
		</Button>
	);
}
