import { FaqSection, PurchaseConditions } from '@/components/server-component';
import { AboutSection } from '@/components/ui/AboutSection';
import Hero from '@/components/ui/Hero';
import { getSettings } from '@/utils/server';
import { normalizeArgentinaPhone } from '@/utils/shared';

const backofficeUrl = process.env.DIRECTUS_BO_URL;

export default async function Home() {
	const settings = await getSettings();
	const carrouselImgs = settings.carrouselProducts.flatMap(product => `${backofficeUrl}/assets/${product.images}`);

	return (
		<main>
			<Hero
				businessTitle={settings.businessTitle}
				businessPresentation={settings.businessPresentation}
				carrouselImages={carrouselImgs}
			/>
			<AboutSection aboutUs={settings.aboutUs} phoneNumber={normalizeArgentinaPhone(settings.phone ?? '')} />
			<PurchaseConditions />
			<FaqSection />
		</main>
	);
}
