import { BackofficeService } from './backoffice.service';

export async function getLogo(): Promise<string> {
	const response = await BackofficeService.getSettings({ fields: ['logo'] });

	if (!response?.logo) return '';
	const backofficeUrl = process.env.DIRECTUS_BO_URL;

	// Use local proxy to avoid mixed-content issues (HTTPS site loading HTTP images)
	return `${backofficeUrl}/assets/${response.logo}`;
}
