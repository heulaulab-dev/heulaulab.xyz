import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import WorksSection from '@/components/sections/WorksSection'
import { About } from '@/components/sections/About'
import { Features } from '@/components/sections/Features'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WorksSection />
      <About />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}