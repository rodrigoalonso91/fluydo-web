import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { getFaqs } from '@/utils/server';

export async function FaqSection() {
	const faqs = await getFaqs();

	if (faqs.length === 0) return null;

	return (
		<section className="py-16 bg-secondary">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">PREGUNTAS FRECUENTES</h2>
					<FaqAccordion faqs={faqs} />
				</div>
			</div>
		</section>
	);
}
