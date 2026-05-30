'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLandingStore } from '@/store/useLandingStore'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const { isNavScrolled, setNavScrolled } = useLandingStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setNavScrolled])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          backgroundColor: isNavScrolled
            ? 'rgba(10, 10, 10, 0.6)'
            : 'transparent',
          backdropFilter: isNavScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isNavScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isNavScrolled
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid transparent',
          transition: 'background-color 300ms ease, border-color 300ms ease',
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '22px',
            letterSpacing: '0.05em',
            color: 'var(--color-white)',
          }}
        >
          heulaulab
        </a>

        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '13px',
                  color: 'var(--color-white)',
                  opacity: 0.7,
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = '0.7' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="flex md:hidden"
          onClick={() => setIsMobileOpen(true)}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '13px',
            color: 'var(--color-white)',
            opacity: 0.7,
          }}
          aria-label="Open menu"
        >
          MENU
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'var(--color-void)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '48px',
            }}
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '13px',
                color: 'var(--color-muted)',
              }}
              aria-label="Close menu"
            >
              CLOSE
            </button>
            <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '48px',
                      color: 'var(--color-white)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
