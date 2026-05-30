'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-ink)',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(48px, 6vw, 80px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            marginBottom: '24px',
          }}
        >
          Ready to be<br />remembered?
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '16px',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          We work with brands that want to leave a mark.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => { window.location.href = 'mailto:hello@heulaulab.xyz' }}
          >
            Start a project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}