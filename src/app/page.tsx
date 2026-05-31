import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { About } from '@/components/sections/About'
import { Features } from '@/components/sections/Features'
import { CTA } from '@/components/sections/CTA'
import { DynamicSections } from '@/components/DynamicSections'

export default function Home() {
  return (
    <main>
      <Navbar />
      <DynamicSections />
      <About />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}