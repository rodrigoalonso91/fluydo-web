'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FrequentlyAskedQuestion } from '@/types';
import { Each } from 'syntax-sugar';

interface FaqAccordionProps {
	faqs: FrequentlyAskedQuestion[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			<Each
				of={faqs}
				setAsKey={faq => faq.id}
				renderAs={faq => (
					<AccordionItem value={faq.id}>
						<AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				)}
			/>
		</Accordion>
	);
}
