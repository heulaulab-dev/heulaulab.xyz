'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { staggerContainer, wordRevealVariants, ctaVariants } from '@/lib/motion'
import { Button } from '@/components/ui/Button'

const HEADLINE = 'heulaulab'

export function Hero() {
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 18 })

  const offsetX = useTransform(springX, [-1000, 1000], [-12, 12])
  const offsetY = useTransform(springY, [-1000, 1000], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        cursor: 'none',
      }}
      className="grain"
    >
      <motion.div
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', x: offsetX, y: offsetY }}
      >
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
      </motion.div>

      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            background: 'rgba(10, 10, 10, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            padding: '8px 14px',
          }}
        >
          heulaulab
        </motion.div>
      )}
    </section>
  )
}
