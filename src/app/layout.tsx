import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
	display: 'swap',
});

const bebasNeue = Bebas_Neue({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bebas',
	display: 'swap',
});

const dmMono = DM_Mono({
	weight: ['300', '400', '500'],
	subsets: ['latin'],
	variable: '--font-dm-mono',
	display: 'swap',
});

export const metadata: Metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	openGraph: {
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className={`${geist.variable} ${bebasNeue.variable} ${dmMono.variable}`}
			suppressHydrationWarning
		>
			<body>{children}</body>
		</html>
	);
}
