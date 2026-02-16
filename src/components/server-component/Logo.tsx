import { getLogo } from '@/utils/server';
import Image from 'next/image';
import { RenderIf } from 'syntax-sugar';

export async function Logo() {
	const logoUrl = await getLogo();

	console.log('logoUrl', logoUrl);
	return (
		<RenderIf condition={Boolean(logoUrl)}>
			<Image width={400} height={400} src={logoUrl} alt="Fluydo logo" className="w-fit h-14" />
		</RenderIf>
	);
}
