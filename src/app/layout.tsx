import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
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
			className={`${geist.variable}`}
			suppressHydrationWarning
		>
			<body>{children}</body>
		</html>
	);
}
