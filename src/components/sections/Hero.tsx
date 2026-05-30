'use client'

import { motion } from 'framer-motion'
import { staggerContainer, wordRevealVariants, ctaVariants } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

const HEADLINE = 'heulaulab'

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        backgroundColor: 'var(--color-void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
      className="grain"
    >
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: 'var(--color-muted)',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Design Lab / Digital + Physical
        </motion.p>

        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(72px, 12vw, 140px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.15em',
          }}
        >
          {HEADLINE.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={wordRevealVariants}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '18px',
            color: 'var(--color-muted)',
            marginBottom: '48px',
          }}
        >
          Multidisciplinary Design Lab
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <Button
            size="lg"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View our work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}