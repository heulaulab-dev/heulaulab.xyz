export type WorkItem = {
	slug: string
	category: string
	title: string
	description: string
	year: string
	tags: string[]
	stack: string[]
	url: string
	image: string
	coverColor: string
}

export const works: WorkItem[] = [
	{
		slug: 'lllarik',
		category: 'E-Commerce · Brand',
		title: 'LLLARIK.id — Curated Furniture for Expressive Living',
		description:
			'Design-driven furniture brand positioning hand-crafted Indonesian mirrors as identity objects. Built a full e-commerce storefront featuring editorial lookbook, curated product catalog, and brand storytelling. Mid-century modern aesthetic with a focus on spatial identity.',
		year: '2026',
		tags: ['E-Commerce', 'Branding', 'Editorial'],
		stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4'],
		url: 'https://www.lllarik.id',
		image: '/placeholder.svg',
		coverColor: '#1a1209',
	},
	{
		slug: 'masjid-baiturrahim',
		category: 'Civic · Platform',
		title: 'Masjid Baiturrahim Sungai Bambu',
		description:
			'Full digital platform for a Jakarta mosque. Features Islamic content management (kajian, khutbah, tafsir), real-time prayer schedule, Qurban patungan (shared sacrifice) slot management with admin dashboard, QRIS donation integration, and zakat calculator.',
		year: '2026',
		tags: ['Civic Tech', 'Content Platform', 'Dashboard'],
		stack: [
			'Next.js 15',
			'React 19',
			'TypeScript',
			'Tailwind v4',
			'Go',
			'PostgreSQL',
		],
		url: 'https://www.masjidbaiturrahimsb.org',
		image: '/placeholder.svg',
		coverColor: '#0d1a10',
	},
	{
		slug: 'levi-camp',
		category: 'Booking · Full-Stack',
		title: 'Levi Camp — Glamping Booking Platform',
		description:
			'End-to-end glamping and outdoor accommodation booking system in Bogor. Covers online reservation flow, payment tracking, MinIO-backed media management, and a Go/Gin REST API with GORM and PostgreSQL. Staging and production environments on nginx with certbot SSL.',
		year: '2025',
		tags: ['Booking Platform', 'Full-Stack', 'Infrastructure'],
		stack: [
			'Next.js 15',
			'React 19',
			'TypeScript',
			'Go',
			'Gin',
			'GORM',
			'PostgreSQL',
			'MinIO',
			'nginx',
		],
		url: 'https://levicamp.tazkiyaworks.fun',
		image: '/placeholder.svg',
		coverColor: '#0a1a14',
	},
]

export function getWorkBySlug(slug: string): WorkItem | undefined {
	return works.find((w) => w.slug === slug)
}
