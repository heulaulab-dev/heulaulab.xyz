import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { works } from '@/lib/data/works'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const work = works.find((w) => w.slug === slug)
	if (!work) return {}
	return {
		title: work?.title,
		description: work?.description,
	}
}

export default async function WorkPage({ params }: Props) {
	const { slug } = await params
	const work = works.find((w) => w.slug === slug)
	if (!work) notFound()

	return (
		<>
			<Navbar />
			<main style={{ backgroundColor: 'var(--color-void)', minHeight: '100dvh' }}>
				{/* Hero */}
				<div
					style={{
						backgroundColor: work.coverColor,
						borderBottom: '1px solid rgba(255,255,255,0.05)',
					}}
				>
					<div
						style={{
							maxWidth: '1100px',
							margin: '0 auto',
							padding: '0 24px',
						}}
					>
						{/* Back link — top */}
						<div style={{ paddingTop: '32px', paddingBottom: '48px' }}>
							<a
								href='/'
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: '8px',
									fontFamily: 'var(--font-geist), monospace',
									fontSize: '11px',
									letterSpacing: '0.14em',
									textTransform: 'uppercase',
									color: 'rgba(255,255,255,0.45)',
									transition: 'color 0.3s',
								}}
							>
								← Works
							</a>
						</div>

						{/* Title block — bottom */}
						<div style={{ paddingBottom: '40px' }}>
							<span
								style={{
									display: 'block',
									fontFamily: 'var(--font-geist), monospace',
									fontSize: '11px',
									letterSpacing: '0.18em',
									textTransform: 'uppercase',
									color: 'rgba(255,255,255,0.45)',
									marginBottom: '12px',
								}}
							>
								{work.category}
							</span>
							<h1
								style={{
									fontFamily: 'var(--font-bebas), sans-serif',
									fontSize: 'clamp(32px, 6vw, 72px)',
									lineHeight: 1.05,
									letterSpacing: '0.01em',
									color: '#ffffff',
								}}
							>
								{work.title}
							</h1>
						</div>
					</div>
				</div>

				{/* Body */}
				<div
					style={{
						maxWidth: '1100px',
						margin: '0 auto',
						padding: '0 24px',
					}}
				>
					<div className='work-body'>
						{/* Year + Tags row */}
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: '16px',
								paddingBottom: '32px',
								marginBottom: '40px',
								borderBottom: '1px solid rgba(255,255,255,0.08)',
							}}
						>
							<span
								style={{
									fontFamily: 'var(--font-geist), monospace',
									fontSize: '13px',
									color: 'rgba(255,255,255,0.45)',
								}}
							>
								{work.year}
							</span>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
								{work.tags.map((tag) => (
									<span
										key={tag}
										style={{
											fontFamily: 'var(--font-geist), monospace',
											fontSize: '10.5px',
											letterSpacing: '0.14em',
											textTransform: 'uppercase',
											color: 'rgba(255,255,255,0.55)',
											border: '1px solid rgba(255,255,255,0.14)',
											borderRadius: '100px',
											padding: '4px 12px',
										}}
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Description */}
						<p
							style={{
								fontSize: '17px',
								lineHeight: 1.82,
								color: 'rgba(255,255,255,0.72)',
								marginBottom: '56px',
							}}
						>
							{work.description}
						</p>

						{/* Metadata block */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
								gap: '32px',
								paddingBottom: '48px',
								marginBottom: '48px',
								borderBottom: '1px solid rgba(255,255,255,0.08)',
							}}
						>
							<div>
								<h2
									style={{
										fontFamily: 'var(--font-geist), monospace',
										fontSize: '10px',
										letterSpacing: '0.22em',
										textTransform: 'uppercase',
										color: 'rgba(255,255,255,0.35)',
										marginBottom: '14px',
									}}
								>
									Stack
								</h2>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
									{work.stack.map((s) => (
										<span
											key={s}
											style={{
												fontFamily: 'var(--font-geist), monospace',
												fontSize: '11.5px',
												color: 'rgba(255,255,255,0.6)',
												border: '1px solid rgba(255,255,255,0.1)',
												borderRadius: '4px',
												padding: '3px 8px',
											}}
										>
											{s}
										</span>
									))}
								</div>
							</div>
							<div>
								<h2
									style={{
										fontFamily: 'var(--font-geist), monospace',
										fontSize: '10px',
										letterSpacing: '0.22em',
										textTransform: 'uppercase',
										color: 'rgba(255,255,255,0.35)',
										marginBottom: '14px',
									}}
								>
									Live URL
								</h2>
								<a
									href={work.url}
									target='_blank'
									rel='noopener noreferrer'
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '6px',
										fontFamily: 'var(--font-geist), monospace',
										fontSize: '12.5px',
										color: 'rgba(255,255,255,0.65)',
										borderBottom: '1px solid rgba(255,255,255,0.18)',
										paddingBottom: '1px',
										transition: 'color 0.3s, border-color 0.3s',
									}}
								>
									{work.url.replace('https://', '')}
									<span aria-hidden='true'>↗</span>
								</a>
							</div>
						</div>

						{/* Back link */}
						<div style={{ paddingBottom: '80px' }}>
							<a
								href='/'
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: '8px',
									fontFamily: 'var(--font-geist), monospace',
									fontSize: '11px',
									letterSpacing: '0.14em',
									textTransform: 'uppercase',
									color: 'rgba(255,255,255,0.45)',
									transition: 'color 0.3s',
								}}
							>
								← Back to Works
							</a>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
