import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer, Navbar } from '@/components/ui';
import { getSettings } from '@/utils/server';
import { WhatsappFloatingButton } from '@/components/server-component';

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSettings();

	return {
		title: settings.businessTitle || '',
		description: settings.businessPresentation || ''
	};
}

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const settings = await getSettings();

	return (
		<html lang="es">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navbar />
				{children}
				<WhatsappFloatingButton phone={settings.phone} />
				<Footer settings={settings} />
			</body>
		</html>
	);
}
