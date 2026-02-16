import type { PurchaseCondition } from '@/types';
import { BackofficeService } from './backoffice.service';

export async function getPurchaseConditions(): Promise<PurchaseCondition[]> {
	const response = await BackofficeService.getPurchaseConditions({
		filter: {
			status: {
				_eq: 'published'
			}
		},
		sort: ['sort'],
		fields: ['id', 'title', 'description']
	});
	return response ?? [];
}
