'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { works } from '@/lib/data/works';

export default function WorksSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const prefersReduced = globalThis.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		if (prefersReduced) {
			sectionRef.current
				?.querySelectorAll<HTMLElement>('[data-work-card]')
				.forEach((el) => {
					el.classList.add('works-card--visible');
				});
			return;
		}

		const cards =
			sectionRef.current?.querySelectorAll<HTMLElement>('[data-work-card]');
		if (!cards) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('works-card--visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 },
		);

		cards.forEach((card) => observer.observe(card));

		return () => observer.disconnect();
	}, []);

	return (
		<section id='work' ref={sectionRef} className='w-full'>
			{works.map((work, i) => (
				<div
					key={work.slug}
					data-work-card
					className='relative overflow-hidden works-card'
					style={
						{
							'--i': i,
							'backgroundColor': work.coverColor,
						} as React.CSSProperties
					}
				>
					<a
						href={`/works/${work.slug}`}
						aria-label={`${work.category}: ${work.title}`}
						className='group block relative w-full border-b border-white/5 h-96 overflow-hidden'
					>
							{/* Background image */}
							<Image
								src={work.image}
								alt=''
								fill
								className='object-cover works-card__img'
								priority={i === 0}
							/>

							{/* Base overlay — gradient from bottom */}
							<div
								aria-hidden='true'
								className='z-10 absolute inset-0 bg-gradient-to-t from-[#0e0e10]/88 via-[#0e0e10]/30 to-[#0e0e10]/5'
							/>

							{/* Hover overlay — intensified gradient */}
							<div
								aria-hidden='true'
								className='z-20 absolute inset-0 bg-gradient-to-t from-[#0e0e10]/96 via-[#0e0e10]/55 to-[#0e0e10]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400'
							/>

							{/* Content layer — absolutely positioned, left-aligned */}
							<div className='z-30 absolute inset-0 flex flex-col justify-between pl-10 pr-10 pt-8 pb-10'>
								{/* Category */}
								<p className='uppercase text-xs tracking-widest text-white/70'>
									{work.category}
								</p>

								{/* Title — bottom-left */}
								<h2 className='font-bebas text-4xl md:text-5xl text-white'>
									{work.title}
								</h2>
							</div>
						</a>
				</div>
			))}
		</section>
	);
}