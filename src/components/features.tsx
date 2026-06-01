'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

type WorkItem = {
	slug: string;
	category: string;
	title: string;
	description: string;
	year: string;
	tags: string[];
	stack: string[];
	url: string;
	image: string;
	coverColor: string;
};

const works: WorkItem[] = [
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
];

export function Features() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.15 });
	const reduce = useReducedMotion();

	return (
		<section
			id='features'
			ref={ref}
			className='px-6 md:px-10 py-24 md:py-32 border-border border-t'
		>
			<div className='mx-auto max-w-7xl'>
				{/* Section header */}
				<motion.div
					initial={reduce ? false : { opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					className='mb-16 md:mb-20'
				>
					<div className='flex md:flex-row flex-col md:justify-between md:items-end gap-4'>
						<h2
							className='font-display font-bold leading-[1.05] tracking-tight'
							style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
						>
							Selected work,
							<br />
							shipped and running.
						</h2>
						<p className='max-w-[36ch] text-text-secondary text-sm'>
							Three recent builds across e-commerce, civic platforms, and
							full-stack booking systems.
						</p>
					</div>
				</motion.div>

				{/* Editorial list — full-width rows, alternating alignment */}
				<div className='flex flex-col gap-px bg-border'>
					{works.map((work, i) => (
						<FeatureRow key={work.slug} work={work} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureRow({ work, index }: { work: WorkItem; index: number }) {
	const ref = useRef<HTMLAnchorElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.25 });
	const reduce = useReducedMotion();
	const isReversed = index % 2 === 1;

	return (
		<motion.a
			ref={ref}
			href={work.url}
			target='_blank'
			rel='noopener noreferrer'
			initial={reduce ? false : { opacity: 0, y: 30 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{
				duration: 0.7,
				delay: 0.05,
				ease: [0.16, 1, 0.3, 1],
			}}
			className='group block relative bg-surface'
		>
			<div
				className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-6 md:p-10 lg:p-12 ${
					isReversed ? 'md:[direction:rtl]' : ''
				}`}
			>
				{/* Cover band — uses project's own color, not a broken placeholder img */}
				<div
					className='relative md:col-span-5 border border-border aspect-[4/3] md:aspect-[5/4] overflow-hidden md:[direction:ltr]'
					style={{ backgroundColor: work.coverColor }}
				>
					<div
						className='absolute inset-0 opacity-60 mix-blend-screen'
						style={{
							background:
								'radial-gradient(circle at 30% 30%, rgba(239,91,161,0.18), transparent 55%)',
						}}
					/>
					<div className='absolute inset-0 flex items-end p-5'>
						<span className='font-mono text-[10px] text-text-muted uppercase tracking-widest'>
							{work.category}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className='flex flex-col gap-5 md:col-span-7 md:[direction:ltr]'>
					<div className='flex justify-between items-center'>
						<span className='font-mono text-[11px] text-text-muted tracking-widest'>
							{work.year}
						</span>
						<span className='font-mono text-[11px] text-text-muted tracking-widest'>
							{String(index + 1).padStart(2, '0')} /{' '}
							{String(works.length).padStart(2, '0')}
						</span>
					</div>

					<h3 className='max-w-[20ch] font-display font-semibold text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight'>
						{work.title}
					</h3>

					<p className='max-w-[60ch] text-text-secondary text-sm md:text-base leading-relaxed'>
						{work.description}
					</p>

					{/* Tags */}
					<div className='flex flex-wrap gap-2 pt-2'>
						{work.tags.map((tag) => (
							<span
								key={tag}
								className='px-2 py-1 border border-border group-hover:border-accent/40 font-mono text-[10px] text-text-muted uppercase tracking-widest transition-colors duration-300'
							>
								{tag}
							</span>
						))}
					</div>

					{/* Stack line + arrow */}
					<div className='flex sm:flex-row flex-col sm:justify-between sm:items-end gap-4 mt-2 pt-6 border-border border-t'>
						<p className='max-w-[40ch] font-mono text-[10px] text-text-muted uppercase tracking-widest'>
							{work.stack.join(' · ')}
						</p>
						<span className='inline-flex items-center gap-2 font-mono text-[11px] text-text-secondary group-hover:text-accent uppercase tracking-widest transition-colors duration-300'>
							View project
							<span
								aria-hidden
								className='inline-block transition-transform group-hover:translate-x-1 duration-300'
							>
								→
							</span>
						</span>
					</div>
				</div>
			</div>
		</motion.a>
	);
}
