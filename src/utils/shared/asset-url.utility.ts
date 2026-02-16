/**
 * Builds the full URL for a Directus asset
 * @param assetId - The ID of the asset (image, file, etc.)
 * @returns The complete URL to access the asset
 */
export function getAssetUrl(assetId: string): string {
	const backofficeUrl = process.env.DIRECTUS_BO_URL;

	if (!backofficeUrl) throw new Error('DIRECTUS_BO_URL environment variable is not defined');

	return `${backofficeUrl}/assets/${assetId}`;
}
