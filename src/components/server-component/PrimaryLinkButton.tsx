import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ComponentProps } from 'react';

export function PrimaryLinkButton({ href, children }: ComponentProps<typeof Link>) {
	return (
		<Button asChild variant="secondary" size="lg" className="font-bold">
			<Link href={href}>{children}</Link>
		</Button>
	);
}
