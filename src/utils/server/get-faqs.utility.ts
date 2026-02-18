import type { FrequentlyAskedQuestion } from '@/types';
import { BackofficeService } from './backoffice.service';

export async function getFaqs(): Promise<FrequentlyAskedQuestion[]> {
	const response = await BackofficeService.getFaqs({
		filter: { status: { _eq: 'published' } },
		sort: ['sort'],
		fields: ['id', 'question', 'answer']
	});
	return (response ?? []).map(item => ({
		id: item.id,
		question: item.question,
		answer: item.answer
	}));
}
