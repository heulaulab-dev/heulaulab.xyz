'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUpVariants, staggerContainer } from '@/lib/motion'
import { FEATURES } from '@/lib/constants'

export function Features() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '120px 24px',
      }}
      className="grain"
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="features-grid"
      >
        <div>
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
              marginBottom: '24px',
            }}
          >
            What we do
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--color-white)',
            }}
          >
            We build<br />bold systems.
          </motion.h2>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}
        >
          {FEATURES.map((feature) => (
            <motion.li
              key={feature.label}
              variants={fadeUpVariants}
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '32px',
                  letterSpacing: '0',
                  color: 'var(--color-white)',
                  lineHeight: 1.2,
                }}
              >
                {feature.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '15px',
                  color: 'var(--color-muted)',
                  lineHeight: 1.6,
                  maxWidth: '400px',
                }}
              >
                {feature.body}
              </p>
            </motion.li>
          ))}
          <motion.li
            variants={fadeUpVariants}
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '32px 0',
            }}
          />
        </motion.ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}