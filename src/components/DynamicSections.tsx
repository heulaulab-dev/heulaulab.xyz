'use client'

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('./sections/Hero'), { ssr: false })
const WorksSection = dynamic(() => import('./sections/WorksSection'), { ssr: false })

export function DynamicSections() {
  return (
    <>
      <Hero />
      <WorksSection />
    </>
  )
}