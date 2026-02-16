import { RenderIf } from 'syntax-sugar';
import { SecondaryLinkButton } from '../server-component';

interface Props {
	aboutUs?: string;
	phoneNumber?: string;
}

export function AboutSection({ aboutUs = '', phoneNumber = '' }: Props) {
	const whatsappLink = `https://wa.me/${phoneNumber}`;

	return (
		<section id="quienes-somos" className="py-16 bg-secondary text-primary">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<RenderIf condition={!!aboutUs}>
						<h2 className="text-3xl font-bold text-center mb-12">QUIENES SOMOS</h2>
						<div className="prose prose-lg mx-auto">
							<p dangerouslySetInnerHTML={{ __html: aboutUs }} className="text-lg leading-relaxed"></p>
						</div>
						<RenderIf condition={!!phoneNumber}>
							<div className="mt-10 text-center">
								<SecondaryLinkButton href={whatsappLink} target="_blank" rel="noopener noreferrer">
									QUIERO COMPRAR
								</SecondaryLinkButton>
							</div>
						</RenderIf>
					</RenderIf>
				</div>
			</div>
		</section>
	);
}
