'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants } from '@/lib/motion'
import { ABOUT_PARAGRAPHS } from '@/lib/constants'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          About
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {ABOUT_PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.1 }}
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'var(--color-muted)',
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}